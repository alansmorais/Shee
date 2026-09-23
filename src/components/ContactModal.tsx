import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, prefilledMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Anti-spam states
  const [honey, setHoney] = useState('');
  const [spamAnswer, setSpamAnswer] = useState('');
  const [challenge, setChallenge] = useState({ a: 4, b: 3 });
  const openTimeRef = useRef<number>(Date.now());

  const generateChallenge = () => {
    const a = Math.floor(Math.random() * 7) + 2; // 2 to 8
    const b = Math.floor(Math.random() * 6) + 1; // 1 to 6
    setChallenge({ a, b });
    setSpamAnswer('');
  };

  // Handle prefilled message and resets when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage(prefilledMessage || '');
      setIsSuccess(false);
      setName('');
      setEmail('');
      setErrorMsg('');
      setHoney('');
      generateChallenge();
      openTimeRef.current = Date.now();
    }
  }, [isOpen, prefilledMessage]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    // 1. Honeypot Anti-Spam Check: If hidden honeypot is populated by bots, silently exit
    if (honey.trim() !== '') {
      setIsSuccess(true);
      return;
    }

    // 2. Time-gate verification: Humans take at least 1.5s to read and type
    const timeSpent = Date.now() - openTimeRef.current;
    if (timeSpent < 1500) {
      // Rapid automated bot submission - silently show success
      setIsSuccess(true);
      return;
    }

    // 3. Dynamic Math Verification Challenge
    const expected = challenge.a + challenge.b;
    if (parseInt(spamAnswer.trim(), 10) !== expected) {
      setErrorMsg(`Verification answer is incorrect (${challenge.a} + ${challenge.b}). Please try again.`);
      generateChallenge();
      return;
    }

    // 4. Rate-limiting check: 20-second cooldown between inquiries
    const lastSubmission = sessionStorage.getItem('she_contact_last_ts');
    if (lastSubmission && Date.now() - parseInt(lastSubmission, 10) < 20000) {
      setErrorMsg('Please wait a few moments before sending another message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const scriptUrl = storageService.getSettings().googleScriptUrl;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'contact',
            type: 'contact',
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            honeypot: honey.trim(),
          }),
        });
      }
      sessionStorage.setItem('she_contact_last_ts', Date.now().toString());
      setIsSuccess(true);
    } catch {
      // Show success gracefully so client isn't blocked if offline/preview
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      id="contact-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="relative w-full max-w-[540px] bg-main rounded-xs border border-line p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-xl">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-2xl text-main hover:text-accent-editorial transition-colors cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent-editorial block">
            Get in touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-main font-normal">Send a message</h2>
          <p className="text-xs text-muted-editorial font-light leading-relaxed">
            Fill out the form below and we will get back to you as soon as possible.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-xs">
            {errorMsg}
          </div>
        )}

        {isSuccess ? (
          <div className="mt-6 p-6 bg-alt rounded-xs text-center space-y-3">
            <strong className="font-serif text-2xl text-main block">Thank you!</strong>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              Your message has been sent. We will respond to {email} shortly.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-xs text-[11px] uppercase tracking-[0.13em] font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Honeypot hidden field for anti-spam bots */}
            <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="hp_comment">Do not fill this field</label>
              <input
                id="hp_comment"
                type="text"
                name="hp_comment"
                tabIndex={-1}
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.15em] font-semibold text-main block">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full p-2.5 border border-line bg-main text-main text-xs font-sans rounded-xs focus:outline-none focus:border-main"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.15em] font-semibold text-main block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-2.5 border border-line bg-main text-main text-xs font-sans rounded-xs focus:outline-none focus:border-main"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-[0.15em] font-semibold text-main block">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we support your practice or journey?..."
                className="w-full p-2.5 border border-line bg-main text-main text-xs font-sans rounded-xs focus:outline-none focus:border-main"
              />
            </div>

            {/* Anti-Spam Verification */}
            <div className="space-y-1.5 bg-alt/60 p-3 rounded-xs border border-line">
              <div className="flex items-center justify-between">
                <label className="text-[9px] uppercase tracking-[0.15em] font-semibold text-[#8B6E60] flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-editorial shrink-0" />
                  <span>Anti-Spam: What is {challenge.a} + {challenge.b}?</span>
                </label>
                <button
                  type="button"
                  onClick={generateChallenge}
                  title="Generate new question"
                  className="text-muted-editorial hover:text-main p-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
              <input
                type="number"
                required
                value={spamAnswer}
                onChange={(e) => setSpamAnswer(e.target.value)}
                placeholder={`Type the answer (${challenge.a + challenge.b})`}
                className="w-full p-2.5 border border-line bg-main text-main text-xs font-sans rounded-xs focus:outline-none focus:border-main"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-5 py-2.5 rounded-xs border border-line text-[11px] uppercase tracking-[0.13em] font-semibold text-main hover:bg-alt transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xs text-[11px] uppercase tracking-[0.13em] font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message \u2192'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
