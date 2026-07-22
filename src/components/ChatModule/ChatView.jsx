import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PRESET_PROMPTS, AI_MODELS, generateChatResponse } from '../../mock/aiData';
import { sendChatMessage, isGeminiReady, initGeminiClient, getSavedApiKey } from '../../services/geminiService';
import {
  Send, Sparkles, Copy, Check, Trash2, Mic, Paperclip, ImagePlus, X as XIcon,
  Bot, User, Globe, Key, ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react';

export default function ChatView({ selectedModel, onOpenApiKey }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'สวัสดีครับ! ยินดีต้อนรับสู่ **AllInStudio Chat GPT Ultra** ⚡\n\nผมพร้อมช่วยเหลือคุณทุกด้าน — ตอบคำถาม วิเคราะห์โค้ด วางแผนธุรกิจ แต่งบทความ และอื่นๆ อีกมาก!\n\n**💡 เปิดใช้ Google Search** เพื่อให้ผมค้นหาข้อมูลล่าสุดจากอินเตอร์เน็ตได้แบบ Real-time ครับ\n**📷 อัปโหลดรูปภาพ** เพื่อให้ผมวิเคราะห์รูปและตอบคำถามได้เลยครับ!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [useWebSearch, setUseWebSearch] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const [expandedSources, setExpandedSources] = useState({});
  // Image upload state
  const [pendingImage, setPendingImage] = useState(null); // { dataUrl, base64, mimeType, name }
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const currentModelObj = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];
  const apiReady = isGeminiReady() || !!getSavedApiKey();

  // Initialize client from saved key on mount
  useEffect(() => {
    const saved = getSavedApiKey();
    if (saved) initGeminiClient(saved);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 220) + 'px';
  }, [input]);

  // Handle real image file selection
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const base64 = dataUrl.split(',')[1];
      setPendingImage({ dataUrl, base64, mimeType: file.type, name: file.name });
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleSend = useCallback(async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query && !pendingImage) return;
    if (isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query || '📷 ส่งรูปภาพ',
      imageDataUrl: pendingImage?.dataUrl || null,
      imageName: pendingImage?.name || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const capturedImage = pendingImage;
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setPendingImage(null);
    setIsTyping(true);
    setStreamingText('');

    // ตรวจว่า Gemini พร้อมหรือไม่
    if (!isGeminiReady()) {
      const saved = getSavedApiKey();
      if (saved) {
        initGeminiClient(saved);
      } else {
        // Fallback to mock response
        await new Promise(r => setTimeout(r, 800));
        const mockText = generateChatResponse(query, selectedModel);
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: mockText,
          modelName: currentModelObj.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        setStreamingText('');
        return;
      }
    }

    try {
      // ส่งถึง Gemini API จริงๆ พร้อม streaming + รูปภาพ
      const historyToSend = messages.filter(m => m.sender !== 'system');
      const result = await sendChatMessage(
        historyToSend,
        query || (capturedImage ? 'วิเคราะห์รูปภาพนี้ให้หน่อยครับ' : ''),
        selectedModel,
        useWebSearch,
        (chunk, full) => {
          setStreamingText(full);
        },
        capturedImage?.base64 || null,
        capturedImage?.mimeType || null
      );

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: result.text,
        modelName: currentModelObj.name,
        usedSearch: result.usedSearch,
        groundingChunks: result.groundingChunks || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        sender: 'ai',
        text: errText,
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
      setStreamingText('');
    }
  }, [input, isTyping, messages, selectedModel, useWebSearch, currentModelObj, pendingImage]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      sender: 'ai',
      text: `✅ ล้างการสนทนาเรียบร้อยแล้ว เริ่มต้นเซสชันใหม่กับ **${currentModelObj.name}** ครับ!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const renderText = (text) => {
    if (!text) return '';
    return text
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#22d3ee;text-decoration:underline;font-weight:600;">$1 🔗</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,0.15);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.88em;">$1</code>')
      .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="background:rgba(15,23,42,0.9);border:1px solid rgba(255,255,255,0.1);padding:14px;border-radius:10px;overflow-x:auto;font-family:monospace;font-size:0.85em;margin:8px 0;"><code>$1</code></pre>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>

      {/* Top Control Bar */}
      <div style={{
        padding: '10px 24px',
        background: 'rgba(15, 23, 42, 0.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge-neon">Active: {currentModelObj.name}</span>

          {/* Google Search Toggle */}
          <button
            onClick={() => setUseWebSearch(!useWebSearch)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              border: useWebSearch ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
              background: useWebSearch ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255,255,255,0.03)',
              color: useWebSearch ? '#22d3ee' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Globe size={13} />
            Google Search {useWebSearch ? 'ON ✓ (ค้นหาข้อมูลสดจากเว็บ)' : 'OFF'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* API Key Status */}
          <button
            onClick={onOpenApiKey}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              border: apiReady ? '1px solid #10b981' : '1px solid #ef4444',
              background: apiReady ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: apiReady ? '#34d399' : '#f87171',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Key size={12} />
            {apiReady ? 'Gemini Connected ✓' : 'ตั้งค่า API Key'}
          </button>

          <button onClick={clearChat} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <Trash2 size={14} /> ล้างแชท
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          const isSourcesExpanded = expandedSources[msg.id] !== false; // default expanded
          return (
            <div
              key={msg.id}
              className="animate-fade-in"
              style={{
                display: 'flex',
                gap: '14px',
                alignSelf: isAi ? 'flex-start' : 'flex-end',
                maxWidth: isAi ? '88%' : '75%',
                flexDirection: isAi ? 'row' : 'row-reverse',
                width: isAi ? undefined : '75%'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: isAi ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isAi ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
                flexShrink: 0
              }}>
                {isAi ? <Bot size={20} color="#fff" /> : <User size={20} color="#fff" />}
              </div>

              {/* Message Box */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  background: isAi
                    ? (msg.isError ? 'rgba(239,68,68,0.1)' : 'rgba(15,23,42,0.85)')
                    : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: isAi
                    ? (msg.isError ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.1)')
                    : 'none',
                  padding: '14px 18px',
                  borderRadius: isAi ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                  boxShadow: isAi ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(99,102,241,0.3)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  lineHeight: '1.65',
                  wordBreak: 'break-word'
                }}>
                  {/* AI Header Row */}
                  {isAi && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={12} color="#818cf8" />
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                          {msg.modelName || currentModelObj.name}
                        </span>
                        {msg.usedSearch && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#22d3ee', background: 'rgba(6,182,212,0.12)', padding: '1px 6px', borderRadius: '999px', border: '1px solid rgba(6,182,212,0.25)' }}>
                            <Globe size={10} /> ค้นหาจริงจาก Google
                          </span>
                        )}
                      </div>
                      <button onClick={() => copyToClipboard(msg.text, msg.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        {copiedId === msg.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}

                  {/* Attached Image Preview */}
                  {msg.imageDataUrl && (
                    <div style={{ marginBottom: '10px' }}>
                      <img
                        src={msg.imageDataUrl}
                        alt={msg.imageName || 'รูปภาพที่แนบ'}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '320px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}
                      />
                      {msg.imageName && (
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                          📎 {msg.imageName}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  <div dangerouslySetInnerHTML={{ __html: renderText(msg.text) }} />

                  {/* Grounding Sources */}
                  {msg.groundingChunks?.length > 0 && (
                    <div style={{ marginTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                      <button
                        onClick={() => setExpandedSources(prev => ({ ...prev, [msg.id]: !isSourcesExpanded }))}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#22d3ee', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', marginBottom: isSourcesExpanded ? '8px' : 0 }}
                      >
                        <Globe size={14} />
                        📚 แหล่งอ้างอิงข้อมูลจริงจากเว็บ ({msg.groundingChunks.length})
                        {isSourcesExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                      {isSourcesExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {msg.groundingChunks.map((chunk, ci) => (
                            <a
                              key={ci}
                              href={chunk.web?.uri || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#a5b4fc', background: 'rgba(99,102,241,0.12)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.25)', textDecoration: 'none', transition: 'all 0.2s' }}
                              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#22d3ee'; e.currentTarget.style.color = '#fff'; }}
                              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'; e.currentTarget.style.color = '#a5b4fc'; }}
                            >
                              <ExternalLink size={12} color="#22d3ee" />
                              <span style={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {chunk.web?.title || chunk.web?.uri || `แหล่งอ้างอิง #${ci + 1}`}
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timestamp */}
                  <div style={{ fontSize: '0.68rem', color: isAi ? 'var(--text-subtle)' : 'rgba(255,255,255,0.7)', textAlign: 'right', marginTop: '6px' }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Live Streaming Message */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '14px', alignSelf: 'flex-start', maxWidth: '88%' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(99,102,241,0.4)', flexShrink: 0 }}>
              <Bot size={20} color="#fff" />
            </div>
            <div style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(99,102,241,0.3)', padding: '14px 18px', borderRadius: '4px 18px 18px 18px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', color: '#fff', fontSize: '0.95rem', lineHeight: '1.65', flex: 1, wordBreak: 'break-word' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <Sparkles size={12} className="animate-spin-slow" color="#818cf8" />
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  {currentModelObj.name} {useWebSearch ? '+ Google Search' : ''} • กำลังพิมพ์...
                </span>
              </div>
              {streamingText
                ? <div dangerouslySetInnerHTML={{ __html: renderText(streamingText) }} />
                : <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '4px' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818cf8', animation: `pulseGlow 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
              }
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Prompt Chips */}
      <div style={{ padding: '0 24px 10px 24px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
        {PRESET_PROMPTS.map((preset, i) => (
          <button
            key={i}
            onClick={() => handleSend(preset.prompt)}
            disabled={isTyping}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div style={{ padding: '12px 24px 20px 24px', background: 'rgba(15,23,42,0.8)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {/* Pending Image Preview Strip */}
        {pendingImage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '8px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '12px' }}>
            <img src={pendingImage.dataUrl} alt="preview" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📎 {pendingImage.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>พร้อมส่งพร้อมกับข้อความ</div>
            </div>
            <button onClick={() => setPendingImage(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <XIcon size={16} />
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          background: 'rgba(30,41,59,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '18px',
          padding: '10px 14px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{ background: 'none', border: 'none', color: pendingImage ? '#818cf8' : 'var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}
            title="แนบรูปภาพ"
          >
            <ImagePlus size={18} />
          </button>

          <textarea
            ref={textareaRef}
            placeholder={`ถามอะไรก็ได้กับ ${currentModelObj.name}... (Enter ส่ง | Shift+Enter ขึ้นบรรทัดใหม่)`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
              padding: '6px 0',
              resize: 'none',
              lineHeight: '1.5',
              maxHeight: '220px',
              overflowY: 'auto',
              fontFamily: 'var(--font-sans)'
            }}
          />

          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}>
            <Mic size={18} />
          </button>

          <button
            onClick={() => handleSend()}
            disabled={(!input.trim() && !pendingImage) || isTyping}
            className="btn-primary"
            style={{ padding: '8px 16px', borderRadius: '12px', flexShrink: 0, opacity: (!input.trim() && !pendingImage) || isTyping ? 0.5 : 1 }}
          >
            <Send size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textAlign: 'center', marginTop: '8px' }}>
          {useWebSearch ? '🌐 Google Search เปิดอยู่ — AI จะค้นหาข้อมูลจากอินเตอร์เน็ตแบบ Real-time' : '⚡ ตอบด้วยความรู้ภายในโมเดลเท่านั้น'} • ข้อความไม่จำกัดความยาว
        </p>
      </div>
    </div>
  );
}
