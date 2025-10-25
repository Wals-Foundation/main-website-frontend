"use client"

import Dropdown from "@/src/components/Dropdown"
import { Currency } from "../models"
import { Caption } from "@/src/components/Typography"
import React, { useEffect, useRef, useState } from "react"
import { TextInput } from "@/src/components/Input"
import { FilledButton } from "@/src/components/Button"
import { initialiseTransaction } from "@/src/financials/data/actions"
import { isValidEmail } from "@/src/core/utils"
import { ChipItem, DropdownItem } from "@/src/core/models"
import ChipGroup from "@/src/components/Chip"
import { Config } from "@/src/core/config"
import PaystackPop from "@paystack/inline-js";
import { useRouter } from 'next/navigation'
import { isStrapiError } from "@/src/core/data/strapi-error"
import Loader from "@/src/components/Loader"

const currencies: DropdownItem<string>[] = Object.values(Currency).map(value => ({
    id: value,
    label: value
}))
    .sort((a, b) => a.label.localeCompare(b.label))

export const mapDonationAmountsToChips = (
    donationAmountOptions: number[],
    currencyCode: string
): ChipItem<number>[] => {
    const format = (value: number) => {
        try {
            return new Intl.NumberFormat(navigator.language, {
                style: "currency",
                currency: currencyCode,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        } catch {
            return `${currencyCode} ${value}`;
        }
    };

    return donationAmountOptions.map((value) =>
        value === -1
            ? { id: value, label: "Enter another amount" }
            : { id: value, label: format(value) }
    );
};

const Donate: React.FC<{
    className?: string,
    causeCode?: string,
}> = ({
    className,
    causeCode
}) => {
        const router = useRouter()
        const donateAmountOptions = [10, 15, 20, -1]
        const [amount, setAmount] = useState("");
        const [amountError, setAmountError] = useState(false);
        const [donateAmountOption, setDonateAmountOption] = useState<number>(donateAmountOptions[0])
        const [selectedCurrency, setCurrency] = useState<string>(Currency.GHC)
        const [email, setEmail] = useState("");
        const [emailError, setEmailError] = useState(false);
        const [isInitialisingTransaction, setIsInitialisingTransaction] = useState(false);

        const amountInputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (donateAmountOption === -1) {
                setTimeout(() => amountInputRef.current?.focus(), 0);
                const value = parseFloat(amount);
                if (!amount || isNaN(value) || value <= 0) {
                    setAmountError(true);
                } else {
                    setAmountError(false);
                }
            } else {
                // clear error when a preset option is selected
                setAmountError(false);
            }
        }, [donateAmountOption]);

        const handleAmountChange = (value: string) => {
            if (!value) {
                setAmount("");
                return;
            }

            const sanitized = value.replace(/[^0-9.]/g, "");
            const parts = sanitized.split(".");
            if (parts.length > 1) {
                parts[1] = parts[1].slice(0, 2);
            }

            const formatted = parts.join(".");
            setAmount(formatted);

            const parsed = parseFloat(formatted);
            if (!isNaN(parsed) && parsed > 0) {
                setAmountError(false);
            }
        };

        const validateAmount = (): boolean => {
            if (donateAmountOption === -1) {
                const parsed = parseFloat(amount);
                const invalid = !amount || isNaN(parsed) || parsed <= 0;
                setAmountError(invalid);
                return !invalid;
            }
            // preset option selected - always valid
            setAmountError(false);
            return true;
        }

        const onContinue = async () => {
            setIsInitialisingTransaction(true)
            const valid = validateAmount();
            if (!valid) return;

            const value = Math.round((donateAmountOption === -1
                ? parseFloat(amount)
                : donateAmountOption) * 100);

            try {
                const emailToUse = email && isValidEmail(email) ? email : Config.transactionsEmail;

                const response = await initialiseTransaction(
                    causeCode || "",
                    BigInt(value),
                    selectedCurrency as Currency,
                    emailToUse
                );

                if (!isStrapiError(response)) {
                    console.log("Access code: ", response.accessCode)
                    const paystack = new PaystackPop();
                    paystack.newTransaction({
                        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
                        email: emailToUse,
                        amount: value,
                        access_code: response.accessCode,
                        reference: response.reference,
                        callback: (response) => {
                            console.log("Payment success", response);
                            router.back()
                        },
                        onClose: () => {
                            console.log("Payment popup closed");
                        }
                    });
                } else {
                    console.error("Failed to get access code", response);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsInitialisingTransaction(false)
            }
        };

        const isFormInvalid = amountError || emailError;

        return (
            <>
                {isInitialisingTransaction ? (<Loader />) : (
                    <div className={`w-full ${className ?? ""}`}>
                        <div>
                            <Caption text="Currency" />
                            <Dropdown<string>
                                items={currencies}
                                selectedItemId={selectedCurrency}
                                placeholder="Select type"
                                onSelect={setCurrency}
                            />
                        </div>
                        <div className="mt-4">
                            <ChipGroup<number>
                                options={mapDonationAmountsToChips(donateAmountOptions, selectedCurrency)}
                                selected={donateAmountOption}
                                onSelect={(v) => {
                                    setDonateAmountOption(v);
                                    if (v !== -1) {
                                        setAmountError(false);
                                    }
                                }}
                            />
                        </div>
                        {(donateAmountOption == -1) && (
                            <div className="mt-4">
                                <Caption text="Amount" />
                                <TextInput
                                    ref={amountInputRef}
                                    name="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    isInvalid={amountError}
                                    onChange={(event) => handleAmountChange(event.target.value)}
                                    onBlur={() => {
                                        // validate on blur as requested
                                        validateAmount();
                                    }}
                                />
                            </div>
                        )}
                        <div className="mt-6">
                            <Caption text="Email(Optional)" />
                            <TextInput
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                isInvalid={emailError}
                                onChange={(event) => {
                                    const email = event.target.value
                                    setEmail(email)
                                    if (email && !isValidEmail(email)) {
                                        setEmailError(true)
                                    } else {
                                        setEmailError(false)
                                    }
                                }}
                            />
                        </div>
                        <div className="w-full mt-4 flex justify-end items-center">
                            <FilledButton
                                title="Donate"
                                onClick={onContinue}
                                disabled={isFormInvalid}
                            />
                        </div>
                    </div>
                )}
            </>
        )
    }

export default Donate