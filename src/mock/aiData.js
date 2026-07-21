// NovaAI Studio - AI Data & Preset Templates

export const AI_MODELS = [
  { id: 'gemini-3.5-ultra', name: 'Gemini 3.5 Ultra', badge: 'Fastest & Deep Reasoning', provider: 'Google DeepMind', icon: 'Sparkles', color: '#6366f1' },
  { id: 'gpt-4o-pro', name: 'GPT-4o Pro', badge: 'Multimodal Vision', provider: 'OpenAI', icon: 'Zap', color: '#10b981' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', badge: 'Creative Coding & Writing', provider: 'Anthropic', icon: 'Feather', color: '#8b5cf6' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', badge: 'Math & Logic Expert', provider: 'DeepSeek', icon: 'Cpu', color: '#06b6d4' }
];

export const PRESET_PROMPTS = [
  { title: '💻 เขียนโค้ด React Component', category: 'Coding', prompt: 'ช่วยเขียน React Component สำหรับ Custom Video Player ที่มีดีไซน์ Dark Mode และแป้นควบคุมแบบ Glassmorphic พร้อม CSS' },
  { title: '🚀 วางแผนการตลาดดิจิทัล', category: 'Marketing', prompt: 'ร่างแผนการโปรโมตแอป AI ใหม่ลง TikTok และ YouTube Shorts ให้ได้ 1,000,000 วิวภายใน 1 เดือน พร้อม Script คำพูด' },
  { title: '📝 เขียนบทความ SEO ตึงๆ', category: 'Writing', prompt: 'เขียนบทความเรื่อง "เทคโนโลยี AI ปี 2026 เปลี่ยนโลกตัดต่อวิดีโอและทำสไลด์อย่างไร" ให้ติดหน้าแรก Google' },
  { title: '🎨 ออกแบบ Prompt แต่งรูป', category: 'Design', prompt: 'สร้าง Prompt ภาษาอังกฤษระดับสูงสำหรับ Midjourney/DALL-E สไตล์ Cyberpunk City 8K photorealistic lighting' }
];

export const VIDEO_PRESETS = [
  {
    id: 'cyber-vlog',
    title: 'Neon Cyberpunk Vlog',
    duration: '00:45',
    category: 'Vlog & Reels',
    previewColor: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    subtitles: [
      { time: '00:01 - 00:05', text: 'สวัสดีครับทุกคน! วันนี้เราจะมาลองใช้ AI ตัดต่อคลิประดับตึงๆ' },
      { time: '00:05 - 00:12', text: 'เพียงป้อนข้อความ AI ก็สร้างซับไตเติ้ล + ใส่ออพชัน Cyberpunk Glow ให้อัตโนมัติ' },
      { time: '00:12 - 00:20', text: 'ประหยัดเวลาการตัดต่อไปกว่า 90% งานเสร็จไวใน 1 นาที!' }
    ]
  },
  {
    id: 'ai-tech-review',
    title: 'AI Tech Unboxing 4K',
    duration: '01:15',
    category: 'Product Review',
    previewColor: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    subtitles: [
      { time: '00:01 - 00:06', text: 'รีวิว AI Suite ใหม่ล่าสุด NovaAI Studio 2026' },
      { time: '00:06 - 00:14', text: 'มาพร้อมโมดูลตัดต่อวิดีโอแต่งรูปและทำสไลด์แบบอัตโนมัติ' }
    ]
  },
  {
    id: 'anime-mv',
    title: 'Synthwave Anime Reel',
    duration: '00:30',
    category: 'Anime & Music',
    previewColor: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    subtitles: [
      { time: '00:01 - 00:04', text: '🎵 Beat dropping with AI Anime Style Transfer...' },
      { time: '00:04 - 00:10', text: 'แปลงฟูเทจธรรมดาให้กลายเป็นอนิเมะญี่ปุ่นสุดอลังการ' }
    ]
  }
];

export const IMAGE_STYLES = [
  { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'แสงไฟนีออนและบรรยากาศเมืองอนาคต', bg: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' },
  { id: 'photorealistic', name: '8K Photorealistic', desc: 'ความคมชัดระดับกล้องถ่ายภาพมืออาชีพ', bg: 'linear-gradient(135deg, #374151, #111827)' },
  { id: 'anime-3d', name: '3D Pixar Anime', desc: 'สไตล์การ์ตูน 3D ละมุนสายตา', bg: 'linear-gradient(135deg, #ec4899, #f59e0b)' },
  { id: 'synthwave', name: '80s Synthwave', desc: 'โทนสีม่วงส้มแนวเรโทรวินเทจ', bg: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  { id: 'oil-painting', name: 'Digital Oil Art', desc: 'ภาพวาดน้ำมันระดับวิจิตรศิลป์', bg: 'linear-gradient(135deg, #d97706, #7c2d12)' }
];

export const SLIDE_TEMPLATES = [
  {
    id: 'deck-ai-pitch',
    topic: 'NovaAI Studio - AI Innovation Pitch Deck 2026',
    theme: 'Dark Cyber Glass',
    slides: [
      {
        id: 1,
        title: '⚡ NovaAI Studio 2026',
        subtitle: 'The Ultimate All-in-One AI Creative Suite',
        layout: 'hero',
        content: 'ปลดล็อกขีดจำกัดความสร้างสรรค์ด้วย AI คุยแชท, ตัดต่อคลิป, แต่งรูป และทำสไลด์อัตโนมัติในแพลตฟอร์มเดียว',
        metrics: [
          { label: 'Speed Increase', value: '10x' },
          { label: 'Time Saved', value: '95%' },
          { label: 'AI Accuracy', value: '99.8%' }
        ]
      },
      {
        id: 2,
        title: '🎯 Key Features Overview',
        subtitle: '4 Powerful AI Modules',
        layout: 'grid',
        features: [
          { icon: 'MessageSquare', title: 'AI Chat GPT Ultra', desc: 'สนทนา ลอจิก แก้โจทย์ และเขียนโค้ดด้วยโมดูลขั้นสูง' },
          { icon: 'Video', title: 'AI Video Studio', desc: 'ตัดต่อคลิป ถอดซับไทย ใส่ฟิลเตอร์ Cyberpunk อัตโนมัติ' },
          { icon: 'Image', title: 'AI Image Studio', desc: 'สร้างรูปภาพ ลบวัตถุ ลบพื้นหลัง และ Upscale 4K' },
          { icon: 'Presentation', title: 'AI Presentation Designer', desc: 'สร้างและออกแบบสไลด์สวยงามตึงๆ ในคลิกเดียว' }
        ]
      },
      {
        id: 3,
        title: '📊 Market Growth & ROI',
        subtitle: 'AI Productivity Statistics',
        layout: 'stats',
        stats: [
          { title: 'ผู้ใช้งานระบบ', value: '500,000+', desc: 'ผู้สร้างคอนเทนต์และนักพัฒนา' },
          { title: 'สไลด์ที่สร้างแล้ว', value: '2.5M+', desc: 'ออกแบบอัตโนมัติโดย AI' },
          { title: 'คลิปวิดีโอเรนเดอร์', value: '1.2M+', desc: 'ส่งออกไฟล์ระดับ 4K' }
        ]
      },
      {
        id: 4,
        title: '🚀 Future Roadmap 2026-2027',
        subtitle: 'What is Coming Next',
        layout: 'timeline',
        steps: [
          { q: 'Q3 2026', title: 'Real-time Live Stream AI Subtitle' },
          { q: 'Q4 2026', title: '3D Mesh & Motion Capture AI' },
          { q: 'Q1 2027', title: 'Enterprise Team Collaboration & Cloud Sync' }
        ]
      }
    ]
  }
];

export function generateChatResponse(message, modelId) {
  const model = AI_MODELS.find(m => m.id === modelId) || AI_MODELS[0];
  const msgLower = message.toLowerCase();
  
  if (msgLower.includes('สวัสดี') || msgLower.includes('hello') || msgLower.includes('hi')) {
    return `สวัสดีครับ! ผมคือ **NovaAI (${model.name})** ยินดีที่ได้ช่วยเหลือคุณวันนี้ครับ⚡\n\nผมสามารถช่วยคุณ:\n- 💬 ตอบคำถาม วางแผนความรู้ และเขียนโค้ด\n- 🎥 แนะนำการตัดต่อวิดีโอและทำสไลด์\n- 🎨 สร้างและตกแต่งภาพสไตล์ตึงๆ\n\nมีอะไรให้ผมรับใช้บอกมาได้เลยครับ!`;
  }
  
  if (msgLower.includes('ตัดต่อ') || msgLower.includes('คลิป') || msgLower.includes('video')) {
    return `🎥 **คำแนะนำระบบตัดต่อวิดีโอด้วย AI (Nova Video Studio)**:\n\n1. คุณสามารถเลือกแท็บ **"Video Studio"** ที่เมนูด้านซ้าย\n2. เลือกลอง **Preset วิดีโอ** หรือพิมพ์ไอเดีย Script ภาษาไทย\n3. AI จะทำการถอดคำบรรยาย (Auto Subtitle) และปรับโทนสี Cyberpunk ให้อัตโนมัติในไม่กี่วินาทีครับ!`;
  }

  if (msgLower.includes('สไลด์') || msgLower.includes('slide') || msgLower.includes('presentation')) {
    return `📊 **คำแนะนำการออกแบบสไลด์ด้วย AI (Nova Presentation)**:\n\n1. ไปที่แท็บ **"Slide Designer"**\n2. ป้อนหัวข้อเรื่อง เช่น *"แผนเปิดตัวแอปพลิเคชัน AI ปี 2026"*\n3. ระบบจะเจนสไลด์ 4-10 หน้าพร้อม Layout สวยตึง พรีเซนต์ได้ทันทีครับ!`;
  }

  return `🤖 **[คำตอบจาก ${model.name}]**:\n\nขอบคุณสำหรับคำถามนะครับ: *" ${message} "*\n\nจากการวิเคราะห์ด้วยระบบประมวลผลอัลกอริทึม **${model.provider}**:

1. **วิเคราะห์เชิงลึก**: เรื่องนี้มีความสำคัญมากในยุคเทคโนโลยีปัจจุบัน
2. **แนวทางดำเนินงาน**:
   - ขั้นที่ 1: กำหนดเป้าหมายและโครงสร้างข้อมูล
   - ขั้นที่ 2: ใช้เครื่องมือ AI ช่วยทุ่นแรงและประมวลผล
   - ขั้นที่ 3: ตรวจสอบความถูกต้องและปรับแต่งตามต้องการ
3. **ตัวอย่างโค้ด/โครงสร้าง**:
\`\`\`javascript
// NovaAI Optimization Function
async function optimizeWorkflow() {
  const aiSuite = await NovaAI.init({ mode: 'ultra-speed' });
  return aiSuite.processTask("${message}");
}
\`\`\`

หากต้องการรายละเอียดเพิ่มเติมในส่วนไหน แจ้งผมได้เลยครับ! 🚀`;
}
