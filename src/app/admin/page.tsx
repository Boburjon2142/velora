import { AdminDashboard } from '@/features/admin/admin-dashboard';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';

export default function AdminPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Admin panel"
        title="Shaharlar, hududlar, baholar, narxlar va ishonch mazmunini boshqaring"
        description="Bu panel himoyalangan va oddiy tahrirdan ko'ra tartibli ma'lumot yuritish uchun mo'ljallangan."
      />
      <div className="mt-10">
        <AdminDashboard />
      </div>
    </PageShell>
  );
}
