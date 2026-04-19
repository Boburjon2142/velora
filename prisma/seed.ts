import { seedRuntimeState } from '@/features/runtime-store/store';
import { seedMeta } from '@/features/data/seed';

async function main() {
  await seedRuntimeState();
  console.log(
    `Seeded Tourist Comfort Finder runtime store with ${seedMeta.cities} cities, ${seedMeta.neighborhoods} neighborhoods, ${seedMeta.amenities} amenities, and ${seedMeta.attractions} attractions.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
