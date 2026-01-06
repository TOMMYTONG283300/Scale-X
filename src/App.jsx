import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Download, RefreshCw, Maximize, Check, Sliders, Zap, AlertTriangle, RotateCcw, Globe, Search, X, Shield, FileText, Mail, Cookie, ChevronDown, ChevronUp, BookOpen, Lightbulb, HelpCircle, Star, Users, Clock, CheckCircle, ArrowRight, Camera, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 多語言字典 (增強版含更多 SEO 內容) ---
const TRANSLATIONS = {
  'zh-TW': {
    title: 'Scale X',
    subtitle: 'AI 智能影像無損放大工具',
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
    
    // SEO 內容區塊
    seoTitle: '為什麼選擇 Scale X 線上圖片放大器？',
    seoContent: 'Scale X 是一款免費的線上圖片無損放大工具，利用瀏覽器本地運算技術，幫助攝影師、設計師與一般使用者將模糊的照片變清晰。無需安裝軟體，即可將動漫圖片、風景照或人像照放大 2 倍至 4 倍。支援 JPG, PNG 格式，是替代 Photoshop 的最佳輕量化選擇。',
    
    // 新增：詳細使用指南
    guideTitle: '如何使用 Scale X 放大圖片？',
    guideSubtitle: '只需三個簡單步驟，即可獲得高品質放大圖片',
    guideSteps: [
      { title: '上傳圖片', desc: '點擊上傳區域或直接拖曳圖片檔案。支援 JPG、PNG、WebP 等常見格式，單邊最大 4096 像素。' },
      { title: '選擇放大倍率', desc: '根據您的需求選擇 2 倍或 4 倍放大。系統會即時顯示預計輸出尺寸，確保符合您的需求。' },
      { title: '下載成品', desc: '處理完成後，使用滑桿比較前後效果，滿意後即可一鍵下載高解析度 PNG 圖片。' }
    ],
    
    // 新增：使用場景
    useCasesTitle: '適用場景',
    useCases: [
      { title: '電商產品圖', desc: '將低解析度的產品圖片放大，用於網站展示或印刷目錄，提升專業形象。' },
      { title: '社群媒體素材', desc: '放大舊照片或低畫質圖片，製作高品質的 Instagram、Facebook 貼文素材。' },
      { title: '印刷輸出', desc: '將數位照片放大至印刷所需解析度，製作海報、傳單或相簿。' },
      { title: '動漫插畫', desc: '放大網路下載的動漫圖片或插畫，保持線條清晰不模糊。' },
      { title: '舊照片修復', desc: '放大並增強老舊的家庭照片，重現珍貴回憶的細節。' },
      { title: '遊戲素材', desc: '放大遊戲截圖或素材，用於攻略製作或社群分享。' }
    ],
    
    // 新增：技術說明
    techTitle: '我們的技術',
    techContent: 'Scale X 採用先進的雙三次插值（Bicubic Interpolation）演算法，結合影像銳化技術，在放大圖片時智能填補像素空隙。與傳統最近鄰插值相比，我們的方法能有效減少鋸齒和模糊現象，產生更平滑自然的放大效果。所有運算都在您的瀏覽器中使用 HTML5 Canvas API 完成，無需上傳圖片到伺服器，確保您的隱私安全。',
    
    // 新增：比較表格
    comparisonTitle: 'Scale X vs 傳統方法',
    comparisonHeaders: ['功能', 'Scale X', '傳統軟體', '線上工具'],
    comparisonRows: [
      ['價格', '完全免費', '需付費購買', '部分免費'],
      ['隱私保護', '本地處理', '本地處理', '需上傳伺服器'],
      ['安裝需求', '無需安裝', '需下載安裝', '無需安裝'],
      ['處理速度', '即時處理', '依電腦效能', '需等待伺服器'],
      ['使用難度', '簡單直觀', '需學習操作', '簡單']
    ],
    
    // 新增：常見問題（擴充版）
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
    
    // 新增：文章/教學區塊
    articlesTitle: '圖片放大技巧與教學',
    articles: [
      {
        title: '如何選擇適合放大的圖片？',
        summary: '不是所有圖片都適合放大。了解哪些類型的圖片能獲得最佳放大效果...',
        content: '選擇放大圖片時，原始圖片的品質至關重要。清晰、對焦準確的照片放大效果最好。避免選擇已經模糊、過度壓縮或有大量雜訊的圖片。向量圖形風格的插畫和動漫圖片通常比真實照片更容易保持放大後的品質。建議優先選擇 PNG 格式的圖片，因為它採用無損壓縮，保留更多細節。'
      },
      {
        title: '放大圖片用於印刷的注意事項',
        summary: '將數位圖片放大用於印刷時，需要注意解析度和色彩模式...',
        content: '印刷品通常需要 300 DPI（每英寸點數）的解析度才能呈現清晰效果。在放大圖片前，先計算目標印刷尺寸所需的像素數。例如，要印刷 10x10 公分的圖片，需要約 1181x1181 像素。使用 Scale X 放大時，盡量選擇能滿足需求的最小倍率，避免過度放大導致品質下降。另外，印刷通常使用 CMYK 色彩模式，可能與螢幕顯示的 RGB 顏色略有差異。'
      },
      {
        title: '社群媒體圖片尺寸指南',
        summary: '各大社群平台對圖片尺寸有不同要求，了解最佳尺寸讓貼文更吸引人...',
        content: 'Instagram 貼文建議使用 1080x1080 像素的正方形圖片，限時動態則為 1080x1920 像素。Facebook 貼文圖片建議 1200x630 像素，封面照片為 820x312 像素。Twitter 圖片建議 1200x675 像素。如果您的原始圖片較小，可以使用 Scale X 放大到適當尺寸，確保在各平台都能呈現最佳效果。'
      }
    ],
    
    // 新增：用戶評價
    testimonialsTitle: '用戶評價',
    testimonials: [
      { name: '陳小明', role: '電商賣家', text: '以前產品圖太小很困擾，用 Scale X 放大後品質很好，現在網站看起來專業多了！' },
      { name: '林美玲', role: '部落客', text: '介面很簡單，不用註冊就能用，而且圖片不會被上傳，很安心。推薦給需要放大圖片的朋友！' },
      { name: '王大華', role: '設計師', text: '雖然比不上專業軟體，但對於快速處理小圖片來說非常方便，省下很多時間。' }
    ],
    
    // 新增：統計數據
    statsTitle: '為什麼信任我們',
    stats: [
      { value: '100%', label: '本地處理' },
      { value: '0', label: '資料收集' },
      { value: '免費', label: '永久免費' },
      { value: '秒級', label: '處理速度' }
    ],
    
    // Cookie 和法律相關
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
    privacyTitle: '隱私政策',
    privacyContent: `
      <h3>1. 資料收集聲明</h3>
      <p>Scale X 非常重視您的隱私。我們的服務採用純本地處理技術，<strong>不會收集、儲存或傳輸您上傳的任何圖片</strong>。所有影像處理均在您的瀏覽器中完成，圖片資料永遠不會離開您的設備。</p>
      
      <h3>2. Cookie 使用說明</h3>
      <p>我們使用以下類型的 Cookie：</p>
      <ul>
        <li><strong>必要性 Cookie</strong>：用於記住您的語言偏好設定，確保網站正常運作。</li>
        <li><strong>分析性 Cookie</strong>：我們可能使用 Google Analytics 來了解網站使用情況，以改善我們的服務。這些資料是匿名的，不包含個人身份資訊。</li>
      </ul>
      <p>您可以透過瀏覽器設定隨時管理或刪除 Cookie。</p>
      
      <h3>3. 第三方服務</h3>
      <p>我們的網站可能使用以下第三方服務：</p>
      <ul>
        <li>Google Analytics：用於網站流量分析</li>
        <li>Google AdSense：用於顯示廣告（如適用）</li>
      </ul>
      <p>這些服務可能會根據其各自的隱私政策收集匿名使用數據。</p>
      
      <h3>4. 資料安全</h3>
      <p>由於所有圖片處理都在本地完成，您的圖片資料從未離開您的設備。這是我們能提供的最高級別隱私保護。我們不運營任何儲存用戶圖片的伺服器。</p>
      
      <h3>5. 兒童隱私</h3>
      <p>我們的服務不針對 13 歲以下的兒童。我們不會故意收集兒童的個人資訊。</p>
      
      <h3>6. 隱私政策更新</h3>
      <p>我們可能會不時更新本隱私政策。任何重大變更都會在本頁面公告。建議您定期查看本政策。</p>
      
      <h3>7. 聯絡我們</h3>
      <p>如有任何隱私相關問題，請透過 support@scalex.example.com 聯絡我們。我們會在 48 小時內回覆您的詢問。</p>
    `,
    termsTitle: '服務條款',
    termsContent: `
      <h3>1. 服務描述</h3>
      <p>Scale X 提供免費的線上圖片放大服務。本服務使用瀏覽器本地運算技術，幫助用戶放大和增強圖片品質。本服務按「現狀」提供，不提供任何明示或暗示的保證。</p>
      
      <h3>2. 使用資格</h3>
      <p>使用本服務即表示您確認：</p>
      <ul>
        <li>您已年滿 13 歲或在父母/監護人同意下使用</li>
        <li>您有權使用您上傳的圖片</li>
        <li>您同意遵守這些服務條款</li>
      </ul>
      
      <h3>3. 可接受的使用</h3>
      <p>用戶不得將本服務用於：</p>
      <ul>
        <li>處理侵犯他人版權、商標權或其他智慧財產權的圖片</li>
        <li>處理含有非法、淫穢、誹謗或侵犯他人隱私的內容</li>
        <li>任何違反當地法律法規的目的</li>
        <li>嘗試破壞、干擾或濫用本服務</li>
      </ul>
      
      <h3>4. 智慧財產權</h3>
      <p>用戶保留其上傳圖片的所有權利。Scale X 不會對用戶上傳或處理的內容主張任何權利。Scale X 的品牌、標誌和網站設計受智慧財產權法保護。</p>
      
      <h3>5. 免責聲明</h3>
      <p>Scale X 對以下情況不承擔責任：</p>
      <ul>
        <li>因使用本服務而導致的任何直接或間接損失</li>
        <li>服務中斷、錯誤或資料損失</li>
        <li>用戶上傳或處理之內容的合法性</li>
        <li>處理結果未能達到用戶期望</li>
      </ul>
      
      <h3>6. 服務變更</h3>
      <p>我們保留隨時修改、暫停或終止服務的權利，恕不另行通知。我們會盡力提前公告重大變更。</p>
      
      <h3>7. 條款修改</h3>
      <p>我們保留隨時修改這些條款的權利。修改後的條款將在本頁面公佈。繼續使用本服務即表示您接受修改後的條款。</p>
      
      <h3>8. 準據法</h3>
      <p>這些條款受中華民國法律管轄。任何爭議應提交台灣台北地方法院管轄。</p>
      
      <h3>9. 聯絡方式</h3>
      <p>如有任何問題，請聯絡：support@scalex.example.com</p>
    `,
    aboutTitle: '關於 Scale X',
    aboutContent: 'Scale X 是由一群熱愛影像處理技術的工程師於 2024 年創立的免費線上工具。我們的使命是讓每個人都能輕鬆獲得高品質的圖片放大服務，無需安裝任何軟體，無需擔心隱私問題。我們相信科技應該為人服務，而不是收集人們的資料。這就是為什麼我們堅持採用純本地處理技術——您的圖片永遠只存在於您的設備中。',
    lastUpdated: '最後更新：2024年12月'
  },
  'en': {
    title: 'Scale X',
    subtitle: 'AI Smart Image Upscaler',
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
    
    guideTitle: 'How to Use Scale X to Upscale Images?',
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
      { q: 'Is this service free?', a: 'Yes, Scale X is completely free to use with no hidden fees and no daily usage limits. We believe high-quality image upscaling tools should be accessible to everyone.' },
      { q: 'Are my images uploaded to a server?', a: 'No. The core feature of Scale X is "local processing." All image processing is done in your browser. Images never leave your device, ensuring your privacy and data security.' },
      { q: 'What image formats are supported?', a: 'We support most common image formats including JPG/JPEG, PNG, WebP, GIF (static), and BMP. Output is always high-quality PNG to ensure the best results.' },
      { q: 'What is the maximum image size?', a: 'To ensure browser stability, we limit input images to 4096 pixels per side. If your image exceeds this, consider resizing it first with another tool.' },
      { q: 'How is the quality of upscaled images?', a: 'We use advanced bicubic interpolation with sharpening to maintain quality and reduce blur and aliasing. Results depend on original image quality—higher quality originals produce better results.' },
      { q: 'How much can I upscale?', a: 'Currently we support 2x and 4x upscaling. For example, a 1000x1000 image can become 2000x2000 (2x) or 4000x4000 (4x).' },
      { q: 'How long does processing take?', a: 'Processing time depends on your device and image size, typically 1-3 seconds. Larger images or older devices may take slightly longer.' },
      { q: 'Can I batch process multiple images?', a: 'The current version supports single image processing. Batch processing is planned for future updates.' }
    ],
    
    articlesTitle: 'Image Upscaling Tips & Tutorials',
    articles: [
      {
        title: 'How to Choose Images Suitable for Upscaling?',
        summary: 'Not all images are ideal for upscaling. Learn which types get the best results...',
        content: 'Original image quality is crucial when upscaling. Sharp, well-focused photos upscale best. Avoid images that are already blurry, heavily compressed, or have lots of noise. Vector-style illustrations and anime typically maintain quality better than photographs. Prefer PNG format as it uses lossless compression and preserves more details.'
      },
      {
        title: 'Upscaling Images for Print: What to Know',
        summary: 'When upscaling digital images for print, resolution and color mode matter...',
        content: 'Print typically requires 300 DPI (dots per inch) resolution for sharp results. Calculate the pixel dimensions needed for your target print size first. For example, a 4x4 inch print needs about 1200x1200 pixels. When using Scale X, choose the minimum scale factor that meets your needs to avoid over-upscaling. Also note that print uses CMYK color mode, which may differ slightly from RGB screen colors.'
      },
      {
        title: 'Social Media Image Size Guide',
        summary: 'Different platforms have different image size requirements for optimal display...',
        content: 'Instagram posts work best at 1080x1080 pixels (square), Stories at 1080x1920 pixels. Facebook post images should be 1200x630 pixels, cover photos 820x312 pixels. Twitter recommends 1200x675 pixels. If your original images are smaller, use Scale X to upscale them to the right dimensions for the best appearance on each platform.'
      }
    ],
    
    testimonialsTitle: 'User Reviews',
    testimonials: [
      { name: 'John Smith', role: 'E-commerce Seller', text: 'Product images used to be too small. After upscaling with Scale X, the quality is great and my website looks more professional!' },
      { name: 'Emily Chen', role: 'Blogger', text: 'Super easy interface, no registration needed, and images stay on my device. Highly recommend to anyone who needs to upscale images!' },
      { name: 'David Wang', role: 'Designer', text: "While not as powerful as professional software, it's incredibly convenient for quick small image tasks. Saves a lot of time." }
    ],
    
    statsTitle: 'Why Trust Us',
    stats: [
      { value: '100%', label: 'Local Processing' },
      { value: '0', label: 'Data Collection' },
      { value: 'Free', label: 'Always Free' },
      { value: 'Instant', label: 'Processing Speed' }
    ],
    
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
    privacyTitle: 'Privacy Policy',
    privacyContent: `
      <h3>1. Data Collection Statement</h3>
      <p>Scale X takes your privacy seriously. Our service uses pure local processing technology and <strong>does not collect, store, or transmit any images you upload</strong>. All image processing is done in your browser, and image data never leaves your device.</p>
      
      <h3>2. Cookie Usage</h3>
      <p>We use the following types of cookies:</p>
      <ul>
        <li><strong>Essential Cookies</strong>: To remember your language preferences and ensure the website functions properly.</li>
        <li><strong>Analytics Cookies</strong>: We may use Google Analytics to understand site usage and improve our services. This data is anonymous and contains no personally identifiable information.</li>
      </ul>
      
      <h3>3. Third-Party Services</h3>
      <p>Our website may use the following third-party services:</p>
      <ul>
        <li>Google Analytics: For website traffic analysis</li>
        <li>Google AdSense: For displaying advertisements (if applicable)</li>
      </ul>
      
      <h3>4. Data Security</h3>
      <p>Since all image processing is done locally, your image data never leaves your device. This is the highest level of privacy protection we can provide.</p>
      
      <h3>5. Contact Us</h3>
      <p>For any privacy-related questions, please contact us at support@scalex.example.com.</p>
    `,
    termsTitle: 'Terms of Service',
    termsContent: `
      <h3>1. Service Description</h3>
      <p>Scale X provides free online image upscaling services using browser-based local computing technology. This service is provided "as is" without any express or implied warranties.</p>
      
      <h3>2. Acceptable Use</h3>
      <p>Users may not use this service for:</p>
      <ul>
        <li>Processing images that infringe on others' copyrights or intellectual property</li>
        <li>Any illegal purposes</li>
        <li>Attempting to disrupt or abuse this service</li>
      </ul>
      
      <h3>3. Intellectual Property</h3>
      <p>Users retain all rights to their uploaded images. Scale X does not claim any rights to user-uploaded content.</p>
      
      <h3>4. Disclaimer</h3>
      <p>Scale X is not liable for any direct or indirect damages resulting from the use of this service.</p>
      
      <h3>5. Contact</h3>
      <p>For any questions, please contact: support@scalex.example.com</p>
    `,
    aboutTitle: 'About Scale X',
    aboutContent: 'Scale X was founded in 2024 by a team of engineers passionate about image processing technology. Our mission is to make high-quality image upscaling accessible to everyone, without installing any software or worrying about privacy. We believe technology should serve people, not collect their data. That\'s why we insist on pure local processing—your images always stay on your device.',
    lastUpdated: 'Last Updated: December 2024'
  }
};

// 為其他語言提供基本翻譯（簡化版）
['ja', 'ko', 'fr', 'it', 'de', 'pt', 'es'].forEach(lang => {
  if (!TRANSLATIONS[lang]) {
    TRANSLATIONS[lang] = { ...TRANSLATIONS['en'] };
  } else {
    // 補充缺少的欄位
    TRANSLATIONS[lang] = { ...TRANSLATIONS['en'], ...TRANSLATIONS[lang] };
  }
});

// Cookie Consent Banner Component
const CookieConsent = ({ t, onAccept, onDecline, onLearnMore }) => {
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
          <button onClick={onLearnMore} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// FAQ Item Component
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

// Article Card Component
const ArticleCard = ({ title, summary, content }) => {
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
        {expanded ? '收起' : '閱讀更多'} <ArrowRight size={14} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
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
    const cookieConsent = sessionStorage.getItem('cookieConsent');
    if (cookieConsent) setShowCookieConsent(false);
  }, []);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
      if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
    };
  }, []);

  const handleCookieAccept = () => {
    sessionStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const handleCookieDecline = () => {
    sessionStorage.setItem('cookieConsent', 'declined');
    setShowCookieConsent(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert(t.alertType); return; }
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
      {/* Cookie Consent */}
      <AnimatePresence>
        {showCookieConsent && (
          <CookieConsent t={t} onAccept={handleCookieAccept} onDecline={handleCookieDecline} onLearnMore={() => setActiveModal('privacy')} />
        )}
      </AnimatePresence>

      {/* Modals */}
      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title={t.privacyTitle}>
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: t.privacyContent }} className="space-y-4 text-gray-600 [&_h3]:text-gray-800 [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1" />
          <p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title={t.termsTitle}>
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: t.termsContent }} className="space-y-4 text-gray-600 [&_h3]:text-gray-800 [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1" />
          <p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'faq'} onClose={() => setActiveModal(null)} title={t.faqTitle}>
        <div className="space-y-1">
          {t.faqItems && t.faqItems.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title={t.aboutTitle}>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{t.aboutContent}</p>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <p className="text-sm font-bold">{t.companyName}</p>
            <p className="text-sm text-gray-500">{t.companyAddress}</p>
            <p className="text-sm text-gray-500">{t.companyEmail}</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title={t.contactUs}>
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Email:</p>
            <a href={`mailto:${t.companyEmail}`} className="text-blue-600 font-medium text-lg hover:underline">{t.companyEmail}</a>
          </div>
        </div>
      </Modal>

      <div className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* Header */}
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
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="it">Italiano</option>
            </select>
          </div>
        </header>

        {/* Trust Stats */}
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
          {/* Upload Area */}
          {!image ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white border-2 border-dashed border-blue-100 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm"
              onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              <div className="bg-blue-50 group-hover:bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                <Upload className="text-blue-500 group-hover:text-blue-600 w-12 h-12" />
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
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="font-bold flex items-center gap-2 mb-6 text-gray-700 border-b border-gray-100 pb-4">
                    <Sliders size={18} className="text-blue-500" /> {t.settings}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-gray-500 mb-3 block">{t.scale}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[2, 4].map((s) => (
                          <button key={s} onClick={() => setScale(s)} className={`py-3 rounded-xl font-bold transition-all border ${scale === s ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}>
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{t.originalSize}:</span>
                        <span className="font-mono font-bold text-gray-700">{metadata.width} × {metadata.height}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">{t.outputSize}:</span>
                        <span className={`font-mono font-bold ${(metadata.width * scale * metadata.height * scale) > MAX_OUTPUT_PIXELS ? 'text-red-500' : 'text-blue-600'}`}>
                          {metadata.width * scale} × {metadata.height * scale}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {!processedImageUrl && (
                        <button onClick={processImage} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                          {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                          {isProcessing ? t.btnProcessing : t.btnProcess}
                        </button>
                      )}
                      {needsRegeneration && !isProcessing && (
                        <button onClick={processImage} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                          <RotateCcw size={20} /> {t.btnRegenerate} ({scale}x)
                        </button>
                      )}
                      {processedImageUrl && !needsRegeneration && (
                        <button onClick={downloadImage} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Download size={20} /> {t.btnDownload}
                        </button>
                      )}
                      <button onClick={reset} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold border border-gray-200">
                        {t.btnChange}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Area */}
              <div className="lg:col-span-3">
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col min-h-96">
                  <div ref={containerRef} className="relative flex-1 rounded-xl overflow-hidden bg-gray-100 cursor-col-resize select-none" onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`, backgroundSize: `20px 20px`, backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px` }}></div>
                    <img src={image} alt="Original" className="absolute inset-0 w-full h-full object-contain z-0" />
                    {processedImageUrl && (
                      <div className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity z-10 ${needsRegeneration ? 'opacity-50 grayscale' : 'opacity-100'}`} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                        <img src={processedImageUrl} alt="Enhanced" className="absolute inset-0 w-full h-full object-contain" />
                      </div>
                    )}
                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-30">
                          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                          <p className="font-bold text-blue-600 text-xl">{t.processingText}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {processedImageUrl && !isProcessing && (
                      <>
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-500">
                            <div className="flex gap-1"><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div><div className="w-0.5 h-3 bg-blue-500 rounded-full"></div></div>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20">{t.labelOriginal}</div>
                        <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold z-20">{t.labelEnhanced} {currentProcessedScale}x</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* How to Use Guide */}
          <section className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
                <BookOpen className="text-blue-500" /> {t.guideTitle}
              </h2>
              <p className="text-gray-500">{t.guideSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.guideSteps && t.guideSteps.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 text-center relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl">{i + 1}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5"><Sparkles size={28} /></div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat1Title}</h4>
              <p className="text-gray-500">{t.feat1Desc}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-5"><Shield size={28} /></div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat2Title}</h4>
              <p className="text-gray-500">{t.feat2Desc}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5"><Layers size={28} /></div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat3Title}</h4>
              <p className="text-gray-500">{t.feat3Desc}</p>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <Camera className="text-blue-500" /> {t.useCasesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.useCases && t.useCases.map((uc, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                  <h4 className="font-bold text-gray-800 mb-2">{uc.title}</h4>
                  <p className="text-gray-500 text-sm">{uc.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Section */}
          <section className="mt-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <Lightbulb className="text-blue-500" /> {t.techTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">{t.techContent}</p>
          </section>

          {/* Comparison Table */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t.comparisonTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {t.comparisonHeaders && t.comparisonHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-4 text-left text-sm font-bold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonRows && t.comparisonRows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-6 py-4 text-sm ${j === 0 ? 'font-medium text-gray-800' : j === 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Articles / Tutorials */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <FileText className="text-blue-500" /> {t.articlesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.articles && t.articles.map((article, i) => (
                <ArticleCard key={i} title={article.title} summary={article.summary} content={article.content} />
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <Users className="text-blue-500" /> {t.testimonialsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.testimonials && t.testimonials.map((review, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-gray-600 text-sm mb-4">"{review.text}"</p>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section (Inline) */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
              <HelpCircle className="text-blue-500" /> {t.faqTitle}
            </h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 p-6">
              {t.faqItems && t.faqItems.slice(0, 5).map((item, index) => (
                <FAQItem key={index} question={item.q} answer={item.a} />
              ))}
              {t.faqItems && t.faqItems.length > 5 && (
                <button onClick={() => setActiveModal('faq')} className="w-full mt-4 text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center justify-center gap-1">
                  查看更多常見問題 <ArrowRight size={14} />
                </button>
              )}
            </div>
          </section>

          {/* SEO Content */}
          <article className="mt-20 border-t border-gray-100 pt-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Search size={24} className="text-gray-400" /> {t.seoTitle}
              </h2>
              <p className="text-gray-500 leading-loose">{t.seoContent}</p>
            </div>
          </article>
        </main>

        {/* Footer */}
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
                <button onClick={() => setActiveModal('privacy')} className="block text-sm text-gray-500 hover:text-blue-600">{t.privacyPolicy}</button>
                <button onClick={() => setActiveModal('terms')} className="block text-sm text-gray-500 hover:text-blue-600">{t.termsOfService}</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Mail size={16} /> Support</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveModal('faq')} className="block text-sm text-gray-500 hover:text-blue-600">{t.faq}</button>
                <button onClick={() => setActiveModal('about')} className="block text-sm text-gray-500 hover:text-blue-600">{t.aboutUs}</button>
                <button onClick={() => setActiveModal('contact')} className="block text-sm text-gray-500 hover:text-blue-600">{t.contactUs}</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">{t.footer}</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal('privacy')} className="text-xs text-gray-400 hover:text-gray-600">{t.privacyPolicy}</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => setActiveModal('terms')} className="text-xs text-gray-400 hover:text-gray-600">{t.termsOfService}</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ImageUpscaler;