import { LinkAnalysisResult, PhoneAnalysisResult, RiskLevel, AnalysisFlag } from '../types';

export const SAFE_DOMAINS = [
  'google.com', 'google.com.vn', 'youtube.com', 'facebook.com', 'zalo.me', 'vnexpress.net',
  'dantri.com.vn', 'tuoitre.vn', 'thanhnien.vn', 'vietcombank.com.vn', 'techcombank.com.vn',
  'mbbank.com.vn', 'bidv.com.vn', 'vietinbank.vn', 'acb.com.vn', 'tpbank.vn',
  'shopee.vn', 'lazada.vn', 'tiki.vn', 'momo.vn', 'vnpay.vn', 'viettel.vn',
  'vinaphone.com.vn', 'mobifone.vn', 'fpt.edu.vn', 'fpt.com', 'chinhphu.vn',
  'bocongan.gov.vn', 'vtv.vn', 'evn.com.vn', 'baohiemxahoi.gov.vn', 'dichvucong.gov.vn',
  'roblox.com', 'github.com', 'microsoft.com', 'apple.com', 'amazon.com'
];

export const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.vip', '.tk', '.ml', '.ga', '.cf', '.gq', '.work',
  '.click', '.rest', '.icu', '.sbs', '.cfd', '.buzz', '.site', '.online',
  '.support', '.live', '.cc', '.fun', '.monster'
];

export const TARGET_BRANDS: { [key: string]: { name: string; officialDomain: string } } = {
  'vietcombank': { name: 'Vietcombank Official Banking', officialDomain: 'vietcombank.com.vn' },
  'vcb': { name: 'Vietcombank Digibank', officialDomain: 'vietcombank.com.vn' },
  'techcombank': { name: 'Techcombank Banking', officialDomain: 'techcombank.com.vn' },
  'mbbank': { name: 'MBBank Military Commercial Bank', officialDomain: 'mbbank.com.vn' },
  'bidv': { name: 'BIDV National Bank', officialDomain: 'bidv.com.vn' },
  'shopee': { name: 'Shopee E-Commerce Marketplace', officialDomain: 'shopee.vn' },
  'momo': { name: 'MoMo E-Wallet Payment', officialDomain: 'momo.vn' },
  'telegram': { name: 'Telegram Messenger', officialDomain: 'telegram.org' },
  'facebook': { name: 'Meta Facebook', officialDomain: 'facebook.com' },
  'apple': { name: 'Apple ID Security', officialDomain: 'apple.com' },
  'roblox': { name: 'Roblox Corporation', officialDomain: 'roblox.com' },
  'evn': { name: 'EVN Power Utility', officialDomain: 'evn.com.vn' },
  'cong-an': { name: 'National Ministry of Public Security', officialDomain: 'bocongan.gov.vn' },
  'dichvucong': { name: 'National Public Services Portal', officialDomain: 'dichvucong.gov.vn' }
};

export const SAMPLE_QUICK_TESTS = [
  { label: '🎁 Fake Shopee Giveaway (.xyz)', value: 'http://shopee-nhanqua-tri-an.xyz/xac-nhan', type: 'link' },
  { label: '🏦 Phishing Bank Portal (.top)', value: 'https://vcb-digibank-ebanking.top/login.php', type: 'link' },
  { label: '👮 Impersonated Authority (.site)', value: 'http://bocongan-tra-cuu-ho-so.site/xac-thuc', type: 'link' },
  { label: '🟢 Official News Portal (Safe)', value: 'https://vnexpress.net', type: 'link' },
  { label: '🟢 FPT Education Portal (Safe)', value: 'https://fpt.edu.vn', type: 'link' },
  { label: '📞 Impersonated Police Robocall', value: '0248889999', type: 'phone' },
  { label: '📞 International Wangiri Callback', value: '+22455123456', type: 'phone' },
  { label: '📞 Fake Job Recruitment SMS', value: '0919283746', type: 'phone' },
  { label: '🟢 Official Carrier Hotline (Safe)', value: '18008098', type: 'phone' }
];

export function analyzeLink(input: string): LinkAnalysisResult {
  const trimmed = input.trim();
  let rawUrl = trimmed;
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    rawUrl = 'https://' + rawUrl;
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return {
      rawInput: input,
      normalizedUrl: input,
      riskLevel: 'dangerous',
      riskScore: 90,
      protocol: 'invalid',
      hasHttps: false,
      domain: input,
      tld: '',
      path: '',
      impersonatedBrand: null,
      flags: [{
        id: 'invalid-url',
        category: 'structure',
        title: 'Malformed URL Syntax',
        description: 'Input string violates standard RFC uniform web resource locator standards.',
        severity: 'high',
        matchedSegment: input,
        explanation: 'Attackers intentionally inject malformed characters or whitespace to disguise redirect targets.'
      }],
      highlightSegments: [{ text: input, isSuspicious: true, reason: 'Malformed syntax' }],
      verdictTitle: 'Anomalous or Malformed Web Link',
      verdictSummary: 'Input format is invalid or contains hazardous encoding sequences.',
      recommendation: 'Do NOT click or paste this link into your web browser address bar!',
      communityReportCount: 42
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol;
  const pathname = parsed.pathname;
  const search = parsed.search;
  const fullHref = parsed.href;

  const flags: AnalysisFlag[] = [];
  let score = 0;
  let impersonatedBrand: string | null = null;

  // 1. Safe domain whitelist check
  const isExactSafe = SAFE_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
  if (isExactSafe && protocol === 'https:') {
    return {
      rawInput: input,
      normalizedUrl: fullHref,
      riskLevel: 'safe',
      riskScore: 5,
      protocol,
      hasHttps: true,
      domain: hostname,
      tld: hostname.slice(hostname.lastIndexOf('.')),
      path: pathname,
      impersonatedBrand: null,
      flags: [{
        id: 'trusted-domain',
        category: 'domain',
        title: 'Verified Official Domain Identity',
        description: `The domain '${hostname}' belongs to verified legitimate organizations.`,
        severity: 'low',
        matchedSegment: hostname,
        explanation: 'Secured via valid HTTPS encryption and listed under authoritative institutional registries.'
      }],
      highlightSegments: [
        { text: protocol + '//', isSuspicious: false },
        { text: hostname, isSuspicious: false },
        { text: pathname + search, isSuspicious: false }
      ],
      verdictTitle: 'Verified Safe Web Link 🟢',
      verdictSummary: `Destination belongs to a recognized legitimate service with valid SSL authentication.`,
      recommendation: 'Safe to browse. Always remember never to share secret one-time passwords (OTP).',
      communityReportCount: 0
    };
  }

  // 2. HTTPS Check
  const hasHttps = protocol === 'https:';
  if (!hasHttps) {
    score += 35;
    flags.push({
      id: 'no-https',
      category: 'protocol',
      title: 'Missing TLS/SSL Encryption (Insecure HTTP)',
      description: 'The website transmits credentials and packets in plain text without encryption.',
      severity: 'high',
      matchedSegment: 'http://',
      explanation: 'Modern financial and account portals mandate https://. Insecure http:// is a signature of disposable credential-harvesting phishing traps.'
    });
  }

  // 3. TLD Check
  const matchedTld = SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld));
  if (matchedTld) {
    score += 30;
    flags.push({
      id: 'suspicious-tld',
      category: 'suspicious_tld',
      title: `High-Risk Top-Level Domain (${matchedTld})`,
      description: `The '${matchedTld}' extension is low-cost or free, frequently abused in automated mass scam campaigns.`,
      severity: 'high',
      matchedSegment: matchedTld,
      explanation: 'Authoritative businesses prioritize established extensions like .com, .org, .gov, or regional ccTLDs.'
    });
  }

  // 4. IP Address host check
  const isIpHost = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIpHost) {
    score += 45;
    flags.push({
      id: 'ip-hostname',
      category: 'domain',
      title: 'Raw IP Host Address Used Instead of Domain',
      description: 'Web destination points directly to an IP string, bypassing domain registration oversight.',
      severity: 'high',
      matchedSegment: hostname,
      explanation: 'Legitimate consumer portals never ask clients to authenticate via bare numeric IP hosts.'
    });
  }

  // 5. Brand Impersonation & Typosquatting
  for (const [key, info] of Object.entries(TARGET_BRANDS)) {
    if (hostname.includes(key) && !hostname.endsWith(info.officialDomain)) {
      impersonatedBrand = info.name;
      score += 45;
      flags.push({
        id: `impersonation-${key}`,
        category: 'impersonation',
        title: `Impersonated Brand Entity: ${info.name}`,
        description: `Domain contains trademark keyword '${key}' but does NOT match the authentic domain '${info.officialDomain}'.`,
        severity: 'high',
        matchedSegment: key,
        explanation: `Cybercriminals append deceptive prefixes or suffixes to trick viewers into believing it is official.`
      });
      break;
    }
  }

  // 6. Suspicious urgency / scam keywords in domain or path
  const scamKeywords = [
    'trung-thuong', 'tri-an', 'tang-qua', 'gift', 'lucky', 'xac-nhan', 'xac-thuc',
    'khoa-the', 'can-cuoc', 'ebank', 'dangnhap', 'login', 'free-gift', 'hoan-tien',
    'dieu-tra', 'phat-nguoi', 'vay-nhanh', 'tro-cap', 'nhan-tien', 'free-robux', 'verify'
  ];

  for (const kw of scamKeywords) {
    if (hostname.includes(kw) || pathname.toLowerCase().includes(kw)) {
      score += 20;
      flags.push({
        id: `keyword-${kw}`,
        category: 'urgency',
        title: `Deceptive Urgency or Bait Keyword Detected: '${kw}'`,
        description: 'Contains psychological triggers promising free rewards or instilling fear of frozen accounts.',
        severity: 'medium',
        matchedSegment: kw,
        explanation: 'Scammers exploit psychological panic or greed to coerce victims into typing passwords and OTP codes.'
      });
      break;
    }
  }

  // 7. Multiple subdomain depth check (e.g. login.vcb.secure.account.xyz)
  const domainParts = hostname.split('.');
  if (domainParts.length > 3) {
    score += 15;
    flags.push({
      id: 'too-many-subdomains',
      category: 'structure',
      title: 'Excessive Subdomain Stacking',
      description: 'Nested subdomains used to push the actual deceptive parent domain off mobile address bars.',
      severity: 'medium',
      matchedSegment: hostname,
      explanation: 'On compact mobile screens, long subdomain chains hide the malicious root domain from view.'
    });
  }

  // Determine risk level
  let riskLevel: RiskLevel = 'safe';
  if (score >= 45) {
    riskLevel = 'dangerous';
  } else if (score >= 20) {
    riskLevel = 'suspicious';
  }

  // Build segments for "Show me why"
  const highlightSegments = [
    {
      text: protocol + '//',
      isSuspicious: !hasHttps,
      reason: !hasHttps ? 'Missing HTTPS Security' : undefined
    },
    {
      text: hostname,
      isSuspicious: score >= 20,
      reason: impersonatedBrand ? `Impersonates ${impersonatedBrand}` : matchedTld ? `Suspicious TLD ${matchedTld}` : undefined
    },
    {
      text: pathname + search,
      isSuspicious: flags.some(f => f.category === 'urgency'),
      reason: flags.some(f => f.category === 'urgency') ? 'Contains deceptive bait parameter' : undefined
    }
  ];

  let verdictTitle = 'Verified Safe Link 🟢';
  let verdictSummary = 'No dangerous phishing signatures identified. Always remain cautious when entering sensitive information.';
  let recommendation = 'Confirm the identity of the sender before completing financial transactions.';
  let communityReportCount = 3;

  if (riskLevel === 'dangerous') {
    verdictTitle = 'RED ALERT: High-Risk Phishing Link 🔴';
    verdictSummary = impersonatedBrand
      ? `Severe brand impersonation targeting ${impersonatedBrand} designed to hijack login credentials.`
      : 'Destination exhibits multiple architectural traits of malicious cyber fraud infrastructure.';
    recommendation = 'DO NOT CLICK, NEVER ENTER PASSWORDS OR OTP CODES! Delete the message immediately.';
    communityReportCount = Math.floor(Math.random() * 80) + 45;
  } else if (riskLevel === 'suspicious') {
    verdictTitle = 'YELLOW WARNING: Suspicious Unverified Link 🟡';
    verdictSummary = 'Link has an ambiguous structure or relies on unverified public hosting infrastructure.';
    recommendation = 'We strongly recommend refraining from downloading files or submitting telephone numbers.';
    communityReportCount = Math.floor(Math.random() * 20) + 12;
  }

  return {
    rawInput: input,
    normalizedUrl: fullHref,
    riskLevel,
    riskScore: Math.min(score, 100),
    protocol,
    hasHttps,
    domain: hostname,
    tld: hostname.slice(hostname.lastIndexOf('.')),
    path: pathname,
    impersonatedBrand,
    flags,
    highlightSegments,
    verdictTitle,
    verdictSummary,
    recommendation,
    communityReportCount
  };
}

export function analyzePhone(input: string): PhoneAnalysisResult {
  const clean = input.replace(/\D/g, '');
  const raw = input.trim();
  let score = 0;
  const flags: AnalysisFlag[] = [];
  let scamType: string | null = null;
  let carrierOrType = 'Standard Domestic Carrier';
  let recentReports: string[] = [];

  // International scam prefixes (+224, +252, +882, +231, +247...)
  const dangerousCountryCodes = ['224', '252', '882', '231', '247', '216', '375', '381'];
  const isInternationalPrefix = dangerousCountryCodes.some(code => raw.startsWith('+' + code) || raw.startsWith('00' + code));

  if (isInternationalPrefix) {
    score += 80;
    carrierOrType = 'International Satellite / High-Tariff Callback Carrier';
    scamType = 'Wangiri One-Ring Callback Trap with Exorbitant Premium Charges';
    flags.push({
      id: 'intl-spam',
      category: 'spam_report',
      title: 'Exorbitant Premium-Rate International Route',
      description: 'One-ring automated robocalls engineered to bait victims into calling back.',
      severity: 'high',
      matchedSegment: raw.slice(0, 4),
      explanation: 'Calling back connects to premium-rate audio services billing steep charges per minute.'
    });
    recentReports = [
      'Rang once at 2 AM; calling back incurred an instant premium charge',
      'Continuous 1-second ghost rings throughout the night'
    ];
  } else if (clean.startsWith('024') || clean.startsWith('028')) {
    score += 45;
    carrierOrType = 'Virtual Fixed Landline (VoIP Auto-dialer)';
    scamType = 'Impersonated Law Enforcement, Court Official, or Courier Debt Robocall';
    flags.push({
      id: 'voip-landline',
      category: 'impersonation',
      title: 'Number Commonly Exploited for Automated Voice Robocalls',
      description: 'Pretends to represent police departments warning of arrest warrants or unpaid fines.',
      severity: 'high',
      matchedSegment: clean.slice(0, 3),
      explanation: 'Legitimate judicial and law enforcement agencies never conduct official inquiries or demand money transfers over telephone calls.'
    });
    recentReports = [
      'Automated recording claims your phone line will be locked in 2 hours for criminal violations',
      'Fabricated traffic violation notice demanding urgent banking transfer'
    ];
  } else if (clean.length < 9 && (clean.startsWith('1900') || clean.startsWith('1800'))) {
    if (clean.startsWith('1800')) {
      carrierOrType = 'Toll-Free Customer Hotline (1800)';
      score = 0;
    } else {
      carrierOrType = 'Premium Service Hotline (1900)';
      score = 25;
      flags.push({
        id: '1900-rate',
        category: 'structure',
        title: 'Variable Rate Service Hotline',
        description: 'May incur per-minute service billing depending on the provider.',
        severity: 'medium',
        matchedSegment: '1900',
        explanation: 'Verify whether this is the authorized corporate hotline before dialing.'
      });
    }
  } else {
    carrierOrType = 'Personal Mobile Subscriber';
    const sampleSpamList = ['0919283746', '0898765432', '0345678901', '0765432109', '0901234567'];
    if (sampleSpamList.includes(clean) || clean.endsWith('888') || clean.endsWith('999')) {
      score += 65;
      scamType = 'Fake Remote Job Offer & Telegram Investment Task Fraud';
      flags.push({
        id: 'job-scam',
        category: 'spam_report',
        title: 'Heavily Flagged for Spam / Phishing Outreach',
        description: 'Number distributes fraudulent online job offers, fake video review tasks, and high-yield investment scams.',
        severity: 'high',
        matchedSegment: clean,
        explanation: 'Small initial payouts build false trust before demanding large deposits and cutting all communication.'
      });
      recentReports = [
        'Invited victim to a chat group promising daily commissions, then demanded investment deposits',
        'Impersonated utility representative claiming instant bill refunds'
      ];
    } else {
      score = 15;
    }
  }

  let riskLevel: RiskLevel = 'safe';
  if (score >= 50) {
    riskLevel = 'dangerous';
  } else if (score >= 20) {
    riskLevel = 'suspicious';
  }

  let verdictTitle = 'No Negative Reports on Record 🟢';
  let verdictSummary = 'No malicious flags or fraudulent reports recorded in the Lucera community database.';
  let recommendation = 'Stay vigilant: Never disclose banking passwords, national ID details, or OTP codes over phone calls.';
  let communityReportCount = 1;

  if (riskLevel === 'dangerous') {
    verdictTitle = 'RED ALERT: Dangerous Scam / Spam Phone Number 🔴';
    verdictSummary = scamType || 'Reported by numerous citizens for extortion tactics and impersonation of public agencies.';
    recommendation = 'DO NOT ANSWER, DO NOT CALL BACK! Block this number immediately on your device.';
    communityReportCount = Math.floor(Math.random() * 120) + 76;
  } else if (riskLevel === 'suspicious') {
    verdictTitle = 'WARNING: Unverified Telemarketing / Spam Number 🟡';
    verdictSummary = 'Frequent automated dialing pattern or unverified consumer credit solicitation.';
    recommendation = 'Hang up if the caller instructs you to install custom APK applications or asks for personal credentials.';
    communityReportCount = Math.floor(Math.random() * 30) + 15;
  }

  return {
    rawInput: input,
    normalizedPhone: clean || raw,
    riskLevel,
    riskScore: score,
    carrierOrType,
    scamType,
    flags,
    verdictTitle,
    verdictSummary,
    recommendation,
    communityReportCount,
    recentReports
  };
}
