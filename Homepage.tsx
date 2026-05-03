// s./Homepage.tsx
import { useState } from 'react';
import { Shield, MapPin, AlertTriangle, Users, Sparkles, Activity, Star, Zap, Heart } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";
import { AIService } from "./AIService";

export function Homepage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [accommodationAddress, setAccommodationAddress] = useState("");
  const [isAIToolLoading, setIsAIToolLoading] = useState(false);
  const [aiItinerary, setAiItinerary] = useState("");

  const handleGenerateItinerary = async () => {
    if (!accommodationAddress) {
      alert(t('Please enter an accommodation address first!'));
      return;
    }

    setIsAIToolLoading(true);
    try {
      const result = await AIService.generateItinerary({
        nationality: "International Visitor",
        visitDuration: "3 Days",
        accommodationAddress: accommodationAddress,
        interests: "sightseeing, culture, food, and safe exploration"
      });
      setAiItinerary(result);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      alert(t('Failed to generate itinerary. Please try again later.'));
    } finally {
      setIsAIToolLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative bg-dark-900 text-white overflow-hidden py-32 shadow-2xl">
        {/* Fun Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90 z-0"></div>
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-float">🌍</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-30 animate-float-delayed">📸</div>
        <div className="absolute top-40 right-40 text-5xl opacity-30 animate-spin-slow">✈️</div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-bounce-slight hover:animate-none hover:scale-110 transition-transform cursor-default">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">Super Safe Travel Vibes ✨</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 drop-shadow-sm">
            {t("Smart Tourist Safety System")}
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
            {t("AI-powered safety monitoring, geo-fencing alerts, and blockchain-based digital identity for a secure travel experience.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => navigate("/register-tourist")}
              className="px-10 py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-2 hover:shadow-[0_10px_40px_rgba(244,63,94,0.5)] flex items-center gap-3 animate-wobble hover:animate-none"
            >
              <Users className="h-6 w-6" />
              {t("Register as Tourist")} 🎒
            </button>
            <button 
              onClick={() => navigate("/police-dashboard")}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:-rotate-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)] flex items-center gap-3"
            >
              <Shield className="h-6 w-6" />
              {t("Open Command Center")} 🚨
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-20 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-4 border-indigo-100 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] hover:border-indigo-300 group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-indigo-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-inner">
              <Shield className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="font-extrabold text-2xl mb-3 text-slate-800 flex items-center gap-2">{t("Blockchain Security")} 🔒</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t("Tamper-proof digital tourist IDs ensure secure identity verification.")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-4 border-emerald-100 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:border-emerald-300 group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-emerald-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300 shadow-inner">
              <MapPin className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-2xl mb-3 text-slate-800 flex items-center gap-2">{t("Geo-Fencing Alerts")} 🗺️</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t("Real-time location tracking with safety notifications and risk alerts.")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border-4 border-rose-100 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(244,63,94,0.2)] hover:border-rose-300 group animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-rose-100 p-5 rounded-2xl inline-block mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-inner">
              <Activity className="h-10 w-10 text-rose-600" />
            </div>
            <h3 className="font-extrabold text-2xl mb-3 text-slate-800 flex items-center gap-2">{t("Emergency Response")} 🚑</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {t("AI-powered incident detection with instant panic button alerts.")}
            </p>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="bg-gradient-to-b from-white to-slate-100 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-6 drop-shadow-sm">
            {t("Get Started!")} 🎉
          </h2>
          <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto font-medium">
            {t("Choose your role to access the platform. Each dashboard is tailored to provide the specific tools and insights needed for your safety and management.")}
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Tourist */}
            <div
              className="group bg-white p-10 rounded-[2.5rem] border-4 border-sky-100 shadow-xl hover:shadow-[0_30px_60px_rgba(14,165,233,0.3)] hover:border-sky-400 transition-all duration-500 cursor-pointer transform hover:-translate-y-4 relative overflow-hidden"
              onClick={() => navigate("/register-tourist")}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-200 rounded-full opacity-50 group-hover:scale-[2.5] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="bg-sky-50 inline-block p-6 rounded-3xl mb-6 shadow-sm group-hover:animate-bounce-slight">
                  <Heart className="h-16 w-16 text-sky-500" />
                </div>
                <h3 className="font-extrabold text-3xl mb-4 text-slate-800">{t("Tourist")} 🌴</h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                  {t("Register and get your Digital ID for safety monitoring.")}
                </p>
                <button className="w-full px-6 py-4 bg-sky-50 border-2 border-sky-200 text-sky-600 font-bold text-lg rounded-2xl group-hover:bg-sky-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm flex justify-center items-center gap-2">
                  {t("Register as Tourist")} <Zap className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Police/Admin */}
            <div
              className="group bg-white p-10 rounded-[2.5rem] border-4 border-amber-100 shadow-xl hover:shadow-[0_30px_60px_rgba(245,158,11,0.3)] hover:border-amber-400 transition-all duration-500 cursor-pointer transform hover:-translate-y-4 relative overflow-hidden"
              onClick={() => navigate("/police-dashboard")}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-200 rounded-full opacity-50 group-hover:scale-[2.5] transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="bg-amber-50 inline-block p-6 rounded-3xl mb-6 shadow-sm group-hover:animate-bounce-slight">
                  <Star className="h-16 w-16 text-amber-500" />
                </div>
                <h3 className="font-extrabold text-3xl mb-4 text-slate-800">{t("Police / Admin")} 🚔</h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                  {t("Access real-time dashboards and manage safety incidents.")}
                </p>
                <button className="w-full px-6 py-4 bg-amber-50 border-2 border-amber-200 text-amber-600 font-bold text-lg rounded-2xl group-hover:bg-amber-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm flex justify-center items-center gap-2">
                  {t("Open Command Center")} <Shield className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick AI Itinerary Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="bg-purple-100 inline-block p-5 rounded-[2rem] mb-6 shadow-sm transform hover:scale-110 hover:rotate-12 transition-transform duration-300">
            <Sparkles className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 drop-shadow-sm">
            {t("Quick Magic Itinerary")} ✨
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            {t("Just enter your accommodation address below and let our AI generate a perfectly safe, fun, and personalized day trip for you!")}
          </p>

          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-purple-100 shadow-[0_20px_60px_rgba(168,85,247,0.15)] animate-fade-in relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={accommodationAddress}
                onChange={(e) => setAccommodationAddress(e.target.value)}
                placeholder={t("e.g. Taj Mahal Palace, Mumbai...")}
                className="flex-1 bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 block p-5 transition-all duration-300 hover:border-purple-300"
              />
              <button
                onClick={handleGenerateItinerary}
                disabled={isAIToolLoading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl px-8 py-5 rounded-2xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 shadow-[0_10px_30px_rgba(217,70,239,0.4)] transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-w-[200px]"
              >
                {isAIToolLoading ? (
                  <Sparkles className="h-6 w-6 animate-spin" />
                ) : (
                  t("Generate Now")
                )}
              </button>
            </div>

            {aiItinerary && (
              <div className="mt-8 text-left bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 animate-slide-up">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  {t("Your Magical Itinerary")}
                </h3>
                <div className="prose prose-purple max-w-none text-slate-700 whitespace-pre-wrap font-medium">
                  {aiItinerary}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-slate-400 py-12 mt-auto border-t-8 border-indigo-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium">
            Made with <span className="animate-pulse inline-block text-rose-500">❤️</span> for secure travel. <br className="md:hidden" />
            © {new Date().getFullYear()} <span className="text-white font-bold tracking-wide">{t("Smart Tourist Safety System")}</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
