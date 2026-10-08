import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testProfiles() {
  console.log('Testing profiles table with service role...');
  const { data, error } = await supabase.from('profiles').select('*');
  console.log('Select result:', { data, error });
}

testProfiles();
