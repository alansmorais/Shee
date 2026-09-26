import React from 'react';
import { Calendar, MapPin, Users, ShieldCheck, Clock, ArrowLeft, ArrowRight, Heart, Sparkles, HelpCircle, FileText } from 'lucide-react';

interface ArtOfPleasingWomanViewProps {
  onNavigate: (view: 'home' | 'women' | 'men' | 'workshops' | 'admin' | 'play-with-me-1' | 'art-of-pleasing-woman') => void;
  onOpenContact: (prefilledMessage?: string) => void;
}

export const ArtOfPleasingWomanView: React.FC<ArtOfPleasingWomanViewProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const handleRegisterClick = () => {
    onOpenContact(
      `Hi Daniela,\n\nI would like to register for the workshop "The Art of Pleasing a Woman" (Exclusively for Men).\n\nPlease let me know the availability, pricing, and next registration steps.\n\nThank you!`
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

      {/* Premium Hero Banner (Using the exact image background) */}
      <section 
        className="relative py-24 sm:py-32 lg:py-40 bg-cover bg-center text-center overflow-hidden border-b border-line"
        style={{
          backgroundImage: `linear-gradient(rgba(252, 250, 247, 0.82), rgba(252, 250, 247, 0.88)), url('https://www.danielatorp.cz/wp-content/uploads/2020/03/2-1024x1024.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-radial-to-t from-transparent via-[#FCFAF7]/20 to-[#FCFAF7]/50" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-accent-editorial/20 text-[10px] uppercase tracking-widest text-accent-editorial bg-[#B05B43]/5 font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Exclusively for Men</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-wide text-main leading-tight uppercase">
            The Art of Pleasing a Woman
          </h1>
          
          <p className="font-serif text-lg sm:text-xl text-muted-editorial italic max-w-2xl mx-auto font-light leading-relaxed">
            "Become a conscious, present, and confident lover."
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all font-semibold cursor-pointer shadow-lg hover:scale-[1.03]"
            >
              Reserve Your Place
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
                Understanding the Mystery
              </h2>
              <div className="h-0.5 w-16 bg-accent-editorial" />
              
              <div className="space-y-4 text-base text-muted-editorial font-light leading-relaxed">
                <p>
                  A woman is mysterious. Sometimes gentle and vulnerable, other times decisive and strong. She is like a flower: she can open up to a new day with open arms, or she can completely close in on herself. Get to know your flower.
                </p>
                <p>
                  Are women a mystery to you as well? Sometimes it takes so little for her to be completely satisfied. Other times you can try your absolute best, and the only response you get is: <em className="italic">"Yeah, it was totally fine."</em>
                </p>
                <p>
                  Register for our workshop and take a conscious step toward a richer, safer, and more secure intimate life. This course is about your willingness to understand, perceive, and listen on a much deeper level.
                </p>

                <div className="p-6 rounded-2xl border-l-4 border-accent-editorial bg-alt/30 font-serif italic text-main text-base leading-relaxed my-6">
                  "You will learn to recognize when your woman feels good and what she truly needs. Discover the beauty of genuine care and become the lover she dreams of."
                </div>
              </div>
            </div>

            {/* What you will learn */}
            <div className="space-y-6 pt-4">
              <h3 className="font-serif text-2xl font-light text-main">
                Key Benefits of Attendance
              </h3>
              
              <div className="space-y-4">
                
                {/* 1 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-lg text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2 py-0.5 rounded-md bg-alt mr-1">01</span>
                    <span>Recognize True Desire</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Finally learn to recognize if and when your partner truly desires intimacy and physical closeness—and when she is merely accommodating your wishes out of habit.
                  </p>
                </div>

                {/* 2 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-lg text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2 py-0.5 rounded-md bg-alt mr-1">02</span>
                    <span>Understand the Sexual Differences</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Gain deep, practical insights into the fundamental physiological and emotional differences between female and male sexual experiences and energy waves.
                  </p>
                </div>

                {/* 3 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-lg text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2 py-0.5 rounded-md bg-alt mr-1">03</span>
                    <span>The Art of Gentle, Slow Touch</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    We will teach you how to touch a woman slowly, consciously, and with absolute presence. During practical non-judgmental exercises, you will receive honest and valuable guidance.
                  </p>
                </div>

                {/* 4 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-lg text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2 py-0.5 rounded-md bg-alt mr-1">04</span>
                    <span>Awakening Arousal &amp; Sensuality</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    Learn what truly awakens her deepest sensuality, and how you can show up with absolute calm, centered masculinity, and solid self-assurance.
                  </p>
                </div>

                {/* 5 */}
                <div className="p-6 rounded-2xl border border-line bg-card space-y-2">
                  <h4 className="font-serif text-lg text-main font-semibold flex items-center space-x-2">
                    <span className="text-accent-editorial font-mono text-xs border border-accent-editorial/20 px-2 py-0.5 rounded-md bg-alt mr-1">05</span>
                    <span>Intimate Massage &amp; Reflexology</span>
                  </h4>
                  <p className="text-sm text-muted-editorial font-light leading-relaxed">
                    We will thoroughly cover safe, sacred intimate massage of the female body, including key anatomical erogenous reflex points and nervous system maps.
                  </p>
                </div>

              </div>
            </div>

            <p className="text-sm text-muted-editorial font-light leading-relaxed">
              Whether you are newly dating, looking to rekindle passion in a long-term marriage, or navigating how intimacy shifts after pregnancy and childbirth—on this workshop you will learn to understand a woman and gift her with the care, presence, and pleasure she deeply deserves.
            </p>

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
                      Starts promptly at 10:00. Please arrive by 09:45 to settle in.
                    </p>
                  </div>
                </div>

                {/* Suitability */}
                <div className="flex items-start space-x-3.5">
                  <Users className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">Attendance</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Designed and conducted exclusively for men in a safe, respect-led, confidential atmosphere.
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
                      🚆 Hourly train connections from Pilsen (20 min journey)
                    </p>
                  </div>
                </div>

                {/* What to Bring */}
                <div className="flex items-start space-x-3.5">
                  <FileText className="w-5 h-5 text-accent-editorial shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-main">What to Bring</h4>
                    <p className="text-sm text-muted-editorial font-light mt-0.5">
                      Comfortable, soft clothing, and a notepad with a pen for your personal insights.
                    </p>
                  </div>
                </div>

              </div>

              <div className="h-px bg-line" />
              
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-muted-editorial">Investment</span>
                  <span className="font-serif text-lg text-main font-semibold">2,900 CZK</span>
                </div>
                <p className="text-[10px] text-muted-editorial/80 italic leading-relaxed">
                  Spaces are highly limited to preserve a highly secure, confidential, and individual learning space.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRegisterClick}
                className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#32231F] text-[#FCFAF7] hover:bg-accent-editorial hover:text-white transition-all cursor-pointer text-center"
              >
                Inquire &amp; Reserve Spot
              </button>
            </div>

            {/* Testimonials section */}
            <div className="space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-editorial">Client Testimonials</span>
              
              {/* T1 */}
              <div className="rounded-2xl border border-line bg-alt/10 p-5 space-y-2.5">
                <p className="text-xs sm:text-sm text-muted-editorial italic font-light leading-relaxed">
                  "Thank you so much for a real eye-opener, not only in the sexual area. Daniela has an incredibly pleasant, warm, and safe approach. It's amazing to learn from someone who truly understands her field. It was absolutely worth it!"
                </p>
                <div className="text-xs font-semibold text-accent-editorial font-serif">— Lucie Lomská</div>
              </div>

              {/* T2 */}
              <div className="rounded-2xl border border-line bg-alt/10 p-5 space-y-2.5">
                <p className="text-xs sm:text-sm text-muted-editorial italic font-light leading-relaxed">
                  "An educational and surprising experience for anyone wanting to break old myths. The world is connected completely differently than we often think. The possibilities are endless!"
                </p>
                <div className="text-xs font-semibold text-accent-editorial font-serif">— Hana Valentová-Vojtová</div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Safety & Trust Banner */}
      <section className="bg-alt/30 py-12 border-t border-b border-line">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <Heart className="w-8 h-8 text-accent-editorial mx-auto animate-pulse" />
          <h3 className="font-serif text-xl text-main font-normal">
            Safe, Confidential &amp; Trauma-Informed Learning Environment
          </h3>
          <p className="text-xs sm:text-sm text-muted-editorial font-light leading-relaxed max-w-2xl mx-auto">
            This seminar is built entirely on respect, confidentiality, and mutual support. Every exercise is 100% optional, consent-centered, and safely facilitated by Daniela Torp. We maintain a non-judgmental container where you are supported exactly as you are.
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
            <h4 className="text-sm font-semibold text-main">Can I attend if I am currently single?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              Yes, absolutely! The principles, somatic touch mappings, and communication insights taught here are completely applicable to future relationships or general self-growth.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Is there any nudity or sexual practice in the group?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              No. This is a fully clothed, educational, and somatic training environment. All mapping, anatomical explanation, and tactile exercises are held with utmost safety and solid boundaries.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-line space-y-2 bg-card">
            <h4 className="text-sm font-semibold text-main">Are the teachings held in English?</h4>
            <p className="text-xs text-muted-editorial font-light leading-relaxed">
              The primary course material and presentations will be delivered in English. However, Daniela speaks Czech and Norwegian, so any personal explanations or 1-on-1 questions can be conducted in your native tongue.
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
            Ready to Deepen Your Understanding?
          </h4>
          <p className="text-xs sm:text-sm text-[#FCFAF7]/80 max-w-xl mx-auto font-light leading-relaxed">
            Take a step toward becoming a truly conscious, confident, and highly desired partner. Spaces are filled on a first-come, first-served basis.
          </p>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest bg-accent-editorial text-white hover:bg-white hover:text-main transition-all font-semibold cursor-pointer shadow-md"
          >
            <span>Reserve Your Place Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
