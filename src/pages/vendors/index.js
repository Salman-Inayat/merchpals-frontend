import LoggedInVendor from '../../layouts/LoggedInVendor';
import VendorDashboard from './dashboard';

const Dashboard = () => {
  return (
    <LoggedInVendor>
      <VendorDashboard />
    </LoggedInVendor>
  );
};

export default Dashboard;
