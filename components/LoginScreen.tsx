
import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ADMIN_PASSWORD } from '../config';

// Fix: Cast motion components to any to resolve TypeScript errors where motion props are not recognized
const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;

interface Props {
  lang: 'ar' | 'en';
  onLogin: (email: string) => void;
}

const LoginScreen: React.FC<Props> = ({ lang, onLogin }) => {
  const isAr = lang === 'ar';
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // محاكاة عملية برمجية (تسجيل دخول أو إنشاء حساب)
    setTimeout(() => {
      if (isRegistering) {
        // في حالة التسجيل، نقوم بتسجيل المستخدم مباشرة هنا للمحاكاة
        onLogin(email);
      } else {
        // في حالة تسجيل الدخول، نتحقق من كلمة المرور
        if (password === ADMIN_PASSWORD || password === 'user123') {
          onLogin(email);
        } else {
          setError(isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
          setLoading(false);
        }
      }
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
      <MotionDiv 
        layout
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-blue-100 p-8 md:p-10 border border-slate-100 relative overflow-hidden"
      >
        <div className="text-center mb-8 relative z-10">
          <MotionH2 
            key={isRegistering ? 'reg' : 'log'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-slate-900 mb-2"
          >
            {isRegistering 
              ? (isAr ? 'إنشاء حساب جديد' : 'Create Account') 
              : (isAr ? 'مرحباً بك' : 'Welcome Back')}
          </MotionH2>
          <p className="text-slate-400 font-bold">
            {isRegistering 
              ? (isAr ? 'أدخل بياناتك للانضمام إلينا' : 'Sign in to continue')
              : (isAr ? 'قم بتسجيل الدخول للمتابعة' : 'Sign in to continue')}
          </p>
        </div>

        {error && (
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
          >
            <AlertCircle className="w-5 h-5" />
            {error}
          </MotionDiv>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">
              {isAr ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full px-14 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-[1.2rem] outline-none font-bold transition-all"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-2">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input
                type="password"
                required
                className="w-full px-14 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-[1.2rem] outline-none font-bold transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : null}
            {isRegistering 
              ? (isAr ? 'تسجيل الآن' : 'Register Now') 
              : (isAr ? 'دخول' : 'Sign In')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-400 font-bold text-sm">
            {isRegistering 
              ? (isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?')
              : (isAr ? 'ليس لديك حساب؟' : "Don't have an account?")}
          </p>
          <button 
            onClick={() => {
               setError('');
               setIsRegistering(!isRegistering);
            }}
            className="text-blue-600 font-black mt-2 hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            {isRegistering ? (isAr ? 'تسجيل الدخول' : 'Sign In') : (isAr ? 'سجل حساب جديد' : 'Register')}
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Decor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>
      </MotionDiv>
    </div>
  );
};

export default LoginScreen;
