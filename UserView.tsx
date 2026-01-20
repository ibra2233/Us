
import React, { useState, useEffect } from 'react';
import { Order, Language } from '../types';
// Fixed: fetchOrders is not exported, using fetchOrderByCode instead
import { fetchOrderByCode } from '../store';
import { Search, Loader2, Package, MapPin, ShoppingBag, CreditCard, User, Phone, Hash, Clock } from 'lucide-react';
import TrackingMap from './TrackingMap';

interface Props { lang: Language; }

const UserView: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [searchCode, setSearchCode] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchCode) return;
    setLoading(true);
    setError('');
    // Fixed: fetchOrderByCode is the correct method to find a single order by its code
    const order = await fetchOrderByCode(searchCode);
    if (order) setFoundOrder(order);
    else { 
      setFoundOrder(null); 
      setError(isAr ? 'عذراً، كود الشحنة غير موجود' : 'Shipment not found'); 
    }
    setLoading(false);
  };

  const statusLabels: Record<string, string> = {
    'China_Store': isAr ? 'بانتظار الشحن من المتجر' : 'Pending Shipment',
    'China_Warehouse': isAr ? 'وصلت مخزننا في الصين' : 'In China Warehouse',
    'En_Route': isAr ? 'في الشحن الدولي' : 'En Route',
    'Libya_Warehouse': isAr ? 'وصلت مخازننا في ليبيا' : 'In Libya Warehouse',
    'Out_for_Delivery': isAr ? 'خرجت مع المندوب للتوصيل' : 'Out for Delivery',
    'Delivered': isAr ? 'تم تسليم الشحنة بنجاح' : 'Delivered'
  };

  return (
    <div className="p-6 max-w-4xl mx-auto pb-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-2">{isAr ? 'تتبع شحنتك' : 'Track Package'}</h1>
        <p className="text-slate-500">{isAr ? 'أدخل كود التتبع الخاص بك لمعرفة كافة التفاصيل' : 'Enter your code to see all details'}</p>
      </div>

      <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border mb-8 flex flex-col md:flex-row gap-2">
        <input
          className="flex-1 px-8 py-5 bg-transparent outline-none text-2xl font-black"
          placeholder="LY-XXXX"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
        />
        <button onClick={handleSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-[2rem] font-black flex items-center justify-center gap-2 shadow-lg">
          {loading ? <Loader2 className="animate-spin" /> : (isAr ? 'تتبع الآن' : 'Track')}
        </button>
      </div>

      {error && <p className="text-red-500 text-center font-bold mb-6">{error}</p>}

      {foundOrder && (
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border shadow-xl p-8 space-y-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 left-0 h-2 bg-blue-600"></div>
            
             <div className="flex justify-between items-center border-b pb-6">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{isAr ? 'رقم التتبع' : 'Tracking ID'}</p>
                  <h2 className="text-3xl font-black text-blue-600">{foundOrder.orderCode}</h2>
                </div>
                <div className="text-left">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{isAr ? 'الحالة' : 'Status'}</p>
                  <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full font-bold text-sm">
                    {statusLabels[foundOrder.status]}
                  </span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* تفاصيل السلعة */}
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">{isAr ? 'ماذا يوجد في الطرد؟' : 'Package Contents'}</h4>
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-slate-800">{foundOrder.productName || (isAr ? 'غير محدد' : 'N/A')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-slate-800">{isAr ? `الكمية: ${foundOrder.quantity}` : `Qty: ${foundOrder.quantity}`}</span>
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold">{isAr ? 'المبلغ الإجمالي' : 'Total Price'}</p>
                        <p className="text-xl font-black text-emerald-600">{foundOrder.totalPrice} LYD</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* تفاصيل المستلم */}
                <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2">{isAr ? 'بيانات المستلم' : 'Receiver Info'}</h4>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-slate-800">{foundOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-slate-800">{foundOrder.customerPhone || '---'}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                    <span className="font-bold text-slate-800 text-sm leading-tight">{foundOrder.customerAddress || (isAr ? 'لم يحدد العنوان بعد' : 'No address')}</span>
                  </div>
                </div>
             </div>

             <div className="bg-blue-600 text-white p-6 rounded-3xl flex items-center gap-6">
                <div className="p-3 bg-white/20 rounded-xl"><Clock className="w-8 h-8" /></div>
                <div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{isAr ? 'الموقع الحالي' : 'Current Location'}</p>
                  <p className="text-xl font-black">{foundOrder.currentPhysicalLocation || statusLabels[foundOrder.status]}</p>
                </div>
             </div>

             {foundOrder.status === 'Out_for_Delivery' && (
               <div className="h-[300px] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                  <TrackingMap driverLoc={foundOrder.driverLocation} customerLoc={foundOrder.customerLocation} isSimulating={true} />
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
