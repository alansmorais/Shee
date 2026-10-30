import React from 'react';
import { Workshop } from '../types';
import { Calendar, ArrowRight, Sparkles, Compass, FileText } from 'lucide-react';

interface WorkshopsViewProps {
  workshops?: Workshop[];
  onOpenBooking: (serviceId?: string, practitionerId?: string) => void;
  onOpenWorkshop: (workshopId: string) => void;
  onOpenContact?: (prefilledMessage?: string) => void;
  onOpenCancellationPolicy?: () => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({
  workshops = [],
  onOpenBooking,
  onOpenWorkshop,
  onOpenContact,
  onOpenCancellationPolicy,
}) => {
  // Hide past events from the public catalogue. Date strings may be single dates or ranges
  // such as "7 - 8/11/2026"; use the final day in the range for visibility.
  const getWorkshopEndDate = (dateText: string): Date | null => {
    const matches = [...dateText.matchAll(/(\d{1,2})\s*[./-]\s*(\d{1,2})\s*[./-]\s*(\d{4})/g)];
    if (matches.length > 0) {
      const [, day, month, year] = matches[matches.length - 1];
      const parsed = new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    const shortRange = dateText.match(/(?:\d{1,2}\s*[-–]\s*)?(\d{1,2})\s*[./-]\s*(\d{4})/);
    if (shortRange) return null;
    return null;
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingWorkshops = workshops.filter((workshop) => {
    const endDate = getWorkshopEndDate(workshop.date);
    return endDate !== null && endDate >= today;
  });
  const hasWorkshops = upcomingWorkshops.length > 0;

  return (
    <div id="workshops-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-line text-xs uppercase tracking-widest text-accent-editorial bg-alt/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workshops &amp; Immersions</span>
          </div>

          {onOpenCancellationPolicy && (
            <button
              type="button"
              onClick={onOpenCancellationPolicy}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-accent-editorial/40 text-xs font-medium text-accent-editorial hover:bg-accent-editorial hover:text-white transition-all cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Cancellation Policy</span>
            </button>
          )}
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-main leading-tight">
          Upcoming Workshops
        </h1>
        <p className="text-base sm:text-lg text-muted-editorial font-light leading-relaxed">
          Upcoming scheduled dates. Select a workshop to inquire or reserve your place. All registrations are subject to our{' '}
          {onOpenCancellationPolicy ? (
            <button
              type="button"
              onClick={onOpenCancellationPolicy}
              className="text-accent-editorial underline font-medium hover:text-main cursor-pointer"
            >
              Cancellation Policy
            </button>
          ) : (
            'Cancellation Policy'
          )}.
        </p>
      </div>

      {/* Active Workshops 1 by 1 */}
      {hasWorkshops ? (
        <div className="space-y-4">
          <div className="divide-y divide-line/60 rounded-3xl border border-line bg-card overflow-hidden shadow-xs">
            {upcomingWorkshops.map((w, index) => {
              const isSoldOut = w.status === 'sold_out' || w.status === 'closed';

              return (
                <div
                  key={w.id || `ws-${index}`}
                  id={w.id}
                  className="scroll-mt-28 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors hover:bg-alt/30 group"
                >
                  {/* Left: Original source photo, date + title */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0 flex-1">
                    {w.image && (
                      <button type="button" onClick={() => onOpenWorkshop(w.id)} className="shrink-0 rounded-xl overflow-hidden w-full sm:w-36 h-40 sm:h-28 bg-alt border border-line cursor-pointer" aria-label={`View ${w.title} details`}>
                        <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover" />
                      </button>
                    )}
                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="px-3 py-1 rounded-lg bg-alt font-mono text-xs font-semibold text-accent-editorial border border-line whitespace-nowrap">
                        {w.date}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider uppercase border inline-flex items-center space-x-1.5 ${
                          isSoldOut
                            ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSoldOut ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                        />
                        <span>{isSoldOut ? 'Sold Out' : 'Open'}</span>
                      </span>
                    </div>

                    <div className="min-w-0">
                      <button type="button" onClick={() => onOpenWorkshop(w.id)} className="text-left font-serif text-lg sm:text-xl lg:text-2xl text-main font-normal group-hover:text-accent-editorial transition-colors cursor-pointer">
                        {w.title}
                      </button>
                      {w.time && (
                        <p className="text-xs sm:text-sm text-accent-editorial font-medium mt-1.5">{w.time}</p>
                      )}
                      <div className="mt-2.5">
                        <button type="button" onClick={() => onOpenWorkshop(w.id)} className="inline-flex items-center space-x-1.5 text-xs text-accent-editorial hover:underline font-semibold uppercase tracking-wider cursor-pointer">
                          <span>View workshop details</span><ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      {w.subtitle && (
                        <p className="text-xs text-muted-editorial font-light mt-0.5">{w.subtitle}</p>
                      )}
                      {w.description && (
                        <p className="text-xs sm:text-sm text-muted-editorial font-light mt-1.5 leading-relaxed">{w.description}</p>
                      )}
                      {w.location && (
                        <p className="text-xs text-muted-editorial font-light mt-1">{w.location}</p>
                      )}

                    </div>
                  </div>

                  {/* Right: Action */}
                  <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-line/40">
                    {w.price != null && (
                      <span className="font-serif text-lg text-main font-medium whitespace-nowrap mr-2">
                        {w.price.toLocaleString()} {w.currency || 'kr'}
                      </span>
                    )}

                    <button
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => onOpenWorkshop(w.id)}
                      className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer ${
                        isSoldOut
                          ? 'bg-alt text-muted-editorial cursor-not-allowed border border-line'
                          : 'bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white'
                      }`}
                    >
                      <span>{isSoldOut ? 'Sold Out' : 'Reserve Spot'}</span>
                      {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Inquiry Contact Box */}
          <div className="p-6 sm:p-8 rounded-2xl border border-line bg-alt/30 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-xl text-main font-normal">
                Questions about dates or reservations?
              </h3>
              <p className="text-xs sm:text-sm text-muted-editorial font-light max-w-xl">
                Reach out to our team directly for private group cohorts or general workshop inquiries.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 shrink-0">
              {onOpenCancellationPolicy && (
                <button
                  type="button"
                  onClick={onOpenCancellationPolicy}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-line bg-card text-muted-editorial hover:text-main hover:border-main transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-accent-editorial" />
                  <span>Cancellation Policy</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (onOpenContact) {
                    onOpenContact(
                      `Hi SHE. Academy,\n\nI have a question regarding your upcoming workshops.\n\nThank you!`
                    );
                  }
                }}
                className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-line bg-card text-main hover:border-main transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-line bg-card overflow-hidden shadow-xs p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-full bg-alt/50 flex items-center justify-center text-accent-editorial">
            <Compass className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-main font-normal">
              No Workshops Currently Scheduled
            </h2>
            <p className="text-xs sm:text-sm text-muted-editorial leading-relaxed font-light">
              Check back soon for new dates and announcements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onOpenContact) {
                onOpenContact(
                  `Hi SHE. Academy,\n\nI would like to be notified when new workshop dates are announced.\n\nThank you!`
                );
              }
            }}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all shadow-xs cursor-pointer flex items-center space-x-2"
          >
            <span>Notify Me</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
