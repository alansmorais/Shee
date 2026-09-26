import React from 'react';
import { Calendar, MapPin, Users, ShieldCheck, Clock, ArrowLeft, ArrowRight, Heart, Sparkles, HelpCircle, FileText } from 'lucide-react';

interface HowToPleaseManViewProps {
  onNavigate: (view: 'home' | 'women' | 'men' | 'workshops' | 'admin' | 'play-with-me-1' | 'art-of-pleasing-woman' | 'how-to-please-a-man') => void;
  onOpenContact: (prefilledMessage?: string) => void;
}

export const HowToPleaseManView: React.FC<HowToPleaseManViewProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const handleRegisterClick = () => {
    onOpenContact(
      `Hi Daniela,\n\nI would like to register for the workshop "The Art of Pleasing a Man" (Reserved for Women).\n\nPlease let me know the availability, booking confirmation, and next steps.\n\nThank you!`
    );
  };

  return (
    <div className="bg-main text-main transition-colors">
      {/* Back Button and Navigation Aid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button
          type="button"
          onClick={() => onNavigate('workshops')}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-muted-editorial hover:text-accent-editorial transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Workshops</span>
        </button>
      </div>

      {/* Premium Hero Banner (Using the exact image from the translation file) */}
      <section 
        className="relative py-24 sm:py-32 lg:py-40 bg-cover bg-center text-center overflow-hidden border-b border-line"
        style={{
          backgroundImage: `linear-gradient(rgba(252, 250, 247, 0.82), rgba(252, 250, 247, 0.88)), url('https://www.danielatorp.cz/wp-content/uploads/2020/03/9-1024x1024.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-radial-to-t from-transparent via-[#FCFAF7]/20 to-[#FCFAF7]/50" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-accent-editorial/20 text-[10px] uppercase tracking-widest text-accent-editorial bg-[#B05B43]/5 font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Reserved for Women</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-wide text-main leading-tight uppercase">
            The Art of Pleasing a Man
          </h1>
          
          <p className="font-serif text-lg sm:text-xl text-muted-editorial italic max-w-2xl mx-auto font-light leading-relaxed">
            "Open the door to a man's deeper emotional and sensual world"
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all font-semibold cursor-pointer shadow-lg hover:scale-[1.03]"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Two-Column Informational Segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Full Curriculum & Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Core Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-main">
                The Art of Pleasing a Man
              </h2>
              <div className="h-0.5 w-16 bg-accent-editorial" />
              
              <div className="space-y-4 text-base text-muted-editorial font-light leading-relaxed">
                <p>
                  Male sexuality is often perceived as simplistic or performance-oriented, yet men have immense potential for depth, vulnerability, and sustained pleasure.
                </p>
                <p>
                  In this inspiring and confidential seminar, women learn how to understand men's energetic centers, ease pressure, and touch a man in a way that allows him to feel honored, desired, and deeply relaxed.
                </p>

                <div className="p-6 rounded-2xl border-l-4 border-accent-editorial bg-alt/30 font-serif italic text-main text-base leading-relaxed my-6">
                  "Explore the gateway to goal-free connection, emotional release, and the sacred practices of tantric intimacy."
                </div>
              </div>
            </div>

            {/* What you can look forward to */}
            <div className="space-y-6 pt-4">
              <h3 className="font-serif text-2xl font-light text-main">
                What can you look forward to?
              </h3>
              
              <div className="space-y-4">
                
                {/* 1 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">01</span>
                    <span>Masculine Erotic Psychology</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Understand the male body and desire mapping beyond superficial myths, performance expectations, and societal stereotypes.
                  </p>
                </div>

                {/* 2 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">02</span>
                    <span>Tantric Lingam Massage Techniques</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Learn the precise methodology of slow, healing touch, true reverence, pelvic floor release, and rhythmic conscious breathing.
                  </p>
                </div>

                {/* 3 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">03</span>
                    <span>Emotional Closeness &amp; Openness</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Discover how to co-create a secure, trauma-informed relational container that naturally allows a man to open up his heart, express emotional vulnerability, and let go of performance goals.
                  </p>
                </div>

                {/* 4 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">04</span>
                    <span>Releasing Performance Anxiety</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Implement powerful energetic feedback loops that ease performance pressure, release muscular tension, and guide your partner into an effortless, ecstatic flow state.
                  </p>
                </div>

                {/* 5 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">05</span>
                    <span>Playful Confidence &amp; Feminine Magnetic Essence</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Connect profoundly with your own feminine magnetic attraction, playful boundaries, and authentic sensual confidence.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Key Logistics, Safety, Hosts info */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Quick Logistics Card */}
            <div className="rounded-2xl border border-line bg-[#FCFAF7] p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-xl text-main font-normal">
                Who is this seminar for?
              </h3>
              <div className="h-px bg-line" />

              <ul className="space-y-3.5 text-sm text-muted-editorial font-light">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Women who wish to surprise and profoundly touch their partner on a soul level.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Those wanting to understand how men truly feel, experience, and communicate their rawest desires.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Anyone seeking greater ease, somatic joy, and total freedom in conscious erotic connection.</span>
                </li>
              </ul>

              <div className="h-px bg-line" />

              <div className="space-y-4">
                
                {/* Duration */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Schedule</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      10:00 – 18:00
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Venue</h4>
                    <p className="text-sm text-main font-medium mt-0.5">
                      Presence Center, Oslo / Tantracentrum Kameňák
                    </p>
                    <p className="text-xs text-muted-editorial font-light mt-0.5">
                      Kamenný Újezd 83, Nýřany
                    </p>
                  </div>
                </div>

                {/* What's included */}
                <div className="flex items-start space-x-3.5">
                  <FileText className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">What is Included</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Organic tea, light healthy nourishment, selection of pure massage oils, and your custom somatic workbook.
                    </p>
                  </div>
                </div>

              </div>

              <div className="h-px bg-line" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-muted-editorial">Investment</span>
                  <span className="font-serif text-lg text-main font-semibold">2,800 NOK</span>
                </div>
                <p className="text-[10px] text-muted-editorial/80 italic leading-relaxed">
                  Fully secure and confidential container. Booking requires registration confirmation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all cursor-pointer text-center"
              >
                Inquire &amp; Register Now
              </button>
            </div>

            {/* Safety & Discretion Card */}
            <div className="rounded-2xl border border-line bg-alt/10 p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Our Sacred Oath</span>
              <h3 className="font-serif text-xl text-main font-normal">
                Absolute Confidentiality
              </h3>
              <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed">
                All inquiries, registrations, and communications are processed strictly confidentially according to rigorous GDPR guidelines. This is a secure, non-judgmental container where you are supported completely.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-alt/30 py-12 border-t border-b border-line">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Heart className="w-8 h-8 text-accent-editorial mx-auto animate-pulse" />
          <h3 className="font-serif text-xl text-main font-normal">
            Safe, Respect-Led &amp; Trauma-Informed Learning Environment
          </h3>
          <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed max-w-2xl mx-auto">
            This seminar is built entirely on respect, confidentiality, and mutual support. Every exercise is 100% optional, consent-centered, and safely facilitated by Daniela Torp. We maintain a non-judgmental container where you are supported exactly as you are.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-7 h-7 text-accent-editorial mx-auto" />
          <h3 className="font-serif text-2xl text-main font-normal">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Can I attend if I am currently single?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              Yes, absolutely! The principles, physiological mappings, and communication insights taught here are completely applicable to future relationships or general self-growth.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Is there any nudity or sexual practice in the group?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              No. This is a fully clothed, educational, and somatic training environment. All mapping, anatomical explanation, and tactile exercises are held with utmost safety and solid boundaries.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">What is the language of instruction?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              This session is delivered in English to accommodate international partners. However, Daniela speaks Norwegian and Czech, so personal assistance in those languages is always available.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">What is the registration cancellation policy?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              We offer full refunds or course transfers up to 7 days before the start date. For specific situations, please drop our admin team a line.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#32231F] text-[#FCFAF7] text-center space-y-4">
          <h4 className="font-serif text-xl sm:text-2xl font-normal">
            Ready to Open the Door to Deeper Intimacy?
          </h4>
          <p className="text-xs sm:text-sm text-[#FCFAF7]/80 max-w-xl mx-auto font-light leading-relaxed">
            Gain the confidence, knowledge, and slow-touch competence to create an effortless somatic connection. Spaces are filled on a first-come, first-served basis.
          </p>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest bg-accent-editorial text-white hover:bg-white hover:text-main transition-all font-semibold cursor-pointer shadow-md"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
