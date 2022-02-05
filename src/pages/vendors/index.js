import { ThemeCustomise } from '../../components/themeCustomize/themeStyle';
import LoggedInVendor from '../../layouts/LoggedInVendor';
import VendorDashboard from './dashboard';
import { useState } from 'react';
const Dashboard = () => {
  return (
    <LoggedInVendor>
      <VendorDashboard />
    </LoggedInVendor>
  );
};

export default Dashboard;
