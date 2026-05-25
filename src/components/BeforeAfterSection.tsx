import { useState } from 'react';
import { Upload, X, ArrowRight, UserSquare2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitToGAS, resizeImageAndToBase64 } from '../lib/api';
import { SuccessModal } from './SuccessModal';

export function BeforeAfterSection() {
  const [photo1, setPhoto1] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isFirst: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (isFirst) {
        setPhoto1(url);
        setFile1(file);
      } else {
        setPhoto2(url);
        setFile2(file);
      }
    }
  };

  const removePhoto = (isFirst: boolean) => {
    if (isFirst) {
      setPhoto1(null);
      setFile1(null);
    } else {
      setPhoto2(null);
      setFile2(null);
    }
  };

  const handleSubmit = async () => {
    if (!file1 || !file2 || !message) return;
    try {
      setIsSubmitting(true);
      const [image1Base64, image2Base64] = await Promise.all([
        resizeImageAndToBase64(file1),
        resizeImageAndToBase64(file2)
      ]);
      await submitToGAS('before_after', {
        image1Base64,
        image2Base64,
        message
      });
      setShowSuccess(true);
      setPhoto1(null);
      setPhoto2(null);
      setFile1(null);
      setFile2(null);
      setMessage('');
    } catch (err) {
      alert("投稿失敗：" + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="before-after" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-amber-600">
          <UserSquare2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">【投稿一】青澀對比</h2>
          <p className="text-slate-500 mt-1">高一 vs 高三，歲月是一把殺豬刀還是整容刀？</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
        
        {/* Form Controls */}
        <div className="flex-1 space-y-6">
          <p className="text-slate-600 leading-relaxed bg-amber-50 p-4 rounded-xl text-sm border border-amber-100">
            🎓 畢業前~讓自己 (或同學) 在靠北版上留下美好的回憶吧！上傳兩張照片，寫下你想對當時或現在說的話。放心，小編會幫你編輯得美美的啦！
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Photo 1 Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">高一 (剛入學)</label>
              {!photo1 ? (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 hover:border-amber-300 transition-colors cursor-pointer group">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-amber-500 mb-2" />
                  <span className="text-xs text-slate-500">上傳照片</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, true)} />
                </label>
              ) : (
                <div className="relative h-32 rounded-xl overflow-hidden group">
                  <img src={photo1} alt="Before" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(true)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Photo 2 Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">高三 (快畢業了)</label>
              {!photo2 ? (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 hover:border-amber-300 transition-colors cursor-pointer group">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-amber-500 mb-2" />
                  <span className="text-xs text-slate-500">上傳照片</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(e, false)} />
                </label>
              ) : (
                <div className="relative h-32 rounded-xl overflow-hidden group">
                  <img src={photo2} alt="After" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(false)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">想對那時候or現在的自己說什麼？</label>
            <textarea
              rows={3}
              placeholder="例如：好好讀書啊！不要再上課睡覺了..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border-slate-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 bg-slate-50 text-slate-800"
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors shadow-sm focus:ring-4 focus:ring-amber-100 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={!file1 || !file2 || !message || isSubmitting}
          >
            {isSubmitting ? (
              <>處理中 <Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <>確認送出投稿 <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 bg-slate-900 rounded-2xl p-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"></div>
          
          <div className="w-full max-w-sm">
            <h3 className="text-white/50 text-xs font-medium tracking-widest text-center mb-6">排版預覽 DEMO</h3>
            
            <AnimatePresence mode="popLayout">
              {(!photo1 && !photo2 && !message) ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center text-slate-600 my-12"
                >
                  <UserSquare2 className="w-12 h-12 mx-auto text-slate-700 mb-3 opacity-50" />
                  <p className="text-sm">上傳照片並輸入文字<br/>即可預覽生成效果</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
                  className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800"
                >
                  <div className="flex aspect-[4/3] bg-slate-100">
                    <div className="flex-1 border-r border-white/50 relative">
                      {photo1 ? <img src={photo1} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">高一</div>}
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded">THEN</div>
                    </div>
                    <div className="flex-1 relative">
                      {photo2 ? <img src={photo2} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">高三</div>}
                      <div className="absolute bottom-2 right-2 bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded">NOW</div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800 text-slate-200">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message || '（這裡會顯示你留下的文字留言）'}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
                      <span>TCFSH 青春不留白</span>
                      <span>#靠北版畢業特企</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
      
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
