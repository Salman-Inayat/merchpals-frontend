import React, {useState} from 'react';
import { AppBar, Card, Grid, Modal, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContactSupport from '../vendors/contactSupport';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/img'
import Navbar from '../../layouts/static/navbar';
import SubFooter from '../../layouts/static/subfooter';

const useStyles = makeStyles(theme => ({
  modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      backgroundColor: 'white',
      boxShadow: 24,
      borderRadius: '5px',
      p: 4,
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
    },
    buttons: {
      display: 'flex',
      height: '85%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          maxWidth: '1000px',
          // marginTop: '20%'
      }
    },
    button: {
      backgroundColor: '#d1cfcf',
      color: 'black',
      fontSize: '20px',
      width: '280px',
      height: '80px',
      fontWeight: '600',
      textDecoration: 'none',
      borderRadius: '100px',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '3rem',
      padding: '1rem 1rem',
      boxShadow: '1px 2px 2px 1px rgba(0,0,0,.6)',
      [theme.breakpoints.up('md')]: {
          width: '70%',
          padding: '4.8rem 3.8rem',
          margin: '1rem',
          fontSize: '40px'
      }
    },
    link: {
      textDecoration: 'none',
      color: 'black',
      fontWeight: '400'
  }
}))

const Contact = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [helperText, setHelperText] = useState('');

  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });

  const classes = useStyles();

    const toggleContactModal = () => {
        setModalOpen(!modalOpen);
      };
      const handleModalAndSnackbar = () => {
        setModalOpen(!modalOpen);
        setSnackBarToggle({
          visible: true,
          type: 'success',
          message: 'Message sent successfully',
        });
      };
    return (
        <div style={{backgroundColor: '#e7e9eb', height: '100%'}}>
            <Navbar/>
            <Grid className={classes.buttons}>
            <button className={classes.button} onClick={toggleContactModal}>Creator Support</button>
            <Link to='/faq' className={classes.button} >Customer Support</Link>
            </Grid>
            <Modal
        open={modalOpen}
        onClose={toggleContactModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={classes.modal}>
          <ContactSupport
            handleModalAndSnackbar={handleModalAndSnackbar}
            toggleContactModal={toggleContactModal}
          />
        </Card>
      </Modal>
      <SubFooter/>
        </div>
    )
}
export default Contact;