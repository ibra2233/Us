
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import NewOrderScreen from './components/NewOrderScreen';
import UserView from './components/UserView';
import { Globe, LogOut, ChevronRight } from 'lucide-react';

type Screen = 'splash' | 'login' | 'home' | 'new-order' | 'track';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  // نظام التاريخ للتنقل
  const [history, setHistory] = useState<Screen[]>(['splash']);
  const [user, setUser] = useState<{email: string} | null>(null);

  const currentScreen = history[history.length - 1];
  const isAr = lang === 'ar';

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang');
    if (savedLang) setLang(savedLang as Language);
    
    const savedUser = sessionStorage.getItem('user_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // دالة التنقل للأمام
  const navigateTo = (screen: Screen) => {
    setHistory(prev => [...prev, screen]);
  };

  // دالة العودة للوراء (هذا ما طلبه المستخدم)
  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleLogin = (email: string) => {
    const userData = { email };
    setUser(userData);
    sessionStorage.setItem('user_session', JSON.stringify(userData));
    // عند تسجيل الدخول، نجعل "home" هي القاعدة ونحذف سجل Login/Splash
    setHistory(['home']);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user_session');
    setHistory(['login']);
  };

  const toggleLang = () => {
    const nl = lang === 'ar' ? 'en' : 'ar';
    setLang(nl);
    localStorage.setItem('app_lang', nl);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen lang={lang} onFinish={() => navigateTo(user ? 'home' : 'login')} />;
      case 'login':
        return <LoginScreen lang={lang} onLogin={handleLogin} />;
      case 'home':
        return <HomeScreen lang={lang} onNavigate={navigateTo} />;
      case 'new-order':
        return <NewOrderScreen lang={lang} onBack={goBack} />;
      case 'track':
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-[1001]">
              <button onClick={goBack} className="p-2 hover:bg-slate-100 rounded-full transition-transform active:scale-90">
                <ChevronRight className={`w-6 h-6 ${isAr ? '' : 'rotate-180'}`} />
              </button>
              <h1 className="text-xl font-black">{isAr ? 'تتبع شحنتك' : 'Track Package'}</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <UserView lang={lang} />
            </div>
          </div>
        );
      default:
        return <SplashScreen lang={lang} onFinish={() => setHistory(['login'])} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* الـ Header يظهر فقط في الشاشات الرئيسية (Home وما بعدها) */}
      {['home', 'new-order', 'track'].includes(currentScreen) && (
        <header className="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center sticky top-0 z-[1000]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">LT</div>
            <span className="font-black text-lg text-slate-900 tracking-tight">LogiTrack</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors" title={isAr ? 'تغيير اللغة' : 'Change Language'}>
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title={isAr ? 'خروج' : 'Logout'}>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col relative">
        {renderScreen()}
      </main>

      {/* Footer بسيط للشاشات غير الترحيبية */}
      {['home', 'track'].includes(currentScreen) && (
        <footer className="py-4 text-center text-slate-400 text-[9px] font-bold uppercase tracking-widest border-t bg-white">
          China ➜ Tripoli Shipping Network
        </footer>
      )}
    </div>
  );
};

export default App;
