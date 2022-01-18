import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Modal, Box } from '@mui/material';
import ContactSupport from './contactSupport';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleContactModal = () => {
    setOpen(!open);
  };

  return (
    <Grid direction="column" container>
      <Button>Store Products</Button>
      <Button onClick={() => navigate('/vendor/designs')}>Store Designs</Button>
      <Button onClick={() => navigate('/vendor/orders')}>Store Orders</Button>
      <Button onClick={toggleContactModal}>Contact Support</Button>
      <Modal
        open={open}
        onClose={toggleContactModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <ContactSupport toggleContactModal={toggleContactModal} />
        </Box>
      </Modal>
    </Grid>
  );
};

export default Dashboard;
