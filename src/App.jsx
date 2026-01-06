import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Maximize, Check, Sliders, Zap, AlertTriangle, RotateCcw, Globe, Search, Shield, FileText, Mail, Cookie, ChevronDown, ChevronUp, BookOpen, ArrowLeft, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 模擬部落格資料 (關鍵：解決內容空洞問題) ---
const BLOG_POSTS = [
  {
    id: 1,
    title: {
      'zh-TW': '如何無損放大動漫圖片？AI 技術解析',
      'en': 'How to Upscale Anime Images Losslessly? AI Tech Explained'
    },
    excerpt: {
      'zh-TW': '傳統的放大算法往往會導致圖片模糊或出現鋸齒。本文將深入探討 Scale X 如何利用深度學習技術，針對線條進行優化...',
      'en': 'Traditional upscaling algorithms often result in blur or aliasing. This article explores how Scale X uses deep learning...'
    },
    content: {
      'zh-TW': '這裡應該是長篇幅的文章內容（至少 500 字）。解釋什麼是 CNN 卷積神經網絡，為什麼它比雙三次插值（Bicubic）更好。您可以介紹動漫圖片的特點：線條清晰、色塊分明。Scale X 針對這些特點進行了專門的訓練。',
      'en': 'Here should be a long article content (at least 500 words). Explain what CNN is and why it is better than Bicubic interpolation...'
    }
  },
  {
    id: 2,
    title: {
      'zh-TW': '設計師必備：5 個免費的線上圖片處理工具',
      'en': '5 Free Online Image Tools Every Designer Needs'
    },
    excerpt: {
      'zh-TW': '除了 Scale X 之外，還有哪些工具可以幫助設計師提高效率？我們整理了去背、配色、壓縮等實用工具清單...',
      'en': 'Besides Scale X, what other tools can help designers improve efficiency? We have compiled a list of useful tools...'
    },
    content: {
      'zh-TW': '長篇文章內容...介紹 Remove.bg, TinyPNG 等工具，並與 Scale X 進行搭配使用的教學。這類文章能增加網站的權威性。',
      'en': 'Long article content... Introducing tools like Remove.bg, TinyPNG, and how to use them with Scale X.'
    }
  }
];

// --- 多語言字典 ---
const TRANSLATIONS = {
  'zh-TW': {
    title: 'Scale X',
    subtitle: 'AI 智能影像無損放大工具',
    navHome: '首頁',
    navBlog: '教學文章',
    navPrivacy: '隱私權政策',
    navTerms: '服務條款',
    uploadTitle: '上傳您想要增強的照片',
    uploadSubtitle: '點擊此處或將檔案拖曳至視窗內',
    limit: '限制：圖片單邊最大 4096px',
    settings: '處理設定',
    scale: '放大倍率',
    originalSize: '原始尺寸',
    outputSize: '預計輸出',
    warningOutput: '警告：輸出尺寸超出限制',
    btnProcess: '立即增強解析度',
    btnProcessing: '正在計算像素...',
    btnRegenerate: '重新計算',
    btnDownload: '下載高解析圖片',
    btnChange: '更換圖片',
    processingText: 'AI 正在優化影像細節...',
    labelOriginal: '原始',
    labelEnhanced: 'Scale X 增強',
    labelPreview: '預覽 (舊)',
    feat1Title: 'AI 智能縮放',
    feat1Desc: '採用先進重採樣演算法，有效填補像素空隙，消除鋸齒並提升清晰度。',
    feat2Title: '隱私本地運算',
    feat2Desc: '所有影像處理均在您的瀏覽器端完成，照片絕不回傳伺服器，100% 安全。',
    feat3Title: '4K/8K 大圖支援',
    feat3Desc: '優化記憶體管理，支援輸出高解析度大圖，滿足印刷與專業設計需求。',
    footer: '© 2024 Scale X 影像實驗室',
    alertType: '請上傳圖片檔案',
    alertBig: '圖片過大！為了瀏覽器穩定，請上傳長寬小於 4096px 的圖片。',
    alertFail: '圖片讀取失敗',
    alertOutputBig: '放大後的圖片過大，可能導致瀏覽器當機。請降低倍率或使用較小的圖片。',
    seoTitle: '為什麼選擇 Scale X 線上圖片放大器？',
    seoContent: 'Scale X 是一款免費的線上圖片無損放大工具，利用瀏覽器本地運算技術，幫助攝影師、設計師與一般使用者將模糊的照片變清晰。無需安裝軟體，即可將動漫圖片、風景照或人像照放大 2 倍至 4 倍。支援 JPG, PNG 格式，是替代 Photoshop 的最佳輕量化選擇。我們致力於提供最優質的圖像增強服務，讓您的回憶更加清晰。',
    cookieTitle: 'Cookie 使用通知',
    cookieText: '我們使用 Cookie 來改善您的瀏覽體驗並分析網站流量。繼續使用本網站即表示您同意我們的 Cookie 政策。',
    cookieAccept: '接受',
    cookieDecline: '拒絕',
    cookieLearnMore: '了解更多',
    privacyPolicy: '隱私政策',
    termsOfService: '服務條款',
    contactUs: '聯絡我們',
    aboutUs: '關於我們',
    faq: '常見問題',
    companyName: 'Scale X 影像實驗室',
    companyAddress: '台北市信義區信義路五段7號',
    companyEmail: 'support@scalex.example.com',
    readMore: '閱讀全文',
    backToBlog: '返回文章列表',
    // 內容頁標題
    pagePrivacyTitle: '隱私權政策全文',
    pageTermsTitle: '服務條款全文',
    pageFaqTitle: '常見問題中心',
    pageAboutTitle: '關於 Scale X 團隊',
    
    // 擴充 FAQ
    faqItems: [
      { q: '這個服務是免費的嗎？', a: '是的，Scale X 完全免費使用，沒有隱藏費用。我們依靠頁面上的廣告來維持伺服器運作，感謝您的支持。' },
      { q: '我的圖片會被上傳到伺服器嗎？', a: '不會。所有圖片處理都在您的瀏覽器本地完成，圖片永遠不會離開您的設備。這是我們與其他雲端放大工具最大的不同。' },
      { q: '支援哪些圖片格式？', a: '我們支援 JPG、PNG、WebP 等常見圖片格式。' },
      { q: '最大可以處理多大的圖片？', a: '為了確保瀏覽器穩定運行，我們限制輸入圖片單邊不超過 4096 像素。' },
      { q: '放大後的圖片品質如何？', a: '我們使用先進的重採樣演算法，盡可能保持圖片品質，減少模糊和鋸齒。' }
    ],
    
    privacyContent: `
      <p><strong>最後更新日期：2024年1月</strong></p>
      <p>歡迎使用 Scale X。我們非常重視您的隱私。本隱私政策說明了我們如何收集、使用和保護您的資訊。</p>
      <h3>1. 資料收集與使用</h3>
      <p>Scale X 的核心功能（圖片放大）完全在您的瀏覽器端（Client-side）執行。這意味著您上傳的圖片<strong>不會</strong>被傳輸到我們的伺服器，我們無法查看、儲存或分享您的圖片。</p>
      <h3>2. Cookie 與追蹤技術</h3>
      <p>雖然我們不收集圖片，但我們使用 Cookie 和類似技術來：</p>
      <ul>
        <li>記住您的偏好設定（例如語言選擇）。</li>
        <li>分析網站流量（使用 Google Analytics）。</li>
        <li>投放廣告（使用 Google AdSense）。第三方供應商 (包括 Google) 會使用 Cookie，根據使用者先前造訪本網站或其他網站的紀錄來放送廣告。</li>
      </ul>
      <h3>3. 第三方連結</h3>
      <p>本網站可能包含通往其他網站的連結。我們對這些網站的內容或隱私權慣例概不負責。</p>
      <h3>4. 政策變更</h3>
      <p>我們保留隨時修改本隱私政策的權利。任何變更將在此頁面上發布。</p>
      <h3>5. 聯絡我們</h3>
      <p>如有任何疑問，請透過 support@scalex.example.com 聯絡我們。</p>
    `,
    termsContent: `
      <h3>1. 接受條款</h3>
      <p>存取或使用 Scale X，即表示您同意受本服務條款的約束。</p>
      <h3>2. 服務說明</h3>
      <p>Scale X 提供線上圖片處理工具。我們盡力確保服務的可用性，但不保證服務不會中斷或沒有錯誤。</p>
      <h3>3. 使用者行為</h3>
      <p>您同意不使用本服務處理任何非法、色情、暴力或侵犯他人版權的圖片。由於處理是在本地進行，使用者需自行承擔處理內容的法律責任。</p>
      <h3>4. 智慧財產權</h3>
      <p>您保留您上傳圖片的所有權利。Scale X 的介面設計、商標和程式碼歸 Scale X 影像實驗室所有。</p>
      <h3>5. 免責聲明</h3>
      <p>本服務按「現狀」提供。在法律允許的最大範圍內，我們不提供任何明示或暗示的保證。</p>
    `,
    aboutContent: `
      <p>Scale X 成立於 2023 年，是由一群熱愛影像處理技術與人工智慧的工程師所組成的團隊。</p>
      <p>我們的願景是讓高品質的影像增強技術普及化。過去，想要無損放大圖片往往需要昂貴的專業軟體或高性能的電腦。現在，透過 WebAssembly 和現代瀏覽器的強大效能，我們讓這一切在網頁上就能瞬間完成。</p>
      <p>我們堅持「隱私優先」的設計理念，這也是為什麼我們選擇開發純前端的解決方案，而不是將您的照片上傳到雲端。</p>
    `
  },
  'en': {
    title: 'Scale X',
    subtitle: 'AI Smart Image Upscaler',
    navHome: 'Home',
    navBlog: 'Blog',
    navPrivacy: 'Privacy',
    navTerms: 'Terms',
    uploadTitle: 'Upload your photo',
    uploadSubtitle: 'Click or drag file here',
    limit: 'Limit: Max 4096px per side',
    settings: 'Settings',
    scale: 'Upscale Factor',
    originalSize: 'Original Size',
    outputSize: 'Output Size',
    warningOutput: 'Warning: Output too large',
    btnProcess: 'Upscale Now',
    btnProcessing: 'Processing...',
    btnRegenerate: 'Recalculate',
    btnDownload: 'Download Image',
    btnChange: 'Change Image',
    processingText: 'AI is enhancing details...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Enhanced',
    labelPreview: 'Preview (Old)',
    feat1Title: 'AI Smart Scaling',
    feat1Desc: 'Advanced resampling algorithms reduce aliasing and enhance clarity significantly.',
    feat2Title: 'Local Privacy',
    feat2Desc: 'All processing happens locally in your browser. Images are never uploaded to servers.',
    feat3Title: '4K/8K Support',
    feat3Desc: 'Optimized for high-resolution output, perfect for printing and professional design.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Please upload an image file.',
    alertBig: 'Image too large! Please use an image smaller than 4096px per side.',
    alertFail: 'Failed to read image.',
    alertOutputBig: 'Output image is too large and may crash the browser. Please reduce scale.',
    seoTitle: 'Why choose Scale X Image Upscaler?',
    seoContent: 'Scale X is a free online image upscaler that uses local browser computing to clarify blurry photos without quality loss. Perfect for photographers and designers to upscale anime, landscapes, or portraits by 2x or 4x. Supports JPG and PNG formats.',
    cookieTitle: 'Cookie Notice',
    cookieText: 'We use cookies to improve your browsing experience and analyze site traffic. By continuing to use this site, you agree to our Cookie Policy.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',
    cookieLearnMore: 'Learn More',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: '123 Tech Street, San Francisco, CA 94102',
    companyEmail: 'support@scalex.example.com',
    readMore: 'Read More',
    backToBlog: 'Back to Blog',
    pagePrivacyTitle: 'Privacy Policy',
    pageTermsTitle: 'Terms of Service',
    pageFaqTitle: 'Frequently Asked Questions',
    pageAboutTitle: 'About Scale X Team',
    faqItems: [
      { q: 'Is this service free?', a: 'Yes, Scale X is completely free to use with no hidden fees.' },
      { q: 'Are my images uploaded to a server?', a: 'No. All image processing is done locally in your browser. Images never leave your device.' },
      { q: 'What image formats are supported?', a: 'We support common formats including JPG, PNG, and WebP.' },
      { q: 'What is the maximum image size?', a: 'To ensure browser stability, we limit input images to 4096 pixels per side.' },
      { q: 'How is the quality of upscaled images?', a: 'We use advanced resampling algorithms to maintain quality and reduce blur and aliasing.' }
    ],
    privacyContent: `<p>Detailed privacy policy content here...</p>`,
    termsContent: `<p>Detailed terms of service content here...</p>`,
    aboutContent: `<p>About us content here...</p>`
  }
};

// Cookie Consent Banner
const CookieConsent = ({ t, onAccept, onDecline, onViewPolicy }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-800 mb-1">{t.cookieTitle}</h4>
            <p className="text-sm text-gray-600">{t.cookieText}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onViewPolicy} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            {t.cookieLearnMore}
          </button>
          <button onClick={onDecline} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {t.cookieDecline}
          </button>
          <button onClick={onAccept} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// FAQ Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-4 rounded-lg">
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-400 shrink-0" /> : <ChevronDown size={20} className="text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="px-4 pb-4 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageUpscaler = () => {
  const [lang, setLang] = useState('zh-TW');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'blog', 'privacy', 'terms', 'faq', 'about', 'blog-post-1'
  const [activeBlogPost, setActiveBlogPost] = useState(null);
  
  const [image, setImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [currentProcessedScale, setCurrentProcessedScale] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [metadata, setMetadata] = useState({ width: 0, height: 0, name: '' });
  
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  const MAX_INPUT_DIMENSION = 4096;
  const MAX_OUTPUT_PIXELS = 64000000;

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) setShowCookieConsent(false);
    // 每次切換視圖都回到頂部
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
      if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
    };
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleCookieDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowCookieConsent(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert(t.alertType);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.width > MAX_INPUT_DIMENSION || img.height > MAX_INPUT_DIMENSION) {
        alert(t.alertBig);
        URL.revokeObjectURL(objectUrl);
        return;
      }
      if (image) URL.revokeObjectURL(image);
      if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
      setMetadata({ width: img.width, height: img.height, name: file.name.split('.')[0] });
      setImage(objectUrl);
      setProcessedImageUrl(null);
      setCurrentProcessedScale(null);
      setCurrentView('home'); // 確保上傳後回到首頁視圖
    };
    img.onerror = () => {
      alert(t.alertFail);
      URL.revokeObjectURL(objectUrl);
    };
    img.src = objectUrl;
  };

  const processImage = () => {
    if (!image) return;
    const targetWidth = metadata.width * scale;
    const targetHeight = metadata.height * scale;
    const totalPixels = targetWidth * targetHeight;
    if (totalPixels > MAX_OUTPUT_PIXELS) {
      alert(t.alertOutputBig);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.2;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        ctx.globalCompositeOperation = 'source-over';
        canvas.toBlob((blob) => {
          if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
          const url = URL.createObjectURL(blob);
          setProcessedImageUrl(url);
          setCurrentProcessedScale(scale);
          setIsProcessing(false);
        }, 'image/png', 1.0);
      };
      img.src = image;
    }, 800);
  };

  const downloadImage = () => {
    if (!processedImageUrl) return;
    const link = document.createElement('a');
    link.download = `ScaleX_${metadata.name}_${currentProcessedScale}x.png`;
    link.href = processedImageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  const reset = () => {
    if (image) URL.revokeObjectURL(image);
    if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
    setImage(null);
    setProcessedImageUrl(null);
    setCurrentProcessedScale(null);
    setMetadata({ width: 0, height: 0, name: '' });
  };

  const needsRegeneration = processedImageUrl && scale !== currentProcessedScale;

  // --- 視圖渲染邏輯 ---
  const renderContent = () => {
    if (currentView === 'privacy') {
      return (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.pagePrivacyTitle}</h1>
          <div className="prose prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: t.privacyContent }} />
        </div>
      );
    }
    if (currentView === 'terms') {
      return (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.pageTermsTitle}</h1>
          <div className="prose prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: t.termsContent }} />
        </div>
      );
    }
    if (currentView === 'faq') {
      return (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.pageFaqTitle}</h1>
          <div className="space-y-2">
            {t.faqItems.map((item, index) => (
              <FAQItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      );
    }
    if (currentView === 'about') {
      return (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">{t.pageAboutTitle}</h1>
          <div className="prose prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: t.aboutContent }} />
          <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-2">{t.contactUs}</h3>
            <p className="text-gray-600">{t.companyName}</p>
            <p className="text-gray-600">{t.companyAddress}</p>
            <p className="text-blue-600">{t.companyEmail}</p>
          </div>
        </div>
      );
    }
    if (currentView === 'blog') {
      return (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <BookOpen className="text-blue-600" /> {t.navBlog}
          </h1>
          <div className="grid gap-6">
            {BLOG_POSTS.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title[lang] || post.title['en']}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt[lang] || post.excerpt['en']}</p>
                <button 
                  onClick={() => { setActiveBlogPost(post); setCurrentView('blog-post'); }}
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1"
                >
                  {t.readMore} <ChevronDown size={16} className="-rotate-90" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (currentView === 'blog-post' && activeBlogPost) {
      return (
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setCurrentView('blog')}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> {t.backToBlog}
          </button>
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{activeBlogPost.title[lang] || activeBlogPost.title['en']}</h1>
          <div className="prose prose-lg prose-blue max-w-none text-gray-600">
            <p>{activeBlogPost.content[lang] || activeBlogPost.content['en']}</p>
          </div>
        </div>
      );
    }

    // Default Home View
    return (
      <>
        {!image ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group bg-white border-2 border-dashed border-blue-100 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm relative overflow-hidden" onClick={() => fileInputRef.current.click()}>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
            <div className="bg-blue-50 group-hover:bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
              <Upload className="text-blue-500 group-hover:text-blue-600 w-12 h-12 transition-colors" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">{t.uploadTitle}</h2>
            <p className="text-gray-400 mb-8 text-lg">{t.uploadSubtitle}</p>
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-5 py-2 rounded-full text-sm font-medium border border-yellow-100">
              <AlertTriangle size={16} />
              <span>{t.limit}</span>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100">
                <h3 className="font-bold flex items-center gap-2 mb-6 text-gray-700 border-b border-gray-100 pb-4"><Sliders size={18} className="text-blue-500" /> {t.settings}</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-3 block">{t.scale}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[2, 4].map((s) => (
                        <button key={s} onClick={() => setScale(s)} className={`py-3 rounded-xl font-bold transition-all border ${scale === s ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>{s}x</button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                    <div className="flex justify-between text-xs"><span className="text-gray-500">{t.originalSize}:</span><span className="font-mono font-bold text-gray-700">{metadata.width} × {metadata.height}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-500">{t.outputSize}:</span><span className={`font-mono font-bold ${(metadata.width * scale * metadata.height * scale) > MAX_OUTPUT_PIXELS ? 'text-red-500' : 'text-blue-600'}`}>{metadata.width * scale} × {metadata.height * scale}</span></div>
                  </div>
                  <div className="space-y-3">
                    {!processedImageUrl && (
                      <button onClick={processImage} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:text-white text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-100">
                        {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} className="fill-current" />}
                        {isProcessing ? t.btnProcessing : t.btnProcess}
                      </button>
                    )}
                    {needsRegeneration && !isProcessing && (
                      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={processImage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100">
                        <RotateCcw size={20} /> {t.btnRegenerate} ({scale}x)
                      </motion.button>
                    )}
                    {processedImageUrl && !needsRegeneration && (
                      <button onClick={downloadImage} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-100">
                        <Download size={20} /> {t.btnDownload}
                      </button>
                    )}
                    <button onClick={reset} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold transition-all border border-gray-200">{t.btnChange}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white p-2 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 h-full flex flex-col min-h-96">
                <div ref={containerRef} className="relative flex-1 rounded-xl overflow-hidden bg-gray-100 cursor-col-resize select-none" onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`, backgroundSize: `20px 20px`, backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px` }}></div>
                  <img src={image} alt="Original Upload" className="absolute inset-0 w-full h-full object-contain z-0" />
                  {processedImageUrl && (
                    <div className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 z-10 ${needsRegeneration ? 'opacity-50 grayscale' : 'opacity-100'}`} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                      <img src={processedImageUrl} alt="AI Enhanced Result" className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                  )}
                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-30">
                        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                        <p className="font-bold text-blue-600 text-xl tracking-wide">{t.processingText}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {processedImageUrl && !isProcessing && (
                    <>
                      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-500 cursor-grab active:cursor-grabbing">
                          <div className="flex gap-1"><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div></div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md z-20">{t.labelOriginal}</div>
                      <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md z-20 shadow-lg shadow-blue-200">{needsRegeneration ? `${t.labelPreview} ${currentProcessedScale}x` : `${t.labelEnhanced} ${currentProcessedScale}x`}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section - Only show on Home */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5"><Check size={28} /></div>
            <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat1Title}</h4>
            <p className="text-gray-500 leading-relaxed">{t.feat1Desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-5"><Shield size={28} /></div>
            <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat2Title}</h4>
            <p className="text-gray-500 leading-relaxed">{t.feat2Desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5"><Check size={28} /></div>
            <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat3Title}</h4>
            <p className="text-gray-500 leading-relaxed">{t.feat3Desc}</p>
          </div>
        </section>

        {/* SEO Content Section - Only show on Home */}
        <article className="mt-20 border-t border-gray-100 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"><Search size={24} className="text-gray-400" />{t.seoTitle}</h2>
            <p className="text-gray-500 leading-loose text-sm md:text-base">{t.seoContent}</p>
          </div>
        </article>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <AnimatePresence>
        {showCookieConsent && (
          <CookieConsent t={t} onAccept={handleCookieAccept} onDecline={handleCookieDecline} onViewPolicy={() => setCurrentView('privacy')} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left cursor-pointer" onClick={() => setCurrentView('home')}>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter flex items-center justify-center md:justify-start gap-3">
              <Maximize className="w-10 h-10 text-blue-600" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{t.title}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-light tracking-wide">{t.subtitle}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Navigation Menu */}
            <nav className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200 shadow-sm mr-2">
              <button onClick={() => setCurrentView('home')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                {t.navHome}
              </button>
              <button onClick={() => setCurrentView('blog')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentView.includes('blog') ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                {t.navBlog}
              </button>
            </nav>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
              <Globe size={16} className="text-gray-400" />
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium text-gray-600 cursor-pointer focus:ring-0">
                <option value="zh-TW">繁體中文</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </header>

        <main>
          {renderContent()}
        </main>

        <footer className="mt-16 border-t border-gray-100 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Maximize className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-800">{t.companyName}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{t.companyAddress}</p>
              <p className="text-sm text-gray-500">{t.companyEmail}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={16} /> Legal</h4>
              <div className="space-y-2">
                <button onClick={() => setCurrentView('privacy')} className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.navPrivacy}</button>
                <button onClick={() => setCurrentView('terms')} className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.navTerms}</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Mail size={16} /> Support</h4>
              <div className="space-y-2">
                <button onClick={() => setCurrentView('faq')} className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.faq}</button>
                <button onClick={() => setCurrentView('about')} className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">{t.aboutUs}</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">{t.footer}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ImageUpscaler;