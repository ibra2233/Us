
import React from 'react';
import { PlusCircle, Search, Package, MapPin, Truck, History } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix: Cast motion components to any to resolve TypeScript errors where motion props are not recognized
const MotionButton = motion.button as any;

interface Props {
  lang: 'ar' | 'en';
  onNavigate: (screen: 'new-order' | 'track') => void;
}

const HomeScreen: React.FC<Props> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';

  const actions = [
    {
      id: 'new-order',
      title: isAr ? 'طلب شحن جديد' : 'New Shipment',
      desc: isAr ? 'إرسال طرد من الصين' : 'Send from China',
      icon: <PlusCircle className="w-8 h-8" />,
      color: 'bg-blue-600',
      shadow: 'shadow-blue-200'
    },
    {
      id: 'track',
      title: isAr ? 'تتبع شحنة' : 'Track Order',
      desc: isAr ? 'تتبع حالة شحنتك' : 'Live tracking',
      icon: <Search className="w-8 h-8" />,
      color: 'bg-emerald-600',
      shadow: 'shadow-emerald-200'
    }
  ];

  return (
    <div className="flex-1 p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">{isAr ? 'لوحة التحكم' : 'Dashboard'}</h2>
          <h1 className="text-3xl font-black mb-4">{isAr ? 'أهلاً بك في لوجي تراك' : 'Welcome to LogiTrack'}</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
            {isAr ? 'قم بإدارة شحناتك بين الصين وطرابلس بكل سهولة وأمان.' : 'Manage your shipments between China & Tripoli with ease.'}
          </p>
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full -ml-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 p-8 opacity-20">
          <Truck className="w-24 h-24 rotate-12" />
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          /* Fix: Using casted MotionButton component */
          <MotionButton
            key={action.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate(action.id as any)}
            className={`${action.color} p-8 rounded-[2.5rem] text-white shadow-2xl ${action.shadow} flex flex-col items-start text-right relative overflow-hidden group`}
          >
            <div className="bg-white/20 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <h3 className="text-2xl font-black mb-1">{action.title}</h3>
            <p className="text-white/70 font-bold text-sm">{action.desc}</p>
            <div className="absolute -bottom-4 -left-4 opacity-10 group-hover:opacity-20 transition-opacity">
               {action.icon}
            </div>
          </MotionButton>
        ))}
      </div>

      {/* Quick Stats / Info */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <History className="text-blue-600" />
          <h4 className="font-black text-slate-800">{isAr ? 'آخر النشاطات' : 'Recent Activity'}</h4>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Package className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Status Update</p>
              <p className="text-sm font-bold text-slate-800">Shipment LY-2024 Arrived in Tripoli</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
