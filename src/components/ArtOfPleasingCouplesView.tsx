import React from 'react';
import { Calendar, MapPin, Users, ShieldCheck, Clock, ArrowLeft, ArrowRight, Heart, Sparkles, HelpCircle, FileText } from 'lucide-react';

interface ArtOfPleasingCouplesViewProps {
  onNavigate: (view: any) => void;
  onOpenContact: (prefilledMessage?: string) => void;
}

export const ArtOfPleasingCouplesView: React.FC<ArtOfPleasingCouplesViewProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const handleRegisterClick = () => {
    onOpenContact(
      `Hi Daniela,\n\nI would like to register for the workshop "The Art of Pleasing (For Couples)".\n\nPlease let us know the availability, scheduling, and next steps.\n\nThank you!`
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

      {/* Premium Hero Banner (Using the couple background photo) */}
      <section 
        className="relative py-24 sm:py-32 lg:py-40 bg-cover bg-center text-center overflow-hidden border-b border-line"
        style={{
          backgroundImage: `linear-gradient(rgba(252, 250, 247, 0.78), rgba(252, 250, 247, 0.84)), url('https://www.danielatorp.cz/wp-content/uploads/2020/03/6-1024x1024.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-radial-to-t from-transparent via-[#FCFAF7]/20 to-[#FCFAF7]/50" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-accent-editorial/20 text-[10px] uppercase tracking-widest text-accent-editorial bg-[#B05B43]/5 font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Exclusive Couples Retreat</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-wide text-main leading-tight uppercase">
            The Art of Pleasing (For Couples)
          </h1>
          
          <p className="font-serif text-lg sm:text-xl text-muted-editorial italic max-w-2xl mx-auto font-light leading-relaxed">
            "Intensive couples journey into deeper intimacy and mutual understanding."
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all font-semibold cursor-pointer shadow-lg hover:scale-[1.03]"
            >
              Secure Your Placement
            </button>
          </div>
        </div>
      </section>

      {/* Main Two-Column Segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core Curriculum */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-main">
                Reconnecting Heart &amp; Body
              </h2>
              <div className="h-0.5 w-16 bg-accent-editorial" />
              
              <div className="space-y-4 text-base text-muted-editorial font-light leading-relaxed">
                <p>
                  Discover what men and women truly long for in intimacy. Learn to give, receive, touch, and communicate consciously.
                </p>
                <p>
                  Does it sometimes feel as though you and your partner speak completely different languages? This unique workshop for couples provides an intimate, safe container to step out of routine, reconnect heart and body, and rediscover each other with fresh eyes.
                </p>

                <div className="p-6 rounded-2xl border-l-4 border-accent-editorial bg-alt/30 font-serif italic text-main text-base leading-relaxed my-6">
                  "Step out of daily roles and expectations, release long-held performance pressures, and weave a deep state of continuous presence and love into your relational life."
                </div>
              </div>
            </div>

            {/* What you can expect */}
            <div className="space-y-6 pt-4">
              <h3 className="font-serif text-2xl font-light text-main">
                What can you expect from the retreat?
              </h3>
              
              <div className="space-y-4">
                
                {/* 1 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">01</span>
                    <span>Conscious Communication</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Learn to speak about sensitive desires, physical boundaries, and emotional needs through nonviolent, respect-led communication templates.
                  </p>
                </div>

                {/* 2 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">02</span>
                    <span>Guided Partner Practices</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Experience slowly guided partner touch, somatic feedback methods, and nourishing massage paths to deepen confidence and trust.
                  </p>
                </div>

                {/* 3 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">03</span>
                    <span>Reawakening Spark &amp; Passion</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Dismantle long-term routines and reignite somatic chemistry, polarity, and playful romance under careful clinical and tantric instruction.
                  </p>
                </div>

                {/* 4 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">04</span>
                    <span>Healing Distance &amp; Past Hurt</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Gain safe, grounded somatic tools to soothe relational anxiety, address accumulated distance, and gently heal past intimate disconnects.
                  </p>
                </div>

                {/* 5 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-base text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2.5 py-0.5 rounded-md bg-alt mr-1">05</span>
                    <span>Daily Life Integration Rituals</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Develop specific shared rituals to carry this newly cultivated depth and presence out of the retreat space directly back into your home environment.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Logistics Sidebar */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Quick Logistics Card */}
            <div className="rounded-2xl border border-line bg-[#FCFAF7] p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-xl text-main font-normal">
                Who is this retreat for?
              </h3>
              <div className="h-px bg-line" />

              <ul className="space-y-3.5 text-sm text-muted-editorial font-light">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Couples wanting to deepen their connection and reignite authentic physical attraction.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Partners seeking reliable somatic tools to express and communicate sensitive needs without conflict.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-editorial mr-1.5 font-bold">✓</span>
                  <span>Couples of all orientations, and at any stage—from fresh, new couples to those together for decades.</span>
                </li>
              </ul>

              <div className="h-px bg-line" />

              <div className="space-y-4">
                
                {/* Schedule */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Schedule</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Saturday 10:00 – 18:00<br />
                      Sunday 10:00 – 16:00
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Oslo Venue</h4>
                    <p className="text-sm text-main font-medium mt-0.5">
                      Presence Center, Oslo
                    </p>
                    <p className="text-xs text-muted-editorial font-light mt-0.5">
                      Oslo, Norway
                    </p>
                  </div>
                </div>

                {/* Privacy Safeguard */}
                <div className="flex items-start space-x-3.5">
                  <ShieldCheck className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Absolute Privacy</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      No group partner-swapping or forced group exposures. All physical and tactile exercises take place exclusively with your own partner in a private, safe space.
                    </p>
                  </div>
                </div>

              </div>

              <div className="h-px bg-line" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-muted-editorial">Investment per Couple</span>
                  <span className="font-serif text-lg text-main font-semibold font-mono">5,400 NOK</span>
                </div>
                <p className="text-[10px] text-muted-editorial/80 italic leading-relaxed">
                  Price covers both partners, including premium workshop materials, refreshments, massage oils, and follow-up tools.
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

            {/* Safety details card */}
            <div className="rounded-2xl border border-line bg-alt/10 p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Our Absolute Pledge</span>
              <h3 className="font-serif text-xl text-main font-normal">
                Strict Discretion
              </h3>
              <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed">
                We understand that diving into relationship intimacy can feel incredibly vulnerable. We maintain a non-judgmental, professional container with strict rules of privacy. What happens in the retreat remains in the retreat.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Safety & Trust Banner */}
      <section className="bg-alt/30 py-12 border-t border-b border-line">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Heart className="w-8 h-8 text-accent-editorial mx-auto animate-pulse" />
          <h3 className="font-serif text-xl text-main font-normal">
            Respect-Grounded, Safe Relational Haven
          </h3>
          <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed max-w-2xl mx-auto">
            Your boundaries are absolutely sovereign. Daniela Torp specializes in offering trauma-informed intimacy coaching, ensuring every practice is completed with total mutual consent, clear checkpoints, and comfortable pacing.
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
            <h4 className="text-sm font-semibold text-main">Do we have to share our secrets with the group?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              No. There is no forced sharing of personal history or sexual secrets. You share only what you feel inspired to share, and we respect silence as a profound boundary.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">What clothing should we wear?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              We recommend wearing loose, warm, comfortable clothes (e.g., yoga wear or loose cotton layers) that allow for relaxed sitting and moving.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">What is the language of instruction?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              This session will be conducted in English. Daniela Torp speaks Norwegian and Czech, so customized 1-on-1 assistance is gladly offered in those languages during individual practice.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Is food or lodging included in the price?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              Organic snacks, high-quality teas, and materials are included. Accommodation is not included, but we can recommend several beautiful boutique hotels and apartments within walking distance of Presence Center.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#32231F] text-[#FCFAF7] text-center space-y-4">
          <h4 className="font-serif text-xl sm:text-2xl font-normal">
            Ready to Deepen Your Connection?
          </h4>
          <p className="text-xs sm:text-sm text-[#FCFAF7]/80 max-w-xl mx-auto font-light leading-relaxed">
            Invest in the foundation of your relationship. Take the step to establish an unbreakable, ecstatic somatic container together.
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
