
export type OrderStatus = 
  | 'Pending_Inspection'    // فحص السلعة (المرحلة 1)
  | 'Payment_Completed'     // إتمام عملية الدفع (المرحلة 2)
  | 'Accepted'              // قبول السلعة
  | 'China_Warehouse'       // شحن السلعة للمخزن
  | 'China_Transit'         // مركز العبور الصين
  | 'En_Route'              // في الطريق لليبيا
  | 'Libya_Arrived'         // وصول السلعة لليبيا
  | 'Libya_Warehouse'       // مخزن ليبيا
  | 'Processing_LY'         // قيد المعالجة في ليبيا
  | 'Out_for_Delivery'      // مع المندوب
  | 'Delivered';            // تم التسليم (كن جاهزاً اليوم)

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
