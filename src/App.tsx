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
  finalCta: '/assets/final-cta-workshop.png',
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

      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/85 via-black/25 to-black/35"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-black/35"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-blue-400" /> Tecno-Impresión 3D de Alta Precisión
        </div>

        <h1 className="font-anton text-5xl sm:text-6xl md:text-8xl lg:text-[7.25rem] text-white tracking-tight leading-[0.92] mb-7 drop-shadow-2xl">
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
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);

  const stages = [
    {
      step: '01',
      title: 'IDEA',
      subtitle: 'Boceto & Concepto',
      desc: 'Nos cuentas tu necesidad, dibujo o idea inicial. Revisamos viabilidad, uso y material recomendado.',
      icon: Sparkles,
      color: 'text-cyan-400',
      glow: '#22d3ee',
    },
    {
      step: '02',
      title: 'MODELO 3D',
      subtitle: 'Diseño & Geometría',
      desc: 'Convertimos la idea en un modelo tridimensional preciso y preparado para fabricación.',
      icon: Layers,
      color: 'text-violet-400',
      glow: '#8b5cf6',
    },
    {
      step: '03',
      title: 'IMPRESIÓN',
      subtitle: 'Capa a Capa',
      desc: 'La pieza toma forma mediante impresión controlada, con parámetros ajustados al material y al uso final.',
      icon: Cpu,
      color: 'text-blue-400',
      glow: '#3b82f6',
    },
    {
      step: '04',
      title: 'PIEZA TERMINADA',
      subtitle: 'Acabado & Entrega',
      desc: 'Retiramos soportes, verificamos el acabado y dejamos la pieza lista para utilizar o presentar.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      glow: '#10b981',
    },
  ];

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setStageProgress(progress);
      setActiveIndex(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const active = stages[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section ref={sectionRef} id="proceso" className="relative h-[142vh] md:h-[148vh] bg-[#050508] text-white">
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden px-6 py-16 md:py-14">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 border-b border-white/10 pb-6 mb-8 md:mb-10">
            <div>
              <span className="text-xs font-mono text-blue-400 tracking-[0.22em] uppercase block mb-2">Transformación progresiva</span>
              <h2 className="font-anton text-4xl md:text-6xl xl:text-7xl tracking-tight leading-[0.94]">DE UNA IDEA A UNA PIEZA REAL</h2>
            </div>
            <div className="md:w-64">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2"><span>PROGRESO</span><span>{Math.round(stageProgress * 100)}%</span></div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400 transition-[width] duration-150" style={{ width: `${stageProgress * 100}%` }} /></div>
            </div>
          </div>

          <div className="relative h-[58vh] min-h-[430px] max-h-[590px] rounded-[2rem] border border-white/10 bg-white/[0.025] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-25 transition-colors duration-700" style={{ background: `radial-gradient(circle at 72% 45%, ${active.glow}55, transparent 42%)` }} />
            <div className="relative z-10 grid md:grid-cols-[1.25fr_.75fr] gap-8 h-full items-center p-7 md:p-12">
              <div key={`text-${activeIndex}`} className="animate-stageIn">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="font-anton text-6xl md:text-7xl text-white/15 leading-none">{active.step}</span>
                  <span className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono ${active.color}`}>{active.subtitle}</span>
                </div>
                <h3 className="font-anton text-5xl md:text-7xl tracking-tight leading-none mb-4">{active.title}</h3>
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">{active.desc}</p>
              </div>

              <div key={`visual-${activeIndex}`} className="relative flex justify-center items-center animate-stageIn">
                <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-white/15 animate-spin-slow" />
                <div className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full border border-white/10" />
                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-[2rem] bg-black/75 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
                  <ActiveIcon className={`w-16 h-16 md:w-20 md:h-20 ${active.color} mb-4`} />
                  <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">ETAPA {active.step}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 mt-7">
            {stages.map((stage, idx) => (
              <button key={stage.step} onClick={() => setActiveIndex(idx)} className={`text-left transition-opacity ${idx === activeIndex ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}>
                <div className="flex items-center gap-2 mb-2"><span className="font-mono text-xs text-blue-400">{stage.step}</span><span className="font-anton text-xs sm:text-sm md:text-base truncate">{stage.title}</span></div>
                <div className={`h-1 rounded-full ${idx === activeIndex ? 'bg-blue-500' : 'bg-white/10'}`} />
              </button>
            ))}
          </div>
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
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    { title: 'Figuras', label: 'Figuras y coleccionables', img: assets.categories.figures },
    { title: 'Prototipos', label: 'Ideas que necesitan validarse', img: assets.categories.prototypes },
    { title: 'Repuestos', label: 'Soluciones hechas a medida', img: assets.categories.spareParts },
    { title: 'Decoración', label: 'Piezas para transformar espacios', img: assets.categories.decor },
    { title: 'Accesorios', label: 'Objetos útiles para el día a día', img: assets.categories.accessories },
    { title: 'Piezas funcionales', label: 'Diseño pensado para resolver', img: assets.categories.functional },
    { title: 'Personalizados', label: 'Detalles únicos para regalar', img: assets.categories.custom },
    { title: 'Diferentes tamaños', label: 'De pequeños detalles a grandes ideas', img: assets.categories.sizes },
  ];

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActiveIndex(Math.min(categories.length - 1, Math.floor(progress * categories.length)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const active = categories[activeIndex];

  return (
    <section ref={sectionRef} id="categorias" className="relative h-[165vh] md:h-[172vh] bg-black text-white">
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden px-6 py-14 md:py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-mono text-purple-400 tracking-[0.22em] uppercase block mb-3">Posibilidades casi ilimitadas</span>
              <h2 className="font-anton text-4xl md:text-6xl xl:text-7xl leading-[.92] mb-4">¿QUÉ PODEMOS IMPRIMIR?</h2>
              <p className="text-zinc-400 text-base md:text-lg max-w-lg mb-8">Explora diferentes tipos de proyectos. Mientras avanzas, cada categoría toma el protagonismo.</p>

              <div className="hidden lg:flex flex-col gap-2">
                {categories.map((cat, idx) => (
                  <button key={cat.title} onClick={() => setActiveIndex(idx)} className={`group flex items-center gap-4 py-2.5 border-b text-left transition-all ${idx === activeIndex ? 'border-blue-500 text-white' : 'border-white/10 text-zinc-600 hover:text-zinc-300'}`}>
                    <span className="font-mono text-xs text-blue-400">0{idx + 1}</span>
                    <span className={`font-anton text-2xl xl:text-3xl transition-transform ${idx === activeIndex ? 'translate-x-2' : ''}`}>{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative h-[68vh] min-h-[500px] max-h-[680px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
                {categories.map((cat, idx) => (
                  <div key={cat.title} className="absolute inset-0 transition-all duration-700 ease-out" style={{ opacity: idx === activeIndex ? 1 : 0, transform: idx === activeIndex ? 'scale(1)' : idx < activeIndex ? 'scale(.96) translateX(-3%)' : 'scale(1.04) translateX(3%)', filter: idx === activeIndex ? 'blur(0px)' : 'blur(8px)' }}>
                    <ImageWithFallback src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/15" />
                <div className="absolute left-6 right-6 bottom-6 md:left-9 md:right-9 md:bottom-9 flex items-end justify-between gap-5">
                  <div key={`caption-${activeIndex}`} className="animate-stageIn">
                    <span className="font-mono text-xs text-blue-400 tracking-widest">0{activeIndex + 1} / 08</span>
                    <h3 className="font-anton text-4xl md:text-6xl mt-1">{active.title}</h3>
                    <p className="text-zinc-300 text-sm md:text-base mt-1">{active.label}</p>
                  </div>
                  <div className="hidden sm:flex gap-1.5">{categories.map((_, idx) => <span key={idx} className={`h-1 rounded-full transition-all ${idx === activeIndex ? 'w-8 bg-blue-500' : 'w-3 bg-white/20'}`} />)}</div>
                </div>
              </div>

              <div className="lg:hidden flex gap-2 overflow-x-auto pt-5 pb-1 scrollbar-none">
                {categories.map((cat, idx) => <button key={cat.title} onClick={() => setActiveIndex(idx)} className={`flex-none px-4 py-2 rounded-full border text-sm ${idx === activeIndex ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-zinc-400'}`}>{cat.title}</button>)}
              </div>
            </div>
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
    <section className="relative min-h-[68vh] md:min-h-[72vh] py-20 px-6 flex items-center justify-center overflow-hidden bg-black text-white">
      <ImageWithFallback
        src={assets.finalCta}
        alt="Taller de impresión 3D"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/24 to-black/32" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/18" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl rounded-[2rem] bg-black/30 border border-white/10 backdrop-blur-sm p-7 md:p-10">
          <span className="text-xs font-mono text-blue-300 tracking-[0.22em] uppercase block mb-4">Tu siguiente proyecto puede empezar aquí</span>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[0.92] mb-5">TU PROYECTO<br/><span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-300 bg-clip-text text-transparent">A UN PASO</span></h2>
          <p className="font-inter text-lg md:text-xl text-zinc-200 max-w-2xl mb-8 font-light leading-relaxed">Cuéntanos qué necesitas y recibe una cotización personalizada para convertir tu idea en una pieza real.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" icon={ArrowRight} className="!px-8 md:!px-10 !py-4 !text-base !bg-emerald-500 hover:!bg-white hover:!text-black shadow-xl shadow-emerald-500/20">COTIZAR POR WHATSAPP</Button>
          </a>
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

        @keyframes stageIn {
          from { opacity: 0; transform: translateY(18px) scale(0.985); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .animate-stageIn {
          animation: stageIn 0.55s cubic-bezier(0.2,0.7,0.2,1) both;
        }

        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }

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