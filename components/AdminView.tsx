
import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, Language, PaymentMethod } from '../types';
import { fetchOrders, syncOrder, deleteOrder } from '../store';
import { Search, Plus, Edit2, Trash2, X, Loader2, Save, RefreshCw, Package, Banknote, CreditCard } from 'lucide-react';

interface Props { lang: Language; }

const AdminView: React.FC<Props> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState<Partial<Order> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const statusLabels: Record<OrderStatus, string> = {
    'Pending_Inspection': isAr ? 'فحص السلعة' : 'Inspection',
    'Payment_Completed': isAr ? 'إتمام عملية الدفع' : 'Payment Completed',
    'Accepted': isAr ? 'قبول السلعة' : 'Accepted',
    'China_Warehouse': isAr ? 'مخزن الصين' : 'CN Warehouse',
    'China_Transit': isAr ? 'مركز العبور' : 'Transit CN',
    'En_Route': isAr ? 'في الطريق' : 'In Transit',
    'Libya_Arrived': isAr ? 'وصلت ليبيا' : 'LY Arrived',
    'Libya_Warehouse': isAr ? 'مخزن ليبيا' : 'LY Warehouse',
    'Processing_LY': isAr ? 'معالجة بليبيا' : 'Processing LY',
    'Out_for_Delivery': isAr ? 'مع المندوب' : 'Out for Delivery',
    'Delivered': isAr ? 'تم التسليم' : 'Delivered'
  };

  const loadData = async () => {
    setLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async () => {
    if (!editingOrder) return;
    setIsProcessing(true);
    await syncOrder(editingOrder as Order);
    setEditingOrder(null);
    loadData();
    setIsProcessing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-slate-900">{isAr ? 'لوحة تحكم الإدارة' : 'Admin Panel'}</h1>
        <button onClick={loadData} className="p-3 bg-white border rounded-xl shadow-sm"><RefreshCw className={loading ? 'animate-spin' : ''} /></button>
      </div>

      <div className="bg-white rounded-[2.5rem] border shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
            <input className="w-full pr-12 pl-4 py-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder={isAr ? 'ابحث بالكود أو اسم الزبون...' : 'Search...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir={isAr ? 'rtl' : 'ltr'}>
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">الكود</th>
                <th className="px-6 py-4">الزبون</th>
                <th className="px-6 py-4">الدفع</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y font-bold">
              {orders.filter(o => o.orderCode.includes(searchTerm) || o.customerName.includes(searchTerm)).map(order => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-blue-600 font-black font-mono">{order.orderCode}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4 text-[10px]">
                    <span className="flex items-center gap-1">
                      {order.paymentMethod === 'Cash_China' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                      {order.paymentMethod === 'Cash_China' ? (isAr ? 'كاش' : 'Cash') : (isAr ? 'بطاقة' : 'Card')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${order.status === 'Payment_Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setEditingOrder(order)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingOrder && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-8 shadow-2xl">
            <h2 className="text-xl font-black mb-6">{isAr ? 'تحديث حالة الشحنة' : 'Update Shipment'}</h2>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 block uppercase">اختر المرحلة اللوجستية</label>
              <select 
                className="w-full p-4 bg-slate-900 text-white rounded-2xl outline-none font-black"
                value={editingOrder.status}
                onChange={e => setEditingOrder({...editingOrder, status: e.target.value as OrderStatus})}
              >
                {Object.entries(statusLabels).map(([key, val]) => (
                  <option key={key} value={key}>{val}</option>
                ))}
              </select>
              <button onClick={handleSave} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black mt-6 flex justify-center items-center gap-2">
                {isProcessing ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                {isAr ? 'حفظ التغييرات' : 'Save Changes'}
              </button>
              <button onClick={() => setEditingOrder(null)} className="w-full py-3 text-slate-400 font-bold">{isAr ? 'إلغاء' : 'Cancel'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
