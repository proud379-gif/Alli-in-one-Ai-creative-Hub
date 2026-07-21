import React, { useState } from 'react';
import { VIDEO_PRESETS } from '../../mock/aiData';
import { Play, Pause, Scissors, Sparkles, Wand2, Volume2, Film, Layers, Download, Check, RefreshCw, Type, Eye } from 'lucide-react';

export default function VideoEditor() {
  const [selectedPreset, setSelectedPreset] = useState(VIDEO_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState('cyberpunk');
  const [subtitleStyle, setSubtitleStyle] = useState('neon');
  const [voiceGender, setVoiceGender] = useState('th-male');
  const [scriptInput, setScriptInput] = useState('');
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [rendered, setRendered] = useState(false);

  const filters = [
    { id: 'cyberpunk', name: 'Cyberpunk Glow', glow: '0 0 30px rgba(6, 182, 212, 0.4)' },
    { id: 'anime', name: 'Anime 4K Style', glow: '0 0 30px rgba(236, 72, 153, 0.4)' },
    { id: 'cinematic', name: 'Cinematic 8K', glow: '0 0 30px rgba(99, 102, 241, 0.4)' },
    { id: 'retro', name: 'Retro Synthwave', glow: '0 0 30px rgba(245, 158, 11, 0.4)' }
  ];

  const handleGenerateScriptVideo = () => {
    if (!scriptInput.trim()) return;
    setIsProcessingAi(true);

    setTimeout(() => {
      setSelectedPreset({
        id: 'custom-' + Date.now(),
        title: 'AI Script: ' + scriptInput.slice(0, 20) + '...',
        duration: '00:40',
        category: 'AI Generated',
        previewColor: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
        subtitles: [
          { time: '00:01 - 00:05', text: scriptInput },
          { time: '00:05 - 00:15', text: 'AI สร้างเอฟเฟกต์ภาพและถอดซับไตเติ้ลจากข้อความของคุณอัตโนมัติ' },
          { time: '00:15 - 00:30', text: 'พร้อมส่งออกไฟล์ระดับ 4K HDR 60FPS ตึงๆ ในคลิกเดียว!' }
        ]
      });
      setIsProcessingAi(false);
    }, 1200);
  };

  const handleRender = () => {
    setRendered(true);
    setTimeout(() => setRendered(false), 3500);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', gap: '20px', overflowY: 'auto' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={24} color="#06b6d4" />
            AllInStudio Video Studio (ตัดต่อคลิปด้วย AI)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            แปลงสคริปต์/คลิปวิดีโอเป็นผลงานระดับมืออาชีพด้วย AI ถอดซับ ออโต้คัต และปรับเอฟเฟกต์ตึงๆ
          </p>
        </div>

        <button
          onClick={handleRender}
          className="btn-cyan"
          style={{ padding: '10px 20px' }}
        >
          {rendered ? <Check size={18} /> : <Download size={18} />}
          <span>{rendered ? 'เรนเดอร์สำเร็จ (4K ready)' : 'ส่งออกวิดีโอ 4K'}</span>
        </button>
      </div>

      {/* Main Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Side: Video Preview Canvas */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Video Player Display Box */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '360px',
            borderRadius: '16px',
            background: selectedPreset.previewColor,
            boxShadow: filters.find(f => f.id === activeFilter)?.glow || '0 0 25px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
            overflow: 'hidden',
            transition: 'all 0.4s'
          }}>
            {/* Top Overlay Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <span className="badge-cyan" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                4K HDR • 60FPS
              </span>
              <span className="badge-pink" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                Filter: {filters.find(f => f.id === activeFilter)?.name}
              </span>
            </div>

            {/* Simulated Animated Video Content Graphic */}
            <div style={{ textAlign: 'center', zIndex: 5, padding: '20px 0' }}>
              <div className={isPlaying ? "animate-spin-slow" : ""} style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 14px auto',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Sparkles size={40} color="#fff" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {selectedPreset.title}
              </h3>
            </div>

            {/* Live Subtitle Overlay Ticker */}
            <div style={{
              background: subtitleStyle === 'neon' 
                ? 'rgba(6, 182, 212, 0.85)' 
                : subtitleStyle === 'anime'
                ? 'rgba(236, 72, 153, 0.85)'
                : 'rgba(15, 23, 42, 0.9)',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '12px',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              zIndex: 10,
              backdropFilter: 'blur(8px)'
            }}>
              🗣️ {selectedPreset.subtitles[0]?.text || 'AI Subtitle Ready'}
            </div>
          </div>

          {/* Player Controls Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn-primary"
                style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0, justifyContent: 'center' }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {isPlaying ? '00:12' : '00:00'} / {selectedPreset.duration}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-neon">Auto Subtitle ON</span>
              <span className="badge-cyan">AI Trim 95%</span>
            </div>
          </div>

          {/* Video Timeline Track Visualizer */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              <span><Layers size={14} inline /> Track Visualizer</span>
              <span>Timeline: 00:00 - {selectedPreset.duration}</span>
            </div>

            {/* Video Track Line */}
            <div style={{ height: '24px', background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)', borderRadius: '6px', marginBottom: '6px', opacity: 0.8, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
              📹 Video: {selectedPreset.title}
            </div>
            {/* Subtitle Track Line */}
            <div style={{ height: '20px', background: 'rgba(236, 72, 153, 0.4)', borderRadius: '6px', marginBottom: '6px', border: '1px border rgba(236, 72, 153, 0.6)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              💬 AI Subtitles (Auto-aligned)
            </div>
            {/* Audio Track Line */}
            <div style={{ height: '20px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '6px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              🔊 Voiceover ({voiceGender})
            </div>
          </div>
        </div>

        {/* Right Side: AI Tools & Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Script-to-Video Generator */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
              <Wand2 size={16} color="#8b5cf6" />
              AI Script-to-Video
            </h3>
            <textarea
              rows={3}
              placeholder="กรอกบทพูด/สคริปต์คลิปของคุณ... AI จะสร้างคลิปพร้อมถอดซับอัตโนมัติ"
              value={scriptInput}
              onChange={(e) => setScriptInput(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem', marginBottom: '10px', resize: 'none' }}
            />
            <button
              onClick={handleGenerateScriptVideo}
              disabled={isProcessingAi || !scriptInput.trim()}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} />
              <span>{isProcessingAi ? 'AI กำลังเจนคลิป...' : 'เจนคลิปจาก Script'}</span>
            </button>
          </div>

          {/* AI Visual Filters Selection */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff' }}>
              🪄 AI Visual Filters
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    border: activeFilter === filter.id ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                    background: activeFilter === filter.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: activeFilter === filter.id ? '#06b6d4' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* AI Voiceover Selector */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={16} color="#10b981" />
              เสียงพากย์ AI (Voiceover)
            </h3>
            <select
              value={voiceGender}
              onChange={(e) => setVoiceGender(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              <option value="th-male">🇹🇭 เสียงพากย์ ชายไทย (Smart Executive)</option>
              <option value="th-female">🇹🇭 เสียงพากย์ หญิงไทย (Smooth Professional)</option>
              <option value="en-male">🇺🇸 English Male (Cyberpunk Narrative)</option>
              <option value="en-female">🇺🇸 English Female (Tech Reviewer)</option>
            </select>
          </div>

          {/* Preset Videos */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff' }}>
              📽️ ตัวอย่าง Preset คลิป
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {VIDEO_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: selectedPreset.id === preset.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: selectedPreset.id === preset.id ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.06)',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{preset.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{preset.category} • {preset.duration}</div>
                  </div>
                  <Eye size={14} color="var(--text-muted)" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
