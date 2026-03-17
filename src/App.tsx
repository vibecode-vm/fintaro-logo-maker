import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, RotateCcw, Play, Pause, ChevronLeft, ChevronRight, Download, Upload, FileJson } from "lucide-react";
import * as opentype from "opentype.js";
import fintaroRegularUrl from "./assets/fonts/Fintaro-Regular.otf?url";
import fintaroBoldUrl from "./assets/fonts/Fintaro-Bold.otf?url";

const FONTS = [
  { name: "Fintaro", family: '"Fintaro", sans-serif' },
  { name: "Inter", family: '"Inter", sans-serif' },
  { name: "Space Grotesk", family: '"Space Grotesk", sans-serif' },
  { name: "Outfit", family: '"Outfit", sans-serif' },
  { name: "Plus Jakarta Sans", family: '"Plus Jakarta Sans", sans-serif' },
  { name: "Sora", family: '"Sora", sans-serif' },
  { name: "Montserrat", family: '"Montserrat", sans-serif' },
  { name: "Poppins", family: '"Poppins", sans-serif' },
  { name: "Manrope", family: '"Manrope", sans-serif' },
  { name: "Syne", family: '"Syne", sans-serif' },
  { name: "DM Sans", family: '"DM Sans", sans-serif' }
];

const DEFAULTS = {
  ringRadius: 50,
  ringThickness: 20,
  ringStyle: 1,
  starSize: 1,
  lineWidth: 120,
  lineHeight: 20,
  lineSpacing: 16,
  lineStyle: 1,
  logoScale: 1,
  logoTextGap: 32,
  fontSize: 96,
  fontWeight: 700,
  fontIndex: 0,
  paddingOuter: 40,
  backgroundStyle: "white",
  exportPreset: "16:9",
  isDarkMode: false,
  dotPatternOpacity: 0.24,
  dotPatternSpacing: 22,
  dotPatternSize: 1
};

const STORAGE_KEY = "fintaro-logo-maker-settings-v4";

const PRESETS: Record<string, { label: string; ratio: number | null }> = {
  auto: { label: "Auto", ratio: null },
  "1:1": { label: "1:1", ratio: 1 },
  "16:9": { label: "16:9", ratio: 16 / 9 },
  "9:16": { label: "9:16", ratio: 9 / 16 },
  "4:5": { label: "4:5", ratio: 4 / 5 },
  thumbnail: { label: "Thumbnail", ratio: 16 / 9 }
};

const BG_COLOR: Record<string, string | null> = {
  transparent: null,
  white: "#ffffff",
  black: "#000000",
  dark: "#0a0a0a",
  light: "#f5f5f5"
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(DEFAULTS.isDarkMode);
  const [showStar, setShowStar] = useState(true);

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

  const [paddingOuter, setPaddingOuter] = useState(DEFAULTS.paddingOuter);
  const [backgroundStyle, setBackgroundStyle] = useState(DEFAULTS.backgroundStyle);
  const [exportPreset, setExportPreset] = useState(DEFAULTS.exportPreset);

  const [dotPatternOpacity, setDotPatternOpacity] = useState(DEFAULTS.dotPatternOpacity);
  const [dotPatternSpacing, setDotPatternSpacing] = useState(DEFAULTS.dotPatternSpacing);
  const [dotPatternSize, setDotPatternSize] = useState(DEFAULTS.dotPatternSize);

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null);
  const [uploadedLogoName, setUploadedLogoName] = useState<string>("Kein Logo hochgeladen");

  const [fintaroRegular, setFintaroRegular] = useState<any>(null);
  const [fintaroBold, setFintaroBold] = useState<any>(null);

  useEffect(() => {
    opentype.load(fintaroRegularUrl, (err, font) => {
      if (!err && font) setFintaroRegular(font);
    });
    opentype.load(fintaroBoldUrl, (err, font) => {
      if (!err && font) setFintaroBold(font);
    });
  }, []);


  const applyConfig = (cfg: any) => {
    setRingRadius(cfg.ringRadius ?? DEFAULTS.ringRadius);
    setRingThickness(cfg.ringThickness ?? DEFAULTS.ringThickness);
    setRingStyle(cfg.ringStyle ?? DEFAULTS.ringStyle);
    setStarSize(cfg.starSize ?? DEFAULTS.starSize);
    setLineWidth(cfg.lineWidth ?? DEFAULTS.lineWidth);
    setLineHeight(cfg.lineHeight ?? DEFAULTS.lineHeight);
    setLineSpacing(cfg.lineSpacing ?? DEFAULTS.lineSpacing);
    setLineStyle(cfg.lineStyle ?? DEFAULTS.lineStyle);
    setLogoScale(cfg.logoScale ?? DEFAULTS.logoScale);
    setLogoTextGap(cfg.logoTextGap ?? DEFAULTS.logoTextGap);
    setFontSize(cfg.fontSize ?? DEFAULTS.fontSize);
    setFontWeight(cfg.fontWeight ?? DEFAULTS.fontWeight);
    setFontIndex(cfg.fontIndex ?? DEFAULTS.fontIndex);
    setShowStar(cfg.showStar ?? true);
    setPaddingOuter(cfg.paddingOuter ?? DEFAULTS.paddingOuter);
    setBackgroundStyle(cfg.backgroundStyle ?? DEFAULTS.backgroundStyle);
    setExportPreset(cfg.exportPreset ?? DEFAULTS.exportPreset);
    setIsDarkMode(cfg.isDarkMode ?? DEFAULTS.isDarkMode);
    setDotPatternOpacity(cfg.dotPatternOpacity ?? DEFAULTS.dotPatternOpacity);
    setDotPatternSpacing(cfg.dotPatternSpacing ?? DEFAULTS.dotPatternSpacing);
    setDotPatternSize(cfg.dotPatternSize ?? DEFAULTS.dotPatternSize);
  };

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      applyConfig(JSON.parse(raw));
    } catch {
      // ignore invalid JSON
    }
  }, []);

  useEffect(() => {
    const cfg = {
      ringRadius,
      ringThickness,
      ringStyle,
      starSize,
      lineWidth,
      lineHeight,
      lineSpacing,
      lineStyle,
      logoScale,
      logoTextGap,
      fontSize,
      fontWeight,
      fontIndex,
      showStar,
      paddingOuter,
      backgroundStyle,
      exportPreset,
      isDarkMode,
      dotPatternOpacity,
      dotPatternSpacing,
      dotPatternSize
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg, null, 2));
  }, [ringRadius, ringThickness, ringStyle, starSize, lineWidth, lineHeight, lineSpacing, lineStyle, logoScale, logoTextGap, fontSize, fontWeight, fontIndex, showStar, paddingOuter, backgroundStyle, exportPreset, isDarkMode, dotPatternOpacity, dotPatternSpacing, dotPatternSize]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlayingFonts) {
      interval = setInterval(() => setFontIndex((prev) => (prev + 1) % FONTS.length), 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlayingFonts]);

  useEffect(() => {
    return () => {
      if (uploadedLogoUrl) URL.revokeObjectURL(uploadedLogoUrl);
    };
  }, [uploadedLogoUrl]);

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
    setPaddingOuter(DEFAULTS.paddingOuter);
    setBackgroundStyle(DEFAULTS.backgroundStyle);
    setExportPreset(DEFAULTS.exportPreset);
    setIsDarkMode(DEFAULTS.isDarkMode);
    setDotPatternOpacity(DEFAULTS.dotPatternOpacity);
    setDotPatternSpacing(DEFAULTS.dotPatternSpacing);
    setDotPatternSize(DEFAULTS.dotPatternSize);
  };

  const fgColor = isDarkMode ? "white" : "black";
  const bgColor = isDarkMode ? "bg-neutral-950" : "bg-neutral-100";
  const panelBg = isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const mutedText = isDarkMode ? "text-neutral-400" : "text-neutral-500";

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
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-current ${isDarkMode ? "bg-white/20" : "bg-black/20"}`}
      />
    </div>
  );

  const StyleSelector = ({ options, value, onChange }) => (
    <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? "bg-black/40" : "bg-white/60"}`}>
      {options.map((name, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`flex-1 text-[10px] sm:text-xs py-1.5 rounded-md transition-all ${value === i ? (isDarkMode ? "bg-white/20 text-white font-medium" : "bg-black/10 text-black font-medium") : (isDarkMode ? "text-neutral-400 hover:text-neutral-200" : "text-neutral-500 hover:text-neutral-700")}`}
        >
          {name}
        </button>
      ))}
    </div>
  );

  const maxTopRadius = Math.max(ringRadius + ringThickness / 2, showStar ? 35 * starSize : 0);
  const visualLeft = 150 - Math.max(maxTopRadius, lineWidth / 2);
  const visualRight = 150 + Math.max(maxTopRadius, lineWidth / 2);
  const visualTop = 135 - maxTopRadius;
  const visualBottom = Math.max(135 + maxTopRadius, 135 + ringRadius + ringThickness / 2 + lineSpacing + lineHeight);

  const visualWidth = visualRight - visualLeft;
  const visualHeight = visualBottom - visualTop;
  const clipPadding = 4;
  const vbX = visualLeft - clipPadding;
  const vbY = visualTop - clipPadding;
  const vbW = visualWidth + clipPadding * 2;
  const vbH = visualHeight + clipPadding * 2;

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

  const getFintaroFont = () => (fontWeight >= 600 ? fintaroBold || fintaroRegular : fintaroRegular || fintaroBold);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Bitte nur SVG, PNG oder JPEG hochladen.");
      return;
    }
    if (uploadedLogoUrl) URL.revokeObjectURL(uploadedLogoUrl);
    const objectUrl = URL.createObjectURL(file);
    setUploadedLogoUrl(objectUrl);
    setUploadedLogoName(file.name);
  };

  const exportJsonSettings = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const blob = new Blob([raw || "{}"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fintaro-logo-settings.json";
    a.click();
    URL.revokeObjectURL(url);
  };


  const importJsonSettings = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const cfg = JSON.parse(text);
      applyConfig(cfg);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg, null, 2));
    } catch {
      alert("Ungültige JSON-Datei.");
    } finally {
      event.target.value = "";
    }
  };

  const measureFintaroWidth = (text: string) => {
    const f = getFintaroFont();
    if (!f) return text.length * fontSize * 0.55;
    return f.getAdvanceWidth(text, fontSize);
  };

  const buildLogoSvgString = () => {
    const text = "Fintaro";
    const usePathText = FONTS[fontIndex].name === "Fintaro";
    const textWidth = usePathText ? measureFintaroWidth(text) : text.length * fontSize * 0.55;

    const contentWidth = vbW + logoTextGap + textWidth;
    const contentHeight = Math.max(vbH, fontSize * 1.3);

    const innerWidth = contentWidth + paddingOuter * 2;
    const innerHeight = contentHeight + paddingOuter * 2;

    const targetRatio = PRESETS[exportPreset]?.ratio ?? null;
    let svgWidth = innerWidth;
    let svgHeight = innerHeight;

    if (targetRatio) {
      const current = innerWidth / innerHeight;
      if (current > targetRatio) svgHeight = innerWidth / targetRatio;
      else svgWidth = innerHeight * targetRatio;
    }

    const baseX = (svgWidth - innerWidth) / 2 + paddingOuter;
    const baseY = (svgHeight - innerHeight) / 2 + paddingOuter;

    const iconTranslateX = baseX - vbX;
    const iconTranslateY = baseY + (contentHeight - vbH) / 2 - vbY;

    const textX = baseX + vbW + logoTextGap;
    const textBaselineY = baseY + contentHeight / 2 + fontSize * 0.34;

    const starSvg = showStar
      ? `<g transform="translate(150 135) scale(${starSize}) translate(-150 -135)"><path d="M 150 100 Q 150 135 185 135 Q 150 135 150 170 Q 150 135 115 135 Q 150 135 150 100 Z" fill="${fgColor}" /></g>`
      : "";

    let textNode = `<text x="${textX}" y="${textBaselineY}" fill="${fgColor}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="${FONTS[fontIndex].family.replace(/\"/g, "")}">${text}</text>`;

    if (usePathText) {
      const f = getFintaroFont();
      if (f) {
        const d = f.getPath(text, textX, textBaselineY, fontSize).toPathData(3);
        textNode = `<path d="${d}" fill="${fgColor}" />`;
      }
    }

    const bg = BG_COLOR[backgroundStyle];
    const bgRect = bg ? `<rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" fill="${bg}" />` : "";

    return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(svgWidth)}" height="${Math.ceil(svgHeight)}" viewBox="0 0 ${svgWidth} ${svgHeight}">\n${bgRect}\n  <defs>\n    <linearGradient id="lineGradEdges" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${fgColor}" stop-opacity="0" /><stop offset="50%" stop-color="${fgColor}" stop-opacity="1" /><stop offset="100%" stop-color="${fgColor}" stop-opacity="0" /></linearGradient>\n    <linearGradient id="lineGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${fgColor}" stop-opacity="1" /><stop offset="100%" stop-color="${fgColor}" stop-opacity="0" /></linearGradient>\n    <linearGradient id="lineGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${fgColor}" stop-opacity="0" /><stop offset="100%" stop-color="${fgColor}" stop-opacity="1" /></linearGradient>\n    <linearGradient id="ringGradBottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${fgColor}" stop-opacity="1" /><stop offset="100%" stop-color="${fgColor}" stop-opacity="0" /></linearGradient>\n    <linearGradient id="ringGradDiagonal" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="${fgColor}" stop-opacity="1" /><stop offset="100%" stop-color="${fgColor}" stop-opacity="0" /></linearGradient>\n  </defs>\n  <g transform="translate(${iconTranslateX} ${iconTranslateY})">\n    <circle cx="150" cy="135" r="${ringRadius}" stroke="${getRingStroke()}" stroke-width="${ringThickness}" fill="none" />\n    ${starSvg}\n    <rect x="${150 - lineWidth / 2}" y="${135 + ringRadius + ringThickness / 2 + lineSpacing}" width="${lineWidth}" height="${lineHeight}" fill="${getLineFill()}" />\n  </g>\n  ${textNode}\n</svg>`;
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSvg = () => {
    triggerDownload(new Blob([buildLogoSvgString()], { type: "image/svg+xml;charset=utf-8" }), "fintaro-logo.svg");
  };

  const downloadRaster = (format: "png" | "jpeg") => {
    const svgBlob = new Blob([buildLogoSvgString()], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (format === "jpeg" && !BG_COLOR[backgroundStyle]) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) triggerDownload(blob, `fintaro-logo.${format === "jpeg" ? "jpg" : "png"}`);
      }, format === "jpeg" ? "image/jpeg" : "image/png", 0.95);
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  const previewBg = BG_COLOR[backgroundStyle] ?? "transparent";
  const previewRatio = PRESETS[exportPreset]?.ratio || undefined;
  const dotColor = isDarkMode ? "rgba(55,65,81,1)" : "rgba(226,232,240,1)";

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row ${bgColor} ${textColor} transition-colors duration-500 font-sans`}>
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-full lg:w-84 lg:h-screen overflow-y-auto p-6 border-b lg:border-b-0 lg:border-r flex flex-col gap-6 shrink-0 ${isDarkMode ? "border-white/10" : "border-black/10"}`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Fintaro Logo Maker</h1>
          <div className="flex gap-2">
            <button onClick={resetToIdeal} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}><RotateCcw size={18} /></button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}>{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>
        </div>

        <div className={`p-4 rounded-2xl flex flex-col gap-4 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Ring</h2>
          <StyleSelector options={["Klassisch", "Fade Unten", "Fade Diagonal"]} value={ringStyle} onChange={setRingStyle} />
          <Slider label="Radius" value={ringRadius} min={20} max={100} step={1} onChange={setRingRadius} />
          <Slider label="Stroke" value={ringThickness} min={4} max={60} step={1} onChange={setRingThickness} />
        </div>

        <div className={`p-4 rounded-2xl flex flex-col gap-4 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Stern</h2>
          <button onClick={() => setShowStar(!showStar)} className={`w-10 h-6 rounded-full relative ${showStar ? (isDarkMode ? "bg-white" : "bg-black") : (isDarkMode ? "bg-neutral-700" : "bg-neutral-300")}`}>
            <div className={`w-4 h-4 rounded-full absolute top-1 transition-transform ${isDarkMode ? "bg-black" : "bg-white"} ${showStar ? "translate-x-5" : "translate-x-1"}`} />
          </button>
          <AnimatePresence>
            {showStar && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><Slider label="Scale" value={starSize} min={0.2} max={3} step={0.1} onChange={setStarSize} unit="x" /></motion.div>}
          </AnimatePresence>
        </div>

        <div className={`p-4 rounded-2xl flex flex-col gap-4 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Linie</h2>
          <StyleSelector options={["Klassisch", "Fade Ränder", "Fade Rechts", "Fade Links"]} value={lineStyle} onChange={setLineStyle} />
          <Slider label="Breite" value={lineWidth} min={20} max={300} step={1} onChange={setLineWidth} />
          <Slider label="Höhe" value={lineHeight} min={2} max={60} step={1} onChange={setLineHeight} />
          <Slider label="Abstand" value={lineSpacing} min={-40} max={100} step={1} onChange={setLineSpacing} />
        </div>

        <div className={`p-4 rounded-2xl flex flex-col gap-4 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Text</h2>
          <div className="flex gap-1.5">
            <button onClick={() => setFontIndex((prev) => (prev - 1 + FONTS.length) % FONTS.length)} className={`w-9 h-9 flex items-center justify-center rounded-lg border ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><ChevronLeft size={16} /></button>
            <select value={fontIndex} onChange={(e) => setFontIndex(parseInt(e.target.value))} className={`flex-1 h-9 px-2 rounded-lg text-sm border ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white/60 border-black/10 text-black"}`}>
              {FONTS.map((f, i) => <option key={i} value={i}>{f.name}</option>)}
            </select>
            <button onClick={() => setFontIndex((prev) => (prev + 1) % FONTS.length)} className={`w-9 h-9 flex items-center justify-center rounded-lg border ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><ChevronRight size={16} /></button>
            <button onClick={() => setIsAutoPlayingFonts(!isAutoPlayingFonts)} className={`w-9 h-9 flex items-center justify-center rounded-lg border ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}>{isAutoPlayingFonts ? <Pause size={16} /> : <Play size={16} />}</button>
          </div>
          <Slider label="Logo Scale" value={logoScale} min={0.2} max={3} step={0.05} onChange={setLogoScale} unit="x" />
          <Slider label="Schriftgröße" value={fontSize} min={30} max={200} step={1} onChange={setFontSize} />
          <Slider label="Gewicht" value={fontWeight} min={100} max={900} step={100} onChange={setFontWeight} />
          <Slider label="Gap" value={logoTextGap} min={0} max={200} step={1} onChange={setLogoTextGap} />
        </div>

        <div className={`p-4 rounded-2xl flex flex-col gap-4 ${panelBg}`}>
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-80">Export / JSON</h2>
          <Slider label="Padding außen" value={paddingOuter} min={0} max={300} step={1} onChange={setPaddingOuter} />
          <Slider label="Datarad Deckkraft" value={dotPatternOpacity} min={0} max={0.8} step={0.01} onChange={setDotPatternOpacity} />
          <Slider label="Datarad Abstand" value={dotPatternSpacing} min={10} max={48} step={1} onChange={setDotPatternSpacing} />
          <Slider label="Datarad Punktgröße" value={dotPatternSize} min={0.5} max={2.5} step={0.1} onChange={setDotPatternSize} />
          <div className="grid grid-cols-2 gap-2">
            <select value={backgroundStyle} onChange={(e) => setBackgroundStyle(e.target.value)} className={`h-9 px-2 rounded-lg text-sm border ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white/60 border-black/10 text-black"}`}>
              <option value="transparent">Hintergrund: Transparent</option>
              <option value="white">Hintergrund: Weiß</option>
              <option value="black">Hintergrund: Schwarz</option>
              <option value="dark">Hintergrund: Dark</option>
              <option value="light">Hintergrund: Light</option>
            </select>
            <select value={exportPreset} onChange={(e) => setExportPreset(e.target.value)} className={`h-9 px-2 rounded-lg text-sm border ${isDarkMode ? "bg-black/40 border-white/10 text-white" : "bg-white/60 border-black/10 text-black"}`}>
              {Object.entries(PRESETS).map(([key, p]) => <option key={key} value={key}>Format: {p.label}</option>)}
            </select>
          </div>

          <label className={`w-full h-10 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm cursor-pointer ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}>
            <Upload size={16} /> Upload SVG/PNG/JPG
            <input type="file" accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg" className="hidden" onChange={handleLogoUpload} />
          </label>
          <p className={`text-xs ${mutedText}`}>{uploadedLogoName}</p>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={downloadSvg} className={`h-9 px-3 rounded-lg text-sm border flex items-center justify-center gap-2 ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><Download size={14} /> SVG</button>
            <button onClick={() => downloadRaster("png")} className={`h-9 px-3 rounded-lg text-sm border flex items-center justify-center gap-2 ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><Download size={14} /> PNG</button>
            <button onClick={() => downloadRaster("jpeg")} className={`h-9 px-3 rounded-lg text-sm border flex items-center justify-center gap-2 ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><Download size={14} /> JPG</button>
            <button onClick={exportJsonSettings} className={`h-9 px-3 rounded-lg text-sm border flex items-center justify-center gap-2 ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}><FileJson size={14} /> JSON Export</button>
          </div>
          <label className={`w-full h-9 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm cursor-pointer ${isDarkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"}`}>
            <FileJson size={14} /> JSON Import
            <input type="file" accept="application/json,.json" className="hidden" onChange={importJsonSettings} />
          </label>
          <p className={`text-[11px] ${mutedText}`}>Settings werden automatisch als JSON gespeichert (LocalStorage).</p>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-14 overflow-hidden relative min-h-[50vh]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${dotColor} ${dotPatternSize}px, transparent ${dotPatternSize}px)`,
            backgroundSize: `${dotPatternSpacing}px ${dotPatternSpacing}px`,
            opacity: dotPatternOpacity
          }}
        />

        <motion.div
          className="relative z-10 w-full max-w-[1100px] border rounded-2xl overflow-hidden"
          style={{
            aspectRatio: previewRatio,
            background: previewBg,
            padding: `${paddingOuter}px`,
            borderColor: isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"
          }}
        >
          {uploadedLogoUrl && <img src={uploadedLogoUrl} alt="Ref" className="absolute inset-0 m-auto max-w-[80%] max-h-[80%] object-contain opacity-20 pointer-events-none" />}

          <motion.div className="h-full flex flex-col md:flex-row items-center justify-center" style={{ gap: `${logoTextGap}px` }} layout>
            <motion.div className="shrink-0 flex items-center justify-center" animate={{ width: vbW * logoScale, height: vbH * logoScale }} transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
              <svg viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`} className="w-full h-full overflow-visible drop-shadow-2xl">
                <defs>
                  <linearGradient id="lineGradEdges" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={fgColor} stopOpacity="0" /><stop offset="50%" stopColor={fgColor} stopOpacity="1" /><stop offset="100%" stopColor={fgColor} stopOpacity="0" /></linearGradient>
                  <linearGradient id="lineGradRight" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={fgColor} stopOpacity="1" /><stop offset="100%" stopColor={fgColor} stopOpacity="0" /></linearGradient>
                  <linearGradient id="lineGradLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={fgColor} stopOpacity="0" /><stop offset="100%" stopColor={fgColor} stopOpacity="1" /></linearGradient>
                  <linearGradient id="ringGradBottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={fgColor} stopOpacity="1" /><stop offset="100%" stopColor={fgColor} stopOpacity="0" /></linearGradient>
                  <linearGradient id="ringGradDiagonal" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor={fgColor} stopOpacity="1" /><stop offset="100%" stopColor={fgColor} stopOpacity="0" /></linearGradient>
                </defs>
                <motion.circle cx="150" cy="135" r={ringRadius} stroke={getRingStroke()} fill="none" animate={{ strokeWidth: ringThickness }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
                <AnimatePresence>
                  {showStar && (
                    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: starSize, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} style={{ transformOrigin: "150px 135px" }}>
                      <path d="M 150 100 Q 150 135 185 135 Q 150 135 150 170 Q 150 135 115 135 Q 150 135 150 100 Z" fill={fgColor} />
                    </motion.g>
                  )}
                </AnimatePresence>
                <motion.rect fill={getLineFill()} animate={{ x: 150 - lineWidth / 2, width: lineWidth, height: lineHeight, y: 135 + ringRadius + ringThickness / 2 + lineSpacing }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
              </svg>
            </motion.div>

            <motion.div animate={{ fontSize: `${fontSize}px`, fontWeight, color: fgColor }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} style={{ fontFamily: FONTS[fontIndex].family }} className="tracking-tight whitespace-nowrap">Fintaro</motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
