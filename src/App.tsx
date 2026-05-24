import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Star, ArrowRight, Map as MapIcon, Compass, Camera, 
  Heart, MessageCircle, MapPin, CheckCircle, PlaneTakeoff, 
  Plus, Send, Instagram, Youtube, Twitter, ChevronDown 
} from 'lucide-react';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

    :root {
      --brand-color: #fde047;
      --brand-color-rgb: 253, 224, 71;
    }

    body {
      background-color: #0a0a0a;
      color: #f3f4f6;
      overflow-x: hidden;
      font-family: 'Outfit', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: 'Space Grotesk', sans-serif;
    }

    .bg-grain {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 50; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .glass {
      background: rgba(23, 23, 23, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .glass-card {
      background: linear-gradient(145deg, rgba(38,38,38,0.4) 0%, rgba(23,23,23,0.4) 100%);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .glass-card:hover {
      transform: translateY(-5px);
      border-color: rgba(253, 224, 71, 0.3);
      box-shadow: 0 10px 30px -10px rgba(253, 224, 71, 0.1);
    }

    .cursor-dot {
      width: 8px; height: 8px;
      background-color: var(--brand-color);
      position: fixed; border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s;
    }

    .cursor-outline {
      width: 40px; height: 40px;
      border: 1px solid rgba(var(--brand-color-rgb), 0.5);
      position: fixed; border-radius: 50%;
      pointer-events: none; z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background-color 0.2s;
    }
    
    @media (pointer: coarse) {
      .cursor-dot, .cursor-outline { display: none; }
    }

    .text-gradient {
      background: linear-gradient(to right, #fef08a, #fde047);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    .hover-underline-animation {
      display: inline-block;
      position: relative;
    }
    .hover-underline-animation::after {
      content: ''; position: absolute; width: 100%; transform: scaleX(0);
      height: 2px; bottom: -4px; left: 0;
      background-color: var(--brand-color);
      transform-origin: bottom right; transition: transform 0.25s ease-out;
    }
    .hover-underline-animation:hover::after {
      transform: scaleX(1); transform-origin: bottom left;
    }
    
    .faq-answer {
      max-height: 0; overflow: hidden;
      transition: max-height 0.3s ease-out, padding 0.3s ease;
    }
    .active .faq-answer {
      max-height: 200px; padding-top: 1rem; padding-bottom: 0.5rem;
    }
    .faq-icon { transition: transform 0.3s ease; }
    .active .faq-icon { transform: rotate(45deg); color: var(--brand-color); }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll state for Navbar
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Custom Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        const { clientX: x, clientY: y } = e;
        cursorDotRef.current.style.left = `${x}px`;
        cursorDotRef.current.style.top = `${y}px`;
        
        cursorOutlineRef.current.animate({
          left: `${x}px`,
          top: `${y}px`
        }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Intersection Observer for Reveal Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleHoverEnter = () => {
    if (cursorOutlineRef.current) {
      cursorOutlineRef.current.style.width = '60px';
      cursorOutlineRef.current.style.height = '60px';
      cursorOutlineRef.current.style.backgroundColor = 'rgba(253, 224, 71, 0.1)';
    }
  };

  const handleHoverLeave = () => {
    if (cursorOutlineRef.current) {
      cursorOutlineRef.current.style.width = '40px';
      cursorOutlineRef.current.style.height = '40px';
      cursorOutlineRef.current.style.backgroundColor = 'transparent';
    }
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="antialiased selection:bg-yellow-300 selection:text-neutral-950 bg-neutral-950 min-h-screen text-gray-100">
      <CustomStyles />
      <div className="bg-grain"></div>

      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorOutlineRef} className="cursor-outline"></div>

      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-200/10 blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-neutral-950/50' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass rounded-full px-6 py-3 flex justify-between items-center">
            <a href="#" className="font-heading font-bold text-xl tracking-tight text-white z-50">
              Gunawan<span className="text-yellow-300">.</span>
            </a>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['About', 'Services', 'Process', 'Reviews'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="text-sm text-gray-300 hover:text-white hover-underline-animation transition-colors cursor-hover"
                   onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                  {item}
                </a>
              ))}
              <a href="mailto:gunnawantour@gmail.com" 
                 className="px-5 py-2 rounded-full bg-white text-neutral-950 font-medium text-sm hover:bg-yellow-300 transition-colors cursor-hover"
                 onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                Let's Talk
              </a>
            </div>

            <button className="md:hidden text-white z-50 cursor-hover" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-40 transform transition-transform duration-300 flex flex-col justify-center items-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col space-y-8 text-center">
            {['About', 'Services', 'Process', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                 className="text-2xl font-heading font-medium text-white hover:text-yellow-300 transition-colors">
                {item}
              </a>
            ))}
            <a href="mailto:gunnawantour@gmail.com" onClick={() => setIsMenuOpen(false)}
               className="mt-4 px-8 py-3 rounded-full bg-yellow-300 text-neutral-950 font-medium text-lg">
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      {}
      <main className="relative z-10">
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-yellow-300/30 bg-yellow-300/10 text-yellow-300 text-sm font-medium mb-6 reveal">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
                  </span>
                  Available for new adventures
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 reveal reveal-delay-1">
                  Explore the <br />
                  <span className="text-gradient italic pr-2">unseen</span> world.
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 reveal reveal-delay-2 leading-relaxed">
                  I'm Gunawan, a passionate travel guide dedicated to crafting unforgettable journeys for the young and adventurous.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 reveal reveal-delay-3">
                  <a href="mailto:gunnawantour@gmail.com" 
                     className="group relative px-8 py-4 rounded-full bg-white text-neutral-950 font-semibold text-lg overflow-hidden w-full sm:w-auto text-center"
                     onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                    <span className="relative z-10 group-hover:text-neutral-950 transition-colors">Start Your Journey</span>
                    <div className="absolute inset-0 bg-yellow-300 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
                  </a>
                  <a href="#services" className="flex items-center text-white hover:text-yellow-300 transition-colors"
                     onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                    <span className="mr-2 font-medium">View Services</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end reveal relative">
                <div className="relative w-72 h-96 md:w-96 md:h-[32rem] rounded-[2rem] p-1 bg-gradient-to-b from-yellow-300/50 to-transparent">
                  <div className="absolute inset-0 bg-yellow-300/20 blur-xl rounded-[2rem] -z-10"></div>
                  <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1000&auto=format&fit=crop" 
                       alt="Gunawan" 
                       className="w-full h-full object-cover rounded-[1.8rem] grayscale hover:grayscale-0 transition-all duration-700 cursor-hover"
                       onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} />
                       
                  <div className="absolute -bottom-6 -left-6 md:-left-12 glass rounded-2xl p-4 flex items-center space-x-4 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-12 h-12 rounded-full bg-yellow-300/20 flex items-center justify-center text-yellow-300">
                      <Star size={24} className="fill-yellow-300" />
                    </div>
                    <div>
                      <p className="text-white font-bold font-heading text-lg">5.0</p>
                      <p className="text-gray-400 text-xs">Top Rated Guide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500 hover:text-yellow-300 transition-colors animate-pulse"
             onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <span className="text-xs uppercase tracking-widest mb-2 font-medium">Scroll</span>
            <ChevronDown size={20} />
          </a>
        </section>

        {}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 reveal">
                <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">About Me</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">More than just a guide.</h3>
              </div>
              
              <div className="lg:col-span-7 reveal reveal-delay-1 text-gray-300 text-lg space-y-6">
                <p>Hey there! I'm Gunawan. For the past years, I've been helping young travelers (18-25) navigate through hidden gems, vibrant cultures, and adrenaline-pumping adventures.</p>
                <p>I don't just show you places; I create experiences tailored to your vibe. Whether you're a backpacker looking for local secrets or a group of friends seeking the ultimate road trip, I handle the logistics so you can focus on making memories.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-800 mt-8">
                  <div>
                    <h4 className="text-3xl font-heading font-bold text-white mb-1">50+</h4>
                    <p className="text-sm text-gray-400">Trips Led</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-heading font-bold text-white mb-1">100%</h4>
                    <p className="text-sm text-gray-400">Satisfaction</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-heading font-bold text-white mb-1">24/7</h4>
                    <p className="text-sm text-gray-400">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section id="services" className="py-24 bg-neutral-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">Services</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold">How I can help you explore.</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="glass-card rounded-3xl p-8 reveal reveal-delay-1 group" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-300 mb-6 group-hover:scale-110 transition-transform">
                  <MapIcon size={28} />
                </div>
                <h4 className="text-2xl font-heading font-bold text-white mb-4">Custom Itineraries</h4>
                <p className="text-gray-400 leading-relaxed mb-6">Personalized travel plans designed around your interests, budget, and pace. No cookie-cutter tours here.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Day-by-day planning</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Budget optimization</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Hidden spot recommendations</li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="glass-card rounded-3xl p-8 reveal reveal-delay-2 relative overflow-hidden group" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-yellow-300/10 blur-[50px] -z-10 rounded-full"></div>
                <div className="w-14 h-14 rounded-2xl bg-yellow-300 text-neutral-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Compass size={28} />
                </div>
                <h4 className="text-2xl font-heading font-bold text-white mb-4">Guided Tours</h4>
                <p className="text-gray-400 leading-relaxed mb-6">Full-service guiding where I accompany you, handling navigation, local translations, and adjustments.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Local insights & history</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Safe navigation</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Real-time flexibility</li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="glass-card rounded-3xl p-8 reveal reveal-delay-3 group" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-300 mb-6 group-hover:scale-110 transition-transform">
                  <Camera size={28} />
                </div>
                <h4 className="text-2xl font-heading font-bold text-white mb-4">Adventure & Photo</h4>
                <p className="text-gray-400 leading-relaxed mb-6">Action-packed trips focusing on outdoor activities, plus I'll help capture those perfect moments for your feed.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Hiking & exploring</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Best photo spots</li>
                  <li className="flex items-center"><CheckCircle size={14} className="text-yellow-300 mr-3" /> Equipment assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 reveal">
                <div className="space-y-4 mt-8">
                  <img src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop" alt="Adventure" className="w-full h-48 object-cover rounded-2xl" />
                  <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop" alt="Travel" className="w-full h-64 object-cover rounded-2xl" />
                </div>
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop" alt="Guide" className="w-full h-64 object-cover rounded-2xl" />
                  <div className="glass-card h-48 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <Heart size={32} className="text-yellow-300 mb-3 fill-yellow-300" />
                    <p className="text-white font-heading font-medium">Curated for Gen Z</p>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 reveal reveal-delay-1">
                <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">The Advantage</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-8">Why travel with me?</h3>
                
                <div className="space-y-6">
                  {/* Point 1 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-300 mt-1">01</div>
                    <div className="ml-6">
                      <h4 className="text-xl font-heading font-bold text-white mb-2">Vibe Match</h4>
                      <p className="text-gray-400">I specialize in young travelers (18-25). I know what you want: authentic experiences, good food, aesthetic spots, and flexibility.</p>
                    </div>
                  </div>
                  {/* Point 2 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-300 mt-1">02</div>
                    <div className="ml-6">
                      <h4 className="text-xl font-heading font-bold text-white mb-2">Zero Stress</h4>
                      <p className="text-gray-400">From booking transport to finding the best local street food, I handle the logistics so you don't waste time arguing over Google Maps.</p>
                    </div>
                  </div>
                  {/* Point 3 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-yellow-300 mt-1">03</div>
                    <div className="ml-6">
                      <h4 className="text-xl font-heading font-bold text-white mb-2">Local Connections</h4>
                      <p className="text-gray-400">Skip the tourist traps. I'll connect you with local cultures, secret spots, and experiences you won't find on standard travel blogs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 bg-neutral-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20 reveal">
              <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">Process</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold">How we make it happen.</h3>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent -translate-y-1/2 z-0"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                
                <div className="reveal reveal-delay-1 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-950 border-2 border-yellow-300 flex items-center justify-center text-xl font-heading font-bold text-white mb-6 relative">
                    1
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-yellow-300 text-neutral-950 flex items-center justify-center text-xs">
                      <MessageCircle size={12} />
                    </div>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white mb-2">Discovery Call</h4>
                  <p className="text-sm text-gray-400">We chat about your dream trip, budget, and travel style.</p>
                </div>

                <div className="reveal reveal-delay-2 text-center mt-0 md:mt-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-950 border-2 border-neutral-800 hover:border-yellow-300 transition-colors flex items-center justify-center text-xl font-heading font-bold text-white mb-6 relative">
                    2
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs border border-neutral-800">
                      <MapPin size={12} />
                    </div>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white mb-2">Itinerary Draft</h4>
                  <p className="text-sm text-gray-400">I design a custom plan. We tweak it until it's perfect.</p>
                </div>

                <div className="reveal reveal-delay-3 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-950 border-2 border-neutral-800 hover:border-yellow-300 transition-colors flex items-center justify-center text-xl font-heading font-bold text-white mb-6 relative">
                    3
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs border border-neutral-800">
                      <CheckCircle size={12} />
                    </div>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white mb-2">Finalization</h4>
                  <p className="text-sm text-gray-400">Bookings are secured, and you receive the final brief.</p>
                </div>

                <div className="reveal reveal-delay-4 text-center mt-0 md:mt-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-yellow-300 border-2 border-yellow-300 flex items-center justify-center text-xl font-heading font-bold text-neutral-950 mb-6 shadow-[0_0_20px_rgba(253,224,71,0.3)]">
                    <PlaneTakeoff size={24} />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white mb-2">Adventure Time</h4>
                  <p className="text-sm text-gray-400">Pack your bags. The journey begins!</p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {}
        <section id="reviews" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
              <div className="max-w-2xl">
                <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">Testimonials</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold">Word on the street.</h3>
              </div>
              <div className="flex space-x-4 mt-6 md:mt-0">
                <button onClick={() => scrollTestimonials('left')} className="w-12 h-12 rounded-full border border-neutral-800 hover:border-yellow-300 hover:text-yellow-300 transition-colors flex items-center justify-center" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                  <ArrowRight size={20} className="rotate-180" />
                </button>
                <button onClick={() => scrollTestimonials('right')} className="w-12 h-12 rounded-full border border-yellow-300 bg-yellow-300/10 text-yellow-300 transition-colors flex items-center justify-center" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
              {/* Reviews Array Map */}
              {[
                { name: "Sarah T.", age: "21", type: "Backpacker", img: "32", quote: "Gunawan completely understood what our group wanted. We didn't want typical tourist stuff. He took us to this hidden waterfall that wasn't on any map. Best trip ever!" },
                { name: "Mark D.", age: "23", type: "Solo Traveler", img: "11", quote: "Traveling abroad for the first time was scary, but having Gunawan as a guide made it effortless. He handled all the transport and showed us the best cheap eats." },
                { name: "Elena R.", age: "20", type: "Student", img: "5", quote: "The itinerary was perfect. Just the right balance of activities and chill time. Also, he knows exactly where to get the best photos for IG. Highly recommend!" },
              ].map((review, i) => (
                <div key={i} className={`glass-card min-w-[320px] md:min-w-[400px] p-8 rounded-3xl snap-center shrink-0 reveal reveal-delay-${i+1}`}>
                  <div className="flex text-yellow-300 mb-6 space-x-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-yellow-300" />)}
                  </div>
                  <p className="text-gray-300 text-lg mb-8 italic">"{review.quote}"</p>
                  <div className="flex items-center">
                    <img src={`https://i.pravatar.cc/150?img=${review.img}`} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h5 className="font-heading font-bold text-white">{review.name}</h5>
                      <p className="text-xs text-gray-500">{review.age}, {review.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-neutral-900/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-300 font-bold mb-4">FAQ</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold">Common questions.</h3>
            </div>

            <div className="space-y-4">
              {[
                { q: "Do you handle flight bookings?", a: "I don't directly book international flights, but I provide strong recommendations on the best routes and times to book. I do handle all internal/local transport during the tour." },
                { q: "What size groups do you guide?", a: "I specialize in solo travelers, couples, and small groups (up to 6 people). This ensures a personalized, flexible, and high-quality experience rather than a crowded bus tour." },
                { q: "How much do your services cost?", a: "Pricing varies depending on whether you need itinerary planning only or full guiding services. After our initial discovery call, I provide a transparent, custom quote based on your trip's duration and complexity." }
              ].map((faq, index) => (
                <div key={index} className={`faq-item glass rounded-2xl overflow-hidden reveal ${activeFaq === index ? 'active' : ''} reveal-delay-${index}`}>
                  <button className="w-full px-6 py-5 flex justify-between items-center text-left" onClick={() => toggleFaq(index)} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                    <span className="font-heading font-semibold text-lg text-white">{faq.q}</span>
                    <Plus size={20} className="text-gray-400 faq-icon" />
                  </button>
                  <div className="faq-answer px-6 text-gray-400">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {}
        <section className="py-24 overflow-hidden relative">
          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="absolute inset-0 bg-yellow-300/10 blur-[100px] rounded-full -z-10"></div>
            <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-yellow-300/20">
              <div className="relative z-10 reveal">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
                  Ready for your <br />
                  <span className="text-gradient italic pr-2">next adventure?</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                  Stop dreaming, start packing. Let's build an itinerary that hits different. Hit me up and let's start planning.
                </p>
                <a href="mailto:gunnawantour@gmail.com" 
                   className="inline-block group relative px-10 py-5 rounded-full bg-yellow-300 text-neutral-950 font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(253,224,71,0.4)] hover:shadow-[0_0_60px_rgba(253,224,71,0.6)] transition-shadow"
                   onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                  <span className="relative z-10 flex items-center">
                    Contact Me
                    <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-16 pb-8 border-t border-neutral-800 relative z-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <a href="#" className="font-heading font-bold text-2xl tracking-tight text-white mb-6 md:mb-0">
              Gunawan<span className="text-yellow-300">.</span>
            </a>
            
            <div className="flex space-x-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-yellow-300 hover:border-yellow-300 transition-colors" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Gunawan Tour. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
