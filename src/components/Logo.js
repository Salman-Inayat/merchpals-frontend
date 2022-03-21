import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import LogoImage from '../assets/images/Merchpals-logo.png'
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={LogoImage} sx={{ width: 100, height: 80, ...sx }} />;
}
