import { supabase } from '../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../lib/authMiddleware';

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    if (!name || !email || !message) return err('Name, email and message are required');
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ name, email, phone: phone||'', subject: subject||'', message, status: 'new' }])
      .select().single();
    if (error) throw error;
    return ok({ message: 'Inquiry submitted successfully!', inquiry: data }, 201);
  } catch (e) { return err(e.message, 400); }
}

export async function GET(request) {
  try {
    await requireAdmin(request);
    const { data, error } = await supabase
      .from('inquiries').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 500);
  }
}
