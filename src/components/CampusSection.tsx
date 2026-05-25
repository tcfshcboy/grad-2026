import { useState, useEffect } from 'react';
import { Camera, MapPin, Send, X, ZoomIn, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitToGAS, resizeImageAndToBase64 } from '../lib/api';
import { SuccessModal } from './SuccessModal';

const DEMO_IMAGES = [
  "https://i.meee.com.tw/F6VQDWy.png",
  "https://i.meee.com.tw/08QFPE8.png",
  "https://i.meee.com.tw/09FFwTz.png"
];

export function CampusSection() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [zoomedImage]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setPhoto(URL.createObjectURL(uploadedFile));
      setFile(uploadedFile);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file || !location || !message) return;
    try {
      setIsSubmitting(true);
      const imageBase64 = await resizeImageAndToBase64(file);
      await submitToGAS('campus', {
        imageBase64,
        location,
        message
      });
      setShowSuccess(true);
      removePhoto();
      setLocation('');
      setMessage('');
    } catch (err) {
      alert("投稿失敗：" + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="campus" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-emerald-600">
          <Camera className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">【投稿二】回眸校園</h2>
          <p className="text-slate-500 mt-1">那些被時光凝結的角落，與你的專屬記憶。</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Showcase Area */}
        <div className="bg-slate-900 p-8 sm:p-12 relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-slate-300 text-sm md:text-base leading-relaxed tracking-wide">
                「畢業前夕，內心總是五味雜陳，時而雀躍，時而感傷。<br className="hidden md:block"/>
                用圖像與文字捕捉當下，盡情揮灑你與這些角落的故事吧！」
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {DEMO_IMAGES.map((src, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-[3/4] relative rounded-xl overflow-hidden group shadow-xl cursor-pointer"
                  onClick={() => setZoomedImage(src)}
                >
                  <img src={src} alt="Campus Corner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <ZoomIn className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-xs font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>TCFSH_{idx+1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-slate-700 mb-2">上傳校園角落/景物</label>
            {!photo ? (
              <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-emerald-300 transition-colors cursor-pointer group">
                <Camera className="w-8 h-8 text-slate-300 group-hover:text-emerald-500 mb-3" />
                <span className="text-sm text-slate-500 font-medium">點擊選擇照片</span>
                <span className="text-xs text-slate-400 mt-1">支援 JPG, PNG</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
            ) : (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button onClick={removePhoto} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="font-medium text-sm">重新選擇</span>
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">角落名稱 / 地點</label>
              <input
                type="text"
                placeholder="例如：莊敬樓三樓走廊盡頭"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-slate-50 text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">你想留下的一句話</label>
              <textarea
                rows={4}
                placeholder="那年我們在這裡看過的晚霞，會一直留在記憶裡..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-slate-50 text-slate-800"
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-sm focus:ring-4 focus:ring-emerald-100 flex justify-center items-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={!file || !location || !message || isSubmitting}
            >
              {isSubmitting ? (
                <>處裡中 <Loader2 className="w-4 h-4 ml-1 animate-spin" /></>
              ) : (
                <>送出校園回憶 <Send className="w-4 h-4 ml-1" /></>
              )}
            </button>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              src={zoomedImage} 
              alt="Zoomed Campus Corner" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
