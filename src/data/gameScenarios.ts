import {
  ScamDetectiveScenario,
  FakeOrRealScenario,
  RadarLink,
  LinkPuzzleScenario,
  DilemmaScenario,
  EscapeRoomStage,
  CyberTip
} from '../types';

// ==========================================
// GAME 1: SCAM DETECTIVE (Game Chính)
// ==========================================
export const SCAM_DETECTIVE_SCENARIOS_VI: ScamDetectiveScenario[] = [
  {
    id: 'gift-scam-01',
    title: 'Vụ án #01: Quà Tặng Bí Ẩn Tri Ân',
    sender: 'TRI_AN_KHACH_HANG_VIP',
    time: 'Vừa xong',
    avatarIcon: 'gift',
    type: 'sms',
    fullMessageText: '🎁 Chúc mừng! Bạn đã được chọn nhận phần quà đặc biệt trị giá 5.000.000 VNĐ! Xác nhận ngay tại http://shopee-nhanqua-tri-an.xyz/xac-nhan để không bị hủy sau 15 phút. Vui lòng nhập số điện thoại và mã OTP để hoàn tất.',
    tokens: [
      { id: 't1', text: '🎁 Chúc mừng!', isClue: false },
      { id: 't2', text: 'Bạn đã được chọn nhận phần quà đặc biệt', isClue: true, category: 'trúng thưởng', explanation: 'Dấu hiệu "Trúng thưởng bất ngờ" - Đòn tâm lý kích thích lòng tham dù bạn không tham gia chương trình nào.' },
      { id: 't3', text: 'trị giá 5.000.000 VNĐ!', isClue: false },
      { id: 't4', text: 'Xác nhận ngay tại', isClue: false },
      { id: 't5', text: 'http://shopee-nhanqua-tri-an.xyz/xac-nhan', isClue: true, category: 'link lạ', explanation: 'Dấu hiệu "Link lạ": Dùng HTTP (không mã hóa) và đuôi tên miền .xyz giá rẻ giả mạo Shopee.' },
      { id: 't6', text: 'để không bị hủy sau 15 phút.', isClue: true, category: 'tạo cảm giác khẩn cấp', explanation: 'Dấu hiệu "Tạo cảm giác khẩn cấp": Giới hạn thời gian gấp gáp để nạn nhân không kịp suy nghĩ hay kiểm chứng.' },
      { id: 't7', text: 'Vui lòng', isClue: false },
      { id: 't8', text: 'nhập số điện thoại và mã OTP', isClue: true, category: 'yêu cầu thông tin', explanation: 'Dấu hiệu "Đòi mã OTP / Thông tin nhạy cảm": Mã OTP dùng để rút tiền hoặc chuyển quyền sở hữu tài khoản!' },
      { id: 't9', text: 'để hoàn tất.', isClue: false }
    ],
    totalClues: 4,
    kienSangHint: 'Gợi ý: Hãy tìm 4 điểm yếu: 1. Ai đó tặng quà miễn phí, 2. Đường link đuôi .xyz, 3. Đếm ngược 15 phút, 4. Đòi cung cấp mã OTP bí mật!',
    postExplanation: 'Xuất sắc! Bạn đã lật tẩy đủ 4 chiêu trò kinh điển của bẫy lừa đảo trúng thưởng. Không bao giờ cung cấp mã OTP cho bất kỳ ai!'
  },
  {
    id: 'bank-lock-02',
    title: 'Vụ án #02: Báo Động Khóa Tài Khoản Ngân Hàng',
    sender: 'VIETCOMBANK_ALERT',
    time: '2 phút trước',
    avatarIcon: 'shield-alert',
    type: 'sms',
    fullMessageText: '⚠️ CẢNH BÁO: Tài khoản VCB Digibank của quý khách đang bị đăng nhập trái phép tại nước ngoài. Để tránh bị đóng băng tài khoản vĩnh viễn, truy cập ngay http://vietcombank-ebank-secure.top để xác minh danh tính và nhập mã bảo mật trong 10 phút.',
    tokens: [
      { id: 'b1', text: '⚠️ CẢNH BÁO:', isClue: false },
      { id: 'b2', text: 'Tài khoản VCB Digibank đang bị đăng nhập trái phép', isClue: false },
      { id: 'b3', text: 'Để tránh bị đóng băng tài khoản vĩnh viễn,', isClue: true, category: 'đe dọa & khẩn cấp', explanation: 'Dấu hiệu "Hù dọa & gây hoang mang": Đe dọa đóng băng tiền để khiến người dùng mất bình tĩnh.' },
      { id: 'b4', text: 'truy cập ngay', isClue: false },
      { id: 'b5', text: 'http://vietcombank-ebank-secure.top', isClue: true, category: 'link giả mạo', explanation: 'Dấu hiệu "Tên miền giả mạo": Trang thật là vietcombank.com.vn, trang này dùng .top và giao thức http không bảo mật.' },
      { id: 'b6', text: 'để xác minh danh tính', isClue: false },
      { id: 'b7', text: 'và nhập mã bảo mật', isClue: true, category: 'đòi mật khẩu/OTP', explanation: 'Dấu hiệu "Yêu cầu thông tin bảo mật": Ngân hàng không bao giờ gửi link bắt khách nhập mật khẩu cấp 2.' },
      { id: 'b8', text: 'trong 10 phút.', isClue: true, category: 'tạo cảm giác khẩn cấp', explanation: 'Dấu hiệu "Ép thời gian 10 phút": Kẻ gian muốn bạn hành động vội vàng trước khi kịp gọi tổng đài đối chiếu.' }
    ],
    totalClues: 4,
    kienSangHint: 'Gợi ý: Chú ý lời đe dọa "đóng băng vĩnh viễn", đường link đuôi .top, đòi nhập mã bảo mật và mốc thời gian 10 phút!',
    postExplanation: 'Chuẩn xác! Ngân hàng chính thống không bao giờ đính kèm link trong SMS yêu cầu khách nhập mật khẩu hay OTP.'
  },
  {
    id: 'police-investigation-03',
    title: 'Vụ án #03: Lệnh Triệu Tập Giả Danh Bộ Công An',
    sender: 'CUC_CANH_SAT_DIEU_TRA',
    time: 'Hôm qua',
    avatarIcon: 'badge-alert',
    type: 'email',
    fullMessageText: 'Kính gửi công dân, Bạn có lệnh tạm giữ số 89/LTT liên quan đến đường dây rửa tiền quốc tế. Yêu cầu tải ứng dụng bảo vệ tại http://bocongan-gov-app.cfd và chuyển 30.000.000đ vào tài khoản tạm giữ để chứng minh vô tội trong ngày hôm nay.',
    tokens: [
      { id: 'p1', text: 'Kính gửi công dân,', isClue: false },
      { id: 'p2', text: 'Bạn có lệnh tạm giữ số 89/LTT liên quan đường dây rửa tiền', isClue: true, category: 'vu khống & đe dọa', explanation: 'Dấu hiệu "Tội danh giả tưởng": Cơ quan chức năng gửi giấy triệu tập trực tiếp qua công an khu vực, KHÔNG qua email hay SMS!' },
      { id: 'p3', text: 'Yêu cầu tải ứng dụng bảo vệ tại', isClue: false },
      { id: 'p4', text: 'http://bocongan-gov-app.cfd', isClue: true, category: 'link cài mã độc APK', explanation: 'Dấu hiệu "Link độc hại .cfd": Đây là link dụ cài file APK có mã độc nhằm chiếm quyền điều khiển điện thoại.' },
      { id: 'p5', text: 'và chuyển 30.000.000đ vào tài khoản tạm giữ để chứng minh vô tội', isClue: true, category: 'yêu cầu chuyển tiền', explanation: 'Dấu hiệu "Đòi chuyển tiền vào tài khoản lạ": Công an KHÔNG BAO GIỜ yêu cầu công dân chuyển tiền để chứng minh vô tội.' },
      { id: 'p6', text: 'trong ngày hôm nay.', isClue: true, category: 'tạo áp lực thời gian', explanation: 'Dấu hiệu "Ép giải quyết ngay": Tránh để nạn nhân ra hỏi trực tiếp công an phường.' }
    ],
    totalClues: 4,
    kienSangHint: 'Gợi ý: Công an làm việc qua giấy mời tận nhà, không bao giờ gửi link web .cfd hay đòi chuyển tiền vào tài khoản cá nhân!',
    postExplanation: 'Bạn là một Cyber Detective cự phách! Hãy luôn nhớ phương châm: Không chuyển tiền - Không cài app ngoài Google Play/App Store!'
  }
];

export const SCAM_DETECTIVE_SCENARIOS_EN: ScamDetectiveScenario[] = [
  {
    id: 'gift-scam-01',
    title: 'Case #01: Mystery Loyalty Prize Trap',
    sender: 'VIP_LOYALTY_REWARDS',
    time: 'Just now',
    avatarIcon: 'gift',
    type: 'sms',
    fullMessageText: '🎁 Congratulations! You have been selected to receive a special $250 gift card! Confirm immediately at http://shopee-nhanqua-tri-an.xyz/xac-nhan to avoid expiration within 15 minutes. Please enter your phone number and OTP code to finalize.',
    tokens: [
      { id: 't1', text: '🎁 Congratulations!', isClue: false },
      { id: 't2', text: 'You have been selected to receive a special $250 gift card!', isClue: true, category: 'unexpected prize', explanation: 'Red Flag "Unexpected Prize": A classic psychological lure triggering greed even when you never entered any contest.' },
      { id: 't3', text: 'Confirm immediately at', isClue: false },
      { id: 't4', text: 'http://shopee-nhanqua-tri-an.xyz/xac-nhan', isClue: true, category: 'suspicious link', explanation: 'Red Flag "Dangerous URL": Uses unencrypted HTTP and cheap .xyz domain spoofing legitimate e-commerce brands.' },
      { id: 't5', text: 'to avoid expiration within 15 minutes.', isClue: true, category: 'artificial urgency', explanation: 'Red Flag "Artificial Urgency": Tight countdown clock forcing victims to act hastily without critical verification.' },
      { id: 't6', text: 'Please enter', isClue: false },
      { id: 't7', text: 'your phone number and OTP code', isClue: true, category: 'sensitive info request', explanation: 'Red Flag "OTP Demands": One-Time Passwords are strictly used to authorize bank withdrawals and account transfers!' },
      { id: 't8', text: 'to finalize.', isClue: false }
    ],
    totalClues: 4,
    kienSangHint: 'Detective Hint: Look for 4 flaws: 1. Free unexpected prize, 2. Suspicious .xyz URL, 3. 15-minute countdown, 4. Demanding private OTP codes!',
    postExplanation: 'Outstanding! You exposed all 4 classic hallmarks of lottery phishing scams. Never disclose OTP codes to anyone!'
  },
  {
    id: 'bank-lock-02',
    title: 'Case #02: Urgent Bank Account Freeze Alert',
    sender: 'BANK_SECURITY_ALERTS',
    time: '2 mins ago',
    avatarIcon: 'shield-alert',
    type: 'sms',
    fullMessageText: '⚠️ ALERT: Your online banking account was accessed from an unrecognized overseas location. To prevent permanent account suspension, visit http://vietcombank-ebank-secure.top now to verify your credentials and input security code within 10 minutes.',
    tokens: [
      { id: 'b1', text: '⚠️ ALERT:', isClue: false },
      { id: 'b2', text: 'Your online banking account was accessed overseas.', isClue: false },
      { id: 'b3', text: 'To prevent permanent account suspension,', isClue: true, category: 'threat & fear', explanation: 'Red Flag "Fear & Intimidation": Threatens immediate account lock to cause panic and cloud rational judgment.' },
      { id: 'b4', text: 'visit', isClue: false },
      { id: 'b5', text: 'http://vietcombank-ebank-secure.top', isClue: true, category: 'spoofed domain', explanation: 'Red Flag "Counterfeit Domain": Genuine banks use official root domains with SSL, not unencrypted .top web addresses.' },
      { id: 'b6', text: 'now to verify your credentials', isClue: false },
      { id: 'b7', text: 'and input security code', isClue: true, category: 'password/OTP trap', explanation: 'Red Flag "Demanding Security Codes": Legitimate financial institutions never send SMS links asking for passwords.' },
      { id: 'b8', text: 'within 10 minutes.', isClue: true, category: 'artificial urgency', explanation: 'Red Flag "10-Minute Rush": Scammers pressure you into hasty compliance before you can contact your bank directly.' }
    ],
    totalClues: 4,
    kienSangHint: 'Detective Hint: Watch for "permanent suspension" fear tactics, cheap .top URLs, requests for security credentials, and 10-minute timers!',
    postExplanation: 'Spot on! Real banks never attach verification links inside SMS text messages asking for your security codes.'
  },
  {
    id: 'police-investigation-03',
    title: 'Case #03: Law Enforcement Impersonation Extortion',
    sender: 'INVESTIGATION_BUREAU',
    time: 'Yesterday',
    avatarIcon: 'badge-alert',
    type: 'email',
    fullMessageText: 'Dear citizen, You are named in Warrant #89/LTT regarding international money laundering. You must download the official protection app at http://bocongan-gov-app.cfd and transfer $1,500 into the designated escrow vault today to demonstrate your innocence.',
    tokens: [
      { id: 'p1', text: 'Dear citizen,', isClue: false },
      { id: 'p2', text: 'You are named in Warrant #89/LTT regarding money laundering.', isClue: true, category: 'false accusations', explanation: 'Red Flag "Fabricated Accusations": Law enforcement delivers formal subpoenas in person, NEVER over unsolicited emails or SMS!' },
      { id: 'p3', text: 'You must download the official protection app at', isClue: false },
      { id: 'p4', text: 'http://bocongan-gov-app.cfd', isClue: true, category: 'malicious APK download', explanation: 'Red Flag "Malicious .cfd Link": Tricks victims into sideloading rogue APK malware that takes remote control of mobile devices.' },
      { id: 'p5', text: 'and transfer $1,500 into the designated escrow vault to demonstrate your innocence', isClue: true, category: 'extortion fund transfer', explanation: 'Red Flag "Demanding Wire Transfers": Real police departments NEVER demand fund transfers to personal accounts to prove innocence.' },
      { id: 'p6', text: 'today.', isClue: true, category: 'same-day deadline', explanation: 'Red Flag "Pressure Deadline": Prevents the target from consulting legal counsel or visiting the local station.' }
    ],
    totalClues: 4,
    kienSangHint: 'Detective Hint: Government officials never conduct interrogations via email, send .cfd APK links, or demand money transfers!',
    postExplanation: 'Masterful work! Always remember: Never transfer money and never install third-party APKs outside official app stores!'
  }
];

// ==========================================
// GAME 2: FAKE OR REAL? (Tìm điểm khác biệt)
// ==========================================
export const FAKE_OR_REAL_SCENARIOS_VI: FakeOrRealScenario[] = [
  {
    id: 'bank-compare-01',
    brand: 'Vietcombank VCB Digibank',
    realSite: {
      url: 'https://vcbdigibank.vietcombank.com.vn',
      title: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Chính Thức)',
      logoText: 'Vietcombank',
      buttonText: 'Đăng nhập an toàn (SSL 256-bit)',
      badge: 'Ổ khóa xanh HTTPS hợp lệ'
    },
    fakeSite: {
      url: 'http://vcb-digibank-ebanking.xyz/login',
      title: 'Ngan Hang Vietcombank Ngoai Thuong (Trang Giả)',
      logoText: 'Vletcombank', // Lỗi chính tả cố ý
      buttonText: 'Đăng nhập ngay để nhận thưởng',
      badge: 'Không có ổ khóa SSL'
    },
    differences: [
      { id: 'd1', xPercent: 18, yPercent: 12, title: '1. Giao thức HTTP không bảo mật', description: 'Trang giả dùng http:// thay vì https://, dữ liệu mật khẩu gửi đi hoàn toàn không được mã hóa.' },
      { id: 'd2', xPercent: 55, yPercent: 12, title: '2. Tên miền lậu .xyz', description: 'Tên miền chính thức là vietcombank.com.vn, còn trang giả dùng vcb-digibank-ebanking.xyz.' },
      { id: 'd3', xPercent: 25, yPercent: 32, title: '3. Sai chính tả Logo "Vletcombank"', description: 'Chữ "i" đã bị thay bằng chữ "l" (Typosquatting) để qua mắt người lướt nhanh.' },
      { id: 'd4', xPercent: 75, yPercent: 62, title: '4. Nút đăng nhập dụ dỗ nhận thưởng', description: 'Web ngân hàng thật tập trung vào bảo mật, web giả thêm chữ "nhận thưởng" để câu mồi.' },
      { id: 'd5', xPercent: 88, yPercent: 12, title: '5. Thiếu biểu tượng chứng chỉ số tín nhiệm', description: 'Web giả không có tem tín nhiệm mạng quốc gia hoặc chứng nhận bảo mật EV-SSL.' }
    ],
    kienSangHint: 'Gợi ý: Hãy soi kỹ thanh địa chỉ URL, đuôi .xyz, lỗi chính tả chữ "Vletcombank", và lời mời mọc bất thường!'
  }
];

export const FAKE_OR_REAL_SCENARIOS_EN: FakeOrRealScenario[] = [
  {
    id: 'bank-compare-01',
    brand: 'VCB Digibank Portal',
    realSite: {
      url: 'https://vcbdigibank.vietcombank.com.vn',
      title: 'Official Commercial Bank Portal (Verified)',
      logoText: 'Vietcombank',
      buttonText: 'Secure Sign In (256-bit SSL)',
      badge: 'Valid HTTPS SSL Padlock'
    },
    fakeSite: {
      url: 'http://vcb-digibank-ebanking.xyz/login',
      title: 'Commercial Bank Online (Phishing Clone)',
      logoText: 'Vletcombank', // Intentional typosquat
      buttonText: 'Sign In Now to Claim Prize',
      badge: 'Unsecured HTTP Connection'
    },
    differences: [
      { id: 'd1', xPercent: 18, yPercent: 12, title: '1. Insecure HTTP Protocol', description: 'The fake website uses unencrypted http:// instead of https://, leaving login credentials visible in transit.' },
      { id: 'd2', xPercent: 55, yPercent: 12, title: '2. Deceptive .xyz Domain', description: 'The official domain is vietcombank.com.vn, whereas the imposter uses cheap vcb-digibank-ebanking.xyz.' },
      { id: 'd3', xPercent: 25, yPercent: 32, title: '3. Typosquatted Brand Logo "Vletcombank"', description: 'The letter "i" has been swapped with "l" (Vletcombank) to fool visual speed-reading.' },
      { id: 'd4', xPercent: 75, yPercent: 62, title: '4. Prize Lure on Sign-In Button', description: 'Legitimate banks focus purely on security, while scams add "claim prize" lures to bait logins.' },
      { id: 'd5', xPercent: 88, yPercent: 12, title: '5. Missing EV-SSL Trust Certification', description: 'The counterfeit page lacks national cybersecurity seals and validated certificates.' }
    ],
    kienSangHint: 'Detective Hint: Closely examine the address bar, the .xyz extension, the "Vletcombank" typo, and the unusual reward button!'
  }
];

// ==========================================
// GAME 3: SCAM RADAR (Phản xạ Link Safe / Scam)
// ==========================================
export const SCAM_RADAR_LINKS_VI: RadarLink[] = [
  { id: 'r1', url: 'https://vietcombank.com.vn/personal', isScam: false, reason: 'Tên miền chính thống của Ngân hàng Ngoại Thương Việt Nam có HTTPS.' },
  { id: 'r2', url: 'http://shopee-sale-khuyenmai.top', isScam: true, reason: 'Dùng HTTP và tên miền lạ đuôi .top mạo danh sàn Shopee.', brandMimicked: 'Shopee', difficulty: 'easy' },
  { id: 'r3', url: 'https://dantri.com.vn/giao-duc', isScam: false, reason: 'Trang báo điện tử Dân Trí chính thống.' },
  { id: 'r4', url: 'https://vcb-ebank-token.xyz/login', isScam: true, reason: 'Đuôi .xyz mạo danh Vietcombank đòi mã token bảo mật.', brandMimicked: 'Vietcombank', difficulty: 'easy' },
  { id: 'r5', url: 'https://fpt.edu.vn/tuyen-sinh', isScam: false, reason: 'Cổng thông tin tuyển sinh Đại học FPT chính thức.' },
  { id: 'r6', url: 'http://momo-hoantien-500k.click', isScam: true, reason: 'Mạo danh ví MoMo hứa hẹn hoàn tiền, đuôi .click giá rẻ.', brandMimicked: 'MoMo', difficulty: 'medium' },
  { id: 'r7', url: 'https://chinhphu.vn/thong-tin', isScam: false, reason: 'Cổng Thông tin điện tử Chính phủ Việt Nam (.gov.vn).' },
  { id: 'r8', url: 'https://chinhphu-tro-cap-covid.site', isScam: true, reason: 'Lợi dụng chính sách trợ cấp, đuôi .site mạo danh cơ quan nhà nước.', brandMimicked: 'Chính phủ', difficulty: 'medium' },
  { id: 'r9', url: 'https://google.com/search?q=cyber', isScam: false, reason: 'Công cụ tìm kiếm chính thức Google.' },
  { id: 'r10', url: 'http://192.168.1.105/login-apple-id', isScam: true, reason: 'Dùng địa chỉ IP thô thay vì tên miền apple.com để câu mật khẩu iCloud.', brandMimicked: 'Apple', difficulty: 'hard' },
  { id: 'r11', url: 'https://zalo.me/pc', isScam: false, reason: 'Trang tải phần mềm Zalo chính thức của VNG.' },
  { id: 'r12', url: 'https://telegram-airdrop-gift.monster', isScam: true, reason: 'Dụ dỗ quà tặng Telegram bằng đuôi .monster độc hại.', brandMimicked: 'Telegram', difficulty: 'hard' }
];

export const SCAM_RADAR_LINKS_EN: RadarLink[] = [
  { id: 'r1', url: 'https://vietcombank.com.vn/personal', isScam: false, reason: 'Legitimate banking domain with valid SSL encryption.' },
  { id: 'r2', url: 'http://shopee-sale-khuyenmai.top', isScam: true, reason: 'Uses insecure HTTP and rogue .top extension to spoof shopping sites.', brandMimicked: 'Shopee', difficulty: 'easy' },
  { id: 'r3', url: 'https://dantri.com.vn/giao-duc', isScam: false, reason: 'Verified national news publication.' },
  { id: 'r4', url: 'https://vcb-ebank-token.xyz/login', isScam: true, reason: 'Cheap .xyz extension spoofing bank credentials to steal security tokens.', brandMimicked: 'Vietcombank', difficulty: 'easy' },
  { id: 'r5', url: 'https://fpt.edu.vn/tuyen-sinh', isScam: false, reason: 'Official educational institution domain.' },
  { id: 'r6', url: 'http://momo-hoantien-500k.click', isScam: true, reason: 'Spoofs e-wallet refund incentives using disposable .click domain.', brandMimicked: 'MoMo', difficulty: 'medium' },
  { id: 'r7', url: 'https://chinhphu.vn/thong-tin', isScam: false, reason: 'Official government portal.' },
  { id: 'r8', url: 'https://chinhphu-tro-cap-covid.site', isScam: true, reason: 'Exploits relief grants using fake .site domain impersonating government.', brandMimicked: 'Government', difficulty: 'medium' },
  { id: 'r9', url: 'https://google.com/search?q=cyber', isScam: false, reason: 'Authentic Google Search engine.' },
  { id: 'r10', url: 'http://192.168.1.105/login-apple-id', isScam: true, reason: 'Uses raw IP address instead of apple.com to harvest iCloud passwords.', brandMimicked: 'Apple', difficulty: 'hard' },
  { id: 'r11', url: 'https://zalo.me/pc', isScam: false, reason: 'Official verified messenger download portal.' },
  { id: 'r12', url: 'https://telegram-airdrop-gift.monster', isScam: true, reason: 'Baiting crypto/gift airdrops using hazardous .monster extension.', brandMimicked: 'Telegram', difficulty: 'hard' }
];

// ==========================================
// GAME 4: LINK PUZZLE (Giải Mã URL Phishing)
// ==========================================
export const LINK_PUZZLE_SCENARIOS_VI: LinkPuzzleScenario[] = [
  {
    id: 'puzzle-01',
    fullUrl: 'http://vcb-login-security.xyz/ebanking/xac-thuc',
    brand: 'Mạo danh Ngân Hàng',
    pieces: [
      { id: 'p-1', text: 'http://', category: 'protocol', label: 'Giao thức bảo mật (Kém an toàn)' },
      { id: 'p-2', text: 'vcb-login-security', category: 'redflag', label: 'Dấu hiệu đáng ngờ (Tên mạo danh)' },
      { id: 'p-3', text: '.xyz', category: 'domain', label: 'Tên miền cấp cao (TLD giá rẻ)' },
      { id: 'p-4', text: '/ebanking/xac-thuc', category: 'path', label: 'Đường dẫn đích (Trang bẫy OTP)' }
    ],
    educationalInsight: 'Khi phân tích một URL, hãy luôn tách thành 4 phần: Giao thức (HTTPS là bắt buộc), Tên miền cốt lõi, Đuôi miền (TLD), và Đường dẫn con. Hacker thường giấu bẫy ngay ở phần Tên miền lai ghép!'
  },
  {
    id: 'puzzle-02',
    fullUrl: 'https://shopee-quay-thuong-iphone.top/claim/free',
    brand: 'Mạo danh Shopee Săn Thưởng',
    pieces: [
      { id: 'pz-1', text: 'https://', category: 'protocol', label: 'Giao thức bảo mật (Có mã hóa)' },
      { id: 'pz-2', text: 'shopee-quay-thuong-iphone', category: 'redflag', label: 'Dấu hiệu câu nhử (Tâm lý quà tặng)' },
      { id: 'pz-3', text: '.top', category: 'domain', label: 'Tên miền cấp cao (TLD lừa đảo)' },
      { id: 'pz-4', text: '/claim/free', category: 'path', label: 'Đường dẫn nhận giải ảo' }
    ],
    educationalInsight: 'Dù có HTTPS (ổ khóa), nếu tên miền chính không phải là shopee.vn mà là shopee-quay-thuong-iphone.top thì vẫn là trang web lừa đảo 100%!'
  }
];

export const LINK_PUZZLE_SCENARIOS_EN: LinkPuzzleScenario[] = [
  {
    id: 'puzzle-01',
    fullUrl: 'http://vcb-login-security.xyz/ebanking/xac-thuc',
    brand: 'Banking Phishing Clone',
    pieces: [
      { id: 'p-1', text: 'http://', category: 'protocol', label: 'Protocol (Insecure unencrypted HTTP)' },
      { id: 'p-2', text: 'vcb-login-security', category: 'redflag', label: 'Red Flag (Impersonation keyword)' },
      { id: 'p-3', text: '.xyz', category: 'domain', label: 'Top-Level Domain (Cheap disposable TLD)' },
      { id: 'p-4', text: '/ebanking/xac-thuc', category: 'path', label: 'Resource Path (OTP credential harvesting)' }
    ],
    educationalInsight: 'When analyzing any URL, dissect it into 4 parts: Protocol (HTTPS required), Core Domain, Top-Level Extension, and Path. Attackers disguise traps directly inside hybrid domain names!'
  },
  {
    id: 'puzzle-02',
    fullUrl: 'https://shopee-quay-thuong-iphone.top/claim/free',
    brand: 'Shopping Prize Phishing',
    pieces: [
      { id: 'pz-1', text: 'https://', category: 'protocol', label: 'Protocol (Encrypted in transit)' },
      { id: 'pz-2', text: 'shopee-quay-thuong-iphone', category: 'redflag', label: 'Red Flag (Psychological gift bait)' },
      { id: 'pz-3', text: '.top', category: 'domain', label: 'Top-Level Domain (Malicious spam TLD)' },
      { id: 'pz-4', text: '/claim/free', category: 'path', label: 'Resource Path (Fake reward claim)' }
    ],
    educationalInsight: 'Even with HTTPS, if the root domain is not shopee.vn but rather shopee-quay-thuong-iphone.top, it is 100% fraudulent!'
  }
];

// ==========================================
// GAME 5: WHAT WOULD YOU DO? (Tình huống thực tế)
// ==========================================
export const WHAT_WOULD_YOU_DO_SCENARIOS_VI: DilemmaScenario[] = [
  {
    id: 'sc-1',
    title: 'Tình huống 1: Tin nhắn dọa khóa tài khoản trong 2 giờ',
    context: 'Bạn nhận được tin nhắn SMS hiển thị tên thương hiệu ngân hàng: "Tài khoản của bạn vừa bị trừ 15.000.000đ tại Singapore. Nếu không phải bạn thực hiện, nhấp vào link bên dưới để hủy giao dịch trong 15 phút."',
    icon: 'message-square',
    options: [
      {
        id: 'opt-a',
        label: 'A',
        text: 'Bấm ngay vào link vì sợ mất 15 triệu, sau đó đăng nhập để kiểm tra lịch sử giao dịch.',
        isCorrect: false,
        explanation: '❌ Rất nguy hiểm! Đây là kỹ thuật SMS Brandname Spoofing (giả mạo đầu số ngân hàng). Khi bạn nhập mật khẩu vào trang web đó, kẻ gian sẽ chiếm tài khoản thật của bạn.'
      },
      {
        id: 'opt-b',
        label: 'B',
        text: 'Bình tĩnh thoát ra, tự mở ứng dụng ngân hàng chính thức trên máy hoặc gọi số hotline sau mặt thẻ.',
        isCorrect: true,
        explanation: '✅ Chuẩn xác 100%! Luôn tự kiểm tra qua kênh độc lập đáng tin cậy thay vì tin vào link hay số điện thoại gửi qua tin nhắn.'
      },
      {
        id: 'opt-c',
        label: 'C',
        text: 'Nhắn tin lại cho số gửi SMS và gửi ảnh chụp căn cước công dân để nhờ hủy.',
        isCorrect: false,
        explanation: '❌ Sai lầm! Số điện thoại gửi SMS tự động là tổng đài ảo hoặc sim rác, gửi thông tin cá nhân sẽ khiến bạn bị mạo danh vay tiền online.'
      }
    ]
  },
  {
    id: 'sc-2',
    title: 'Tình huống 2: Người thân trên Facebook nhắn tin mượn tiền gấp',
    context: 'Tài khoản Facebook của một người bạn thân đột ngột nhắn tin cho bạn: "Cậu ơi tớ đang có việc gấp cần mượn 5 triệu đóng viện phí, tí tớ trả lại ngay. Cậu chuyển khoản vào số tài khoản này hộ tớ nhé".',
    icon: 'user-check',
    options: [
      {
        id: 'opt-2a',
        label: 'A',
        text: 'Chuyển khoản ngay lập tức vì là bạn thân đang gặp nạn gấp.',
        isCorrect: false,
        explanation: '❌ Rất nhiều người đã bị lừa theo cách này! Kẻ gian hack tài khoản Facebook của bạn bạn, rồi nhắn tin mượn tiền toàn bộ danh sách bạn bè.'
      },
      {
        id: 'opt-2b',
        label: 'B',
        text: 'Gọi điện thoại thoại trực tiếp (Voice Call/Video Call) hoặc gặp mặt đối chứng trước khi chuyển tiền.',
        isCorrect: true,
        explanation: '✅ Rất tỉnh táo! Hãy gọi điện thoại thông thường để nghe giọng nói thực tế, hoặc hỏi một câu hỏi riêng tư mà chỉ 2 người biết.'
      },
      {
        id: 'opt-2c',
        label: 'C',
        text: 'Yêu cầu bạn ấy chụp ảnh thẻ ngân hàng gửi qua tin nhắn.',
        isCorrect: false,
        explanation: '❌ Kẻ gian có sẵn số tài khoản ngân hàng rác (mua lại từ người khác) để nhận tiền tẩu tán.'
      }
    ]
  }
];

export const WHAT_WOULD_YOU_DO_SCENARIOS_EN: DilemmaScenario[] = [
  {
    id: 'sc-1',
    title: 'Scenario 1: Urgent 2-Hour Bank Account Suspension Warning',
    context: 'You receive an SMS masquerading as your bank: "Your account was charged $650 in London. If you did not authorize this, tap the link below within 15 minutes to cancel transaction."',
    icon: 'message-square',
    options: [
      {
        id: 'opt-a',
        label: 'A',
        text: 'Tap the link immediately in fear of losing money, then sign in to verify your balance.',
        isCorrect: false,
        explanation: '❌ Extremely hazardous! This exploits SMS Sender ID Spoofing. Submitting credentials to that phishing form hands account ownership directly to attackers.'
      },
      {
        id: 'opt-b',
        label: 'B',
        text: 'Exit calmly, launch your official banking app independently, or call the hotline printed on the physical card.',
        isCorrect: true,
        explanation: '✅ 100% Correct! Always cross-verify through verified, out-of-band channels rather than trusting unsolicited SMS links.'
      },
      {
        id: 'opt-c',
        label: 'C',
        text: 'Reply to the text and upload photos of your ID card asking for cancellation.',
        isCorrect: false,
        explanation: '❌ Critical error! The sender is an automated rogue gateway; sharing personal identity documents invites synthetic identity theft.'
      }
    ]
  },
  {
    id: 'sc-2',
    title: 'Scenario 2: Social Media Friend Urgently Borrowing Money',
    context: 'A close friend\'s social account messages you unexpectedly: "Hey, I had a sudden medical emergency and urgently need $200 for hospital bills. Please wire it to this account, I will repay you tomorrow."',
    icon: 'user-check',
    options: [
      {
        id: 'opt-2a',
        label: 'A',
        text: 'Wire the money right away because your friend appears to be in an emergency.',
        isCorrect: false,
        explanation: '❌ Millions are lost to account takeover scams! Hackers compromise credentials and message entire contact lists soliciting emergency loans.'
      },
      {
        id: 'opt-2b',
        label: 'B',
        text: 'Place a direct phone call (cellular or video) or ask a private secret question only you two know before sending funds.',
        isCorrect: true,
        explanation: '✅ Exceptional vigilance! A direct voice call immediately unmasks account takeovers and verifies genuine intent.'
      },
      {
        id: 'opt-2c',
        label: 'C',
        text: 'Ask the sender to take a photo of their bank card and send it via chat.',
        isCorrect: false,
        explanation: '❌ Ineffective! Scammers utilize pre-purchased mule bank accounts to funnel and launder extorted funds instantly.'
      }
    ]
  }
];

// ==========================================
// GAME 6: SCAM ESCAPE ROOM (Thoát Khỏi Căn Phòng Hacker)
// ==========================================
export const ESCAPE_ROOM_STAGES_VI: EscapeRoomStage[] = [
  {
    stageNumber: 1,
    name: 'Phòng 1: Phá Mã Khóa Bảo Mật (Password Breaker)',
    question: 'Kẻ tấn công để lại một mẩu giấy ghi nhớ mật khẩu bị mã hóa: "P@ssw0rd123". Hacker đang sử dụng loại tấn công mật khẩu nào?',
    hint: 'Mật khẩu chứa từ ngữ phổ biến và thay thế chữ "a" thành "@", "o" thành "0".',
    clues: ['Mật khẩu dạng từ điển (Dictionary word)', 'Dùng số và ký tự thay thế đơn giản', 'Có thể bẻ khóa bằng phần mềm trong 2 giây'],
    options: [
      { text: 'A. Tấn công vét cạn từ điển (Dictionary Attack) với mật khẩu yếu', isCorrect: true, feedback: 'Mở khóa thành công! Cần dùng Passphrase dài từ 12 ký tự ngẫu nhiên.' },
      { text: 'B. Tấn công lượng tử giải mã RSA-4096', isCorrect: false, feedback: 'Chưa đúng, mật khẩu này quá đơn giản để cần đến máy tính lượng tử!' },
      { text: 'C. Tấn công cáp quang dưới biển', isCorrect: false, feedback: 'Sai rồi! Hãy chọn phương án liên quan đến cấu trúc mật khẩu.' }
    ]
  },
  {
    stageNumber: 2,
    name: 'Phòng 2: Hòm Thư Ma Ám (Email Phishing Header)',
    question: 'Trên màn hình máy chủ có một email gửi từ: "support@m0bifone-vn.com". Làm sao để bạn biết đây là kẻ mạo danh?',
    hint: 'Nhìn thật kỹ từng chữ cái trong tên thương hiệu.',
    clues: ['Chữ "o" bị biến thành số "0"', 'Đuôi tên miền không phải mobifone.vn', 'Có dấu gạch ngang bất thường'],
    options: [
      { text: 'A. Thương hiệu Mobifone thật dùng chữ cái "o", còn đây dùng số không "0"', isCorrect: true, feedback: 'Cửa phòng 2 đã bật mở! Đây là kỹ thuật Typosquatting đánh tráo ký tự.' },
      { text: 'B. Vì email có chữ support', isCorrect: false, feedback: 'Rất nhiều dịch vụ thật dùng chữ support. Điểm đáng ngờ nằm ở tên miền!' },
      { text: 'C. Vì gửi vào ban đêm', isCorrect: false, feedback: 'Thời gian gửi không quyết định tính thật giả của máy chủ.' }
    ]
  },
  {
    stageNumber: 3,
    name: 'Phòng 3: Bẫy Tên Miền Con (Subdomain Maze)',
    question: 'Hacker điều hướng bạn tới: "https://vietcombank.com.vn.tra-cuu-tai-khoan.xyz". Tên miền thực sự sở hữu website này là gì?',
    hint: 'Tên miền chính thức luôn nằm ngay sát trước dấu gạch chéo đầu tiên của đường dẫn.',
    clues: ['Phần đuôi thực sự kết thúc bằng .xyz', 'vietcombank.com.vn ở đây chỉ là subdomain cấp 2'],
    options: [
      { text: 'A. tra-cuu-tai-khoan.xyz (Trang lừa đảo)', isCorrect: true, feedback: 'Chính xác! Tên miền thực tế là phần nằm trước dấu / đầu tiên: tra-cuu-tai-khoan.xyz!' },
      { text: 'B. vietcombank.com.vn (Trang chính thức)', isCorrect: false, feedback: 'Sai lầm chết người! vietcombank.com.vn ở đây chỉ là tiền tố subdomain đánh lừa!' },
      { text: 'C. com.vn', isCorrect: false, feedback: 'Chưa đúng.' }
    ]
  },
  {
    stageNumber: 4,
    name: 'Phòng 4: Giải Mã Bằng Chứng (Catch The Hacker)',
    question: 'Kẻ lừa đảo đang cố gắng rút tiền bằng cách yêu cầu nhập gì từ điện thoại của bạn?',
    hint: 'Dãy 6 chữ số dùng một lần gửi qua tin nhắn khi thực hiện thanh toán.',
    clues: ['One-Time Password', 'Ngân hàng luôn cảnh báo: Không chia sẻ cho bất kỳ ai kể cả nhân viên ngân hàng'],
    options: [
      { text: 'A. Mã xác thực giao dịch OTP', isCorrect: true, feedback: 'Chuẩn xác! Bằng chứng phạm tội đã được gom đủ!' },
      { text: 'B. Tên trường cấp 3 của bạn', isCorrect: false, feedback: 'Không phải, câu hỏi bảo mật này không đủ để trừ tiền trực tiếp.' },
      { text: 'C. Màu sắc yêu thích', isCorrect: false, feedback: 'Sai.' }
    ]
  },
  {
    stageNumber: 5,
    name: 'Phòng 5: Căn Cứ Trung Tâm - Thoát Hiểm Thành Công 🏆',
    question: 'Hành động cuối cùng để bảo vệ thiết bị khi nghi ngờ đã lỡ bấm vào link độc hại là gì?',
    hint: 'Ngắt ngay đường truyền dữ liệu và đổi mật khẩu từ thiết bị an toàn.',
    clues: ['Ngắt WiFi/4G ngay lập tức', 'Đổi mật khẩu tài khoản ngân hàng từ một thiết bị an toàn khác', 'Báo ngân hàng khóa khẩn cấp'],
    options: [
      { text: 'A. Ngắt kết nối mạng ngay, dùng máy tính an toàn khác đổi mật khẩu và gọi ngân hàng khóa thẻ', isCorrect: true, feedback: 'BẠN ĐÃ THOÁT KHỎI ESCAPE ROOM VÀ TỐ CÁO HACKER THÀNH CÔNG! 🏆' },
      { text: 'B. Tiếp tục để máy đó và đi ngủ', isCorrect: false, feedback: 'Tuyệt đối không! Hacker có thể điều khiển máy ngầm trong đêm.' },
      { text: 'C. Chuyển thêm tiền vào tài khoản để kiểm tra', isCorrect: false, feedback: 'Sai lầm nghiêm trọng!' }
    ]
  }
];

export const ESCAPE_ROOM_STAGES_EN: EscapeRoomStage[] = [
  {
    stageNumber: 1,
    name: 'Chamber 1: Password Breaker',
    question: 'The intruder left an encrypted credential memo: "P@ssw0rd123". What vulnerability vector is being exploited?',
    hint: 'The password utilizes common dictionary roots with predictable leetspeak substitutions (@ for a, 0 for o).',
    clues: ['Dictionary word base', 'Predictable symbol substitutions', 'Can be cracked by brute-force dictionaries in seconds'],
    options: [
      { text: 'A. Dictionary attack targeting predictable weak passwords', isCorrect: true, feedback: 'Chamber unlocked! Always adopt random 14+ character passphrases.' },
      { text: 'B. Quantum cryptanalysis on RSA-4096 keys', isCorrect: false, feedback: 'Incorrect; this password is far too trivial to warrant quantum decryption!' },
      { text: 'C. Subsea fiber optic interception', isCorrect: false, feedback: 'Irrelevant to password credential strength.' }
    ]
  },
  {
    stageNumber: 2,
    name: 'Chamber 2: Phishing Header Analysis',
    question: 'An email is received originating from: "support@m0bifone-vn.com". How do you identify this as an imposter?',
    hint: 'Look closely at each glyph in the corporate brand name.',
    clues: ['The letter "o" is substituted by number "0"', 'Root domain is not mobifone.vn', 'Unusual hyphenation'],
    options: [
      { text: 'A. The real brand uses the letter "o", whereas this substitutes numeral zero "0"', isCorrect: true, feedback: 'Door 2 opened! This is a classic visual typosquatting trap.' },
      { text: 'B. Because the email starts with "support"', isCorrect: false, feedback: 'Many real services use "support". The anomaly lies in the domain name!' },
      { text: 'C. Because it arrived at night', isCorrect: false, feedback: 'Send timestamp does not determine cryptographic domain authenticity.' }
    ]
  },
  {
    stageNumber: 3,
    name: 'Chamber 3: Subdomain Deception Maze',
    question: 'You are redirected to: "https://vietcombank.com.vn.tra-cuu-tai-khoan.xyz". What is the true authoritative domain?',
    hint: 'The authoritative root domain immediately precedes the first single slash "/" in the URL path.',
    clues: ['The real extension ends with .xyz', 'vietcombank.com.vn is merely a fraudulent sub-label prefix'],
    options: [
      { text: 'A. tra-cuu-tai-khoan.xyz (Counterfeit site)', isCorrect: true, feedback: 'Precise! The authoritative host is tra-cuu-tai-khoan.xyz!' },
      { text: 'B. vietcombank.com.vn (Official bank)', isCorrect: false, feedback: 'Fatal error! vietcombank.com.vn is merely a disguised subdomain prefix!' },
      { text: 'C. com.vn', isCorrect: false, feedback: 'com.vn is a ccTLD registry, not the host owner.' }
    ]
  },
  {
    stageNumber: 4,
    name: 'Chamber 4: Evidence Interception',
    question: 'The threat actor is attempting unauthorized fund liquidation by requesting what sensitive item from your device?',
    hint: 'A 6-digit single-use numeric code sent via SMS during payment authorization.',
    clues: ['One-Time Password', 'Banks emphasize: Never share this with anyone, including staff'],
    options: [
      { text: 'A. Transaction Authorization OTP Code', isCorrect: true, feedback: 'Correct! Criminal evidence compiled successfully!' },
      { text: 'B. Your high school mascot name', isCorrect: false, feedback: 'Security questions alone cannot authorize immediate wire transfers.' },
      { text: 'C. Favorite color preference', isCorrect: false, feedback: 'Incorrect.' }
    ]
  },
  {
    stageNumber: 5,
    name: 'Chamber 5: Central Vault - Mission Complete 🏆',
    question: 'What is the immediate primary containment step when you suspect you accidentally clicked an active malicious link?',
    hint: 'Sever data transmission channels immediately and rotate credentials from an untainted device.',
    clues: ['Disconnect cellular/WiFi networks immediately', 'Rotate credentials from a separate secure device', 'Notify your financial institution to freeze cards'],
    options: [
      { text: 'A. Disconnect networks immediately, rotate passwords from a clean device, and freeze bank cards', isCorrect: true, feedback: 'YOU HAVE ESCAPED THE HACKER CHAMBERS AND EXPOSED THE THREAT! 🏆' },
      { text: 'B. Leave the device connected and go to sleep', isCorrect: false, feedback: 'Never! Remote trojans can silently drain assets overnight.' },
      { text: 'C. Transfer additional funds to verify account status', isCorrect: false, feedback: 'Disastrous mistake!' }
    ]
  }
];

// ==========================================
// KHU LEARN: Cyber Cards & Mini Quizzes
// ==========================================
export const CYBER_TIPS_VI: CyberTip[] = [
  {
    id: 1,
    code: 'BÍ KÍP #01',
    title: 'Website có HTTPS (ổ khóa xanh) chưa chắc đã an toàn!',
    content: 'Ngày nay, bất kỳ ai (kể cả kẻ lừa đảo) đều có thể tạo chứng chỉ SSL miễn phí chỉ trong 5 phút. Ổ khóa xanh chỉ có nghĩa là đường truyền được mã hóa, KHÔNG ĐỒNG NGHĨA với việc chủ nhân website đó là người lương thiện!',
    category: 'url',
    miniQuiz: {
      question: 'Nếu thấy website có biểu tượng ổ khóa HTTPS, điều đó có nghĩa là gì?',
      options: [
        'Website đó chắc chắn 100% là công ty uy tín',
        'Đường truyền dữ liệu được mã hóa, nhưng vẫn phải soi kỹ tên miền',
        'Website đó không bao giờ bị hacker tấn công'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Ổ khóa bảo vệ đường truyền, còn tên miền mới quyết định bạn đang gửi dữ liệu cho ai.'
    }
  },
  {
    id: 2,
    code: 'BÍ KÍP #02',
    title: 'Quy tắc "Chữ Sát Dấu Gạch Chéo" để tìm tên miền thật',
    content: 'Để không bị lừa bởi các đường link dài ngoằng như "vietcombank.com.vn.nhan-qua.xyz/login", hãy nhìn từ dấu gạch chéo "/" đầu tiên lùi sang trái. Tên miền thực sự ở đây là "nhan-qua.xyz", không phải Vietcombank!',
    category: 'url',
    miniQuiz: {
      question: 'Với link "https://shopee.vn.sale-khuyenmai.top/deal", website thực chất thuộc về ai?',
      options: [
        'Sàn Shopee Việt Nam',
        'Tên miền sale-khuyenmai.top (kẻ giả mạo)',
        'Cổng thanh toán quốc tế'
      ],
      correctIndex: 1,
      explanation: 'Đúng rồi! Phần đứng trước dấu / đầu tiên là sale-khuyenmai.top, shopee.vn ở đây chỉ là subdomain ngụy trang.'
    }
  },
  {
    id: 3,
    code: 'BÍ KÍP #03',
    title: 'Cơ quan Nhà nước, Tòa án, Công an không làm việc qua điện thoại',
    content: 'Theo quy định pháp luật Việt Nam, cơ quan Công an và Tòa án khi làm việc với công dân đều phải gửi Giấy triệu tập hoặc Giấy mời chính thức thông qua Công an địa phương. Tuyệt đối không có chuyện "bắt giam qua Zalo" hay "điều tra qua điện thoại"!',
    category: 'call',
    miniQuiz: {
      question: 'Khi nhận được cuộc gọi tự xưng Công an thông báo bạn dính líu đến án ma túy, bạn nên:',
      options: [
        'Chuyển tiền vào tài khoản tạm giữ để chứng minh trong sạch',
        'Cung cấp mật khẩu và số CCCD cho cán bộ',
        'Bình tĩnh dập máy, trực tiếp ra trụ sở Công an phường gần nhất để đối chứng'
      ],
      correctIndex: 2,
      explanation: 'Chuẩn xác! Mọi yêu cầu làm việc hoặc chuyển tiền qua điện thoại đều là hành vi lừa đảo chiếm đoạt tài sản.'
    }
  },
  {
    id: 4,
    code: 'BÍ KÍP #04',
    title: 'Mã OTP là chìa khóa két sắt cá nhân của bạn',
    content: 'Ngân hàng và các nhà mạng đã liên tục gửi cảnh báo: Nhân viên ngân hàng KHÔNG BAO GIỜ yêu cầu bạn đọc mã OTP hay mật khẩu tài khoản. Bất kỳ ai đòi mã OTP của bạn, người đó chắc chắn 100% đang muốn lấy cắp tiền!',
    category: 'otp',
    miniQuiz: {
      question: 'Ai là người duy nhất được biết mã OTP gửi về điện thoại của bạn?',
      options: [
        'Nhân viên hỗ trợ tổng đài ngân hàng',
        'Chính bạn và không một ai khác',
        'Người mua hàng cần kiểm tra danh tính của bạn'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! Mã OTP chỉ dùng cho một mình bạn để hoàn tất giao dịch do chính bạn chủ động thực hiện.'
    }
  }
];

export const CYBER_TIPS_EN: CyberTip[] = [
  {
    id: 1,
    code: 'TIP #01',
    title: 'HTTPS (padlock icon) does not automatically guarantee safety!',
    content: 'Today, anyone (including scammers) can provision free SSL certificates in minutes. A padlock icon merely signifies encryption in transit; it DOES NOT mean the entity controlling the site is trustworthy!',
    category: 'url',
    miniQuiz: {
      question: 'What does a browser HTTPS padlock symbol genuinely indicate?',
      options: [
        'The website is 100% guaranteed to be a legitimate business',
        'The transit connection is encrypted, but you must still inspect the root domain',
        'The website can never be compromised by cybercriminals'
      ],
      correctIndex: 1,
      explanation: 'Correct! The padlock secures traffic in transit; only the verified root domain confirms whom you are interacting with.'
    }
  },
  {
    id: 2,
    code: 'TIP #02',
    title: 'The "Immediate Slash" Rule to identify authentic root hosts',
    content: 'To avoid being duped by deceptive URLs such as "brand.com.vn.gift-claim.xyz/login", read backwards from the first single forward slash "/". The true authoritative host here is "gift-claim.xyz", not the brand!',
    category: 'url',
    miniQuiz: {
      question: 'In the URL "https://shopee.vn.sale-khuyenmai.top/deal", who actually owns the site?',
      options: [
        'The genuine Shopee portal',
        'The host sale-khuyenmai.top (counterfeit imposter)',
        'An authorized payment gateway'
      ],
      correctIndex: 1,
      explanation: 'Right! The host immediately preceding the first slash is sale-khuyenmai.top; shopee.vn is merely a deceptive sub-label.'
    }
  },
  {
    id: 3,
    code: 'TIP #03',
    title: 'Government agencies & police never conduct investigations via phone',
    content: 'Official law enforcement agencies deliver formal legal summons in person. They will NEVER initiate arrests via messaging apps or demand money transfers over telephone calls!',
    category: 'call',
    miniQuiz: {
      question: 'If an unknown caller claims to be law enforcement investigating your account, you should:',
      options: [
        'Transfer funds into an escrow holding vault to prove innocence',
        'Provide your bank credentials and national identity number to the officer',
        'Hang up calmly and visit your local municipal police station directly'
      ],
      correctIndex: 2,
      explanation: 'Spot on! Any demand for immediate wire transfers or credentials over phone calls is fraud.'
    }
  },
  {
    id: 4,
    code: 'TIP #04',
    title: 'Your OTP is your private vault key',
    content: 'Financial institutions issue constant advisories: Bank staff will NEVER ask for your One-Time Password or master account credentials. Anyone demanding your OTP is attempting unauthorized asset theft!',
    category: 'otp',
    miniQuiz: {
      question: 'Who is the sole authorized person permitted to view your received OTP code?',
      options: [
        'Bank telephone customer support representatives',
        'You and nobody else',
        'An online merchant requesting identity verification'
      ],
      correctIndex: 1,
      explanation: 'Correct! OTPs are strictly intended for you to authorize transactions initiated by yourself.'
    }
  }
];

// Helper functions for dynamic language retrieval
export function getScamDetectiveScenarios(isVi: boolean): ScamDetectiveScenario[] {
  return isVi ? SCAM_DETECTIVE_SCENARIOS_VI : SCAM_DETECTIVE_SCENARIOS_EN;
}

export function getFakeOrRealScenarios(isVi: boolean): FakeOrRealScenario[] {
  return isVi ? FAKE_OR_REAL_SCENARIOS_VI : FAKE_OR_REAL_SCENARIOS_EN;
}

export function getScamRadarLinks(isVi: boolean): RadarLink[] {
  return isVi ? SCAM_RADAR_LINKS_VI : SCAM_RADAR_LINKS_EN;
}

export function getLinkPuzzleScenarios(isVi: boolean): LinkPuzzleScenario[] {
  return isVi ? LINK_PUZZLE_SCENARIOS_VI : LINK_PUZZLE_SCENARIOS_EN;
}

export function getWhatWouldYouDoScenarios(isVi: boolean): DilemmaScenario[] {
  return isVi ? WHAT_WOULD_YOU_DO_SCENARIOS_VI : WHAT_WOULD_YOU_DO_SCENARIOS_EN;
}

export function getEscapeRoomStages(isVi: boolean): EscapeRoomStage[] {
  return isVi ? ESCAPE_ROOM_STAGES_VI : ESCAPE_ROOM_STAGES_EN;
}

export function getCyberTips(isVi: boolean): CyberTip[] {
  return isVi ? CYBER_TIPS_VI : CYBER_TIPS_EN;
}

// Backwards-compatible default exports
export const SCAM_DETECTIVE_SCENARIOS = SCAM_DETECTIVE_SCENARIOS_VI;
export const FAKE_OR_REAL_SCENARIOS = FAKE_OR_REAL_SCENARIOS_VI;
export const SCAM_RADAR_LINKS = SCAM_RADAR_LINKS_VI;
export const LINK_PUZZLE_SCENARIOS = LINK_PUZZLE_SCENARIOS_VI;
export const WHAT_WOULD_YOU_DO_SCENARIOS = WHAT_WOULD_YOU_DO_SCENARIOS_VI;
export const ESCAPE_ROOM_STAGES = ESCAPE_ROOM_STAGES_VI;
export const CYBER_TIPS = CYBER_TIPS_VI;
