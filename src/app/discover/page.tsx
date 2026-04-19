import { DiscoverForm } from '@/features/discover/discover-form';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';

export default function DiscoverPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Smart preference form"
        title="Tell us what kind of trip this is"
        description="Use this structured form to get ranked neighborhood recommendations that reflect comfort, budget, transport, and travel goals."
      />
      <div className="mt-10">
        <DiscoverForm />
      </div>
    </PageShell>
  );
}
