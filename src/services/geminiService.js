// NovaAI Studio - Gemini AI Service (Multimodal: Text + Image + Google Search)

import { GoogleGenAI } from '@google/genai';

let genaiClient = null;
let currentApiKey = null;

export function initGeminiClient(apiKey) {
  currentApiKey = apiKey;
  genaiClient = new GoogleGenAI({ apiKey });
  return genaiClient;
}

export function isGeminiReady() {
  return genaiClient !== null && currentApiKey !== null;
}

export function getSavedApiKey() {
  return localStorage.getItem('nova_gemini_api_key') || '';
}

export function saveApiKey(apiKey) {
  localStorage.setItem('nova_gemini_api_key', apiKey);
  initGeminiClient(apiKey);
}

export function clearApiKey() {
  localStorage.removeItem('nova_gemini_api_key');
  genaiClient = null;
  currentApiKey = null;
}

function resolveModelName(modelId) {
  const modelMap = {
    'gemini-3.5-ultra': 'gemini-2.5-flash',
    'gpt-4o-pro': 'gemini-2.5-flash',
    'claude-3.5-sonnet': 'gemini-2.5-flash',
    'deepseek-r1': 'gemini-2.5-flash',
  };
  return modelMap[modelId] || 'gemini-2.5-flash';
}

/**
 * ส่งข้อความ (+ รูปภาพ) ไปยัง Gemini พร้อม Google Search Grounding
 * รองรับ Streaming + Multimodal (Text + Image) สำหรับทุกหัวข้อความรู้
 */
export async function sendChatMessage(history, newMessage, modelId, useWebSearch, onStream, imageBase64 = null, imageMimeType = null) {
  if (!genaiClient) throw new Error('GEMINI_NOT_INITIALIZED');

  const geminiModelName = resolveModelName(modelId);
  const tools = useWebSearch ? [{ googleSearch: {} }] : [];

  const systemInstruction = `คุณคือ ChatGPT Ultra & Gemini AI (ผู้ช่วย AI ปัญญาประดิษฐ์ระดับสูงสุดของ AllInStudio)
คุณตอบคำถามได้ทุกภาษา โดยเฉพาะภาษาไทยและภาษาอังกฤษ
คุณเป็น AI อัจฉริยะรอบรู้ ไร้ข้อจำกัด สามารถพูดคุย สนทนา ตอบคำถาม และช่วยงานได้ทุกเรื่องทุกหมวดหมู่ในโลก เช่นเดียวกับ ChatGPT, Claude และ Gemini Ultra!

หมวดหมู่ที่คุณพร้อมตอบทุกเรื่องแบบไม่มีข้อจำกัด:
1. 💬 **การสนทนาทั่วไป & ปรปรึกษา**: คุยเล่น ตอบคำถามคาใจ ปรึกษาปัญหาชีวิต การงาน การเรียน ปรัชญา มุกตลก ความรู้สึก
2. 📝 **งานเขียน & สร้างสรรค์**: แต่งกลอน แต่งเพลง เขียนเรียงความ ร่างอีเมล เขียนบทความ แต่งนิยาย สรุปความ แปลภาษาทุกภาษา
3. 🧠 **ความรู้ทั่วไป & วิทยาศาสตร์**: ประวัติศาสตร์ ภูมิศาสตร์ วิทยาศาสตร์ อวกาศ สังคม ศาสนา กฎหมาย การแพทย์เบื้องต้น
4. 🍳 **การดำเนินชีวิต & ไลฟ์สไตล์**: แนะนำสูตรอาหาร วางแผนเที่ยว ออกกำลังกาย แฟชั่น ความงาม ดูแลสัตว์เลี้ยง
5. 📊 **ธุรกิจ & การเงิน**: วางแผนการเงิน วิเคราะห์การตลาด ร่างแผนธุรกิจ หุ้น การลงทุน ทักษะการบริหาร
6. 💻 **คณิตศาสตร์ & เทคโนโลยี**: แก้โจทย์คณิตศาสตร์ วิเคราะห์ลอจิก เขียนโค้ดทุกภาษา ถอนบั๊ก ปรับแต่งระบบ

แนวทางการตอบกลับ:
- ตอบอย่างเป็นธรรมชาติ สุภาพ ชัดเจน ให้ความรู้สึกเหมือนคุยกับ ChatGPT / Gemini Ultra ระดับมืออาชีพ
- ปรับโทนการตอบให้เข้ากับคำถามของผู้ใช้ (ถามสั้นตอบกระชับ ถามลึกตอบเป็นขั้นตอนอย่างละเอียด)
- เมื่อเปิดใช้ Google Search หรือค้นหาข้อมูลจากอินเตอร์เน็ต ให้อ้างอิงแหล่งที่มาด้วยลิงก์ URL จริงเสมอ
- เมื่อผู้ใช้ส่งรูปภาพมา ให้วิเคราะห์รูปภาพอย่างถี่ถ้วนและตอบคำถามที่เกี่ยวข้องอย่างครอบคลุม`;

  const formattedHistory = history
    .filter(m => m.sender !== 'system' && !m.isError)
    .map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text || '' }],
    }));

  try {
    const chat = genaiClient.chats.create({
      model: geminiModelName,
      config: {
        systemInstruction,
        tools,
        temperature: 0.7,
        maxOutputTokens: 65536,
      },
      history: formattedHistory,
    });

    // สร้าง parts สำหรับ message ปัจจุบัน (รองรับรูปภาพ)
    const messageParts = [];
    if (imageBase64 && imageMimeType) {
      messageParts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64,
        }
      });
    }
    if (newMessage) {
      messageParts.push({ text: newMessage });
    }

    let fullText = '';
    let groundingChunks = [];
    let usedSearch = false;

    const stream = await chat.sendMessageStream({ message: messageParts });

    for await (const chunk of stream) {
      const chunkText = chunk.text ?? '';
      if (chunkText) {
        fullText += chunkText;
        if (onStream) onStream(chunkText, fullText);
      }
      
      const candidate = chunk.candidates?.[0];
      if (candidate?.groundingMetadata) {
        const metadata = candidate.groundingMetadata;
        if (metadata.groundingChunks && metadata.groundingChunks.length > 0) {
          groundingChunks = metadata.groundingChunks;
          usedSearch = true;
        }
        if (metadata.webSearchQueries && metadata.webSearchQueries.length > 0) {
          usedSearch = true;
        }
      }
    }

    return { text: fullText, usedSearch, groundingChunks };
  } catch (err) {
    console.error('Gemini API Error:', err);
    throw err;
  }
}

/**
 * ส่งคำสั่ง AI สำหรับแต่งรูปภาพทุกประเภท (วิว, อาหาร, สินค้า, สัตว์เลี้ยง, วัตถุ, อาร์ต, บุคคล)
 * แปลงคำสั่งภาษาไทย/อังกฤษ → JSON ค่าปรับแต่ง filter
 */
export async function sendImageEditCommand(command, imageBase64, imageMimeType) {
  if (!genaiClient) throw new Error('GEMINI_NOT_INITIALIZED');

  const prompt = `คุณเป็น AI ผู้เชี่ยวชาญด้านการแต่งรูปภาพทุกประเภท (ภาพวิวธรรมชาติ, ภาพอาหาร, ภาพสินค้า, ภาพสัตว์เลี้ยง, ภาพวัตถุ, ภาพการ์ตูน, ภาพสตรีท และภาพบุคคล)
ผู้ใช้ส่งรูปภาพและคำสั่ง: "${command}"

วิเคราะห์รูปภาพและคำสั่งของผู้ใช้ จากนั้นตอบกลับเป็น JSON เท่านั้น ในรูปแบบ:
{
  "brightness": 0,
  "contrast": 0,
  "saturation": 0,
  "hue": 0,
  "blur": 0,
  "sharpness": 0,
  "scaleFactor": 1.0,
  "explanation": "คำอธิบายภาษาไทยในการปรับแต่ง"
}

ค่าแต่ละตัวมีช่วง:
- brightness: -100 ถึง 100 (0 = ไม่เปลี่ยน, บวก = สว่างขึ้น, ลบ = มืดลง)
- contrast: -100 ถึง 100 (บวก = คมชัดสดใสขึ้น, ลบ = นุ่มนวลลง)
- saturation: -100 ถึง 100 (ลบ = ลดสี/ขาวดำ, บวก = เพิ่มสีสันให้จัดจ้าน)
- hue: -180 ถึง 180 (หมุนปรับโทนสี)
- blur: 0 ถึง 20 (เบลอภาพ/พื้นหลัง)
- sharpness: 0 ถึง 100 (เพิ่มรายละเอียดความคมชัด)
- scaleFactor: 0.5 ถึง 2.5 (1.0 = ปกติ, น้อยกว่า 1 = ย่อขนาดภาพ/วัตถุเล็กลง, มากกว่า 1 = ขยายภาพ/วัตถุใหญ่ขึ้น)

ตัวอย่างคำสั่งและการปรับค่าตามประเภทรูปภาพ:
- "เน้นสีอาหารให้ดูน่าทาน" → saturation: 45, brightness: 12, contrast: 15
- "ปรับภาพวิวธรรมชาติให้สดใส" → saturation: 50, hue: -10, brightness: 10
- "ปรับสินค้าให้โดดเด่นคมชัด" → contrast: 30, sharpness: 45, brightness: 15
- "ดึงรายละเอียดขนสัตว์เลี้ยง" → contrast: 25, sharpness: 40, saturation: 20
- "ย่อขนาดภาพ/วัตถุเล็กลง" → scaleFactor: 0.75
- "ขยายขนาดภาพ/วัตถุใหญ่ขึ้น" → scaleFactor: 1.35
- "ทำภาพเป็นโทนสีเย็น Cyberpunk" → hue: -40, saturation: 35, contrast: 20
- "ปรับแสงสว่างขึ้น" → brightness: 30
- "ทำให้มืดลง" → brightness: -30
- "ลดสี / ขาวดำ" → saturation: -100`;

  try {
    const parts = [];
    if (imageBase64 && imageMimeType) {
      parts.push({ inlineData: { mimeType: imageMimeType, data: imageBase64 } });
    }
    parts.push({ text: prompt });

    const response = await genaiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts }],
      config: { temperature: 0.2, maxOutputTokens: 512 }
    });

    const rawText = response.text?.trim() || '{}';
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { explanation: 'ไม่สามารถแปลคำสั่งแต่งรูปได้' };
  } catch (err) {
    console.error('Image AI Command Error:', err);
    throw err;
  }
}
