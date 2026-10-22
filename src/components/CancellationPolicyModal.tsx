import React from 'react';
import { FileText, X } from 'lucide-react';

interface CancellationPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CancellationPolicyModal: React.FC<CancellationPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="cancellation-policy-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-main rounded-2xl border border-line p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-editorial hover:text-main hover:bg-alt/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-line/60 pb-5">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-accent-editorial">
            <FileText className="w-3.5 h-3.5" />
            <span>SHE. Academy &amp; Daniela Torp</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-main font-normal">
            Cancellation Policy
          </h2>
          <p className="text-xs sm:text-sm text-muted-editorial font-light italic">
            Workshops, Seminars, Massages and Individual Sessions
          </p>
        </div>

        {/* Modal Content */}
        <div className="space-y-6 text-xs sm:text-sm text-main font-light leading-relaxed">
          {/* Introductory Preamble */}
          <div className="p-4 rounded-xl bg-alt/40 border border-line/60 text-muted-editorial italic">
            At Daniela Torp, I value your time and appreciate the trust you place in my work. Every session and workshop requires time, preparation and care. To ensure a respectful and professional experience for everyone, I kindly ask all clients to familiarise themselves with the following cancellation policy.
          </div>

          {/* Section 1 */}
          <div className="space-y-2.5">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-main border-b border-line/40 pb-1">
              1. Workshops and Seminars
            </h3>
            <ul className="space-y-2 list-disc list-inside text-muted-editorial pl-1">
              <li>
                <strong className="text-main font-medium">14 days or more before the event:</strong> A full refund (100%) will be issued.
              </li>
              <li>
                <strong className="text-main font-medium">7–13 days before the event:</strong> A 50% refund will be issued.
              </li>
              <li>
                <strong className="text-main font-medium">Less than 7 days before the event:</strong> The booking fee is non-refundable, subject to applicable consumer rights.
              </li>
            </ul>
            <p className="text-muted-editorial pt-1">
              If you are unable to attend, you may request to transfer your booking to another person, subject to prior approval.
            </p>
            <p className="text-muted-editorial">
              If I cancel an event, you will be offered either a full refund or the option to transfer your payment to another event.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2.5">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-main border-b border-line/40 pb-1">
              2. Massages and Individual Sessions
            </h3>
            <p className="text-muted-editorial">
              For individual appointments, including massages and consultations, the following cancellation terms apply:
            </p>
            <ul className="space-y-2 list-disc list-inside text-muted-editorial pl-1">
              <li>
                <strong className="text-main font-medium">48 hours or more before your appointment:</strong> You may cancel or reschedule free of charge.
              </li>
              <li>
                <strong className="text-main font-medium">Less than 48 hours before your appointment:</strong> A cancellation fee of 50% of the service price applies.
              </li>
              <li>
                <strong className="text-main font-medium">Less than 24 hours before your appointment, or failure to attend without notice:</strong> A cancellation fee of 100% of the service price applies.
              </li>
            </ul>
            <p className="text-muted-editorial pt-1">
              If unexpected and serious circumstances prevent you from attending, please contact me as soon as possible. I will consider such situations individually and with understanding.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2.5">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-main border-b border-line/40 pb-1">
              3. How to Cancel or Reschedule
            </h3>
            <p className="text-muted-editorial">
              Please notify me in writing by email or through the communication channel used to make your booking.
            </p>
            <p className="text-muted-editorial">
              The time at which your written cancellation is received will determine which cancellation terms apply.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2.5">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-main border-b border-line/40 pb-1">
              4. Consumer Rights
            </h3>
            <p className="text-muted-editorial">
              This cancellation policy does not override any mandatory rights you may have under Norwegian or applicable EEA consumer protection legislation, including any statutory right of withdrawal where applicable.
            </p>
            <p className="text-muted-editorial">
              The right of withdrawal and the cancellation terms for a specific appointment or event are separate matters. Any applicable statutory rights will take precedence over these terms.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2.5 bg-alt/30 p-4 rounded-xl border border-line/60">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-main">
              5. A Note of Appreciation
            </h3>
            <p className="text-muted-editorial">
              Thank you for respecting my time, my work and the space we create together. Your understanding helps me provide a thoughtful, safe and professional experience for every client.
            </p>
            <div className="pt-2 text-main font-medium font-serif">
              <p className="text-base">Warmly,</p>
              <p className="text-lg text-accent-editorial">Daniela Torp</p>
              <p className="text-xs text-muted-editorial font-sans uppercase tracking-widest font-normal">Founder of SHE Academy</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-line/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
};
