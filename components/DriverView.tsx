
import React from 'react';

/**
 * DriverView - Retired/Restricted
 * تم تعطيل هذا المكون مؤقتاً لحل مشاكل بناء التطبيق وتوحيد الصلاحيات
 */
const DriverView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0-4 0Z"/><path d="M14 19.7c0 .17.05.32.14.46c.14.22.4.34.66.34c.14 0 .28-.04.4-.12c.7-.46 1.34-1.02 1.9-1.66c.1-.12.15-.27.15-.43c0-.16-.05-.31-.15-.42c-.56-.64-1.2-1.2-1.9-1.66a.79.79 0 0 0-.4-.12a.81.81 0 0 0-.66.34c-.09.14-.14.29-.14.46v2.81ZM10 19.7c0 .17-.05.32-.14.46c-.14.22-.4.34-.66.34c-.14 0-.28-.04-.4-.12c-.7-.46-1.34-1.02-1.9-1.66c-.1-.12-.15-.27-.15-.43c0-.16.05-.31.15-.42c.56-.64 1.2-1.2 1.9-1.66a.79.79 0 0 1 .4-.12a.81.81 0 0 1 .66.34c.09.14.14.29.14.46v2.81Z"/><path d="M22 13v-2c0-.88-.36-1.72-1-2.34l-2.61-2.52A3.33 3.33 0 0 0 16.06 5H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h.27a3.02 3.02 0 0 1 5.46 0h4.54a3.02 3.02 0 0 1 5.46 0H22Z"/></svg>
      </div>
      <h2 className="text-xl font-black text-slate-900 mb-2">الوصول مقيد</h2>
      <p className="text-slate-500 font-bold">هذا القسم خاص بالمناديب فقط وغير متاح حالياً.</p>
    </div>
  );
};

export default DriverView;
