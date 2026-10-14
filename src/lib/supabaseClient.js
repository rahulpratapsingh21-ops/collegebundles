import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zsumncofdokdobsubmbp.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdW1uY29mZG9rZG9ic3VibWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5ODY4NjAsImV4cCI6MjEwNzU2Mjg2MH0.EFZHXg-daAfjsONdsh9kWYk3bxFs8x8nUHd-PEJcOYM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LOCAL_STORAGE_KEY = 'collegebundle_leads';

/**
 * Save student lead / inquiry to Supabase and sync with localStorage
 */
export async function saveLead(leadData) {
  const referenceId = leadData.reference_id || leadData.id || ('CB-' + Math.floor(100000 + Math.random() * 900000));
  
  const leadPayload = {
    reference_id: referenceId,
    full_name: leadData.fullName || leadData.full_name || '',
    mobile: leadData.mobile || leadData.phone || '',
    email: leadData.email || '',
    stream: leadData.stream || '',
    city: leadData.city || '',
    budget: leadData.budget || '',
    query: leadData.query || '',
    source: leadData.source || 'Website Lead Form',
    status: leadData.status || 'New / Pending Call',
  };

  let remoteSuccess = false;
  let supabaseRecord = null;
  let errorMessage = null;

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([leadPayload])
      .select()
      .single();

    if (error) {
      console.warn('Supabase lead insertion warning:', error.message);
      errorMessage = error.message;
    } else {
      remoteSuccess = true;
      supabaseRecord = data;
    }
  } catch (err) {
    console.error('Network / Supabase error saving lead:', err);
    errorMessage = err?.message || 'Network error';
  }

  // Also update LocalStorage cache so the user has immediate offline access
  try {
    const localLead = {
      id: referenceId,
      supabase_id: supabaseRecord ? supabaseRecord.id : null,
      fullName: leadPayload.full_name,
      mobile: leadPayload.mobile,
      email: leadPayload.email,
      stream: leadPayload.stream,
      city: leadPayload.city,
      budget: leadPayload.budget,
      query: leadPayload.query,
      source: leadPayload.source,
      status: leadPayload.status,
      date: new Date().toLocaleString(),
      syncedWithBackend: remoteSuccess,
    };

    const existingLeads = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    existingLeads.unshift(localLead);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingLeads));
  } catch (localErr) {
    console.error('LocalStorage write error:', localErr);
  }

  return {
    success: true,
    referenceId,
    remoteSuccess,
    data: supabaseRecord,
    error: errorMessage,
  };
}

/**
 * Fetch all leads from Supabase (with fallback to localStorage)
 */
export async function fetchLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      // Normalize to client schema
      const mappedLeads = data.map((item) => ({
        id: item.reference_id || item.id,
        supabase_id: item.id,
        fullName: item.full_name,
        mobile: item.mobile,
        email: item.email,
        stream: item.stream,
        city: item.city,
        budget: item.budget,
        query: item.query,
        source: item.source,
        status: item.status,
        date: new Date(item.created_at).toLocaleString(),
        syncedWithBackend: true,
      }));

      // Cache locally
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mappedLeads));
      } catch (e) {
        // ignore quota
      }

      return { leads: mappedLeads, source: 'supabase' };
    }
  } catch (err) {
    console.warn('Failed to load from Supabase, reading localStorage cache', err);
  }

  // Fallback to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    return { leads: stored, source: 'cache' };
  } catch (err) {
    return { leads: [], source: 'empty' };
  }
}

/**
 * Update lead status in Supabase and localStorage
 */
export async function updateLeadStatus(leadId, newStatus) {
  // Update in Supabase
  try {
    await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .or(`reference_id.eq.${leadId},id.eq.${leadId}`);
  } catch (err) {
    console.warn('Failed to update status in Supabase:', err);
  }

  // Update in localStorage
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = stored.map((l) => (l.id === leadId || l.supabase_id === leadId ? { ...l, status: newStatus } : l));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage update error:', err);
  }
}

/**
 * Delete lead from Supabase and localStorage
 */
export async function deleteLead(leadId) {
  // Delete from Supabase
  try {
    await supabase
      .from('leads')
      .delete()
      .or(`reference_id.eq.${leadId},id.eq.${leadId}`);
  } catch (err) {
    console.warn('Failed to delete from Supabase:', err);
  }

  // Delete from localStorage
  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const updated = stored.filter((l) => l.id !== leadId && l.supabase_id !== leadId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage delete error:', err);
  }
}

/**
 * Subscribe email to newsletter in Supabase
 */
export async function subscribeNewsletter(email, source = 'Website Footer') {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.trim().toLowerCase(), source }])
      .select()
      .single();

    if (error) {
      // 23505 is unique violation in Postgres
      if (error.code === '23505') {
        return { success: true, message: 'Already subscribed!' };
      }
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return { success: false, error: err?.message || 'Subscription failed' };
  }
}
