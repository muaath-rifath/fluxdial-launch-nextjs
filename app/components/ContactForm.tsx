'use client';

import React, { useRef, useState } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    _honey: '',       // honeypot – never shown to real users
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '', _honey: '' });
        setTurnstileToken(null);
      } else {
        setStatus('error');
        // Reset widget so user can try again
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch (error) {
      setStatus('error');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 sm:p-10 rounded-lg bg-primary-container/20 border border-primary-container/50 text-primary-container text-center text-lg font-inter">
        Thank you! Your inquiry has been received. Our team will contact you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot field – hidden from real users, bots fill it automatically */}
      <input
        type="text"
        name="_honey"
        value={formData._honey}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: 'none' }}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-mono text-sm font-medium text-on-surface">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
            placeholder="Jane"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-mono text-sm font-medium text-on-surface">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
            placeholder="Doe"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-sm font-medium text-on-surface">
          Work Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
          placeholder="jane@company.com"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="font-mono text-sm font-medium text-on-surface">
          Company Size
        </label>
        <div className="relative">
          <select
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full appearance-none rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
          >
            <option value="" disabled>Select an option...</option>
            <option value="1-50">1 - 50 employees</option>
            <option value="51-200">51 - 200 employees</option>
            <option value="201-1000">201 - 1000 employees</option>
            <option value="1001+">1001+ employees</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-sm font-medium text-on-surface">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="resize-y rounded border border-surface-border bg-surface-container-lowest px-4 py-3 font-inter text-on-surface outline-none transition-colors focus:border-primary-container focus:ring-1 focus:ring-primary-container"
          placeholder="Tell us about your use case..."
        ></textarea>
      </div>

      {status === 'error' && (
        <p className="text-sm text-error">An error occurred while sending your request. Please try again.</p>
      )}

      <div className="w-full">
        {turnstileError ? (
          <p className="text-sm text-error">
            CAPTCHA failed to load. Please refresh the page and try again.
          </p>
        ) : (
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => { setTurnstileToken(token); setTurnstileError(false); }}
            onExpire={() => setTurnstileToken(null)}
            onError={() => { setTurnstileToken(null); setTurnstileError(true); }}
            options={{ theme: 'auto', size: 'flexible' }}
            className="w-full [&_iframe]:!min-w-0 [&_iframe]:!w-full [&_div]:!min-w-0 [&_div]:!w-full"
            style={{ width: '100%' }}
          />
        )}
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="btn-primary mt-2 w-full text-center sm:w-auto sm:self-end disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
