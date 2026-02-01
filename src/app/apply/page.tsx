'use client';

import { useState } from 'react';
import { Config } from '@/src/core/config';
import { TextInput } from '@/src/components/Input';
import { FilledButton } from '@/src/components/Button';
import Loader from '@/src/components/Loader';
import { HeadingLarge } from '@/src/components/Typography';

export default function JobApplicationPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  async function uploadFile(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('files', file);

    const res = await fetch(`${Config.strapi.serverUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('File upload failed');
    }

    const uploadedFiles = await res.json();
    return uploadedFiles[0].id; // Strapi returns an array
  }

  function validatePhone(phone: string): boolean {
    const ghanaPhoneRegex = /^0\d{9}$/; // Ghana numbers: start with 0, 10 digits total
    return ghanaPhoneRegex.test(phone);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPhoneError(false);
    setEmailError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;

    // Validate phone
    if (!validatePhone(phone)) {
      setPhoneError(true);
      setLoading(false);
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setEmailError(true);
      setLoading(false);
      return;
    }

    try {
      const resumeFile = formData.get('resumeFile') as File;
      if (!resumeFile) throw new Error('Resume is required');
      const resumeFileId = await uploadFile(resumeFile);

      let coverLetterFileId: number | null = null;
      const coverLetterFile = formData.get('coverLetterFile') as File;
      if (coverLetterFile && coverLetterFile.size > 0) {
        coverLetterFileId = await uploadFile(coverLetterFile);
      }

      const res = await fetch(`${Config.strapi.serverUrl}/job-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            fullName: formData.get('fullName'),
            email,
            phone,
            role: 'program_and_operations_manager',
            resumeFile: resumeFileId,
            ...(coverLetterFileId && { coverLetterFile: coverLetterFileId }),
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(text);
        throw new Error('Application submission failed');
      }

      setSuccess(true);
      form.reset();
    } catch (err: unknown) {
      let message = 'Something went wrong';
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-size-semibold mb-4">Application received</h1>
        <p className="text-base leading-6 sm:leading-7">
          Thank you for applying. We’ll be in touch if you’re shortlisted.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <HeadingLarge className="mx-horizontal text-center" text="Programme & Operations Manager" />
      {loading && <Loader />}

      <form onSubmit={handleSubmit} className="mt-section space-y-6">
        <TextInput
          name="fullName"
          placeholder="Full name"
          required
        />

        <TextInput
          name="email"
          type="email"
          placeholder="Email"
          required
          isInvalid={emailError}
          onChange={() => setEmailError(false)}
        />
        {emailError && <p className="text-red-600 text-sm">Invalid email address.</p>}

        <TextInput
          name="phone"
          placeholder="Phone"
          required
          isInvalid={phoneError}
          onChange={() => setPhoneError(false)}
        />
        {phoneError && <p className="text-red-600 text-sm">Invalid Ghana phone number.</p>}

        <div>
          <label className="block font-medium mb-1">Resume / CV</label>
          <input
            type="file"
            name="resumeFile"
            accept=".pdf,.doc,.docx"
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Cover letter (optional)</label>
          <input
            type="file"
            name="coverLetterFile"
            accept=".pdf,.doc,.docx"
            className="w-full"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="w-full flex justify-start">
          <FilledButton
            title={loading ? 'Submitting…' : 'Submit application'}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
