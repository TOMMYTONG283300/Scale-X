import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Maximize, Check, Sliders, Zap, AlertTriangle, RotateCcw, Globe, Search, X, Shield, FileText, Mail, Cookie, ChevronDown, ChevronUp, BookOpen, Lightbulb, HelpCircle, Star, Users, ArrowRight, Camera, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TRANSLATIONS = {
  'zh-TW': {
    title: 'Scale X',
    subtitle: '智能影像無損放大工具',
    uploadTitle: '上傳您想要增強的照片',
    uploadSubtitle: '點擊此處或將檔案拖曳至視窗內',
    limit: '限制：圖片單邊最大 4096px',
    settings: '處理設定',
    scale: '放大倍率',
    originalSize: '原始尺寸',
    outputSize: '預計輸出',
    warningOutput: '警告：輸出尺寸超出限制',
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
    seoTitle: '為什麼選擇 Scale X 線上圖片放大器？',
    seoContent: 'Scale X 是一款免費的線上圖片無損放大工具，利用瀏覽器本地運算技術，幫助攝影師、設計師與一般使用者將模糊的照片變清晰。無需安裝軟體，即可將動漫圖片、風景照或人像照放大 2 倍至 4 倍。支援 JPG, PNG 格式，是替代 Photoshop 的最佳輕量化選擇。',
    guideTitle: '如何使用 Scale X 放大圖片？',
    guideSubtitle: '只需三個簡單步驟，即可獲得高品質放大圖片',
    guideSteps: [
      { title: '上傳圖片', desc: '點擊上傳區域或直接拖曳圖片檔案。支援 JPG、PNG、WebP 等常見格式，單邊最大 4096 像素。' },
      { title: '選擇放大倍率', desc: '根據您的需求選擇 2 倍或 4 倍放大。系統會即時顯示預計輸出尺寸，確保符合您的需求。' },
      { title: '下載成品', desc: '處理完成後，使用滑桿比較前後效果，滿意後即可一鍵下載高解析度 PNG 圖片。' }
    ],
    useCasesTitle: '適用場景',
    useCases: [
      { title: '電商產品圖', desc: '將低解析度的產品圖片放大，用於網站展示或印刷目錄，提升專業形象。' },
      { title: '社群媒體素材', desc: '放大舊照片或低畫質圖片，製作高品質的 Instagram、Facebook 貼文素材。' },
      { title: '印刷輸出', desc: '將數位照片放大至印刷所需解析度，製作海報、傳單或相簿。' },
      { title: '動漫插畫', desc: '放大網路下載的動漫圖片或插畫，保持線條清晰不模糊。' },
      { title: '舊照片修復', desc: '放大並增強老舊的家庭照片，重現珍貴回憶的細節。' },
      { title: '遊戲素材', desc: '放大遊戲截圖或素材，用於攻略製作或社群分享。' }
    ],
    techTitle: '我們的技術',
    techContent: 'Scale X 採用先進的雙三次插值（Bicubic Interpolation）演算法，結合影像銳化技術，在放大圖片時智能填補像素空隙。與傳統最近鄰插值相比，我們的方法能有效減少鋸齒和模糊現象，產生更平滑自然的放大效果。所有運算都在您的瀏覽器中使用 HTML5 Canvas API 完成，無需上傳圖片到伺服器，確保您的隱私安全。',
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
      { q: '這個服務是免費的嗎？', a: '是的，Scale X 完全免費使用，沒有隱藏費用，也沒有每日使用次數限制。我們相信高品質的圖片放大工具應該人人都能使用。' },
      { q: '我的圖片會被上傳到伺服器嗎？', a: '不會。Scale X 的核心特色就是「本地處理」。所有圖片處理都在您的瀏覽器中完成，圖片永遠不會離開您的設備，確保您的隱私和資料安全。' },
      { q: '支援哪些圖片格式？', a: '我們支援大多數常見的圖片格式，包括 JPG/JPEG、PNG、WebP、GIF（靜態）、BMP 等。輸出格式統一為高品質 PNG，以確保最佳畫質。' },
      { q: '最大可以處理多大的圖片？', a: '為了確保瀏覽器穩定運行，我們限制輸入圖片單邊不超過 4096 像素。如果您的圖片超過此限制，建議先使用其他工具縮小後再上傳。' },
      { q: '放大後的圖片品質如何？', a: '我們使用先進的雙三次插值演算法配合銳化處理，盡可能保持圖片品質，減少模糊和鋸齒。放大效果會因原圖品質而異，原圖品質越高，放大效果越好。' },
      { q: '可以放大到多大？', a: '目前支援 2 倍和 4 倍放大。例如，一張 1000x1000 的圖片可以放大到 2000x2000（2倍）或 4000x4000（4倍）。更高倍率可能導致品質下降。' },
      { q: '處理需要多長時間？', a: '處理時間取決於您的設備效能和圖片大小，通常只需 1-3 秒即可完成。較大的圖片或較舊的設備可能需要稍長時間。' },
      { q: '可以批量處理多張圖片嗎？', a: '目前版本支援單張圖片處理。我們正在開發批量處理功能，敬請期待未來更新。' }
    ],
    articlesTitle: '圖片放大技巧與教學',
    articles: [
      { title: '如何選擇適合放大的圖片？', summary: '不是所有圖片都適合放大。了解哪些類型的圖片能獲得最佳放大效果...', content: '選擇放大圖片時，原始圖片的品質至關重要。清晰、對焦準確的照片放大效果最好。避免選擇已經模糊、過度壓縮或有大量雜訊的圖片。向量圖形風格的插畫和動漫圖片通常比真實照片更容易保持放大後的品質。建議優先選擇 PNG 格式的圖片，因為它採用無損壓縮，保留更多細節。' },
      { title: '放大圖片用於印刷的注意事項', summary: '將數位圖片放大用於印刷時，需要注意解析度和色彩模式...', content: '印刷品通常需要 300 DPI（每英寸點數）的解析度才能呈現清晰效果。在放大圖片前，先計算目標印刷尺寸所需的像素數。例如，要印刷 10x10 公分的圖片，需要約 1181x1181 像素。使用 Scale X 放大時，盡量選擇能滿足需求的最小倍率，避免過度放大導致品質下降。另外，印刷通常使用 CMYK 色彩模式，可能與螢幕顯示的 RGB 顏色略有差異。' },
      { title: '社群媒體圖片尺寸指南', summary: '各大社群平台對圖片尺寸有不同要求，了解最佳尺寸讓貼文更吸引人...', content: 'Instagram 貼文建議使用 1080x1080 像素的正方形圖片，限時動態則為 1080x1920 像素。Facebook 貼文圖片建議 1200x630 像素，封面照片為 820x312 像素。Twitter 圖片建議 1200x675 像素。如果您的原始圖片較小，可以使用 Scale X 放大到適當尺寸，確保在各平台都能呈現最佳效果。' }
    ],
    testimonialsTitle: '用戶評價',
    testimonials: [
      { name: '陳小明', role: '電商賣家', text: '以前產品圖太小很困擾，用 Scale X 放大後品質很好，現在網站看起來專業多了！' },
      { name: '林美玲', role: '部落客', text: '介面很簡單，不用註冊就能用，而且圖片不會被上傳，很安心。推薦給需要放大圖片的朋友！' },
      { name: '王大華', role: '設計師', text: '雖然比不上專業軟體，但對於快速處理小圖片來說非常方便，省下很多時間。' }
    ],
    statsTitle: '為什麼信任我們',
    stats: [
      { value: '100%', label: '本地處理' },
      { value: '0', label: '資料收集' },
      { value: '免費', label: '永久免費' },
      { value: '秒級', label: '處理速度' }
    ],
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
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: '隱私政策',
    privacyContent: `<h3>1. 資料收集聲明</h3><p>Scale X 非常重視您的隱私。我們的服務採用純本地處理技術，<strong>不會收集、儲存或傳輸您上傳的任何圖片</strong>。所有影像處理均在您的瀏覽器中完成，圖片資料永遠不會離開您的設備。</p><h3>2. Cookie 使用說明</h3><p>我們使用以下類型的 Cookie：</p><ul><li><strong>必要性 Cookie</strong>：用於記住您的語言偏好設定，確保網站正常運作。</li><li><strong>分析性 Cookie</strong>：我們可能使用 Google Analytics 來了解網站使用情況，以改善我們的服務。這些資料是匿名的，不包含個人身份資訊。</li></ul><h3>3. 第三方服務</h3><p>我們的網站可能使用以下第三方服務：Google Analytics（用於網站流量分析）、Google AdSense（用於顯示廣告）。這些服務可能會根據其各自的隱私政策收集匿名使用數據。</p><h3>4. 資料安全</h3><p>由於所有圖片處理都在本地完成，您的圖片資料從未離開您的設備。這是我們能提供的最高級別隱私保護。</p><h3>5. 聯絡我們</h3><p>如有任何隱私相關問題，請透過 support@scalex.hotmail.com 聯絡我們。</p>`,
    termsTitle: '服務條款',
    termsContent: `<h3>1. 服務描述</h3><p>Scale X 提供免費的線上圖片放大服務。本服務使用瀏覽器本地運算技術，幫助用戶放大和增強圖片品質。本服務按「現狀」提供，不提供任何明示或暗示的保證。</p><h3>2. 使用資格</h3><p>使用本服務即表示您確認：您已年滿 13 歲或在父母/監護人同意下使用；您有權使用您上傳的圖片；您同意遵守這些服務條款。</p><h3>3. 可接受的使用</h3><p>用戶不得將本服務用於：處理侵犯他人版權、商標權或其他智慧財產權的圖片；處理含有非法、淫穢、誹謗或侵犯他人隱私的內容；任何違反當地法律法規的目的。</p><h3>4. 免責聲明</h3><p>Scale X 對因使用本服務而導致的任何直接或間接損失不承擔責任。</p><h3>5. 聯絡方式</h3><p>如有任何問題，請聯絡：support@scalex.hotmail.com</p>`,
    aboutTitle: '關於 Scale X',
    aboutContent: 'Scale X 是由一群熱愛影像處理技術的工程師於 2024 年創立的免費線上工具。我們的使命是讓每個人都能輕鬆獲得高品質的圖片放大服務，無需安裝任何軟體，無需擔心隱私問題。我們相信科技應該為人服務，而不是收集人們的資料。這就是為什麼我們堅持採用純本地處理技術——您的圖片永遠只存在於您的設備中。',
    lastUpdated: '最後更新：2024年12月',
    readMore: '閱讀更多',
    readLess: '收起',
    viewMoreFaq: '查看更多常見問題'
  },
  'en': {
    title: 'Scale X',
    subtitle: 'Smart Image Upscaler',
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
    processingText: 'Enhancing image details...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Enhanced',
    feat1Title: 'Smart Scaling Algorithm',
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
    guideTitle: 'How to Use Scale X?',
    guideSubtitle: 'Just three simple steps to get high-quality upscaled images',
    guideSteps: [
      { title: 'Upload Image', desc: 'Click the upload area or drag and drop your image file. Supports JPG, PNG, WebP and more, up to 4096 pixels per side.' },
      { title: 'Choose Scale Factor', desc: 'Select 2x or 4x upscaling based on your needs. The system shows the estimated output size in real-time.' },
      { title: 'Download Result', desc: 'After processing, use the slider to compare before and after. Download the high-resolution PNG when satisfied.' }
    ],
    useCasesTitle: 'Use Cases',
    useCases: [
      { title: 'E-commerce Products', desc: 'Upscale low-resolution product images for website display or print catalogs.' },
      { title: 'Social Media Content', desc: 'Enhance old photos or low-quality images for Instagram, Facebook posts.' },
      { title: 'Print Output', desc: 'Upscale digital photos to print resolution for posters, flyers, or photo albums.' },
      { title: 'Anime & Illustrations', desc: 'Upscale anime images or illustrations while keeping lines crisp and clear.' },
      { title: 'Old Photo Restoration', desc: 'Enhance and upscale vintage family photos to reveal precious memories.' },
      { title: 'Gaming Assets', desc: 'Upscale game screenshots or assets for guides or social media sharing.' }
    ],
    techTitle: 'Our Technology',
    techContent: 'Scale X uses advanced Bicubic Interpolation algorithms combined with image sharpening techniques to intelligently fill pixel gaps when upscaling. Compared to nearest-neighbor interpolation, our method effectively reduces aliasing and blur, producing smoother and more natural results. All computation is done in your browser using the HTML5 Canvas API, without uploading images to any server, ensuring your privacy and security.',
    comparisonTitle: 'Scale X vs Traditional Methods',
    comparisonHeaders: ['Feature', 'Scale X', 'Traditional Software', 'Online Tools'],
    comparisonRows: [
      ['Price', 'Completely Free', 'Paid License', 'Partly Free'],
      ['Privacy', 'Local Processing', 'Local Processing', 'Server Upload'],
      ['Installation', 'No Install Needed', 'Download Required', 'No Install'],
      ['Speed', 'Instant', 'Depends on PC', 'Server Queue'],
      ['Ease of Use', 'Simple & Intuitive', 'Learning Curve', 'Simple']
    ],
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      { q: 'Is this service free?', a: 'Yes, Scale X is completely free to use with no hidden fees and no daily usage limits.' },
      { q: 'Are my images uploaded to a server?', a: 'No. All image processing is done in your browser. Images never leave your device.' },
      { q: 'What image formats are supported?', a: 'We support most common image formats including JPG/JPEG, PNG, WebP, GIF (static), and BMP.' },
      { q: 'What is the maximum image size?', a: 'To ensure browser stability, we limit input images to 4096 pixels per side.' },
      { q: 'How is the quality of upscaled images?', a: 'We use advanced bicubic interpolation with sharpening to maintain quality and reduce blur.' },
      { q: 'How much can I upscale?', a: 'Currently we support 2x and 4x upscaling.' },
      { q: 'How long does processing take?', a: 'Processing typically takes 1-3 seconds depending on your device and image size.' },
      { q: 'Can I batch process multiple images?', a: 'The current version supports single image processing. Batch processing is planned for future updates.' }
    ],
    articlesTitle: 'Image Upscaling Tips & Tutorials',
    articles: [
      { title: 'How to Choose Images for Upscaling?', summary: 'Not all images are ideal for upscaling. Learn which types get the best results...', content: 'Original image quality is crucial when upscaling. Sharp, well-focused photos upscale best. Avoid images that are already blurry, heavily compressed, or have lots of noise. Vector-style illustrations and anime typically maintain quality better than photographs.' },
      { title: 'Upscaling Images for Print', summary: 'When upscaling digital images for print, resolution and color mode matter...', content: 'Print typically requires 300 DPI resolution for sharp results. Calculate the pixel dimensions needed for your target print size first. When using Scale X, choose the minimum scale factor that meets your needs.' },
      { title: 'Social Media Image Size Guide', summary: 'Different platforms have different image size requirements...', content: 'Instagram posts work best at 1080x1080 pixels. Facebook post images should be 1200x630 pixels. Twitter recommends 1200x675 pixels. Use Scale X to upscale smaller images to the right dimensions.' }
    ],
    testimonialsTitle: 'User Reviews',
    testimonials: [
      { name: 'John Smith', role: 'E-commerce Seller', text: 'Product images used to be too small. After upscaling with Scale X, the quality is great!' },
      { name: 'Emily Chen', role: 'Blogger', text: 'Super easy interface, no registration needed, and images stay on my device.' },
      { name: 'David Wang', role: 'Designer', text: "Incredibly convenient for quick small image tasks. Saves a lot of time." }
    ],
    statsTitle: 'Why Trust Us',
    stats: [
      { value: '100%', label: 'Local Processing' },
      { value: '0', label: 'Data Collection' },
      { value: 'Free', label: 'Always Free' },
      { value: 'Instant', label: 'Processing Speed' }
    ],
    cookieTitle: 'Cookie Notice',
    cookieText: 'We use cookies to improve your browsing experience and analyze site traffic.',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',
    cookieLearnMore: 'Learn More',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contactUs: 'Contact Us',
    aboutUs: 'About Us',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Privacy Policy',
    privacyContent: `<h3>1. Data Collection</h3><p>Scale X does not collect, store, or transmit any images you upload. All processing is done locally in your browser.</p><h3>2. Cookies</h3><p>We use essential cookies for language preferences and analytics cookies to improve our service.</p><h3>3. Third-Party Services</h3><p>We may use Google Analytics and Google AdSense. These services may collect anonymous usage data.</p><h3>4. Contact</h3><p>For privacy questions, contact support@scalex.hotmail.com</p>`,
    termsTitle: 'Terms of Service',
    termsContent: `<h3>1. Service Description</h3><p>Scale X provides free online image upscaling using browser-based local computing.</p><h3>2. Acceptable Use</h3><p>Users may not use this service for illegal purposes or to process copyrighted content without permission.</p><h3>3. Disclaimer</h3><p>Scale X is not liable for any damages resulting from the use of this service.</p><h3>4. Contact</h3><p>For questions, contact support@scalex.hotmail.com</p>`,
    aboutTitle: 'About Scale X',
    aboutContent: 'Scale X was founded in 2024 by engineers passionate about image processing technology. Our mission is to make high-quality image upscaling accessible to everyone, without installing software or worrying about privacy.',
    lastUpdated: 'Last Updated: December 2024',
    readMore: 'Read More',
    readLess: 'Show Less',
    viewMoreFaq: 'View More FAQ'
  },
  'ja': {
    title: 'Scale X',
    subtitle: 'スマート画像拡大ツール',
    uploadTitle: '写真をアップロード',
    uploadSubtitle: 'クリックまたはファイルをドラッグ',
    limit: '制限：最大一辺 4096px',
    settings: '設定',
    scale: '拡大倍率',
    originalSize: '元のサイズ',
    outputSize: '出力サイズ',
    warningOutput: '警告：出力サイズが大きすぎます',
    btnProcess: '拡大処理を開始',
    btnProcessing: '処理中...',
    btnRegenerate: '再処理',
    btnDownload: '画像をダウンロード',
    btnChange: '画像を変更',
    processingText: '画像を最適化中...',
    labelOriginal: 'オリジナル',
    labelEnhanced: 'Scale X 拡大',
    feat1Title: 'スマートスケーリング',
    feat1Desc: '高度なリサンプリング技術により、ノイズを低減し鮮明さを向上させます。',
    feat2Title: 'ローカル処理で安心',
    feat2Desc: '処理はすべてブラウザ内で行われます。画像がサーバーに送信されることはありません。',
    feat3Title: '4K/8K 対応',
    feat3Desc: '高解像度出力に最適化されており、印刷やプロのデザイン用途にも対応します。',
    footer: '© 2024 Scale X Lab',
    alertType: '画像ファイルをアップロードしてください。',
    alertBig: '画像が大きすぎます！4096px以下の画像を使用してください。',
    alertFail: '画像の読み込みに失敗しました。',
    alertOutputBig: '出力画像が大きすぎます。倍率を下げてください。',
    seoTitle: 'なぜ Scale X を選ぶ？',
    seoContent: 'Scale X は、ブラウザのローカル処理を使用して画質を落とさずに写真を拡大する無料のオンラインツールです。アニメ、風景、ポートレートを2倍から4倍に拡大できます。',
    guideTitle: 'Scale X の使い方',
    guideSubtitle: '3つの簡単なステップで高品質な拡大画像を取得',
    guideSteps: [
      { title: '画像をアップロード', desc: 'アップロードエリアをクリックするか、画像ファイルをドラッグ＆ドロップします。' },
      { title: '倍率を選択', desc: 'ニーズに応じて2倍または4倍の拡大を選択します。' },
      { title: '結果をダウンロード', desc: '処理後、スライダーで前後を比較し、満足したらダウンロードします。' }
    ],
    useCasesTitle: '使用シーン',
    useCases: [
      { title: 'ECサイト商品画像', desc: '低解像度の商品画像を拡大して、ウェブサイトや印刷カタログに使用。' },
      { title: 'SNS素材', desc: '古い写真や低画質画像を拡大してSNS投稿素材に。' },
      { title: '印刷出力', desc: 'デジタル写真を印刷用解像度に拡大。' },
      { title: 'アニメ・イラスト', desc: 'アニメ画像やイラストを線をクリアに保ちながら拡大。' },
      { title: '古い写真の修復', desc: '古い家族写真を拡大して思い出を蘇らせる。' },
      { title: 'ゲーム素材', desc: 'ゲームのスクリーンショットや素材を拡大。' }
    ],
    techTitle: '技術について',
    techContent: 'Scale X は、高度な双三次補間アルゴリズムと画像シャープニング技術を使用して、拡大時にピクセルの隙間を埋めます。すべての処理はブラウザ内でHTML5 Canvas APIを使用して行われ、サーバーに画像をアップロードしません。',
    comparisonTitle: 'Scale X vs 従来の方法',
    comparisonHeaders: ['機能', 'Scale X', '従来ソフト', 'オンラインツール'],
    comparisonRows: [
      ['価格', '完全無料', '有料ライセンス', '一部無料'],
      ['プライバシー', 'ローカル処理', 'ローカル処理', 'サーバーアップロード'],
      ['インストール', '不要', '必要', '不要'],
      ['速度', '即時', 'PC性能による', 'サーバー待ち'],
      ['使いやすさ', 'シンプル', '学習が必要', 'シンプル']
    ],
    faqTitle: 'よくある質問',
    faqItems: [
      { q: 'このサービスは無料ですか？', a: 'はい、Scale X は完全無料で、隠れた費用や使用制限はありません。' },
      { q: '画像はサーバーにアップロードされますか？', a: 'いいえ。すべての処理はブラウザ内で行われます。' },
      { q: 'どの画像形式に対応していますか？', a: 'JPG、PNG、WebP、GIF（静止画）、BMPなど主要な形式に対応しています。' },
      { q: '最大画像サイズは？', a: 'ブラウザの安定性のため、一辺4096ピクセルまでに制限しています。' },
      { q: '拡大後の画質は？', a: '高度な補間アルゴリズムで品質を維持し、ぼやけやギザギザを軽減します。' }
    ],
    articlesTitle: '画像拡大のヒント',
    articles: [
      { title: '拡大に適した画像の選び方', summary: 'すべての画像が拡大に適しているわけではありません...', content: '元画像の品質が重要です。シャープでピントが合った写真が最適です。' },
      { title: '印刷用画像の拡大', summary: '印刷用に拡大する際の注意点...', content: '印刷には通常300 DPIの解像度が必要です。' },
      { title: 'SNS画像サイズガイド', summary: '各プラットフォームの推奨サイズ...', content: 'Instagramは1080x1080px、Facebookは1200x630pxが推奨です。' }
    ],
    testimonialsTitle: 'ユーザーレビュー',
    testimonials: [
      { name: '田中太郎', role: 'ECセラー', text: '商品画像が小さくて困っていましたが、Scale X で拡大したら品質が良くなりました！' },
      { name: '鈴木花子', role: 'ブロガー', text: '登録不要で使えて、画像も安全。とても便利です。' },
      { name: '佐藤健', role: 'デザイナー', text: '小さな画像の処理に便利。時間の節約になります。' }
    ],
    statsTitle: '信頼される理由',
    stats: [
      { value: '100%', label: 'ローカル処理' },
      { value: '0', label: 'データ収集' },
      { value: '無料', label: '永久無料' },
      { value: '即時', label: '処理速度' }
    ],
    cookieTitle: 'Cookie使用のお知らせ',
    cookieText: 'ブラウジング体験の向上とサイト分析のためにCookieを使用しています。',
    cookieAccept: '同意する',
    cookieDecline: '拒否する',
    cookieLearnMore: '詳細',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    contactUs: 'お問い合わせ',
    aboutUs: '私たちについて',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'プライバシーポリシー',
    privacyContent: '<h3>データ収集</h3><p>Scale X はアップロードされた画像を収集、保存、送信しません。すべての処理はブラウザ内で行われます。</p><h3>Cookie</h3><p>言語設定とサイト分析のためにCookieを使用します。</p><h3>お問い合わせ</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: '利用規約',
    termsContent: '<h3>サービス説明</h3><p>Scale X は無料のオンライン画像拡大サービスです。</p><h3>利用制限</h3><p>違法な目的や著作権侵害には使用できません。</p><h3>お問い合わせ</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'Scale X について',
    aboutContent: 'Scale X は2024年に画像処理技術に情熱を持つエンジニアチームによって設立された無料のオンラインツールです。',
    lastUpdated: '最終更新：2024年12月',
    readMore: '続きを読む',
    readLess: '閉じる',
    viewMoreFaq: 'FAQをもっと見る'
  },
  'ko': {
    title: 'Scale X',
    subtitle: '스마트 이미지 업스케일러',
    uploadTitle: '사진 업로드',
    uploadSubtitle: '클릭하거나 파일을 드래그하세요',
    limit: '제한: 한 변 최대 4096px',
    settings: '설정',
    scale: '확대 배율',
    originalSize: '원본 크기',
    outputSize: '출력 크기',
    warningOutput: '경고: 출력 크기 초과',
    btnProcess: '확대 시작',
    btnProcessing: '처리 중...',
    btnRegenerate: '재처리',
    btnDownload: '이미지 다운로드',
    btnChange: '이미지 변경',
    processingText: '이미지 최적화 중...',
    labelOriginal: '원본',
    labelEnhanced: 'Scale X 확대',
    feat1Title: '스마트 스케일링',
    feat1Desc: '고급 리샘플링 알고리즘으로 앨리어싱을 줄이고 선명도를 높입니다.',
    feat2Title: '로컬 프라이버시',
    feat2Desc: '모든 처리는 브라우저에서 수행됩니다. 이미지는 서버로 전송되지 않습니다.',
    feat3Title: '4K/8K 지원',
    feat3Desc: '고해상도 출력에 최적화되어 인쇄 및 전문 디자인에 적합합니다.',
    footer: '© 2024 Scale X Lab',
    alertType: '이미지 파일을 업로드해주세요.',
    alertBig: '이미지가 너무 큽니다! 4096px 이하의 이미지를 사용해주세요.',
    alertFail: '이미지를 읽는 데 실패했습니다.',
    alertOutputBig: '출력 이미지가 너무 큽니다. 배율을 낮추세요.',
    seoTitle: '왜 Scale X인가요?',
    seoContent: 'Scale X는 브라우저 로컬 처리를 사용하여 품질 손실 없이 사진을 확대하는 무료 온라인 도구입니다.',
    guideTitle: 'Scale X 사용 방법',
    guideSubtitle: '세 가지 간단한 단계로 고품질 확대 이미지 얻기',
    guideSteps: [
      { title: '이미지 업로드', desc: '업로드 영역을 클릭하거나 이미지 파일을 드래그 앤 드롭하세요.' },
      { title: '배율 선택', desc: '필요에 따라 2배 또는 4배 확대를 선택하세요.' },
      { title: '결과 다운로드', desc: '처리 후 슬라이더로 전후를 비교하고 다운로드하세요.' }
    ],
    useCasesTitle: '사용 사례',
    useCases: [
      { title: '전자상거래 제품', desc: '저해상도 제품 이미지를 확대하여 웹사이트나 카탈로그에 사용.' },
      { title: '소셜 미디어 콘텐츠', desc: '오래된 사진이나 저품질 이미지를 SNS 게시물용으로 확대.' },
      { title: '인쇄 출력', desc: '디지털 사진을 인쇄용 해상도로 확대.' },
      { title: '애니메이션 & 일러스트', desc: '애니메이션 이미지나 일러스트를 선명하게 확대.' },
      { title: '오래된 사진 복원', desc: '오래된 가족 사진을 확대하여 추억을 되살림.' },
      { title: '게임 에셋', desc: '게임 스크린샷이나 에셋을 확대.' }
    ],
    techTitle: '우리의 기술',
    techContent: 'Scale X는 고급 바이큐빅 보간 알고리즘과 이미지 샤프닝 기술을 사용하여 확대 시 픽셀 간격을 지능적으로 채웁니다. 모든 처리는 브라우저에서 HTML5 Canvas API를 사용하여 수행됩니다.',
    comparisonTitle: 'Scale X vs 기존 방법',
    comparisonHeaders: ['기능', 'Scale X', '기존 소프트웨어', '온라인 도구'],
    comparisonRows: [
      ['가격', '완전 무료', '유료 라이선스', '부분 무료'],
      ['프라이버시', '로컬 처리', '로컬 처리', '서버 업로드'],
      ['설치', '불필요', '필요', '불필요'],
      ['속도', '즉시', 'PC 성능에 따름', '서버 대기'],
      ['사용 편의성', '간단함', '학습 필요', '간단함']
    ],
    faqTitle: '자주 묻는 질문',
    faqItems: [
      { q: '이 서비스는 무료인가요?', a: '네, Scale X는 완전히 무료이며 숨겨진 비용이나 사용 제한이 없습니다.' },
      { q: '이미지가 서버에 업로드되나요?', a: '아니요. 모든 처리는 브라우저에서 수행됩니다.' },
      { q: '어떤 이미지 형식을 지원하나요?', a: 'JPG, PNG, WebP, GIF(정지), BMP 등 주요 형식을 지원합니다.' },
      { q: '최대 이미지 크기는?', a: '브라우저 안정성을 위해 한 변 4096픽셀로 제한됩니다.' },
      { q: '확대 후 품질은 어떤가요?', a: '고급 보간 알고리즘으로 품질을 유지하고 흐림과 계단 현상을 줄입니다.' }
    ],
    articlesTitle: '이미지 확대 팁',
    articles: [
      { title: '확대에 적합한 이미지 선택', summary: '모든 이미지가 확대에 적합한 것은 아닙니다...', content: '원본 이미지 품질이 중요합니다. 선명하고 초점이 맞는 사진이 가장 좋습니다.' },
      { title: '인쇄용 이미지 확대', summary: '인쇄용으로 확대할 때의 주의사항...', content: '인쇄에는 일반적으로 300 DPI 해상도가 필요합니다.' },
      { title: 'SNS 이미지 크기 가이드', summary: '각 플랫폼의 권장 크기...', content: 'Instagram은 1080x1080px, Facebook은 1200x630px가 권장됩니다.' }
    ],
    testimonialsTitle: '사용자 리뷰',
    testimonials: [
      { name: '김철수', role: '온라인 판매자', text: '제품 이미지가 작아서 고민이었는데, Scale X로 확대하니 품질이 좋아졌습니다!' },
      { name: '이영희', role: '블로거', text: '가입 없이 사용할 수 있고 이미지도 안전해요. 매우 편리합니다.' },
      { name: '박민수', role: '디자이너', text: '작은 이미지 처리에 편리합니다. 시간이 많이 절약됩니다.' }
    ],
    statsTitle: '신뢰받는 이유',
    stats: [
      { value: '100%', label: '로컬 처리' },
      { value: '0', label: '데이터 수집' },
      { value: '무료', label: '영구 무료' },
      { value: '즉시', label: '처리 속도' }
    ],
    cookieTitle: '쿠키 알림',
    cookieText: '브라우징 경험 개선 및 사이트 분석을 위해 쿠키를 사용합니다.',
    cookieAccept: '동의',
    cookieDecline: '거부',
    cookieLearnMore: '자세히',
    privacyPolicy: '개인정보 보호정책',
    termsOfService: '이용약관',
    contactUs: '문의하기',
    aboutUs: '회사 소개',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: '개인정보 보호정책',
    privacyContent: '<h3>데이터 수집</h3><p>Scale X는 업로드된 이미지를 수집, 저장, 전송하지 않습니다.</p><h3>쿠키</h3><p>언어 설정과 사이트 분석을 위해 쿠키를 사용합니다.</p><h3>문의</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: '이용약관',
    termsContent: '<h3>서비스 설명</h3><p>Scale X는 무료 온라인 이미지 확대 서비스입니다.</p><h3>이용 제한</h3><p>불법적인 목적이나 저작권 침해에는 사용할 수 없습니다.</p><h3>문의</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'Scale X 소개',
    aboutContent: 'Scale X는 2024년 이미지 처리 기술에 열정적인 엔지니어 팀이 설립한 무료 온라인 도구입니다.',
    lastUpdated: '최종 업데이트: 2024년 12월',
    readMore: '더 읽기',
    readLess: '접기',
    viewMoreFaq: 'FAQ 더 보기'
  },
  'es': {
    title: 'Scale X',
    subtitle: 'Ampliador de Imágenes Inteligente',
    uploadTitle: 'Sube tu foto',
    uploadSubtitle: 'Haz clic o arrastra el archivo aquí',
    limit: 'Límite: Máx 4096px por lado',
    settings: 'Configuración',
    scale: 'Factor de Escala',
    originalSize: 'Tamaño Original',
    outputSize: 'Tamaño de Salida',
    warningOutput: 'Advertencia: Salida demasiado grande',
    btnProcess: 'Ampliar Ahora',
    btnProcessing: 'Procesando...',
    btnRegenerate: 'Recalcular',
    btnDownload: 'Descargar Imagen',
    btnChange: 'Cambiar Imagen',
    processingText: 'Optimizando detalles de la imagen...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Ampliado',
    feat1Title: 'Escalado Inteligente',
    feat1Desc: 'Algoritmos avanzados de remuestreo reducen el aliasing y mejoran la claridad.',
    feat2Title: 'Privacidad Local',
    feat2Desc: 'Todo el procesamiento ocurre localmente en tu navegador. Las imágenes nunca se suben a servidores.',
    feat3Title: 'Soporte 4K/8K',
    feat3Desc: 'Optimizado para salida de alta resolución, perfecto para impresión y diseño profesional.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Por favor, sube un archivo de imagen.',
    alertBig: '¡Imagen demasiado grande! Usa una imagen menor a 4096px.',
    alertFail: 'Error al leer la imagen.',
    alertOutputBig: 'La imagen de salida es demasiado grande. Reduce la escala.',
    seoTitle: '¿Por qué elegir Scale X?',
    seoContent: 'Scale X es una herramienta gratuita en línea para ampliar imágenes sin pérdida de calidad usando procesamiento local del navegador.',
    guideTitle: 'Cómo usar Scale X',
    guideSubtitle: 'Tres simples pasos para obtener imágenes ampliadas de alta calidad',
    guideSteps: [
      { title: 'Subir Imagen', desc: 'Haz clic en el área de carga o arrastra y suelta tu archivo de imagen.' },
      { title: 'Elegir Factor de Escala', desc: 'Selecciona ampliación de 2x o 4x según tus necesidades.' },
      { title: 'Descargar Resultado', desc: 'Después del procesamiento, usa el control deslizante para comparar y descarga cuando estés satisfecho.' }
    ],
    useCasesTitle: 'Casos de Uso',
    useCases: [
      { title: 'Productos de E-commerce', desc: 'Amplía imágenes de productos de baja resolución para mostrar en sitios web o catálogos.' },
      { title: 'Contenido para Redes Sociales', desc: 'Mejora fotos antiguas o imágenes de baja calidad para publicaciones en Instagram, Facebook.' },
      { title: 'Salida para Impresión', desc: 'Amplía fotos digitales a resolución de impresión para pósters, folletos o álbumes.' },
      { title: 'Anime e Ilustraciones', desc: 'Amplía imágenes de anime o ilustraciones manteniendo las líneas nítidas.' },
      { title: 'Restauración de Fotos Antiguas', desc: 'Mejora y amplía fotos familiares antiguas para revelar recuerdos preciosos.' },
      { title: 'Recursos de Juegos', desc: 'Amplía capturas de pantalla o recursos de juegos para guías o redes sociales.' }
    ],
    techTitle: 'Nuestra Tecnología',
    techContent: 'Scale X utiliza algoritmos avanzados de interpolación bicúbica combinados con técnicas de nitidez de imagen. Todo el cálculo se realiza en tu navegador usando la API HTML5 Canvas, sin subir imágenes a ningún servidor.',
    comparisonTitle: 'Scale X vs Métodos Tradicionales',
    comparisonHeaders: ['Característica', 'Scale X', 'Software Tradicional', 'Herramientas Online'],
    comparisonRows: [
      ['Precio', 'Completamente Gratis', 'Licencia de Pago', 'Parcialmente Gratis'],
      ['Privacidad', 'Procesamiento Local', 'Procesamiento Local', 'Subida al Servidor'],
      ['Instalación', 'No Necesita', 'Descarga Requerida', 'No Necesita'],
      ['Velocidad', 'Instantánea', 'Depende del PC', 'Cola del Servidor'],
      ['Facilidad de Uso', 'Simple e Intuitivo', 'Curva de Aprendizaje', 'Simple']
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqItems: [
      { q: '¿Este servicio es gratuito?', a: 'Sí, Scale X es completamente gratuito sin tarifas ocultas ni límites de uso diario.' },
      { q: '¿Mis imágenes se suben a un servidor?', a: 'No. Todo el procesamiento se realiza en tu navegador.' },
      { q: '¿Qué formatos de imagen son compatibles?', a: 'Soportamos JPG, PNG, WebP, GIF (estático) y BMP.' },
      { q: '¿Cuál es el tamaño máximo de imagen?', a: 'Limitamos las imágenes a 4096 píxeles por lado para estabilidad del navegador.' },
      { q: '¿Cómo es la calidad de las imágenes ampliadas?', a: 'Usamos interpolación bicúbica avanzada para mantener la calidad y reducir el desenfoque.' }
    ],
    articlesTitle: 'Consejos para Ampliar Imágenes',
    articles: [
      { title: 'Cómo Elegir Imágenes para Ampliar', summary: 'No todas las imágenes son ideales para ampliar...', content: 'La calidad de la imagen original es crucial. Las fotos nítidas y bien enfocadas se amplían mejor.' },
      { title: 'Ampliar Imágenes para Impresión', summary: 'Al ampliar para impresión, la resolución importa...', content: 'La impresión típicamente requiere 300 DPI para resultados nítidos.' },
      { title: 'Guía de Tamaños para Redes Sociales', summary: 'Diferentes plataformas tienen diferentes requisitos...', content: 'Instagram funciona mejor con 1080x1080px, Facebook con 1200x630px.' }
    ],
    testimonialsTitle: 'Opiniones de Usuarios',
    testimonials: [
      { name: 'Carlos García', role: 'Vendedor E-commerce', text: '¡Las imágenes de productos eran muy pequeñas. Después de ampliar con Scale X, la calidad es excelente!' },
      { name: 'María López', role: 'Blogger', text: 'Interfaz súper fácil, sin registro necesario, y las imágenes se quedan en mi dispositivo.' },
      { name: 'Juan Martínez', role: 'Diseñador', text: 'Increíblemente conveniente para tareas rápidas con imágenes pequeñas.' }
    ],
    statsTitle: 'Por Qué Confiar en Nosotros',
    stats: [
      { value: '100%', label: 'Procesamiento Local' },
      { value: '0', label: 'Recolección de Datos' },
      { value: 'Gratis', label: 'Siempre Gratis' },
      { value: 'Instantáneo', label: 'Velocidad de Proceso' }
    ],
    cookieTitle: 'Aviso de Cookies',
    cookieText: 'Usamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio.',
    cookieAccept: 'Aceptar',
    cookieDecline: 'Rechazar',
    cookieLearnMore: 'Saber Más',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    contactUs: 'Contacto',
    aboutUs: 'Sobre Nosotros',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Política de Privacidad',
    privacyContent: '<h3>Recopilación de Datos</h3><p>Scale X no recopila, almacena ni transmite ninguna imagen que subas.</p><h3>Cookies</h3><p>Usamos cookies esenciales para preferencias de idioma y cookies de análisis.</p><h3>Contacto</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: 'Términos de Servicio',
    termsContent: '<h3>Descripción del Servicio</h3><p>Scale X proporciona ampliación de imágenes en línea gratuita.</p><h3>Uso Aceptable</h3><p>Los usuarios no pueden usar este servicio para fines ilegales.</p><h3>Contacto</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'Sobre Scale X',
    aboutContent: 'Scale X fue fundado en 2024 por ingenieros apasionados por la tecnología de procesamiento de imágenes.',
    lastUpdated: 'Última Actualización: Diciembre 2024',
    readMore: 'Leer Más',
    readLess: 'Mostrar Menos',
    viewMoreFaq: 'Ver Más FAQ'
  },
  'pt': {
    title: 'Scale X',
    subtitle: 'Ampliador de Imagens Inteligente',
    uploadTitle: 'Carregue sua foto',
    uploadSubtitle: 'Clique ou arraste o arquivo aqui',
    limit: 'Limite: Máx 4096px por lado',
    settings: 'Configurações',
    scale: 'Fator de Escala',
    originalSize: 'Tamanho Original',
    outputSize: 'Tamanho de Saída',
    warningOutput: 'Aviso: Saída muito grande',
    btnProcess: 'Ampliar Agora',
    btnProcessing: 'Processando...',
    btnRegenerate: 'Recalcular',
    btnDownload: 'Baixar Imagem',
    btnChange: 'Trocar Imagem',
    processingText: 'Otimizando detalhes da imagem...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Ampliado',
    feat1Title: 'Escala Inteligente',
    feat1Desc: 'Algoritmos avançados de reamostragem reduzem serrilhados e melhoram a clareza.',
    feat2Title: 'Privacidade Local',
    feat2Desc: 'Todo o processamento acontece localmente no seu navegador. Imagens nunca são enviadas para servidores.',
    feat3Title: 'Suporte 4K/8K',
    feat3Desc: 'Otimizado para saída de alta resolução, perfeito para impressão e design profissional.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Por favor, carregue um arquivo de imagem.',
    alertBig: 'Imagem muito grande! Use uma imagem menor que 4096px.',
    alertFail: 'Falha ao ler a imagem.',
    alertOutputBig: 'A imagem de saída é muito grande. Reduza a escala.',
    seoTitle: 'Por que escolher Scale X?',
    seoContent: 'Scale X é uma ferramenta online gratuita para ampliar imagens sem perda de qualidade usando processamento local do navegador.',
    guideTitle: 'Como usar o Scale X',
    guideSubtitle: 'Três passos simples para obter imagens ampliadas de alta qualidade',
    guideSteps: [
      { title: 'Carregar Imagem', desc: 'Clique na área de upload ou arraste e solte seu arquivo de imagem.' },
      { title: 'Escolher Fator de Escala', desc: 'Selecione ampliação de 2x ou 4x conforme sua necessidade.' },
      { title: 'Baixar Resultado', desc: 'Após o processamento, use o controle deslizante para comparar e baixe quando satisfeito.' }
    ],
    useCasesTitle: 'Casos de Uso',
    useCases: [
      { title: 'Produtos de E-commerce', desc: 'Amplie imagens de produtos de baixa resolução para exibir em sites ou catálogos.' },
      { title: 'Conteúdo para Redes Sociais', desc: 'Melhore fotos antigas ou imagens de baixa qualidade para posts no Instagram, Facebook.' },
      { title: 'Saída para Impressão', desc: 'Amplie fotos digitais para resolução de impressão para pôsteres, folhetos ou álbuns.' },
      { title: 'Anime e Ilustrações', desc: 'Amplie imagens de anime ou ilustrações mantendo as linhas nítidas.' },
      { title: 'Restauração de Fotos Antigas', desc: 'Melhore e amplie fotos de família antigas para revelar memórias preciosas.' },
      { title: 'Recursos de Jogos', desc: 'Amplie capturas de tela ou recursos de jogos para guias ou redes sociais.' }
    ],
    techTitle: 'Nossa Tecnologia',
    techContent: 'Scale X usa algoritmos avançados de interpolação bicúbica combinados com técnicas de nitidez de imagem. Todo o cálculo é feito no seu navegador usando a API HTML5 Canvas, sem enviar imagens para nenhum servidor.',
    comparisonTitle: 'Scale X vs Métodos Tradicionais',
    comparisonHeaders: ['Recurso', 'Scale X', 'Software Tradicional', 'Ferramentas Online'],
    comparisonRows: [
      ['Preço', 'Completamente Grátis', 'Licença Paga', 'Parcialmente Grátis'],
      ['Privacidade', 'Processamento Local', 'Processamento Local', 'Upload para Servidor'],
      ['Instalação', 'Não Necessita', 'Download Necessário', 'Não Necessita'],
      ['Velocidade', 'Instantânea', 'Depende do PC', 'Fila do Servidor'],
      ['Facilidade de Uso', 'Simples e Intuitivo', 'Curva de Aprendizado', 'Simples']
    ],
    faqTitle: 'Perguntas Frequentes',
    faqItems: [
      { q: 'Este serviço é gratuito?', a: 'Sim, Scale X é completamente gratuito sem taxas ocultas ou limites de uso diário.' },
      { q: 'Minhas imagens são enviadas para um servidor?', a: 'Não. Todo o processamento é feito no seu navegador.' },
      { q: 'Quais formatos de imagem são suportados?', a: 'Suportamos JPG, PNG, WebP, GIF (estático) e BMP.' },
      { q: 'Qual é o tamanho máximo de imagem?', a: 'Limitamos imagens a 4096 pixels por lado para estabilidade do navegador.' },
      { q: 'Como é a qualidade das imagens ampliadas?', a: 'Usamos interpolação bicúbica avançada para manter a qualidade e reduzir o desfoque.' }
    ],
    articlesTitle: 'Dicas para Ampliar Imagens',
    articles: [
      { title: 'Como Escolher Imagens para Ampliar', summary: 'Nem todas as imagens são ideais para ampliar...', content: 'A qualidade da imagem original é crucial. Fotos nítidas e bem focadas ampliam melhor.' },
      { title: 'Ampliar Imagens para Impressão', summary: 'Ao ampliar para impressão, a resolução importa...', content: 'A impressão tipicamente requer 300 DPI para resultados nítidos.' },
      { title: 'Guia de Tamanhos para Redes Sociais', summary: 'Diferentes plataformas têm diferentes requisitos...', content: 'Instagram funciona melhor com 1080x1080px, Facebook com 1200x630px.' }
    ],
    testimonialsTitle: 'Avaliações de Usuários',
    testimonials: [
      { name: 'Carlos Silva', role: 'Vendedor E-commerce', text: 'As imagens de produtos eram muito pequenas. Depois de ampliar com Scale X, a qualidade ficou excelente!' },
      { name: 'Maria Santos', role: 'Blogger', text: 'Interface super fácil, sem necessidade de registro, e as imagens ficam no meu dispositivo.' },
      { name: 'João Oliveira', role: 'Designer', text: 'Incrivelmente conveniente para tarefas rápidas com imagens pequenas.' }
    ],
    statsTitle: 'Por Que Confiar em Nós',
    stats: [
      { value: '100%', label: 'Processamento Local' },
      { value: '0', label: 'Coleta de Dados' },
      { value: 'Grátis', label: 'Sempre Grátis' },
      { value: 'Instantâneo', label: 'Velocidade de Processo' }
    ],
    cookieTitle: 'Aviso de Cookies',
    cookieText: 'Usamos cookies para melhorar sua experiência de navegação e analisar o tráfego do site.',
    cookieAccept: 'Aceitar',
    cookieDecline: 'Recusar',
    cookieLearnMore: 'Saiba Mais',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    contactUs: 'Contato',
    aboutUs: 'Sobre Nós',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Política de Privacidade',
    privacyContent: '<h3>Coleta de Dados</h3><p>Scale X não coleta, armazena ou transmite nenhuma imagem que você carrega.</p><h3>Cookies</h3><p>Usamos cookies essenciais para preferências de idioma e cookies de análise.</p><h3>Contato</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: 'Termos de Serviço',
    termsContent: '<h3>Descrição do Serviço</h3><p>Scale X fornece ampliação de imagens online gratuita.</p><h3>Uso Aceitável</h3><p>Usuários não podem usar este serviço para fins ilegais.</p><h3>Contato</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'Sobre o Scale X',
    aboutContent: 'Scale X foi fundado em 2024 por engenheiros apaixonados por tecnologia de processamento de imagens.',
    lastUpdated: 'Última Atualização: Dezembro 2024',
    readMore: 'Ler Mais',
    readLess: 'Mostrar Menos',
    viewMoreFaq: 'Ver Mais FAQ'
  },
  'fr': {
    title: 'Scale X',
    subtitle: 'Agrandisseur d\'Images Intelligent',
    uploadTitle: 'Téléchargez votre photo',
    uploadSubtitle: 'Cliquez ou glissez le fichier ici',
    limit: 'Limite : Max 4096px par côté',
    settings: 'Paramètres',
    scale: 'Facteur d\'Échelle',
    originalSize: 'Taille Originale',
    outputSize: 'Taille de Sortie',
    warningOutput: 'Attention : Sortie trop grande',
    btnProcess: 'Agrandir Maintenant',
    btnProcessing: 'Traitement...',
    btnRegenerate: 'Recalculer',
    btnDownload: 'Télécharger l\'Image',
    btnChange: 'Changer d\'Image',
    processingText: 'Optimisation des détails de l\'image...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Agrandi',
    feat1Title: 'Mise à l\'Échelle Intelligente',
    feat1Desc: 'Des algorithmes de rééchantillonnage avancés réduisent l\'aliasing et améliorent la clarté.',
    feat2Title: 'Confidentialité Locale',
    feat2Desc: 'Tout le traitement se fait localement dans votre navigateur. Les images ne sont jamais téléchargées sur des serveurs.',
    feat3Title: 'Support 4K/8K',
    feat3Desc: 'Optimisé pour la sortie haute résolution, parfait pour l\'impression et le design professionnel.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Veuillez télécharger un fichier image.',
    alertBig: 'Image trop grande ! Utilisez une image inférieure à 4096px.',
    alertFail: 'Échec de la lecture de l\'image.',
    alertOutputBig: 'L\'image de sortie est trop grande. Réduisez l\'échelle.',
    seoTitle: 'Pourquoi choisir Scale X ?',
    seoContent: 'Scale X est un outil en ligne gratuit pour agrandir les images sans perte de qualité en utilisant le traitement local du navigateur.',
    guideTitle: 'Comment utiliser Scale X',
    guideSubtitle: 'Trois étapes simples pour obtenir des images agrandies de haute qualité',
    guideSteps: [
      { title: 'Télécharger l\'Image', desc: 'Cliquez sur la zone de téléchargement ou glissez-déposez votre fichier image.' },
      { title: 'Choisir le Facteur d\'Échelle', desc: 'Sélectionnez un agrandissement de 2x ou 4x selon vos besoins.' },
      { title: 'Télécharger le Résultat', desc: 'Après le traitement, utilisez le curseur pour comparer et téléchargez quand vous êtes satisfait.' }
    ],
    useCasesTitle: 'Cas d\'Utilisation',
    useCases: [
      { title: 'Produits E-commerce', desc: 'Agrandissez les images de produits basse résolution pour l\'affichage sur les sites web ou les catalogues.' },
      { title: 'Contenu Réseaux Sociaux', desc: 'Améliorez les anciennes photos ou les images de basse qualité pour les publications Instagram, Facebook.' },
      { title: 'Sortie Impression', desc: 'Agrandissez les photos numériques à la résolution d\'impression pour les affiches, dépliants ou albums.' },
      { title: 'Anime et Illustrations', desc: 'Agrandissez les images d\'anime ou les illustrations en gardant les lignes nettes.' },
      { title: 'Restauration de Photos Anciennes', desc: 'Améliorez et agrandissez les photos de famille anciennes pour révéler des souvenirs précieux.' },
      { title: 'Ressources de Jeux', desc: 'Agrandissez les captures d\'écran ou les ressources de jeux pour les guides ou les réseaux sociaux.' }
    ],
    techTitle: 'Notre Technologie',
    techContent: 'Scale X utilise des algorithmes d\'interpolation bicubique avancés combinés à des techniques de netteté d\'image. Tous les calculs sont effectués dans votre navigateur en utilisant l\'API HTML5 Canvas, sans télécharger d\'images sur aucun serveur.',
    comparisonTitle: 'Scale X vs Méthodes Traditionnelles',
    comparisonHeaders: ['Fonctionnalité', 'Scale X', 'Logiciel Traditionnel', 'Outils en Ligne'],
    comparisonRows: [
      ['Prix', 'Entièrement Gratuit', 'Licence Payante', 'Partiellement Gratuit'],
      ['Confidentialité', 'Traitement Local', 'Traitement Local', 'Téléchargement Serveur'],
      ['Installation', 'Pas Nécessaire', 'Téléchargement Requis', 'Pas Nécessaire'],
      ['Vitesse', 'Instantanée', 'Dépend du PC', 'File d\'Attente Serveur'],
      ['Facilité d\'Utilisation', 'Simple et Intuitif', 'Courbe d\'Apprentissage', 'Simple']
    ],
    faqTitle: 'Questions Fréquentes',
    faqItems: [
      { q: 'Ce service est-il gratuit ?', a: 'Oui, Scale X est entièrement gratuit sans frais cachés ni limites d\'utilisation quotidienne.' },
      { q: 'Mes images sont-elles téléchargées sur un serveur ?', a: 'Non. Tout le traitement est effectué dans votre navigateur.' },
      { q: 'Quels formats d\'image sont supportés ?', a: 'Nous supportons JPG, PNG, WebP, GIF (statique) et BMP.' },
      { q: 'Quelle est la taille maximale d\'image ?', a: 'Nous limitons les images à 4096 pixels par côté pour la stabilité du navigateur.' },
      { q: 'Quelle est la qualité des images agrandies ?', a: 'Nous utilisons une interpolation bicubique avancée pour maintenir la qualité et réduire le flou.' }
    ],
    articlesTitle: 'Conseils pour Agrandir les Images',
    articles: [
      { title: 'Comment Choisir les Images à Agrandir', summary: 'Toutes les images ne sont pas idéales pour l\'agrandissement...', content: 'La qualité de l\'image originale est cruciale. Les photos nettes et bien focalisées s\'agrandissent mieux.' },
      { title: 'Agrandir les Images pour l\'Impression', summary: 'Lors de l\'agrandissement pour l\'impression, la résolution compte...', content: 'L\'impression nécessite généralement 300 DPI pour des résultats nets.' },
      { title: 'Guide des Tailles pour les Réseaux Sociaux', summary: 'Différentes plateformes ont différentes exigences...', content: 'Instagram fonctionne mieux avec 1080x1080px, Facebook avec 1200x630px.' }
    ],
    testimonialsTitle: 'Avis des Utilisateurs',
    testimonials: [
      { name: 'Pierre Dupont', role: 'Vendeur E-commerce', text: 'Les images de produits étaient trop petites. Après agrandissement avec Scale X, la qualité est excellente !' },
      { name: 'Marie Martin', role: 'Blogueuse', text: 'Interface super facile, pas d\'inscription nécessaire, et les images restent sur mon appareil.' },
      { name: 'Jean Bernard', role: 'Designer', text: 'Incroyablement pratique pour les tâches rapides avec de petites images.' }
    ],
    statsTitle: 'Pourquoi Nous Faire Confiance',
    stats: [
      { value: '100%', label: 'Traitement Local' },
      { value: '0', label: 'Collecte de Données' },
      { value: 'Gratuit', label: 'Toujours Gratuit' },
      { value: 'Instantané', label: 'Vitesse de Traitement' }
    ],
    cookieTitle: 'Avis sur les Cookies',
    cookieText: 'Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser le trafic du site.',
    cookieAccept: 'Accepter',
    cookieDecline: 'Refuser',
    cookieLearnMore: 'En Savoir Plus',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    contactUs: 'Nous Contacter',
    aboutUs: 'À Propos',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Politique de Confidentialité',
    privacyContent: '<h3>Collecte de Données</h3><p>Scale X ne collecte, stocke ou transmet aucune image que vous téléchargez.</p><h3>Cookies</h3><p>Nous utilisons des cookies essentiels pour les préférences de langue et des cookies d\'analyse.</p><h3>Contact</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: 'Conditions d\'Utilisation',
    termsContent: '<h3>Description du Service</h3><p>Scale X fournit un agrandissement d\'images en ligne gratuit.</p><h3>Utilisation Acceptable</h3><p>Les utilisateurs ne peuvent pas utiliser ce service à des fins illégales.</p><h3>Contact</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'À Propos de Scale X',
    aboutContent: 'Scale X a été fondé en 2024 par des ingénieurs passionnés par la technologie de traitement d\'images.',
    lastUpdated: 'Dernière Mise à Jour : Décembre 2024',
    readMore: 'Lire Plus',
    readLess: 'Afficher Moins',
    viewMoreFaq: 'Voir Plus de FAQ'
  },
  'de': {
    title: 'Scale X',
    subtitle: 'Intelligenter Bildvergrößerer',
    uploadTitle: 'Laden Sie Ihr Foto hoch',
    uploadSubtitle: 'Klicken oder Datei hierher ziehen',
    limit: 'Limit: Max 4096px pro Seite',
    settings: 'Einstellungen',
    scale: 'Skalierungsfaktor',
    originalSize: 'Originalgröße',
    outputSize: 'Ausgabegröße',
    warningOutput: 'Warnung: Ausgabe zu groß',
    btnProcess: 'Jetzt Vergrößern',
    btnProcessing: 'Verarbeitung...',
    btnRegenerate: 'Neu Berechnen',
    btnDownload: 'Bild Herunterladen',
    btnChange: 'Bild Ändern',
    processingText: 'Bilddetails werden optimiert...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Vergrößert',
    feat1Title: 'Intelligente Skalierung',
    feat1Desc: 'Fortschrittliche Resampling-Algorithmen reduzieren Aliasing und verbessern die Klarheit.',
    feat2Title: 'Lokale Privatsphäre',
    feat2Desc: 'Alle Verarbeitung findet lokal in Ihrem Browser statt. Bilder werden nie auf Server hochgeladen.',
    feat3Title: '4K/8K Unterstützung',
    feat3Desc: 'Optimiert für hochauflösende Ausgabe, perfekt für Druck und professionelles Design.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Bitte laden Sie eine Bilddatei hoch.',
    alertBig: 'Bild zu groß! Bitte verwenden Sie ein Bild kleiner als 4096px.',
    alertFail: 'Bild konnte nicht gelesen werden.',
    alertOutputBig: 'Das Ausgabebild ist zu groß. Bitte reduzieren Sie die Skalierung.',
    seoTitle: 'Warum Scale X wählen?',
    seoContent: 'Scale X ist ein kostenloses Online-Tool zum Vergrößern von Bildern ohne Qualitätsverlust durch lokale Browser-Verarbeitung.',
    guideTitle: 'Wie man Scale X benutzt',
    guideSubtitle: 'Drei einfache Schritte für hochwertige vergrößerte Bilder',
    guideSteps: [
      { title: 'Bild Hochladen', desc: 'Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Bilddatei per Drag & Drop.' },
      { title: 'Skalierungsfaktor Wählen', desc: 'Wählen Sie 2x oder 4x Vergrößerung je nach Bedarf.' },
      { title: 'Ergebnis Herunterladen', desc: 'Nach der Verarbeitung verwenden Sie den Schieberegler zum Vergleichen und laden Sie herunter.' }
    ],
    useCasesTitle: 'Anwendungsfälle',
    useCases: [
      { title: 'E-Commerce Produkte', desc: 'Vergrößern Sie niedrig aufgelöste Produktbilder für Website-Anzeige oder Druckkataloge.' },
      { title: 'Social Media Inhalte', desc: 'Verbessern Sie alte Fotos oder niedrig qualitative Bilder für Instagram, Facebook Posts.' },
      { title: 'Druckausgabe', desc: 'Vergrößern Sie digitale Fotos auf Druckauflösung für Poster, Flyer oder Alben.' },
      { title: 'Anime & Illustrationen', desc: 'Vergrößern Sie Anime-Bilder oder Illustrationen und halten Sie die Linien scharf.' },
      { title: 'Alte Foto Restaurierung', desc: 'Verbessern und vergrößern Sie alte Familienfotos um kostbare Erinnerungen zu enthüllen.' },
      { title: 'Gaming Assets', desc: 'Vergrößern Sie Spiel-Screenshots oder Assets für Guides oder Social Media.' }
    ],
    techTitle: 'Unsere Technologie',
    techContent: 'Scale X verwendet fortschrittliche bikubische Interpolationsalgorithmen kombiniert mit Bildschärfungstechniken. Alle Berechnungen werden in Ihrem Browser mit der HTML5 Canvas API durchgeführt, ohne Bilder auf einen Server hochzuladen.',
    comparisonTitle: 'Scale X vs Traditionelle Methoden',
    comparisonHeaders: ['Funktion', 'Scale X', 'Traditionelle Software', 'Online-Tools'],
    comparisonRows: [
      ['Preis', 'Völlig Kostenlos', 'Bezahlte Lizenz', 'Teilweise Kostenlos'],
      ['Privatsphäre', 'Lokale Verarbeitung', 'Lokale Verarbeitung', 'Server-Upload'],
      ['Installation', 'Nicht Nötig', 'Download Erforderlich', 'Nicht Nötig'],
      ['Geschwindigkeit', 'Sofort', 'Abhängig vom PC', 'Server-Warteschlange'],
      ['Benutzerfreundlichkeit', 'Einfach & Intuitiv', 'Lernkurve', 'Einfach']
    ],
    faqTitle: 'Häufig Gestellte Fragen',
    faqItems: [
      { q: 'Ist dieser Service kostenlos?', a: 'Ja, Scale X ist völlig kostenlos ohne versteckte Gebühren oder tägliche Nutzungslimits.' },
      { q: 'Werden meine Bilder auf einen Server hochgeladen?', a: 'Nein. Alle Verarbeitung wird in Ihrem Browser durchgeführt.' },
      { q: 'Welche Bildformate werden unterstützt?', a: 'Wir unterstützen JPG, PNG, WebP, GIF (statisch) und BMP.' },
      { q: 'Was ist die maximale Bildgröße?', a: 'Wir begrenzen Bilder auf 4096 Pixel pro Seite für Browser-Stabilität.' },
      { q: 'Wie ist die Qualität der vergrößerten Bilder?', a: 'Wir verwenden fortschrittliche bikubische Interpolation um Qualität zu erhalten und Unschärfe zu reduzieren.' }
    ],
    articlesTitle: 'Tipps zur Bildvergrößerung',
    articles: [
      { title: 'Wie man Bilder zum Vergrößern auswählt', summary: 'Nicht alle Bilder sind ideal zum Vergrößern...', content: 'Die Qualität des Originalbildes ist entscheidend. Scharfe, gut fokussierte Fotos vergrößern sich am besten.' },
      { title: 'Bilder für den Druck vergrößern', summary: 'Beim Vergrößern für den Druck ist die Auflösung wichtig...', content: 'Druck erfordert typischerweise 300 DPI für scharfe Ergebnisse.' },
      { title: 'Social Media Bildgrößen-Guide', summary: 'Verschiedene Plattformen haben verschiedene Anforderungen...', content: 'Instagram funktioniert am besten mit 1080x1080px, Facebook mit 1200x630px.' }
    ],
    testimonialsTitle: 'Nutzerbewertungen',
    testimonials: [
      { name: 'Hans Müller', role: 'E-Commerce Verkäufer', text: 'Produktbilder waren zu klein. Nach dem Vergrößern mit Scale X ist die Qualität ausgezeichnet!' },
      { name: 'Anna Schmidt', role: 'Bloggerin', text: 'Super einfache Oberfläche, keine Registrierung nötig, und Bilder bleiben auf meinem Gerät.' },
      { name: 'Peter Weber', role: 'Designer', text: 'Unglaublich praktisch für schnelle Aufgaben mit kleinen Bildern.' }
    ],
    statsTitle: 'Warum Uns Vertrauen',
    stats: [
      { value: '100%', label: 'Lokale Verarbeitung' },
      { value: '0', label: 'Datensammlung' },
      { value: 'Kostenlos', label: 'Immer Kostenlos' },
      { value: 'Sofort', label: 'Verarbeitungsgeschwindigkeit' }
    ],
    cookieTitle: 'Cookie-Hinweis',
    cookieText: 'Wir verwenden Cookies um Ihre Browsing-Erfahrung zu verbessern und den Seitenverkehr zu analysieren.',
    cookieAccept: 'Akzeptieren',
    cookieDecline: 'Ablehnen',
    cookieLearnMore: 'Mehr Erfahren',
    privacyPolicy: 'Datenschutzrichtlinie',
    termsOfService: 'Nutzungsbedingungen',
    contactUs: 'Kontakt',
    aboutUs: 'Über Uns',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Datenschutzrichtlinie',
    privacyContent: '<h3>Datenerfassung</h3><p>Scale X erfasst, speichert oder überträgt keine Bilder die Sie hochladen.</p><h3>Cookies</h3><p>Wir verwenden essentielle Cookies für Spracheinstellungen und Analyse-Cookies.</p><h3>Kontakt</h3><p>support@scalex.hotmail.com</p>',
    termsTitle: 'Nutzungsbedingungen',
    termsContent: '<h3>Servicebeschreibung</h3><p>Scale X bietet kostenlose Online-Bildvergrößerung.</p><h3>Akzeptable Nutzung</h3><p>Nutzer dürfen diesen Service nicht für illegale Zwecke verwenden.</p><h3>Kontakt</h3><p>support@scalex.hotmail.com</p>',
    aboutTitle: 'Über Scale X',
    aboutContent: 'Scale X wurde 2024 von Ingenieuren gegründet, die sich für Bildverarbeitungstechnologie begeistern.',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2024',
    readMore: 'Mehr Lesen',
    readLess: 'Weniger Anzeigen',
    viewMoreFaq: 'Mehr FAQ Anzeigen'
  }
};

// Components
const CookieConsent = ({ t, onAccept, onDecline, onLearnMore }) => (
  <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4 md:p-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <Cookie className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-gray-800 mb-1">{t.cookieTitle}</h4>
          <p className="text-sm text-gray-600">{t.cookieText}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={onLearnMore} className="text-sm text-blue-600 hover:text-blue-700 font-medium">{t.cookieLearnMore}</button>
        <button onClick={onDecline} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">{t.cookieDecline}</button>
        <button onClick={onAccept} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">{t.cookieAccept}</button>
      </div>
    </div>
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><X size={20} className="text-gray-600" /></button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-2 rounded-lg">
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-gray-400 shrink-0" /> : <ChevronDown size={20} className="text-gray-400 shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="px-2 pb-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArticleCard = ({ title, summary, content, t }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-500 text-sm mb-3">{summary}</p>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3 mt-3">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} className="text-blue-600 text-sm font-medium mt-2 flex items-center gap-1 hover:text-blue-700">
        {expanded ? t.readLess : t.readMore} <ArrowRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
};

const ImageUpscaler = () => {
  const [lang, setLang] = useState('zh-TW');
  const [image, setImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(2);
  const [currentProcessedScale, setCurrentProcessedScale] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [metadata, setMetadata] = useState({ width: 0, height: 0, name: '' });
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const MAX_INPUT_DIMENSION = 4096;
  const MAX_OUTPUT_PIXELS = 64000000;

  useEffect(() => {
    const consent = sessionStorage.getItem('cookieConsent');
    if (consent) setShowCookieConsent(false);
  }, []);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
      if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
    };
  }, []);

  const handleCookieAccept = () => { sessionStorage.setItem('cookieConsent', 'accepted'); setShowCookieConsent(false); };
  const handleCookieDecline = () => { sessionStorage.setItem('cookieConsent', 'declined'); setShowCookieConsent(false); };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert(t.alertType); return; }
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (img.width > MAX_INPUT_DIMENSION || img.height > MAX_INPUT_DIMENSION) { alert(t.alertBig); URL.revokeObjectURL(objectUrl); return; }
      if (image) URL.revokeObjectURL(image);
      if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
      setMetadata({ width: img.width, height: img.height, name: file.name.split('.')[0] });
      setImage(objectUrl);
      setProcessedImageUrl(null);
      setCurrentProcessedScale(null);
    };
    img.onerror = () => { alert(t.alertFail); URL.revokeObjectURL(objectUrl); };
    img.src = objectUrl;
  };

  const processImage = () => {
    if (!image) return;
    const targetWidth = metadata.width * scale;
    const targetHeight = metadata.height * scale;
    if (targetWidth * targetHeight > MAX_OUTPUT_PIXELS) { alert(t.alertOutputBig); return; }
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
        ctx.globalAlpha = 0.15;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        ctx.globalCompositeOperation = 'source-over';
        canvas.toBlob((blob) => {
          if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
          setProcessedImageUrl(URL.createObjectURL(blob));
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
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <AnimatePresence>{showCookieConsent && <CookieConsent t={t} onAccept={handleCookieAccept} onDecline={handleCookieDecline} onLearnMore={() => setActiveModal('privacy')} />}</AnimatePresence>

      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title={t.privacyTitle}>
        <div className="prose prose-sm max-w-none"><div dangerouslySetInnerHTML={{ __html: t.privacyContent }} className="space-y-4 text-gray-600 [&_h3]:text-gray-800 [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1" /><p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p></div>
      </Modal>
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title={t.termsTitle}>
        <div className="prose prose-sm max-w-none"><div dangerouslySetInnerHTML={{ __html: t.termsContent }} className="space-y-4 text-gray-600 [&_h3]:text-gray-800 [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1" /><p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p></div>
      </Modal>
      <Modal isOpen={activeModal === 'faq'} onClose={() => setActiveModal(null)} title={t.faqTitle}>
        <div className="space-y-1">{t.faqItems && t.faqItems.map((item, index) => <FAQItem key={index} question={item.q} answer={item.a} />)}</div>
      </Modal>
      <Modal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title={t.aboutTitle}>
        <div className="space-y-4"><p className="text-gray-600 leading-relaxed">{t.aboutContent}</p><div className="bg-gray-50 p-4 rounded-xl space-y-2"><p className="text-sm font-bold">{t.companyName}</p><p className="text-sm text-gray-500">{t.companyEmail}</p></div></div>
      </Modal>
      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title={t.contactUs}>
        <div className="space-y-4"><div className="bg-blue-50 p-6 rounded-xl text-center"><Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" /><p className="text-gray-600 mb-2">Email:</p><a href={`mailto:${t.companyEmail}`} className="text-blue-600 font-medium text-lg hover:underline">{t.companyEmail}</a></div></div>
      </Modal>

      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter flex items-center justify-center md:justify-start gap-3">
              <Maximize className="w-10 h-10 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{t.title}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-light tracking-wide">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Globe size={16} className="text-gray-400" />
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium text-gray-600 cursor-pointer">
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </header>

        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.stats && t.stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-black text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <main>
          {!image ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group bg-white border-2 border-dashed border-blue-100 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm" onClick={() => fileInputRef.current.click()}>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              <div className="bg-blue-50 group-hover:bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"><Upload className="text-blue-500 group-hover:text-blue-600 w-12 h-12" /></div>
              <h2 className="text-3xl font-bold mb-3 text-gray-800">{t.uploadTitle}</h2>
              <p className="text-gray-400 mb-8 text-lg">{t.uploadSubtitle}</p>
              <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-5 py-2 rounded-full text-sm font-medium border border-yellow-100"><AlertTriangle size={16} /><span>{t.limit}</span></div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-bold flex items-center gap-2 mb-6 text-gray-700 border-b border-gray-100 pb-4"><Sliders size={18} className="text-blue-500" /> {t.settings}</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-gray-500 mb-3 block">{t.scale}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[2, 4].map((s) => (
                          <button key={s} onClick={() => setScale(s)} className={`py-3 rounded-xl font-bold transition-all border ${scale === s ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}>{s}x</button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                      <div className="flex justify-between text-xs"><span className="text-gray-500">{t.originalSize}:</span><span className="font-mono font-bold text-gray-700">{metadata.width} × {metadata.height}</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-500">{t.outputSize}:</span><span className={`font-mono font-bold ${(metadata.width * scale * metadata.height * scale) > MAX_OUTPUT_PIXELS ? 'text-red-500' : 'text-blue-600'}`}>{metadata.width * scale} × {metadata.height * scale}</span></div>
                    </div>
                    <div className="space-y-3">
                      {!processedImageUrl && (<button onClick={processImage} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">{isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}{isProcessing ? t.btnProcessing : t.btnProcess}</button>)}
                      {needsRegeneration && !isProcessing && (<button onClick={processImage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><RotateCcw size={20} /> {t.btnRegenerate} ({scale}x)</button>)}
                      {processedImageUrl && !needsRegeneration && (<button onClick={downloadImage} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><Download size={20} /> {t.btnDownload}</button>)}
                      <button onClick={reset} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold border border-gray-200">{t.btnChange}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col min-h-96">
                  <div ref={containerRef} className="relative flex-1 rounded-xl overflow-hidden bg-gray-100 cursor-col-resize select-none" onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`, backgroundSize: `20px 20px`, backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px` }}></div>
                    <img src={image} alt="Original" className="absolute inset-0 w-full h-full object-contain z-0" />
                    {processedImageUrl && (<div className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity z-10 ${needsRegeneration ? 'opacity-50 grayscale' : 'opacity-100'}`} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}><img src={processedImageUrl} alt="Enhanced" className="absolute inset-0 w-full h-full object-contain" /></div>)}
                    <AnimatePresence>{isProcessing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-30"><div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div><p className="font-bold text-blue-600 text-xl">{t.processingText}</p></motion.div>)}</AnimatePresence>
                    {processedImageUrl && !isProcessing && (<><div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-500"><div className="flex gap-1"><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div></div></div></div><div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20">{t.labelOriginal}</div><div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20">{t.labelEnhanced} {currentProcessedScale}x</div></>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className="mt-20">
            <div className="text-center mb-10"><h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3"><BookOpen className="text-blue-500" /> {t.guideTitle}</h2><p className="text-gray-500">{t.guideSubtitle}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.guideSteps && t.guideSteps.map((step, i) => (<div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">{i + 1}</div><h3 className="font-bold text-gray-800 mb-2">{step.title}</h3><p className="text-gray-500 text-sm">{step.desc}</p></div>))}
            </div>
          </section>

          <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all"><div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5"><Sparkles size={28} /></div><h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat1Title}</h4><p className="text-gray-500">{t.feat1Desc}</p></div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all"><div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-5"><Shield size={28} /></div><h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat2Title}</h4><p className="text-gray-500">{t.feat2Desc}</p></div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all"><div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5"><Layers size={28} /></div><h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat3Title}</h4><p className="text-gray-500">{t.feat3Desc}</p></div>
          </section>

          <section className="mt-20"><h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3"><Camera className="text-blue-500" /> {t.useCasesTitle}</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{t.useCases && t.useCases.map((uc, i) => (<div key={i} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all"><h4 className="font-bold text-gray-800 mb-2">{uc.title}</h4><p className="text-gray-500 text-sm">{uc.desc}</p></div>))}</div></section>

          <section className="mt-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12"><h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><Lightbulb className="text-blue-500" /> {t.techTitle}</h2><p className="text-gray-600 leading-relaxed">{t.techContent}</p></section>

          <section className="mt-20"><h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t.comparisonTitle}</h2><div className="overflow-x-auto"><table className="w-full bg-white rounded-xl overflow-hidden border border-gray-100"><thead className="bg-gray-50"><tr>{t.comparisonHeaders && t.comparisonHeaders.map((h, i) => (<th key={i} className="px-6 py-4 text-left text-sm font-bold text-gray-700">{h}</th>))}</tr></thead><tbody>{t.comparisonRows && t.comparisonRows.map((row, i) => (<tr key={i} className="border-t border-gray-100">{row.map((cell, j) => (<td key={j} className={`px-6 py-4 text-sm ${j === 0 ? 'font-medium text-gray-800' : j === 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{cell}</td>))}</tr>))}</tbody></table></div></section>

          <section className="mt-20"><h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3"><FileText className="text-blue-500" /> {t.articlesTitle}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{t.articles && t.articles.map((article, i) => (<ArticleCard key={i} title={article.title} summary={article.summary} content={article.content} t={t} />))}</div></section>

          <section className="mt-20"><h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3"><Users className="text-blue-500" /> {t.testimonialsTitle}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{t.testimonials && t.testimonials.map((review, i) => (<div key={i} className="bg-white rounded-xl p-6 border border-gray-100"><div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}</div><p className="text-gray-600 text-sm mb-4">"{review.text}"</p><div className="border-t border-gray-100 pt-3"><p className="font-bold text-gray-800 text-sm">{review.name}</p><p className="text-gray-400 text-xs">{review.role}</p></div></div>))}</div></section>

          <section className="mt-20"><h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3"><HelpCircle className="text-blue-500" /> {t.faqTitle}</h2><div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 p-6">{t.faqItems && t.faqItems.slice(0, 5).map((item, index) => (<FAQItem key={index} question={item.q} answer={item.a} />))}{t.faqItems && t.faqItems.length > 5 && (<button onClick={() => setActiveModal('faq')} className="w-full mt-4 text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center justify-center gap-1">{t.viewMoreFaq} <ArrowRight size={14} /></button>)}</div></section>

          <article className="mt-20 border-t border-gray-100 pt-12"><div className="max-w-4xl mx-auto text-center"><h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"><Search size={24} className="text-gray-400" /> {t.seoTitle}</h2><p className="text-gray-500 leading-loose">{t.seoContent}</p></div></article>
        </main>

        <footer className="mt-16 border-t border-gray-100 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div><div className="flex items-center gap-2 mb-4"><Maximize className="w-6 h-6 text-blue-600" /><span className="font-bold text-gray-800">{t.companyName}</span></div><p className="text-sm text-gray-500">{t.companyEmail}</p></div>
            <div><h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FileText size={16} /> Legal</h4><div className="space-y-2"><button onClick={() => setActiveModal('privacy')} className="block text-sm text-gray-500 hover:text-blue-600">{t.privacyPolicy}</button><button onClick={() => setActiveModal('terms')} className="block text-sm text-gray-500 hover:text-blue-600">{t.termsOfService}</button></div></div>
            <div><h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Mail size={16} /> Support</h4><div className="space-y-2"><button onClick={() => setActiveModal('faq')} className="block text-sm text-gray-500 hover:text-blue-600">{t.faq}</button><button onClick={() => setActiveModal('about')} className="block text-sm text-gray-500 hover:text-blue-600">{t.aboutUs}</button><button onClick={() => setActiveModal('contact')} className="block text-sm text-gray-500 hover:text-blue-600">{t.contactUs}</button></div></div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"><p className="text-sm text-gray-400">{t.footer}</p><div className="flex items-center gap-4"><button onClick={() => setActiveModal('privacy')} className="text-xs text-gray-400 hover:text-gray-600">{t.privacyPolicy}</button><span className="text-gray-300">|</span><button onClick={() => setActiveModal('terms')} className="text-xs text-gray-400 hover:text-gray-600">{t.termsOfService}</button></div></div>
        </footer>
      </div>
    </div>
  );
};

export default ImageUpscaler;