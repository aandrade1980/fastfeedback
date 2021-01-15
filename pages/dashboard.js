import useSWR from 'swr';

import { fetcher } from '@/util/fetcher';
import { useAuth } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTable from '@/components/SiteTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['api/sites', user.token] : null, fetcher);

  return (
    <DashboardShell>
      {!data ? (
        <SiteTableSkeleton />
      ) : data.sites ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
