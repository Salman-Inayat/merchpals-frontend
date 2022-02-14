import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Link,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import Footer from '../../layouts/static/footer';
import FAQ from '../../components/static/faqComponent';
import ContactSupport from '../vendors/contactSupport';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  mainBox: {
    padding: '10px 4rem',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  container: {
    padding: ' 10px 5rem ',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
    },
  },
  order_number: {
    display: 'flex',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px',
    '&:hover': {
      background: '#fff',
      color: '#000',
      border: '1px solid #000',
    },
  },
  contactus: {
    border: '1px solid #E5E8EB',

    padding: '5px',
  },
  link_buttons: {
    color: 'grey',
  },
  copyright: {
    fontWeight: 'bold',
    margin: '2rem 0 3rem',
  },
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
}));
const CustomizedAccordions = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    {
      question: 'Can I cancel my order?',
      answer: `<div style="margin-left:30px;">
      <p style="font-size:16px;">You may be able to cancel an order for a full refund as long as your order has not processed. To reach out about canceling your order, please contact us at the bottom of this page.
      <br><br>If your order has already processed, we are unable to cancel your order</p></div>`,
      open: false,
    },
    {
      question: 'What forms of payment do you accept?',
      answer: `
      <div style="margin-left:30px;">
      <p style="font-size:16px;">
      We accept Visa, Mastercard, American Express, Discover, Diners Club, JCB, China UnionPay, debit cards.
      </p>
      </div>`,
      open: false,
    },
    {
      question: 'Why was I charged more than once for an order?',
      answer: ` <div style="margin-left:30px;">
      <p style="font-size:16px;">
      If you use a credit card to place an order and it is declined for any reason (including but not limited to invalid CVV, expiration date, billing address, etc), you may see a pending charge on your account. If this happens, the pending charge will clear from your bank statement within 1-5 days. 
      <br><br>
      Unfortunately if this happens, we are not able to do anything on our end. If you're concerned about the pending charges, your best option is to contact your bank. If these charges do not disappear from your account after 10 business days, please reach out to our team here to in-vestigate. </p></div>`,
      open: false,
    },
    {
      question: 'My credit or debit card is not working',
      answer: `
     <div style="margin-left:30px;">
        <p style="font-size:16px;">If your credit or debit card is not working, please verify that the following is correct:</p>
        <ul style="margin-left:30px;">
            <li>Credit or debit card number</li>
            <li>Expiration date</li>
            <li>CVV/card security code</li>
            <li>Cardholder name</li>
            <li>Billing address</li>
            <li>Sufficient funds or credit available</li>        
        </ul>
        <p style="font-size:16px;">If you still are having issues, the best option is to reach out to your financial institution/bank directly.</p>	
     </div>
        `,
      open: false,
    },
    {
      question: 'Do the prices shown on product pages include tax?',
      answer: `
        <div style="margin-left:30px;">
      <p style="font-size:16px;">
       Prices shown on product pages do not include tax. Tax is calculated at checkout based on your shipping address and relevant tax rules.
  </p></div>
         `,
      open: false,
    },
    {
      question: 'Can I change my order?',
      answer: ` <div style="margin-left:30px;">
      <p style="font-size:16px;">
       Due to the nature of our products and the limited quantities available, we are unable to make any changes to any orders.</p></div>
      `,
      open: false,
    },
  ]);
  const [returns, setReturns] = useState([
    {
      question: 'Do you accept returns or exchanges?',
      answer: ` <div style="margin-left:30px;">
      <p style="font-size:16px;">
      We do not offer returns or exchanges under any circumstance due to the nature of our products and the limited quantities available.</p></div> `,
      open: false,
    },
    {
      question: 'My order/item was damaged in transit',
      answer: `
      <div style="margin-left:30px;">
      <p style="font-size:16px;">
      If your order/item is damaged during shipping, please send a photo of the damage, your email address used to place the order and order number within 48 hours of receiving it to the contact us section at the bottom of this page.
      <br><br>
      If 48 hours has passed since delivery, we are unable to replace or refund your order. </p></div> `,
      open: false,
    },
    {
      question: 'My order was returned to sender',
      answer: `<div style="margin-left:30px;">
      <p style="font-size:16px;">If your order was returned to sender for any reason, you will receive an email from our cus-tomer service team to fix the issue once it has been delivered back to our fulfillment center. If you do not respond within 7 days, your order will be cancelled and refunded minus any rele-vant order costs and shipping fees.
      <br><br>
      Once an item has been marked as returned to sender by the post office, the only option is to wait for it to arrive back at our warehouse. </p></div>`,
      open: false,
    },
  ]);
  const [additionals, setAdditionals] = useState([
    {
      question: 'How can I track my order?',
      answer: `<div style="margin-left:30px;">
      <p style="font-size:16px;">At the top of this page we offer the ability to enter your Order number and find the details of your order. Additionally we will send you the tracking information by email once it is available.</p></div>`,
      open: false,
    },
    {
      question: 'Where do you ship?',
      answer: `<div style="margin-left:30px;">
      <p style="font-size:16px;">
      We ship to almost every country! There are a few exceptions and currently shipping is not supported to North Korea, Syria, Iran, Crimea, Cuba, and Ecuador. The list may change due to restrictions.</p></div>`,
      open: false,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: 'success',
    message: 'Message sent successfully',
  });
  const toggleFAQ = (index, state, setState) => {
    setState(
      state.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      }),
    );
  };
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
  const handleSnackBarClose = () =>
    setSnackBarToggle({
      ...snackBarToggle,
      visible: false,
    });

  const handleTrackOrder = () => {
    navigate('/track-order');
  };

  return (
    <Box className={classes.mainBox}>
      <Stack
        direction={{ xs: 'column', md: 'row', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        justifyContent="center"
        alignItems="center"
        mt={4}
        className={classes.container}
      >
        <Typography variant="h5" diplay="flex">
          TRACKER ORDER:
        </Typography>
        <Grid item md container display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" mr={2}>
            ORDER#
          </Typography>
          <Grid item md={6}>
            <TextField
              fullWidth
              placeholder="ORDER NUMBER (DO NOT INCLUDE '#'"
              className={classes.order_number}
              type="number"
              // {...register('firstName')}
              // error={Boolean(errors.firstName?.message)}
              // helperText={errors.firstName?.message}
            />
          </Grid>
        </Grid>
        <Button className={classes.button} diplay="flex" onClick={handleTrackOrder}>
          TRACK ORDER
        </Button>
      </Stack>
      <Divider />
      <Grid className={classes.container}>
        <Typography variant="h3" p={1}>
          FAQ
        </Typography>
      </Grid>
      <Divider />
      <Grid className={classes.container}>
        <Typography variant="h3" p={1}>
          ORDERS & PAYMETNT
        </Typography>
      </Grid>
      <Divider />
      <Grid>
        {orders.map((faq, index) => (
          <>
            <FAQ
              key={index}
              faq={faq}
              state={orders}
              setState={setOrders}
              index={index}
              toggleFAQ={toggleFAQ}
              className={classes.container}
            />
            <Divider />
          </>
        ))}
      </Grid>
      <Grid className={classes.container}>
        <Typography variant="h3" p={1}>
          RETURNS/REFUNDS
        </Typography>
      </Grid>

      <Divider />
      <Grid>
        {returns.map((faq, index) => (
          <>
            <FAQ
              key={index}
              faq={faq}
              state={returns}
              setState={setReturns}
              index={index}
              toggleFAQ={toggleFAQ}
              className={classes.container}
            />
            <Divider />
          </>
        ))}
      </Grid>
      <Grid className={classes.container}>
        <Typography variant="h3" p={1}>
          ADDITIONAL FAQ
        </Typography>
      </Grid>

      <Divider />
      <Grid>
        {additionals.map((faq, index) => (
          <>
            <FAQ
              key={index}
              faq={faq}
              state={additionals}
              setState={setAdditionals}
              index={index}
              toggleFAQ={toggleFAQ}
              className={classes.container}
            />
            <Divider />
          </>
        ))}
      </Grid>
      <Box className={classes.contactus} mt={5}>
        <Stack
          direction={{ xs: 'column', md: 'row', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justify="space-between"
          alignItems="center"
          className={classes.container}
        >
          <Typography variant="h5" p={1}>
            Did not find what you were looking for? Contact us
          </Typography>
          <Grid item md display="flex" justifyContent="flex-end">
            <Button className={classes.button} onClick={toggleContactModal}>
              CONTACT
            </Button>
          </Grid>
        </Stack>
      </Box>
      <Box mt={5}>
        <Footer />
      </Box>
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
      <Snackbar open={snackBarToggle.visible} autoHideDuration={2000} onClose={handleSnackBarClose}>
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
    </Box>
  );
};
export default CustomizedAccordions;
