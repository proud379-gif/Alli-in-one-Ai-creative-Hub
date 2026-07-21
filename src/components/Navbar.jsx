import React from 'react';
import { AI_MODELS } from '../mock/aiData';
import { Sparkles, Cpu, RotateCcw, Activity } from 'lucide-react';

export default function Navbar({ activeTab, selectedModel, setSelectedModel, onResetSession }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'chat': return { title: '💬 AI Chat Hub (ChatGPT Ultra)', subtitle: 'คุยแชท ลอจิก แก้โจทย์ เขียนโค้ดแบบไร้ขีดจำกัด' };
      case 'video': return { title: '🎥 AI Video Studio', subtitle: 'ตัดต่อคลิป ถอดซับอัตโนมัติ ใส่ฟิลเตอร์ Cyberpunk' };
      case 'image': return { title: '🎨 AI Image Studio', subtitle: 'สร้างรูปภาพ แต่งรูป ลบวัตถุ และ Upscale 4K' };
      case 'slide': return { title: '📊 AI Slide Deck Designer', subtitle: 'ออกแบบสไลด์ Presentation สวยงามตึงๆ อัตโนมัติ' };
      default: return { title: 'AllInStudio', subtitle: 'Ultra AI Suite' };
    }
  };

  const info = getTabTitle();

  return (
    <header style={{
      height: '70px',
      padding: '0 24px',
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Title & Info */}
      <div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {info.title}
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 10px #10b981',
            display: 'inline-block'
          }}></span>
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
          {info.subtitle}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Model Switcher */}
        {activeTab === 'chat' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Cpu size={16} color="#818cf8" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                paddingRight: '8px'
              }}
            >
              {AI_MODELS.map(model => (
                <option key={model.id} value={model.id} style={{ background: '#0f172a', color: '#fff' }}>
                  {model.name} ({model.badge})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset / New Session */}
        <button
          onClick={onResetSession}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          title="ล้างข้อมูลและเริ่มเซสชันใหม่"
        >
          <RotateCcw size={15} />
          <span>เซสชันใหม่</span>
        </button>

        {/* AI Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '999px',
          fontSize: '0.75rem',
          color: '#a5b4fc',
          fontWeight: 600
        }}>
          <Activity size={14} className="animate-spin-slow" />
          <span>Engine Online</span>
        </div>
      </div>
    </header>
  );
}
