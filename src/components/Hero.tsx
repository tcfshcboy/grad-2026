import { motion } from 'motion/react';
import { GraduationCap, MapPin, MessageCircleHeart, Users } from 'lucide-react';

export function Hero() {
  const cards = [
    {
      id: 'bingo',
      icon: <GraduationCap className="w-6 h-6" />,
      title: '一中生大會考',
      desc: '專屬 Bingo 挑戰，你夠「一中」嗎?',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'before-after',
      icon: <Users className="w-6 h-6" />,
      title: '青澀對比',
      desc: '高一高三照片合璧，讓靠北版見證你的成長',
      color: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'campus',
      icon: <MapPin className="w-6 h-6" />,
      title: '回眸校園',
      desc: '圖文分享你對校園人事景物的戀戀不忘',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'confession',
      icon: <MessageCircleHeart className="w-6 h-6" />,
      title: '告白與感謝',
      desc: '偷偷說出心裡的話，愛與感謝要及時說出口',
      color: 'bg-rose-100 text-rose-700',
    },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm tracking-widest shadow-sm">
            TCFSH 靠北版 2026 畢業特別企劃
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            🎓 畢業倒數！<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
              青春不留白補完計畫
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            畢業倒數計時中！特別企劃帶你回顧這3年的一中點滴。<br className="hidden sm:block" />
            4個互動專區各自精彩，無論是黑歷史還是不敢說的秘密，都在這裡一次補完！
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => scrollTo(card.id)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all bg-white shadow-sm border border-slate-100 hover:shadow-md cursor-pointer`}
            >
              <div className={`p-4 rounded-full mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{card.title}</h3>
              <p className="text-xs text-slate-500">{card.desc}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
