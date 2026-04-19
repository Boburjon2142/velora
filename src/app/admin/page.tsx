import { AdminDashboard } from '@/features/admin/admin-dashboard';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';

export default function AdminPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="Manage cities, neighborhoods, scores, prices, and public trust content"
        description="This panel is protected and designed for structured data maintenance rather than casual editing."
      />
      <div className="mt-10">
        <AdminDashboard />
      </div>
    </PageShell>
  );
}
