import React, { useState } from 'react';
import { VIDEO_PRESETS } from '../../mock/aiData';
import {
  Play, Pause, Scissors, Sparkles, Wand2, Volume2, Film, Layers, Download, Check,
  RefreshCw, Type, Eye, Globe, Clock, Infinity as InfinityIcon
} from 'lucide-react';

export default function VideoEditor() {
  const [selectedPreset, setSelectedPreset] = useState(VIDEO_PRESETS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState('cyberpunk');
  const [subtitleStyle, setSubtitleStyle] = useState('neon');
  const [targetLanguage, setTargetLanguage] = useState('th');
  const [durationOption, setDurationOption] = useState('unlimited');
  const [customMinutes, setCustomMinutes] = useState('10');
  const [voiceGender, setVoiceGender] = useState('th-male');
  const [scriptInput, setScriptInput] = useState('');
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [rendered, setRendered] = useState(false);

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
    es: [
      { id: 'es-voice', label: '🇪🇸 Español Voice (Natural Speaker)' }
    ],
    fr: [
      { id: 'fr-voice', label: '🇫🇷 Français Voice (Parisian Accent)' }
    ],
    de: [
      { id: 'de-voice', label: '🇩🇪 Deutsch Voice (Berlin Clear)' }
    ]
  };

  const filters = [
    { id: 'cyberpunk', name: 'Cyberpunk Glow', glow: '0 0 30px rgba(6, 182, 212, 0.4)' },
    { id: 'anime', name: 'Anime 4K Style', glow: '0 0 30px rgba(236, 72, 153, 0.4)' },
    { id: 'cinematic', name: 'Cinematic 8K', glow: '0 0 30px rgba(99, 102, 241, 0.4)' },
    { id: 'retro', name: 'Retro Synthwave', glow: '0 0 30px rgba(245, 158, 11, 0.4)' }
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === targetLanguage) || LANGUAGES[0];
  const currentDurationObj = DURATIONS.find(d => d.id === durationOption) || DURATIONS[0];
  const availableVoiceovers = VOICEOVERS[targetLanguage] || VOICEOVERS['en'];

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
          { time: '00:05 - ∞', text: `[${currentLangObj.name.split(' ')[0]}] AI ถอดซับไตเติ้ลภาษาและปรับความยาว ${currentDurationObj.display} เรียบร้อยแล้ว` }
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
            <span className="badge-pink" style={{ fontSize: '0.75rem' }}>♾️ ไม่จำกัดความยาว (Unlimited Duration)</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            ตัดต่อคลิปสั้น วิดีโอยาว และภาพยนตร์ได้แบบไม่จำกัดความยาว พร้อมระบบสลับภาษา & ถอดซับอัตโนมัติ 8+ ภาษา
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Selector Dropdown */}
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
                <option key={l.code} value={l.code} style={{ background: '#0f172a', color: '#fff' }}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleRender}
            className="btn-cyan"
            style={{ padding: '10px 20px' }}
          >
            {rendered ? <Check size={18} /> : <Download size={18} />}
            <span>{rendered ? 'เรนเดอร์สำเร็จ (4K Ready)' : 'ส่งออกวิดีโอ 4K'}</span>
          </button>
        </div>
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
              <div style={{ display: 'flex', gap: '6px' }}>
                <span className="badge-neon" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                  🌐 {currentLangObj.name.split(' ')[0]}
                </span>
                <span className="badge-pink" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                  ⏱️ {currentDurationObj.display}
                </span>
              </div>
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
              🗣️ [{currentLangObj.name.split(' ')[0]}] {currentLangObj.defaultSub}
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
                {isPlaying ? '00:12' : '00:00'} / {currentDurationObj.display}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-neon">Auto Subtitle ({currentLangObj.name.split(' ')[0]})</span>
              <span className="badge-pink">Duration: Unlimited ∞</span>
            </div>
          </div>

          {/* Video Timeline Track Visualizer */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              <span><Layers size={14} inline /> Track Visualizer (ไม่จำกัดความยาว)</span>
              <span>Timeline Length: 00:00 - {currentDurationObj.display}</span>
            </div>

            {/* Video Track Line */}
            <div style={{ height: '24px', background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)', borderRadius: '6px', marginBottom: '6px', opacity: 0.8, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
              📹 Video Track: {selectedPreset.title} [{currentDurationObj.display}]
            </div>
            {/* Subtitle Track Line */}
            <div style={{ height: '20px', background: 'rgba(236, 72, 153, 0.4)', borderRadius: '6px', marginBottom: '6px', border: '1px border rgba(236, 72, 153, 0.6)', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              💬 AI Subtitles ({currentLangObj.name.split(' ')[0]} - Auto Aligned)
            </div>
            {/* Audio Track Line */}
            <div style={{ height: '20px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '6px', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: '0.7rem', color: '#fff' }}>
              🔊 Voiceover ({availableVoiceovers.find(v => v.id === voiceGender)?.label || voiceGender})
            </div>
          </div>
        </div>

        {/* Right Side: AI Tools & Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Duration Selector */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#ec4899" />
              กำหนดความยาวคลิป (Video Duration)
            </h3>
            <select
              value={durationOption}
              onChange={(e) => setDurationOption(e.target.value)}
              style={{ width: '100%', fontSize: '0.85rem', marginBottom: '6px' }}
            >
              {DURATIONS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
            <div style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <InfinityIcon size={12} /> สามารถนำคลิปความยาวเท่าใดก็ได้มาเรนเดอร์ ไม่จำกัดความยาว
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
                    padding: '8px',
                    borderRadius: '10px',
                    border: targetLanguage === l.code ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.08)',
                    background: targetLanguage === l.code ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: targetLanguage === l.code ? '#22d3ee' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
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
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
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
        </div>
      </div>
    </div>
  );
}
