
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_CATEGORIES,
  INITIAL_TUTORIALS,
  INITIAL_PATHS,
  INITIAL_BADGES,
  INITIAL_SHOWCASES
} from '../lib/seedData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('dummy')) {
  console.log('Notice: Supabase URL or Service Role Key not set. Seed script running in dry-run mode.');
  console.log(`Loaded ${INITIAL_CATEGORIES.length} categories, ${INITIAL_TUTORIALS.length} tutorials, ${INITIAL_PATHS.length} paths, ${INITIAL_BADGES.length} badges.`);
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function runSeed() {
  console.log('Starting Circuitly Supabase Seeding...');

  // 1. Seed or Verify Admin User
  const adminEmail = 'admin@circuitly.io';
  const adminPassword = 'Admin@12345';

  const { data: existingUser } = await supabase.auth.admin.listUsers();
  let adminUserId = existingUser?.users?.find((u) => u.email?.toLowerCase() === adminEmail.toLowerCase())?.id;

  if (adminUserId) {
    console.log(`Found existing admin user (${adminEmail}). Updating credentials...`);
    await supabase.auth.admin.updateUserById(adminUserId, {
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: 'admin', username: 'circuitly_admin' },
    });
    await supabase.from('profiles').upsert({
      id: adminUserId,
      username: 'circuitly_admin',
      full_name: 'Circuitly Administrator',
      role: 'admin',
      status: 'active',
      streak_count: 30,
    });
    console.log('Admin user updated successfully!');
  } else {
    console.log('Creating Admin User...');
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
      console.warn('Notice: To enable automated admin creation, execute supabase/fix_admin_auth.sql in your Supabase SQL Editor.');
    } else if (newUser?.user) {
      adminUserId = newUser.user.id;
      await supabase.from('profiles').upsert({
        id: adminUserId,
        username: 'circuitly_admin',
        full_name: 'Circuitly Administrator',
        role: 'admin',
        status: 'active',
        streak_count: 30,
      });
      console.log('Admin user initialized successfully!');
    }
  }

  // 2. Seed Categories
  console.log('Seeding Categories...');
  for (const cat of INITIAL_CATEGORIES) {
    await supabase.from('categories').upsert({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      order_index: cat.order_index,
    });
  }

  // 3. Seed Tutorials
  console.log('Seeding Tutorials...');
  for (const tut of INITIAL_TUTORIALS) {
    await supabase.from('tutorials').upsert({
      id: tut.id,
      title: tut.title,
      slug: tut.slug,
      description: tut.description,
      category_id: tut.category_id,
      difficulty: tut.difficulty,
      time_estimate: tut.time_estimate,
      cost_estimate: tut.cost_estimate,
      hero_image: tut.hero_image,
      circuit_diagram: tut.circuit_diagram,
      learning_outcomes: tut.learning_outcomes,
      prerequisites: tut.prerequisites,
      components: tut.components,
      code: tut.code,
      steps: tut.steps,
      troubleshooting: tut.troubleshooting,
      quiz: tut.quiz,
      views_count: tut.views_count,
      completions_count: tut.completions_count,
      is_published: tut.is_published,
      author_id: adminUserId,
    });
  }

  // 4. Seed Learning Paths
  console.log('Seeding Learning Paths...');
  for (const path of INITIAL_PATHS) {
    await supabase.from('learning_paths').upsert({
      id: path.id,
      title: path.title,
      slug: path.slug,
      description: path.description,
      cover_image: path.cover_image,
      difficulty: path.difficulty,
      tutorial_ids: path.tutorial_ids,
      is_published: path.is_published,
    });
  }

  // 5. Seed Badges
  console.log('Seeding Badges...');
  for (const badge of INITIAL_BADGES) {
    await supabase.from('badges').upsert({
      id: badge.id,
      name: badge.name,
      slug: badge.slug,
      description: badge.description,
      icon: badge.icon,
      color: badge.color,
      requirement_rule: badge.requirement_rule,
    });
  }

  console.log('Seeding complete! All 20 tutorials, categories, paths, badges, and admin user are ready.');
}

runSeed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
