import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_CATEGORIES,
  INITIAL_TUTORIALS,
  INITIAL_PATHS,
  INITIAL_BADGES,
  INITIAL_SHOWCASES,
} from './dist/seedData.js';

const env = fs.readFileSync('.env.local', 'utf8');
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)[1].trim();
const supabase = createClient(url, key);

// Helper for deterministic UUIDs
function categoryIdToUuid(id) {
  const num = parseInt(id.replace('cat-', ''), 10) || 1;
  return `a0000000-0000-0000-0000-${String(num).padStart(12, '0')}`;
}

function tutorialIdToUuid(id) {
  const num = parseInt(id.replace('tut-', ''), 10) || 1;
  return `b0000000-0000-0000-0000-${String(num).padStart(12, '0')}`;
}

function pathIdToUuid(id) {
  const num = parseInt(id.replace('path-', ''), 10) || 1;
  return `c0000000-0000-0000-0000-${String(num).padStart(12, '0')}`;
}

function badgeIdToUuid(id) {
  const num = parseInt(id.replace('badge-', ''), 10) || 1;
  return `d0000000-0000-0000-0000-${String(num).padStart(12, '0')}`;
}

async function run() {
  console.log('🚀 Seeding live Supabase database with production data...');

  // 1. Get or verify Admin User
  const { data: usersData, error: userError } = await supabase.from('profiles').select('id, username, role');
  if (userError) {
    console.error('Error fetching profiles:', userError);
    process.exit(1);
  }
  const adminProfile = usersData.find((u) => u.role === 'admin') || usersData[0];
  const adminId = adminProfile ? adminProfile.id : null;
  console.log(`Using admin author_id: ${adminId} (${adminProfile?.username})`);

  // 2. Seed Categories
  console.log('\n--- 1. Seeding Categories ---');
  for (const cat of INITIAL_CATEGORIES) {
    const uuid = categoryIdToUuid(cat.id);
    const { error } = await supabase.from('categories').upsert(
      {
        id: uuid,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        order_index: cat.order_index,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error category ${cat.slug}:`, error.message);
    else console.log(`✓ Category: ${cat.name}`);
  }

  // 3. Seed Tutorials
  console.log('\n--- 2. Seeding 20 Tutorials ---');
  for (const tut of INITIAL_TUTORIALS) {
    const tutUuid = tutorialIdToUuid(tut.id);
    const catUuid = categoryIdToUuid(tut.category_id);

    const { error } = await supabase.from('tutorials').upsert(
      {
        id: tutUuid,
        title: tut.title,
        slug: tut.slug,
        description: tut.description,
        category_id: catUuid,
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
        is_published: true,
        author_id: adminId,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error tutorial ${tut.slug}:`, error.message);
    else console.log(`✓ Tutorial: ${tut.title}`);
  }

  // 4. Seed Learning Paths
  console.log('\n--- 3. Seeding Learning Paths ---');
  for (const path of INITIAL_PATHS) {
    const pathUuid = pathIdToUuid(path.id);
    const mappedTutorialUuids = (path.tutorial_ids || []).map((tId) => tutorialIdToUuid(tId));

    const { error } = await supabase.from('learning_paths').upsert(
      {
        id: pathUuid,
        title: path.title,
        slug: path.slug,
        description: path.description,
        cover_image: path.cover_image,
        difficulty: path.difficulty,
        tutorial_ids: mappedTutorialUuids,
        is_published: true,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error path ${path.slug}:`, error.message);
    else console.log(`✓ Learning Path: ${path.title}`);
  }

  // 5. Seed Badges
  console.log('\n--- 4. Seeding Badges ---');
  for (const badge of INITIAL_BADGES) {
    const badgeUuid = badgeIdToUuid(badge.id);
    const { error } = await supabase.from('badges').upsert(
      {
        id: badgeUuid,
        name: badge.name,
        slug: badge.slug,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
        requirement_rule: {
          category: badge.category || 'all',
          criteria: badge.criteria || '',
        },
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`Error badge ${badge.slug}:`, error.message);
    else console.log(`✓ Badge: ${badge.name}`);
  }

  // 6. Seed Showcases
  console.log('\n--- 5. Seeding Showcases ---');
  if (INITIAL_SHOWCASES && INITIAL_SHOWCASES.length > 0 && adminId) {
    for (const sc of INITIAL_SHOWCASES) {
      const { error } = await supabase.from('showcases').insert({
        user_id: adminId,
        title: sc.title,
        description: sc.description,
        image_url: sc.image_url,
        code: sc.code || '',
        components: sc.components || [],
        status: 'approved',
        likes_count: sc.likes_count || 12,
      });
      if (error && !error.message.includes('duplicate')) {
        console.error(`Error showcase ${sc.title}:`, error.message);
      } else {
        console.log(`✓ Showcase: ${sc.title}`);
      }
    }
  }

  console.log('\n🎉 Supabase PostgreSQL database seeding completed successfully!');
}

run().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
