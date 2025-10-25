declare module "@paystack/inline-js" {
  export default class PaystackPop {
    newTransaction(options: {
      key: string;
      email: string;
      amount: number;
      access_code?: string;
      reference?: string;
      callback?: (response: { reference: string; status: string }) => void;
      onClose?: () => void;
    }): void;
  }
}
