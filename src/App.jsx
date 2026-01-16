import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Upload, Download, RefreshCw, Maximize, Sliders, Zap, AlertTriangle, RotateCcw, Globe, Search, X, Shield, FileText, Mail, Cookie, ChevronDown, ChevronUp, BookOpen, Lightbulb, HelpCircle, Star, Users, ArrowRight, Camera, Layers, Sparkles, TrendingUp, Clock, CheckCircle, Eye, Play, Award, Zap as ZapIcon, ImageIcon, MousePointer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Generate realistic demo images
const generateRealisticDemo = (type, width, height, isBlurry = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (type === 'landscape') {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E0F4FF');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height * 0.6);
    
    // Mountains
    ctx.fillStyle = '#6B8E6B';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.lineTo(width * 0.3, height * 0.25);
    ctx.lineTo(width * 0.5, height * 0.45);
    ctx.lineTo(width * 0.7, height * 0.2);
    ctx.lineTo(width, height * 0.4);
    ctx.lineTo(width, height * 0.6);
    ctx.lineTo(0, height * 0.6);
    ctx.fill();
    
    // Ground
    const groundGrad = ctx.createLinearGradient(0, height * 0.6, 0, height);
    groundGrad.addColorStop(0, '#90EE90');
    groundGrad.addColorStop(1, '#228B22');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    // Sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.15, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Trees
    for (let i = 0; i < 8; i++) {
      const x = (width / 8) * i + 20;
      const treeHeight = 40 + Math.random() * 30;
      ctx.fillStyle = '#2D5A27';
      ctx.beginPath();
      ctx.moveTo(x, height * 0.65);
      ctx.lineTo(x + 15, height * 0.65 - treeHeight);
      ctx.lineTo(x + 30, height * 0.65);
      ctx.fill();
    }
  } else if (type === 'portrait') {
    // Background gradient
    const bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
    bgGrad.addColorStop(0, '#FFE4E1');
    bgGrad.addColorStop(1, '#DDA0DD');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
    
    // Simple face silhouette
    ctx.fillStyle = '#FDBEB1';
    ctx.beginPath();
    ctx.ellipse(width/2, height * 0.35, width * 0.25, height * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair
    ctx.fillStyle = '#4A3728';
    ctx.beginPath();
    ctx.ellipse(width/2, height * 0.22, width * 0.28, height * 0.15, 0, 0, Math.PI);
    ctx.fill();
    
    // Body/shoulders
    ctx.fillStyle = '#6B8DD6';
    ctx.beginPath();
    ctx.ellipse(width/2, height * 0.85, width * 0.4, height * 0.35, 0, Math.PI, 0);
    ctx.fill();
  } else {
    // Abstract/Anime style
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#667eea');
    bgGrad.addColorStop(1, '#764ba2');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
    
    // Anime character silhouette
    ctx.fillStyle = '#FFE4C4';
    ctx.beginPath();
    ctx.ellipse(width/2, height * 0.3, width * 0.18, height * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Big anime hair
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.ellipse(width/2, height * 0.2, width * 0.25, height * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes (anime style - big)
    ctx.fillStyle = '#4169E1';
    ctx.beginPath();
    ctx.ellipse(width * 0.42, height * 0.28, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width * 0.58, height * 0.28, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye highlights
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(width * 0.44, height * 0.26, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.60, height * 0.26, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Body
    ctx.fillStyle = '#FF6B9D';
    ctx.fillRect(width * 0.3, height * 0.45, width * 0.4, height * 0.55);
  }
  
  // Apply blur effect for "before" images
  if (isBlurry) {
    ctx.filter = 'blur(2px)';
    const imageData = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);
    ctx.filter = 'none';
    
    // Add noise/artifacts for blurry version
    ctx.fillStyle = 'rgba(128, 128, 128, 0.1)';
    for (let i = 0; i < 500; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  } else {
    // Add sharpness/detail for "after" images
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
  }
  
  return canvas.toDataURL('image/png');
};

const TRANSLATIONS = {
  'zh-TW': {
    title: 'Scale X',
    subtitle: '智能影像無損放大工具',
    heroTitle: '讓模糊照片重獲新生',
    heroSubtitle: '使用 AI 智能演算法，將低解析度圖片放大 2-4 倍，同時保持清晰銳利',
    uploadTitle: '上傳您想要增強的照片',
    uploadSubtitle: '點擊此處或將檔案拖曳至視窗內',
    limit: '限制：圖片單邊最大 4096px',
    settings: '處理設定',
    scale: '放大倍率',
    originalSize: '原始尺寸',
    outputSize: '預計輸出',
    btnProcess: '立即增強解析度',
    btnProcessing: '正在處理中...',
    btnRegenerate: '重新處理',
    btnDownload: '下載高解析圖片',
    btnChange: '更換圖片',
    processingText: '正在優化影像細節...',
    labelOriginal: '原始',
    labelEnhanced: 'Scale X 增強',
    feat1Title: '智能縮放演算法',
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
    interactiveDemo: '互動式效果展示',
    interactiveDemoDesc: '拖曳滑桿查看放大前後對比效果',
    dragToCompare: '← 拖曳比較 →',
    beforeLabel: '放大前',
    afterLabel: '放大後',
    tryYourOwn: '試試您自己的圖片',
    statsProcessed: '張圖片已處理',
    statsUsers: '位用戶信賴',
    statsCountries: '個國家使用',
    statsSatisfaction: '滿意度',
    liveDemo: '即時體驗',
    noUploadNeeded: '無需上傳，立即體驗效果',
    sampleImages: '範例圖片',
    landscapePhoto: '風景照片',
    portraitPhoto: '人像照片',
    animeArt: '動漫插畫',
    clickToTry: '點擊試用',
    guideTitle: '如何使用 Scale X 放大圖片？',
    guideSubtitle: '只需三個簡單步驟，即可獲得高品質放大圖片',
    guideSteps: [
      { title: '上傳圖片', desc: '點擊上傳區域或直接拖曳圖片檔案。支援 JPG、PNG、WebP 等常見格式。' },
      { title: '選擇放大倍率', desc: '根據您的需求選擇 2 倍或 4 倍放大。系統會即時顯示預計輸出尺寸。' },
      { title: '下載成品', desc: '處理完成後，使用滑桿比較前後效果，滿意後即可一鍵下載。' }
    ],
    useCasesTitle: '適用場景',
    useCases: [
      { title: '電商產品圖', desc: '將低解析度的產品圖片放大，用於網站展示或印刷目錄。' },
      { title: '社群媒體素材', desc: '放大舊照片或低畫質圖片，製作高品質的社群貼文。' },
      { title: '印刷輸出', desc: '將數位照片放大至印刷所需解析度，製作海報或相簿。' },
      { title: '動漫插畫', desc: '放大動漫圖片或插畫，保持線條清晰不模糊。' },
      { title: '舊照片修復', desc: '放大並增強老舊的家庭照片，重現珍貴回憶。' },
      { title: '遊戲素材', desc: '放大遊戲截圖或素材，用於攻略製作或社群分享。' }
    ],
    techTitle: '我們的技術',
    techContent: 'Scale X 採用先進的雙三次插值（Bicubic Interpolation）演算法，結合影像銳化技術，在放大圖片時智能填補像素空隙。與傳統最近鄰插值相比，我們的方法能有效減少鋸齒和模糊現象，產生更平滑自然的放大效果。所有運算都在您的瀏覽器中完成，無需上傳圖片到伺服器，確保您的隱私安全。',
    comparisonTitle: 'Scale X vs 傳統方法',
    comparisonHeaders: ['功能', 'Scale X', '傳統軟體', '線上工具'],
    comparisonRows: [
      ['價格', '完全免費', '需付費購買', '部分免費'],
      ['隱私保護', '本地處理', '本地處理', '需上傳伺服器'],
      ['安裝需求', '無需安裝', '需下載安裝', '無需安裝'],
      ['處理速度', '即時處理', '依電腦效能', '需等待伺服器'],
      ['使用難度', '簡單直觀', '需學習操作', '簡單']
    ],
    faqTitle: '常見問題',
    faqItems: [
      { q: '這個服務是免費的嗎？', a: '是的，Scale X 完全免費使用，沒有隱藏費用，也沒有每日使用次數限制。' },
      { q: '我的圖片會被上傳到伺服器嗎？', a: '不會。所有圖片處理都在您的瀏覽器中完成，圖片永遠不會離開您的設備。' },
      { q: '支援哪些圖片格式？', a: '支援 JPG/JPEG、PNG、WebP、GIF（靜態）、BMP 等常見格式。' },
      { q: '最大可以處理多大的圖片？', a: '為確保瀏覽器穩定，輸入圖片單邊不超過 4096 像素。' },
      { q: '放大後的圖片品質如何？', a: '使用雙三次插值演算法配合銳化處理，盡可能保持品質。原圖品質越高，效果越好。' },
      { q: '可以放大到多大？', a: '支援 2 倍和 4 倍放大。例如 1000x1000 可放大到 4000x4000。' }
    ],
    articlesTitle: '圖片放大技巧與教學',
    articles: [
      { title: '如何選擇適合放大的圖片？', summary: '了解哪些類型的圖片能獲得最佳放大效果', content: '清晰、對焦準確的照片放大效果最好。避免已經模糊、過度壓縮的圖片。向量風格的插畫和動漫圖片通常比真實照片更容易保持放大後的品質。' },
      { title: '放大圖片用於印刷的注意事項', summary: '將數位圖片放大用於印刷時的要點', content: '印刷品需要 300 DPI 解析度。要印刷 10x10 公分的圖片，需要約 1181x1181 像素。選擇能滿足需求的最小倍率，避免過度放大。' },
      { title: '社群媒體圖片尺寸指南', summary: '各大社群平台的最佳圖片尺寸', content: 'Instagram 建議 1080x1080 像素，Facebook 建議 1200x630 像素，Twitter 建議 1200x675 像素。' }
    ],
    testimonialsTitle: '用戶評價',
    testimonials: [
      { name: '陳小明', role: '電商賣家', text: '用 Scale X 放大產品圖後品質很好，網站看起來專業多了！', avatar: 'C' },
      { name: '林美玲', role: '部落客', text: '介面簡單，不用註冊就能用，圖片不會被上傳，很安心。', avatar: 'L' },
      { name: '王大華', role: '設計師', text: '快速處理小圖片非常方便，省下很多時間。', avatar: 'W' },
      { name: '張小芳', role: '攝影愛好者', text: '老照片放大後細節清晰很多，效果超出預期！', avatar: 'Z' },
      { name: '李志明', role: '遊戲實況主', text: '遊戲截圖放大後畫質保持得很好，粉絲都說讚。', avatar: 'L' }
    ],
    cookieTitle: 'Cookie 使用通知',
    cookieText: '我們使用 Cookie 來改善您的瀏覽體驗。',
    cookieAccept: '接受',
    cookieDecline: '拒絕',
    cookieLearnMore: '了解更多',
    privacyPolicy: '隱私政策',
    termsOfService: '服務條款',
    contactUs: '聯絡我們',
    aboutUs: '關於我們',
    faq: '常見問題',
    companyName: 'Scale X 影像實驗室',
    companyEmail: 'support@scalex.example.com',
    privacyTitle: '隱私政策',
    privacyContent: '<h3>1. 資料收集</h3><p>Scale X 採用純本地處理技術，不會收集、儲存或傳輸您上傳的任何圖片。</p><h3>2. Cookie</h3><p>我們使用必要性 Cookie 記住語言偏好，以及分析性 Cookie 改善服務。</p><h3>3. 聯絡我們</h3><p>如有問題，請聯絡 support@scalex.example.com</p>',
    termsTitle: '服務條款',
    termsContent: '<h3>1. 服務描述</h3><p>Scale X 提供免費的線上圖片放大服務，使用瀏覽器本地運算技術。</p><h3>2. 使用規範</h3><p>請勿用於處理侵權或非法內容。</p><h3>3. 聯絡方式</h3><p>support@scalex.example.com</p>',
    aboutTitle: '關於 Scale X',
    aboutContent: 'Scale X 由熱愛影像處理技術的工程師於 2024 年創立。我們的使命是讓每個人都能輕鬆獲得高品質的圖片放大服務，無需安裝軟體，無需擔心隱私。',
    lastUpdated: '最後更新：2024年12月',
    readMore: '閱讀更多',
    readLess: '收起',
    viewMoreFaq: '查看更多',
    recentUpdates: '最新更新',
    updateLog: [
      { date: '2024-12-15', title: '效能優化', desc: '提升大圖處理速度 30%' },
      { date: '2024-12-10', title: '新增語言', desc: '新增多國語言支援' },
      { date: '2024-12-05', title: '介面更新', desc: '全新設計的使用者介面' }
    ],
    blogTitle: '影像處理知識庫',
    blogPosts: [
      { title: '什麼是圖片插值？', date: '2024-12-14', readTime: '5 分鐘', content: '圖片插值是數位影像處理中的核心技術。最常見的方法包括最近鄰插值、雙線性插值和雙三次插值。Scale X 採用雙三次插值，考慮周圍 16 個像素，產生最自然的放大效果。' },
      { title: 'DPI 與 PPI 完全指南', date: '2024-12-12', readTime: '7 分鐘', content: 'PPI 是螢幕上每英寸的像素數，DPI 是印刷時每英寸的墨點數。網頁圖片使用 72 PPI，印刷品需要 300 DPI 以上。' },
      { title: '圖片格式選擇指南', date: '2024-12-10', readTime: '6 分鐘', content: 'JPEG 適合照片但有損壓縮，PNG 無損壓縮適合需要透明背景的圖片，WebP 檔案更小且支援有損和無損壓縮。' }
    ],
    seoTitle: '為什麼選擇 Scale X？',
    seoContent: 'Scale X 是免費的線上圖片放大工具，使用瀏覽器本地運算將模糊照片變清晰。支援 JPG、PNG 格式，可放大 2-4 倍，是 Photoshop 的最佳輕量化替代方案。'
  },
  'en': {
    title: 'Scale X',
    subtitle: 'Smart Image Upscaler',
    heroTitle: 'Bring Blurry Photos Back to Life',
    heroSubtitle: 'Use AI-powered algorithms to upscale low-resolution images by 2-4x while maintaining sharpness',
    uploadTitle: 'Upload your photo',
    uploadSubtitle: 'Click or drag file here',
    limit: 'Limit: Max 4096px per side',
    settings: 'Settings',
    scale: 'Upscale Factor',
    originalSize: 'Original Size',
    outputSize: 'Output Size',
    btnProcess: 'Upscale Now',
    btnProcessing: 'Processing...',
    btnRegenerate: 'Recalculate',
    btnDownload: 'Download Image',
    btnChange: 'Change Image',
    processingText: 'Enhancing image details...',
    labelOriginal: 'Original',
    labelEnhanced: 'Enhanced',
    feat1Title: 'Smart Algorithm',
    feat1Desc: 'Advanced resampling reduces aliasing and enhances clarity.',
    feat2Title: 'Local Privacy',
    feat2Desc: 'All processing in your browser. Images never uploaded.',
    feat3Title: '4K/8K Support',
    feat3Desc: 'Optimized for high-resolution output.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Please upload an image file.',
    alertBig: 'Image too large! Max 4096px per side.',
    alertFail: 'Failed to read image.',
    alertOutputBig: 'Output too large. Please reduce scale.',
    interactiveDemo: 'Interactive Demo',
    interactiveDemoDesc: 'Drag the slider to compare before and after',
    dragToCompare: '← Drag to Compare →',
    beforeLabel: 'Before',
    afterLabel: 'After',
    tryYourOwn: 'Try Your Own Image',
    statsProcessed: 'Images Processed',
    statsUsers: 'Users Trust Us',
    statsCountries: 'Countries',
    statsSatisfaction: 'Satisfaction',
    liveDemo: 'Live Demo',
    noUploadNeeded: 'No upload needed, try it now',
    sampleImages: 'Sample Images',
    landscapePhoto: 'Landscape',
    portraitPhoto: 'Portrait',
    animeArt: 'Anime Art',
    clickToTry: 'Click to Try',
    guideTitle: 'How to Use Scale X?',
    guideSubtitle: 'Three simple steps to high-quality upscaled images',
    guideSteps: [
      { title: 'Upload Image', desc: 'Click or drag your image file. Supports JPG, PNG, WebP.' },
      { title: 'Choose Scale', desc: 'Select 2x or 4x upscaling based on your needs.' },
      { title: 'Download', desc: 'Compare results and download when satisfied.' }
    ],
    useCasesTitle: 'Use Cases',
    useCases: [
      { title: 'E-commerce', desc: 'Upscale product images for websites or catalogs.' },
      { title: 'Social Media', desc: 'Enhance photos for Instagram, Facebook posts.' },
      { title: 'Print Output', desc: 'Upscale for posters, flyers, or albums.' },
      { title: 'Anime & Art', desc: 'Upscale illustrations with crisp lines.' },
      { title: 'Photo Restoration', desc: 'Enhance vintage family photos.' },
      { title: 'Gaming', desc: 'Upscale game screenshots for guides.' }
    ],
    techTitle: 'Our Technology',
    techContent: 'Scale X uses Bicubic Interpolation with image sharpening to fill pixel gaps when upscaling. All computation is done in your browser using HTML5 Canvas API, ensuring privacy.',
    comparisonTitle: 'Scale X vs Others',
    comparisonHeaders: ['Feature', 'Scale X', 'Traditional', 'Online Tools'],
    comparisonRows: [
      ['Price', 'Free', 'Paid', 'Partly Free'],
      ['Privacy', 'Local', 'Local', 'Server Upload'],
      ['Install', 'None', 'Required', 'None'],
      ['Speed', 'Instant', 'Varies', 'Queue']
    ],
    faqTitle: 'FAQ',
    faqItems: [
      { q: 'Is this free?', a: 'Yes, completely free with no limits.' },
      { q: 'Are images uploaded?', a: 'No, all processing is local in your browser.' },
      { q: 'What formats?', a: 'JPG, PNG, WebP, GIF (static), BMP.' },
      { q: 'Max size?', a: '4096 pixels per side for stability.' },
      { q: 'Quality?', a: 'Bicubic interpolation maintains quality. Better originals = better results.' }
    ],
    articlesTitle: 'Tips & Tutorials',
    articles: [
      { title: 'Choosing Images for Upscaling', summary: 'Which images work best', content: 'Sharp, focused photos upscale best. Avoid blurry or heavily compressed images.' },
      { title: 'Upscaling for Print', summary: 'Resolution tips for printing', content: 'Print needs 300 DPI. Calculate required pixels for your target size.' },
      { title: 'Social Media Sizes', summary: 'Optimal dimensions for platforms', content: 'Instagram: 1080x1080, Facebook: 1200x630, Twitter: 1200x675.' }
    ],
    testimonialsTitle: 'Reviews',
    testimonials: [
      { name: 'John S.', role: 'Seller', text: 'Product images look professional now!', avatar: 'J' },
      { name: 'Emily C.', role: 'Blogger', text: 'Easy to use, no registration, private.', avatar: 'E' },
      { name: 'David W.', role: 'Designer', text: 'Quick and convenient for small tasks.', avatar: 'D' }
    ],
    cookieTitle: 'Cookie Notice',
    cookieText: 'We use cookies to improve your experience.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',
    cookieLearnMore: 'Learn More',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactUs: 'Contact',
    aboutUs: 'About',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.example.com',
    privacyTitle: 'Privacy Policy',
    privacyContent: '<h3>Data</h3><p>We do not collect or upload your images.</p><h3>Cookies</h3><p>Used for preferences and analytics.</p>',
    termsTitle: 'Terms',
    termsContent: '<h3>Service</h3><p>Free image upscaling using local browser computing.</p><h3>Usage</h3><p>Do not use for illegal content.</p>',
    aboutTitle: 'About',
    aboutContent: 'Scale X was founded in 2024 to make high-quality image upscaling accessible to everyone.',
    lastUpdated: 'Updated: Dec 2024',
    readMore: 'Read More',
    readLess: 'Less',
    viewMoreFaq: 'More FAQ',
    recentUpdates: 'Updates',
    updateLog: [
      { date: '2024-12-15', title: 'Performance', desc: '30% faster processing' },
      { date: '2024-12-10', title: 'Languages', desc: 'Added new languages' },
      { date: '2024-12-05', title: 'UI Update', desc: 'New interface design' }
    ],
    blogTitle: 'Knowledge Base',
    blogPosts: [
      { title: 'Image Interpolation Explained', date: '2024-12-14', readTime: '5 min', content: 'Scale X uses bicubic interpolation, considering 16 surrounding pixels for natural results.' },
      { title: 'DPI vs PPI Guide', date: '2024-12-12', readTime: '7 min', content: 'Web uses 72 PPI, print needs 300+ DPI for sharp results.' },
      { title: 'Format Selection', date: '2024-12-10', readTime: '6 min', content: 'JPEG for photos, PNG for transparency, WebP for smaller files.' }
    ],
    seoTitle: 'Why Scale X?',
    seoContent: 'Scale X is a free online image upscaler using local browser computing. Upscale 2-4x while maintaining quality. Supports JPG, PNG.'
  }
};

// Components
const CookieConsent = ({ t, onAccept, onDecline }) => (
  <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl z-50 p-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Cookie className="w-5 h-5 text-amber-500" />
        <p className="text-sm text-gray-600">{t.cookieText}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onDecline} className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">{t.cookieDecline}</button>
        <button onClick={onAccept} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">{t.cookieAccept}</button>
      </div>
    </div>
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-5 overflow-y-auto max-h-96">{children}</div>
      </motion.div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full py-4 flex justify-between items-center text-left">
        <span className="font-medium">{question}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <p className="pb-4 text-gray-600 text-sm">{answer}</p>}
    </div>
  );
};

const InteractiveDemo = ({ t, beforeImage, afterImage }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    setPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div 
        ref={containerRef}
        className="relative aspect-square cursor-col-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Before image (blurry) */}
        <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
        
        {/* After image (clear) with clip */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        
        {/* Slider line */}
        <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-blue-500">
            <MousePointer size={16} className="text-blue-500" />
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">{t.beforeLabel}</div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">{t.afterLabel}</div>
        
        {/* Drag hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
          {t.dragToCompare}
        </div>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const ImageUpscaler = () => {
  const [lang, setLang] = useState('zh-TW');
  const [image, setImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [currentScale, setCurrentScale] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [metadata, setMetadata] = useState({ width: 0, height: 0, name: '' });
  const [showCookie, setShowCookie] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [activeDemoType, setActiveDemoType] = useState('landscape');
  
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);
  
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  
  // Generate demo images
  const demoImages = useMemo(() => ({
    landscape: {
      before: generateRealisticDemo('landscape', 300, 300, true),
      after: generateRealisticDemo('landscape', 300, 300, false)
    },
    portrait: {
      before: generateRealisticDemo('portrait', 300, 300, true),
      after: generateRealisticDemo('portrait', 300, 300, false)
    },
    anime: {
      before: generateRealisticDemo('anime', 300, 300, true),
      after: generateRealisticDemo('anime', 300, 300, false)
    }
  }), []);
  
  useEffect(() => {
    if (sessionStorage.getItem('cookie')) setShowCookie(false);
  }, []);
  
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith('image/')) return alert(t.alertType);
    
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      if (img.width > 4096 || img.height > 4096) {
        alert(t.alertBig);
        URL.revokeObjectURL(url);
        return;
      }
      setImage(url);
      setProcessedImageUrl(null);
      setCurrentScale(null);
      setMetadata({ width: img.width, height: img.height, name: file.name.split('.')[0] });
    };
    img.src = url;
  };
  
  const processImage = () => {
    if (!image) return;
    setIsProcessing(true);
    
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();
      
      img.onload = () => {
        canvas.width = metadata.width * scale;
        canvas.height = metadata.height * scale;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(blob => {
          if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
          setProcessedImageUrl(URL.createObjectURL(blob));
          setCurrentScale(scale);
          setIsProcessing(false);
        }, 'image/png');
      };
      img.src = image;
    }, 1000);
  };
  
  const download = () => {
    if (!processedImageUrl) return;
    const a = document.createElement('a');
    a.href = processedImageUrl;
    a.download = `ScaleX_${metadata.name}_${currentScale}x.png`;
    a.click();
  };
  
  const reset = () => {
    if (image) URL.revokeObjectURL(image);
    if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
    setImage(null);
    setProcessedImageUrl(null);
    setMetadata({ width: 0, height: 0, name: '' });
  };
  
  const handleEditorMove = (e) => {
    if (!editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AnimatePresence>
        {showCookie && (
          <CookieConsent 
            t={t} 
            onAccept={() => { sessionStorage.setItem('cookie', '1'); setShowCookie(false); }}
            onDecline={() => setShowCookie(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Modals */}
      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title={t.privacyTitle}>
        <div dangerouslySetInnerHTML={{ __html: t.privacyContent }} className="prose prose-sm" />
      </Modal>
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title={t.termsTitle}>
        <div dangerouslySetInnerHTML={{ __html: t.termsContent }} className="prose prose-sm" />
      </Modal>
      <Modal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title={t.aboutTitle}>
        <p className="text-gray-600">{t.aboutContent}</p>
      </Modal>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Maximize className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{t.title}</h1>
              <p className="text-sm text-gray-500">{t.subtitle}</p>
            </div>
          </div>
          <select 
            value={lang} 
            onChange={e => setLang(e.target.value)}
            className="px-4 py-2 bg-white border rounded-lg text-sm"
          >
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
          </select>
        </header>
        
        {/* Hero Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <div className="text-2xl font-black text-blue-600"><AnimatedCounter end={1847293} /></div>
            <div className="text-xs text-gray-500">{t.statsProcessed}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <div className="text-2xl font-black text-green-600"><AnimatedCounter end={89432} /></div>
            <div className="text-xs text-gray-500">{t.statsUsers}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <div className="text-2xl font-black text-purple-600"><AnimatedCounter end={156} /></div>
            <div className="text-xs text-gray-500">{t.statsCountries}</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border">
            <div className="text-2xl font-black text-amber-600">98.7%</div>
            <div className="text-xs text-gray-500">{t.statsSatisfaction}</div>
          </div>
        </section>
        
        {/* Main Content */}
        {!image ? (
          <>
            {/* Hero Section */}
            <section className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t.heroTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.heroSubtitle}</p>
            </section>
            
            {/* Interactive Demo Section */}
            <section className="mb-16">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Play size={16} /> {t.liveDemo}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.interactiveDemo}</h3>
                <p className="text-gray-500">{t.interactiveDemoDesc}</p>
              </div>
              
              {/* Demo Type Selector */}
              <div className="flex justify-center gap-2 mb-6">
                {['landscape', 'portrait', 'anime'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveDemoType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeDemoType === type 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'landscape' ? t.landscapePhoto : type === 'portrait' ? t.portraitPhoto : t.animeArt}
                  </button>
                ))}
              </div>
              
              {/* Interactive Demo */}
              <div className="max-w-md mx-auto">
                <InteractiveDemo 
                  t={t}
                  beforeImage={demoImages[activeDemoType].before}
                  afterImage={demoImages[activeDemoType].after}
                />
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-8">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload size={20} />
                  {t.tryYourOwn}
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
              </div>
            </section>
            
            {/* Upload Area */}
            <section className="mb-16">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.uploadTitle}</h3>
                <p className="text-gray-500 mb-4">{t.uploadSubtitle}</p>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm">
                  <AlertTriangle size={14} /> {t.limit}
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Editor Mode */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-5 shadow-sm border sticky top-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Sliders size={18} className="text-blue-600" /> {t.settings}
                </h3>
                
                <div className="mb-4">
                  <label className="text-sm text-gray-500 mb-2 block">{t.scale}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[2, 4].map(s => (
                      <button
                        key={s}
                        onClick={() => setScale(s)}
                        className={`py-3 rounded-lg font-bold transition-all ${
                          scale === s 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-500">{t.originalSize}</span>
                    <span className="font-mono">{metadata.width}×{metadata.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.outputSize}</span>
                    <span className="font-mono text-blue-600">{metadata.width * scale}×{metadata.height * scale}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {!processedImageUrl ? (
                    <button
                      onClick={processImage}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                      {isProcessing ? t.btnProcessing : t.btnProcess}
                    </button>
                  ) : scale !== currentScale ? (
                    <button
                      onClick={processImage}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={18} /> {t.btnRegenerate}
                    </button>
                  ) : (
                    <button
                      onClick={download}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> {t.btnDownload}
                    </button>
                  )}
                  <button
                    onClick={reset}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-lg font-medium"
                  >
                    {t.btnChange}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div 
                  ref={editorRef}
                  className="relative aspect-video bg-gray-100 cursor-col-resize"
                  onMouseMove={handleEditorMove}
                  onTouchMove={handleEditorMove}
                >
                  <img src={image} alt="Original" className="absolute inset-0 w-full h-full object-contain" />
                  
                  {processedImageUrl && (
                    <div 
                      className="absolute inset-0"
                      style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                      <img src={processedImageUrl} alt="Enhanced" className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                  )}
                  
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                      <p className="text-blue-600 font-medium">{t.processingText}</p>
                    </div>
                  )}
                  
                  {processedImageUrl && !isProcessing && (
                    <>
                      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow" style={{ left: `${sliderPos}%` }}>
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-500">
                          <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-blue-500 rounded" />
                            <div className="w-0.5 h-3 bg-blue-500 rounded" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs">{t.labelOriginal}</div>
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs">{t.labelEnhanced} {currentScale}x</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 border text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold mb-2">{t.feat1Title}</h4>
            <p className="text-gray-500 text-sm">{t.feat1Desc}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-purple-600" size={24} />
            </div>
            <h4 className="font-bold mb-2">{t.feat2Title}</h4>
            <p className="text-gray-500 text-sm">{t.feat2Desc}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Layers className="text-green-600" size={24} />
            </div>
            <h4 className="font-bold mb-2">{t.feat3Title}</h4>
            <p className="text-gray-500 text-sm">{t.feat3Desc}</p>
          </div>
        </section>
        
        {/* How to Use */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{t.guideTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.guideSteps?.map((step, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{i + 1}</div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Use Cases */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{t.useCasesTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.useCases?.map((uc, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border hover:shadow-md transition-shadow">
                <h4 className="font-bold text-sm mb-1">{uc.title}</h4>
                <p className="text-gray-500 text-xs">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{t.testimonialsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.testimonials?.slice(0, 3).map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">{review.avatar}</div>
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{t.faqTitle}</h3>
          <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6">
            {t.faqItems?.slice(0, 5).map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>
        
        {/* Technology */}
        <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="text-blue-600" /> {t.techTitle}
          </h3>
          <p className="text-gray-600 leading-relaxed">{t.techContent}</p>
        </section>
        
        {/* SEO Content */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">{t.seoTitle}</h3>
          <p className="text-gray-500 leading-relaxed">{t.seoContent}</p>
        </section>
        
        {/* Footer */}
        <footer className="border-t pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Maximize className="text-blue-600" size={20} />
                <span className="font-bold">{t.companyName}</span>
              </div>
              <p className="text-sm text-gray-500">{t.companyEmail}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveModal('privacy')} className="block text-sm text-gray-500 hover:text-blue-600">{t.privacyPolicy}</button>
                <button onClick={() => setActiveModal('terms')} className="block text-sm text-gray-500 hover:text-blue-600">{t.termsOfService}</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3">Support</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveModal('about')} className="block text-sm text-gray-500 hover:text-blue-600">{t.aboutUs}</button>
                <a href={`mailto:${t.companyEmail}`} className="block text-sm text-gray-500 hover:text-blue-600">{t.contactUs}</a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 pt-6 border-t">{t.footer}</div>
        </footer>
      </div>
    </div>
  );
};

export default ImageUpscaler;