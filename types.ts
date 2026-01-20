
export type OrderStatus = 
  | 'Pending_Inspection'    // 1. فحص السلعة
  | 'Payment_Completed'     // 2. إتمام عملية الدفع
  | 'Accepted'              // 3. قبول السلعة
  | 'China_Warehouse'       // 4. شحن السلعة للمخزن
  | 'China_Transit'         // 5. مركز العبور الصين
  | 'En_Route'              // 6. في الطريق لليبيا
  | 'Libya_Arrived'         // 7. وصول السلعة لليبيا
  | 'Libya_Warehouse'       // 8. مخزن ليبيا
  | 'Processing_LY'         // 9. قيد المعالجة في ليبيا
  | 'Out_for_Delivery'      // 10. مع المندوب
  | 'Delivered';            // 11. تم التسليم

export type PaymentMethod = 'Cash_China' | 'Credit_Card';

export interface Location {
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  weight: string;
  volume: string;
  paymentMethod: PaymentMethod;
  currentPhysicalLocation: string;
  status: OrderStatus;
  customerLocation?: Location;
  driverLocation?: Location;
  updatedAt: number;
}

export type AppView = 'landing' | 'admin' | 'user';
export type Language = 'ar' | 'en';
