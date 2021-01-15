import useSWR from 'swr';

import { fetcher } from '@/util/fetcher';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

export default function MyFeedback() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['api/feedback', user.token] : null, fetcher);

  return (
    <DashboardShell>
      {!data ? (
        <SiteTableSkeleton />
      ) : data.feedback ? (
        <>
          <FeedbackTableHeader />
          <FeedbackTable feedback={data.feedback} />
        </>
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
