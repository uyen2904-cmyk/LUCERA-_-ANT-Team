import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Globe,
  Building2,
  ShieldAlert,
  Gamepad2,
  Shirt,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Sun,
  Moon,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playTabSwitch } from '../utils/soundEffects';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const { isVi, toggleLanguage } = useLanguage();
  const lang = isVi ? 'vi' : 'en';
  const [activeSection, setActiveSection] = useState<'hq' | 'scanner' | 'games' | 'roblox' | 'rules'>('hq');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A0D1E]/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#1C1A38] via-[#24204A] to-[#15132B] rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/50 text-white my-4 flex flex-col max-h-[90vh]"
        >
          {/* TOP HEADER */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-600/30 via-purple-600/20 to-cyan-600/20 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif] text-white">
                    {lang === 'vi' ? 'Sổ Tay Thám Tử Lucera' : 'Lucera Cyber Detective Manual'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-500/30 text-orange-300 border border-orange-400/40 uppercase">
                    Bilingual EN / VI
                  </span>
                </div>
                <p className="text-xs text-orange-200 mt-0.5">
                  {lang === 'vi'
                    ? 'Hướng dẫn toàn diện: Trụ sở 3D, tiếp nhận vụ án, phân tích link & minigame'
                    : 'Complete guide: 3D Headquarters, client scam decoding, URL forensics & minigames'}
                </p>
              </div>
            </div>

            {/* Language Switcher & Close */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playTabSwitch();
                  toggleLanguage();
                }}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                title={lang === 'vi' ? 'Đổi toàn bộ sang Tiếng Anh' : 'Switch entire app to Vietnamese'}
              >
                <span>{lang === 'vi' ? '🇻🇳 ➔ 🇬🇧' : '🇬🇧 ➔ 🇻🇳'}</span>
                <span>{lang === 'vi' ? 'ĐỔI TIẾNG ANH' : 'SWITCH VIETNAMESE'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SECTION NAV TABS */}
          <div className="flex items-center gap-2 p-3 bg-black/20 border-b border-white/10 overflow-x-auto no-scrollbar text-xs font-bold">
            <button
              onClick={() => setActiveSection('hq')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeSection === 'hq'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{lang === 'vi' ? '1. Trụ Sở 3D & Vụ Án' : '1. 3D HQ & Cases'}</span>
            </button>

            <button
              onClick={() => setActiveSection('scanner')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeSection === 'scanner'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === 'vi' ? '2. Soi Link Lừa Đảo' : '2. URL Scam Forensics'}</span>
            </button>

            <button
              onClick={() => setActiveSection('games')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeSection === 'games'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>{lang === 'vi' ? '3. Khu Minigames' : '3. Minigames Arena'}</span>
            </button>

            <button
              onClick={() => setActiveSection('roblox')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeSection === 'roblox'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Shirt className="w-4 h-4" />
              <span>{lang === 'vi' ? '4. Nhân Vật Roblox' : '4. Roblox Avatar'}</span>
            </button>

            <button
              onClick={() => setActiveSection('rules')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all flex-shrink-0 ${
                activeSection === 'rules'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'vi' ? '5. 5 Luật Vàng An Toàn' : '5. Golden Rules'}</span>
            </button>
          </div>

          {/* CONTENT BODY */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed text-gray-200">
            {/* SECTION 1: 3D HQ & CASES */}
            {activeSection === 'hq' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-orange-400" />
                    {lang === 'vi'
                      ? 'Trụ Sở Thám Tử 3D & Tiếp Nhận Khách Hàng'
                      : '3D Detective Headquarters & Client Case Investigations'}
                  </h3>
                  <p className="text-xs text-orange-200">
                    {lang === 'vi'
                      ? 'Trụ sở là nơi chỉ huy của bạn. Tại đây, các nạn nhân và công dân mang các đường link nghi ngờ đến cầu cứu. Bạn sẽ dùng máy giải mã lượng tử để bảo vệ họ!'
                      : 'The Headquarters is your command center. Citizens and victims visit your desk with suspicious links and messages. You decode and protect them!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="font-black text-amber-300 flex items-center gap-2 text-sm">
                      <span>☀️ / 🌙</span>
                      <span>{lang === 'vi' ? 'Chỉnh Ngày & Đêm (Day / Night)' : 'Day / Night Cycle'}</span>
                    </div>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Nút gạt phía trên màn hình Trụ Sở cho phép bạn chuyển đổi giữa: Ban Ngày Công Nghệ (Cyber Daylight ngập tràn nắng vàng) và Ban Đêm Cyberpunk (Neon Cyber Night lung linh ánh đèn và bảng quảng cáo neon).'
                        : 'Use the toggle at the top of the HQ to switch between Cyber Daylight (warm sunlight streaming over futuristic skyscrapers) and Neon Cyber Night (starry night with glowing neon billboards and hologram monitors).'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="font-black text-cyan-300 flex items-center gap-2 text-sm">
                      <span>🎥 / 🎨</span>
                      <span>{lang === 'vi' ? 'Xoay Nhìn 3D & Trang Trí Trụ Sở' : '3D Look-Around & HQ Decor'}</span>
                    </div>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Dùng chuột kéo (hoặc vuốt màn hình cảm ứng) để xoay phòng 3D tự do nhìn khắp không gian! Bấm nút "Trang Trí Trụ Sở" để tùy biến 9 hạng mục: Bàn chỉ huy, Thảm sàn công nghệ, Màn hình radar thế giới, Cây cảnh sinh thái, Máy tiện ích (Bloxy Cola/Coffee/Server/Arcade), Linh vật trợ thủ (Kiến Cam/Doge/Drone/Kitty) và Góc nhìn cửa sổ Skyline!'
                        : 'Drag mouse or swipe on touchscreens to look around the 3D room in all directions! Use camera angle presets (Desk, Cases, Radar, Vista) or enable Auto-Orbit. Click "Decor Studio" to customize 9 interactive slots: Command Desk, Floor Zone Rug, Wall Displays, Cyber Plants, Office Amenities (Bloxy Cola/Coffee Bot/Server/Arcade), Pets (Orange Ant/Cyber Doge/Recon Drone/Mecha Kitty), and Skyline Vistas!'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="font-black text-rose-300 flex items-center gap-2 text-sm">
                      <span>🔍</span>
                      <span>{lang === 'vi' ? 'Tiếp Nhận & Giải Mã Vụ Án' : 'Investigating Client Cases'}</span>
                    </div>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Bấm vào bất kỳ khách hàng nào đang đợi tại phòng chờ. Đọc kỹ câu chuyện, bấm "Mở Máy Giải Mã", vạch trần các dấu hiệu lừa đảo (tên miền giả mạo, ép buộc thời gian, không có HTTPS) và nhận Xu + Điểm XP thưởng!'
                        : 'Click on any citizen in the waiting queue. Read their dilemma, launch the Holo-Decoder, tag the phishing red flags (typosquatting, urgency, fake TLD), and claim Coins + Cyber XP!'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="font-black text-emerald-300 flex items-center gap-2 text-sm">
                      <span>🐜</span>
                      <span>{lang === 'vi' ? 'Kiến Sáng FPT Đồng Hành' : 'FPT Orange Ant Companion'}</span>
                    </div>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Chú kiến màu cam mang râu đèn phát sáng tri thức luôn bay lượn bên cạnh bạn để đưa ra những lời khuyên thông minh và động viên bạn hoàn thành các nhiệm vụ.'
                        : 'The vibrant FPT Orange mascot with glowing knowledge bulb antennae hovers beside you to provide smart cyber advice and moral support.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: SCANNER FORENSICS */}
            {activeSection === 'scanner' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-5 h-5 text-cyan-400" />
                    {lang === 'vi' ? 'Nguyên Tắc Bóc Trần Link Lừa Đảo' : 'Anatomy of Scam Links & Phishing Forensics'}
                  </h3>
                  <p className="text-xs text-cyan-200">
                    {lang === 'vi'
                      ? 'Kẻ gian thường tạo ra những đường link trông rất giống các ngân hàng hoặc nền tảng nổi tiếng. Dưới đây là cách bạn phát hiện ra chúng trong 3 giây!'
                      : 'Scammers forge URLs resembling famous banks and apps. Here is how you identify traps within 3 seconds!'}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-black">01</span>
                    <div>
                      <strong className="text-white block text-sm">
                        {lang === 'vi' ? 'Soi Tên Miền Chính (Domain Name)' : 'Inspect the Root Domain'}
                      </strong>
                      <p className="text-gray-300 mt-1">
                        {lang === 'vi'
                          ? 'Đừng nhìn vào phần đầu link! Hãy nhìn vào phần nằm ngay trước dấu gạch chéo đầu tiên `/`. Ví dụ: `vietcombank.com.vn-xacminh.xyz/login` thì tên miền thật là `vn-xacminh.xyz`, hoàn toàn KHÔNG PHẢI Vietcombank!'
                          : 'Never be fooled by subdomains! Check what sits right before the first slash `/`. In `vietcombank.com.vn-verify.xyz/login`, the real domain is `vn-verify.xyz`, NOT Vietcombank!'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-black">02</span>
                    <div>
                      <strong className="text-white block text-sm">
                        {lang === 'vi' ? 'Đuôi Tên Miền Độc Hại (Suspicious TLD)' : 'Suspicious Top-Level Domains (TLDs)'}
                      </strong>
                      <p className="text-gray-300 mt-1">
                        {lang === 'vi'
                          ? 'Các ngân hàng uy tín dùng `.com`, `.vn`, `.com.vn`. Kẻ lừa đảo thường mua đuôi giá rẻ như `.xyz`, `.top`, `.tk`, `.site`, `.fun`, `.vip`.'
                          : 'Legit institutions use `.com` or country domains like `.gov`, `.edu`, `.vn`. Phishers register ultra-cheap TLDs like `.xyz`, `.top`, `.tk`, `.site`, `.fun`, `.vip`.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 font-black">03</span>
                    <div>
                      <strong className="text-white block text-sm">
                        {lang === 'vi' ? 'Chiêu Trò Cố Tình Viết Sai (Typosquatting)' : 'Typosquatting & Lookalike Letters'}
                      </strong>
                      <p className="text-gray-300 mt-1">
                        {lang === 'vi'
                          ? 'Thay chữ cái giống nhau: `robl0x` (số 0 thay chữ o), `faccebook` (thừa chữ c), `g00gle`. Luôn gõ trực tiếp tên miền vào thanh địa chỉ thay vì nhấp qua tin nhắn lạ.'
                          : 'Swapping letters: `robl0x` (zero instead of o), `paypa1` (one instead of l). Always type official domains directly instead of tapping strange SMS links.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: GAMES */}
            {activeSection === 'games' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/10 border border-purple-500/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-2">
                    <Gamepad2 className="w-5 h-5 text-purple-400" />
                    {lang === 'vi' ? 'Đấu Trường Minigames Luyện Trí Tuệ' : 'Cyber Minigames Arena'}
                  </h3>
                  <p className="text-xs text-purple-200">
                    {lang === 'vi'
                      ? '6 trò chơi tương tác vừa giải trí vừa rèn luyện phản xạ phát hiện lừa đảo, mang về hàng ngàn xu để nâng cấp nhân vật Roblox!'
                      : '6 interactive games combining fun and fast reflexes to earn thousands of coins for your Roblox character!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-orange-400 font-black block text-sm mb-1">
                      🔍 Scam Spotter (Soi Bẫy)
                    </span>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Chạm vào 3 dấu hiệu lừa đảo ẩn trong email hoặc tin nhắn SMS trước khi thời gian đếm ngược kết thúc.'
                        : 'Tap 3 hidden scam signals in SMS or email screens before the countdown timer hits zero.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-cyan-400 font-black block text-sm mb-1">
                      ✂️ URL Slicer (Chém Tên Miền)
                    </span>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Cắt bỏ phần đuôi giả mạo `.xyz` hoặc subdomain lừa đảo để bảo vệ người dùng.'
                        : 'Slice away malicious subdomains and fake suffixes to isolate the dangerous part.'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-amber-400 font-black block text-sm mb-1">
                      ⚡ Reaction Hunter (Bắt Bẫy Phản Xạ)
                    </span>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Bấm CHẶN ngay khi link độc hại xuất hiện, tránh bấm nhầm link an toàn!'
                        : 'Smash BLOCK when a malicious URL pops up, but never block legitimate services!'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-pink-400 font-black block text-sm mb-1">
                      🧠 Cyber Quiz (Đấu Trí An Ninh)
                    </span>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? '10 câu hỏi tình huống thực tế thường gặp trong đời sống: OTP, cuộc gọi mạo danh công an, link trúng thưởng.'
                        : '10 practical cybersecurity scenarios: OTP security, courier calls, deepfake voice scams.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: ROBLOX AVATAR */}
            {activeSection === 'roblox' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/10 border border-orange-500/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-2">
                    <Shirt className="w-5 h-5 text-orange-400" />
                    {lang === 'vi' ? 'Nhân Vật Khối Roblox & Tủ Đồ' : 'Roblox Blocky Avatar & Wardrobe'}
                  </h3>
                  <p className="text-xs text-orange-200">
                    {lang === 'vi'
                      ? 'Hóa thân thành thám tử Roblox R6/R15 huyền thoại với nốt stud kinh điển và vô số trang phục rực rỡ!'
                      : 'Transform into a legendary Roblox R6/R15 cyber detective with the classic stud and vibrant outfits!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <strong className="text-white block text-sm mb-1">👔 {lang === 'vi' ? 'Trang Phục' : 'Outfits'}</strong>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Áo khoác cam FPT, vest thám tử lịch lãm, giáp Neon Cyber, hoodie Harajuku và đồ Noob cổ điển.'
                        : 'FPT vibrant orange hoodie, detective trench, neon cyber armor, and classic Noob blue shirt.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <strong className="text-white block text-sm mb-1">🎩 {lang === 'vi' ? 'Mũ & Kính' : 'Hats & Visors'}</strong>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Mũ phớt thám tử Fedora, nón snapback Roblox đỏ, tai mèo neon, kính AR Scanner và kính râm.'
                        : 'Detective fedora, classic red Roblox cap, cyber cat headset, AR scan visor, and cool shades.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <strong className="text-white block text-sm mb-1">🧃 {lang === 'vi' ? 'Đồ Cầm Tay' : 'Gears & Bloxy'}</strong>
                    <p className="text-gray-300">
                      {lang === 'vi'
                        ? 'Lon Bloxy Cola sủi bọt, kính lúp phóng đại, máy tính bảng hologram và Cúp Vàng Bloxy Award.'
                        : 'Fizzy Bloxy Cola can, detective magnifying glass, holographic pad, and Golden Bloxy Award.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: GOLDEN RULES */}
            {activeSection === 'rules' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30">
                  <h3 className="text-base font-black text-white flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    {lang === 'vi' ? '5 Nguyên Tắc Vàng An Toàn Không Gian Mạng' : '5 Golden Rules of Cyber Defense'}
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {lang === 'vi'
                      ? 'Khắc cốt ghi tâm 5 quy tắc này để bảo vệ bản thân và gia đình trước mọi chiêu trò tinh vi!'
                      : 'Memorize these 5 iron rules to protect yourself and your family against cyber criminals!'}
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                    <span className="text-xl">1️⃣</span>
                    <span className="text-emerald-100 font-semibold">
                      {lang === 'vi'
                        ? 'KHÔNG BAO GIỜ chia sẻ mã OTP hoặc mật khẩu cho bất kỳ ai, kể cả người tự xưng là nhân viên ngân hàng hay công an.'
                        : 'NEVER share your OTP code or password with anyone, including bank staff or police.'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                    <span className="text-xl">2️⃣</span>
                    <span className="text-emerald-100 font-semibold">
                      {lang === 'vi'
                        ? 'KHÔNG nhấp vào đường link lạ trong tin nhắn SMS thông báo trúng thưởng, khóa tài khoản hoặc hoàn tiền.'
                        : 'NEVER click strange SMS links claiming prize rewards, account suspension, or tax refunds.'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                    <span className="text-xl">3️⃣</span>
                    <span className="text-emerald-100 font-semibold">
                      {lang === 'vi'
                        ? 'KIỂM TRA KỸ TÊN MIỀN trước khi gõ bất kỳ thông tin cá nhân nào vào trang web.'
                        : 'ALWAYS verify the root domain URL before typing your personal credentials.'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                    <span className="text-xl">4️⃣</span>
                    <span className="text-emerald-100 font-semibold">
                      {lang === 'vi'
                        ? 'CẢNH GIÁC với sự hối thúc: Kẻ lừa đảo luôn dọa nạt "trong 30 phút", "ngay lập tức" để bạn hoảng sợ.'
                        : 'BEWARE of artificial urgency: Scammers always push you with phrases like "within 30 minutes" or "act immediately".'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                    <span className="text-xl">5️⃣</span>
                    <span className="text-emerald-100 font-semibold">
                      {lang === 'vi'
                        ? 'DÙNG CÔNG CỤ LUCERA để soi link hoặc hỏi người thân có kiến thức trước khi hành động!'
                        : 'USE LUCERA SCANNER to check links and consult tech-savvy relatives before taking risky actions!'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-4 bg-black/30 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">
              {lang === 'vi' ? 'LUCERA • Trụ Sở Thám Tử Chống Lừa Đảo Số' : 'LUCERA • Anti-Fraud Cyber Detective Agency'}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black shadow-md transition-all active:scale-98"
            >
              {lang === 'vi' ? 'Đã Hiểu, Quay Lại Trụ Sở!' : 'Got it, Back to HQ!'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
