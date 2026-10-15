import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://bkazbkmhdfpwyjvcrrss.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrYXpia21oZGZwd3lqdmNycnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNzEzNjUsImV4cCI6MjEwNzY0NzM2NX0.6uhvUjCPisRRJH32Z2I7DpL2MRnXkZHhbu5bZ0Eqy4g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LEADS_STORAGE_KEY = 'absdigital_leads';
const ADMIN_SESSION_KEY = 'absdigital_admin_session';
const LOCAL_ADMIN_BACKUP = 'absdigital_admin_account_backup';

/* =========================================================================
   CRYPTOGRAPHY HELPERS FOR ADMIN PASSWORDS (Web Crypto API)
   ========================================================================= */

async function hashPasswordWithSalt(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '::abs_salt::' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomSalt() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

/* =========================================================================
   LEADS MANAGEMENT (Save, Fetch, Update, Delete)
   ========================================================================= */

/**
 * Save customer inquiry / lead to Supabase and sync with localStorage
 */
export async function saveLead(leadData) {
  const referenceId = leadData.reference_id || leadData.id || ('ABS-' + Math.floor(100000 + Math.random() * 900000));
  
  const leadPayload = {
    reference_id: referenceId,
    full_name: leadData.fullName || leadData.full_name || '',
    mobile: leadData.mobile || leadData.phone || '',
    email: leadData.email || '',
    service: leadData.service || leadData.stream || 'Digital Accessibility Solutions',
    stream: leadData.service || leadData.stream || 'Digital Accessibility Solutions',
    city: leadData.city || 'Noida / NCR',
    budget: leadData.budget || 'Flexible',
    query: leadData.query || leadData.message || '',
    source: leadData.source || 'Website Lead Form',
    status: leadData.status || 'New / Pending Review',
    notes: leadData.notes || '',
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

  // Update localStorage cache so admin always has instant access
  try {
    const localLead = {
      id: referenceId,
      supabase_id: supabaseRecord ? supabaseRecord.id : null,
      fullName: leadPayload.full_name,
      mobile: leadPayload.mobile,
      email: leadPayload.email,
      service: leadPayload.service,
      stream: leadPayload.stream,
      city: leadPayload.city,
      budget: leadPayload.budget,
      query: leadPayload.query,
      source: leadPayload.source,
      status: leadPayload.status,
      notes: leadPayload.notes,
      date: new Date().toLocaleString(),
      created_at: new Date().toISOString(),
      syncedWithBackend: remoteSuccess,
    };

    const existingLeads = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    existingLeads.unshift(localLead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existingLeads));
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
      const mappedLeads = data.map((item) => ({
        id: item.reference_id || item.id,
        supabase_id: item.id,
        fullName: item.full_name,
        mobile: item.mobile,
        email: item.email,
        service: item.service || item.stream || 'General Inquiry',
        stream: item.stream,
        city: item.city,
        budget: item.budget,
        query: item.query,
        source: item.source,
        status: item.status || 'New / Pending Review',
        notes: item.notes || '',
        date: new Date(item.created_at).toLocaleString(),
        created_at: item.created_at,
        syncedWithBackend: true,
      }));

      // Cache locally
      try {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(mappedLeads));
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
    const stored = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    return { leads: stored, source: 'cache' };
  } catch (err) {
    return { leads: [], source: 'empty' };
  }
}

/**
 * Update lead status and internal notes
 */
export async function updateLeadStatus(leadId, newStatus, newNotes = null) {
  const updatePayload = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };
  if (newNotes !== null) {
    updatePayload.notes = newNotes;
  }

  // Update in Supabase
  try {
    await supabase
      .from('leads')
      .update(updatePayload)
      .or(`reference_id.eq.${leadId},id.eq.${leadId}`);
  } catch (err) {
    console.warn('Failed to update status in Supabase:', err);
  }

  // Update in localStorage
  try {
    const stored = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    const updated = stored.map((l) => {
      if (l.id === leadId || l.supabase_id === leadId) {
        return {
          ...l,
          status: newStatus,
          notes: newNotes !== null ? newNotes : l.notes,
        };
      }
      return l;
    });
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage update error:', err);
  }
}

/**
 * Delete lead from Supabase and localStorage
 */
export async function deleteLead(leadId) {
  try {
    await supabase
      .from('leads')
      .delete()
      .or(`reference_id.eq.${leadId},id.eq.${leadId}`);
  } catch (err) {
    console.warn('Failed to delete from Supabase:', err);
  }

  try {
    const stored = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
    const updated = stored.filter((l) => l.id !== leadId && l.supabase_id !== leadId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage delete error:', err);
  }
}

/* =========================================================================
   ADMIN ONE-TIME REGISTRATION & SECURE AUTHENTICATION
   ========================================================================= */

/**
 * Check if an admin account already exists in the system.
 * Returns { hasAdmin: boolean }
 */
export async function checkAdminExists() {
  try {
    const { count, error } = await supabase
      .from('admin_accounts')
      .select('*', { count: 'exact', head: true });

    if (!error && typeof count === 'number') {
      const exists = count > 0;
      if (exists) {
        localStorage.setItem('absdigital_admin_registered', 'true');
      }
      return { hasAdmin: exists };
    }
  } catch (err) {
    console.warn('Supabase checkAdminExists warning, checking fallback:', err);
  }

  // Fallback to local storage
  const localRegistered = localStorage.getItem('absdigital_admin_registered') === 'true';
  const localBackup = localStorage.getItem(LOCAL_ADMIN_BACKUP);
  return { hasAdmin: localRegistered || !!localBackup };
}

/**
 * Initial One-Time Admin Registration.
 * Strictly blocked if an admin already exists.
 */
export async function registerInitialAdmin({ username, email, password, fullName }) {
  // Pre-check if an admin already exists
  const status = await checkAdminExists();
  if (status.hasAdmin) {
    return {
      success: false,
      error: 'Admin account has already been registered. Further registrations are permanently closed.',
    };
  }

  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = email.trim().toLowerCase();
  const salt = generateRandomSalt();
  const passwordHash = await hashPasswordWithSalt(password, salt);

  const payload = {
    username: cleanUsername,
    email: cleanEmail,
    password_hash: passwordHash,
    salt,
    full_name: fullName.trim() || 'ABS Digital Admin',
    role: 'superadmin',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  };

  let remoteSuccess = false;
  let supabaseUser = null;
  let errorMessage = null;

  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .insert([payload])
      .select('id, username, email, full_name, role, created_at')
      .single();

    if (error) {
      console.error('Supabase admin registration error:', error);
      errorMessage = error.message;
    } else {
      remoteSuccess = true;
      supabaseUser = data;
    }
  } catch (err) {
    console.error('Admin registration network exception:', err);
    errorMessage = err?.message || 'Database error during registration';
  }

  if (remoteSuccess && supabaseUser) {
    // Mark admin as registered
    localStorage.setItem('absdigital_admin_registered', 'true');
    // Store backup for resilience
    localStorage.setItem(LOCAL_ADMIN_BACKUP, JSON.stringify({
      username: cleanUsername,
      email: cleanEmail,
      password_hash: passwordHash,
      salt,
      full_name: payload.full_name,
    }));

    const sessionData = {
      id: supabaseUser.id,
      username: supabaseUser.username,
      email: supabaseUser.email,
      fullName: supabaseUser.full_name,
      role: supabaseUser.role,
      token: 'ABS_TOKEN_' + Date.now(),
      loginTime: new Date().toISOString(),
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));

    return {
      success: true,
      user: sessionData,
    };
  }

  // If Supabase call failed due to trigger (already exists)
  if (errorMessage && errorMessage.includes('Only one initial admin')) {
    localStorage.setItem('absdigital_admin_registered', 'true');
    return {
      success: false,
      error: 'An admin account is already registered on this website. Please log in.',
    };
  }

  // If network issue, allow local creation fallback if desired, but prioritize remote
  if (!remoteSuccess && !errorMessage) {
    localStorage.setItem('absdigital_admin_registered', 'true');
    localStorage.setItem(LOCAL_ADMIN_BACKUP, JSON.stringify(payload));
    const sessionData = {
      id: 'local-admin-1',
      username: cleanUsername,
      email: cleanEmail,
      fullName: payload.full_name,
      role: 'superadmin',
      token: 'ABS_TOKEN_' + Date.now(),
      loginTime: new Date().toISOString(),
    };
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
    return { success: true, user: sessionData };
  }

  return {
    success: false,
    error: errorMessage || 'Could not complete admin registration.',
  };
}

/**
 * Admin Login
 */
export async function loginAdmin({ usernameOrEmail, password }) {
  const queryTerm = usernameOrEmail.trim().toLowerCase();

  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .select('*')
      .or(`username.eq.${queryTerm},email.eq.${queryTerm}`)
      .limit(1);

    if (!error && Array.isArray(data) && data.length > 0) {
      const adminRecord = data[0];
      const candidateHash = await hashPasswordWithSalt(password, adminRecord.salt);

      if (candidateHash === adminRecord.password_hash) {
        // Update last login
        try {
          await supabase
            .from('admin_accounts')
            .update({ last_login: new Date().toISOString() })
            .eq('id', adminRecord.id);
        } catch (e) {
          // ignore
        }

        const sessionData = {
          id: adminRecord.id,
          username: adminRecord.username,
          email: adminRecord.email,
          fullName: adminRecord.full_name,
          role: adminRecord.role,
          token: 'ABS_TOKEN_' + Date.now(),
          loginTime: new Date().toISOString(),
        };
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));

        return { success: true, user: sessionData };
      } else {
        return { success: false, error: 'Invalid password. Please check your credentials.' };
      }
    }
  } catch (err) {
    console.warn('Supabase login check failed, checking local backup:', err);
  }

  // Fallback to local storage backup
  const localBackupStr = localStorage.getItem(LOCAL_ADMIN_BACKUP);
  if (localBackupStr) {
    try {
      const localRecord = JSON.parse(localBackupStr);
      if (localRecord.username === queryTerm || localRecord.email === queryTerm) {
        const candidateHash = await hashPasswordWithSalt(password, localRecord.salt);
        if (candidateHash === localRecord.password_hash) {
          const sessionData = {
            id: 'local-admin-1',
            username: localRecord.username,
            email: localRecord.email,
            fullName: localRecord.full_name,
            role: 'superadmin',
            token: 'ABS_TOKEN_' + Date.now(),
            loginTime: new Date().toISOString(),
          };
          sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
          return { success: true, user: sessionData };
        }
      }
    } catch (e) {
      // parse error
    }
  }

  return {
    success: false,
    error: 'No matching admin found or incorrect credentials.',
  };
}

/**
 * Get current admin session
 */
export function getAdminSession() {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Logout admin
 */
export function logoutAdmin() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (e) {
    // ignore
  }
}
