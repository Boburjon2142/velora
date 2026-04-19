import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { BudgetPlanner } from '@/features/budget/budget-planner';

export default function BudgetPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Byudjet hisoblagichi"
        title="Realistik safar byudjetini hisoblang"
        description="Har bir yashash hududida safar qancha turishini ko'rish uchun tejamkor, balansli va premium ko'rinishlardan foydalaning."
      />
      <div className="mt-10">
        <BudgetPlanner />
      </div>
    </PageShell>
  );
}
