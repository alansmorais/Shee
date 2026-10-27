import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users, CheckCircle2, CreditCard, UserRound } from 'lucide-react';
import { Workshop } from '../types';

interface WorkshopDetailViewProps {
  workshop: Workshop;
  onBack: () => void;
}

export const WorkshopDetailView: React.FC<WorkshopDetailViewProps> = ({ workshop, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPriceOption, setSelectedPriceOption] = useState(workshop.priceOptions?.[0]?.value || 'standard');
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const isUnavailable = workshop.status === 'sold_out' || workshop.status === 'closed';

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutError('');
    setCheckoutLoading(true);
    try {
      const endpoint = (import.meta as ImportMeta & { env?: { VITE_STRIPE_WORKER_URL?: string } }).env?.VITE_STRIPE_WORKER_URL
        || 'https://danielatorp-no-stripe-checkout.alanpkmorais.workers.dev';
      const response = await fetch(`${endpoint.replace(/\/$/, '')}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshopId: workshop.id,
          priceOption: selectedPriceOption,
          participantName: name.trim(),
          participantEmail: email.trim()
        })
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || 'Stripe could not start checkout. Please try again.');
      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Unable to start secure payment. Please try again.');
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-main text-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-muted-editorial hover:text-accent-editorial transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Workshops
        </button>
      </div>

      <section className="relative overflow-hidden border-y border-line bg-alt/30">
        {workshop.image && <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url("${workshop.image}")` }} />}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-editorial/30 px-3 py-1 text-[10px] uppercase tracking-widest text-accent-editorial">
            <CheckCircle2 className="w-3.5 h-3.5" /> SHE. Academy Workshop
          </span>
          <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">{workshop.title}</h1>
          {workshop.subtitle && <p className="font-serif text-xl italic text-muted-editorial">{workshop.subtitle}</p>}
          {workshop.description && <p className="max-w-3xl text-base sm:text-lg text-muted-editorial font-light leading-relaxed">{workshop.description}</p>}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm"><Calendar className="w-4 h-4 text-accent-editorial" />{workshop.date}</span>
            {workshop.time && <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm"><Clock className="w-4 h-4 text-accent-editorial" />{workshop.time}</span>}
            {workshop.location && <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm"><MapPin className="w-4 h-4 text-accent-editorial" />{workshop.location}</span>}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-light">About this workshop</h2>
            <div className="h-0.5 w-16 bg-accent-editorial" />
            <p className="text-sm sm:text-base leading-relaxed text-muted-editorial font-light">
              {workshop.description || 'Explore the workshop details below and contact SHE. Academy to confirm availability and registration.'}
            </p>
          </div>

          {workshop.curriculum && workshop.curriculum.length > 0 && (
            <div className="space-y-5">
              <h2 className="font-serif text-2xl font-light">What we will explore</h2>
              <ul className="space-y-3">
                {workshop.curriculum.map((item, index) => <li key={index} className="flex items-start gap-3 text-sm text-muted-editorial"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent-editorial" /><span>{item}</span></li>)}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workshop.facilitators && workshop.facilitators.length > 0 && (
              <div className="rounded-2xl border border-line bg-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-accent-editorial"><UserRound className="w-4 h-4" /><span className="text-[10px] uppercase tracking-widest font-semibold">Facilitators</span></div>
                <p className="text-sm text-main">{workshop.facilitators.join(', ')}</p>
              </div>
            )}
            {(workshop.capacity != null || workshop.spotsLeft != null) && (
              <div className="rounded-2xl border border-line bg-card p-5 space-y-2">
                <div className="flex items-center gap-2 text-accent-editorial"><Users className="w-4 h-4" /><span className="text-[10px] uppercase tracking-widest font-semibold">Places</span></div>
                <p className="text-sm text-main">{workshop.spotsLeft != null ? `${workshop.spotsLeft} places remaining` : `Capacity: ${workshop.capacity}`}</p>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-8 rounded-3xl border border-line bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-accent-editorial font-semibold">Your place</p>
            <p className="font-serif text-3xl text-main">{(workshop.priceOptions?.find((option) => option.value === selectedPriceOption)?.price ?? workshop.price) != null ? `${(workshop.priceOptions?.find((option) => option.value === selectedPriceOption)?.price ?? workshop.price)!.toLocaleString()} ${workshop.currency || 'NOK'}` : 'Price on request'}</p>
            <p className="text-xs text-muted-editorial">Workshop-specific registration</p>
          </div>
          <div className="border-t border-line pt-5 space-y-3 text-sm text-muted-editorial">
            <p className="flex items-start gap-2"><Calendar className="w-4 h-4 mt-0.5 shrink-0 text-accent-editorial" />{workshop.date}</p>
            {workshop.location && <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-editorial" />{workshop.location}</p>}
          </div>
          {isUnavailable ? (
            <div className="rounded-xl bg-alt p-4 text-sm text-muted-editorial">{workshop.status === 'sold_out' ? 'This workshop is sold out.' : 'Registration for this workshop is currently closed.'}</div>
          ) : (
            <form onSubmit={handleRegistration} className="space-y-4">
              <h2 className="font-serif text-xl">Register your interest</h2>
              {workshop.priceOptions && workshop.priceOptions.length > 0 && (
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted-editorial">Choose your version</span>
                  <select value={selectedPriceOption} onChange={(event) => setSelectedPriceOption(event.target.value)} className="w-full rounded-xl border border-line bg-main px-4 py-3 text-sm text-main outline-none focus:border-accent-editorial">
                    {workshop.priceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </label>
              )}
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-editorial">Full name</span>
                <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-xl border border-line bg-main px-4 py-3 text-sm text-main outline-none focus:border-accent-editorial" placeholder="Your full name" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-muted-editorial">Email address</span>
                <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-line bg-main px-4 py-3 text-sm text-main outline-none focus:border-accent-editorial" placeholder="you@example.com" />
              </label>
              {checkoutError && <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{checkoutError}</p>}
              <button type="submit" disabled={checkoutLoading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#32231F] px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#FCFAF7] hover:bg-accent-editorial transition-colors disabled:opacity-60 disabled:cursor-wait">
                {checkoutLoading ? 'Connecting to secure checkout…' : 'Continue to secure payment'} {!checkoutLoading && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-xs leading-relaxed text-muted-editorial">Checkout is processed securely by Stripe. Your registration is tagged as SHE Academy so the paid registration can be identified in the registration system.</p>
            </form>
          )}
          <div className="flex items-center gap-2 border-t border-line pt-4 text-xs text-muted-editorial"><CreditCard className="w-4 h-4 text-accent-editorial" /> Secure payment step</div>
        </aside>
      </section>
    </div>
  );
};
