import React, { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  Zap, 
  Check, 
  Globe, 
  Menu, 
  X, 
  ChevronRight,
  Monitor,
  Layers,
  Cpu
} from 'lucide-react';

// --- 1. 這裡就是更新後的文章資料 ---
const BLOG_POSTS = [
  {
    id: 1,
    title: {
      'zh-TW': 'AI 放大 vs 傳統演算法：為什麼 Scale X 能做到無損畫質？',
      'en': 'AI Upscaling vs. Traditional Algorithms: How Scale X Achieves Lossless Quality'
    },
    excerpt: {
      'zh-TW': '傳統的雙三次插值（Bicubic）往往會讓放大後的圖片變得模糊。本文將深入淺出地解釋卷積神經網絡（CNN）如何透過深度學習「腦補」出缺失的細節...',
      'en': 'Traditional Bicubic interpolation often results in blurry upscaled images. This article explains how Convolutional Neural Networks (CNN) hallucinate missing details...'
    },
    content: {
      'zh-TW': `
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">傳統放大技術的瓶頸</h3>
        <p class="mb-4">在 AI 技術普及之前，圖片放大主要依賴「插值算法」（Interpolation）。最常見的是雙三次插值（Bicubic）。簡單來說，當你把一張圖片放大兩倍時，電腦需要在原本的像素之間插入新的像素。</p>
        <p class="mb-4">傳統算法的做法是「取平均值」。它會參考周圍像素的顏色，計算出一個中間值填入。這雖然能讓圖片變大，但缺點顯而易見：<strong>邊緣模糊、細節丟失、噪點被放大</strong>。這就像是把一塊奶油塗抹在更大的麵包上，雖然覆蓋了面積，但味道變淡了。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Scale X 的 AI 技術原理</h3>
        <p class="mb-4">Scale X 採用了先進的 SRGAN（超解析度生成對抗網絡）與 Real-ESRGAN 技術。與傳統算法不同，AI 不是在「猜測平均值」，而是在「繪製細節」。</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>深度學習訓練：</strong> 我們的模型經過數百萬張高解析度圖片的訓練。它「看過」無數種線條、紋理和光影的組合。</li>
          <li><strong>特徵識別：</strong> 當 AI 看到一個模糊的圓弧時，它知道這應該是一條平滑的曲線，而不是鋸齒狀的樓梯。</li>
          <li><strong>細節重構：</strong> AI 會根據訓練記憶，在放大過程中填補出原本不存在、但符合邏輯的細節。</li>
        </ul>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">為什麼這對設計師很重要？</h3>
        <p class="mb-4">對於平面設計師或印刷業者來說，客戶提供的素材往往解析度不足（例如來自通訊軟體的壓縮圖）。使用 Scale X，您可以將 72dpi 的網路圖片提升至接近 300dpi 的印刷品質，這在過去是無法想像的。</p>
        <p>這就是為什麼我們稱之為「智能無損」——雖然技術上我們改變了像素，但在視覺感知上，我們還原了影像應有的清晰度。</p>
      `,
      'en': `
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">The Bottleneck of Traditional Upscaling</h3>
        <p class="mb-4">Before the widespread adoption of AI, image upscaling relied heavily on "interpolation algorithms." The most common one is Bicubic interpolation. Simply put, when you double the size of an image, the computer needs to insert new pixels between the original ones.</p>
        <p class="mb-4">Traditional algorithms work by "averaging." They look at surrounding pixels and calculate a middle value to fill in the gap. While this makes the image larger, the downsides are obvious: <strong>blurred edges, lost details, and amplified noise</strong>. It's like spreading a small pat of butter over a large slice of bread—it covers the area, but the flavor is diluted.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">How Scale X's AI Works</h3>
        <p class="mb-4">Scale X utilizes advanced SRGAN (Super-Resolution Generative Adversarial Networks) and Real-ESRGAN technologies. Unlike traditional algorithms, AI doesn't just "guess averages"; it "paints details."</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Deep Learning Training:</strong> Our model has been trained on millions of high-resolution images. It has "seen" countless combinations of lines, textures, and lighting.</li>
          <li><strong>Feature Recognition:</strong> When the AI sees a blurry arc, it recognizes that it should be a smooth curve, not a jagged staircase.</li>
          <li><strong>Detail Reconstruction:</strong> Based on its training memory, the AI fills in details during the upscaling process that logically fit the image context.</li>
        </ul>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Why This Matters for Designers</h3>
        <p class="mb-4">For graphic designers or printers, client-provided assets often lack sufficient resolution (e.g., compressed images from messaging apps). With Scale X, you can boost a 72dpi web image to near 300dpi print quality—something that was previously impossible.</p>
        <p>This is why we call it "Smart Lossless"—while technically we are altering pixels, visually, we are restoring the clarity the image was meant to have.</p>
      `
    }
  },
  {
    id: 2,
    title: {
      'zh-TW': '動漫迷福音：如何將低畫質截圖變成 4K 桌布？',
      'en': 'Anime Fans Rejoice: How to Turn Low-Res Screenshots into 4K Wallpapers'
    },
    excerpt: {
      'zh-TW': '動漫圖片與真實照片的處理方式截然不同。Scale X 針對二次元影像的線條與色塊進行了專門優化，能有效去除 JPEG 噪點...',
      'en': 'Anime images require different processing than realistic photos. Scale X is optimized for 2D lines and color blocks, effectively removing JPEG artifacts...'
    },
    content: {
      'zh-TW': `
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">動漫圖片的特殊挑戰</h3>
        <p class="mb-4">動漫（Anime）或插畫圖片通常具有兩個特點：<strong>清晰的黑色輪廓線</strong>和<strong>大面積的純色色塊</strong>。當這類圖片經過 JPG 壓縮或被縮小時，會在線條周圍產生討厭的「蚊式噪點」（Artifacts），且線條會變得模糊不清。</p>
        <p class="mb-4">如果您使用一般的照片放大軟體處理動漫圖，往往會導致線條邊緣出現奇怪的紋理，或是色塊變得髒髒的。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Scale X 的動漫優化模式</h3>
        <p class="mb-4">Scale X 的核心算法對於「二次元」影像有著卓越的表現。我們的 AI 能夠識別出這是一張繪畫作品而非真實照片，因此它會採取不同的處理策略：</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>線條銳化：</strong> AI 會優先偵測輪廓線，將其收束得更加銳利，消除邊緣的模糊暈開。</li>
          <li><strong>噪點抹除：</strong> 針對色塊中的雜訊進行平滑處理，使顏色看起來更純淨，就像剛畫好的一樣。</li>
          <li><strong>不增加多餘紋理：</strong> 真實照片需要皮膚紋理，但動漫不需要。AI 會避免在平滑的臉部色塊上添加不必要的細節。</li>
        </ol>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">操作教學：3 步驟製作 4K 桌布</h3>
        <p class="mb-4">想把手機裡的經典動畫截圖變成電腦桌布嗎？</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
          <li>點擊首頁的「上傳圖片」，選擇您的截圖。</li>
          <li>在設定中選擇 <strong>4x (四倍放大)</strong>。如果原圖是 1920x1080，放大後將達到驚人的 8K 解析度；如果是 720p 截圖，則會變成接近 4K。</li>
          <li>等待 AI 處理約 5-10 秒，預覽確認線條清晰後，點擊下載。</li>
        </ol>
        <p>現在，您可以享受完全沒有鋸齒的超高畫質動漫桌布了！</p>
      `,
      'en': `
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">The Unique Challenge of Anime Images</h3>
        <p class="mb-4">Anime and illustrations typically have two distinct features: <strong>sharp outlines</strong> and <strong>large areas of flat color</strong>. When these images are JPG compressed or downscaled, annoying "mosquito noise" (artifacts) appears around the lines, and the lines themselves become blurry.</p>
        <p class="mb-4">If you use standard photo upscaling software on anime, it often results in weird textures around edges or "dirty" looking color blocks.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Scale X's Anime Optimization</h3>
        <p class="mb-4">Scale X's core algorithm excels at "2D" imagery. Our AI recognizes that the input is a drawing rather than a realistic photo, so it adopts a different strategy:</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
          <li><strong>Line Sharpening:</strong> The AI prioritizes outline detection, tightening them to be sharper and eliminating edge blur.</li>
          <li><strong>Denoising:</strong> It smooths out noise within color blocks, making the colors look pure, just like a fresh drawing.</li>
          <li><strong>No Unwanted Textures:</strong> Realistic photos need skin texture; anime does not. The AI avoids adding unnecessary details to smooth facial areas.</li>
        </ol>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">Tutorial: Create 4K Wallpapers in 3 Steps</h3>
        <p class="mb-4">Want to turn that classic anime screenshot from your phone into a desktop wallpaper?</p>
        <ol class="list-decimal pl-6 mb-4 space-y-2">
          <li>Click "Upload Photo" on the homepage and select your screenshot.</li>
          <li>Choose <strong>4x Upscale</strong> in the settings. If your source is 1080p, the result will approach 8K; if it's a 720p screenshot, it will become nearly 4K.</li>
          <li>Wait 5-10 seconds for the AI to process. Check the preview for sharp lines, then click Download.</li>
        </ol>
        <p>Now you can enjoy ultra-high-definition anime wallpapers with absolutely no jagged edges!</p>
      `
    }
  },
  {
    id: 3,
    title: {
      'zh-TW': '除了 Scale X，設計師必備的 5 個免費瀏覽器工具',
      'en': 'Beyond Scale X: 5 Free Browser Tools Every Designer Needs'
    },
    excerpt: {
      'zh-TW': '工欲善其事，必先利其器。作為一個免費的線上工具開發者，我們也整理了其他幾個好用的網頁版設計神器，推薦給所有創作者...',
      'en': 'To do a good job, one must first sharpen one\'s tools. As developers of a free online tool, we have curated a list of other amazing browser-based design utilities...'
    },
    content: {
      'zh-TW': `
        <p class="mb-4">Scale X 致力於解決「圖片模糊」的問題，但在設計流程中，您可能還會遇到其他挑戰。以下是我們團隊精選的 5 個免費、無需安裝、且注重隱私的瀏覽器工具，它們能與 Scale X 完美搭配：</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">1. Remove.bg (自動去背)</h3>
        <p class="mb-4">如果您需要將 Scale X 放大後的人像合成到海報中，Remove.bg 是目前的業界標竿。它能一鍵去除背景，連髮絲都能處理得相當乾淨。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">2. TinyPNG (圖片壓縮)</h3>
        <p class="mb-4">Scale X 輸出的圖片因為解析度高，檔案通常較大。如果您要將圖片上傳到網站，建議先使用 TinyPNG 進行無損壓縮，可以節省 70% 的頻寬而不影響視覺品質。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">3. Coolors.co (配色生成)</h3>
        <p class="mb-4">缺乏靈感嗎？Coolors 是一個超快速的配色方案生成器。按下空白鍵就能隨機產生協調的色票，非常適合在修圖調色時尋找靈感。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">4. Photopea (線上版 Photoshop)</h3>
        <p class="mb-4">如果您臨時需要使用圖層、遮罩或濾鏡，但手邊沒有安裝 Photoshop，Photopea 是一個功能幾乎完全復刻 PS 的網頁工具。您可以先用 Scale X 放大素材，再丟進 Photopea 進行合成。</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">5. SvgOmg (SVG 優化)</h3>
        <p class="mb-4">對於網頁設計師來說，SVG 的檔案大小至關重要。SvgOmg 能在不破壞向量圖形的前提下，移除多餘的代碼，大幅縮減檔案體積。</p>
        
        <p class="mb-4"><strong>總結：</strong> 現代瀏覽器的效能已經強大到足以運行這些專業工具。善用這個「工具箱」，能讓您的工作效率倍增！</p>
      `,
      'en': `
        <p class="mb-4">Scale X is dedicated to solving "blurry images," but you might face other challenges in your design workflow. Here are 5 free, no-install, privacy-focused browser tools selected by our team that pair perfectly with Scale X:</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">1. Remove.bg (Auto Background Removal)</h3>
        <p class="mb-4">If you need to composite a Scale X upscaled portrait into a poster, Remove.bg is the industry standard. It removes backgrounds in one click, handling even hair strands cleanly.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">2. TinyPNG (Image Compression)</h3>
        <p class="mb-4">Because Scale X outputs high-resolution images, file sizes can be large. If you plan to upload these to a website, we recommend using TinyPNG first. It can save 70% bandwidth with "smart lossy" compression that looks lossless.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">3. Coolors.co (Palette Generator)</h3>
        <p class="mb-4">Lacking inspiration? Coolors is a super-fast color scheme generator. Just hit the spacebar to generate harmonious palettes randomly—perfect for finding inspiration during color grading.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">4. Photopea (Online Photoshop)</h3>
        <p class="mb-4">If you need layers, masks, or filters but don't have Photoshop installed, Photopea is a web tool that almost perfectly replicates PS functionality. You can upscale assets in Scale X first, then drop them into Photopea for compositing.</p>
        
        <h3 class="text-xl font-bold text-gray-800 mt-6 mb-3">5. SvgOmg (SVG Optimizer)</h3>
        <p class="mb-4">For web designers, SVG file size is crucial. SvgOmg removes unnecessary code from vector files without breaking the graphic, significantly reducing file size.</p>
        
        <p class="mb-4"><strong>Conclusion:</strong> Modern browsers are powerful enough to run these professional tools. Utilizing this "toolbox" can double your work efficiency!</p>
      `
    }
  }
];

const UI_TEXT = {
  'zh-TW': {
    title: 'Scale X - AI 圖片無損放大',
    subtitle: '使用最新 AI 技術，一鍵提升圖片解析度，修復模糊細節。',
    uploadBtn: '上傳圖片',
    dropText: '或將圖片拖放到這裡',
    processing: 'AI 正在處理中...',
    download: '下載圖片',
    features: {
      f1: 'AI 智能補圖',
      f1Desc: '自動填補缺失細節，非單純拉伸。',
      f2: '4x 無損放大',
      f2Desc: '最高支援 4 倍解析度提升。',
      f3: '隱私保護',
      f3Desc: '圖片在瀏覽器端處理，不保留數據。'
    },
    blogTitle: '最新技術文章',
    readMore: '閱讀更多',
    back: '返回文章列表',
    footer: '© 2024 Scale X. All rights reserved.'
  },
  'en': {
    title: 'Scale X - AI Image Upscaler',
    subtitle: 'Upscale images, remove noise, and restore details with one click.',
    uploadBtn: 'Upload Image',
    dropText: 'or drop image here',
    processing: 'AI Processing...',
    download: 'Download Image',
    features: {
      f1: 'AI Enhancement',
      f1Desc: 'Hallucinates missing details intelligently.',
      f2: '4x Upscaling',
      f2Desc: 'Boost resolution up to 400%.',
      f3: 'Privacy First',
      f3Desc: 'Processed locally or securely deleted.'
    },
    blogTitle: 'Latest Tech Blog',
    readMore: 'Read More',
    back: 'Back to Blog',
    footer: '© 2024 Scale X. All rights reserved.'
  }
};

function App() {
  const [lang, setLang] = useState('zh-TW');
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = UI_TEXT[lang];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
      
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessedImage(true); // Just a flag to show result state
      }, 2000);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'zh-TW' ? 'en' : 'zh-TW');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePost(null)}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-xl font-bold tracking-tight">Scale X</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setActivePost(null)} className="text-gray-600 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => document.getElementById('blog').scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-blue-600 transition-colors">Blog</button>
              <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors px-3 py-1 rounded-full border border-gray-200 hover:border-blue-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{lang === 'zh-TW' ? 'EN' : '繁中'}</span>
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4">
             <button onClick={() => { setActivePost(null); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-600 py-2">Home</button>
             <button onClick={() => { document.getElementById('blog').scrollIntoView(); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-600 py-2">Blog</button>
             <button onClick={toggleLang} className="block w-full text-left text-blue-600 font-medium py-2">
               Switch to {lang === 'zh-TW' ? 'English' : '中文'}
             </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main>
        {activePost ? (
          // --- Blog Post View ---
          <article className="max-w-3xl mx-auto px-4 py-12 animate-in fade-in duration-500">
            <button 
              onClick={() => setActivePost(null)}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              {t.back}
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {activePost.title[lang]}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
              <span>By Scale X Team</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">Tech</span>
            </div>

            {/* 2. 這裡使用了 dangerouslySetInnerHTML 來正確顯示文章中的 HTML 標籤 */}
            <div 
              className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activePost.content[lang] }}
            />
            
            <div className="mt-12 pt-8 border-t border-gray-100">
               <div className="bg-blue-50 p-6 rounded-xl flex items-start gap-4">
                 <div className="bg-blue-600 p-2 rounded-lg text-white shrink-0">
                   <Zap className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 mb-1">Try Scale X Now</h4>
                   <p className="text-sm text-gray-600 mb-3">Experience the AI upscaling technology mentioned in this article.</p>
                   <button 
                     onClick={() => setActivePost(null)}
                     className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                   >
                     Go to Tool &rarr;
                   </button>
                 </div>
               </div>
            </div>
          </article>
        ) : (
          // --- Home View ---
          <>
            {/* Hero Section */}
            <section className="pt-16 pb-24 px-4 bg-gradient-to-b from-white to-blue-50/50">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  v2.0 Model Updated
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                  {t.title}
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {t.subtitle}
                </p>

                {/* Upload Area */}
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-gray-100 p-8 transition-all hover:shadow-2xl hover:shadow-blue-100/50">
                  {!image ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-300 transition-colors group cursor-pointer relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-600/20 mb-3 group-hover:bg-blue-700 transition-colors">
                        {t.uploadBtn}
                      </span>
                      <p className="text-gray-400 text-sm">{t.dropText}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                         <img src={image} alt="Preview" className="max-h-full object-contain" />
                         {isProcessing && (
                           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                             <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3"></div>
                             <p className="font-medium">{t.processing}</p>
                           </div>
                         )}
                      </div>
                      
                      {processedImage && !isProcessing && (
                        <div className="flex gap-4">
                          <button 
                            onClick={() => { setImage(null); setProcessedImage(null); }}
                            className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            Reset
                          </button>
                          <button className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            {t.download}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.features.f1}</h3>
                    <p className="text-gray-600">{t.features.f1Desc}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.features.f2}</h3>
                    <p className="text-gray-600">{t.features.f2Desc}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.features.f3}</h3>
                    <p className="text-gray-600">{t.features.f3Desc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-24 bg-gray-50 border-t border-gray-200">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.blogTitle}</h2>
                  <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group cursor-pointer"
                      onClick={() => {
                        setActivePost(post);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {/* Placeholder for blog image */}
                        <div className={`absolute inset-0 flex items-center justify-center text-gray-400 bg-gradient-to-br ${post.id === 1 ? 'from-blue-50 to-blue-100' : post.id === 2 ? 'from-purple-50 to-purple-100' : 'from-gray-50 to-gray-200'}`}>
                          <ImageIcon className="w-12 h-12 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title[lang]}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-1 leading-relaxed">
                          {post.excerpt[lang]}
                        </p>
                        <div className="flex items-center text-blue-600 font-medium text-sm mt-auto group/btn">
                          {t.readMore}
                          <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
            <span className="font-bold text-gray-900">Scale X</span>
          </div>
          <p className="text-gray-500 text-sm">{t.footer}</p>
          <div className="flex gap-6 text-gray-400">
             <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
             <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
             <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;