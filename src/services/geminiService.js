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
 * รองรับ Streaming + Multimodal (Text + Image)
 */
export async function sendChatMessage(history, newMessage, modelId, useWebSearch, onStream, imageBase64 = null, imageMimeType = null) {
  if (!genaiClient) throw new Error('GEMINI_NOT_INITIALIZED');

  const geminiModelName = resolveModelName(modelId);
  const tools = useWebSearch ? [{ googleSearch: {} }] : [];

  const systemInstruction = `คุณคือ NovaAI Assistant ผู้ช่วย AI ระดับสูงสุดของ NovaAI Studio
ตอบคำถามได้ทุกภาษา โดยเฉพาะภาษาไทยและภาษาอังกฤษ
เมื่อผู้ใช้ส่งรูปภาพมา ให้วิเคราะห์รูปอย่างละเอียดและตอบคำถามที่เกี่ยวข้อง
เมื่อค้นหาข้อมูลจากอินเตอร์เน็ต ให้อ้างอิงแหล่งที่มาด้วยเสมอ
ตอบแบบละเอียด ชัดเจน มีความเป็นมืออาชีพสูงสุด ไม่มีข้อจำกัดด้านความยาวคำตอบ`;

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
        temperature: 0.8,
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
      if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks?.length > 0) {
        groundingChunks = chunk.candidates[0].groundingMetadata.groundingChunks;
        usedSearch = true;
      }
    }

    return { text: fullText, usedSearch, groundingChunks };
  } catch (err) {
    console.error('Gemini API Error:', err);
    throw err;
  }
}

/**
 * ส่งคำสั่ง AI สำหรับแต่งรูปภาพ
 * แปลงคำสั่งภาษาไทย/อังกฤษ → JSON ค่าปรับแต่ง filter
 */
export async function sendImageEditCommand(command, imageBase64, imageMimeType) {
  if (!genaiClient) throw new Error('GEMINI_NOT_INITIALIZED');

  const prompt = `คุณเป็น AI ผู้เชี่ยวชาญด้านการแต่งรูปภาพ
ผู้ใช้ส่งรูปภาพและคำสั่ง: "${command}"

วิเคราะห์คำสั่งและตอบกลับเป็น JSON เท่านั้น ห้ามมีข้อความอื่น ในรูปแบบ:
{
  "brightness": 0,
  "contrast": 0,
  "saturation": 0,
  "hue": 0,
  "blur": 0,
  "sharpness": 0,
  "faceScale": 1.0,
  "explanation": "คำอธิบายภาษาไทย"
}

ค่าแต่ละตัวมีช่วง:
- brightness: -100 ถึง 100 (0 = ไม่เปลี่ยน, บวก = สว่างขึ้น, ลบ = มืดลง)
- contrast: -100 ถึง 100
- saturation: -100 ถึง 100 (ลบ = ลดสี, บวก = เพิ่มสี)
- hue: -180 ถึง 180 (หมุนสี)
- blur: 0 ถึง 20 (0 = ไม่เบลอ)
- sharpness: 0 ถึง 100
- faceScale: 0.5 ถึง 2.0 (1.0 = ไม่เปลี่ยน, น้อยกว่า 1 = หน้าเล็กลง, มากกว่า 1 = หน้าใหญ่ขึ้น)

ตัวอย่างการแปลคำสั่ง:
- "ทำหน้าเล็กลง" → faceScale: 0.75
- "ทำหน้าใหญ่ขึ้น" → faceScale: 1.3
- "ปรับแสงสว่างขึ้น" → brightness: 30
- "ทำให้มืดลง" → brightness: -30
- "เพิ่มความคมชัด" → contrast: 25, sharpness: 40
- "ลดสี / ขาวดำ" → saturation: -100
- "เพิ่มสีสันสดใส" → saturation: 50, brightness: 10
- "เบลอ background" → blur: 8`;

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
    return { explanation: 'ไม่สามารถแปลคำสั่งได้' };
  } catch (err) {
    console.error('Image AI Command Error:', err);
    throw err;
  }
}
