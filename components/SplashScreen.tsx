
import React from 'react';
import { motion } from 'framer-motion';
import { Box, ChevronLeft, ChevronRight } from 'lucide-react';

// Fix: Cast motion components to any to resolve TypeScript errors where motion props are not recognized
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;

interface Props {
  lang: 'ar' | 'en';
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ lang, onFinish }) => {
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center text-white p-8 overflow-hidden">
      {/* Fix: Using casted MotionDiv component */}
      <MotionDiv 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-8"
      >
        <Box className="w-12 h-12 text-blue-600" />
      </MotionDiv>

      {/* Fix: Using casted MotionH1 component */}
      <MotionH1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-black text-center mb-4"
      >
        China ➜ Tripoli
        <span className="block text-blue-200 text-lg mt-1">Shipping Services</span>
      </MotionH1>

      {/* Fix: Using casted MotionP component */}
      <MotionP 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-blue-100/70 text-center font-bold mb-12 max-w-xs"
      >
        {isAr ? 'أفضل وأسرع وسيلة لشحن بضائعك من الصين إلى طرابلس' : 'The fastest way to ship your goods from China to Tripoli'}
      </MotionP>

      {/* Fix: Using casted MotionButton component */}
      <MotionButton
        whileTap={{ scale: 0.95 }}
        onClick={onFinish}
        className="bg-white text-blue-600 px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl flex items-center gap-3 group"
      >
        {isAr ? 'ابدأ الآن' : 'Get Started'}
        {isAr ? <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
      </MotionButton>

      {/* Background Decor */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default SplashScreen;
