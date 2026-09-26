import React from 'react';
import { Calendar, MapPin, Users, ShieldCheck, Clock, CheckCircle2, ArrowLeft, ArrowRight, Heart, Sparkles, HelpCircle } from 'lucide-react';

interface PlayWithMe2ViewProps {
  onNavigate: (view: 'home' | 'women' | 'men' | 'workshops' | 'admin' | 'play-with-me-1' | 'play-with-me-2') => void;
  onOpenContact: (prefilledMessage?: string) => void;
}

export const PlayWithMe2View: React.FC<PlayWithMe2ViewProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const handleRegisterClick = () => {
    onOpenContact(
      `Hi Daniela,\n\nI would like to register for the workshop "Play with Me – Level 2" (3-day advanced retreat).\n\nPlease let me know the pricing, pre-requisites, and registration steps.\n\nThank you!`
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

      {/* Premium Hero Banner (Using the playwme.jpeg background image matching Level 1) */}
      <section 
        className="relative py-24 sm:py-32 lg:py-40 bg-cover bg-center text-center overflow-hidden border-b border-line"
        style={{
          backgroundImage: `linear-gradient(rgba(252, 250, 247, 0.85), rgba(252, 250, 247, 0.92)), url('https://www.danielatorp.cz/wp-content/uploads/2024/10/playwme.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-radial-to-t from-transparent via-[#FCFAF7]/20 to-[#FCFAF7]/50" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-accent-editorial/20 text-[10px] uppercase tracking-widest text-accent-editorial bg-[#B05B43]/5 font-semibold">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Advanced 3-Day Somatic Retreat (Level 2)</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-wide text-main leading-tight uppercase">
            Play with Me – Level 2
          </h1>
          
          <p className="font-serif text-lg sm:text-xl text-muted-editorial italic max-w-2xl mx-auto font-light leading-relaxed">
            "Going deeper into the shadows of desire, advanced bondage, and conscious submission."
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all font-semibold cursor-pointer shadow-lg hover:scale-[1.03]"
            >
              Request Level 2 Placement
            </button>
          </div>
        </div>
      </section>

      {/* Main Two-Column Informational Segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Full Curriculum & Journey Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Core Description */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-main">
                About the Advanced Experience
              </h2>
              <div className="h-0.5 w-16 bg-accent-editorial" />
              
              <div className="space-y-4 text-base text-muted-editorial font-light leading-relaxed">
                <p>
                  Having established the foundational containers of absolute consent, basic impact, and cord principles in Level 1, Level 2 calls you to venture further. This is an exploration of the wilder, shadow edges of your desire within an environment of exquisite safety and mastery.
                </p>
                <p>
                  On this retreat, we dive deep into the psychological layers of submission and dominance, advanced kinesthetic bondage, edge-play safety, and deep somatic energy exchange. We look at what is awakened when we play on the threshold of fear, surrender, and absolute trust.
                </p>
                <p>
                  This journey is designed to liberate old somatic blockages and unlock a level of relational intimacy and creative power that is rarely accessed. Every shadow, fantasy, and boundary is held with high clinical and somatic stewardship.
                </p>
                <p className="font-serif text-main italic font-medium">
                  Pre-requisite: Completion of Play with Me – Level 1 or equivalent trauma-informed kink/somatic retreat.
                </p>
              </div>
            </div>

            {/* The 3-Day Journey Timeline */}
            <div className="space-y-6 pt-4">
              <h3 className="font-serif text-2xl font-light text-main">
                The Three-Day Advanced Path
              </h3>
              
              <div className="space-y-6">
                
                {/* Friday */}
                <div className="p-6 rounded-2xl border border-line bg-alt/20 space-y-3 relative overflow-hidden group hover:border-accent-editorial/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-editorial" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Day 1 • Friday</span>
                  <h4 className="font-serif text-lg text-main font-semibold">
                    The Psychology of Power – Surrender, Dominance &amp; Devotion
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    This day focuses entirely on the deep psychological archetypes of power play. We map out conscious submission, loving dominance, and sacred devotion. Through advanced boundary communication exercises, we safely explore the shadow aspects of desire, guilt-free expression, and the somatic resonance of vocalizing deep commands and complete surrender.
                  </p>
                </div>

                {/* Saturday */}
                <div className="p-6 rounded-2xl border border-line bg-alt/20 space-y-3 relative overflow-hidden group hover:border-accent-editorial/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-editorial" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Day 2 • Saturday</span>
                  <h4 className="font-serif text-lg text-main font-semibold">
                    Advanced Kinesthetic Bondage &amp; Deep Sensory Impact
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    We transition into advanced cord/rope work, suspension concepts, and deep, continuous sensory impact play. Learn advanced knot security, nerve safety, and aesthetic body mapping under close guidance. Explore the profound nervous system shift that occurs during long, ritualistic impact and bondage scenes. The evening culminates in a curated, fully supervised Advanced Scene Play Sanctuary.
                  </p>
                </div>

                {/* Sunday */}
                <div className="p-6 rounded-2xl border border-line bg-alt/20 space-y-3 relative overflow-hidden group hover:border-accent-editorial/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-editorial" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Day 3 • Sunday</span>
                  <h4 className="font-serif text-lg text-main font-semibold">
                    Edge Play, Altered States of Consciousness &amp; Aftercare Stewardship
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    We conclude by exploring edge-play safety protocols, temperature play, and entering deep trance states via conscious play. We focus heavily on "Sub-drop" and "Dom-crash" prevention, professional somatic aftercare, emotional integration, and how to safely bring these powerful realizations back into your daily lifestyle.
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
                Retreat Details
              </h3>
              <div className="h-px bg-line" />

              <div className="space-y-4">
                
                {/* Duration */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Schedule</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Friday 17:00 – Sunday 17:00
                    </p>
                  </div>
                </div>

                {/* Suitability */}
                <div className="flex items-start space-x-3.5">
                  <Users className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Pre-Requisite</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Open to singles &amp; couples. Prior completion of Play with Me – Level 1 (or verifiable equivalent experience) is required.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Sanctuary Venue</h4>
                    <p className="text-sm text-main font-medium mt-0.5">
                      Tantracentrum Kameňák
                    </p>
                    <p className="text-xs text-muted-editorial font-light mt-0.5">
                      Kamenný Újezd 83, Nýřany
                    </p>
                    <p className="text-[11px] text-muted-editorial/80 italic mt-1">
                      🚗 5 mins drive from Bory (direction Zbůch, Nýřany)<br />
                      🚆 Hourly direct train connections from Pilsen (20 min journey)
                    </p>
                  </div>
                </div>

                {/* What to Bring */}
                <div className="flex items-start space-x-3.5">
                  <ShieldCheck className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">What to Prepare</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Bring comfortable clothing, your personal toy collection, ropes, and impact tools if you have them. Writing journal is required.
                    </p>
                  </div>
                </div>

              </div>

              <div className="h-px bg-line" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-muted-editorial">Course Investment</span>
                  <span className="font-serif text-lg text-main font-semibold">Upon Inquiry</span>
                </div>
                <p className="text-[10px] text-muted-editorial/80 italic leading-relaxed">
                  Price options, accommodation packages, and confirmation details will be sent directly to your email upon inquiry.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all cursor-pointer text-center"
              >
                Apply for Level 2 Placement
              </button>
            </div>

            {/* Hosts / Facilitators Card */}
            <div className="rounded-2xl border border-line bg-alt/10 p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Your Experienced Guides</span>
              <h3 className="font-serif text-xl text-main font-normal">
                Daniela Torp &amp; Bas van der Tang
              </h3>
              <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed">
                Daniela and Bas unite profound anatomical knowledge, consent-based play mechanics, tantric teachings, and conscious kink safety. Together, they have curated this trauma-informed, deeply loving sanctuary so you can comfortably explore the absolute heights of kinky play and deep somatic sensuality.
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
            Trauma-Informed &amp; Consent-First Safety Policy
          </h3>
          <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed max-w-2xl mx-auto">
            Your boundaries are absolutely sacred. Every exercise in this retreat is completely optional. We establish rigorous safe-words, physical check-ins, and clear consent protocols. No sexual or physical interaction is ever forced, and we hold a strictly confidential, non-judgmental container.
          </p>
        </div>
      </section>

      {/* Direct FAQ and Registration Help */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-7 h-7 text-accent-editorial mx-auto" />
          <h3 className="font-serif text-2xl text-main font-normal">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Can I attend if I didn't complete Level 1 with you?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              If you have verifiable prior experience from another reputable somatic kink/BDSM school, you can request an interview with Daniela to bypass the Level 1 requirement.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Is there suspension bondage in Level 2?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              We cover the technical pre-requisites and safety of partial suspension, but full suspension is reserved for our specialized Level 3 circles to protect nerve and physical integrity.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">What is the language of instruction?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              This session will be held in English as it is a premium international cohort. However, Daniela speaks Norwegian and Czech, so personal assistance in those languages is always available.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Are lodging and food included?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              We offer multiple packages including local lodging partners and organic catering. Full details will be provided in our registration guide sent to your inbox.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-accent-editorial text-white text-center space-y-4">
          <h4 className="font-serif text-xl sm:text-2xl font-normal">
            Ready to Deepen Your Practice?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            Reach out to Daniela and our admissions team directly today. Placements are highly limited to preserve a close, intimate, and deeply secure group dynamic.
          </p>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest bg-white text-main hover:bg-[#32231F] hover:text-[#FCFAF7] transition-all font-semibold cursor-pointer shadow-md"
          >
            <span>Inquire &amp; Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
