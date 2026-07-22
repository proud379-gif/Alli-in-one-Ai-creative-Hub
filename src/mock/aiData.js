// NovaAI Studio - AI Data & Preset Templates

export const AI_MODELS = [
  { id: 'gemini-3.5-ultra', name: 'Gemini 3.5 Ultra', badge: 'Fastest & Deep Reasoning', provider: 'Google DeepMind', icon: 'Sparkles', color: '#6366f1' },
  { id: 'gpt-4o-pro', name: 'GPT-4o Pro', badge: 'Multimodal Vision', provider: 'OpenAI', icon: 'Zap', color: '#10b981' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', badge: 'Creative Coding & Writing', provider: 'Anthropic', icon: 'Feather', color: '#8b5cf6' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', badge: 'Math & Logic Expert', provider: 'DeepSeek', icon: 'Cpu', color: '#06b6d4' }
];

export const PRESET_PROMPTS = [
  { title: '🍜 สูตรต้มยำกุ้งน้ำข้น', category: 'Food', prompt: 'สอนวิธีทำต้มยำกุ้งน้ำข้นแบบไทยแท้ พร้อมวัตถุดิบ เคล็ดลับความอร่อย และคุณค่าทางโภชนาการ' },
  { title: '🏛️ สรุปประวัติศาสตร์อยุธยา', category: 'History', prompt: 'สรุปประวัติศาสตร์อาณาจักรอยุธยา ลำดับเหตุการณ์สำคัญ 417 ปี และมรดกทางวัฒนธรรม' },
  { title: '⚽ ข้อมูล & สถิติ ลิโอเนล เมสซี่', category: 'Sports', prompt: 'วิเคราะห์เหตุผลและสรุปความสำเร็จของ ลิโอเนล เมสซี่ ที่ทำให้เป็นนักฟุตบอลระดับโลก' },
  { title: '🌸 แพลนเที่ยวโตเกียว 5 วัน', category: 'Travel', prompt: 'แนะนำแพลนท่องเที่ยวโตเกียว 5 วัน 4 คืน ช่วงฤดูใบไม้เปลี่ยนสี พร้อมสถานที่ไฮไลต์' },
  { title: '🧘 5 วิธีลดความเครียดสุขภาพ', category: 'Health', prompt: 'แนะนำ 5 วิธีลดความเครียดและดูแลสุขภาพจิตสุขภาพกายตามหลักวิทยาศาสตร์' },
  { title: '💻 เขียนโค้ด React & AI', category: 'Coding', prompt: 'ช่วยเขียน React Component สำหรับ Custom Video Player ที่มีดีไซน์ Dark Mode และแป้นควบคุมแบบ Glassmorphic' }
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
  const trimmed = message.trim();
  const msgLower = trimmed.toLowerCase();

  // 1. ทักทาย & สนทนาทั่วไป (Greeting & Casual Chat)
  if (msgLower.includes('สวัสดี') || msgLower.includes('hello') || msgLower.includes('hi') || msgLower.includes('หวัดดี') || msgLower.includes('ดีครับ') || msgLower.includes('ดีค่ะ')) {
    return `สวัสดีครับ! ผมคือ **${model.name} (AllInStudio ChatGPT Ultra)** ยินดีที่ได้คุยกันครับ ⚡\n\nผมเป็น AI อัจฉริยะที่พร้อมพูดคุย ตอบคำถาม และช่วยเหลือคุณได้**ทุกเรื่องในโลก** เหมือน ChatGPT / Claude / Gemini Ultra ไม่ว่าจะเป็น:\n\n- 💬 **คุยเล่น ปรึกษาปัญหา และถามตอบเรื่องทั่วไป**\n- 📝 **แต่งบทความ เขียนนิยาย ร่างอีเมล และแปลภาษา**\n- 🧠 **ประวัติศาสตร์ วิทยาศาสตร์ ปรัชญา และความรู้รอบตัว**\n- 🍳 **สูตรอาหาร แพลนเที่ยว ดูแลสุขภาพ และไลฟ์สไตล์**\n- 📊 **ธุรกิจ การเงิน การตลาด และการลงทุน**\n- 💻 **คณิตศาสตร์ แก้โจทย์ วิเคราะห์ลอจิก และเขียนโค้ด**\n\nวันนี้คุณอยากถามหรืออยากให้ผมช่วยทำเรื่องอะไร บอกมาได้เลยครับ! 😊\n\n*(💡 หมายเหตุ: สามารถใส่ **Gemini API Key** ที่ปุ่มมุมบนขวาเพื่อเปิดใช้งาน Google Search แบบ Real-time และดึงข้อมูลสดจากเว็บจริงได้ทุกเวลาครับ)*`;
  }

  // 2. คำนวณคณิตศาสตร์ (Math & Calculations)
  const mathMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*([\+\-\*\/])\s*(\d+(?:\.\d+)?)$/);
  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const num2 = parseFloat(mathMatch[3]);
    let result = 0;
    if (op === '+') result = num1 + num2;
    if (op === '-') result = num1 - num2;
    if (op === '*') result = num1 * num2;
    if (op === '/') result = num2 !== 0 ? num1 / num2 : 'ไม่สามารถหารด้วยศูนย์ได้';

    return `🔢 **ผลการคำนวณคณิตศาสตร์โดย ${model.name}**:\n\n$$\\mathbf{${num1} ${op} ${num2} = ${result}}$$\n\n- **โจทย์**: ${num1} ${op} ${num2}\n- **ผลลัพธ์ที่ได้**: **${result}**\n\nต้องการคำนวณโจทย์สมการอื่น หรือให้แสดงวิธีทำอย่างละเอียด แจ้งได้เลยครับ! 🧮`;
  }

  // 3. แปลภาษา (Translation)
  if (msgLower.includes('แปลภาษา') || msgLower.includes('translate') || msgLower.includes('แปลว่า') || msgLower.includes('แปลเป็น')) {
    return `🔤 **ระบบแปลภาษาอัจฉริยะ (${model.name})**:\n\nคำ/ข้อความที่คุณต้องการแปล: *" ${trimmed} "*\n\n### 🇹🇭 ภาษาไทย (Thai):\n${trimmed.replace(/แปลภาษา|translate|แปลว่า|แปลเป็น/gi, '').trim() || 'ข้อความต้นฉบับ'}\n\n### 🇬🇧 ภาษาอังกฤษ (English):\n*${trimmed.replace(/แปลภาษา|translate|แปลว่า|แปลเป็น/gi, '').trim()} (Accurate contextual translation with natural tone)*\n\n### 🇯🇵 ภาษาญี่ปุ่น (Japanese):\n*翻訳メッセージ (Hon'yaku messēji)*\n\nหากต้องการแปลภาษาอื่นๆ เช่น จีน, ฝรั่งเศส, เกาหลี หรือต้องการปรับระดับภาษา (ทางการ/กันเอง) บอกผมได้เลยครับ! 🌐`;
  }

  // 4. งานเขียน & งานสร้างสรรค์ (Creative & Writing Tasks: เขียน, แต่ง, ร่าง, สรุป)
  if (msgLower.startsWith('เขียน') || msgLower.startsWith('แต่ง') || msgLower.startsWith('ร่าง') || msgLower.startsWith('สรุป') || msgLower.includes('นิยาย') || msgLower.includes('บทความ') || msgLower.includes('กลอน')) {
    return `📝 **งานเขียนสร้างสรรค์โดย ${model.name}**:\n\nหัวเรื่องที่คุณขอ: *" ${trimmed} "*\n\n---\n\n### 🌟 บทความ/งานเขียนที่สร้างสรรค์ขึ้น:\n\nในยุคปัจจุบันที่โลกขับเคลื่อนไปด้วยความเปลี่ยนแปลงอย่างรวดเร็ว การเข้าใจและปรับตัวให้ทันต่อเรื่อง **"${trimmed}"** ถือเป็นสิ่งที่มีคุณค่าและสำคัญอย่างยิ่ง\n\nข้อคิดและมุมมองหลักประกอบด้วย 3 ด้านสำคัญ:\n1. **การเริ่มต้นด้วยความเข้าใจ**: การวางรากฐานความคิดที่ถูกต้องช่วยให้เป้าหมายสำเร็จได้ง่ายขึ้น\n2. **การลงมือทำอย่างต่อเนื่อง**: ความพยายามและวินัยคือหัวใจสำคัญในการต่อยอดงานเขียนและแนวคิดให้สมบูรณ์\n3. **การประยุกต์ใช้ในชีวิตจริง**: นำความรู้และจินตนาการไปปรับใช้กับสถานการณ์รอบตัวเพื่อสร้างประโยชน์สูงสุด\n\n> *"ความสร้างสรรค์ไม่มีขีดจำกัด เมื่อเราเริ่มลงมือถ่ายทอดความคิดออกมา"* ✍️\n\n---\n\nหากต้องการปรับโทนงานเขียน เพิ่มรายละเอียด หรือปรับรูปแบบความยาว บอกผมได้เลยครับ!`;
  }

  // 5. อาหารและการทำอาหาร
  if (msgLower.includes('ต้มยำ') || msgLower.includes('อาหาร') || msgLower.includes('ทำกับข้าว') || msgLower.includes('สูตร')) {
    return `🍜 **สูตรและวิธีทำต้มยำกุ้งน้ำข้นแบบไทยแท้**:\n\n### 🛒 วัตถุดิบหลัก:\n- กุ้งแม่น้ำหรือกุ้งสด 300 กรัม (แกะเปลือกเว้นหาง ผ่าหลังถอดเส้นดำ)\n- เห็ดฟาง 150 กรัม (ผ่าครึ่ง)\n- ตะไคร้ 2 ต้น (หั่นทแยง), ข่า 1 แง่ง (หั่นแว่น), ใบมะกรูด 4-5 ใบ (ฉีก)\n- พริกขี้หนูสวน 10-15 เม็ด (ทุบพอแตก)\n- น้ำพริกเผา 2 ช้อนโต๊ะ, นมข้นจืด 4 ช้อนโต๊ะ\n- น้ำปลาแท้ 3 ช้อนโต๊ะ, น้ำมะนาวสด 3 ช้อนโต๊ะ\n- น้ำซุปซี่โครงไก่หรือน้ำสะอาด 3 ถ้วยตวง\n\n### 🍳 ขั้นตอนการทำ:\n1. ตั้งน้ำซุปให้เดือด ใส่ข่า ตะไคร้ และใบมะกรูด ต้มจนมีกลิ่นหอมสมุนไพร\n2. ใส่น้ำพริกเผา คนให้ละลาย แล้วใส่เห็ดฟางลงไปต้มประมาณ 2 นาที\n3. ใส่กุ้งสดลงไป (ห้ามคนขณะกุ้งกำลังสุก เพื่อป้องกันกลิ่นคาว)\n4. พอกุ้งเริ่มสุก ใส่นมข้นจืดและพริกขี้หนูทุบ ปิดไฟทันที\n5. ปรุงรสด้วยน้ำปลาและน้ำมะนาวสด ปิดท้ายด้วยผักชีฝรั่งและใบผักชี\n\n--- \n📚 **แหล่งอ้างอิงข้อมูลคงคลัง (Citations)**:\n- 🔗 [กระทรวงวัฒนธรรม - มรดกภูมิปัญญาทางวัฒนธรรม ต้มยำกุ้ง](https://www.m-culture.go.th)\n- 🔗 [สำนักโภชนาการ กรมอนามัย - คุณค่าทางโภชนาการอาหารไทย](https://nutrition.anamai.moph.go.th)`;
  }

  // 6. กีฬา & บุคคลสำคัญ
  if (msgLower.includes('เมสซี่') || msgLower.includes('messi') || msgLower.includes('ฟุตบอล') || msgLower.includes('บอล')) {
    return `⚽ **ความสำเร็จและข้อมูลของ ลิโอเนล เมสซี่ (Lionel Messi)**:\n\n**ลิโอเนล เมสซี่** คือนักฟุตบอลชาวอาร์เจนตินาที่ได้รับการยกย่องจากทั่วโลกว่าเป็นหนึ่งในผู้เล่นที่ยิ่งใหญ่ที่สุดตลอดกาล (GOAT - Greatest of All Time)\n\n### 🏆 รางวัลและความสำเร็จสูงสุด:\n- **แชมป์ฟุตบอลโลก (FIFA World Cup 2022)** ร่วมกับทีมชาติอาร์เจนตินา\n- **บัลลงดอร์ (Ballon d'Or)** รวม 8 สมัย (มากที่สุดในประวัติศาสตร์)\n- **แชมป์ยูฟ่า แชมเปียนส์ลีก** 4 สมัยกับบาร์เซโลนา\n- **ลาลีกาสเปน** 10 สมัย\n- ทำประตูมากกว่า **800 ประตู** ในอาชีพการค้าแข้ง\n\n--- \n📚 **แหล่งอ้างอิงข้อมูลคงคลัง (Citations)**:\n- 🔗 [Official FIFA Profile - Lionel Messi](https://www.fifa.com)\n- 🔗 [UEFA Champions League Statistics](https://www.uefa.com)`;
  }

  // 7. ประวัติศาสตร์ & ศิลปวัฒนธรรม
  if (msgLower.includes('ประวัติศาสตร์') || msgLower.includes('อยุธยา') || msgLower.includes('สุโขทัย') || msgLower.includes('สงคราม')) {
    return `📜 **สรุปประวัติศาสตร์อาณาจักรอยุธยา (พ.ศ. 1893 - 2310)**:\n\nอาณาจักรอยุธยาเป็นราชธานีของไทยยาวนานถึง **417 ปี** มีพระมหากษัตริย์ปกครองรวม 33 พระองค์ จาก 5 ราชวงศ์\n\n### 🏛️ ช่วงเวลาสำคัญ:\n1. **การสถาปนา (พ.ศ. 1893)**: สมเด็จพระรามาธิบดีที่ 1 (พระเจ้าอู่ทอง) ทรงสถาปนากรุงศรีอยุธยาเป็นราชธานี\n2. **ยุคทองทางความมั่งคั่งและการค้า**: เป็นศูนย์กลางการค้าระหว่างประเทศทั้งฮอลันดา ฝรั่งเศส จีน และโปรตุเกส\n3. **การเสียกรุงครั้งที่ 1 (พ.ศ. 2112)** และการกอบกู้เอกราชโดย **สมเด็จพระนเรศวรมหาราช** (พ.ศ. 2127)\n4. **การเสียกรุงครั้งที่ 2 (พ.ศ. 2310)** และการสถาปนากรุงธนบุรีโดย **สมเด็จพระเจ้าตากสินมหาราช**\n\n--- \n📚 **แหล่งอ้างอิงข้อมูลคงคลัง (Citations)**:\n- 🔗 [กรมศิลปากร - ประวัติศาสตร์อยุธยาและมรดกโลก](https://www.finearts.go.th)\n- 🔗 [UNESCO World Heritage Centre - Historic City of Ayutthaya](https://whc.unesco.org)`;
  }

  // 8. การท่องเที่ยว
  if (msgLower.includes('เที่ยว') || msgLower.includes('ญี่ปุ่น') || msgLower.includes('โตเกียว') || msgLower.includes('travel')) {
    return `🌸 **คำแนะนำและแพลนท่องเที่ยวโตเกียว 5 วัน 4 คืน (ฤดูใบไม้เปลี่ยนสี)**:\n\n### 🗓️ แพลนการเดินทางไฮไลต์:\n- **Day 1**: เดินทางถึงโตเกียว Check-in โรงแรมย่าน Shinjuku -> ชมวิวเมืองที่ตึกรัฐบาลทหารโตเกียว -> ทานราเมนย่าน Omoide Yokocho\n- **Day 2**: ไหว้พระวัด Asakusa Sensoji -> ชมวิวที่ Tokyo Skytree -> ชอปปิงย่าน Akihabara\n- **Day 3**: ชมใบไม้เปลี่ยนสีที่สวน Meiji Jingu Gaien (ถนนต้นแปะก๊วยสีเหลืองทอง) -> เดินถนน Takeshita Street (Harajuku) -> ห้าแยก Shibuya\n- **Day 4**: One-Day Trip ชมภูเขาไฟฟูจิที่ทะเลสาบ Kawaguchiko -> ถ่ายรูปคู่เจดีย์ชูเรโตะ\n- **Day 5**: ชอปปิงของฝากย่าน Ameyoko (Ueno) -> เดินทางกลับสนามบิน Narita/Haneda\n\n--- \n📚 **แหล่งอ้างอิงข้อมูลคงคลัง (Citations)**:\n- 🔗 [Japan National Tourism Organization (JNTO)](https://www.japan.travel)\n- 🔗 [Tokyo Official Travel Guide (Gotokyo)](https://www.gotokyo.org)`;
  }

  // 9. สุขภาพและการออกกำลังกาย
  if (msgLower.includes('เครียด') || msgLower.includes('สุขภาพ') || msgLower.includes('นอนไม่หลับ') || msgLower.includes('ออกกำลังกาย')) {
    return `🧘 **5 วิธีทางวิทยาศาสตร์เพื่อลดความเครียดและดูแลสุขภาพกาย-ใจ**:\n\n1. **การฝึกหายใจแบบ 4-7-8**: สูดลมหายใจเข้า 4 วินาที -> กลั้นหายใจ 7 วินาที -> ถอนหายใจออกทางปาก 8 วินาที (ช่วยปรับระบบประสาทอัตโนมัติ)\n2. **การออกกำลังกายระดับปานกลาง**: เดินเร็ว หรือเล่นโยคะ 20-30 นาที ช่วยกระตุ้นการหลั่งสาร Endorphin และ Dopamine\n3. **ปรับ สุขอนามัยการนอน (Sleep Hygiene)**: งดจอภาพก่อนนอน 1 ชั่วโมง ปรับห้องนอนให้มืด เย็น และเงียบ\n4. **การฝึกสติ (Mindfulness Meditation)**: อยู่กับปัจจุบันและสังเกตลมหายใจวันละ 10 นาที\n5. **รับประทานอาหารที่มีคุณค่าสูง**: เพิ่มผักผลไม้ ถั่ว และโอเมก้า 3 หลีกเลี่ยงคาเฟอีนเกินขอบเขต\n\n--- \n📚 **แหล่งอ้างอิงข้อมูลคงคลัง (Citations)**:\n- 🔗 [World Health Organization (WHO) - Mental Health & Well-being](https://www.who.int)\n- 🔗 [Harvard Medical School - Relaxation techniques for stress](https://www.health.harvard.edu)`;
  }

  // 10. คำถามเปิดทั่วไปทุกเรื่อง (Universal Dynamic Response like ChatGPT)
  return `🤖 **[คำตอบโดย ${model.name} (ChatGPT Ultra Engine)]**:\n\nขอบคุณสำหรับคำถามนะครับ: *" ${trimmed} "*\n\nนี่คือคำตอบและบทวิเคราะห์ครอบคลุมในเรื่องนี้ครับ:\n\n### 📌 1. นิยามและจุดสำคัญหลัก (Overview):\n- **${trimmed}** ถือเป็นหัวข้อที่มีแง่มุมน่าสนใจและเกี่ยวข้องกับข้อเท็จจริง ความรู้ หรือประโยชน์ในชีวิตประจำวันอย่างมาก\n- แกนหลักของเรื่องนี้เกี่ยวข้องกับการประมวลผลและการทำความเข้าใจเพื่อนำไปประยุกต์ใช้อย่างถูกต้อง\n\n### 💡 2. ข้อเท็จจริงและแนวทางที่แนะนำ (Key Insights):\n1. **ความถูกต้องและบริบท**: ควรพิจารณาจากข้อมูลรอบด้าน เพื่อให้ได้คำตอบที่ครอบคลุมและตรงกับความต้องการที่สุด\n2. **การนำไปใช้ประโยชน์**: สามารถนำแนวคิดนี้ไปวางแผน ทำงาน หรือตอบสนองต่อเป้าหมายของคุณได้อย่างเป็นระบบ\n3. **ข้อแนะนำเพิ่มเติม**: สามารถสอบถามเจาะจงเฉพาะส่วน (เช่น ขอตัวอย่าง, ขอขั้นตอน, ขอบทสรุปสั้น) ได้ตลอดเวลาครับ\n\n--- \n📚 **แหล่งอ้างอิงความรู้ (Citations)**:\n- 🔗 [Wikipedia Free Knowledge Base](https://www.wikipedia.org)\n- 🔗 [Encyclopaedia Britannica Center](https://www.britannica.com)\n\n*(💡 **แนะนำ:** ใส่ **Gemini API Key** ที่มุมขวาบนเพื่อปลดล็อกการค้นหาแบบ **Real-time จาก Google Search** และโมเดล Gemini Ultra ที่ตอบได้ละเอียดไม่จำกัดครับ!)*`;
}
