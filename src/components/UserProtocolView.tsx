import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Monitor,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  ExternalLink,
  Volume2,
  VolumeX,
  Radio,
  Cpu
} from 'lucide-react';
import { NavTab } from '../types';
import { playGlitchSound, playTabSwitch } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export type ProtocolModuleId = NavTab | 'music';

interface UserProtocolViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenMusic?: () => void;
}

type ScreenColorMode = 'green' | 'amber' | 'cyan';

interface ProtocolSectionDetail {
  id: ProtocolModuleId;
  number: string;
  badgeVi: string;
  badgeEn: string;
  codeNameVi: string;
  codeNameEn: string;
  titleVi: string;
  titleEn: string;
  icon: string;
  shortDescVi: string;
  shortDescEn: string;
  purposeVi: string;
  purposeEn: string;
  howToUseVi: string[];
  howToUseEn: string[];
  howToIdentifyVi: string[];
  howToIdentifyEn: string[];
  importantNotesVi: string[];
  importantNotesEn: string[];
  proTipsVi: string[];
  proTipsEn: string[];
  keyStatsVi: { label: string; value: string }[];
  keyStatsEn: { label: string; value: string }[];
}

const PROTOCOL_SECTIONS: ProtocolSectionDetail[] = [
  {
    id: 'hq',
    number: '01',
    badgeVi: 'CHỈ HUY 3D',
    badgeEn: '3D COMMAND',
    codeNameVi: 'TRỤ_SỞ_CHỈ_HUY_3D',
    codeNameEn: '3D_HEADQUARTERS',
    titleVi: 'Trụ Sở 3D • Phòng Chỉ Huy Điệp Viên',
    titleEn: '3D Headquarters • Detective Command Center',
    icon: '🏛️',
    shortDescVi: 'Trung tâm chỉ huy điệp viên 3D tương tác đa chiều, đổi tên căn cứ, quầy đồ ăn buffet tiếp sức và mô hình điệp viên sống động.',
    shortDescEn: 'Interactive 3D detective command center featuring customizable base neon signs, food buffet, and real-time agent model.',
    purposeVi: 'Cung cấp không gian mô phỏng phòng làm việc điều tra viên công nghệ cao, nơi quản lý căn cứ cá nhân, tương tác các trạm thiết bị và thư giãn với quầy ẩm thực Buffet :3.',
    purposeEn: 'Simulates a high-tech detective bureau where you manage your private base, access terminal equipment, and recharge at the snack buffet :3.',
    howToUseVi: [
      'Xoay góc nhìn 3D (Pan / Orbit) bằng chuột hoặc chạm tay để quan sát 360 độ toàn bộ phòng làm việc.',
      'Bấm nút "✏️ Đổi Tên Trụ Sở" trên thanh điều khiển hoặc click trực tiếp vào Biển Neon 3D để cá nhân hóa căn cứ theo tên của bạn.',
      'Click vào đĩa đồ ăn "Ăn vặt :3" trên bàn làm việc hoặc nút khói bay (♨️) để nhân vật điệp viên nạp năng lượng măm măm vui nhộn.',
      'Bật góc phát nhạc "Music with hacker :3" (🎧) ở góc dưới màn hình hoặc thanh trên để chọn nhạc từ cực mạnh tới nhẹ thư giãn & nhạc anime khi phá án.',
      'Click vào Trạm Radar Máy Chủ hoặc Tủ đồ Điệp Viên trong phòng 3D để nhảy nhanh vào các khu chức năng tương ứng.'
    ],
    howToUseEn: [
      'Rotate the 3D viewport (Pan / Orbit) via mouse drag or touch to observe the full 360-degree command bureau.',
      'Click the "Rename HQ" button or tap the 3D Neon Sign directly to personalize the base name.',
      'Click on the snack platter on the desk to trigger fun character eating animations and celebrations.',
      'Open the "Music with hacker :3" floating audio console (🎧) to pick from intense beats, anime songs, or relaxing Study With Me tracks.',
      'Click on the server terminal or wardrobe stations inside the 3D room for rapid navigation.'
    ],
    howToIdentifyVi: [
      'Mọi dữ liệu tên trụ sở và trạng thái được lưu trữ an toàn tại trình duyệt cá nhân (cục bộ 100%), không truyền ra máy chủ ngoài.',
      'Các trạm máy chủ trong phòng hiển thị đèn xanh xác nhận hệ thống phòng thủ cục bộ đang kích hoạt tối đa.'
    ],
    howToIdentifyEn: [
      'All headquarters data and personal settings are kept 100% locally on your browser without external server transmission.',
      'Server indicators inside the 3D room glow green to confirm maximum local security defense.'
    ],
    importantNotesVi: [
      'Tên trụ sở sau khi lưu sẽ tự động đồng bộ lên Biển Hiệu Hologram 3D phát sáng rực rỡ.',
      'Có nhiều gợi ý tên độc đáo: "LUCERA PRIME CITADEL", "Trụ Sở Điệp Viên Bóng Đêm", "Tiệm Phá Án & Trà Sữa :3".'
    ],
    importantNotesEn: [
      'Your customized headquarters name automatically synchronizes onto the glowing 3D Hologram signboard.',
      'Preset suggestions include: "LUCERA PRIME CITADEL", "Shadow Detective Bureau", "Cyber Investigation & Boba Tea :3".'
    ],
    proTipsVi: [
      'Hãy thử bấm vào đĩa Tacos giòn bò cay trên bàn điệp viên để nhận pháo hoa ăn mừng và hiệu ứng âm thanh sống động!'
    ],
    proTipsEn: [
      'Try clicking on the spicy taco platter on the desk to unlock celebration confetti and cheerful sound effects!'
    ],
    keyStatsVi: [
      { label: 'Không gian', value: '3D Thời Gian Thực' },
      { label: 'Tương tác', value: 'Đồ Ăn & Biển Neon' },
      { label: 'Bảo mật', value: '100% Cục Bộ' }
    ],
    keyStatsEn: [
      { label: 'Environment', value: 'Real-time 3D' },
      { label: 'Interactivity', value: 'Snacks & Neon Sign' },
      { label: 'Security', value: '100% Local' }
    ]
  },
  {
    id: 'home',
    number: '02',
    badgeVi: 'TRẠM PHÒNG THỦ',
    badgeEn: 'DEFENSE HUB',
    codeNameVi: 'TRẠM_AN_TOÀN_ĐIỀU_PHỐI',
    codeNameEn: 'SAFETY_LAB_COORDINATOR',
    titleVi: 'Trạm An Toàn • Phòng Phân Tích An Toàn Số',
    titleEn: 'Safety Lab • Cyber Threat Defense Center',
    icon: '🧪',
    shortDescVi: 'Tổng hành dinh điều phối, hiển thị radar an ninh khẩn cấp, các cảnh báo thủ đoạn lừa đảo mới nhất và thanh quét nhanh siêu tốc.',
    shortDescEn: 'Main coordination headquarters displaying emergency threat radars, recent fraud alerts, and an instant scanner bar.',
    purposeVi: 'Nắm bắt toàn cảnh nguy cơ mạng tại Việt Nam, theo dõi các chiêu trò lừa đảo mạo danh ngân hàng/công an đang nóng sốt và kích hoạt quét bảo vệ tức thì.',
    purposeEn: 'Provides an overview of current digital scam trends, tracks high-risk bank/police impersonations, and offers immediate inspection tools.',
    howToUseVi: [
      'Nhập bất kỳ đường link đáng ngờ hoặc số điện thoại lạ vào ô "Quét Siêu Tốc" ngay trên biểu ngữ trung tâm.',
      'Đọc các bản tin tình báo lừa đảo được phân loại theo mức độ Rủi Ro Cao (Đỏ), Đáng Ngờ (Vàng), An Toàn (Xanh).',
      'Xem nhanh trạng thái chuỗi điểm danh hàng ngày và cấp bậc điệp viên hiện tại.'
    ],
    howToUseEn: [
      'Type or paste any suspicious web address or unknown phone number into the Quick Scanner bar on the main banner.',
      'Review intelligence bulletins categorized by severity: High Risk (Red), Suspicious (Yellow), Safe (Green).',
      'Quickly inspect your daily check-in streak and current agent rank.'
    ],
    howToIdentifyVi: [
      'Phát hiện dấu hiệu "Tạo cảm giác khẩn cấp": Các tin nhắn thúc giục "Tài khoản sẽ bị khóa trong 2 giờ" 99% là lừa đảo.',
      'Nhận diện các đường link rút gọn (bit.ly, tinyurl, s.id) che giấu tên miền độc hại phía sau.'
    ],
    howToIdentifyEn: [
      'Spot artificial urgency: Messages demanding immediate action like "Your account will be locked in 2 hours" are 99% scams.',
      'Unmask short links (bit.ly, tinyurl, s.id) designed to conceal dangerous underlying domains.'
    ],
    importantNotesVi: [
      'Không bao giờ bấm trực tiếp vào link trong tin nhắn SMS mạo danh thương hiệu.',
      'Hãy sao chép link và dán vào Trạm An Toàn để phân tích an toàn trước khi mở.'
    ],
    importantNotesEn: [
      'Never tap directly on links embedded inside SMS brand impersonation messages.',
      'Copy the link and test it inside Safety Lab first before considering opening it.'
    ],
    proTipsVi: [
      'Nút "Quét Nhanh" tại Trạm An Toàn sẽ tự động chuyển thẳng sang màn hình Quét Chi Tiết với phân tích từng đoạn URL.'
    ],
    proTipsEn: [
      'The Quick Scan button will automatically direct you into the deep Scanner with full URL component breakdowns.'
    ],
    keyStatsVi: [
      { label: 'Tốc độ quét', value: '< 0.3 Giây' },
      { label: 'Dữ liệu', value: 'Cập nhật 2026' },
      { label: 'Bộ lọc', value: 'Phân Tích Cục Bộ' }
    ],
    keyStatsEn: [
      { label: 'Scan Speed', value: '< 0.3 Seconds' },
      { label: 'Database', value: 'Updated 2026' },
      { label: 'Analysis', value: '100% On-Device' }
    ]
  },
  {
    id: 'scanner',
    number: '03',
    badgeVi: 'TRA CỨU & QUÉT',
    badgeEn: 'SCANNER',
    codeNameVi: 'TRẠM_QUÉT_SOI_LINK_SĐT',
    codeNameEn: 'LINK_PHONE_SCANNER',
    titleVi: 'Quét Link & SĐT • Trạm Phân Tích Đường Dẫn & Số Điện Thoại',
    titleEn: 'Link & Phone Scanner • URL & Phone Threat Analyzer',
    icon: '📡',
    shortDescVi: 'Bộ máy bóc tách URL chuyên sâu: Kiểm tra sai chính tả cố ý, giả mạo HTTPS, domain cấp 1, đuôi tên miền độc hại và tra cứu SĐT lừa đảo.',
    shortDescEn: 'Deep URL decomposition engine: Checks typosquatting, deceptive HTTPS, top-level domains, malicious extensions, and known scam phone numbers.',
    purposeVi: 'Giải mã cấu trúc chi tiết của đường link hoặc số điện thoại, chỉ rõ ĐOẠN NÀO BỊ LỪA ĐẢO bằng màu sắc trực quan (Đỏ / Vàng / Xanh) kèm lý do khoa học.',
    purposeEn: 'Explains the exact anatomy of links and phone numbers, highlighting dangerous segments with intuitive visual cues (Red / Yellow / Green).',
    howToUseVi: [
      'Dán đường dẫn website hoặc số điện thoại (+84, 09xx, 024xx, 028xx) vào ô tìm kiếm.',
      'Bấm "PHÂN TÍCH CHUYÊN SÂU" hoặc nhấn Enter.',
      'Đọc kết quả: Điểm rủi ro (0-100), Tên thương hiệu bị mạo danh, Các cờ vi phạm, và Lời khuyên hành động khẩn cấp.',
      'Bấm vào các nút mẫu thử nghiệm để trải nghiệm kịch bản giả lập thực tế.'
    ],
    howToUseEn: [
      'Paste any URL or phone number (+84, 09xx, 024xx, 028xx) into the input field.',
      'Click "DEEP ANALYSIS" or press Enter.',
      'Examine the risk score (0-100), impersonated brand name, triggered violation flags, and action recommendations.',
      'Click interactive scenario samples to test simulated real-world cases.'
    ],
    howToIdentifyVi: [
      'Cách nhận biết sai chính tả cố ý (Typosquatting): Kẻ gian thêm bớt ký tự (ví dụ: vietcombankk, vcb-ebank, fpt-shop.site) để đánh lừa mắt thường.',
      'Cách phân biệt HTTPS: Ký hiệu ổ khóa HTTPS chỉ chứng minh đường truyền được mã hóa, KHÔNG ĐỒNG NGHĨA với website chân chính!',
      'Đuôi tên miền lạ: Cẩn giác cao độ với đuôi .vip, .top, .xyz, .cc, .tk khi mạo danh ngân hàng hoặc cơ quan nhà nước (.gov.vn).'
    ],
    howToIdentifyEn: [
      'Spot typosquatting: Scammers add or swap letters (e.g. vietcombankk, vcb-ebank, fpt-shop.site) to trick visual scanning.',
      'Distinguish HTTPS: A padlock icon merely denotes encryption in transit; it does NOT verify the legitimacy of the recipient!',
      'Watch unusual TLDs: Be extremely wary of .vip, .top, .xyz, .cc, .tk masquerading as banks or government agencies (.gov.vn).'
    ],
    importantNotesVi: [
      'Tuyệt đối không nhập mật khẩu, mã OTP, số CCCD vào bất kỳ website nào bị cảnh báo ĐỎ (Nguy hiểm).',
      'Nếu lỡ bấm vào, hãy ngắt kết nối mạng ngay lập tức và liên hệ tổng đài ngân hàng để khóa thẻ.'
    ],
    importantNotesEn: [
      'Never input passwords, OTP codes, or identity numbers into websites flagged with a RED danger warning.',
      'If you accidentally opened a malicious site, disconnect your network immediately and notify your bank to freeze cards.'
    ],
    proTipsVi: [
      'Bộ máy phân tích của LUCERA chạy hoàn toàn trên trình duyệt của bạn, đảm bảo riêng tư 100%, không bị lộ lịch sử tra cứu ra ngoài.'
    ],
    proTipsEn: [
      'The inspection engine operates 100% client-side, ensuring complete confidentiality of your query history.'
    ],
    keyStatsVi: [
      { label: 'Phân tích', value: '8 Tầng Heuristic' },
      { label: 'Nhận diện', value: '25+ Ngân Hàng & Ví' },
      { label: 'Độ chính xác', value: '99.4%' }
    ],
    keyStatsEn: [
      { label: 'Heuristics', value: '8 Deep Layers' },
      { label: 'Coverage', value: '25+ Banks & Wallets' },
      { label: 'Accuracy', value: '99.4%' }
    ]
  },
  {
    id: 'games',
    number: '04',
    badgeVi: 'ĐẤU TRƯỜNG',
    badgeEn: 'MINI-GAMES',
    codeNameVi: 'ĐẤU_TRƯỜNG_TRÒ_CHƠI',
    codeNameEn: 'GLITCH_ZONE_ARENA',
    titleVi: 'Đấu Trường Trò Chơi • 6 Trò Chơi Rèn Luyện Phản Xạ Thực Chiến',
    titleEn: 'Glitch Zone • 6 Cyber Defense Training Mini-Games',
    icon: '🎮',
    shortDescVi: '6 Trò chơi thực chiến luyện phản xạ: Phá án tin nhắn bẫy, Soi web thật/giả, Bắn link tốc độ, Xếp hình URL, Tình huống tiến thoái lưỡng nan & Phòng thoát hiểm điệp viên.',
    shortDescEn: '6 Interactive training arenas: Clue Hunter, Real vs Fake Website, Speed Radar, URL Puzzle, Dilemma Decisions, and Escape Room.',
    purposeVi: 'Biến kiến thức an toàn thông tin khô khan thành phản xạ tự nhiên thông qua trò chơi tương tác (vừa chơi vừa kiếm Xu và XP nâng cấp nhân vật).',
    purposeEn: 'Transforms theoretical security rules into fast reflexes through engaging mini-games while earning coins and XP.',
    howToUseVi: [
      'Chọn 1 trong 6 trò chơi tại danh sách đấu trường để bắt đầu rèn luyện.',
      'Trò chơi 1 (Điệp Viên Phá Án): Click vào các từ khóa đáng ngờ trong tin nhắn SMS/Zalo để vạch trần âm mưu lừa đảo.',
      'Trò chơi 2 (Thật Hay Giả): So sánh hai màn hình song song và chỉ ra các điểm sai lệch của website giả mạo.',
      'Trò chơi 3 (Radar Phản Xạ): Phản xạ nhanh trong 5 giây xem URL hiển thị là An Toàn hay Nguy Hiểm.',
      'Trò chơi 4 (Mảnh Ghép URL): Kéo thả các thành phần giao thức, domain, path để tạo thành URL an toàn chuẩn chỉ.',
      'Trò chơi 5 (Bạn Sẽ Làm Gì): Đứng trước các tình huống hóc búa (Dọa khóa SIM, đòi mã OTP, shipper hoàn tiền) và đưa ra quyết định thông minh.',
      'Trò chơi 6 (Phòng Thoát Hiểm): Thử thách đỉnh cao giải mã 5 căn phòng bị khóa để thoát hiểm trong thời gian có hạn.'
    ],
    howToUseEn: [
      'Select any of the 6 mini-games from the game hub to begin training.',
      'Game 1 (Clue Hunter): Click suspicious keywords inside SMS/Zalo messages to expose fraud signs.',
      'Game 2 (Real vs Fake): Compare two side-by-side screens to identify counterfeit elements on spoofed pages.',
      'Game 3 (Speed Radar): Test your reflexes in 5 seconds deciding whether a link is safe or dangerous.',
      'Game 4 (URL Puzzle): Drag and assemble protocol, domain, and path blocks to build valid secure URLs.',
      'Game 5 (What Would You Do): Face real-world dilemmas (SIM locking threats, OTP demands, refund scams) and choose wisely.',
      'Game 6 (Escape Room): Crack passwords and defeat 5 locked security chambers within a strict time limit.'
    ],
    howToIdentifyVi: [
      'Âm thanh phản hồi trực tiếp: Trả lời ĐÚNG sẽ vang lên tiếng "Ting-Ting!" 🔔 vui nhộn kèm pháo hoa; Trả lời SAI sẽ có tiếng "Eeee/Bzzzt!" 🚨 để cảnh tỉnh.',
      'Tập trung vào các chi tiết then chốt: Chân trang, Số hotline sai, Đuôi miền kỳ quặc, Lỗi chính tả tiếng Việt trong văn bản kẻ lừa đảo gửi.'
    ],
    howToIdentifyEn: [
      'Audio feedback: Correct answers trigger cheerful "Ting-Ting!" 🔔 chimes and confetti; incorrect answers sound an "Eeee/Bzzzt!" 🚨 alarm.',
      'Focus on key giveaways: Footers, fake hotline numbers, bizarre TLDs, and spelling mistakes in scam messages.'
    ],
    importantNotesVi: [
      'Mỗi ván game chiến thắng sẽ cộng trực tiếp Xu và Kinh nghiệm (XP) vào Hồ sơ điệp viên.',
      'Có thể chơi lại không giới hạn để đạt chuỗi combo nhân 3 điểm số!'
    ],
    importantNotesEn: [
      'Every victory awards Coins and XP directly to your detective credentials.',
      'Replay games anytime to achieve triple combo streaks and climb the leaderboard!'
    ],
    proTipsVi: [
      'Bật góc nhạc "Music with hacker :3" chọn nhóm nhạc Mạnh hoặc Nhạc Anime để tăng nhịp độ hưng phấn khi thi đấu!'
    ],
    proTipsEn: [
      'Open the "Music with hacker :3" player and select Intense or Anime tracks to boost your energy while playing!'
    ],
    keyStatsVi: [
      { label: 'Số lượng', value: '6 Trò Chơi Độc Lập' },
      { label: 'Âm thanh', value: 'Ting Ting / Eeee' },
      { label: 'Phần thưởng', value: 'Xu & XP Vô Tận' }
    ],
    keyStatsEn: [
      { label: 'Arenas', value: '6 Unique Mini-Games' },
      { label: 'Sound FX', value: 'Ting Ting / Eeee' },
      { label: 'Rewards', value: 'Endless Coins & XP' }
    ]
  },
  {
    id: 'learn',
    number: '05',
    badgeVi: 'CẨM NANG',
    badgeEn: 'HANDBOOK',
    codeNameVi: 'CẨM_NANG_TRI_THỨC',
    codeNameEn: 'KNOWLEDGE_HUB',
    titleVi: 'Cẩm Nang An Toàn • Kho Tàng Bí Kíp & Phòng Vệ Số',
    titleEn: 'Knowledge Hub • Cybersecurity Handbook & Quizzes',
    icon: '📚',
    shortDescVi: 'Kho lưu trữ 10+ nguyên tắc vàng phòng chống lừa đảo số, kèm mini-quiz trắc nghiệm giải thích chi tiết vì sao đúng, vì sao sai.',
    shortDescEn: 'Repository of 10+ essential cyber defense principles, accompanied by interactive quizzes with deep explanations.',
    purposeVi: 'Cung cấp kiến thức nền tảng vững chắc, cập nhật các kịch bản lừa đảo công nghệ cao mới nhất (Giả giọng AI Deepfake, Mã độc chiếm quyền trợ năng, Giả mạo VNeID).',
    purposeEn: 'Provides solid defense fundamentals covering modern scam vectors: AI Voice Deepfakes, Accessibility Malwares, and Fake Gov Apps.',
    howToUseVi: [
      'Duyệt qua danh mục các chủ đề: "Quy tắc OTP", "Bẫy Giọng Nói AI Deepfake", "Tải Ứng Dụng Lạ APK", "Cuộc Gọi Video Mạo Danh Công An".',
      'Nhấn vào từng thẻ bài học để xem nội dung chi tiết và các trường hợp thực tế tại Việt Nam.',
      'Tham gia trả lời Mini-Quiz ở cuối mỗi bài học để củng cố phản xạ và nhận thêm huy hiệu học tập.'
    ],
    howToUseEn: [
      'Browse through topic categories: "OTP Rules", "AI Deepfake Voice Traps", "Rogue APK Installs", "Fake Police Video Calls".',
      'Click each lesson card to read comprehensive breakdowns and real case studies.',
      'Complete the Mini-Quiz at the end of each topic to reinforce your instincts and earn learning badges.'
    ],
    howToIdentifyVi: [
      'Nguyên tắc vàng: "CƠ QUAN NHÀ NƯỚC KHÔNG BAO GIỜ LÀM VIỆC QUA ZALO HAY ĐÒI CHUYỂN TIỀN VÀO TÀI KHOẢN CÁ NHÂN".',
      'Dấu hiệu Deepfake: Hình ảnh người gọi chập chờn, cử động môi không khớp tiếng nói, mắt ít chớp, yêu cầu chuyển tiền gấp vì đang cấp cứu/tai nạn.'
    ],
    howToIdentifyEn: [
      'Golden rule: Law enforcement agencies NEVER conduct official business over messaging apps or request transfers to private bank accounts.',
      'Deepfake clues: Video artifacts around mouth boundaries, irregular blinking, audio lag, and urgent demands for medical/emergency bail money.'
    ],
    importantNotesVi: [
      'Tuyệt đối không bật tính năng "Hỗ trợ tiếp cận" (Accessibility) trên điện thoại Android cho các ứng dụng tải ngoài kho chính thức.',
      'Mã OTP là chìa khóa két sắt cá nhân - không chia sẻ cho bất kỳ ai kể cả nhân viên tự xưng là ngân hàng.'
    ],
    importantNotesEn: [
      'Never grant Android "Accessibility Services" permissions to third-party APKs downloaded outside official stores.',
      'OTP codes are your personal vault keys - never share them with anyone, even self-proclaimed bank officers.'
    ],
    proTipsVi: [
      'Khi nghi ngờ người thân gọi vay tiền, hãy ngắt máy và gọi lại vào số điện thoại thường (không gọi qua mạng xã hội) hoặc hỏi câu hỏi bí mật mà chỉ 2 người biết.'
    ],
    proTipsEn: [
      'If a friend or relative calls urgently requesting money, hang up and dial their direct cellular number, or ask a secret question only you two know.'
    ],
    keyStatsVi: [
      { label: 'Chuyên đề', value: '10+ Bài Học Thực Chiến' },
      { label: 'Trắc nghiệm', value: 'Mini-Quiz Phản Xạ' },
      { label: 'Cập nhật', value: 'Hàng Tuần' }
    ],
    keyStatsEn: [
      { label: 'Modules', value: '10+ Practical Lessons' },
      { label: 'Quizzes', value: 'Instant Reflex Tests' },
      { label: 'Updates', value: 'Weekly Curated' }
    ]
  },
  {
    id: 'wardrobe',
    number: '06',
    badgeVi: 'KHO TRANG BỊ',
    badgeEn: 'WARDROBE',
    codeNameVi: 'TỦ_ĐỒ_ĐIỆP_VIÊN',
    codeNameEn: 'AGENT_WARDROBE',
    titleVi: 'Tủ Đồ Điệp Viên • Kho Trang Bị & Thời Trang Điệp Viên',
    titleEn: 'Agent Wardrobe • Detective Outfits & Equipment',
    icon: '🎒',
    shortDescVi: 'Tủ trang bị thời trang cho Điệp Viên Acron: Mũ điệp viên, Kính râm phát sáng, Áo khoác đặc vụ, Phụ kiện cầm tay và Linh thú đồng hành.',
    shortDescEn: 'Customization shop for Detective Acron: Agent fedoras, neon glasses, cyber tactical jackets, hand accessories, and chibi pets.',
    purposeVi: 'Tạo động lực học tập và phá án thông qua hệ sinh thái phần thưởng: Dùng tiền thưởng Xu kiếm được từ việc giải án và chơi game để mở khóa trang bị độc quyền.',
    purposeEn: 'Fosters motivation through a reward economy: Spend Coins earned from lessons and games to unlock exclusive stylish accessories.',
    howToUseVi: [
      'Chuyển đổi giữa các ngăn đồ: Mũ, Kính, Trang phục, Cầm tay, Màu da & Phong cách.',
      'Bấm "Mua Ngay" nếu bạn đủ Xu, hoặc bấm "Trang Bị" cho các món đồ đã sở hữu.',
      'Xem nhân vật Điệp Viên thay đổi trực tiếp ngay trên khung gương mô phỏng.',
      'Bật/tắt linh vật đồng hành để cùng chu du phá án khắp hệ thống.'
    ],
    howToUseEn: [
      'Switch between wardrobe categories: Hats, Glasses, Outfits, Handhelds, Skin Tones & Styles.',
      'Click "Buy" with earned Coins or "Equip" items already unlocked.',
      'Watch your 3D Agent change outfits in real time on the mirror display.',
      'Toggle pet companions to accompany you on cyber investigation missions.'
    ],
    howToIdentifyVi: [
      'Các vật phẩm có đánh dấu cấp bậc độ hiếm: Thường (Trắng), Hiếm (Xanh lam), Huyền Thoại (Vàng kim rực rỡ).',
      'Đồ trang bị được lưu vĩnh viễn vào bộ nhớ hồ sơ điệp viên của bạn.'
    ],
    howToIdentifyEn: [
      'Items feature rarity tiers: Common (White), Rare (Blue), and Legendary (Golden Glow).',
      'Purchased equipment is saved permanently into your local profile storage.'
    ],
    importantNotesVi: [
      'Không cần nạp tiền thật! 100% vật phẩm đều mua được bằng Xu thưởng kiếm từ việc hoàn thành các bài học và trò chơi.',
      'Hãy duy trì chuỗi điểm danh mỗi ngày để nhận Xu thưởng miễn phí!'
    ],
    importantNotesEn: [
      'Zero real money required! 100% of items are purchasable using in-game Coins earned through learning and playing.',
      'Maintain your daily check-in streak to collect free bonus Coins!'
    ],
    proTipsVi: [
      'Bộ trang phục "Áo Khoác Đặc Vụ" và "Kính Radar Neon" là combo được các đặc vụ kỳ cựu ưa chuộng nhất vì vẻ ngoài siêu công nghệ.'
    ],
    proTipsEn: [
      'The "Tactical Cyber Coat" and "Neon Radar Glasses" combo is a favorite among senior detectives for its futuristic aesthetic.'
    ],
    keyStatsVi: [
      { label: 'Vật phẩm', value: '25+ Món Đồ Độc Đáo' },
      { label: 'Giá trị', value: '100% Hoàn Toàn Miễn Phí' },
      { label: 'Linh vật', value: 'Bạn Đồng Hành Chibi' }
    ],
    keyStatsEn: [
      { label: 'Items', value: '25+ Unique Pieces' },
      { label: 'Cost', value: '100% Free to Earn' },
      { label: 'Pets', value: 'Chibi Mascot Companions' }
    ]
  },
  {
    id: 'profile',
    number: '07',
    badgeVi: 'HỒ SƠ MẬT VỤ',
    badgeEn: 'DOSSIER',
    codeNameVi: 'HỒ_SƠ_ĐIỆP_VIÊN',
    codeNameEn: 'AGENT_DOSSIER',
    titleVi: 'Hồ Sơ Điệp Viên • Thẻ Mật Vụ & Điểm Danh Chuỗi Ngày',
    titleEn: 'Agent Dossier • Identity Card & Daily Streaks',
    icon: '🪪',
    shortDescVi: 'Thẻ căn cước đặc vụ bảo mật: Theo dõi cấp bậc, tỷ lệ phá án chính xác, số vụ lừa đảo đã triệt phá, chuỗi điểm danh và bảng vinh danh Huy Chương.',
    shortDescEn: 'Secure detective ID card tracking agent level, accuracy rate, solved cases, daily streaks, and unlocked achievement badges.',
    purposeVi: 'Ghi nhận và tôn vinh toàn bộ quá trình rèn luyện kỹ năng của người dùng, tạo thói quen cảnh giác mỗi ngày qua tính năng Điểm danh nhận thưởng chuỗi ngày liên tục.',
    purposeEn: 'Acknowledges your ongoing vigilance training and builds daily security habits with daily check-in rewards.',
    howToUseVi: [
      'Bấm nút "⚡ Điểm Danh Ngày Mới" để cộng dồn chuỗi ngày bảo vệ và nhận ngay 25 Xu + 45 XP.',
      'Bấm nút "✏️ Chỉnh Sửa Hồ Sơ" để thay đổi Biệt danh, Mật danh đặc vụ, Châm ngôn sống hoặc Tiểu sử.',
      'Theo dõi các Huy chương danh giá để biết điều kiện mở khóa tiếp theo.',
      'Có thể tạo hồ sơ tân binh mới (Khởi tạo lại từ Cấp 1, 0 Xu, 0 XP) bất kỳ lúc nào nếu muốn bắt đầu lại hành trình từ đầu.'
    ],
    howToUseEn: [
      'Click "Claim Daily Check-In" to advance your protection streak and immediately earn +25 Coins & +45 XP.',
      'Click "Edit Profile" to modify your detective codename, life motto, or bio.',
      'Inspect badges to view requirements for your next achievement tier.',
      'Reset your profile anytime to start fresh as a level-1 rookie.'
    ],
    howToIdentifyVi: [
      'Dữ liệu hồ sơ hiển thị thanh cấp bậc (Cấp 1 đến 50) kèm danh hiệu tăng dần: từ Tân Binh Tập Sự 👶, Đặc Vụ An Ninh 🛡️, đến Tổng Thanh Tra Không Gian Mạng 👑.',
      'Tỷ lệ phá án chính xác phản ánh phản xạ thực chiến của bạn trong các trò chơi.'
    ],
    howToIdentifyEn: [
      'Displays a clear progress bar (Level 1 to 50) with evolving titles: from Rookie 👶 to Chief Cyber Inspector 👑.',
      'Your case accuracy rate reflects real-time reflexes across training mini-games.'
    ],
    importantNotesVi: [
      'Nếu bạn bỏ lỡ không điểm danh quá 24h, chuỗi ngày có thể bị gián đoạn, hãy ghé thăm mỗi ngày nhé!',
      'Hồ sơ của bạn được lưu an toàn cục bộ trên thiết bị hiện tại.'
    ],
    importantNotesEn: [
      'Missing a check-in for more than 24 hours resets the consecutive streak bonus, so visit daily!',
      'Your agent dossier is securely saved in your browser local storage.'
    ],
    proTipsVi: [
      'Đạt chuỗi điểm danh 7 ngày liên tục để nhận Huy Chương "Bậc Thầy Chuỗi Ngày" và nhận thưởng gấp đôi lượng Xu quà tặng!'
    ],
    proTipsEn: [
      'Maintain a 7-day check-in streak to unlock the "Streak Master" badge and double your daily coin rewards!'
    ],
    keyStatsVi: [
      { label: 'Cấp bậc', value: 'Cấp 1 - 50' },
      { label: 'Huy chương', value: '6 Danh Hiệu Độc Quyền' },
      { label: 'Điểm danh', value: '+25 Xu Mỗi Ngày' }
    ],
    keyStatsEn: [
      { label: 'Levels', value: 'Tier 1 to 50' },
      { label: 'Badges', value: '6 Exclusive Honors' },
      { label: 'Daily Streak', value: '+25 Coins/Day' }
    ]
  },
  {
    id: 'music',
    number: '08',
    badgeVi: 'ÂM NHẠC ĐIỆP VIÊN',
    badgeEn: 'MUSIC STATION',
    codeNameVi: 'MUSIC_WITH_HACKER',
    codeNameEn: 'MUSIC_WITH_HACKER',
    titleVi: 'Music with hacker :3 • Bàn Nhạc Thư Giãn & Phá Án',
    titleEn: 'Music with hacker :3 • Relaxing & Action Audio Station',
    icon: '🎧',
    shortDescVi: 'Góc chọn nhạc phong phú đồng hành cùng điệp viên: Từ nhạc mạnh bùng nổ, nhạc anime sôi động, đến các bản Study With Me mưa rơi thư giãn tập trung.',
    shortDescEn: 'Curated audio companion: From high-energy hard techno and anime openings to soothing rainy Study With Me lo-fi tracks.',
    purposeVi: 'Cung cấp trải nghiệm âm thanh đa tầng sống động, tạo cảm hứng và sự thư thái tối đa cho người dùng khi học hỏi kiến thức, giải mã vụ án và thử thách phản xạ trong các trò chơi an toàn thông tin.',
    purposeEn: 'Provides a rich offline soundscape to inspire focus and relaxation while reading security handbooks, analyzing scam links, and playing mini-games.',
    howToUseVi: [
      'Bấm vào nút nổi "Music with hacker :3" (🎧) luôn hiển thị ở góc dưới bên phải màn hình hoặc trên thanh điều hướng phía trên.',
      'Chọn danh mục âm nhạc theo nhu cầu: "Study With Me" (Mưa Rơi & Lo-Fi Jazz, Guitar mộc, 432Hz tập trung sâu, Piano Ghibli), "Nhạc Anime" (Battle Opening, Kawaii Chibi Pop, Vườn hoa Koto), "Nhạc Mạnh" (Hard Techno Acid 303, Breakbeat, Phonk Drift), hoặc "Trinh Thám" (Synthwave 80s).',
      'Tùy chỉnh âm lượng bằng thanh kéo (0% đến 100%), chuyển bài trước/sau hoặc tạm dừng/phát nhạc theo ý thích.',
      'Nhạc được phát nền liên tục xuyên suốt mọi màn hình, không bị ngắt quãng khi bạn di chuyển giữa các mục.'
    ],
    howToUseEn: [
      'Click the floating "Music with hacker :3" widget (🎧) pinned at the bottom-right or the top navigation bar.',
      'Filter tracks by style: "Study With Me" (Rainy Cafe & Lofi Jazz, Acoustic Guitar, 432Hz Deep Focus, Ghibli Piano), "Anime" (Shonen Battle, Kawaii Chibi Pop, Koto Blossom), "Intense" (Hard Techno Acid 303, Cyber Chase, Drift Phonk), or "Detective" (80s Synthwave).',
      'Adjust volume smoothly from 0% to 100%, switch next/previous tracks, or pause/play at any moment.',
      'Music plays continuously across all views without interruption.'
    ],
    howToIdentifyVi: [
      'Âm thanh được tạo hoàn toàn bằng động cơ tổng hợp Web Audio API cục bộ 100%, không tải từ mạng ngoài, không lo mất mạng hay đứng hình.',
      'Các thanh sóng âm Equalizer trên màn hình máy phát sẽ nhảy múa theo nhịp điệu bài hát đang phát theo thời gian thực.'
    ],
    howToIdentifyEn: [
      'Audio is generated 100% locally via Web Audio API physical modeling and procedural synthesis without external network latency.',
      'Real-time equalizer bars visualize the harmonic frequencies of the playing song.'
    ],
    importantNotesVi: [
      'Tính năng có tên gọi đầy đủ chính thức là "Music with hacker :3", tuyệt đối không gọi tắt.',
      'Khi cần sự tập trung cao độ để đọc kỹ các điều khoản và phân tích cấu trúc tên miền, hãy chọn thể loại "Study With Me" để kích thích sóng não tập trung.'
    ],
    importantNotesEn: [
      'The feature is formally and explicitly named "Music with hacker :3".',
      'When deep reading security advisories or inspecting deceptive URLs, choose the "Study With Me" category for optimal brain focus.'
    ],
    proTipsVi: [
      'Bản nhạc "Study With Me • Quán Cafe Mưa Rơi & Lofi Jazz" có âm thanh mưa rơi tự nhiên và tiếng đĩa than ấm áp, cực kỳ hiệu quả để giải tỏa căng thẳng sau những ván chơi game kịch tính!'
    ],
    proTipsEn: [
      'The track "Study With Me • Rainy Cafe & Lofi Jazz" combines soothing natural rain and warm vinyl crackle to relieve fatigue after fast-paced games!'
    ],
    keyStatsVi: [
      { label: 'Số lượng', value: '12 Bản Nhạc Riêng Biệt' },
      { label: 'Phong cách', value: 'Study With Me • Anime • Mạnh' },
      { label: 'Công nghệ', value: 'Web Audio 100% Cục Bộ' }
    ],
    keyStatsEn: [
      { label: 'Tracks', value: '12 Unique Compositions' },
      { label: 'Genres', value: 'Study With Me • Anime • Intense' },
      { label: 'Engine', value: '100% Offline Web Audio' }
    ]
  }
];

export const UserProtocolView: React.FC<UserProtocolViewProps> = ({ onNavigateTab, onOpenMusic }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<ProtocolModuleId>('hq');
  const [colorMode, setColorMode] = useState<ScreenColorMode>('green');
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [showScanlines, setShowScanlines] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const { isVi } = useLanguage();

  const activeSection = PROTOCOL_SECTIONS.find((s) => s.id === selectedSectionId) || PROTOCOL_SECTIONS[0];

  const handleSelectSection = (id: ProtocolModuleId) => {
    if (soundEnabled) {
      playGlitchSound();
    }
    setIsGlitching(true);
    setSelectedSectionId(id);
    setTimeout(() => setIsGlitching(false), 260);
  };

  const handleNavigateDirectly = (id: ProtocolModuleId) => {
    if (soundEnabled) {
      playTabSwitch();
    }
    if (id === 'music') {
      if (onOpenMusic) {
        onOpenMusic();
      }
    } else {
      onNavigateTab(id);
    }
  };

  const cycleColorMode = () => {
    if (soundEnabled) playGlitchSound();
    if (colorMode === 'green') setColorMode('amber');
    else if (colorMode === 'amber') setColorMode('cyan');
    else setColorMode('green');
  };

  const triggerGlitch = () => {
    if (soundEnabled) playGlitchSound();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  // Phối màu cho giao diện màn hình CRT
  const getThemeColors = () => {
    switch (colorMode) {
      case 'amber':
        return {
          textPrimary: 'text-amber-400',
          textMuted: 'text-amber-600/90',
          bgBorder: 'border-amber-500/40',
          bgHeader: 'bg-amber-950/80',
          accentBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          buttonActive: 'bg-amber-500 text-amber-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.6)]',
          buttonInactive: 'border-amber-500/30 text-amber-300/80 hover:bg-amber-950/50 hover:text-amber-200',
          monitorModeClass: 'amber-mode'
        };
      case 'cyan':
        return {
          textPrimary: 'text-cyan-400',
          textMuted: 'text-cyan-600/90',
          bgBorder: 'border-cyan-500/40',
          bgHeader: 'bg-cyan-950/80',
          accentBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
          buttonActive: 'bg-cyan-400 text-cyan-950 font-black shadow-[0_0_15px_rgba(6,182,212,0.6)]',
          buttonInactive: 'border-cyan-500/30 text-cyan-300/80 hover:bg-cyan-950/50 hover:text-cyan-200',
          monitorModeClass: 'cyan-mode'
        };
      case 'green':
      default:
        return {
          textPrimary: 'text-emerald-400',
          textMuted: 'text-emerald-600/90',
          bgBorder: 'border-emerald-500/40',
          bgHeader: 'bg-emerald-950/80',
          accentBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          buttonActive: 'bg-emerald-400 text-emerald-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.6)]',
          buttonInactive: 'border-emerald-500/30 text-emerald-300/80 hover:bg-emerald-950/50 hover:text-emerald-200',
          monitorModeClass: 'green-mode'
        };
    }
  };

  const themeColors = getThemeColors();

  const title = isVi ? activeSection.titleVi : activeSection.titleEn;
  const badge = isVi ? activeSection.badgeVi : activeSection.badgeEn;
  const shortDesc = isVi ? activeSection.shortDescVi : activeSection.shortDescEn;
  const purpose = isVi ? activeSection.purposeVi : activeSection.purposeEn;
  const howToUse = isVi ? activeSection.howToUseVi : activeSection.howToUseEn;
  const howToIdentify = isVi ? activeSection.howToIdentifyVi : activeSection.howToIdentifyEn;
  const importantNotes = isVi ? activeSection.importantNotesVi : activeSection.importantNotesEn;
  const proTips = isVi ? activeSection.proTipsVi : activeSection.proTipsEn;
  const keyStats = isVi ? activeSection.keyStatsVi : activeSection.keyStatsEn;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* THANH ĐIỀU KHIỂN ĐẦU TRANG */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
            📟
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-black tracking-widest text-emerald-400">
                {isVi ? 'HỆ THỐNG LƯU TRỮ // SÁCH HƯỚNG DẪN MẬT VỤ' : 'ARCHIVE SYSTEM // DETECTIVE HANDBOOK'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                ● {isVi ? 'ĐANG HOẠT ĐỘNG' : 'ACTIVE'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 font-mono">
              {isVi ? 'GIAO THỨC NGƯỜI DÙNG • HƯỚNG DẪN MẬT VỤ' : 'USER PROTOCOL • CYBER DETECTIVE HANDBOOK'}
            </h1>
          </div>
        </div>

        {/* NÚT ĐIỀU KHIỂN PHẦN CỨNG CRT */}
        <div className="flex flex-wrap items-center gap-2">
          {/* NÚT ĐỔI MÀU MÀN HÌNH */}
          <button
            onClick={cycleColorMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-400 text-xs font-mono text-slate-200 hover:text-white transition-all cursor-pointer"
            title={isVi ? 'Đổi màu huỳnh quang CRT' : 'Cycle CRT phosphor color'}
          >
            <div className={`w-3 h-3 rounded-full ${colorMode === 'green' ? 'bg-emerald-400' : colorMode === 'amber' ? 'bg-amber-400' : 'bg-cyan-400'}`} />
            <span className="uppercase">
              {colorMode === 'green' ? (isVi ? 'Xanh Lá' : 'Green') : colorMode === 'amber' ? (isVi ? 'Hổ Phách' : 'Amber') : (isVi ? 'Xanh Lơ' : 'Cyan')} CRT
            </span>
          </button>

          {/* BẬT / TẮT ĐƯỜNG QUÉT SCANLINE */}
          <button
            onClick={() => setShowScanlines(!showScanlines)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              showScanlines
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={isVi ? 'Bật/Tắt đường quét màn hình' : 'Toggle scanlines'}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{isVi ? 'ĐƯỜNG QUÉT' : 'SCANLINES'}</span>
          </button>

          {/* NÚT THỬ NGHIỆM HIỆU ỨNG NHIỄU SÓNG */}
          <button
            onClick={triggerGlitch}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-rose-400 text-xs font-mono text-slate-300 hover:text-rose-300 transition-all cursor-pointer"
            title={isVi ? 'Kích hoạt hiệu ứng nhiễu sóng CRT' : 'Trigger CRT glitch'}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            <span>{isVi ? 'NHIỄU SÓNG' : 'GLITCH'}</span>
          </button>

          {/* BẬT / TẮT TIẾNG GÕ BÀN PHÍM */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? (isVi ? 'Tắt âm CRT' : 'Mute CRT audio') : (isVi ? 'Bật âm CRT' : 'Unmute CRT audio')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* KHUNG VỎ MÁY TÍNH BÓNG ĐÈN HÌNH CRT ĐỜI CŨ */}
      <div className={`crt-monitor ${themeColors.monitorModeClass} ${isGlitching ? 'glitch-active' : ''} p-4 sm:p-7 relative border-4 border-slate-700/80`}>
        
        {/* LỚP PHỦ ĐƯỜNG QUÉT SCANLINES */}
        {showScanlines && <div className="crt-scanlines absolute inset-0 z-20 pointer-events-none rounded-[24px]" />}

        {/* HIỆU ỨNG PHẢN CHIẾU VÒM MÀN HÌNH */}
        <div className="absolute top-3 left-6 right-6 h-12 bg-gradient-to-b from-white/10 to-transparent rounded-t-[20px] pointer-events-none z-20 opacity-30" />

        <div className="relative z-10 space-y-6 crt-flicker">
          
          {/* THANH TRẠNG THÁI TRÊN CÙNG */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed pb-3 text-xs font-mono font-bold tracking-wider" style={{ borderColor: 'rgba(16,185,129,0.3)' }}>
            <div className="flex items-center gap-2">
              <span className={themeColors.textPrimary}>[LUCERA-OS v4.2]</span>
              <span className={themeColors.textMuted}>{isVi ? '// ĐÃ XÁC THỰC QUYỀN TRUY CẬP TỐI CAO' : '// ROOT ACCESS GRANTED'}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className={themeColors.textPrimary}>{isVi ? 'BỘ NHỚ: 640KB SẴN SÀNG' : 'MEMORY: 640KB READY'}</span>
              <span className={themeColors.textMuted}>{isVi ? 'TỐC ĐỘ: 9600 BAUD' : 'RATE: 9600 BAUD'}</span>
              <span className={`${themeColors.textPrimary} animate-pulse`}>_READY</span>
            </div>
          </div>

          {/* BỐ CỤC 2 CỘT: CỘT TRÁI (MENU MỤC) + CỘT PHẢI (CHI TIẾT MẬT VỤ) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* CỘT TRÁI: MENU CÁC MỤC LỚN (BAO GỒM CẢ #08 MUSIC WITH HACKER :3) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${themeColors.textMuted}`}>
                  {isVi ? '> DANH_MỤC_HƯỚNG_DẪN' : '> PROTOCOL_INDEX'}
                </span>
                <span className={`text-[10px] font-mono ${themeColors.textPrimary}`}>
                  {PROTOCOL_SECTIONS.length} {isVi ? 'PHẦN' : 'MODULES'}
                </span>
              </div>

              {/* DANH SÁCH NÚT CHỌN MỤC */}
              <div className="space-y-2">
                {PROTOCOL_SECTIONS.map((sec) => {
                  const isSelected = sec.id === selectedSectionId;
                  const secTitle = isVi ? sec.titleVi : sec.titleEn;
                  const secCode = isVi ? sec.codeNameVi : sec.codeNameEn;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleSelectSection(sec.id)}
                      className={`w-full text-left p-3 rounded-2xl font-mono text-xs transition-all flex items-center justify-between group cursor-pointer border ${
                        isSelected
                          ? themeColors.buttonActive
                          : `${themeColors.buttonInactive} bg-black/40`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{sec.icon}</span>
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            <span className="opacity-60">[{sec.number}]</span>
                            <span>{secTitle.split('•')[0]}</span>
                          </div>
                          <div className={`text-[10px] ${isSelected ? 'text-slate-900 font-semibold' : themeColors.textMuted} truncate max-w-[160px]`}>
                            {secCode}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-slate-900' : themeColors.textPrimary}`} />
                    </button>
                  );
                })}
              </div>

              {/* THÔNG SỐ KỸ THUẬT PHẦN CỨNG MÀN HÌNH CRT */}
              <div className="p-3 rounded-2xl bg-black/50 border border-dashed border-emerald-500/20 font-mono text-[11px] space-y-1.5 text-emerald-400/80">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isVi ? 'THÔNG SỐ MÀN HÌNH' : 'MONITOR SPECS'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">{isVi ? 'Phốt pho:' : 'Phosphor:'}</span>
                  <span className="font-bold text-emerald-200">P22 High Persistence</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">{isVi ? 'Tần số quét:' : 'Refresh Rate:'}</span>
                  <span className="font-bold text-emerald-200">60 Hz Interlaced</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">{isVi ? 'Bảo mật:' : 'Execution:'}</span>
                  <span className="font-bold text-emerald-200">100% Client-Side</span>
                </div>
              </div>

            </div>

            {/* CỘT PHẢI: CHI TIẾT HỒ SƠ CỦA MỤC ĐƯỢC CHỌN (8 CỘT) */}
            <div className="lg:col-span-8 space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection.id + colorMode + (isVi ? 'vi' : 'en')}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5 font-mono"
                >
                  
                  {/* TIÊU ĐỀ HỒ SƠ VÀ NÚT NHẢY NHANH ĐẾN MỤC ĐÓ */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/40 space-y-3 shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{activeSection.icon}</span>
                        <div>
                          <div className={`text-[10px] font-bold uppercase tracking-widest ${themeColors.accentBadge} px-2 py-0.5 rounded-md inline-block mb-1`}>
                            {badge} • #{activeSection.number}
                          </div>
                          <h2 className={`text-lg sm:text-xl font-black ${themeColors.textPrimary} tracking-tight`}>
                            {title}
                          </h2>
                        </div>
                      </div>

                      {/* NÚT MỞ NHANH GIAO DIỆN TƯƠNG ỨNG */}
                      <button
                        onClick={() => handleNavigateDirectly(activeSection.id)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg active:scale-95 ${themeColors.buttonActive}`}
                        title={isVi ? `Mở ngay ${title}` : `Open ${title}`}
                      >
                        <span>
                          {activeSection.id === 'music'
                            ? 'MUSIC WITH HACKER :3'
                            : isVi ? 'TRUY CẬP NGAY' : 'OPEN SECTION'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className={`text-xs sm:text-sm ${themeColors.textPrimary} leading-relaxed opacity-90`}>
                      {shortDesc}
                    </p>

                    {/* CHỈ SỐ THEN CHỐT */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20">
                      {keyStats.map((stat, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                          <div className="text-[10px] opacity-60 text-emerald-300">{stat.label}</div>
                          <div className={`text-xs font-bold ${themeColors.textPrimary} truncate`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 1. MỤC ĐÍCH HOẠT ĐỘNG (ĐỂ LÀM GÌ) */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-300">
                      <HelpCircle className="w-4 h-4 text-emerald-400" />
                      <span>{isVi ? '1. MỤC ĐÍCH HOẠT ĐỘNG (ĐỂ LÀM GÌ)' : '1. PURPOSE & OBJECTIVES'}</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${themeColors.textPrimary} pl-6`}>
                      {purpose}
                    </p>
                  </div>

                  {/* 2. CÁCH DÙNG & CƠ CHẾ HOẠT ĐỘNG */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-300">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>{isVi ? '2. CÁCH SỬ DỤNG & CƠ CHẾ HOẠT ĐỘNG' : '2. HOW TO OPERATE & WORKFLOW'}</span>
                    </div>
                    <ul className="space-y-2 pl-2">
                      {howToUse.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-emerald-300/90">
                          <span className={`font-bold ${themeColors.textPrimary}`}>&gt; [{idx + 1}]</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. CÁCH XÁC ĐỊNH & ĐẶC TÍNH NỔI BẬT */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isVi ? '3. CÁCH XÁC ĐỊNH & ĐẶC TÍNH NỔI BẬT' : '3. IDENTIFICATION & CORE FEATURES'}</span>
                    </div>
                    <ul className="space-y-2 pl-2">
                      {howToIdentify.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-emerald-300/90">
                          <span className="text-amber-400 font-bold">✔</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 4. LƯU Ý QUAN TRỌNG CHO NGƯỜI DÙNG */}
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2 text-rose-300">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-400">
                      <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span>{isVi ? '4. LƯU Ý QUAN TRỌNG CHO NGƯỜI DÙNG' : '4. CRITICAL SECURITY NOTES'}</span>
                    </div>
                    <ul className="space-y-1.5 pl-6 text-xs sm:text-sm leading-relaxed">
                      {importantNotes.map((note, idx) => (
                        <li key={idx} className="list-disc">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. MẸO HỮU ÍCH TỪ ĐIỆP VIÊN */}
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-amber-300">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-400">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>{isVi ? '5. MẸO HỮU ÍCH TỪ ĐIỆP VIÊN' : '5. DETECTIVE PRO TIPS'}</span>
                    </div>
                    <ul className="space-y-1.5 pl-6 text-xs sm:text-sm leading-relaxed">
                      {proTips.map((tip, idx) => (
                        <li key={idx} className="list-disc">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* THANH HÀNH ĐỘNG DƯỚI CÙNG */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-500/30">
                    <div className="text-[11px] text-emerald-500/70">
                      {isVi ? 'SÁCH HƯỚNG DẪN MẬT VỤ LUCERA • DỮ LIỆU ĐÃ ĐƯỢC XÁC THỰC' : 'LUCERA DETECTIVE HANDBOOK • VERIFIED LOCAL KNOWLEDGE'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const currentIndex = PROTOCOL_SECTIONS.findIndex((s) => s.id === selectedSectionId);
                          const nextIndex = (currentIndex + 1) % PROTOCOL_SECTIONS.length;
                          handleSelectSection(PROTOCOL_SECTIONS[nextIndex].id);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-emerald-500/40 hover:bg-emerald-950/50 text-emerald-300 text-xs font-mono transition-all cursor-pointer"
                      >
                        {isVi ? 'MỤC TIẾP THEO >>' : 'NEXT MODULE >>'}
                      </button>
                      <button
                        onClick={() => handleNavigateDirectly(activeSection.id)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${themeColors.buttonActive}`}
                      >
                        {activeSection.id === 'music'
                          ? 'MUSIC WITH HACKER :3'
                          : isVi ? `MỞ ${title.split('•')[0]}` : `OPEN ${title.split('•')[0]}`}
                      </button>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* CHÂN ĐẾ MÀN HÌNH CRT */}
          <div className="pt-4 text-center border-t border-emerald-500/20 text-[10px] font-mono text-emerald-500/50 flex items-center justify-center gap-4">
            <span>MODEL: CRT-LUCERA-90</span>
            <span>•</span>
            <span>HIGH VOLTAGE PHOSPHOR</span>
            <span>•</span>
            <span>{isVi ? 'DÀNH CHO ĐẶC VỤ AN TOÀN SỐ' : 'CYBERSECURITY DETECTIVE BUREAU'}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
