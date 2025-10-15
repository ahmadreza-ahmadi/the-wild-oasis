import DashboardFilter from '@/features/dashboard/components/DashboardFilter';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
