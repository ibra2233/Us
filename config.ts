
/**
 * LogiTrack Configuration
 */

export const DB_CONFIG = {
  enabled: true,
  url: 'https://zdcngosnxowrycqtmvkt.supabase.co',
  publishableKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkY25nb3NueG93cnljcXRtdmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MDMzODYsImV4cCI6MjA4NDA3OTM4Nn0.rk7uRggTf_1qViBDrrYqooveENckIYZYkuL0DqEfeeo',
  secretKey: ''
};

// كلمة مرور الدخول للوحة الإدارة
export const ADMIN_PASSWORD = '123'; 

/**
 * اختر نوع التطبيق الذي تريد بناؤه الآن:
 * 'customer' -> تطبيق تتبع للزبائن فقط (واجهة واحدة مباشرة)
 * 'admin'    -> تطبيق لوحة تحكم للشركة فقط
 */
export const APP_TYPE: 'admin' | 'customer' = 'USER'; 
