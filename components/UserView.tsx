
import React, { useState } from 'react';
import { Order, Language, OrderStatus } from '../types';
import { fetchOrderByCode } from '../store';
import { Search, Loader2, ShoppingBag, Package, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props { lang: Language; }

const UserView: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [searchCode, setSearchCode] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusStages: OrderStatus[] = [
    'Pending_Inspection', 'Payment_Completed', 'Accepted', 'China_Warehouse', 'China_Transit', 'En_Route',
    'Libya_Arrived', 'Libya_Warehouse', 'Processing_LY', 'Out_for_Delivery', 'Delivered'
  ];

  const statusLabels: Record<OrderStatus, string> = {
    'Pending_Inspection': isAr ? 'فحص السلعة' : 'Inspection',
    'Payment_Completed': isAr ? 'إتمام عملية الدفع' : 'Payment Completed',
    'Accepted': isAr ? 'قبول السلعة' : 'Accepted',
    'China_Warehouse': isAr ? 'شحن السلعة إلى المخزن' : 'CN Warehouse',
    'China_Transit': isAr ? 'توجه السلعة لمركز العبور' : 'CN Transit',
    'En_Route': isAr ? 'السلعة في طريقها إلى ليبيا' : 'En Route to LY',
    'Libya_Arrived': isAr ? 'وصول السلعة إلى ليبيا' : 'Arrived in LY',
    'Libya_Warehouse': isAr ? 'وصول السلعة للمخزن بليبيا' : 'LY Warehouse',
    'Processing_LY': isAr ? 'قيد المعالجة في ليبيا' : 'Processing LY',
    'Out_for_Delivery': isAr ? 'في مكتب مندوب التوصيل' : 'With Agent',
    'Delivered': isAr ? 'كن جاهزاً لتلقي سلعتك اليوم' : 'Ready Today'
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) return;
    setLoading(true);
    setError('');
    const order = await fetchOrderByCode(searchCode.trim());
    if (order) setFoundOrder(order);
    else setError(isAr ? 'كود الشحنة غير موجود' : 'Shipment not found');
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-6 pb-24 space-y-6">
      <div className="bg-white p-2 rounded-[2rem] border shadow-xl flex flex-col gap-2">
        <input className="flex-1 px-8 py-4 bg-transparent outline-none text-xl font-black text-slate-900 placeholder:text-slate-300 uppercase" placeholder="LY-XXXX" value={searchCode} onChange={(e) => setSearchCode(e.target.value.toUpperCase())} />
        <button onClick={handleSearch} disabled={loading} className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 shadow-lg">
          {loading ? <Loader2 className="animate-spin" /> : <Search className="w-5 h-5" />}
          {isAr ? 'تتبع الآن' : 'Track'}
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 font-bold text-sm"><AlertCircle className="w-5 h-5" />{error}</div>}

      {foundOrder && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 border shadow-lg space-y-6">
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{isAr ? 'رقم التتبع' : 'ID'}</span>
                <h2 className="text-3xl font-black text-slate-900">{foundOrder.orderCode}</h2>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-[10px]">
                {statusLabels[foundOrder.status]}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-bold">
               <div className="bg-slate-50 p-3 rounded-2xl">
                 <p className="text-slate-400 text-[10px] mb-1 uppercase tracking-widest">{isAr ? 'السلعة' : 'Product'}</p>
                 <p className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-blue-600" />{foundOrder.productName}</p>
               </div>
               <div className="bg-slate-50 p-3 rounded-2xl">
                 <p className="text-slate-400 text-[10px] mb-1 uppercase tracking-widest">{isAr ? 'المقاييس' : 'Info'}</p>
                 <p className="flex items-center gap-2"><Package className="w-4 h-4 text-emerald-600" />{foundOrder.volume}</p>
               </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">{isAr ? 'خط سير الشحنة' : 'Journey'}</h3>
              <div className="space-y-3">
                {statusStages.map((stageStatus, idx) => {
                  const currentIdx = statusStages.indexOf(foundOrder.status);
                  const isCompleted = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  const isPending = idx > currentIdx;

                  return (
                    <div key={idx} className={`flex items-center gap-4 ${isPending ? 'opacity-20' : 'opacity-100'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
                        isCurrent ? 'bg-blue-600 border-blue-600 text-white animate-pulse' : 
                        'bg-white border-slate-200 text-slate-300'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                      </div>
                      <div className={`flex-1 p-3 rounded-2xl border ${isCurrent ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-transparent'}`}>
                        <p className={`text-xs font-black ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {statusLabels[stageStatus]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
