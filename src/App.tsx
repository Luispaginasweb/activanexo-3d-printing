import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  ArrowRight, 
  Box, 
  Cpu, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Menu, 
  X,
  Rss
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN Y CONSTANTES
// ==========================================

const WHATSAPP_NUMBER = '591XXXXXXXX';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, vi su página de impresión 3D y quisiera cotizar una impresión.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Archivos de imagen enlazados directamente a los assets subidos
const assets = {
  heroVideo: '/assets/hero-3d-printing.mp4',
  filaments: {
    elegooBlack: '/assets/filamento-elegoo-negro.png',
    sunluWhite: '/assets/filamento-sunlu-blanco.png',
    elegooBlue: '/assets/filamento-elegoo-azul.png',
    sunluRed: '/assets/filamento-sunlu-rojo.png',
  },
  categories: {
    figures: '/assets/categoria-figuras.png',
    prototypes: '/assets/categoria-prototipos.png',
    spareParts: '/assets/categoria-repuestos.png',
    decor: '/assets/categoria-decoracion.png',
    accessories: '/assets/categoria-accesorios.png',
    functional: '/assets/categoria-funcionales.png',
    custom: '/assets/categoria-personalizados.png',
    sizes: '/assets/categoria-tamanos.png',
  },
  workShowcase: '/assets/trabajos-realizados.png',
  finalCta: '/assets/cta-final.png',
};

// Componente inteligente para imágenes con fallback por si falla la carga
const ImageWithFallback = ({ src, alt, className, style, ...props }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div 
        className={`bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex flex-col items-center justify-center p-6 text-center border border-white/10 rounded-2xl ${className}`}
        style={style}
      >
        <Box className="w-12 h-12 text-blue-500/60 mb-3 animate-pulse" />
        <span className="font-anton text-lg text-white/90 tracking-wide uppercase">{alt}</span>
        <span className="text-xs text-zinc-500 font-mono mt-1">Impresión 3D Alta Calidad</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};

// ==========================================
// COMPONENTES DE UI
// ==========================================

const Button = ({ children, variant = 'primary', className = '', icon: Icon, onClick, ...props }) => {
  const baseClass =
    'inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 transform active:scale-95 group text-center cursor-pointer select-none';
  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-white hover:text-black shadow-lg shadow-blue-600/25 border border-blue-500/30',
    secondary:
      'bg-zinc-900/80 text-white border border-white/20 hover:border-white/60 hover:bg-white/10 backdrop-blur-md',
    glass:
      'liquid-glass text-white border border-white/15 hover:border-white/40 backdrop-blur-md hover:bg-white/10',
    accent:
      'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 border border-purple-400/30',
  };

  return (
    <button onClick={onClick} className={`${baseClass} ${variants[variant] || variants.primary} ${className}`} {...props}>
      <span>{children}</span>
      {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-7xl ${
        isScrolled ? 'top-3' : 'top-6'
      }`}
    >
      <div className="liquid-glass px-6 py-3.5 flex items-center justify-between rounded-full border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="font-anton text-2xl text-white tracking-wider">3D PRINT</span>
        </a>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-8 font-inter">
          {[
            { label: 'Inicio', href: '#' },
            { label: 'Proceso', href: '#proceso' },
            { label: 'Filamentos', href: '#filamentos' },
            { label: 'Categorías', href: '#categorias' },
            { label: 'Trabajos', href: '#trabajos' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* BOTÓN COTIZAR */}
        <div className="hidden md:block">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="glass" className="!px-6 !py-2.5 !text-xs font-bold tracking-wider">
              COTIZAR
            </Button>
          </a>
        </div>

        {/* BOTÓN MÓVIL */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 liquid-glass rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4 text-center animate-fadeIn">
          {[
            { label: 'Inicio', href: '#' },
            { label: 'Proceso', href: '#proceso' },
            { label: 'Filamentos', href: '#filamentos' },
            { label: 'Categorías', href: '#categorias' },
            { label: 'Trabajos', href: '#trabajos' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-zinc-200 hover:text-white py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2">
            <Button variant="primary" className="w-full justify-center">
              COTIZAR POR WHATSAPP
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 active:scale-95 group flex items-center gap-2 border border-emerald-400/30"
  >
    <MessageCircle className="w-7 h-7 fill-current" />
    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-sm font-bold pr-1">
      ¡Cotiza ahora!
    </span>
  </a>
);

// ==========================================
// 1 — HERO CINEMATOGRÁFICO
// ==========================================

const CinematicHero = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Fallback Canvas 3D Particle Generator si el MP4 local no está presente en entorno local
  useEffect(() => {
    if (videoLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const points = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 1,
    }));

    const renderCanvas = () => {
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(0, 136, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      points.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(0, 136, 255, ${0.4 / p.z})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, 'rgba(0, 136, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(5, 5, 8, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId.current = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [videoLoaded]);

  // Manejo de Fade y Loop suave mediante requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeOutTriggered = false;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration && duration - currentTime < 0.55 && !fadeOutTriggered) {
        fadeOutTriggered = true;
        let start = null;
        const fadeOut = (timestamp) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const newOpacity = Math.max(0, 1 - elapsed / 500);
          setVideoOpacity(newOpacity);

          if (elapsed < 500) {
            requestAnimationFrame(fadeOut);
          } else {
            setTimeout(() => {
              video.currentTime = 0;
              video.play().then(() => {
                fadeOutTriggered = false;
                let startIn = null;
                const fadeIn = (ts) => {
                  if (!startIn) startIn = ts;
                  const elIn = ts - startIn;
                  const opIn = Math.min(1, elIn / 500);
                  setVideoOpacity(opIn);
                  if (elIn < 500) requestAnimationFrame(fadeIn);
                };
                requestAnimationFrame(fadeIn);
              }).catch(() => {});
            }, 100);
          }
        };
        requestAnimationFrame(fadeOut);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050508]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

      <video
        ref={videoRef}
        src={assets.heroVideo}
        autoPlay
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: videoLoaded ? videoOpacity : 0 }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/60 to-black/80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-black/80"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-blue-400" /> Tecno-Impresión 3D de Alta Precisión
        </div>

        <h1 className="font-anton text-6xl sm:text-7xl md:text-9xl text-white tracking-tight leading-none mb-8 drop-shadow-2xl">
          DA FORMA A <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">TUS IDEAS</span>
        </h1>

        <p className="font-inter text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Impresión 3D personalizada para convertir diseños, conceptos y necesidades en piezas reales.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" icon={ArrowRight} className="w-full sm:w-auto !py-4">
              COTIZAR POR WHATSAPP
            </Button>
          </a>
          <a href="#trabajos" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto !py-4">
              VER TRABAJOS
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
        <span className="text-[10px] font-mono tracking-widest uppercase">Desplaza hacia abajo</span>
        <div className="w-5 h-9 rounded-full border-2 border-white/20 p-1 flex justify-center">
          <div className="w-1.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2 — PROCESO NARRATIVO PROGRESSIVO
// ==========================================

const ProcessSection = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const pct = Math.min(Math.max(0, currentScroll / totalScrollable), 1);
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fases narrativas continuas
  const stages = [
    {
      id: 'idea',
      step: '01',
      title: 'IDEA',
      subtitle: 'Boceto & Concepto',
      desc: 'Analizamos tus requerimientos funcionales, dibujos o ideas iniciales para darles viabilidad.',
      gradient: 'from-blue-600 via-cyan-500 to-indigo-600',
      icon: Sparkles,
      color: 'text-cyan-400',
    },
    {
      id: 'model',
      step: '02',
      title: 'MODELO 3D',
      subtitle: 'Modelado CAD & Geometría',
      desc: 'Convertimos la idea en una estructura tridimensional precisa, optimizando espesores de pared y tolerancias.',
      gradient: 'from-purple-600 via-indigo-500 to-blue-600',
      icon: Layers,
      color: 'text-purple-400',
    },
    {
      id: 'print',
      step: '03',
      title: 'IMPRESIÓN',
      subtitle: 'Fabricación Capa a Capa',
      desc: 'Extrusión milimétrica de alta fidelidad. El filamento cobra vida en el volumen de impresión.',
      gradient: 'from-blue-500 via-purple-600 to-pink-500',
      icon: Cpu,
      color: 'text-blue-400',
    },
    {
      id: 'finished',
      step: '04',
      title: 'PIEZA TERMINADA',
      subtitle: 'Acabado & Entrega',
      desc: 'Limpieza de soportes, verificación dimensional y entrega final de una pieza lista para su uso real.',
      gradient: 'from-emerald-500 via-teal-400 to-blue-500',
      icon: CheckCircle2,
      color: 'text-emerald-400',
    },
  ];

  // Cálculo del estado activo según el progreso (0 a 1)
  const activeStageIndex = Math.min(Math.floor(progress * stages.length), stages.length - 1);
  const activeStage = stages[activeStageIndex];

  return (
    <section 
      ref={containerRef}
      id="proceso" 
      className="relative h-[250vh] bg-[#050508] text-white"
    >
      {/* Vista Fija (Sticky) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        
        {/* Encabezado Fijo */}
        <div className="max-w-7xl mx-auto w-full flex justify-between items-end border-b border-white/10 pb-6 z-20">
          <div>
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase block mb-1">
              Transformación Progresiva
            </span>
            <h2 className="font-anton text-4xl md:text-7xl tracking-tight text-white">
              DE UNA IDEA A UNA PIEZA REAL
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="font-mono text-xs text-zinc-400">Progreso del proceso</span>
            <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Transformación Progresiva Visual */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full flex items-center justify-center my-6">
          
          {/* Fondo Dinámico con destello suave */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700 pointer-events-none"
            style={{
              background: activeStageIndex === 0 ? '#0088ff' : activeStageIndex === 1 ? '#8b5cf6' : activeStageIndex === 2 ? '#ec4899' : '#10b981'
            }}
          />

          {/* Renderizado de Transformación Progresiva (Sustituye a tarjetas estáticas) */}
          <div className="relative w-full max-w-4xl h-80 md:h-96 rounded-3xl border border-white/10 liquid-glass flex items-center justify-center p-8 overflow-hidden shadow-2xl">
            {stages.map((stg, idx) => {
              const isActive = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;
              const isFuture = idx > activeStageIndex;

              const Icon = stg.icon;

              return (
                <div
                  key={stg.id}
                  className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive 
                      ? 'scale(1) translate3d(0, 0, 0)' 
                      : isPast 
                      ? 'scale(0.85) translate3d(-80px, 0, 0)' 
                      : 'scale(1.15) translate3d(80px, 0, 0)',
                    filter: isActive ? 'blur(0px)' : 'blur(10px)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* Lado izquierdo: Metadatos y textos */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-anton text-5xl md:text-6xl text-white/20">{stg.step}</span>
                      <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono ${stg.color}`}>
                        {stg.subtitle}
                      </span>
                    </div>

                    <h3 className="font-anton text-5xl md:text-7xl text-white tracking-tight leading-none">
                      {stg.title}
                    </h3>

                    <p className="font-inter text-zinc-300 text-base md:text-lg font-light leading-relaxed max-w-lg">
                      {stg.desc}
                    </p>
                  </div>

                  {/* Lado derecho: Representación tridimensional activa */}
                  <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                    {/* Anillos interactivos */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow"></div>
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-tr ${stg.gradient} p-0.5 shadow-2xl shadow-black/80 flex items-center justify-center transform hover:rotate-6 transition-transform duration-500`}>
                      <div className="w-full h-full bg-black/90 rounded-[14px] flex flex-col items-center justify-center p-4 text-center">
                        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${stg.color} mb-2`} />
                        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">{stg.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Línea de navegación inferior con indicador de paso */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-4 gap-2 border-t border-white/10 pt-6 z-20">
          {stages.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <div 
                key={stg.id}
                className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-30'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-blue-400">{stg.step}</span>
                  <span className="font-anton text-sm hidden md:inline text-white">{stg.title}</span>
                </div>
                <div className={`h-1 w-full rounded-full transition-all duration-300 ${isActive ? 'bg-blue-500' : 'bg-white/10'}`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// ==========================================
// 3 — FILAMENTOS (Carrusel 3D de 100vh)
// ==========================================

const FilamentCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const filaments = useMemo(() => [
    {
      brand: 'ELEGOO',
      type: 'PLA+',
      color: 'Negro',
      desc: 'Acabado uniforme y excelente definición.',
      image: assets.filaments.elegooBlack,
      bgColor: 'bg-zinc-950',
    },
    {
      brand: 'SUNLU',
      type: 'PLA',
      color: 'Blanco',
      desc: 'Versátil para prototipos y piezas decorativas.',
      image: assets.filaments.sunluWhite,
      bgColor: 'bg-neutral-900',
    },
    {
      brand: 'ELEGOO',
      type: 'PETG',
      color: 'Azul',
      desc: 'Mayor resistencia y durabilidad.',
      image: assets.filaments.elegooBlue,
      bgColor: 'bg-blue-950/80',
    },
    {
      brand: 'SUNLU',
      type: 'TPU',
      color: 'Rojo',
      desc: 'Flexible para piezas especiales.',
      image: assets.filaments.sunluRed,
      bgColor: 'bg-red-950/80',
    },
  ], []);

  const total = filaments.length;

  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + direction + total) % total);
    setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, total]);

  return (
    <section id="filamentos" className={`relative h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-1000 ${filaments[activeIndex].bgColor} px-6`}>
      {/* Texto Gigante "FILAMENTOS" Detrás */}
      <h2 className="absolute inset-0 flex items-center justify-center font-anton text-[28vw] md:text-[22vw] text-white/5 tracking-tighter leading-none select-none pointer-events-none z-0">
        FILAMENTOS
      </h2>

      {/* Escena del Carrusel 3D */}
      <div className="relative max-w-7xl w-full h-full flex items-center justify-center z-10">
        {filaments.map((item, index) => {
          // Asignación estricta de Roles: center, left, right, back
          let role = 'back';
          if (index === activeIndex) role = 'center';
          else if (index === (activeIndex - 1 + total) % total) role = 'left';
          else if (index === (activeIndex + 1) % total) role = 'right';

          // Estilos exactos por rol
          const roleStyles = {
            center: {
              transform: 'translate3d(0, 0, 0) scale(1)',
              opacity: 1,
              filter: 'blur(0px)',
              zIndex: 30,
            },
            left: {
              transform: 'translate3d(-280px, 0, -100px) scale(0.65)',
              opacity: 0.45,
              filter: 'blur(4px)',
              zIndex: 20,
            },
            right: {
              transform: 'translate3d(280px, 0, -100px) scale(0.65)',
              opacity: 0.45,
              filter: 'blur(4px)',
              zIndex: 20,
            },
            back: {
              transform: 'translate3d(0, -50px, -200px) scale(0.4)',
              opacity: 0.1,
              filter: 'blur(12px)',
              zIndex: 10,
            },
          };

          const style = roleStyles[role];

          return (
            <div
              key={index}
              className="absolute transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center text-center cursor-pointer"
              style={style}
              onClick={() => {
                if (role === 'left') navigate(-1);
                if (role === 'right') navigate(1);
              }}
            >
              <ImageWithFallback
                src={item.image}
                alt={`${item.brand} ${item.type}`}
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
              />

              {role === 'center' && (
                <div className="mt-6 max-w-lg animate-fadeIn">
                  <span className="font-mono text-xs text-blue-400 uppercase tracking-widest block mb-1">
                    {item.brand}
                  </span>
                  <h3 className="font-anton text-5xl md:text-7xl text-white tracking-tight leading-none mb-2">
                    {item.type} <span className="text-zinc-400 font-light text-3xl md:text-4xl">{item.color}</span>
                  </h3>
                  <p className="font-inter text-zinc-300 text-sm md:text-base font-light">
                    {item.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Flechas de Navegación */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40">
        <button
          onClick={() => navigate(-1)}
          className="p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 backdrop-blur-md"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-mono text-xs text-zinc-400 tracking-widest">
          0{activeIndex + 1} / 0{total}
        </span>
        <button
          onClick={() => navigate(1)}
          className="p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 backdrop-blur-md"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

// ==========================================
// 4 — ¿QUÉ PODEMOS IMPRIMIR? (Scroll Horizontal)
// ==========================================

const PrintPossibilities = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const pct = Math.min(Math.max(0, -rect.top / (rect.height - window.innerHeight)), 1);
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1 = [
    { title: 'Figuras', img: assets.categories.figures },
    { title: 'Prototipos', img: assets.categories.prototypes },
    { title: 'Repuestos', img: assets.categories.spareParts },
    { title: 'Decoración', img: assets.categories.decor },
  ];

  const row2 = [
    { title: 'Accesorios', img: assets.categories.accessories },
    { title: 'Piezas Funcionales', img: assets.categories.functional },
    { title: 'Personalizados', img: assets.categories.custom },
    { title: 'Diferentes Tamaños', img: assets.categories.sizes },
  ];

  return (
    <section ref={sectionRef} id="categorias" className="relative h-[220vh] bg-black text-white">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center z-10">
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-2 block">
            Catálogo de Capacidades
          </span>
          <h2 className="font-anton text-5xl md:text-8xl text-white tracking-tight">
            ¿QUÉ PODEMOS IMPRIMIR?
          </h2>
        </div>

        {/* FILA 1: Se desplaza de Izquierda a Derecha */}
        <div className="w-full overflow-hidden mb-6">
          <div
            className="flex gap-6 transition-transform duration-100 ease-linear"
            style={{
              transform: `translate3d(${(scrollProgress * 25 - 15)}%, 0, 0)`,
            }}
          >
            {row1.concat(row1).map((cat, idx) => (
              <div
                key={idx}
                className="flex-none w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl relative"
              >
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <ImageWithFallback
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-anton text-3xl text-white tracking-wide">{cat.title}</h3>
                    <p className="text-xs font-mono text-blue-400 mt-1">Acabado de alta resolución</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FILA 2: Se desplaza de Derecha a Izquierda */}
        <div className="w-full overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-100 ease-linear"
            style={{
              transform: `translate3d(${(-scrollProgress * 25 + 5)}%, 0, 0)`,
            }}
          >
            {row2.concat(row2).map((cat, idx) => (
              <div
                key={idx}
                className="flex-none w-72 sm:w-80 md:w-96 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl relative"
              >
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <ImageWithFallback
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-anton text-3xl text-white tracking-wide">{cat.title}</h3>
                    <p className="text-xs font-mono text-purple-400 mt-1">Diseño + Impresión 3D</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5 — TRABAJOS REALIZADOS (Editorial Panorama)
// ==========================================

const WorkShowcase = () => {
  const sectionRef = useRef(null);
  const [scale, setScale] = useState(0.95);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const factor = (window.innerHeight - rect.top) / window.innerHeight;
        setScale(Math.min(1.02, 0.92 + factor * 0.1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const overlayTexts = ['FIGURAS', 'PROTOTIPOS', 'DECORACIÓN', 'PIEZAS FUNCIONALES', 'PERSONALIZADOS'];

  return (
    <section ref={sectionRef} id="trabajos" className="py-24 px-6 bg-[#050508] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <span className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-2 block">
            Demostración de Calidad
          </span>
          <h2 className="font-anton text-5xl md:text-8xl text-white tracking-tight">
            TRABAJOS REALIZADOS
          </h2>
          <p className="font-inter text-zinc-400 max-w-xl text-base mt-2 font-light">
            Algunas ideas que ya tomaron forma.
          </p>
        </div>

        {/* Imagen Panorámica Protagonista */}
        <div 
          className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 ease-out min-h-[550px] md:min-h-[650px] flex flex-col justify-between p-8 md:p-12"
          style={{ transform: `scale(${scale})` }}
        >
          <ImageWithFallback
            src={assets.workShowcase}
            alt="Trabajos Realizados"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

          {/* Textos HTML Editables superpuestos */}
          <div className="relative z-10 flex flex-wrap gap-2.5">
            {overlayTexts.map((txt, i) => (
              <span 
                key={i} 
                className="px-4 py-2 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/90 backdrop-blur-md"
              >
                {txt}
              </span>
            ))}
          </div>

          <div className="relative z-10 max-w-2xl mt-auto">
            <h3 className="font-anton text-4xl md:text-6xl text-white mb-4">
              PROYECTOS QUE DESTACAN
            </h3>
            <p className="font-inter text-zinc-300 text-base md:text-lg font-light leading-relaxed mb-6">
              Cada objeto impreso combina precisión dimensional y acabados estéticos de alto estándar.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" icon={ArrowRight}>
                COTIZAR MI TRABAJO
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6 — CTA FINAL CINEMATOGRÁFICO
// ==========================================

const FinalCTA = () => {
  return (
    <section className="relative min-h-[90vh] py-24 px-6 flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Imagen Principal de Fondo de Alta Calidad */}
      <ImageWithFallback
        src={assets.finalCta}
        alt="Tu idea puede ser la próxima"
        className="absolute inset-0 w-full h-full object-cover opacity-45 transform scale-105 hover:scale-100 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Chips Informativos */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['Impresión 3D personalizada', 'ELEGOO · SUNLU', 'PLA · PLA+ · PETG · TPU'].map((item, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-zinc-200 backdrop-blur-md"
            >
              {item}
            </span>
          ))}
        </div>

        <h2 className="font-anton text-6xl md:text-9xl text-white tracking-tight leading-none mb-6">
          TU IDEA PUEDE SER <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">LA PRÓXIMA</span>
        </h2>

        <p className="font-inter text-lg sm:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Cuéntanos qué necesitas y recibe una cotización para convertirlo en una pieza real.
        </p>

        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" icon={ArrowRight} className="!px-12 !py-5 !text-lg !bg-emerald-500 hover:!bg-white hover:!text-black shadow-2xl shadow-emerald-500/30">
            COTIZAR POR WHATSAPP
          </Button>
        </a>

        <div className="mt-14 text-xs font-mono text-zinc-500 tracking-widest uppercase">
          Imaginamos · Diseñamos · Imprimimos · Hacemos posible
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL (APP)
// ==========================================

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      {/* Carga de Fuentes Tipográficas */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Estilos Globales */}
      <style>{`
        body {
          background-color: #000000;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
        }

        .font-anton {
          font-family: 'Anton', sans-serif;
        }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.02);
          background-blend-mode: luminosity;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      {/* Componentes de la Landing Page */}
      <Navbar />
      <CinematicHero />
      <ProcessSection />
      <FilamentCarousel />
      <PrintPossibilities />
      <WorkShowcase />
      <FinalCTA />
      <FloatingWhatsApp />
    </div>
  );
}