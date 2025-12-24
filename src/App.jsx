import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Download, RefreshCw, Maximize, Check, Sliders, Zap, AlertTriangle, RotateCcw, Globe, Search, X, Shield, FileText, Mail, Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 多語言字典 (保持 Scale X 品牌與 SEO 內容) ---
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
    seoTitle: '為什麼選擇 Scale X 線上圖片放大器？',
    seoContent: 'Scale X 是一款免費的線上圖片無損放大工具，利用瀏覽器本地運算技術，幫助攝影師、設計師與一般使用者將模糊的照片變清晰。無需安裝軟體，即可將動漫圖片、風景照或人像照放大 2 倍至 4 倍。支援 JPG, PNG 格式，是替代 Photoshop 的最佳輕量化選擇。',
    // Google Ads 審核相關
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
    companyEmail: 'support@scalex.hotmaail.com',
    privacyTitle: '隱私政策',
    privacyContent: `
      <h3>資料收集</h3>
      <p>Scale X 不會收集、儲存或傳輸您上傳的任何圖片。所有圖片處理均在您的瀏覽器本地完成。</p>
      
      <h3>Cookie 使用</h3>
      <p>我們使用必要的 Cookie 來記住您的語言偏好設定。我們也可能使用分析 Cookie 來了解網站使用情況，以改善我們的服務。</p>
      
      <h3>第三方服務</h3>
      <p>我們可能使用 Google Analytics 來分析網站流量。這些服務可能會收集匿名的使用數據。</p>
      
      <h3>資料安全</h3>
      <p>由於所有處理都在本地完成，您的圖片資料從未離開您的設備，確保最高級別的隱私保護。</p>
      
      <h3>聯絡我們</h3>
      <p>如有任何隱私相關問題，請透過 support@scalex.hotmaail.com 聯絡我們。</p>
    `,
    termsTitle: '服務條款',
    termsContent: `
      <h3>服務描述</h3>
      <p>Scale X 提供免費的線上圖片放大服務。本服務按「現狀」提供，不提供任何明示或暗示的保證。</p>
      
      <h3>使用限制</h3>
      <p>用戶不得將本服務用於任何非法目的，包括但不限於處理侵犯他人版權或隱私的圖片。</p>
      
      <h3>智慧財產權</h3>
      <p>用戶保留其上傳圖片的所有權利。Scale X 不會對用戶上傳的內容主張任何權利。</p>
      
      <h3>免責聲明</h3>
      <p>Scale X 對因使用本服務而導致的任何直接或間接損失不承擔責任。</p>
      
      <h3>條款修改</h3>
      <p>我們保留隨時修改這些條款的權利。繼續使用本服務即表示您接受修改後的條款。</p>
    `,
    faqTitle: '常見問題',
    faqItems: [
      { q: '這個服務是免費的嗎？', a: '是的，Scale X 完全免費使用，沒有隱藏費用。' },
      { q: '我的圖片會被上傳到伺服器嗎？', a: '不會。所有圖片處理都在您的瀏覽器本地完成，圖片永遠不會離開您的設備。' },
      { q: '支援哪些圖片格式？', a: '我們支援 JPG、PNG、WebP 等常見圖片格式。' },
      { q: '最大可以處理多大的圖片？', a: '為了確保瀏覽器穩定運行，我們限制輸入圖片單邊不超過 4096 像素。' },
      { q: '放大後的圖片品質如何？', a: '我們使用先進的重採樣演算法，盡可能保持圖片品質，減少模糊和鋸齒。' }
    ],
    aboutTitle: '關於 Scale X',
    aboutContent: 'Scale X 是由一群熱愛影像處理技術的工程師所開發的免費線上工具。我們的使命是讓每個人都能輕鬆獲得高品質的圖片放大服務，無需安裝任何軟體，無需擔心隱私問題。所有處理都在您的瀏覽器中完成，確保您的圖片安全無虞。',
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
    // Google Ads compliance
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
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Privacy Policy',
    privacyContent: `
      <h3>Data Collection</h3>
      <p>Scale X does not collect, store, or transmit any images you upload. All image processing is done locally in your browser.</p>
      
      <h3>Cookie Usage</h3>
      <p>We use necessary cookies to remember your language preferences. We may also use analytics cookies to understand site usage and improve our services.</p>
      
      <h3>Third-Party Services</h3>
      <p>We may use Google Analytics to analyze website traffic. These services may collect anonymous usage data.</p>
      
      <h3>Data Security</h3>
      <p>Since all processing is done locally, your image data never leaves your device, ensuring the highest level of privacy protection.</p>
      
      <h3>Contact Us</h3>
      <p>For any privacy-related questions, please contact us at support@scalex.hotmail.com.</p>
    `,
    termsTitle: 'Terms of Service',
    termsContent: `
      <h3>Service Description</h3>
      <p>Scale X provides free online image upscaling services. This service is provided "as is" without any express or implied warranties.</p>
      
      <h3>Usage Restrictions</h3>
      <p>Users may not use this service for any illegal purposes, including but not limited to processing images that infringe on others' copyrights or privacy.</p>
      
      <h3>Intellectual Property</h3>
      <p>Users retain all rights to their uploaded images. Scale X does not claim any rights to user-uploaded content.</p>
      
      <h3>Disclaimer</h3>
      <p>Scale X is not liable for any direct or indirect damages resulting from the use of this service.</p>
      
      <h3>Terms Modification</h3>
      <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
    `,
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      { q: 'Is this service free?', a: 'Yes, Scale X is completely free to use with no hidden fees.' },
      { q: 'Are my images uploaded to a server?', a: 'No. All image processing is done locally in your browser. Images never leave your device.' },
      { q: 'What image formats are supported?', a: 'We support common formats including JPG, PNG, and WebP.' },
      { q: 'What is the maximum image size?', a: 'To ensure browser stability, we limit input images to 4096 pixels per side.' },
      { q: 'How is the quality of upscaled images?', a: 'We use advanced resampling algorithms to maintain quality and reduce blur and aliasing.' }
    ],
    aboutTitle: 'About Scale X',
    aboutContent: 'Scale X is a free online tool developed by a team of engineers passionate about image processing technology. Our mission is to make high-quality image upscaling accessible to everyone, without installing any software or worrying about privacy. All processing is done in your browser, ensuring your images remain secure.',
    lastUpdated: 'Last Updated: December 2024'
  },
  'ja': {
    title: 'Scale X',
    subtitle: 'AI搭載 画像高画質化ツール',
    uploadTitle: '写真をアップロード',
    uploadSubtitle: 'クリックまたはファイルをドラッグ',
    limit: '制限：最大一辺 4096px',
    settings: '設定',
    scale: '拡大倍率',
    originalSize: '元のサイズ',
    outputSize: '出力サイズ',
    warningOutput: '警告：出力サイズが大きすぎます',
    btnProcess: '高画質化を開始',
    btnProcessing: '処理中...',
    btnRegenerate: '再計算',
    btnDownload: '画像をダウンロード',
    btnChange: '画像を変更',
    processingText: 'AIが詳細を最適化中...',
    labelOriginal: 'オリジナル',
    labelEnhanced: 'Scale X 高画質',
    labelPreview: 'プレビュー (旧)',
    feat1Title: 'AIスマート拡大',
    feat1Desc: '高度なリサンプリング技術により、ノイズを低減し鮮明さを向上させます。',
    feat2Title: '完全プライバシー保護',
    feat2Desc: '処理はすべてブラウザ内で行われます。画像がサーバーに送信されることはありません。',
    feat3Title: '4K/8K 対応',
    feat3Desc: '高解像度出力に最適化されており、印刷やプロのデザイン用途にも対応します。',
    footer: '© 2024 Scale X Lab',
    alertType: '画像ファイルをアップロードしてください。',
    alertBig: '画像が大きすぎます！4096px以下の画像を使用してください。',
    alertFail: '画像の読み込みに失敗しました。',
    alertOutputBig: '出力画像が大きすぎてブラウザがクラッシュする可能性があります。倍率を下げてください。',
    seoTitle: 'Scale X 画像拡大ツールを選ぶ理由',
    seoContent: 'Scale Xは、ブラウザのローカル処理を使用して画質を落とさずに写真を拡大する無料のオンラインツールです。アニメ、風景、ポートレートを2倍から4倍に拡大できます。',
    cookieTitle: 'Cookie使用のお知らせ',
    cookieText: 'ブラウジング体験の向上とサイトトラフィックの分析のためにCookieを使用しています。このサイトを引き続き使用することで、Cookieポリシーに同意したことになります。',
    cookieAccept: '同意する',
    cookieDecline: '拒否する',
    cookieLearnMore: '詳細',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    contactUs: 'お問い合わせ',
    aboutUs: '私たちについて',
    faq: 'よくある質問',
    companyName: 'Scale X Lab',
    companyAddress: '東京都渋谷区...',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'プライバシーポリシー',
    privacyContent: '<h3>データ収集</h3><p>Scale Xはアップロードされた画像を収集、保存、送信しません。</p>',
    termsTitle: '利用規約',
    termsContent: '<h3>サービス説明</h3><p>Scale Xは無料のオンライン画像拡大サービスを提供します。</p>',
    faqTitle: 'よくある質問',
    faqItems: [
      { q: 'このサービスは無料ですか？', a: 'はい、Scale Xは完全無料でご利用いただけます。' },
      { q: '画像はサーバーにアップロードされますか？', a: 'いいえ、すべての処理はブラウザ内で行われます。' }
    ],
    aboutTitle: 'Scale Xについて',
    aboutContent: 'Scale Xは画像処理技術に情熱を持つエンジニアチームによって開発された無料のオンラインツールです。',
    lastUpdated: '最終更新：2024年12月'
  },
  'ko': {
    title: 'Scale X',
    subtitle: 'AI 스마트 이미지 업스케일러',
    uploadTitle: '사진 업로드',
    uploadSubtitle: '클릭하거나 파일을 드래그하세요',
    limit: '제한: 한 변 최대 4096px',
    settings: '설정',
    scale: '확대 배율',
    originalSize: '원본 크기',
    outputSize: '출력 크기',
    warningOutput: '경고: 출력 크기 초과',
    btnProcess: '화질 개선 시작',
    btnProcessing: '처리 중...',
    btnRegenerate: '재계산',
    btnDownload: '이미지 다운로드',
    btnChange: '이미지 변경',
    processingText: 'AI가 세부 사항 최적화 중...',
    labelOriginal: '원본',
    labelEnhanced: 'Scale X 개선됨',
    labelPreview: '미리보기 (이전)',
    feat1Title: 'AI 스마트 스케일링',
    feat1Desc: '고급 리샘플링 알고리즘을 사용하여 앨리어싱을 줄이고 선명도를 높입니다.',
    feat2Title: '로컬 개인정보 보호',
    feat2Desc: '모든 처리는 브라우저 내부에서 수행됩니다. 이미지는 서버로 전송되지 않습니다.',
    feat3Title: '4K/8K 지원',
    feat3Desc: '고해상도 출력에 최적화되어 인쇄 및 전문 디자인 요구 사항을 충족합니다.',
    footer: '© 2024 Scale X Lab',
    alertType: '이미지 파일을 업로드해주세요.',
    alertBig: '이미지가 너무 큽니다! 4096px 이하의 이미지를 사용해주세요.',
    alertFail: '이미지를 읽는 데 실패했습니다.',
    alertOutputBig: '출력 이미지가 너무 커서 브라우저 오류가 발생할 수 있습니다. 배율을 낮추세요.',
    seoTitle: '왜 Scale X인가요?',
    seoContent: 'Scale X는 화질 저하 없이 사진을 확대하는 무료 온라인 도구입니다.',
    cookieTitle: '쿠키 알림',
    cookieText: '브라우징 경험 개선 및 사이트 트래픽 분석을 위해 쿠키를 사용합니다.',
    cookieAccept: '동의',
    cookieDecline: '거부',
    cookieLearnMore: '자세히',
    privacyPolicy: '개인정보 보호정책',
    termsOfService: '이용약관',
    contactUs: '문의하기',
    aboutUs: '회사 소개',
    faq: '자주 묻는 질문',
    companyName: 'Scale X Lab',
    companyAddress: '서울시 강남구...',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: '개인정보 보호정책',
    privacyContent: '<h3>데이터 수집</h3><p>Scale X는 업로드된 이미지를 수집하지 않습니다.</p>',
    termsTitle: '이용약관',
    termsContent: '<h3>서비스 설명</h3><p>Scale X는 무료 온라인 이미지 확대 서비스입니다.</p>',
    faqTitle: '자주 묻는 질문',
    faqItems: [
      { q: '이 서비스는 무료인가요?', a: '네, Scale X는 완전히 무료입니다.' }
    ],
    aboutTitle: 'Scale X 소개',
    aboutContent: 'Scale X는 이미지 처리 기술에 열정적인 엔지니어 팀이 개발한 무료 온라인 도구입니다.',
    lastUpdated: '최종 업데이트: 2024년 12월'
  },
  'fr': {
    title: 'Scale X',
    subtitle: 'Upscaler d\'image intelligent IA',
    uploadTitle: 'Téléchargez votre photo',
    uploadSubtitle: 'Cliquez ou glissez le fichier ici',
    limit: 'Limite : Max 4096px par côté',
    settings: 'Paramètres',
    scale: 'Facteur d\'agrandissement',
    originalSize: 'Taille originale',
    outputSize: 'Taille de sortie',
    warningOutput: 'Attention : Sortie trop grande',
    btnProcess: 'Améliorer maintenant',
    btnProcessing: 'Traitement...',
    btnRegenerate: 'Recalculer',
    btnDownload: 'Télécharger l\'image',
    btnChange: 'Changer d\'image',
    processingText: 'L\'IA améliore les détails...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Amélioré',
    labelPreview: 'Aperçu (Ancien)',
    feat1Title: 'Mise à l\'échelle IA',
    feat1Desc: 'Algorithmes avancés pour réduire l\'aliasing et améliorer la clarté.',
    feat2Title: 'Confidentialité Locale',
    feat2Desc: 'Traitement local dans votre navigateur. Aucune image n\'est envoyée au serveur.',
    feat3Title: 'Support 4K/8K',
    feat3Desc: 'Optimisé pour la haute résolution, parfait pour l\'impression.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Veuillez télécharger un fichier image.',
    alertBig: 'Image trop grande ! Utilisez une image inférieure à 4096px.',
    alertFail: 'Échec de la lecture de l\'image.',
    alertOutputBig: 'L\'image de sortie est trop grande. Veuillez réduire l\'échelle.',
    seoTitle: 'Pourquoi Scale X ?',
    seoContent: 'Scale X est un outil gratuit pour agrandir vos images sans perte de qualité grâce à l\'IA.',
    cookieTitle: 'Avis sur les cookies',
    cookieText: 'Nous utilisons des cookies pour améliorer votre expérience.',
    cookieAccept: 'Accepter',
    cookieDecline: 'Refuser',
    cookieLearnMore: 'En savoir plus',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    contactUs: 'Nous contacter',
    aboutUs: 'À propos',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: 'Paris, France',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Politique de confidentialité',
    privacyContent: '<h3>Collecte de données</h3><p>Scale X ne collecte pas vos images.</p>',
    termsTitle: 'Conditions d\'utilisation',
    termsContent: '<h3>Description du service</h3><p>Scale X fournit un service gratuit.</p>',
    faqTitle: 'FAQ',
    faqItems: [{ q: 'Ce service est-il gratuit ?', a: 'Oui, Scale X est entièrement gratuit.' }],
    aboutTitle: 'À propos de Scale X',
    aboutContent: 'Scale X est un outil gratuit développé par des ingénieurs passionnés.',
    lastUpdated: 'Dernière mise à jour : Décembre 2024'
  },
  'it': {
    title: 'Scale X',
    subtitle: 'Upscaler di immagini AI',
    uploadTitle: 'Carica la tua foto',
    uploadSubtitle: 'Clicca o trascina il file qui',
    limit: 'Limite: Max 4096px per lato',
    settings: 'Impostazioni',
    scale: 'Fattore di scala',
    originalSize: 'Dimensione originale',
    outputSize: 'Dimensione output',
    warningOutput: 'Attenzione: Output troppo grande',
    btnProcess: 'Migliora ora',
    btnProcessing: 'Elaborazione...',
    btnRegenerate: 'Ricalcola',
    btnDownload: 'Scarica immagine',
    btnChange: 'Cambia immagine',
    processingText: 'L\'IA sta ottimizzando...',
    labelOriginal: 'Originale',
    labelEnhanced: 'Scale X Migliorato',
    labelPreview: 'Anteprima (Vecchio)',
    feat1Title: 'Scaling Intelligente',
    feat1Desc: 'Algoritmi avanzati per ridurre l\'aliasing e migliorare la nitidezza.',
    feat2Title: 'Privacy Locale',
    feat2Desc: 'Elaborazione locale nel browser. Le immagini non vengono caricate sui server.',
    feat3Title: 'Supporto 4K/8K',
    feat3Desc: 'Ottimizzato per output ad alta risoluzione, perfetto per la stampa.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Si prega di caricare un file immagine.',
    alertBig: 'Immagine troppo grande! Usa un\'immagine inferiore a 4096px.',
    alertFail: 'Impossibile leggere l\'immagine.',
    alertOutputBig: 'L\'immagine di output è troppo grande. Riduci la scala.',
    seoTitle: 'Perché Scale X?',
    seoContent: 'Scale X è uno strumento gratuito per ingrandire le immagini senza perdita di qualità.',
    cookieTitle: 'Avviso Cookie',
    cookieText: 'Utilizziamo i cookie per migliorare la tua esperienza.',
    cookieAccept: 'Accetta',
    cookieDecline: 'Rifiuta',
    cookieLearnMore: 'Scopri di più',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Termini di Servizio',
    contactUs: 'Contattaci',
    aboutUs: 'Chi Siamo',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: 'Milano, Italia',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Privacy Policy',
    privacyContent: '<h3>Raccolta Dati</h3><p>Scale X non raccoglie le tue immagini.</p>',
    termsTitle: 'Termini di Servizio',
    termsContent: '<h3>Descrizione</h3><p>Scale X fornisce un servizio gratuito.</p>',
    faqTitle: 'FAQ',
    faqItems: [{ q: 'Questo servizio è gratuito?', a: 'Sì, Scale X è completamente gratuito.' }],
    aboutTitle: 'Chi Siamo',
    aboutContent: 'Scale X è uno strumento gratuito sviluppato da ingegneri appassionati.',
    lastUpdated: 'Ultimo aggiornamento: Dicembre 2024'
  },
  'de': {
    title: 'Scale X',
    subtitle: 'KI-Bildvergrößerer',
    uploadTitle: 'Foto hochladen',
    uploadSubtitle: 'Klicken oder Datei hierher ziehen',
    limit: 'Limit: Max 4096px pro Seite',
    settings: 'Einstellungen',
    scale: 'Vergrößerungsfaktor',
    originalSize: 'Originalgröße',
    outputSize: 'Ausgabegröße',
    warningOutput: 'Warnung: Ausgabe zu groß',
    btnProcess: 'Jetzt verbessern',
    btnProcessing: 'Verarbeitung...',
    btnRegenerate: 'Neu berechnen',
    btnDownload: 'Bild herunterladen',
    btnChange: 'Bild ändern',
    processingText: 'KI optimiert Details...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Verbessert',
    labelPreview: 'Vorschau (Alt)',
    feat1Title: 'KI-Skalierung',
    feat1Desc: 'Fortschrittliche Algorithmen reduzieren Aliasing und verbessern die Klarheit.',
    feat2Title: 'Lokaler Datenschutz',
    feat2Desc: 'Lokale Verarbeitung im Browser. Bilder werden nicht auf Server hochgeladen.',
    feat3Title: '4K/8K Unterstützung',
    feat3Desc: 'Optimiert für hochauflösende Ausgaben, perfekt für den Druck.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Bitte laden Sie eine Bilddatei hoch.',
    alertBig: 'Bild zu groß! Bitte verwenden Sie ein Bild kleiner als 4096px.',
    alertFail: 'Bild konnte nicht gelesen werden.',
    alertOutputBig: 'Ausgabebild ist zu groß. Bitte Skalierung reduzieren.',
    seoTitle: 'Warum Scale X?',
    seoContent: 'Scale X ist ein kostenloses Tool zum Vergrößern von Bildern ohne Qualitätsverlust.',
    cookieTitle: 'Cookie-Hinweis',
    cookieText: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.',
    cookieAccept: 'Akzeptieren',
    cookieDecline: 'Ablehnen',
    cookieLearnMore: 'Mehr erfahren',
    privacyPolicy: 'Datenschutz',
    termsOfService: 'Nutzungsbedingungen',
    contactUs: 'Kontakt',
    aboutUs: 'Über uns',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: 'Berlin, Deutschland',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Datenschutz',
    privacyContent: '<h3>Datenerfassung</h3><p>Scale X erfasst Ihre Bilder nicht.</p>',
    termsTitle: 'Nutzungsbedingungen',
    termsContent: '<h3>Beschreibung</h3><p>Scale X bietet einen kostenlosen Service.</p>',
    faqTitle: 'FAQ',
    faqItems: [{ q: 'Ist dieser Service kostenlos?', a: 'Ja, Scale X ist völlig kostenlos.' }],
    aboutTitle: 'Über uns',
    aboutContent: 'Scale X ist ein kostenloses Tool, entwickelt von leidenschaftlichen Ingenieuren.',
    lastUpdated: 'Letzte Aktualisierung: Dezember 2024'
  },
  'pt': {
    title: 'Scale X',
    subtitle: 'Upscaler de Imagem IA',
    uploadTitle: 'Carregue sua foto',
    uploadSubtitle: 'Clique ou arraste o arquivo aqui',
    limit: 'Limite: Máx 4096px por lado',
    settings: 'Configurações',
    scale: 'Fator de Escala',
    originalSize: 'Tamanho Original',
    outputSize: 'Tamanho de Saída',
    warningOutput: 'Aviso: Saída muito grande',
    btnProcess: 'Melhorar Agora',
    btnProcessing: 'Processando...',
    btnRegenerate: 'Recalcular',
    btnDownload: 'Baixar Imagem',
    btnChange: 'Trocar Imagem',
    processingText: 'IA otimizando detalhes...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Melhorado',
    labelPreview: 'Prévia (Antigo)',
    feat1Title: 'Escala Inteligente',
    feat1Desc: 'Algoritmos avançados reduzem serrilhados e melhoram a clareza.',
    feat2Title: 'Privacidade Local',
    feat2Desc: 'Processamento local no navegador. Imagens nunca são enviadas para servidores.',
    feat3Title: 'Suporte 4K/8K',
    feat3Desc: 'Otimizado para saída de alta resolução, perfeito para impressão.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Por favor, carregue um arquivo de imagem.',
    alertBig: 'Imagem muito grande! Use uma imagem menor que 4096px.',
    alertFail: 'Falha ao ler a imagem.',
    alertOutputBig: 'A imagem de saída é muito grande. Reduza a escala.',
    seoTitle: 'Por que Scale X?',
    seoContent: 'Scale X é uma ferramenta gratuita para aumentar imagens sem perda de qualidade.',
    cookieTitle: 'Aviso de Cookies',
    cookieText: 'Usamos cookies para melhorar sua experiência.',
    cookieAccept: 'Aceitar',
    cookieDecline: 'Recusar',
    cookieLearnMore: 'Saiba mais',
    privacyPolicy: 'Política de Privacidade',
    termsOfService: 'Termos de Serviço',
    contactUs: 'Contato',
    aboutUs: 'Sobre Nós',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: 'São Paulo, Brasil',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Política de Privacidade',
    privacyContent: '<h3>Coleta de Dados</h3><p>Scale X não coleta suas imagens.</p>',
    termsTitle: 'Termos de Serviço',
    termsContent: '<h3>Descrição</h3><p>Scale X fornece um serviço gratuito.</p>',
    faqTitle: 'FAQ',
    faqItems: [{ q: 'Este serviço é gratuito?', a: 'Sim, Scale X é completamente gratuito.' }],
    aboutTitle: 'Sobre Nós',
    aboutContent: 'Scale X é uma ferramenta gratuita desenvolvida por engenheiros apaixonados.',
    lastUpdated: 'Última atualização: Dezembro 2024'
  },
  'es': {
    title: 'Scale X',
    subtitle: 'Mejorador de Imágenes IA',
    uploadTitle: 'Sube tu foto',
    uploadSubtitle: 'Haz clic o arrastra el archivo aquí',
    limit: 'Límite: Máx 4096px por lado',
    settings: 'Configuración',
    scale: 'Factor de Escala',
    originalSize: 'Tamaño Original',
    outputSize: 'Tamaño de Salida',
    warningOutput: 'Advertencia: Salida demasiado grande',
    btnProcess: 'Mejorar Ahora',
    btnProcessing: 'Procesando...',
    btnRegenerate: 'Recalcular',
    btnDownload: 'Descargar Imagen',
    btnChange: 'Cambiar Imagen',
    processingText: 'IA optimizando detalles...',
    labelOriginal: 'Original',
    labelEnhanced: 'Scale X Mejorado',
    labelPreview: 'Vista previa (Antiguo)',
    feat1Title: 'Escalado Inteligente',
    feat1Desc: 'Algoritmos avanzados reducen el aliasing y mejoran la claridad.',
    feat2Title: 'Privacidad Local',
    feat2Desc: 'Procesamiento local en tu navegador. Las imágenes no se suben a servidores.',
    feat3Title: 'Soporte 4K/8K',
    feat3Desc: 'Optimizado para descargas de alta resolución, perfecto para impresión.',
    footer: '© 2024 Scale X Lab',
    alertType: 'Por favor, sube un archivo de imagen.',
    alertBig: '¡Imagen demasiado grande! Usa una imagen menor a 4096px.',
    alertFail: 'Error al leer la imagen.',
    alertOutputBig: 'La imagen de salida es demasiado grande. Reduce la escala.',
    seoTitle: '¿Por qué Scale X?',
    seoContent: 'Scale X es una herramienta gratuita para agrandar imágenes sin perder calidad.',
    cookieTitle: 'Aviso de Cookies',
    cookieText: 'Usamos cookies para mejorar tu experiencia.',
    cookieAccept: 'Aceptar',
    cookieDecline: 'Rechazar',
    cookieLearnMore: 'Saber más',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    contactUs: 'Contacto',
    aboutUs: 'Sobre Nosotros',
    faq: 'FAQ',
    companyName: 'Scale X Lab',
    companyAddress: 'Madrid, España',
    companyEmail: 'support@scalex.hotmail.com',
    privacyTitle: 'Política de Privacidad',
    privacyContent: '<h3>Recopilación de Datos</h3><p>Scale X no recopila tus imágenes.</p>',
    termsTitle: 'Términos de Servicio',
    termsContent: '<h3>Descripción</h3><p>Scale X proporciona un servicio gratuito.</p>',
    faqTitle: 'FAQ',
    faqItems: [{ q: '¿Este servicio es gratuito?', a: 'Sí, Scale X es completamente gratuito.' }],
    aboutTitle: 'Sobre Nosotros',
    aboutContent: 'Scale X es una herramienta gratuita desarrollada por ingenieros apasionados.',
    lastUpdated: 'Última actualización: Diciembre 2024'
  }
};

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
          <button
            onClick={onLearnMore}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {t.cookieLearnMore}
          </button>
          <button
            onClick={onDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t.cookieDecline}
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {t.cookieAccept}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Modal Component for Privacy, Terms, FAQ, About
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
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {children}
          </div>
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-2 rounded-lg"
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-4 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
  
  // Modal states
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'privacy', 'terms', 'faq', 'about', 'contact'
  
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  const t = TRANSLATIONS[lang];

  const MAX_INPUT_DIMENSION = 4096;
  const MAX_OUTPUT_PIXELS = 64000000;

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowCookieConsent(false);
    }
  }, []);

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

      setMetadata({
        width: img.width,
        height: img.height,
        name: file.name.split('.')[0]
      });
      setImage(objectUrl);
      setProcessedImageUrl(null);
      setCurrentProcessedScale(null);
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieConsent && (
          <CookieConsent
            t={t}
            onAccept={handleCookieAccept}
            onDecline={handleCookieDecline}
            onLearnMore={() => setActiveModal('privacy')}
          />
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={t.privacyTitle}
      >
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: t.privacyContent }} className="space-y-4 text-gray-600" />
          <p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title={t.termsTitle}
      >
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: t.termsContent }} className="space-y-4 text-gray-600" />
          <p className="text-xs text-gray-400 mt-6 pt-4 border-t">{t.lastUpdated}</p>
        </div>
      </Modal>

      {/* FAQ Modal */}
      <Modal
        isOpen={activeModal === 'faq'}
        onClose={() => setActiveModal(null)}
        title={t.faqTitle}
      >
        <div className="space-y-1">
          {t.faqItems && t.faqItems.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </Modal>

      {/* About Modal */}
      <Modal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        title={t.aboutTitle}
      >
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{t.aboutContent}</p>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <p className="text-sm"><strong>{t.companyName}</strong></p>
            <p className="text-sm text-gray-500">{t.companyAddress}</p>
            <p className="text-sm text-gray-500">{t.companyEmail}</p>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title={t.contactUs}
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Email:</p>
            <a href={`mailto:${t.companyEmail}`} className="text-blue-600 font-medium text-lg hover:underline">
              {t.companyEmail}
            </a>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600"><strong>{t.companyName}</strong></p>
            <p className="text-sm text-gray-500 mt-1">{t.companyAddress}</p>
          </div>
        </div>
      </Modal>

      <div className="max-w-7xl mx-auto p-4 md:p-10">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter flex items-center justify-center md:justify-start gap-3">
              <Maximize className="w-10 h-10 text-blue-600" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {t.title}
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-light tracking-wide">{t.subtitle}</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
            <Globe size={16} className="text-gray-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium text-gray-600 cursor-pointer focus:ring-0"
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
        </header>

        <main>
          {!image ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white border-2 border-dashed border-blue-100 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm relative overflow-hidden"
              onClick={() => fileInputRef.current.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
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
              {/* Sidebar Controls */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100">
                  <h3 className="font-bold flex items-center gap-2 mb-6 text-gray-700 border-b border-gray-100 pb-4">
                    <Sliders size={18} className="text-blue-500" /> {t.settings}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-gray-500 mb-3 block">{t.scale}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[2, 4].map((s) => (
                          <button
                            key={s}
                            onClick={() => setScale(s)}
                            className={`py-3 rounded-xl font-bold transition-all border ${
                              scale === s 
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200' 
                              : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                          >
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
                        <span className={`font-mono font-bold ${
                          (metadata.width * scale * metadata.height * scale) > MAX_OUTPUT_PIXELS 
                          ? 'text-red-500' 
                          : 'text-blue-600'
                        }`}>
                          {metadata.width * scale} × {metadata.height * scale}
                        </span>
                      </div>
                      {(metadata.width * scale * metadata.height * scale) > MAX_OUTPUT_PIXELS && (
                        <div className="text-xs text-red-500 pt-2 border-t border-gray-200 mt-2 flex items-start gap-1">
                          <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                          {t.warningOutput}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {!processedImageUrl && (
                        <button
                          onClick={processImage}
                          disabled={isProcessing}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:text-white text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-100"
                        >
                          {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} className="fill-current" />}
                          {isProcessing ? t.btnProcessing : t.btnProcess}
                        </button>
                      )}

                      {needsRegeneration && !isProcessing && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={processImage}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100"
                        >
                          <RotateCcw size={20} />
                          {t.btnRegenerate} ({scale}x)
                        </motion.button>
                      )}

                      {processedImageUrl && !needsRegeneration && (
                        <button
                          onClick={downloadImage}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-100"
                        >
                          <Download size={20} /> {t.btnDownload}
                        </button>
                      )}

                      <button
                        onClick={reset}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-bold transition-all border border-gray-200"
                      >
                        {t.btnChange}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Preview Area */}
              <div className="lg:col-span-3">
                <div className="bg-white p-2 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 h-full flex flex-col min-h-96">
                  <div 
                    ref={containerRef}
                    className="relative flex-1 rounded-xl overflow-hidden bg-gray-100 cursor-col-resize select-none"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                  >
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`,
                        backgroundSize: `20px 20px`,
                        backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
                    }}></div>

                    <img 
                      src={image} 
                      alt="Original Upload" 
                      className="absolute inset-0 w-full h-full object-contain z-0"
                    />

                    {processedImageUrl && (
                      <div 
                        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 z-10 ${needsRegeneration ? 'opacity-50 grayscale' : 'opacity-100'}`}
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <img 
                          src={processedImageUrl} 
                          alt="AI Enhanced Result" 
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-30"
                        >
                          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                          <p className="font-bold text-blue-600 text-xl tracking-wide">{t.processingText}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {processedImageUrl && !isProcessing && (
                      <>
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none"
                          style={{ left: `${sliderPosition}%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-500 cursor-grab active:cursor-grabbing">
                            <div className="flex gap-1">
                              <div className="w-0.5 h-3 bg-blue-500 rounded-full"></div>
                              <div className="w-0.5 h-3 bg-blue-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md z-20">
                          {t.labelOriginal}
                        </div>
                        <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md z-20 shadow-lg shadow-blue-200">
                          {needsRegeneration ? `${t.labelPreview} ${currentProcessedScale}x` : `${t.labelEnhanced} ${currentProcessedScale}x`}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5">
                <Check size={28} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat1Title}</h4>
              <p className="text-gray-500 leading-relaxed">{t.feat1Desc}</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-5">
                <Shield size={28} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat2Title}</h4>
              <p className="text-gray-500 leading-relaxed">{t.feat2Desc}</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5">
                <Check size={28} />
              </div>
              <h4 className="font-bold text-xl mb-3 text-gray-800">{t.feat3Title}</h4>
              <p className="text-gray-500 leading-relaxed">{t.feat3Desc}</p>
            </div>
          </section>

          {/* SEO Content Section */}
          <article className="mt-20 border-t border-gray-100 pt-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Search size={24} className="text-gray-400" />
                {t.seoTitle}
              </h2>
              <p className="text-gray-500 leading-loose text-sm md:text-base">
                {t.seoContent}
              </p>
            </div>
          </article>
        </main>

        {/* Enhanced Footer with Legal Links */}
        <footer className="mt-16 border-t border-gray-100 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Maximize className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-800">{t.companyName}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{t.companyAddress}</p>
              <p className="text-sm text-gray-500">{t.companyEmail}</p>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <FileText size={16} />
                Legal
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {t.privacyPolicy}
                </button>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {t.termsOfService}
                </button>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Mail size={16} />
                Support
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveModal('faq')}
                  className="block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {t.faq}
                </button>
                <button
                  onClick={() => setActiveModal('about')}
                  className="block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {t.aboutUs}
                </button>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="block text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {t.contactUs}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">{t.footer}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveModal('privacy')}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t.privacyPolicy}
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setActiveModal('terms')}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t.termsOfService}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ImageUpscaler;