
import React from 'react';
import { Package, Truck, ShieldCheck, Globe, ArrowLeft, ArrowRight, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix: Cast motion components to any to resolve TypeScript errors where motion props are not recognized correctly
const MotionDiv = motion.div as any;

interface Props {
  onStartTracking: () => void;
  lang: 'ar' | 'en';
}

const LandingPage: React.FC<Props> = ({ onStartTracking, lang }) => {
  const isAr = lang === 'ar';

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: isAr ? 'شحن سريع' : 'Fast Shipping',
      desc: isAr ? 'نضمن وصول شحناتك من الصين في وقت قياسي.' : 'We ensure your shipments arrive from China in record time.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: isAr ? 'تأمين كامل' : 'Full Insurance',
      desc: isAr ? 'بضائعك في أمان تام مع أنظمة الحماية المتطورة.' : 'Your goods are safe with our advanced protection systems.'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: isAr ? 'تغطية واسعة' : 'Wide Coverage',
      desc: isAr ? 'نشحن إلى كافة المدن الليبية من أكبر موانئ الصين.' : 'We ship to all Libyan cities from major Chinese ports.'
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
        
        {/* Fix: Using casted MotionDiv component */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-6 max-w-4xl"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-blue-100 text-blue-700 text-xs font-black mb-6 uppercase tracking-widest">
            {isAr ? 'الخيار الأول للشحن اللوجستي' : 'Top Choice for Logistics'}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
            {isAr ? (
              <>جسركم الموثوق بين <span className="text-blue-600">الصين وليبيا</span></>
            ) : (
              <>Your Trusted Bridge Between <span className="text-blue-600">China & Libya</span></>
            )}
          </h1>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            {isAr 
              ? 'نحن نوفر حلولاً لوجستية متكاملة، من الاستلام في مخازننا بالصين وحتى باب منزلك في ليبيا، مع نظام تتبع حي ومباشر.' 
              : 'Integrated logistics solutions from China warehouses to your doorstep in Libya, featuring real-time tracking.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartTracking}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95"
            >
              <Package className="w-6 h-6" />
              {isAr ? 'تتبع شحنتك الآن' : 'Track Your Package'}
              {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
            <button className="bg-white border-2 border-slate-100 hover:border-blue-200 text-slate-700 px-10 py-5 rounded-[2rem] font-black text-lg transition-all">
              {isAr ? 'خدماتنا' : 'Our Services'}
            </button>
          </div>
        </MotionDiv>

        {/* Floating Icons Background */}
        <div className="mt-20 relative w-full max-w-5xl px-6">
          <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl overflow-hidden relative aspect-video flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <Truck className="w-32 h-32 text-blue-500 opacity-50" />
             <div className="absolute bottom-8 right-8 bg-blue-600 p-6 rounded-3xl text-white shadow-xl animate-bounce">
                <MapPin className="w-8 h-8" />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{isAr ? 'لماذا تختار لوجي تراك؟' : 'Why Choose LogiTrack?'}</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              /* Fix: Using casted MotionDiv component */
              <MotionDiv 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="mb-6 p-4 bg-slate-50 w-fit rounded-2xl">{f.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 font-medium">{f.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-black mb-1">5000+</p>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{isAr ? 'زبون سعيد' : 'Happy Customers'}</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-1">12</p>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{isAr ? 'مكتب حول العالم' : 'Global Offices'}</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-1">24/7</p>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{isAr ? 'دعم فني' : 'Customer Support'}</p>
          </div>
          <div>
            <p className="text-4xl font-black mb-1">100%</p>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{isAr ? 'أمان وموثوقية' : 'Safe & Secure'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
