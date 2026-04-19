import { DiscoverForm } from '@/features/discover/discover-form';
import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';

export default function DiscoverPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Aqlli afzalliklar formasi"
        title="Bu qanday safar ekanini yozing"
        description="Qulaylik, byudjet, transport va safar maqsadlarini hisobga olgan reytingli tavsiyalar olish uchun ushbu shakldan foydalaning."
      />
      <div className="mt-10">
        <DiscoverForm />
      </div>
    </PageShell>
  );
}
