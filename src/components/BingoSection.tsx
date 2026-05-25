import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Trophy, Download } from 'lucide-react';

const BINGO_V1 = [
  '買飲料被學校\n販賣機吃錢', '閱覽室忘記刷離\n被判定違規', '同學在教室打球\n球在課桌椅狂彈', '知道什麼是\n一中卡卡西', '曾經跟同學\n緊抱或坐大腿\n(趁畢業前抱抱吧!)',
  '經歷過那段\n沒有脆薯的日子', '遇到白目同學\n鬧老師\n在台下默默翻白眼', '多元選修\n選到X課\n上到崩潰', '體育課被集體\n硬控去聽宣導', '真心投稿告白\n結局是\n「沒下文」',
  '在班上聽到\n操場球鞋吱吱吱', '遇到平常喊沒讀\n但考出來\n比誰都卷的同學', 'Free\n✨畢業快樂✨', '開學後不久\n社團加退選\n搶破頭', '翻牆走校史門\n成功躲過教官',
  '熱食部買東西\n被學長教育\n要排隊', '百米衝刺\n只為搶合作社\n限量款食物', '曾投稿靠北版\n遺失物招領/\n遺失物協尋', '寒暑假發文：\n「我是宮廟委員\n我反對開學」', '訂外送沒付餐具\n跟別班同學乞討',
  '認同本校是全台\n唯一正統一中', '最後一個離開\n閱覽室\n關燈關冷氣', '從來沒有被當過\n一中電神就是我', '日本姊妹校來訪\n要過女生IG', '老師在台上講\n台下睡到流口水'
];

const BINGO_V2 = [
  '知道一中\n校歌潛規則：\n絕不能亂加嘿！', '健檢抽完血\n被催\n「量完快走」', '全勤寶寶就是我\n一中三年沒白活', '留宿晚點名\n聽人彈吉他', '在莊敬樓\n飲水機裝水\n順便看隔壁班上課',
  '體驗過傳說中的\n高二化學補考', '看過沒沖屎的馬桶\n聞過\n味很重的便斗', '放學搶到閱覽室\n空位卻被\n書和書包佔滿', '表面看黑板，\n手卻在桌子底下\n瘋狂滑動', '考前瘋狂跟班上\n學霸借筆記',
  '體驗到一中\n行政效率，想罵\n"是不是新來的"', '上下學搭公車擠爆\n看靠北版不讓座劇場', 'Free\n✨畢業快樂✨', '放學在校園角落\n看美到駐足\n的夕陽', '在桌子抽屜或\nU-bike籃子\n發現遺失物',
  '上課無聊跟同學\n打貓戰/打手遊', '午餐裡面少菜\n少雞腿\n被小偷扒走', '知道什麼是\n慎思湖水怪', '搶少得可憐\n(限量)的食物\n前一節就先跑去預購', '冷氣卡在最熱時\n剛好餘額不足',
  '好像還沒繳過\n學生會費', '班上有作弊被抓\n看到有小帳在\n瘋狂互撕', '投過IG靠北版\n(現有畢業特別\n投稿~快來!)', '去過女中園遊會\n但現在還是單身', '嫌棄運動服\n和制服醜\n結果還是都乖乖穿過'
];

export function BingoSection() {
  const [version, setVersion] = useState<1 | 2>(1);
  const [selectedV1, setSelectedV1] = useState<number[]>([12]); // 12 is Free space
  const [selectedV2, setSelectedV2] = useState<number[]>([12]);

  const currentItems = version === 1 ? BINGO_V1 : BINGO_V2;
  const currentSelected = version === 1 ? selectedV1 : selectedV2;
  const setCurrentSelected = version === 1 ? setSelectedV1 : setSelectedV2;
  
  const currentDownloadImg = version === 1 ? 'https://i.meee.com.tw/h4xMifn.png' : 'https://i.meee.com.tw/Hf4bknM.png';
  const currentStoryImg = version === 1 ? 'https://i.meee.com.tw/dmjQyCJ.png' : 'https://i.meee.com.tw/ZGgwByH.png';

  const toggleItem = (index: number) => {
    if (index === 12) return; // Cannot toggle Free space
    setCurrentSelected(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="bingo" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-2 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 inline-flex items-center justify-center">
            <Trophy className="mr-3 text-amber-500 w-8 h-8" />
            一中生大會考
            <Trophy className="ml-3 text-amber-500 w-8 h-8" />
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            畢業專屬 Bingo 挑戰！這三年你到底多「一中」？
            <br />
            <span className="text-sm text-amber-600 mt-2 inline-block font-medium bg-amber-50 px-4 py-1.5 rounded-full">可在網頁直接玩，也可下載圖檔分享到 IG 限時動態~記得 @tcfsh_cboy 呦!</span>
          </p>
        </div>

        <div className="bg-slate-50 p-4 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          
          <div className="flex justify-center mb-8">
            <div className="bg-slate-200 p-1 rounded-full flex items-center transition-colors">
              <button
                onClick={() => setVersion(1)}
                className={`py-2 px-6 rounded-full text-sm font-bold transition-all ${version === 1 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                第一版
              </button>
              <button
                onClick={() => setVersion(2)}
                className={`py-2 px-6 rounded-full text-sm font-bold transition-all ${version === 2 ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                第二版
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 sm:gap-3 mb-8">
            {currentItems.map((item, index) => {
              const isSelected = currentSelected.includes(index);
              const isFree = index === 12;
              
              return (
                <motion.button
                  key={index}
                  whileTap={!isFree ? { scale: 0.95 } : {}}
                  onClick={() => toggleItem(index)}
                  className={`
                    relative aspect-square sm:aspect-auto sm:h-32 flex flex-col items-center justify-center text-center p-1 sm:p-2 rounded-lg sm:rounded-xl transition-colors
                    ${isFree ? 'bg-amber-100 text-amber-800 border-2 border-amber-300 font-bold cursor-default' : 
                      isSelected 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer'
                    }
                  `}
                >
                  {isSelected && !isFree && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center justify-center bg-white text-blue-500 rounded-full sm:bg-transparent sm:text-white"
                    >
                      <Check className="w-3 h-3 sm:w-5 sm:h-5" />
                    </motion.div>
                  )}
                  <span className={`text-[10px] sm:text-sm leading-tight sm:leading-snug whitespace-pre-line ${isFree ? 'text-amber-600 text-xs sm:text-lg' : ''}`}>
                    {item}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 bg-blue-50 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 border border-blue-100">
            <div className="w-full md:w-64 aspect-[4/3] rounded-xl overflow-hidden shadow-md shrink-0 border-2 border-white">
              <img 
                src={currentDownloadImg} 
                alt="Bingo 版預覽" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col justify-center">
              <h3 className="text-xl font-bold text-blue-900 mb-3">想要分享到 IG 限動嗎？</h3>
              <p className="text-sm sm:text-base text-blue-700 mb-6">歡迎下載高畫質圖檔！</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a 
                  href={currentDownloadImg} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-base"
                >
                  <Download className="w-5 h-5" />
                  一般版圖檔
                </a>
                <a 
                  href={currentStoryImg} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-amber-500 text-white shadow-md hover:shadow-lg hover:bg-amber-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-base"
                >
                  <Download className="w-5 h-5" />
                  限動版 9:16 圖檔
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
