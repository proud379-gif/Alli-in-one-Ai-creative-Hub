import React, { useState, useRef } from 'react';
import { VIDEO_PRESETS } from '../../mock/aiData';
import {
  Play, Pause, Scissors, Sparkles, Wand2, Volume2, Film, Layers, Download, Check,
  RefreshCw, Type, Eye, Globe, Clock, Infinity as InfinityIcon, EyeOff, Upload, Trash2, Video as VideoIcon,
  RotateCw, Gauge, Sliders, Zap
} from 'lucide-react';

export default function VideoEditor() {
  const [selectedPreset, setSelectedPreset] = useState(VIDEO_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState('normal');
  const [subtitleStyle, setSubtitleStyle] = useState('neon');
  const [targetLanguage, setTargetLanguage] = useState('th');
  const [durationOption, setDurationOption] = useState('unlimited');
  const [voiceGender, setVoiceGender] = useState('th-male');
  const [scriptInput, setScriptInput] = useState('');
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [uploadedVideo, setUploadedVideo] = useState(null); // { url, name, size, type }
  const [isDragging, setIsDragging] = useState(false);

  // Video manipulation states
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(60);
  const [videoSpeed, setVideoSpeed] = useState(1.0);
  const [videoRotate, setVideoRotate] = useState(0);
  const [trimNotice, setTrimNotice] = useState('');

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedVideo({ url, name: file.name, size: (file.size / 1024 / 1024).toFixed(1), type: file.type });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('video/')) return;
    const url = URL.createObjectURL(file);
    setUploadedVideo({ url, name: file.name, size: (file.size / 1024 / 1024).toFixed(1), type: file.type });
  };

  const handleRemoveVideo = () => {
    if (uploadedVideo?.url) URL.revokeObjectURL(uploadedVideo.url);
    setUploadedVideo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Video Trimming & Speed controls
  const handleApplyTrim = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = trimStart;
      videoRef.current.play();
      setIsPlaying(true);
    }
    setTrimNotice(`✂️ ตัดคลิปช่วง ${trimStart}s - ${trimEnd}s แล้ว!`);
    setTimeout(() => setTrimNotice(''), 3000);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && trimEnd > 0) {
      if (videoRef.current.currentTime >= trimEnd) {
        videoRef.current.currentTime = trimStart;
      }
    }
  };

  const handleSpeedChange = (spd) => {
    setVideoSpeed(spd);
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
  };

  const handleRotate = () => {
    setVideoRotate(r => (r + 90) % 360);
  };

  const LANGUAGES = [
    { code: 'th', name: '🇹🇭 ภาษาไทย (Thai)', defaultSub: 'สวัสดีครับ ยินดีต้อนรับสู่ระบบตัดต่อวิดีโอไม่จำกัดความยาว' },
    { code: 'en', name: '🇺🇸 English (US)', defaultSub: 'Hello everyone! Welcome to Unlimited Duration Video Studio' },
    { code: 'ja', name: '🇯🇵 日本語 (Japanese)', defaultSub: 'みなさんこんにちは！無制限動画編集へようこそ' },
    { code: 'zh', name: '🇨🇳 中文 (Chinese)', defaultSub: '大家好！欢迎使用无限制时长视频剪辑系统' },
    { code: 'ko', name: '🇰🇷 한국어 (Korean)', defaultSub: '안녕하세요! 무제한 비디오 스튜디오에 오신 것을 환영합니다' },
    { code: 'es', name: '🇪🇸 Español (Spanish)', defaultSub: '¡Hola a todos! Bienvenidos al editor de video sin límite' },
    { code: 'fr', name: '🇫🇷 Français (French)', defaultSub: 'Bonjour à tous! Bienvenue dans le studio vidéo illimité' },
    { code: 'de', name: '🇩🇪 Deutsch (German)', defaultSub: 'Hallo zusammen! Willkommen im unbegrenzten Videostudio' }
  ];

  const DURATIONS = [
    { id: 'unlimited', label: '♾️ ไม่จำกัดความยาว (Unlimited)', display: 'Unlimited ∞' },
    { id: '15s', label: '⚡ 15 วินาที (Shorts / Reels)', display: '00:15' },
    { id: '60s', label: '📱 1 นาที (Short Video)', display: '01:00' },
    { id: '5m', label: '🎥 5 นาที (Medium Video)', display: '05:00' },
    { id: '30m', label: '🎬 30 นาที (Long Content)', display: '30:00' },
    { id: '2h', label: '📽️ 2 ชั่วโมง (Full Movie)', display: '02:00:00' }
  ];

  const VOICEOVERS = {
    th: [
      { id: 'th-male', label: '🇹🇭 เสียงพากย์ ชายไทย (Smart Executive)' },
      { id: 'th-female', label: '🇹🇭 เสียงพากย์ หญิงไทย (Smooth Professional)' }
    ],
    en: [
      { id: 'en-male', label: '🇺🇸 English Male (Cyberpunk Narrative)' },
      { id: 'en-female', label: '🇺🇸 English Female (Tech Reviewer)' }
    ],
    ja: [
      { id: 'ja-female', label: '🇯🇵 Japanese Female (Anime Voice Actor)' },
      { id: 'ja-male', label: '🇯🇵 Japanese Male (Anime Protagonist)' }
    ],
    zh: [
      { id: 'zh-female', label: '🇨🇳 Chinese Female (Mandarin News)' },
      { id: 'zh-male', label: '🇨🇳 Chinese Male (Documentary)' }
    ],
    ko: [
      { id: 'ko-female', label: '🇰🇷 Korean Female (K-Drama Soft)' },
      { id: 'ko-male', label: '🇰🇷 Korean Male (K-Drama Host)' }
    ],
    es: [{ id: 'es-voice', label: '🇪🇸 Español Voice (Natural Speaker)' }],
    fr: [{ id: 'fr-voice', label: '🇫🇷 Français Voice (Parisian Accent)' }],
    de: [{ id: 'de-voice', label: '🇩🇪 Deutsch Voice (Berlin Clear)' }]
  };

  const FILTERS = [
    { id: 'normal', name: 'Original (ปกติ)', filterStyle: 'none', glow: '0 0 15px rgba(0,0,0,0.4)' },
    { id: 'cyberpunk', name: 'Cyberpunk Glow ⚡', filterStyle: 'contrast(130%) saturate(180%) hue-rotate(190deg)', glow: '0 0 30px rgba(6, 182, 212, 0.6)' },
    { id: 'anime', name: 'Anime 4K 🎨', filterStyle: 'saturate(200%) contrast(115%) brightness(105%)', glow: '0 0 30px rgba(236, 72, 153, 0.6)' },
    { id: 'cinematic', name: 'Cinematic 8K 🎬', filterStyle: 'contrast(135%) sepia(25%) saturate(125%)', glow: '0 0 30px rgba(99, 102, 241, 0.6)' },
    { id: 'retro', name: 'Synthwave 🌆', filterStyle: 'hue-rotate(290deg) saturate(220%) contrast(125%)', glow: '0 0 30px rgba(245, 158, 11, 0.6)' },
    { id: 'noir', name: 'B&W Noir 🏴', filterStyle: 'grayscale(100%) contrast(150%)', glow: '0 0 30px rgba(255, 255, 255, 0.3)' },
    { id: 'vintage', name: 'Vintage Warm 🎞️', filterStyle: 'sepia(55%) contrast(110%) brightness(105%)', glow: '0 0 30px rgba(217, 119, 6, 0.5)' }
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === targetLanguage) || LANGUAGES[0];
  const currentDurationObj = DURATIONS.find(d => d.id === durationOption) || DURATIONS[0];
  const availableVoiceovers = VOICEOVERS[targetLanguage] || VOICEOVERS['en'];
  const currentFilterObj = FILTERS.find(f => f.id === activeFilter) || FILTERS[0];

  const handleGenerateScriptVideo = () => {
    if (!scriptInput.trim()) return;
    setIsProcessingAi(true);
    setTimeout(() => {
      setSelectedPreset({
        id: 'custom-' + Date.now(),
        title: 'AI Script (' + currentLangObj.name.split(' ')[0] + '): ' + scriptInput.slice(0, 20) + '...',
        duration: currentDurationObj.display,
        category: 'AI Generated',
        previewColor: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
        subtitles: [
          { time: '00:01 - 00:05', text: scriptInput },
          { time: '00:05 - ∞', text: `[${currentLangObj.name.split(' ')[0]}] AI ถอดซับไตเติ้ลภาษาและปรับความยาวเรียบร้อยแล้ว` }
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
      {/* Header Info Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={24} color="#06b6d4" />
            AllInStudio Video Studio
            <span className="badge-pink" style={{ fontSize: '0.75rem' }}>♾️ ไม่จำกัดความยาว</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            อัปโหลดคลิปจริง · ตัดต่อปรับความยาว · ใส่ฟิลเตอร์ FX · ซับไทยถอดอัตโนมัติ 8+ ภาษา
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => fileInputRef.current?.click()} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Upload size={16} /> อัปโหลดคลิปวิดีโอ
          </button>
          <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} style={{ display: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Globe size={16} color="#06b6d4" />
            <select
              value={targetLanguage}
              onChange={(e) => {
                setTargetLanguage(e.target.value);
                const firstVoice = (VOICEOVERS[e.target.value] || [])[0];
                if (firstVoice) setVoiceGender(firstVoice.id);
              }}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code} style={{ background: '#0f172a', color: '#fff' }}>{l.name}</option>
              ))}
            </select>
          </div>

          <button onClick={handleRender} className="btn-cyan" style={{ padding: '10px 20px' }}>
            {rendered ? <Check size={18} /> : <Download size={18} />}
            <span>{rendered ? 'เรนเดอร์สำเร็จ (4K Ready)' : 'ส่งออกวิดีโอ 4K'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Side: Video Preview Canvas + Editing Bar */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ===== UPLOAD ZONE OR REAL VIDEO PLAYER ===== */}
          {!uploadedVideo ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%', height: '280px', borderRadius: '16px',
                border: `2px dashed ${isDragging ? '#06b6d4' : 'rgba(6,182,212,0.35)'}`,
                background: isDragging ? 'rgba(6,182,212,0.08)' : 'rgba(6,182,212,0.03)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '12px', cursor: 'pointer', transition: 'all 0.25s',
              }}
            >
              <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(6,182,212,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={34} color="#06b6d4" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>ลากคลิปมาวาง หรือคลิกเพื่ออัปโหลดวิดีโอ</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>รองรับ MP4, MOV, AVI, WEBM · ทุกความยาว ไม่จำกัด</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="badge-cyan">4K / HDR</span>
                <span className="badge-pink">♾️ ไม่จำกัดความยาว</span>
                <span className="badge-neon">ซับ {currentLangObj.name.split(' ')[0]}</span>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', background: '#000', boxShadow: currentFilterObj.glow }}>
              <video
                ref={videoRef}
                src={uploadedVideo.url}
                controls
                onTimeUpdate={handleTimeUpdate}
                style={{
                  width: '100%', maxHeight: '340px', display: 'block', borderRadius: '16px',
                  filter: currentFilterObj.filterStyle,
                  transform: `rotate(${videoRotate}deg)`,
                  transition: 'all 0.3s ease'
                }}
              />
              {showSubtitle && (
                <div style={{
                  position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)',
                  background: subtitleStyle === 'neon' ? 'rgba(6,182,212,0.88)' : subtitleStyle === 'anime' ? 'rgba(236,72,153,0.88)' : 'rgba(15,23,42,0.92)',
                  color: '#fff', padding: '8px 18px', borderRadius: '10px',
                  fontSize: '0.9rem', fontWeight: 700, maxWidth: '90%', textAlign: 'center',
                  backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  whiteSpace: 'pre-wrap', pointerEvents: 'none'
                }}>
                  🗣️ [{currentLangObj.name.split(' ')[0]}] {currentLangObj.defaultSub}
                </div>
              )}
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(6px)' }}>
                  {uploadedVideo.name} ({uploadedVideo.size} MB)
                </span>
                <button onClick={handleRemoveVideo} style={{ background: 'rgba(239,68,68,0.85)', border: 'none', color: '#fff', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                  <Trash2 size={13} /> ลบ
                </button>
              </div>
            </div>
          )}

          {/* ===== MANUAL TRIM & CUTTING CONTROLS ===== */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '14px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scissors size={16} color="#ec4899" />
                ตัดต่อคลิปด้วยตัวเอง (Manual Video Trimming)
              </div>
              {trimNotice && <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>{trimNotice}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto', gap: '10px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>⏱️ วินาทีเริ่มต้น (Start Sec):</label>
                <input
                  type="number"
                  min="0"
                  value={trimStart}
                  onChange={(e) => setTrimStart(Math.max(0, Number(e.target.value)))}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '4px' }}>⏱️ วินาทีสิ้นสุด (End Sec):</label>
                <input
                  type="number"
                  min="1"
                  value={trimEnd}
                  onChange={(e) => setTrimEnd(Math.max(1, Number(e.target.value)))}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ paddingTop: '18px' }}>
                <button onClick={handleApplyTrim} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                  <Scissors size={14} /> ตัดช่วงคลิป
                </button>
              </div>

              <div style={{ paddingTop: '18px' }}>
                <button onClick={handleRotate} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.82rem' }} title="หมุนคลิป">
                  <RotateCw size={14} /> {videoRotate}°
                </button>
              </div>
            </div>

            {/* Video Speed Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Gauge size={14} color="#06b6d4" /> ความเร็วคลิป:
              </span>
              {[0.5, 1.0, 1.25, 1.5, 2.0].map(spd => (
                <button
                  key={spd}
                  onClick={() => handleSpeedChange(spd)}
                  style={{
                    padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                    border: videoSpeed === spd ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                    background: videoSpeed === spd ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.03)',
                    color: videoSpeed === spd ? '#22d3ee' : 'var(--text-muted)'
                  }}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Subtitle Toggle Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 16px', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              ภาษาปัจจุบัน: {currentLangObj.name}
            </span>
            <button
              onClick={() => setShowSubtitle(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px',
                borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', border: '1px solid',
                background: showSubtitle ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)',
                borderColor: showSubtitle ? '#10b981' : '#ef4444',
                color: showSubtitle ? '#34d399' : '#f87171'
              }}
            >
              {showSubtitle ? <><Eye size={13} /> ซับ {currentLangObj.name.split(' ')[0]} ON</> : <><EyeOff size={13} /> ซับ OFF</>}
            </button>
          </div>

          {/* Track Visualizer */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              <span><Layers size={14} inline /> Track Visualizer</span>
              <span>ตัดช่วง: {trimStart}s - {trimEnd}s ({currentDurationObj.display})</span>
            </div>
            <div style={{ height: '24px', background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)', borderRadius: '6px', marginBottom: '6px', opacity: 0.85, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
              📹 Video Track ({uploadedVideo ? uploadedVideo.name : 'AI Preset Video'}) [{videoSpeed}x]
            </div>
            <div style={{ height: '20px', background: 'rgba(236, 72, 153, 0.4)', borderRadius: '6px', marginBottom: '6px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              💬 AI Subtitles ({currentLangObj.name.split(' ')[0]} - Auto Aligned)
            </div>
            <div style={{ height: '20px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '6px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              🔊 Voiceover ({availableVoiceovers.find(v => v.id === voiceGender)?.label || voiceGender})
            </div>
          </div>
        </div>

        {/* Right Side: AI Tools & Visual FX Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* AI Visual Filters Selection */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#06b6d4" />
              AI Visual Effects & Filters
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    padding: '9px 8px', borderRadius: '10px',
                    border: activeFilter === filter.id ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                    background: activeFilter === filter.id ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: activeFilter === filter.id ? '#22d3ee' : 'var(--text-muted)',
                    fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#ec4899" />
              กำหนดความยาวคลิป (Duration)
            </h3>
            <select
              value={durationOption}
              onChange={(e) => setDurationOption(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem', marginBottom: '6px' }}
            >
              {DURATIONS.map(d => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
            <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <InfinityIcon size={12} /> รองรับทุกความยาว ไม่จำกัด
            </div>
          </div>

          {/* Language Switcher Section */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} color="#06b6d4" />
              เปลี่ยนภาษาถอดซับ & พากย์เสียง
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    setTargetLanguage(l.code);
                    const firstVoice = (VOICEOVERS[l.code] || [])[0];
                    if (firstVoice) setVoiceGender(firstVoice.id);
                  }}
                  style={{
                    padding: '8px', borderRadius: '10px',
                    border: targetLanguage === l.code ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                    background: targetLanguage === l.code ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: targetLanguage === l.code ? '#22d3ee' : 'var(--text-muted)',
                    fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}
                >
                  {l.name.split(' ')[0]} {l.name.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* AI Script-to-Video Generator */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
              <Wand2 size={16} color="#8b5cf6" />
              AI Script-to-Video ({currentLangObj.name.split(' ')[0]})
            </h3>
            <textarea
              rows={3}
              placeholder={`กรอกบทพูด/สคริปต์คลิปของคุณในภาษา ${currentLangObj.name}... AI จะสร้างคลิปพร้อมถอดซับให้อัตโนมัติ`}
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
              <span>{isProcessingAi ? 'AI กำลังเจนคลิป...' : `เจนคลิปภาษา ${currentLangObj.name.split(' ')[0]}`}</span>
            </button>
          </div>

          {/* AI Voiceover Selector */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Volume2 size={16} color="#10b981" />
              เสียงพากย์ AI ({currentLangObj.name.split(' ')[0]})
            </h3>
            <select
              value={voiceGender}
              onChange={(e) => setVoiceGender(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem' }}
            >
              {availableVoiceovers.map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
