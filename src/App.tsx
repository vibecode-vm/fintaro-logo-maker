import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, RotateCcw, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const FONTS = [
  { name: 'Fintaro', family: '"Fintaro", sans-serif' },
  { name: 'Inter', family: '"Inter", sans-serif' },
  { name: 'Space Grotesk', family: '"Space Grotesk", sans-serif' },
  { name: 'Outfit', family: '"Outfit", sans-serif' },
  { name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", sans-serif' },
  { name: 'Sora', family: '"Sora", sans-serif' },
  { name: 'Montserrat', family: '"Montserrat", sans-serif' },
  { name: 'Poppins', family: '"Poppins", sans-serif' },
  { name: 'Manrope', family: '"Manrope", sans-serif' },
  { name: 'Syne', family: '"Syne", sans-serif' },
  { name: 'DM Sans', family: '"DM Sans", sans-serif' },
  { name: 'Work Sans', family: '"Work Sans", sans-serif' },
  { name: 'Rubik', family: '"Rubik", sans-serif' },
  { name: 'Oswald', family: '"Oswald", sans-serif' },
  { name: 'Lexend', family: '"Lexend", sans-serif' },
  { name: 'Epilogue', family: '"Epilogue", sans-serif' },
  { name: 'Sen', family: '"Sen", sans-serif' },
  { name: 'Urbanist', family: '"Urbanist", sans-serif' },
  { name: 'Bricolage Grotesque', family: '"Bricolage Grotesque", sans-serif' },
  { name: 'Schibsted Grotesk', family: '"Schibsted Grotesk", sans-serif' },
  { name: 'Onest', family: '"Onest", sans-serif' },
  { name: 'Hanken Grotesk', family: '"Hanken Grotesk", sans-serif' },
  { name: 'Figtree', family: '"Figtree", sans-serif' },
  { name: 'Red Hat Display', family: '"Red Hat Display", sans-serif' },
  { name: 'Jost', family: '"Jost", sans-serif' },
  { name: 'Be Vietnam Pro', family: '"Be Vietnam Pro", sans-serif' },
  { name: 'Kumbh Sans', family: '"Kumbh Sans", sans-serif' },
  { name: 'Archivo', family: '"Archivo", sans-serif' },
  { name: 'Chivo', family: '"Chivo", sans-serif' },
  { name: 'Public Sans', family: '"Public Sans", sans-serif' },
  { name: 'Albert Sans', family: '"Albert Sans", sans-serif' },
  { name: 'Familjen Grotesk', family: '"Familjen Grotesk", sans-serif' },
  { name: 'Spline Sans', family: '"Spline Sans", sans-serif' },
  { name: 'Readex Pro', family: '"Readex Pro", sans-serif' },
  { name: 'Wix Madefor Display', family: '"Wix Madefor Display", sans-serif' },
  { name: 'Unbounded', family: '"Unbounded", sans-serif' },
  { name: 'Instrument Sans', family: '"Instrument Sans", sans-serif' },
  { name: 'Tektur', family: '"Tektur", sans-serif' }
];

// Ideal Default Ratios - Perfectly harmonized pixel widths
const DEFAULTS = {
  ringRadius: 50,
  ringThickness: 20,
  ringStyle: 1, // 0: Solid, 1: Fade Bottom, 2: Fade Diagonal
  starSize: 1,
  lineWidth: 120, 
  lineHeight: 20,
  lineSpacing: 16,
  lineStyle: 1, // 0: Solid, 1: Fade Edges, 2: Fade Right
  logoScale: 1,
  logoTextGap: 32,
  fontSize: 96,
  fontWeight: 700,
  fontIndex: 0, // Fintaro
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showStar, setShowStar] = useState(true);
  
  // Individual Sliders & Toggles
  const [ringRadius, setRingRadius] = useState(DEFAULTS.ringRadius);
  const [ringThickness, setRingThickness] = useState(DEFAULTS.ringThickness);
  const [ringStyle, setRingStyle] = useState(DEFAULTS.ringStyle);
  
  const [starSize, setStarSize] = useState(DEFAULTS.starSize);
  
  const [lineWidth, setLineWidth] = useState(DEFAULTS.lineWidth);
  const [lineHeight, setLineHeight] = useState(DEFAULTS.lineHeight);
  const [lineSpacing, setLineSpacing] = useState(DEFAULTS.lineSpacing);
  const [lineStyle, setLineStyle] = useState(DEFAULTS.lineStyle);
  
  const [logoScale, setLogoScale] = useState(DEFAULTS.logoScale);
  const [logoTextGap, setLogoTextGap] = useState(DEFAULTS.logoTextGap);
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(DEFAULTS.fontWeight);
  const [fontIndex, setFontIndex] = useState(DEFAULTS.fontIndex);
  const [isAutoPlayingFonts, setIsAutoPlayingFonts] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlayingFonts) {
      interval = setInterval(() => {
        setFontIndex((prev) => (prev + 1) % FONTS.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlayingFonts]);

  const resetToIdeal = () => {
    setRingRadius(DEFAULTS.ringRadius);
    setRingThickness(DEFAULTS.ringThickness);
    setRingStyle(DEFAULTS.ringStyle);
    setStarSize(DEFAULTS.starSize);
    setLineWidth(DEFAULTS.lineWidth);
    setLineHeight(DEFAULTS.lineHeight);
    setLineSpacing(DEFAULTS.lineSpacing);
    setLineStyle(DEFAULTS.lineStyle);
    setLogoScale(DEFAULTS.logoScale);
    setLogoTextGap(DEFAULTS.logoTextGap);
    setFontSize(DEFAULTS.fontSize);
    setFontWeight(DEFAULTS.fontWeight);
    setFontIndex(DEFAULTS.fontIndex);
    setShowStar(true);
  };

  // Theme Colors
  const fgColor = isDarkMode ? "white" : "black";
  const bgColor = isDarkMode ? "bg-neutral-950" : "bg-neutral-100";
  const panelBg = isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const mutedText = isDarkMode ? "text-neutral-400" : "text-neutral-500";

  // Reusable Slider Component
  const Slider = ({ label, value, min, max, step, onChange, unit = "" }) => (
    <div className="flex flex-col w-full gap-2">
      <div className={`flex justify-between text-xs font-medium ${mutedText}`}>
        <label>{label}</label>
        <span className="tabular-nums">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-current ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
      />
    </div>
  );

  // Reusable Style Selector Component
  const StyleSelector = ({ options, value, onChange }) => (
    <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? 'bg-black/40' : 'bg-white/60'}`}>
      {options.map((name, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`flex-1 text-[10px] sm:text-xs py-1.5 rounded-md transition-all ${value === i ? (isDarkMode ? 'bg-white/20 text-white font-medium shadow-sm' : 'bg-black/10 text-black font-medium shadow-sm') : (isDarkMode ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-700')}`}
        >
          {name}
        </button>
      ))}
    </div>
  );

  // --- DYNAMIC VIEWBOX CALCULATION ---
  const maxTopRadius = Math.max(ringRadius + ringThickness / 2, showStar ? 35 * starSize : 0);
  const visualLeft = 150 - Math.max(maxTopRadius, lineWidth / 2);
  const visualRight = 150 + Math.max(maxTopRadius, lineWidth / 2);
  const visualTop = 135 - maxTopRadius;
  const visualBottom = Math.max(
    135 + maxTopRadius, 
    135 + ringRadius + (ringThickness / 2) + lineSpacing + lineHeight
  );
  
  const visualWidth = visualRight - visualLeft;
  const visualHeight = visualBottom - visualTop;
  
  const padding = 4; // Padding to prevent stroke clipping
  const vbX = visualLeft - padding;
  const vbY = visualTop - padding;
  const vbW = visualWidth + padding * 2;
  const vbH = visualHeight + padding * 2;

  // Resolve styles
  const getRingStroke = () => {
    if (ringStyle === 1) return "url(#ringGradBottom)";
    if (ringStyle === 2) return "url(#ringGradDiagonal)";
    return fgColor;
  };

  const getLineFill = () => {
    if (lineStyle === 1) return "url(#lineGradEdges)";
    if (lineStyle === 2) return "url(#lineGradRight)";
    if (lineStyle === 3) return "url(#lineGradLeft)";
    return fgColor;
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${bgColor} ${textColor} transition-colors duration-500 font-sans`}>
      
      {/* Sidebar Controls */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-full lg:w-80 lg:h-screen overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r flex flex-col gap-8 shrink-0 ${isDarkMode ? 'border-white/10' : 'border-black/10'} backdrop-blur-xl z-10`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Logo Studio</h1>
          <div className="flex gap-2">
            <button 
              onClick={resetToIdeal}
              title="Reset to Ideal Ratio"
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
            >
              <RotateCcw size={18} />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Toggle Theme"
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Ring Controls */}
        <div className={`p-5 rounded-2xl flex flex-col gap-5 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Ring</h2>
          <StyleSelector 
            options={['Klassisch', 'Fade Unten', 'Fade Diagonal']} 
            value={ringStyle} 
            onChange={setRingStyle} 
          />
          <Slider label="Größe (Radius)" value={ringRadius} min={20} max={100} step={1} onChange={setRingRadius} />
          <Slider label="Dicke (Stroke)" value={ringThickness} min={4} max={60} step={1} onChange={setRingThickness} />
        </div>

        {/* Star Controls */}
        <div className={`p-5 rounded-2xl flex flex-col gap-5 ${panelBg}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Stern</h2>
            <button 
              onClick={() => setShowStar(!showStar)}
              className={`w-10 h-6 rounded-full transition-colors duration-300 relative ${showStar ? (isDarkMode ? 'bg-white' : 'bg-black') : (isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300')}`}
            >
              <div className={`w-4 h-4 rounded-full absolute top-1 transition-transform duration-300 ${isDarkMode ? 'bg-black' : 'bg-white'} ${showStar ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
          <AnimatePresence>
            {showStar && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-2">
                  <Slider label="Größe (Scale)" value={starSize} min={0.2} max={3} step={0.1} onChange={setStarSize} unit="x" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Line Controls */}
        <div className={`p-5 rounded-2xl flex flex-col gap-5 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Strich Unten</h2>
          <StyleSelector 
            options={['Klassisch', 'Fade Ränder', 'Fade Rechts', 'Fade Links']} 
            value={lineStyle} 
            onChange={setLineStyle} 
          />
          <Slider label="Breite" value={lineWidth} min={20} max={300} step={1} onChange={setLineWidth} />
          <Slider label="Dicke (Höhe)" value={lineHeight} min={2} max={60} step={1} onChange={setLineHeight} />
          <Slider label="Abstand zum Ring" value={lineSpacing} min={-40} max={100} step={1} onChange={setLineSpacing} />
        </div>

        {/* Text & Layout Controls */}
        <div className={`p-5 rounded-2xl flex flex-col gap-5 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Text & Layout</h2>
          <div className="flex flex-col gap-2">
            <div className={`flex justify-between text-xs font-medium ${mutedText}`}>
              <label>Schriftart ({fontIndex + 1}/{FONTS.length})</label>
            </div>
            <div className="flex gap-1.5">
              <button 
                onClick={() => setFontIndex((prev) => (prev - 1 + FONTS.length) % FONTS.length)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border shrink-0 ${isDarkMode ? 'bg-black/40 border-white/10 hover:bg-white/10 text-white' : 'bg-white/60 border-black/10 hover:bg-black/5 text-black'}`}
                title="Vorherige Schriftart"
              >
                <ChevronLeft size={16} />
              </button>
              <select 
                value={fontIndex} 
                onChange={(e) => setFontIndex(parseInt(e.target.value))}
                className={`flex-1 h-9 px-2 rounded-lg text-sm appearance-none outline-none cursor-pointer border text-center ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/60 border-black/10 text-black'}`}
              >
                {FONTS.map((font, idx) => (
                  <option key={idx} value={idx} className={isDarkMode ? 'bg-neutral-900' : 'bg-white'}>
                    {font.name}
                  </option>
                ))}
              </select>
              <button 
                onClick={() => setFontIndex((prev) => (prev + 1) % FONTS.length)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border shrink-0 ${isDarkMode ? 'bg-black/40 border-white/10 hover:bg-white/10 text-white' : 'bg-white/60 border-black/10 hover:bg-black/5 text-black'}`}
                title="Nächste Schriftart"
              >
                <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => setIsAutoPlayingFonts(!isAutoPlayingFonts)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border shrink-0 ${isAutoPlayingFonts ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') : (isDarkMode ? 'bg-black/40 border-white/10 hover:bg-white/10 text-white' : 'bg-white/60 border-black/10 hover:bg-black/5 text-black')}`}
                title={isAutoPlayingFonts ? "Auto-Play stoppen" : "Schriftarten durchwechseln"}
              >
                {isAutoPlayingFonts ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>
            </div>
          </div>
          <Slider label="Logo Skalierung" value={logoScale} min={0.2} max={3} step={0.05} onChange={setLogoScale} unit="x" />
          <Slider label="Schriftgröße" value={fontSize} min={30} max={200} step={1} onChange={setFontSize} />
          <Slider label="Schriftgewicht" value={fontWeight} min={100} max={900} step={100} onChange={setFontWeight} />
          <Slider label="Abstand Logo-Text" value={logoTextGap} min={0} max={200} step={1} onChange={setLogoTextGap} />
        </div>

      </motion.div>

      {/* Main Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 overflow-hidden relative min-h-[50vh]">
        
        {/* Background Grid Pattern for Editor Feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(${fgColor} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center relative z-10"
          style={{ gap: `${logoTextGap}px` }}
          layout
        >
          {/* Logo SVG Container - Dynamically sized to perfectly wrap the SVG */}
          <motion.div 
            className="shrink-0 flex items-center justify-center"
            animate={{ 
              width: vbW * logoScale, 
              height: vbH * logoScale 
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <svg 
              viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`} 
              className="w-full h-full overflow-visible drop-shadow-2xl"
            >
              <defs>
                {/* Line Gradients */}
                <linearGradient id="lineGradEdges" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={fgColor} stopOpacity="0" />
                  <stop offset="50%" stopColor={fgColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={fgColor} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradRight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={fgColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={fgColor} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradLeft" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={fgColor} stopOpacity="0" />
                  <stop offset="100%" stopColor={fgColor} stopOpacity="1" />
                </linearGradient>
                
                {/* Ring Gradients */}
                <linearGradient id="ringGradBottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={fgColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={fgColor} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ringGradDiagonal" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor={fgColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={fgColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Ring */}
              <motion.circle 
                cx="150" 
                cy="135" 
                r={ringRadius} 
                stroke={getRingStroke()} 
                fill="none" 
                animate={{ strokeWidth: ringThickness, r: ringRadius }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              />
              
              {/* Star */}
              <AnimatePresence>
                {showStar && (
                  <motion.g 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: starSize, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    style={{ transformOrigin: '150px 135px' }}
                  >
                    <path 
                      d="M 150 100 Q 150 135 185 135 Q 150 135 150 170 Q 150 135 115 135 Q 150 135 150 100 Z" 
                      fill={fgColor} 
                    />
                  </motion.g>
                )}
              </AnimatePresence>
              
              {/* Line */}
              <motion.rect 
                fill={getLineFill()} 
                animate={{ 
                  x: 150 - lineWidth / 2,
                  width: lineWidth,
                  height: lineHeight,
                  y: 135 + ringRadius + (ringThickness / 2) + lineSpacing
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              />
            </svg>
          </motion.div>

          {/* Text */}
          <motion.div
            className="tracking-tight whitespace-nowrap"
            animate={{ 
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight,
              color: fgColor
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            style={{ fontFamily: FONTS[fontIndex].family }}
          >
            Fintaro
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
