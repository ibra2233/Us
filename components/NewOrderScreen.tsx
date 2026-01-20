
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
  
  const [isLargeVolume, setIsLargeVolume] = useState(false);
  const [isHeavyWeight, setIsHeavyWeight] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash_China');

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    productName: '',
    quantity: 1,
    volumeValue: '',
    weightValue: '',
  });

  const stages: { status: OrderStatus; label: string }[] = [
    { status: 'Pending_Inspection', label: isAr ? 'فحص السلعة' : 'Inspection' },
    { status: 'Payment_Completed', label: isAr ? 'إتمام عملية الدفع' : 'Payment Completed' },
    { status: 'Accepted', label: isAr ? 'قبول السلعة' : 'Accepted' },
    { status: 'China_Warehouse', label: isAr ? 'شحن السلعة إلى المخزن' : 'To CN Warehouse' },
    { status: 'China_Transit', label: isAr ? 'توجه السلعة لمركز العبور' : 'To Transit' },
    { status: 'En_Route', label: isAr ? 'في طريقها إلى ليبيا' : 'En Route to LY' },
    { status: 'Libya_Arrived', label: isAr ? 'وصول السلعة إلى ليبيا' : 'Arrived in LY' },
    { status: 'Libya_Warehouse', label: isAr ? 'وصول السلعة للمخزن بليبيا' : 'LY Warehouse' },
    { status: 'Processing_LY', label: isAr ? 'قيد المعالجة في ليبيا' : 'Processing LY' },
    { status: 'Out_for_Delivery', label: isAr ? 'في مكتب مندوب التوصيل' : 'With Agent' },
    { status: 'Delivered', label: isAr ? 'كن جاهزاً لتلقي سلعتك اليوم' : 'Ready Today' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const generatedCode = `LY-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderCode(generatedCode);

    try {
      const orderData: Order = {
        id: `ord-${Date.now()}`,
        orderCode: generatedCode,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerAddress: formData.customerAddress,
        productName: formData.productName,
        quantity: formData.quantity,
        totalPrice: 0,
        paymentMethod: paymentMethod,
        volume: isLargeVolume ? `${formData.volumeValue} m³` : (isAr ? 'أقل من 1 متر مكعب' : '< 1 m³'),
        weight: isHeavyWeight ? `${formData.weightValue} kg` : (isAr ? 'خفيف < 5كلغ' : 'Light < 5kg'),
        status: 'Pending_Inspection',
        currentPhysicalLocation: isAr ? 'المرحلة 1: فحص السلعة' : 'Stage 1: Inspection',
        updatedAt: Date.now()
      };
      await syncOrder(orderData);
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
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAr ? 'كود التتبع (اطبعه أو انسخه)' : 'Tracking Code (Print/Copy)'}</p>
            <h3 className="text-4xl font-black text-blue-600">{orderCode}</h3>
            <div className="flex gap-2 justify-center mt-4">
               <button onClick={() => navigator.clipboard.writeText(orderCode)} className="p-3 bg-white rounded-xl border shadow-sm text-slate-600 active:scale-90"><Copy className="w-5 h-5" /></button>
               <button onClick={() => window.print()} className="p-3 bg-white rounded-xl border shadow-sm text-slate-600 active:scale-90"><Printer className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="w-full bg-blue-50 p-4 rounded-2xl mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white"><Truck className="w-5 h-5" /></div>
            <div className="text-right flex-1">
              <p className="text-[10px] font-black text-blue-400 uppercase">{isAr ? 'المرحلة الحالية' : 'Current Stage'}</p>
              <p className="text-sm font-black text-blue-700">{isAr ? 'المرحلة 1: فحص السلعة' : 'Stage 1: Inspection'}</p>
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
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full rotate-180">
            <ArrowRight className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black">{isAr ? 'إنشاء طلب شحن' : 'New Shipment'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto pb-24">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isAr ? 'بيانات السلعة' : 'Product Info'}</h3>
          <div className="bg-white p-6 rounded-[2.5rem] border shadow-sm space-y-4">
            <input required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold" placeholder={isAr ? 'اسم السلعة' : 'Product Name'} value={formData.productName} onChange={e => setFormData({...formData, productName: e.target.value})} />
            
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border">
              <button type="button" onClick={() => setIsLargeVolume(false)} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${!isLargeVolume ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{isAr ? 'حجم صغير' : 'Small'}</button>
              <button type="button" onClick={() => setIsLargeVolume(true)} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${isLargeVolume ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{isAr ? 'حجم كبير' : 'Large'}</button>
            </div>
            {isLargeVolume && <input type="number" step="0.01" className="w-full p-4 bg-slate-50 border-2 border-blue-100 rounded-2xl outline-none font-black" placeholder={isAr ? 'الحجم بالمتر المكعب' : 'Size in CBM'} value={formData.volumeValue} onChange={e => setFormData({...formData, volumeValue: e.target.value})} />}

            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-2xl border">
              <button type="button" onClick={() => setIsHeavyWeight(false)} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${!isHeavyWeight ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{isAr ? 'خفيف < 5كلغ' : 'Light'}</button>
              <button type="button" onClick={() => setIsHeavyWeight(true)} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${isHeavyWeight ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>{isAr ? 'ثقيل > 5كلغ' : 'Heavy'}</button>
            </div>
            {isHeavyWeight && <input type="number" step="0.1" className="w-full p-4 bg-slate-50 border-2 border-blue-100 rounded-2xl outline-none font-black" placeholder={isAr ? 'الوزن بالكيلوغرام' : 'Weight in kg'} value={formData.weightValue} onChange={e => setFormData({...formData, weightValue: e.target.value})} />}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isAr ? 'طريقة الدفع' : 'Payment Method'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setPaymentMethod('Cash_China')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'Cash_China' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}>
              <Banknote className="w-8 h-8" />
              <span className="font-black text-[10px]">{isAr ? 'كاش في الصين' : 'Cash CN'}</span>
            </button>
            <button type="button" onClick={() => setPaymentMethod('Credit_Card')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'Credit_Card' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}>
              <CreditCard className="w-8 h-8" />
              <span className="font-black text-[10px]">{isAr ? 'بطاقة ائتمان' : 'Credit Card'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">{isAr ? 'بيانات المستلم' : 'Receiver Info'}</h3>
          <div className="bg-white p-6 rounded-[2.5rem] border shadow-sm space-y-4">
            <input required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold" placeholder={isAr ? 'اسم المستلم' : 'Name'} value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
            <input required type="tel" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} />
            <input required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 rounded-2xl outline-none font-bold" placeholder={isAr ? 'العنوان' : 'Address'} value={formData.customerAddress} onChange={e => setFormData({...formData, customerAddress: e.target.value})} />
          </div>
        </div>

        <button disabled={loading} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : <Truck className="w-6 h-6" />}
          {isAr ? 'إنشاء طلب الشحن' : 'Create Shipment'}
        </button>
      </form>
    </div>
  );
};

export default NewOrderScreen;
