import { useState } from 'react';
import { Heart, Ghost, Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { submitToGAS } from '../lib/api';
import { SuccessModal } from './SuccessModal';

export function ConfessionSection() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!target || !message || (!isAnonymous && !sender)) return;
    try {
      setIsSubmitting(true);
      await submitToGAS('confession', {
        target,
        isAnonymous,
        sender: isAnonymous ? '' : sender,
        message
      });
      setShowSuccess(true);
      setTarget('');
      setMessage('');
      setSender('');
      setIsAnonymous(true);
    } catch (err) {
      alert("投稿失敗：" + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="confession" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-rose-600">
          <Heart className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">【投稿三】告白 / 感謝</h2>
          <p className="text-slate-500 mt-1">有些真心話太害羞不敢當面說嗎？那就匿名勇敢表達吧！</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 sm:p-8 rounded-3xl shadow-sm border border-rose-100">
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-sm text-rose-800 border border-rose-200">
            ✉️ 學長姐、學弟妹都可以來投稿！寫下你想指定感謝/告白的對象（可指定班級/姓名或老師名字），讓愛與感謝在畢業前夕大聲說出來。
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-medium text-slate-700">選擇你的署名方式：</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${isAnonymous ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}
              `}>
                <Ghost className={`w-6 h-6 mb-2 ${isAnonymous ? 'text-rose-500' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm">偷偷丟紙條</span>
                <input type="radio" className="hidden" checked={isAnonymous} onChange={() => setIsAnonymous(true)} />
              </label>

              <label className={`
                flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                ${!isAnonymous ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}
              `}>
                <Heart className={`w-6 h-6 mb-2 ${!isAnonymous ? 'text-indigo-500' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm">勇敢留下名</span>
                <input type="radio" className="hidden" checked={!isAnonymous} onChange={() => setIsAnonymous(false)} />
              </label>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6 pt-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">你想寫給誰？ (班級 / 姓名 / 綽號 / 老師科目)</label>
              <input
                type="text"
                placeholder="給301的班導、給合作社的阿姨..."
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-rose-400 focus:ring-rose-400 p-3 bg-white text-slate-800"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">你想說的真心話</label>
              <textarea
                rows={5}
                placeholder="其實我一直都很喜歡你打球的樣子..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-rose-400 focus:ring-rose-400 p-3 bg-white text-slate-800 resize-none"
              />
            </div>

            {!isAnonymous && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium text-slate-700 mb-2">你的署名 (大名或綽號)</label>
                <input
                  type="text"
                  placeholder="例如：206 彭于晏"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full rounded-xl border-slate-200 shadow-sm focus:border-rose-400 focus:ring-rose-400 p-3 bg-white text-slate-800"
                />
              </motion.div>
            )}

            <div className="border-t border-rose-200 pt-6 flex justify-end">
              <button 
                onClick={handleSubmit}
                disabled={!target || !message || (!isAnonymous && !sender) || isSubmitting}
                className="py-3 px-8 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-rose-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>投遞中 <Loader2 className="w-4 h-4 ml-1 animate-spin" /></>
                ) : (
                  <>投遞心意信箱 <Send className="w-4 h-4 ml-1" /></>
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
      
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
}
