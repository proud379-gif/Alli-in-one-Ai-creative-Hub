import React, { useState } from 'react';
import { SLIDE_TEMPLATES } from '../../mock/aiData';
import { Presentation, Sparkles, Wand2, Plus, Play, Download, Layout, Grid, BarChart3, Clock, ChevronLeft, ChevronRight, X, Edit3 } from 'lucide-react';

export default function SlideStudio() {
  const [deck, setDeck] = useState(SLIDE_TEMPLATES[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [themeStyle, setThemeStyle] = useState('dark-cyber');

  const themes = [
    { id: 'dark-cyber', name: 'Dark Cyber Glass', bg: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)', text: '#fff', accent: '#6366f1' },
    { id: 'minimal-luxury', name: 'Minimal Luxury', bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', text: '#f8fafc', accent: '#06b6d4' },
    { id: 'neon-violet', name: 'Neon Violet', bg: 'linear-gradient(135deg, #2e1065 0%, #090d16 100%)', text: '#fff', accent: '#ec4899' }
  ];

  const handleGenerateDeck = () => {
    if (!topicInput.trim() || isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      setDeck({
        id: 'deck-' + Date.now(),
        topic: topicInput,
        theme: 'Dark Cyber Glass',
        slides: [
          {
            id: 1,
            title: `🚀 ${topicInput}`,
            subtitle: 'AI Automated Presentation Deck 2026',
            layout: 'hero',
            content: `สไลด์นำเสนอฉบับสมบูรณ์สำหรับ "${topicInput}" ถูกออกแบบโครงสร้างโดย AI NovaEngine เพื่อการสื่อสารอย่างมีประสิทธิภาพสูงสุด`,
            metrics: [
              { label: 'Target Growth', value: '300%' },
              { label: 'Completion Rate', value: '100%' },
              { label: 'AI Score', value: '99/100' }
            ]
          },
          {
            id: 2,
            title: '💡 Key Strategic Objectives',
            subtitle: 'กลยุทธ์สำคัญ 4 ประการ',
            layout: 'grid',
            features: [
              { icon: 'Sparkles', title: '1. AI Automation', desc: 'ลดเวลาการทำงานด้วยระบบอัตโนมัติ' },
              { icon: 'Layout', title: '2. Dynamic Design', desc: 'ดีไซน์ล้ำสมัยสไตล์ Cyberpunk' },
              { icon: 'BarChart3', title: '3. Data Precision', desc: 'วิเคราะห์และแสดงผลข้อมูลอย่างแม่นยำ' },
              { icon: 'Presentation', title: '4. High Impact', desc: 'สร้างความประทับใจให้ผู้ฟังทันที' }
            ]
          },
          {
            id: 3,
            title: '📈 Performance & Statistics',
            subtitle: 'ผลลัพธ์และความสำเร็จ',
            layout: 'stats',
            stats: [
              { title: 'ผู้เข้าชมทั้งหมด', value: '1,500,000+', desc: 'ยอดการเข้าถึงผ่านช่องทางดิจิทัล' },
              { title: 'เวลาที่ประหยัดได้', value: '120 ชม./เดือน', desc: 'ต่อทีมพัฒนาและสร้างสรรค์' }
            ]
          }
        ]
      });
      setActiveSlideIndex(0);
      setIsGenerating(false);
    }, 1400);
  };

  const activeSlide = deck.slides[activeSlideIndex] || deck.slides[0];
  const currentTheme = themes.find(t => t.id === themeStyle) || themes[0];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', gap: '20px', overflowY: 'auto' }}>
      {/* Header Info Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Presentation size={24} color="#8b5cf6" />
            AllInStudio Slide Deck Designer (ทำสไลด์ให้ AI ออกแบบ)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            กรอกหัวข้อหรือเนื้อหา AI จะวิเคราะห์ วางโครงร่าง และจัดหน้าสไลด์ Presentation ตึงๆ ให้อัตโนมัติ
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setIsFullscreen(true)}
            className="btn-primary"
            style={{ padding: '8px 18px' }}
          >
            <Play size={16} />
            <span>พรีเซนต์เต็มจอ</span>
          </button>

          <button className="btn-secondary" style={{ padding: '8px 16px' }}>
            <Download size={16} />
            <span>ส่งออก PDF/PowerPoint</span>
          </button>
        </div>
      </div>

      {/* AI Wizard Prompt Bar */}
      <div className="glass-panel" style={{ padding: '18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="ป้อนหัวข้อสไลด์ที่คุณต้องการสร้าง... (เช่น 'แผนการตลาดเปิดตัวผลิตภัณฑ์ AI ปี 2026')"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <button
          onClick={handleGenerateDeck}
          disabled={isGenerating || !topicInput.trim()}
          className="btn-cyan"
          style={{ padding: '12px 24px' }}
        >
          <Wand2 size={18} />
          <span>{isGenerating ? 'AI กำลังออกแบบสไลด์...' : 'AI สร้างสไลด์'}</span>
        </button>
      </div>

      {/* Main Workspace: Slide Navigation + Live Viewer Canvas */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '20px' }}>
        {/* Left: Slide Deck Thumbnail List */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>สไลด์ทั้งหมด ({deck.slides.length})</span>
            <button style={{ background: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer' }}>
              <Plus size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '420px' }}>
            {deck.slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setActiveSlideIndex(idx)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: activeSlideIndex === idx ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                  border: activeSlideIndex === idx ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ color: 'var(--text-subtle)', width: '18px' }}>#{idx + 1}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{s.title}</span>
              </div>
            ))}
          </div>

          {/* Theme Selector */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '6px' }}>
              🎨 เปลี่ยนธีมสไลด์:
            </label>
            <select
              value={themeStyle}
              onChange={(e) => setThemeStyle(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              {themes.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Live Interactive Slide Viewport */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main Slide Canvas */}
          <div style={{
            width: '100%',
            height: '420px',
            borderRadius: '20px',
            background: currentTheme.bg,
            color: currentTheme.text,
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Slide Header */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: currentTheme.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                {activeSlide.subtitle}
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: currentTheme.text }}>
                {activeSlide.title}
              </h1>
            </div>

            {/* Slide Layout Content Render */}
            <div style={{ flex: 1, margin: '20px 0', display: 'flex', alignItems: 'center' }}>
              {activeSlide.layout === 'hero' && (
                <div>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.7', opacity: 0.9, maxWidth: '90%' }}>
                    {activeSlide.content}
                  </p>
                  {activeSlide.metrics && (
                    <div style={{ display: 'flex', gap: '30px', marginTop: '24px' }}>
                      {activeSlide.metrics.map((m, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: currentTheme.accent }}>{m.value}</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSlide.layout === 'grid' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                  {activeSlide.features?.map((f, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.06)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', color: currentTheme.accent }}>{f.title}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeSlide.layout === 'stats' && (
                <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
                  {activeSlide.stats?.map((st, i) => (
                    <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: currentTheme.accent }}>{st.value}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, margin: '6px 0 2px 0' }}>{st.title}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{st.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeSlide.layout === 'timeline' && (
                <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                  {activeSlide.steps?.map((step, i) => (
                    <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span className="badge-neon" style={{ marginBottom: '8px', display: 'inline-block' }}>{step.q}</span>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{step.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', opacity: 0.6, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <span>NovaAI Studio Presentation Deck</span>
              <span>Slide {activeSlideIndex + 1} / {deck.slides.length}</span>
            </div>
          </div>

          {/* Slide Switcher Footer Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={activeSlideIndex === 0}
              className="btn-secondary"
            >
              <ChevronLeft size={16} /> สไลด์ก่อนหน้า
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              หน้า {activeSlideIndex + 1} จาก {deck.slides.length}
            </span>

            <button
              onClick={() => setActiveSlideIndex(prev => Math.min(deck.slides.length - 1, prev + 1))}
              disabled={activeSlideIndex === deck.slides.length - 1}
              className="btn-secondary"
            >
              สไลด์ถัดไป <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Presentation Modal Overlay */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: currentTheme.bg,
          color: currentTheme.text,
          zIndex: 100,
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Close Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: currentTheme.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              {activeSlide.subtitle}
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0 }}>
              {activeSlide.title}
            </h1>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', margin: '40px 0' }}>
            <p style={{ fontSize: '1.6rem', lineHeight: '1.8', maxWidth: '80%' }}>
              {activeSlide.content || activeSlide.subtitle}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={activeSlideIndex === 0}
              className="btn-secondary"
              style={{ fontSize: '1.1rem', padding: '12px 24px' }}
            >
              <ChevronLeft size={20} /> ก่อนหน้า
            </button>

            <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>
              {activeSlideIndex + 1} / {deck.slides.length}
            </span>

            <button
              onClick={() => setActiveSlideIndex(prev => Math.min(deck.slides.length - 1, prev + 1))}
              disabled={activeSlideIndex === deck.slides.length - 1}
              className="btn-secondary"
              style={{ fontSize: '1.1rem', padding: '12px 24px' }}
            >
              ถัดไป <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
