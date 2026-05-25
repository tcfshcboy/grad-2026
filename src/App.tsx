import { Hero } from './components/Hero';
import { BingoSection } from './components/BingoSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { CampusSection } from './components/CampusSection';
import { ConfessionSection } from './components/ConfessionSection';
import { Navigation, Footer } from './components/SharedLayout';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navigation />
      
      <main>
        <Hero />
        <BingoSection />
        
        <div className="max-w-5xl mx-auto space-y-24 py-24 px-4 sm:px-6">
          <BeforeAfterSection />
          <CampusSection />
          <ConfessionSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
