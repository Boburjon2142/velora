import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { ItineraryPlanner } from '@/features/itinerary/itinerary-planner';

export default function ItineraryPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Itinerary planner"
        title="Generate a usable trip plan"
        description="Create 1-day, 3-day, or 5-day itineraries that include time blocks, food stops, practical notes, and travel tips."
      />
      <div className="mt-10">
        <ItineraryPlanner />
      </div>
    </PageShell>
  );
}
