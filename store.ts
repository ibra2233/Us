
import { Order, OrderStatus, PaymentMethod } from './types';
import { DB_CONFIG } from './config';

// Added weight and volume mapping to ensure complete Order object structure
const mapToDb = (order: Partial<Order>) => ({
  order_code: order.orderCode || '',
  customer_name: order.customerName || '',
  customer_phone: order.customerPhone || '',
  customer_address: order.customerAddress || '',
  product_name: order.productName || '',
  quantity: order.quantity || 1,
  total_price: order.totalPrice || 0,
  weight: order.weight || '',
  volume: order.volume || '',
  payment_method: order.paymentMethod || 'Cash_China',
  status: order.status || 'Pending_Inspection',
  current_location: order.currentPhysicalLocation || '',
  updated_at: order.updatedAt ? new Date(order.updatedAt).toISOString() : new Date().toISOString()
});

// Added weight and volume properties to mapFromDb to fix missing property errors in Order type
const mapFromDb = (dbOrder: any): Order => ({
  id: dbOrder.id,
  orderCode: dbOrder.order_code || 'N/A',
  customerName: dbOrder.customer_name || 'No Name',
  customerPhone: dbOrder.customer_phone || '',
  customerAddress: dbOrder.customer_address || '',
  productName: dbOrder.product_name || '',
  quantity: Number(dbOrder.quantity) || 1,
  totalPrice: Number(dbOrder.total_price) || 0,
  weight: dbOrder.weight || '',
  volume: dbOrder.volume || '',
  paymentMethod: (dbOrder.payment_method as PaymentMethod) || 'Cash_China',
  status: (dbOrder.status as OrderStatus) || 'Pending_Inspection',
  currentPhysicalLocation: dbOrder.current_location || '',
  updatedAt: dbOrder.updated_at ? new Date(dbOrder.updated_at).getTime() : Date.now()
});

const supabaseRequest = async (table: string, method: string = 'GET', body: any = null, query: string = '') => {
  if (!DB_CONFIG.url || !DB_CONFIG.publishableKey) return null;
  const headers = {
    'apikey': DB_CONFIG.publishableKey,
    'Authorization': `Bearer ${DB_CONFIG.publishableKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
  const url = `${DB_CONFIG.url}/rest/v1/${table}${query ? `?${query}` : ''}`;
  try {
    const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    return response.ok ? await response.json() : null;
  } catch { return null; }
};

export const fetchOrders = async (): Promise<Order[]> => {
  const data = await supabaseRequest('orders', 'GET', null, 'order=updated_at.desc');
  return data ? data.map(mapFromDb) : [];
};

export const fetchOrderByCode = async (code: string): Promise<Order | null> => {
  const data = await supabaseRequest('orders', 'GET', null, `order_code=eq.${code.toUpperCase()}`);
  return data && data.length > 0 ? mapFromDb(data[0]) : null;
};

export const syncOrder = async (order: Order): Promise<Order | null> => {
  const dbData = mapToDb(order);
  const existing = await supabaseRequest('orders', 'GET', null, `order_code=eq.${order.orderCode}`);
  if (existing && existing.length > 0) {
    const result = await supabaseRequest('orders', 'PATCH', dbData, `id=eq.${existing[0].id}`);
    return result ? mapFromDb(result[0]) : null;
  } else {
    const result = await supabaseRequest('orders', 'POST', dbData);
    return result ? mapFromDb(result[0]) : null;
  }
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const data = await supabaseRequest('orders', 'DELETE', null, `id=eq.${id}`);
  return data !== null;
};
