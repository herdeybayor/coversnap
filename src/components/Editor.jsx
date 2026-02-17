import { useState, useRef, useCallback, useEffect } from 'react';
import { renderCover, exportCoverAsPNG, TEMPLATES, ACCENT_COLORS, BACKGROUND_PALETTES } from '@/lib/renderer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const templateKeys = Object.keys(TEMPLATES);
const accentKeys = Object.keys(ACCENT_COLORS);
const bgKeys = Object.keys(BACKGROUND_PALETTES);

const PREVIEW_SIZE = 540;

export default function Editor() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [config, setConfig] = useState({
    template: 'mobile-cropped',
    title: 'Dashboard',
    subtitle: 'Welcome back',
    url: 'myproject.com',
    accent: TEMPLATES['mobile-cropped'].defaults.accent,
    background: TEMPLATES['mobile-cropped'].defaults.background,
    screenshot: null,
    size: PREVIEW_SIZE,
  });

  const [screenshotName, setScreenshotName] = useState('');
  const [exporting, setExporting] = useState(false);

  // Re-render canvas when config changes
  useEffect(() => {
    if (canvasRef.current) {
      renderCover(canvasRef.current, config);
    }
  }, [config]);

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const selectTemplate = useCallback((key) => {
    const tmpl = TEMPLATES[key];
    setConfig(prev => ({
      ...prev,
      template: key,
      accent: tmpl.defaults.accent,
      background: tmpl.defaults.background,
    }));
  }, []);

  const handleScreenshot = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setScreenshotName(file.name);
        updateConfig('screenshot', img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [updateConfig]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleScreenshot(file);
    }
  }, [handleScreenshot]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const clearScreenshot = useCallback(() => {
    setScreenshotName('');
    updateConfig('screenshot', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [updateConfig]);

  const handleExport = useCallback(async () => {
    setExporting(true);
    try {
      const blob = await exportCoverAsPNG(config, 1080);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-${config.template}-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting(false);
  }, [config]);

  const isMobile = config.template.startsWith('mobile');

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            C
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">CoverSnap</h1>
            <p className="text-xs text-white/40">Project Cover Image Generator</p>
          </div>
        </div>
        <a
          href="https://github.com/herdeybayor/coversnap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-[360px] border-r border-white/[0.06] overflow-y-auto lg:h-[calc(100vh-65px)]">
          <div className="p-5 space-y-6">
            {/* Template Selection */}
            <div>
              <Label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3 block">Template</Label>
              <div className="grid grid-cols-5 gap-2">
                {templateKeys.map(key => {
                  const tmpl = TEMPLATES[key];
                  const isActive = config.template === key;
                  return (
                    <button
                      key={key}
                      onClick={() => selectTemplate(key)}
                      className={`group relative aspect-square rounded-lg border transition-all duration-200 overflow-hidden ${
                        isActive 
                          ? 'border-indigo-500 ring-1 ring-indigo-500/30 bg-white/[0.06]' 
                          : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                    >
                      <TemplateThumb templateKey={key} isActive={isActive} />
                      <span className="sr-only">{tmpl.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-white/30 mt-2">
                {TEMPLATES[config.template].label} — {TEMPLATES[config.template].category === 'mobile' ? 'Mobile' : 'Website'}
              </p>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Content */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white/50 uppercase tracking-wider">Content</Label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-white/40 mb-1 block">{isMobile ? 'App Title' : 'Site Name'}</label>
                  <Input
                    value={config.title}
                    onChange={(e) => updateConfig('title', e.target.value)}
                    placeholder={isMobile ? 'Dashboard' : 'ProjectName'}
                    className="bg-white/[0.04] border-white/[0.08] text-white text-sm placeholder:text-white/20 h-9 focus-visible:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">{isMobile ? 'Subtitle' : 'Hero Headline'}</label>
                  <Input
                    value={config.subtitle}
                    onChange={(e) => updateConfig('subtitle', e.target.value)}
                    placeholder={isMobile ? 'Welcome back' : 'Build Something'}
                    className="bg-white/[0.04] border-white/[0.08] text-white text-sm placeholder:text-white/20 h-9 focus-visible:ring-indigo-500/50"
                  />
                </div>
                {!isMobile && (
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">URL</label>
                    <Input
                      value={config.url}
                      onChange={(e) => updateConfig('url', e.target.value)}
                      placeholder="myproject.com"
                      className="bg-white/[0.04] border-white/[0.08] text-white text-sm placeholder:text-white/20 h-9 focus-visible:ring-indigo-500/50"
                    />
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Colors */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white/50 uppercase tracking-wider">Colors</Label>
              <div>
                <label className="text-xs text-white/40 mb-2 block">Accent</label>
                <div className="flex flex-wrap gap-1.5">
                  {accentKeys.map(key => (
                    <button
                      key={key}
                      onClick={() => updateConfig('accent', key)}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ${
                        config.accent === key 
                          ? 'border-white scale-110 shadow-lg' 
                          : 'border-transparent hover:border-white/30 hover:scale-105'
                      }`}
                      style={{ backgroundColor: ACCENT_COLORS[key] }}
                      title={key}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-2 block">Background</label>
                <div className="flex flex-wrap gap-1.5">
                  {bgKeys.map(key => {
                    const palette = BACKGROUND_PALETTES[key];
                    return (
                      <button
                        key={key}
                        onClick={() => updateConfig('background', key)}
                        className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ${
                          config.background === key 
                            ? 'border-white scale-110 shadow-lg' 
                            : 'border-transparent hover:border-white/30 hover:scale-105'
                        }`}
                        style={{ background: `radial-gradient(circle, ${palette[0]}, ${palette[2]})` }}
                        title={key}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Screenshot Upload */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white/50 uppercase tracking-wider">Screenshot</Label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/[0.12] rounded-lg p-4 text-center cursor-pointer hover:border-white/25 hover:bg-white/[0.02] transition-all"
              >
                {screenshotName ? (
                  <div className="space-y-1">
                    <p className="text-xs text-white/60 truncate">{screenshotName}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); clearScreenshot(); }}
                      className="text-[11px] text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-white/20 text-2xl">📷</div>
                    <p className="text-xs text-white/40">Drop an image or click to upload</p>
                    <p className="text-[10px] text-white/20">Replaces placeholder content inside the device</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleScreenshot(e.target.files[0])}
                />
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Export */}
            <div className="space-y-2">
              <Button
                onClick={handleExport}
                disabled={exporting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-200"
              >
                {exporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Exporting…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Export PNG (2x)
                  </span>
                )}
              </Button>
              <p className="text-[10px] text-white/25 text-center">2160 × 2160px retina-ready</p>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Attribution */}
            <div className="text-center py-2">
              <p className="text-[11px] text-white/30">
                Built with <span className="text-red-400">❤️</span> by{' '}
                <a
                  href="https://dub.sh/herdeybayor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  herdeybayor
                </a>
              </p>
            </div>
          </div>
        </aside>

        {/* Preview Pane */}
        <main className="flex-1 flex items-center justify-center p-8 lg:p-12 lg:h-[calc(100vh-65px)]">
          <div className="relative">
            {/* Subtle glow behind the preview */}
            <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 blur-3xl pointer-events-none" />
            <Card className="relative bg-transparent border-white/[0.06] p-3 rounded-2xl shadow-2xl shadow-black/40">
              <canvas
                ref={canvasRef}
                className="rounded-xl block"
                style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
              />
            </Card>
            <p className="text-center text-[11px] text-white/20 mt-4">Live preview — changes update in real-time</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// Mini template thumbnails for the template selector
function TemplateThumb({ templateKey, isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const tmpl = TEMPLATES[templateKey];
    const canvas = canvasRef.current;
    const size = 60;
    canvas.width = size * 2;
    canvas.height = size * 2;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    tmpl.fn(ctx, size, { ...tmpl.defaults, title: '', subtitle: '', url: '' });
  }, [templateKey]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}`}
    />
  );
}
