import { supabase } from '../../../lib/supabase';
import { requireAdmin, ok, err } from '../../../lib/authMiddleware';

export async function POST(request) {
  try {
    const { name, email, phone, date, time, topic } = await request.json();
    if (!name || !email || !date || !time) return err('Name, email, date and time are required');
    const { data, error } = await supabase
      .from('meetings')
      .insert([{ name, email, phone: phone||'', date, time, topic: topic||'', status: 'pending' }])
      .select().single();
    if (error) throw error;
    return ok({ message: 'Meeting booked successfully!', meeting: data }, 201);
  } catch (e) { return err(e.message, 400); }
}

export async function GET(request) {
  try {
    await requireAdmin(request);
    const { data, error } = await supabase
      .from('meetings').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return ok(data);
  } catch (e) {
    if (e instanceof Response) return e;
    return err(e.message, 500);
  }
}
