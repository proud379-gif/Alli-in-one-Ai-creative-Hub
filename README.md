# ⚡ AllInStudio - All-in-One AI Suite

**AllInStudio** คือเว็บแอปพลิเคชัน AI ครบวงจรระดับ Ultra-luxe ที่รวบรวม 4 โมดูลหลักไว้ในที่เดียว:

1. 💬 **AI Chat Hub (ChatGPT Ultra)**: สนทนา ถาม-ตอบ ค้นหาข้อมูล Real-time ด้วย Google Search, อัปโหลดรูปวิเคราะห์ (Multimodal), รองรับข้อความไม่จำกัดความยาว
2. 🎥 **AI Video Studio**: ตัดต่อคลิปด้วย AI (Auto Subtitles ไทย/อังกฤษ, Auto-trim 95%, Visual Filters, Script-to-Video)
3. 🎨 **AI Image Studio**: แต่งรูปด้วย Canvas + สั่ง AI (ปรับความสว่าง/คมชัด, หมุน/พลิก, **ปรับขนาดหน้าเล็ก/หน้าใหญ่**, Preset Filters)
4. 📊 **AI Slide Deck Designer**: ให้ AI ออกแบบสไลด์ Presentation ให้อัตโนมัติ พร้อมธีมสุดตึงและโหมดพรีเซนต์เต็มจอ

---

## 🚀 วิธีการติดตั้งและรันใช้งาน

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รันในโหมดพัฒนา (Development)
npm run dev

# 3. บิลด์สำหรับ Production
npm run build
```

---

## 📌 วิธีนำขึ้น GitHub (Push to GitHub)

หากคุณมี GitHub Repository แล้ว สามารถรันคำสั่งด้านล่างใน Terminal:

```bash
# 1. เพิ่ม Remote Repository (เปลี่ยน YOUR_USERNAME เป็นบัญชี GitHub ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/AllInStudio.git

# 2. เปลี่ยนชื่อ Branch หลักเป็น main
git branch -M main

# 3. Push โค้ดทั้งหมดขึ้น GitHub
git push -u origin main
```
