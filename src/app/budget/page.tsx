import { PageShell } from '@/components/page-shell';
import { SectionHeading } from '@/components/section-heading';
import { BudgetPlanner } from '@/features/budget/budget-planner';

export default function BudgetPage() {
  return (
    <PageShell className="py-14">
      <SectionHeading
        eyebrow="Budget estimator"
        title="Estimate a realistic travel budget"
        description="Use budget-friendly, balanced, and premium views to understand what a trip can cost in each stay zone."
      />
      <div className="mt-10">
        <BudgetPlanner />
      </div>
    </PageShell>
  );
}
