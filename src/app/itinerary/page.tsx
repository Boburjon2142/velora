import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { ItineraryPlanner } from '@/features/itinerary/itinerary-planner';

export default function ItineraryPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Marshrut rejalashtiruvchi"
        title="Amaliy safar rejasini yarating"
        description="1 kunlik, 3 kunlik yoki 5 kunlik marshrutlarda vaqt bo'limlari, ovqat to'xtashlari, amaliy eslatmalar va maslahatlar bo'ladi."
      />
      <div className="mt-10">
        <ItineraryPlanner />
      </div>
    </PageShell>
  );
}
