import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, ArrowDown, Camera, Heart, Baby, ArrowRight, Plus, Quote, Mail, Instagram, Twitter, Linkedin, Check } from 'lucide-react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    
    body {
        background-color: #0a0a0a;
        color: #ffffff;
        font-family: 'Outfit', sans-serif;
        overflow-x: hidden;
        cursor: none;
    }

    h1, h2, h3, h4, h5, h6, .font-heading {
        font-family: 'Space Grotesk', sans-serif;
    }

    .grain-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 50;
        opacity: 0.04;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .text-gradient {
        background: linear-gradient(to right, #a1c4fd, #c2e9fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .glass-panel {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .img-zoom-container { overflow: hidden; }
    .img-zoom-container img { transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .img-zoom-container:hover img { transform: scale(1.05); }

    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0a0a0a; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #a1c4fd; }

    /* Custom Cursor */
    .cursor-dot { width: 8px; height: 8px; background-color: #a1c4fd; position: fixed; border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s, background-color 0.2s; }
    .cursor-outline { width: 40px; height: 40px; border: 1px solid rgba(161, 196, 253, 0.5); position: fixed; border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: width 0.15s, height 0.15s; }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .animate-float { animation: float 4s ease-in-out infinite; }
  `}} />
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll listener for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Custom Cursor Logic
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    const moveCursor = (e: MouseEvent) => {
      if(!cursorDot || !cursorOutline) return;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.animate({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
      }, { duration: 150, fill: "forwards" });
    };

    const handleHover = () => {
      if(!cursorDot || !cursorOutline) return;
      cursorDot.style.width = '0';
      cursorDot.style.height = '0';
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.backgroundColor = 'rgba(161, 196, 253, 0.1)';
      cursorOutline.style.borderColor = 'transparent';
    };

    const handleLeave = () => {
      if(!cursorDot || !cursorOutline) return;
      cursorDot.style.width = '8px';
      cursorDot.style.height = '8px';
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.backgroundColor = 'transparent';
      cursorOutline.style.borderColor = 'rgba(161, 196, 253, 0.5)';
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', moveCursor);
      // Attach hover effects using event delegation for dynamic elements
      document.body.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('.interactive')) {
            handleHover();
        }
      });
      document.body.addEventListener('mouseout', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('.interactive')) {
            handleLeave();
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="antialiased selection:bg-[#a1c4fd] selection:text-[#0a0a0a] bg-[#0a0a0a] text-white min-h-screen" style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh' }}>
      <GlobalStyles />
      
      {/* Noise Overlay & Cursor */}
      <div className="grain-overlay"></div>
      <div className="cursor-dot hidden md:block" id="cursor-dot"></div>
      <div className="cursor-outline hidden md:block" id="cursor-outline"></div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 top-0 transition-all duration-300 ${scrolled ? 'py-2' : 'mt-6'}`}>
        <div className="glass-panel mx-auto max-w-6xl rounded-full px-6 py-4 flex justify-between items-center w-[90%] md:w-[80%] border-b border-white/10">
          <a href="#" className="font-heading font-bold text-xl tracking-tighter interactive text-white hover:text-[#a1c4fd] transition-colors">
            KIMJUNG<span className="text-[#a1c4fd]">.</span>
          </a>
          
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
            <a href="#about" className="hover:text-white transition-colors interactive">About</a>
            <a href="#services" className="hover:text-white transition-colors interactive">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors interactive">Work</a>
            <a href="#process" className="hover:text-white transition-colors interactive">Process</a>
          </div>

          <a href="mailto:pansyclark3328@gmail.com?subject=Inquiry%20from%20Portfolio" className="hidden md:inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-5 py-2 rounded-full font-medium hover:bg-[#a1c4fd] transition-colors interactive">
            Contact Me <ArrowUpRight className="w-4 h-4" />
          </a>

          <button onClick={toggleMenu} className="md:hidden text-white interactive">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={toggleMenu} className="absolute top-10 right-10 text-white interactive">
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-8 text-center text-2xl font-heading">
          <a href="#about" onClick={closeMenu} className="text-white hover:text-[#a1c4fd] transition-colors">About</a>
          <a href="#services" onClick={closeMenu} className="text-white hover:text-[#a1c4fd] transition-colors">Services</a>
          <a href="#portfolio" onClick={closeMenu} className="text-white hover:text-[#a1c4fd] transition-colors">Work</a>
          <a href="#process" onClick={closeMenu} className="text-white hover:text-[#a1c4fd] transition-colors">Process</a>
          <a href="mailto:pansyclark3328@gmail.com" onClick={closeMenu} className="text-[#a1c4fd] mt-4">Contact Me</a>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl flex flex-col items-center">
          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Available for worldwide bookings
          </div>
          
          <h1 className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100 text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight mb-6 tracking-tight">
            Capturing <br/>
            <span className="text-gradient italic font-normal">Timeless</span> Moments.
          </h1>
          
          <p className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            Premium photography services specializing in Weddings, Pre-Weddings, and Baby portraits. I turn fleeting emotions into everlasting visual poetry.
          </p>
          
          <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-300 flex flex-col sm:flex-row gap-4 items-center">
            <a href="#portfolio" className="px-8 py-4 bg-white text-[#0a0a0a] rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2 interactive">
              View Portfolio <ArrowDown className="w-4 h-4" />
            </a>
            <a href="mailto:pansyclark3328@gmail.com?subject=Booking%20Inquiry" className="px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-colors interactive">
              Book a Session
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out relative img-zoom-container rounded-3xl aspect-[4/5] glass-panel p-2">
              <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1000&auto=format&fit=crop" alt="Kimjung - Photographer" className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl hidden md:flex items-center gap-4 animate-float">
                <div className="text-4xl font-heading font-bold text-[#a1c4fd]">10+</div>
                <div className="text-sm text-gray-400 leading-tight">Years of<br/>Experience</div>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200">
              <h2 className="text-sm uppercase tracking-widest text-[#a1c4fd] mb-4 font-semibold">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Hello, I'm <span className="text-gradient">Kimjung</span>.</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed font-light">
                I am an elegant and premium photographer dedicated to documenting life's most precious milestones. My approach is unobtrusive yet deeply intimate, ensuring every frame tells an authentic story.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                Whether it's the grand celebration of a wedding, the quiet anticipation of a pre-wedding shoot, or the innocent wonder of a newborn, I strive to create art that you will cherish for generations.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-heading font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-gray-500">Events Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-500">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-[#121212] relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-sm uppercase tracking-widest text-[#a1c4fd] mb-4 font-semibold">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold">My Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out glass-panel p-8 rounded-3xl group hover:border-[#a1c4fd]/50 transition-colors duration-500">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#a1c4fd] group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-heading font-semibold mb-4">Wedding Photography</h4>
              <p className="text-gray-400 mb-6 font-light">Comprehensive coverage of your special day, capturing every tear, smile, and joyous moment with elegant precision.</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Full Day Coverage</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> High-Res Edited Photos</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Premium Album Design</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100 glass-panel p-8 rounded-3xl group hover:border-[#a1c4fd]/50 transition-colors duration-500">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#a1c4fd] group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-heading font-semibold mb-4">Pre-Wedding</h4>
              <p className="text-gray-400 mb-6 font-light">Cinematic and romantic storytelling sessions before the big day, set in breathtaking locations to reflect your love story.</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Concept Planning</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Multiple Locations/Outfits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Cinematic Direction</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 glass-panel p-8 rounded-3xl group hover:border-[#a1c4fd]/50 transition-colors duration-500">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#a1c4fd] group-hover:scale-110 transition-transform">
                <Baby className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-heading font-semibold mb-4">Baby Photography</h4>
              <p className="text-gray-400 mb-6 font-light">Gentle, safe, and beautifully styled newborn and maternity sessions to preserve the fleeting moments of early life.</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Safe Studio Environment</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Props & Styling Included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#a1c4fd]" /> Family Portraits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-[#a1c4fd] mb-4 font-semibold">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold">Selected Works</h3>
            </div>
            <a href="mailto:pansyclark3328@gmail.com" className="mt-6 md:mt-0 text-gray-400 hover:text-white flex items-center gap-2 interactive transition-colors border-b border-transparent hover:border-white pb-1">
              Request Full Portfolio <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out group relative rounded-3xl overflow-hidden glass-panel img-zoom-container aspect-square md:aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" alt="Wedding" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-[#a1c4fd] text-sm font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Wedding</p>
                <h4 className="text-2xl font-heading font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">The Grand Elegance</h4>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100 group relative rounded-3xl overflow-hidden glass-panel img-zoom-container aspect-square md:aspect-[3/4] md:row-span-2">
              <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop" alt="Pre-Wedding" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-[#a1c4fd] text-sm font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Pre-Wedding</p>
                <h4 className="text-2xl font-heading font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Coastal Romance</h4>
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 group relative rounded-3xl overflow-hidden glass-panel img-zoom-container aspect-square md:aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop" alt="Baby" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-[#a1c4fd] text-sm font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Baby Portrait</p>
                <h4 className="text-2xl font-heading font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">First Breath</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 md:py-32 bg-[#121212] relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-sm uppercase tracking-widest text-[#a1c4fd] mb-4 font-semibold">Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold">The Process</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-xl font-heading font-bold text-[#a1c4fd] mb-6 shadow-glass">1</div>
              <h4 className="text-xl font-heading font-semibold mb-2">Discovery</h4>
              <p className="text-sm text-gray-400 font-light">We connect to understand your vision, style preferences, and specific needs for the shoot.</p>
            </div>
            
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-xl font-heading font-bold text-[#a1c4fd] mb-6 shadow-glass">2</div>
              <h4 className="text-xl font-heading font-semibold mb-2">Planning</h4>
              <p className="text-sm text-gray-400 font-light">Curating locations, concepts, timelines, and styling to ensure a seamless experience.</p>
            </div>
            
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-[#a1c4fd] flex items-center justify-center text-xl font-heading font-bold text-[#a1c4fd] mb-6 shadow-[0_0_20px_rgba(161,196,253,0.3)]">3</div>
              <h4 className="text-xl font-heading font-semibold mb-2">The Shoot</h4>
              <p className="text-sm text-gray-400 font-light">Capturing genuine moments with professional direction in a relaxed, elegant atmosphere.</p>
            </div>
            
            <div className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-300 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-xl font-heading font-bold text-[#a1c4fd] mb-6 shadow-glass">4</div>
              <h4 className="text-xl font-heading font-semibold mb-2">Delivery</h4>
              <p className="text-sm text-gray-400 font-light">Meticulous post-processing and delivery of high-end curated galleries and premium prints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <Quote className="w-12 h-12 text-[#a1c4fd]/30 mx-auto mb-8" />
          <div className="mb-12">
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium leading-tight mb-8">
              "Kimjung has an incredible eye for detail. They didn't just take photos; they captured the very soul of our wedding day. The results are breathtakingly elegant."
            </p>
            <div>
              <h5 className="text-lg font-semibold text-white">Sarah & James</h5>
              <p className="text-sm text-[#a1c4fd]">Wedding Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#121212] relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-sm uppercase tracking-widest text-[#a1c4fd] mb-4 font-semibold">Inquiries</h2>
            <h3 className="text-4xl font-heading font-bold">Common Questions</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do you travel for shoots?",
                a: "Yes, I am available for destination weddings and pre-wedding shoots worldwide. Travel and accommodation expenses are handled separately based on the location."
              },
              {
                q: "How many photos will we receive?",
                a: "For a standard full-day wedding, you can expect between 600-800 fully edited, high-resolution images. Pre-wedding and baby sessions yield around 100-150 curated images."
              },
              {
                q: "How long does it take to get the photos?",
                a: "I usually provide a 'sneak peek' gallery within 48 hours of the event. The final, fully edited gallery is typically delivered within 4 to 6 weeks."
              }
            ].map((faq, index) => (
              <div key={index} className="reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out glass-panel rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center text-lg font-medium hover:text-[#a1c4fd] transition-colors interactive"
                >
                  {faq.q}
                  <Plus className={`w-5 h-5 transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`} />
                </button>
                <div className={`px-6 text-gray-400 font-light overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">Let's Create <br/> <span className="text-gradient italic">Art Together.</span></h2>
          <p className="text-xl text-gray-400 mb-10 font-light">My calendar fills up quickly. Reach out to check availability and discuss your vision.</p>
          <a href="mailto:pansyclark3328@gmail.com?subject=Portfolio%20Inquiry" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#0a0a0a] rounded-full text-lg font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 interactive">
            Contact Me Now <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading font-bold text-xl tracking-tighter">
            KIMJUNG<span className="text-[#a1c4fd]">.</span>
          </div>
          
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors interactive"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors interactive"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors interactive"><Linkedin className="w-5 h-5" /></a>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kimjung Photography. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
