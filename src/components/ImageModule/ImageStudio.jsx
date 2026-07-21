import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Image as ImageIcon, Upload, Sparkles, Wand2, Eraser, Scissors, ZoomIn,
  Download, RotateCcw, FlipHorizontal, Sun, Contrast, Droplets, Sliders,
  X, Check, Send, RefreshCw, Maximize2, Minimize2
} from 'lucide-react';
import { sendImageEditCommand, isGeminiReady, initGeminiClient, getSavedApiKey } from '../../services/geminiService';
import { IMAGE_STYLES } from '../../mock/aiData';

const DEFAULT_FILTERS = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
  blur: 0,
  opacity: 100,
};

export default function ImageStudio() {
  const [uploadedImage, setUploadedImage] = useState(null); // { dataUrl, base64, mimeType, name, naturalW, naturalH }
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [faceScale, setFaceScale] = useState(1.0);
  const [aiCommand, setAiCommand] = useState('');
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [activeTab, setActiveTab] = useState('adjust'); // 'adjust' | 'ai'
  const [isDragging, setIsDragging] = useState(false);
  const [zoomMode, setZoomMode] = useState('fit'); // 'fit' | 'original'

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  // Initialize Gemini on mount
  useEffect(() => {
    const saved = getSavedApiKey();
    if (saved && !isGeminiReady()) initGeminiClient(saved);
  }, []);

  // Build CSS filter string
  const buildFilterString = (f) => {
    const b = 100 + f.brightness;
    const c = 100 + f.contrast;
    const s = 100 + f.saturation;
    return `brightness(${b}%) contrast(${c}%) saturate(${s}%) hue-rotate(${f.hue}deg) blur(${f.blur}px) opacity(${f.opacity}%)`;
  };

  // Build canvas transform
  const buildTransform = () => {
    const scaleX = flipH ? -1 : 1;
    const scaleY = flipV ? -1 : 1;
    return `rotate(${rotation}deg) scale(${scaleX * faceScale}, ${scaleY})`;
  };

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) loadImageFile(file);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) loadImageFile(file);
    e.target.value = '';
  };

  const loadImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const base64 = dataUrl.split(',')[1];
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          dataUrl,
          base64,
          mimeType: file.type,
          name: file.name,
          naturalW: img.naturalWidth,
          naturalH: img.naturalHeight
        });
        setFilters({ ...DEFAULT_FILTERS });
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
        setFaceScale(1.0);
        setAiMessage('');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setFaceScale(1.0);
    setAiMessage('');
  };

  // Download canvas as image
  const handleDownload = () => {
    if (!uploadedImage) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.filter = buildFilterString(filters);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      const link = document.createElement('a');
      link.download = 'novaai-edited-' + (uploadedImage.name || 'image.png');
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = uploadedImage.dataUrl;
  };

  // AI Command Processing
  const handleAiCommand = async () => {
    if (!aiCommand.trim() || isProcessingAi) return;
    if (!uploadedImage) {
      setAiMessage('⚠️ กรุณาอัปโหลดรูปภาพก่อนสั่งงาน AI ครับ');
      return;
    }
    setIsProcessingAi(true);
    setAiMessage('');

    try {
      const result = await sendImageEditCommand(
        aiCommand,
        uploadedImage.base64,
        uploadedImage.mimeType
      );
      // Apply the AI-suggested filters
      setFilters(prev => ({
        brightness: result.brightness !== undefined ? result.brightness : prev.brightness,
        contrast: result.contrast !== undefined ? result.contrast : prev.contrast,
        saturation: result.saturation !== undefined ? result.saturation : prev.saturation,
        hue: result.hue !== undefined ? result.hue : prev.hue,
        blur: result.blur !== undefined ? result.blur : prev.blur,
        opacity: prev.opacity,
      }));
      if (result.faceScale !== undefined) {
        setFaceScale(result.faceScale);
      }
      setAiMessage(`✅ ${result.explanation || 'ปรับแต่งรูปภาพเรียบร้อยแล้ว'}`);
      setAiCommand('');
    } catch (err) {
      if (err.message === 'GEMINI_NOT_INITIALIZED') {
        setAiMessage('⚠️ ยังไม่ได้ตั้งค่า API Key — กรุณาตั้งค่าที่ไอคอน Key ด้านบนก่อนครับ');
      } else {
        setAiMessage(`❌ เกิดข้อผิดพลาด: ${err.message}`);
      }
    } finally {
      setIsProcessingAi(false);
    }
  };

  const sliders = [
    { key: 'brightness', label: 'ความสว่าง', icon: Sun, min: -100, max: 100, unit: '' },
    { key: 'contrast', label: 'ความคมชัด', icon: Contrast, min: -100, max: 100, unit: '' },
    { key: 'saturation', label: 'ความอิ่มตัวสี', icon: Droplets, min: -100, max: 100, unit: '' },
    { key: 'hue', label: 'โทนสี (Hue)', icon: Sliders, min: -180, max: 180, unit: '°' },
    { key: 'blur', label: 'เบลอ (Blur)', icon: Sliders, min: 0, max: 20, unit: 'px' },
    { key: 'opacity', label: 'ความโปร่งใส', icon: Sliders, min: 0, max: 100, unit: '%' },
  ];

  const AI_QUICK_COMMANDS = [
    'ทำหน้าเล็กลง',
    'ทำหน้าใหญ่ขึ้น',
    'ปรับแสงสว่างขึ้น',
    'ทำให้มืดลง',
    'เพิ่มสีสันสดใส',
    'ลดสี (ขาวดำ)',
    'เพิ่มความคมชัด',
    'เบลอพื้นหลัง',
    'โทนสีอบอุ่น',
    'โทนสีเย็น (Cyberpunk)',
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(15,23,42,0.5)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ImageIcon size={22} color="#ec4899" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
            AllInStudio <span className="text-gradient">Image Studio</span>
          </h2>
          {uploadedImage && (
            <span className="badge-pink">
              {uploadedImage.naturalW} × {uploadedImage.naturalH} px
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => fileInputRef.current?.click()} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            <Upload size={15} /> อัปโหลดรูปภาพ
          </button>
          {uploadedImage && (
            <>
              <button onClick={handleReset} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                <RefreshCw size={15} /> รีเซ็ต
              </button>
              <button onClick={handleDownload} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Download size={15} /> ดาวน์โหลด HD
              </button>
            </>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
      </div>

      {/* Main Layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', overflow: 'hidden' }}>

        {/* Canvas Preview Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDragging ? 'rgba(99,102,241,0.08)' : 'rgba(9,13,22,0.6)',
            border: isDragging ? '2px dashed #6366f1' : 'none',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
          }}
        >
          {!uploadedImage ? (
            /* Upload Prompt */
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                padding: '60px 40px',
                borderRadius: '24px',
                border: '2px dashed rgba(236,72,153,0.35)',
                background: 'rgba(236,72,153,0.04)',
                transition: 'all 0.25s'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px auto',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(139,92,246,0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(236,72,153,0.3)'
              }}>
                <Upload size={36} color="#ec4899" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#fff' }}>
                ลากรูปมาวางหรือคลิกเพื่ออัปโหลด
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                รองรับ JPG, PNG, WEBP, GIF · ขนาดไม่จำกัด
              </p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
                <span className="badge-pink">แต่งรูปเอง</span>
                <span className="badge-neon">สั่ง AI ได้</span>
                <span className="badge-cyan">ดาวน์โหลด HD</span>
              </div>
            </div>
          ) : (
            /* Image Preview with Live Filter */
            <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
              <img
                ref={imgRef}
                src={uploadedImage.dataUrl}
                alt="edited"
                style={{
                  maxWidth: zoomMode === 'fit' ? '100%' : `${uploadedImage.naturalW}px`,
                  maxHeight: zoomMode === 'fit' ? 'calc(100vh - 200px)' : undefined,
                  borderRadius: '16px',
                  display: 'block',
                  filter: buildFilterString(filters),
                  transform: buildTransform(),
                  transformOrigin: 'center center',
                  transition: 'filter 0.15s ease, transform 0.2s ease',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                }}
              />

              {/* Zoom Toggle */}
              <button
                onClick={() => setZoomMode(z => z === 'fit' ? 'original' : 'fit')}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {zoomMode === 'fit' ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
            </div>
          )}
        </div>

        {/* Right Control Panel */}
        <div style={{
          overflowY: 'auto',
          background: 'rgba(15,23,42,0.7)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Tab Switch */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            {[{ id: 'adjust', label: '🎨 ปรับแต่งเอง' }, { id: 'ai', label: '🤖 สั่ง AI' }].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: activeTab === tab.id ? 'rgba(236,72,153,0.12)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #ec4899' : '2px solid transparent',
                  color: activeTab === tab.id ? '#f472b6' : 'var(--text-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --- TAB: Manual Adjust --- */}
          {activeTab === 'adjust' && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Filter Sliders */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
                  ปรับสี & แสง
                </h4>
                {sliders.map(s => {
                  const IconComp = s.icon;
                  return (
                    <div key={s.key} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <IconComp size={13} />
                          {s.label}
                        </span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a5b4fc' }}>
                          {filters[s.key]}{s.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        value={filters[s.key]}
                        onChange={e => setFilters(prev => ({ ...prev, [s.key]: Number(e.target.value) }))}
                        style={{
                          width: '100%',
                          accentColor: '#ec4899',
                          cursor: 'pointer',
                          height: '4px'
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Transform Controls */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
                  หมุน & พลิก
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <button onClick={() => setRotation(r => r - 90)} className="btn-secondary" style={{ fontSize: '0.8rem', justifyContent: 'center' }}>
                    <RotateCcw size={14} /> หมุน -90°
                  </button>
                  <button onClick={() => setRotation(r => r + 90)} className="btn-secondary" style={{ fontSize: '0.8rem', justifyContent: 'center' }}>
                    <RotateCcw size={14} style={{ transform: 'scaleX(-1)' }} /> หมุน +90°
                  </button>
                  <button
                    onClick={() => setFlipH(h => !h)}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', justifyContent: 'center', borderColor: flipH ? '#818cf8' : undefined }}
                  >
                    <FlipHorizontal size={14} /> พลิกซ้าย-ขวา
                  </button>
                  <button
                    onClick={() => setFlipV(v => !v)}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', justifyContent: 'center', borderColor: flipV ? '#818cf8' : undefined }}
                  >
                    <FlipHorizontal size={14} style={{ transform: 'rotate(90deg)' }} /> พลิกบน-ล่าง
                  </button>
                </div>
              </div>

              {/* Face Scale Slider */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
                  ขนาดภาพ (Scale / Face Size)
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {faceScale < 1 ? '😊 ลดขนาด (เล็กลง)' : faceScale > 1 ? '😊 ขยายขนาด (ใหญ่ขึ้น)' : 'ปกติ (1.0x)'}
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#ec4899' }}>{faceScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={2.5}
                  step={0.01}
                  value={faceScale}
                  onChange={e => setFaceScale(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer', height: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <button onClick={() => setFaceScale(0.7)} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>หน้าเล็ก</button>
                  <button onClick={() => setFaceScale(1.0)} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>ปกติ</button>
                  <button onClick={() => setFaceScale(1.4)} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>หน้าใหญ่</button>
                </div>
              </div>

              {/* Quick Preset Filters */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
                  ฟิลเตอร์ Preset
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {[
                    { name: '🌇 Warm', f: { brightness: 10, contrast: 10, saturation: 20, hue: 15, blur: 0, opacity: 100 } },
                    { name: '❄️ Cool Cyber', f: { brightness: 5, contrast: 15, saturation: 10, hue: -30, blur: 0, opacity: 100 } },
                    { name: '🎞️ Cinematic', f: { brightness: -10, contrast: 30, saturation: -15, hue: 0, blur: 0, opacity: 100 } },
                    { name: '🎨 Vivid Pop', f: { brightness: 15, contrast: 20, saturation: 60, hue: 0, blur: 0, opacity: 100 } },
                    { name: '⬛ Mono B&W', f: { brightness: 0, contrast: 20, saturation: -100, hue: 0, blur: 0, opacity: 100 } },
                    { name: '🌸 Soft Blur', f: { brightness: 5, contrast: -5, saturation: 10, hue: 0, blur: 3, opacity: 100 } },
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setFilters(preset.f)}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--text-muted)',
                        padding: '7px 8px',
                        borderRadius: '10px',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(236,72,153,0.4)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- TAB: AI Command --- */}
          {activeTab === 'ai' && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '0.82rem',
                color: '#c4b5fd',
                lineHeight: '1.6'
              }}>
                🤖 พิมพ์คำสั่งภาษาไทยหรือภาษาอังกฤษ แล้ว AI จะปรับแต่งรูปให้อัตโนมัติครับ<br />
                เช่น <em>"ทำหน้าเล็กลง"</em>, <em>"เพิ่มความสว่าง"</em>, <em>"โทนสีเย็น"</em>
              </div>

              {/* Quick Command Chips */}
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '8px' }}>คำสั่งด่วน:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {AI_QUICK_COMMANDS.map((cmd, i) => (
                    <button
                      key={i}
                      onClick={() => setAiCommand(cmd)}
                      style={{
                        background: aiCommand === cmd ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)',
                        border: aiCommand === cmd ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                        color: aiCommand === cmd ? '#c4b5fd' : 'var(--text-muted)',
                        padding: '5px 10px',
                        borderRadius: '999px',
                        fontSize: '0.76rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        transition: 'all 0.15s'
                      }}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Command Input */}
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>คำสั่งแบบกำหนดเอง:</div>
                <textarea
                  rows={3}
                  value={aiCommand}
                  onChange={e => setAiCommand(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiCommand(); } }}
                  placeholder="เช่น: ทำให้หน้าดูเล็กลง 20% เพิ่มความสว่างและลดสีแดง..."
                  style={{ width: '100%', fontSize: '0.88rem', resize: 'none' }}
                />
                <button
                  onClick={handleAiCommand}
                  disabled={isProcessingAi || !aiCommand.trim()}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: !aiCommand.trim() || isProcessingAi ? 0.5 : 1 }}
                >
                  <Sparkles size={16} />
                  <span>{isProcessingAi ? 'AI กำลังประมวลผล...' : 'สั่ง AI ปรับแต่งรูป'}</span>
                </button>
              </div>

              {/* AI Response Message */}
              {aiMessage && (
                <div style={{
                  background: aiMessage.startsWith('✅') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${aiMessage.startsWith('✅') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '0.85rem',
                  color: aiMessage.startsWith('✅') ? '#34d399' : '#f87171',
                  lineHeight: '1.5'
                }}>
                  {aiMessage}
                </div>
              )}

              {/* Current Filter Values Summary */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '12px'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  ค่าปรับแต่งปัจจุบัน:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                  {Object.entries(filters).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>{k}</span>
                      <span style={{ color: v !== 0 && v !== 100 ? '#818cf8' : 'var(--text-subtle)', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-subtle)' }}>faceScale</span>
                    <span style={{ color: faceScale !== 1 ? '#ec4899' : 'var(--text-subtle)', fontWeight: 600 }}>{faceScale.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
