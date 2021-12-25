import React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => <div>
  <Link component={RouterLink} variant="subtitle2" to="/login">
    Login
  </Link>
</div>

export { Home as default }