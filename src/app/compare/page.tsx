import { ComparePanel } from '@/features/compare/compare-panel';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';

export default function ComparePage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Compare feature"
        title="Compare 2 to 4 neighborhoods with a serious visual layout"
        description="The comparison view is designed to read like a formal planning brief rather than a raw spreadsheet."
      />
      <div className="mt-10">
        <ComparePanel />
      </div>
    </PageShell>
  );
}
