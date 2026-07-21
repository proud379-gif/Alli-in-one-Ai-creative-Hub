import React from 'react';
import { 
  MessageSquare, 
  Video, 
  Image as ImageIcon, 
  Presentation, 
  Sparkles, 
  Zap, 
  Sliders, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  const navItems = [
    { id: 'chat', label: 'AI Chat GPT', icon: MessageSquare, badge: 'PRO', desc: 'สนทนา คุยแชท เขียนโค้ด' },
    { id: 'video', label: 'AI Video Studio', icon: Video, badge: 'HOT', desc: 'ตัดต่อคลิป ถอดซับอัตโนมัติ' },
    { id: 'image', label: 'AI Image Studio', icon: ImageIcon, badge: 'NEW', desc: 'เจนภาพ ลบวัตถุ 4K' },
    { id: 'slide', label: 'AI Slide Deck', icon: Presentation, badge: 'AI', desc: 'ออกแบบสไลด์ Presentation' }
  ];

  return (
    <aside style={{
      width: collapsed ? '80px' : '260px',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 50,
      userSelect: 'none'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: collapsed ? '20px 10px' : '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
            flexShrink: 0
          }}>
            <Sparkles size={22} color="#fff" />
          </div>
          {!collapsed && (
            <div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                <span style={{ color: '#fff' }}>AllIn</span>
                <span className="text-gradient">Studio</span>
              </h1>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                Ultra All-in-One Suite
              </p>
            </div>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-muted)',
            borderRadius: '8px',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          title={collapsed ? "ขยายเมนู" : "ย่อเมนู"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                padding: collapsed ? '12px' : '12px 14px',
                borderRadius: '14px',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)' 
                  : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: isActive ? '0 4px 20px rgba(99, 102, 241, 0.25)' : 'none'
              }}
              title={collapsed ? item.label : undefined}
            >
              <div style={{
                color: isActive ? '#818cf8' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <IconComponent size={22} />
              </div>

              {!collapsed && (
                <div style={{ textAlign: 'left', flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 500 }}>
                      {item.label}
                    </span>
                    <span className={item.badge === 'HOT' ? 'badge-pink' : item.badge === 'NEW' ? 'badge-cyan' : 'badge-neon'}>
                      {item.badge}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '0.72rem', 
                    color: 'var(--text-subtle)', 
                    margin: '2px 0 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.desc}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer System Badge */}
      {!collapsed && (
        <div style={{
          padding: '16px',
          margin: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '14px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#10b981' }}>AllIn System Engine</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', margin: 0 }}>
            v3.5 Turbo • AI Speed: 240 token/s
          </p>
        </div>
      )}
    </aside>
  );
}
