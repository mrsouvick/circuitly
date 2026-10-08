import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function setupAdmin() {
  console.log('Checking Supabase connection...');
  console.log('Supabase URL:', supabaseUrl);

  const adminEmail = 'admin@circuitly.io';
  const adminPassword = 'Admin@12345';

  // 1. List users to check if admin already exists
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to list users:', listError.message);
  }

  const existingUser = usersData?.users.find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase());

  let adminUserId = existingUser?.id;

  if (existingUser) {
    console.log(`Found existing user with email ${adminEmail} (ID: ${existingUser.id})`);
    // Update password to ensure it's Admin@12345
    const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        username: 'circuitly_admin',
        full_name: 'Circuitly Administrator',
        role: 'admin',
      },
    });

    if (updateError) {
      console.error('Error updating user password:', updateError.message);
    } else {
      console.log('Admin password & metadata refreshed successfully.');
    }
  } else {
    console.log(`User ${adminEmail} not found. Attempting creation...`);

    // First delete any lingering profile with username 'circuitly_admin' or 'admin' to avoid UNIQUE conflict
    await supabase.from('profiles').delete().eq('username', 'circuitly_admin');

    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        username: 'circuitly_admin',
        full_name: 'Circuitly Administrator',
        role: 'admin',
      },
    });

    if (createError) {
      console.error('Creation error details:', createError);
      console.log('\nChecking if we can inspect profiles table...');
      const { data: profiles, error: pError } = await supabase.from('profiles').select('id, username, role').limit(5);
      if (pError) {
        console.error('Error querying profiles table:', pError.message);
        console.log('HINT: Has the SQL migration in supabase/migrations/001_initial.sql been executed in Supabase SQL editor?');
      } else {
        console.log('Existing profiles:', profiles);
      }
    } else if (newUser?.user) {
      adminUserId = newUser.user.id;
      console.log(`Admin user created in auth.users with ID: ${adminUserId}`);
    }
  }

  if (adminUserId) {
    // 2. Ensure profile in public.profiles has role = 'admin'
    console.log('Upserting admin profile in public.profiles table...');
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: adminUserId,
      username: 'circuitly_admin',
      full_name: 'Circuitly Administrator',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
      bio: 'Platform Lead & Hardware Curriculum Architect',
      role: 'admin',
      status: 'active',
      streak_count: 30,
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error('Failed to upsert admin profile:', profileError.message);
    } else {
      console.log('SUCCESS! Admin profile successfully assigned role="admin" in public.profiles.');
    }
  }
}

setupAdmin().catch(console.error);
