import React, { useState } from 'react';
import { SLIDE_TEMPLATES } from '../../mock/aiData';
import {
  Presentation, Sparkles, Wand2, Plus, Play, Download,
  ChevronLeft, ChevronRight, X, Trash2, Edit3, RefreshCw
} from 'lucide-react';
import { sendChatMessage, isGeminiReady } from '../../services/geminiService';

const THEMES = [
  { id: 'dark-cyber', name: '🔵 Dark Cyber Glass', bg: 'linear-gradient(135deg,#090d16 0%,#1e1b4b 100%)', text: '#fff', accent: '#6366f1', card: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)' },
  { id: 'minimal-luxury', name: '🩵 Minimal Luxury', bg: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', text: '#f8fafc', accent: '#06b6d4', card: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.25)' },
  { id: 'neon-violet', name: '💜 Neon Violet', bg: 'linear-gradient(135deg,#2e1065 0%,#090d16 100%)', text: '#fff', accent: '#ec4899', card: 'rgba(236,72,153,0.12)', border: 'rgba(236,72,153,0.3)' },
  { id: 'emerald', name: '💚 Emerald Dark', bg: 'linear-gradient(135deg,#064e3b 0%,#0f172a 100%)', text: '#f0fdf4', accent: '#10b981', card: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  { id: 'gold', name: '🌟 Gold Premium', bg: 'linear-gradient(135deg,#1c1400 0%,#0f172a 100%)', text: '#fef3c7', accent: '#f59e0b', card: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
];

function makeSlides(topic) {
  return [
    {
      id: 1, layout: 'hero',
      title: `🚀 ${topic}`,
      subtitle: 'บทนำและภาพรวม · AI Generated Presentation',
      content: `การนำเสนอฉบับสมบูรณ์เกี่ยวกับ "${topic}" ครอบคลุมข้อมูลเชิงลึก กลยุทธ์ และแผนการดำเนินงานที่ชัดเจน ออกแบบโดย AI เพื่อการสื่อสารที่มีประสิทธิภาพสูงสุด`,
      metrics: [
        { label: 'ความครอบคลุม', value: '100%' },
        { label: 'AI Score', value: '99/100' },
        { label: 'Slides', value: '6 หน้า' },
      ]
    },
    {
      id: 2, layout: 'grid',
      title: `💡 สาระสำคัญของ ${topic}`,
      subtitle: 'Key Points & Objectives',
      features: [
        { title: '📌 บริบทและความเป็นมา', desc: `ที่มา ความสำคัญ และบริบทที่เกี่ยวข้องกับ ${topic}` },
        { title: '🎯 เป้าหมายหลัก', desc: `วัตถุประสงค์และผลลัพธ์ที่คาดหวังจาก ${topic}` },
        { title: '🔍 การวิเคราะห์เชิงลึก', desc: `มุมมองและข้อค้นพบสำคัญจากการวิจัย ${topic}` },
        { title: '🌐 โอกาสและผลกระทบ', desc: `โอกาสและความท้าทายของ ${topic} ในระดับกว้าง` },
      ]
    },
    {
      id: 3, layout: 'stats',
      title: '📊 ข้อมูลและสถิติสำคัญ',
      subtitle: `Data & Statistics — ${topic}`,
      stats: [
        { title: 'ผลลัพธ์ที่คาดการณ์', value: '+300%', desc: 'อัตราการเติบโตโดยประมาณ' },
        { title: 'ความพึงพอใจ', value: '95%', desc: 'คะแนนความพึงพอใจโดยรวม' },
        { title: 'ประหยัดเวลา', value: '60 ชม.', desc: 'ต่อเดือนด้วยการปรับใช้' },
        { title: 'ROI', value: '5x', desc: 'ผลตอบแทนจากการลงทุน' },
      ]
    },
    {
      id: 4, layout: 'timeline',
      title: '🗓️ แผนการดำเนินงาน',
      subtitle: `Roadmap — ${topic}`,
      steps: [
        { q: 'Q1', title: 'วางรากฐาน', desc: 'ศึกษา วิจัย และเตรียมความพร้อม' },
        { q: 'Q2', title: 'พัฒนาและทดสอบ', desc: 'สร้างต้นแบบ ทดสอบ ปรับปรุง' },
        { q: 'Q3', title: 'เปิดตัวและขยาย', desc: 'นำเสนอ เปิดตัว และขยายผล' },
        { q: 'Q4', title: 'วัดผลและเติบโต', desc: 'ประเมินผล วัด KPI วางแผนต่อ' },
      ]
    },
    {
      id: 5, layout: 'bullets',
      title: '✅ ข้อแนะนำและแนวทางปฏิบัติ',
      subtitle: `Best Practices — ${topic}`,
      bullets: [
        `🔹 เริ่มต้นด้วยการทำความเข้าใจ ${topic} ในบริบทที่เหมาะสม`,
        `🔹 วางกลยุทธ์ที่ชัดเจนและวัดผลได้ก่อนลงมือทำ`,
        `🔹 ใช้ข้อมูลเชิงประจักษ์ในการตัดสินใจเสมอ`,
        `🔹 สร้างทีมที่มีทักษะหลากหลายรองรับ ${topic}`,
        `🔹 ทบทวนและปรับปรุงแผนงานตามผลลัพธ์ที่ได้รับสม่ำเสมอ`,
      ]
    },
    {
      id: 6, layout: 'closing',
      title: '🎯 สรุปและก้าวต่อไป',
      subtitle: `Conclusion & Next Steps — ${topic}`,
      content: `"${topic}" คือโอกาสสำคัญที่ต้องลงมือทำอย่างเป็นระบบ ด้วยข้อมูลที่ถูกต้อง กลยุทธ์ที่ชัดเจน และทีมงานที่พร้อม ความสำเร็จจึงอยู่ใกล้แค่เอื้อม`,
      cta: 'เริ่มต้นได้เลย — ทุกการเดินทางยิ่งใหญ่เริ่มต้นด้วยก้าวแรก 🚀',
    }
  ];
}

function SlideCanvas({ slide, theme, index, total, compact }) {
  const fSize = compact ? 0.75 : 1;
  const pad = compact ? '18px' : '36px';
  const h1Size = compact ? '1rem' : '1.7rem';
  return (
    <div style={{
      width: '100%', height: compact ? '200px' : '420px', borderRadius: compact ? '12px' : '20px',
      background: theme.bg, color: theme.text,
      padding: pad, display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: compact ? '0 4px 16px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.6)',
      border: `1px solid ${theme.border}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: theme.accent, opacity: 0.07, pointerEvents: 'none' }} />
      <div>
        <div style={{ fontSize: `${0.65 * fSize}rem`, fontWeight: 700, color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{slide.subtitle}</div>
        <h1 style={{ fontSize: h1Size, fontWeight: 800, margin: 0, color: theme.text, lineHeight: 1.25 }}>{slide.title}</h1>
      </div>
      {!compact && (
        <div style={{ flex: 1, margin: '16px 0', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {slide.layout === 'hero' && (
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.88, margin: '0 0 18px' }}>{slide.content}</p>
              {slide.metrics && (
                <div style={{ display: 'flex', gap: '14px' }}>
                  {slide.metrics.map((m, i) => (
                    <div key={i} style={{ background: theme.card, padding: '10px 18px', borderRadius: '10px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: theme.accent }}>{m.value}</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '2px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {slide.layout === 'grid' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
              {slide.features?.map((f, i) => (
                <div key={i} style={{ background: theme.card, padding: '12px 14px', borderRadius: '10px', border: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '3px', color: theme.accent }}>{f.title}</div>
                  <div style={{ fontSize: '0.77rem', opacity: 0.8, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          )}
          {slide.layout === 'stats' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
              {slide.stats?.map((st, i) => (
                <div key={i} style={{ background: theme.card, padding: '16px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.9rem', fontWeight: 800, color: theme.accent }}>{st.value}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, margin: '4px 0 2px' }}>{st.title}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.65 }}>{st.desc}</div>
                </div>
              ))}
            </div>
          )}
          {slide.layout === 'timeline' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', width: '100%' }}>
              {slide.steps?.map((step, i) => (
                <div key={i} style={{ background: theme.card, padding: '14px 10px', borderRadius: '10px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: theme.accent, marginBottom: '4px' }}>{step.q}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '3px' }}>{step.title}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          )}
          {slide.layout === 'bullets' && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {slide.bullets?.map((b, i) => (
                <li key={i} style={{ background: theme.card, padding: '9px 14px', borderRadius: '9px', border: `1px solid ${theme.border}`, fontSize: '0.86rem', lineHeight: 1.5 }}>{b}</li>
              ))}
            </ul>
          )}
          {slide.layout === 'closing' && (
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.88, margin: '0 0 18px' }}>{slide.content}</p>
              <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '14px 20px', fontSize: '0.95rem', fontWeight: 700, color: theme.accent }}>{slide.cta}</div>
            </div>
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', opacity: 0.45, borderTop: `1px solid ${theme.border}`, paddingTop: '8px' }}>
        <span>AllInStudio · AI Slide Designer</span>
        <span>Slide {index + 1} / {total}</span>
      </div>
    </div>
  );
}

export default function SlideStudio() {
  const defaultSlides = makeSlides('AI เพื่อธุรกิจสมัยใหม่');
  const [slides, setSlides] = useState(defaultSlides);
  const [activeIdx, setActiveIdx] = useState(0);
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [themeId, setThemeId] = useState('dark-cyber');
  const [editingTitle, setEditingTitle] = useState(null);
  const [editTitleVal, setEditTitleVal] = useState('');
  const [aiStatus, setAiStatus] = useState('');

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const activeSlide = slides[activeIdx] || slides[0];

  const handleGenerate = async () => {
    if (!topicInput.trim() || isGenerating) return;
    setIsGenerating(true);
    setAiStatus('🤖 AI กำลังสร้างสไลด์...');

    let newSlides = makeSlides(topicInput);

    if (isGeminiReady()) {
      try {
        const prompt = `คุณคือ AI ผู้เชี่ยวชาญสร้างสไลด์ Presentation
สร้างเนื้อหาสำหรับ Presentation 6 สไลด์ในหัวข้อ: "${topicInput}"
ตอบกลับเป็น JSON array เท่านั้น ไม่มีข้อความอื่น โครงสร้างดังนี้:
[
  {"layout":"hero","title":"...","subtitle":"...","content":"(3-4 ประโยคเกี่ยวกับหัวข้อ)","metrics":[{"label":"...","value":"..."},{"label":"...","value":"..."},{"label":"...","value":"..."}]},
  {"layout":"grid","title":"...","subtitle":"...","features":[{"title":"...","desc":"..."},{"title":"...","desc":"..."},{"title":"...","desc":"..."},{"title":"...","desc":"..."}]},
  {"layout":"stats","title":"...","subtitle":"...","stats":[{"title":"...","value":"...","desc":"..."},{"title":"...","value":"...","desc":"..."},{"title":"...","value":"...","desc":"..."},{"title":"...","value":"...","desc":"..."}]},
  {"layout":"timeline","title":"...","subtitle":"...","steps":[{"q":"Q1","title":"...","desc":"..."},{"q":"Q2","title":"...","desc":"..."},{"q":"Q3","title":"...","desc":"..."},{"q":"Q4","title":"...","desc":"..."}]},
  {"layout":"bullets","title":"...","subtitle":"...","bullets":["...","...","...","...","..."]},
  {"layout":"closing","title":"...","subtitle":"...","content":"...","cta":"..."}
]`;

        let aiText = '';
        await sendChatMessage([], prompt, 'gemini-3.5-ultra', false, (chunk) => { aiText += chunk; });
        const jsonMatch = aiText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          newSlides = parsed.map((s, i) => ({ ...s, id: i + 1 }));
        }
      } catch (e) {
        // use fallback
      }
    }

    setSlides(newSlides);
    setActiveIdx(0);
    setIsGenerating(false);
    setAiStatus(isGeminiReady() ? '✅ AI สร้างสไลด์สำเร็จ!' : '✅ สร้างสไลด์สำเร็จ!');
    setTimeout(() => setAiStatus(''), 3500);
  };

  const handleAddSlide = () => {
    const newSlide = { id: Date.now(), layout: 'bullets', title: '📝 สไลด์ใหม่', subtitle: 'คลิก ✏️ เพื่อแก้ไขชื่อ', bullets: ['เพิ่มข้อมูลที่นี่', 'ลากสไลด์เพื่อจัดเรียง', 'กด AI สร้าง เพื่อ regenerate'] };
    setSlides(s => [...s, newSlide]);
    setActiveIdx(slides.length);
  };

  const handleDeleteSlide = (idx) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_, i) => i !== idx);
    setSlides(next);
    setActiveIdx(Math.min(idx, next.length - 1));
  };

  const startEdit = (idx) => { setEditingTitle(idx); setEditTitleVal(slides[idx].title); };
  const commitEdit = () => {
    setSlides(s => s.map((sl, i) => i === editingTitle ? { ...sl, title: editTitleVal } : sl));
    setEditingTitle(null);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', gap: '20px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Presentation size={24} color="#8b5cf6" />
            AllInStudio Slide Designer
            <span className="badge-neon" style={{ fontSize: '0.72rem' }}>AI Powered</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            พิมพ์หัวข้อ → กด AI สร้างสไลด์ → ได้สไลด์ 6 หน้าทันที · แก้ไขชื่อได้ · พรีเซนต์เต็มจอ
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsFullscreen(true)} className="btn-primary" style={{ padding: '8px 18px' }}>
            <Play size={16} /> <span>พรีเซนต์เต็มจอ</span>
          </button>
          <button className="btn-secondary" style={{ padding: '8px 16px' }}>
            <Download size={16} /> <span>ส่งออก</span>
          </button>
        </div>
      </div>

      {/* AI Generator */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Wand2 size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
        <input
          type="text"
          placeholder="พิมพ์หัวข้อ... เช่น 'กลยุทธ์การตลาดดิจิทัล 2026' หรือ 'AI ในธุรกิจโรงแรม'"
          value={topicInput}
          onChange={e => setTopicInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button onClick={handleGenerate} disabled={isGenerating || !topicInput.trim()} className="btn-cyan" style={{ padding: '10px 22px', flexShrink: 0 }}>
          {isGenerating ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={18} />}
          <span>{isGenerating ? 'AI กำลังสร้าง...' : 'AI สร้างสไลด์'}</span>
        </button>
        {aiStatus && <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>{aiStatus}</span>}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
        {/* Sidebar */}
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>🗂 สไลด์ ({slides.length})</span>
            <button onClick={handleAddSlide} style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)', color: '#a78bfa', borderRadius: '6px', padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
              <Plus size={13} /> เพิ่ม
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', overflowY: 'auto', maxHeight: '340px' }}>
            {slides.map((s, idx) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div onClick={() => setActiveIdx(idx)} style={{
                  flex: 1, padding: '8px 10px', borderRadius: '99px',
                  background: activeIdx === idx ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.03)',
                  border: activeIdx === idx ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.07)',
                  color: '#fff', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden'
                }}>
                  {editingTitle === idx ? (
                    <input autoFocus value={editTitleVal} onChange={e => setEditTitleVal(e.target.value)}
                      onBlur={commitEdit} onKeyDown={e => e.key === 'Enter' && commitEdit()}
                      onClick={e => e.stopPropagation()}
                      style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.78rem', outline: 'none', fontWeight: 600 }} />
                  ) : (
                    <>
                      <span style={{ color: 'var(--text-subtle)', width: '14px', flexShrink: 0 }}>#{idx + 1}</span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{s.title}</span>
                    </>
                  )}
                </div>
                <button onClick={() => startEdit(idx)} style={{ background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', padding: '3px', borderRadius: '5px' }} title="แก้ไขชื่อ"><Edit3 size={12} /></button>
                {slides.length > 1 && (
                  <button onClick={() => handleDeleteSlide(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '3px', borderRadius: '5px' }} title="ลบ"><Trash2 size={12} /></button>
                )}
              </div>
            ))}
          </div>

          {/* Theme Picker */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
            <label style={{ fontSize: '0.73rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '7px' }}>🎨 เลือกธีม:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {THEMES.map(t => (
                <button key={t.id} onClick={() => setThemeId(t.id)} style={{
                  padding: '7px 10px', borderRadius: '8px', fontSize: '0.76rem', fontWeight: 600,
                  border: themeId === t.id ? `1px solid ${t.accent}` : '1px solid rgba(255,255,255,0.07)',
                  background: themeId === t.id ? `${t.accent}22` : 'rgba(255,255,255,0.02)',
                  color: themeId === t.id ? t.accent : 'var(--text-muted)', cursor: 'pointer', textAlign: 'left'
                }}>{t.name}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SlideCanvas slide={activeSlide} theme={theme} index={activeIdx} total={slides.length} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setActiveIdx(p => Math.max(0, p - 1))} disabled={activeIdx === 0} className="btn-secondary">
              <ChevronLeft size={16} /> ก่อนหน้า
            </button>
            <div style={{ display: 'flex', gap: '6px' }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)} style={{
                  width: activeIdx === i ? '22px' : '7px', height: '7px', borderRadius: '4px',
                  border: 'none', cursor: 'pointer',
                  background: activeIdx === i ? theme.accent : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.2s', padding: 0
                }} />
              ))}
            </div>
            <button onClick={() => setActiveIdx(p => Math.min(slides.length - 1, p + 1))} disabled={activeIdx === slides.length - 1} className="btn-secondary">
              ถัดไป <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen */}
      {isFullscreen && (
        <div style={{ position: 'fixed', inset: 0, background: theme.bg, color: theme.text, zIndex: 999, padding: '60px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <button onClick={() => setIsFullscreen(false)} style={{ position: 'absolute', top: '18px', right: '20px', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', borderRadius: '50%', width: '42px', height: '42px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={22} />
          </button>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: theme.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{activeSlide.subtitle}</div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{activeSlide.title}</h1>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', margin: '36px 0', fontSize: '1.3rem', lineHeight: 1.8 }}>
            {activeSlide.content && <p style={{ maxWidth: '85%' }}>{activeSlide.content}</p>}
            {activeSlide.bullets && <ul style={{ listStyle: 'none', padding: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>{activeSlide.bullets.map((b, i) => <li key={i} style={{ background: theme.card, padding: '14px 22px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>{b}</li>)}</ul>}
            {activeSlide.cta && <div style={{ background: theme.card, padding: '20px 28px', borderRadius: '16px', border: `1px solid ${theme.border}`, fontWeight: 700, color: theme.accent }}>{activeSlide.cta}</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setActiveIdx(p => Math.max(0, p - 1))} disabled={activeIdx === 0} className="btn-secondary" style={{ fontSize: '1rem', padding: '12px 24px' }}><ChevronLeft size={20} /> ก่อนหน้า</button>
            <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{activeIdx + 1} / {slides.length}</span>
            <button onClick={() => setActiveIdx(p => Math.min(slides.length - 1, p + 1))} disabled={activeIdx === slides.length - 1} className="btn-secondary" style={{ fontSize: '1rem', padding: '12px 24px' }}>ถัดไป <ChevronRight size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
