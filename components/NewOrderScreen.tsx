
import React, { useState } from 'react';
import { Package, MapPin, Truck, ArrowRight, Loader2, CheckCircle2, ShoppingBag, Weight, Ruler, MessageCircle, Copy, Printer, CreditCard, Banknote } from 'lucide-react';
import { syncOrder } from '../store';
import { Order, OrderStatus, PaymentMethod } from '../types';

interface Props {
  lang: 'ar' | 'en';
  onBack: () => void;
}

const NewOrderScreen: React.FC<Props> = ({ lang, onBack }) => {
  const isAr = lang === 'ar';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash_China');
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    productName: '',
    quantity: 1,
    weight: 'Light',
    volume: 'Small'
  });

  const stages: { status: OrderStatus; label: string }[] = [
    { status: 'Pending_Inspection', label: isAr ? '1. فحص السلعة' : '1. Inspection' },
    { status: 'Payment_Completed', label: isAr ? '2. إتمام عملية الدفع' : '2. Payment Completed' },
    { status: 'Accepted', label: isAr ? '3. قبول السلعة' : '3. Accepted' },
    { status: 'China_Warehouse', label: isAr ? '4. شحن للمخزن (الصين)' : '4. To Warehouse' },
    { status: 'China_Transit', label: isAr ? '5. مركز العبور (الصين)' : '5. Transit' },
    { status: 'En_Route', label: isAr ? '6. في الطريق لليبيا' : '6. En Route' },
    { status: 'Libya_Arrived', label: isAr ? '7. وصلت ليبيا' : '7. Arrived LY' },
    { status: 'Libya_Warehouse', label: isAr ? '8. مخزن ليبيا' : '8. LY Warehouse' },
    { status: 'Processing_LY', label: isAr ? '9. قيد المعالجة' : '9. Processing' },
    { status: 'Out_for_Delivery', label: isAr ? '10. مع المندوب' : '10. Out for Delivery' },
    { status: 'Delivered', label: isAr ? '11. تم التسليم' : '11. Delivered' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const code = `LY-${Math.floor(10000 + Math.random() * 90000)}`;
    
    try {
      const orderData: Order = {
        id: `ord-${Date.now()}`,
        orderCode: code,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        productName: formData.productName,
        quantity: formData.quantity,
        totalPrice: 0,
        paymentMethod: paymentMethod,
        weight: formData.weight,
        volume: formData.volume,
        status: 'Pending_Inspection',
        currentPhysicalLocation: isAr ? 'المكتب الرئيسي - بانتظار الفحص' : 'Main Office - Pending Inspection',
        updatedAt: Date.now()
      };
      await syncOrder(orderData);
      setOrderCode(code);
      setSuccess(true);
    } catch (err) {
      alert('Error saving order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        <div className="flex flex-col items-center text-center py-10">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">{isAr ? 'تم إنشاء الطلب بنجاح' : 'Order Created!'}</h2>
          
          <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 w-full mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAr ? 'كود التتبع' : 'Tracking Code'}</p>
            <h3 className="text-4xl font-black text-blue-600">{orderCode}</h3>
            <div className="flex gap-2 justify-center mt-4">
               <button onClick={() => navigator.clipboard.writeText(orderCode)} className="p-3 bg-white rounded-xl border shadow-sm text-slate-600 active:scale-90"><Copy className="w-5 h-5" /></button>
               <button onClick={() => window.print()} className="p-3 bg-white rounded-xl border shadow-sm text-slate-600 active:scale-90"><Printer className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="w-full space-y-3 px-2">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex items-center gap-4 text-right" dir={isAr ? 'rtl' : 'ltr'}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black shrink-0 ${idx === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
                  {idx + 1}
                </div>
                <div className={`flex-1 p-3 rounded-2xl border ${idx === 0 ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-slate-50/50 border-transparent opacity-40'}`}>
                  <p className={`text-sm font-black ${idx === 0 ? 'text-blue-700' : 'text-slate-400'}`}>{stage.label}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={onBack} className="mt-10 w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-xl">
            {isAr ? 'العودة للرئيسية' : 'Back Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 flex items-center justify-between bg-white border-b sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full rotate-180"><ArrowRight /></button>
        <h1 className="text-xl font-black">{isAr ? 'إنشاء طلب شحن' : 'New Shipment'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto pb-24">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase px-2">{isAr ? 'بيانات السلعة' : 'Product Info'}</h3>
          <div className="bg-white p-6 rounded-[2rem] border shadow-sm space-y-4">
            <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder={isAr ? 'اسم السلعة' : 'Product Name'} value={formData.productName} onChange={e => setFormData({...formData, productName: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-3">
               <button type="button" onClick={() => setPaymentMethod('Cash_China')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 ${paymentMethod === 'Cash_China' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}>
                 <Banknote /> <span className="text-[10px] font-black">{isAr ? 'كاش في الصين' : 'Cash CN'}</span>
               </button>
               <button type="button" onClick={() => setPaymentMethod('Credit_Card')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 ${paymentMethod === 'Credit_Card' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}>
                 <CreditCard /> <span className="text-[10px] font-black">{isAr ? 'بطاقة ائتمان' : 'Credit Card'}</span>
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase px-2">{isAr ? 'بيانات المستلم' : 'Receiver'}</h3>
          <div className="bg-white p-6 rounded-[2rem] border shadow-sm space-y-4">
            <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder={isAr ? 'الاسم' : 'Name'} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
            <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder={isAr ? 'الهاتف' : 'Phone'} value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} />
            <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder={isAr ? 'العنوان' : 'Address'} value={formData.customerAddress} onChange={e => setFormData({...formData, customerAddress: e.target.value})} />
          </div>
        </div>

        <button disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-xl active:scale-95 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : (isAr ? 'تأكيد وإنشاء الطلب' : 'Confirm Order')}
        </button>
      </form>
    </div>
  );
};

export default NewOrderScreen;
