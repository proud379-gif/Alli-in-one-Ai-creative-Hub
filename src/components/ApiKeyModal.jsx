import React, { useState } from 'react';
import { Key, ExternalLink, Eye, EyeOff, ShieldCheck, Globe, X, Sparkles, AlertCircle } from 'lucide-react';
import { saveApiKey, getSavedApiKey, clearApiKey } from '../services/geminiService';

export default function ApiKeyModal({ onClose, onSaved }) {
  const [apiKey, setApiKey] = useState(getSavedApiKey());
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed.startsWith('AIza') || trimmed.length < 30) {
      setError('API Key ไม่ถูกต้อง — ต้องขึ้นต้นด้วย "AIza" และยาวเพียงพอ');
      return;
    }
    setError('');
    setIsSaving(true);
    setTimeout(() => {
      saveApiKey(trimmed);
      setIsSaving(false);
      onSaved && onSaved(trimmed);
      onClose && onClose();
    }, 600);
  };

  const handleClear = () => {
    clearApiKey();
    setApiKey('');
    setError('');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(9, 13, 22, 0.9)',
      backdropFilter: 'blur(16px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.25s ease-out'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '540px',
        padding: '36px',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        boxShadow: '0 0 40px rgba(99, 102, 241, 0.2), 0 20px 60px rgba(0, 0, 0, 0.6)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
            }}>
              <Key size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>ตั้งค่า Gemini API Key</h2>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                เชื่อมต่อ Gemini AI + Google Search จริงๆ
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Features info */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#a5b4fc' }}>
            <Sparkles size={16} color="#818cf8" />
            <span>ข้อความและคำตอบ <strong style={{ color: '#fff' }}>ไม่จำกัดความยาว</strong> (65,536 tokens)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#a5b4fc' }}>
            <Globe size={16} color="#06b6d4" />
            <span>ค้นหาข้อมูลจาก <strong style={{ color: '#fff' }}>Google Search จริง</strong> แบบ Real-time</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#a5b4fc' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>API Key เก็บไว้ใน <strong style={{ color: '#fff' }}>Browser ของคุณเท่านั้น</strong> (ปลอดภัย 100%)</span>
          </div>
        </div>

        {/* Input Field */}
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          Gemini API Key
        </label>
        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <input
            type={showKey ? 'text' : 'password'}
            placeholder="AIza... (วางจาก Google AI Studio)"
            value={apiKey}
            onChange={(e) => { setApiKey(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            style={{
              width: '100%',
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              paddingRight: '50px',
              letterSpacing: '0.05em',
              borderColor: error ? '#ef4444' : undefined
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {showKey ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.82rem', marginBottom: '12px' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* Get API Key Link */}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--accent-cyan)',
            marginBottom: '24px'
          }}
        >
          <ExternalLink size={13} />
          รับ API Key ฟรีได้ที่ Google AI Studio (ไม่เสียค่าใช้จ่าย)
        </a>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            disabled={!apiKey.trim() || isSaving}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', opacity: !apiKey.trim() ? 0.5 : 1 }}
          >
            <Key size={16} />
            <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกและเชื่อมต่อ AI'}</span>
          </button>

          {getSavedApiKey() && (
            <button onClick={handleClear} className="btn-secondary" style={{ padding: '10px 14px' }} title="ลบ API Key">
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
