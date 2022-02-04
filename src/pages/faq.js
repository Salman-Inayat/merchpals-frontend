import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import FAQ from '../components/faqComponent';
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
}));
export default function CustomizedAccordions() {
  const classes = useStyles();
  const [orders, setOrders] = useState([
    {
      question: 'How many order does it take to screw in a lightbulb?',
      answer: "None. We don't address hardware issues.",
      open: false,
    },
    {
      question: 'Who is the most awesome person?',
      answer: 'You. The Viewer.',
      open: false,
    },
    {
      question:
        'How many questions does it take to make a successful FAQ Page?',
      answer: 'This many.',
      open: false,
    },
  ]);
  const [returns, setReturns] = useState([
    {
      question: 'How many order does it take to screw in a lightbulb?',
      answer: "None. We don't address hardware issues.",
      open: false,
    },
    {
      question: 'Who is the most awesome person?',
      answer: 'You. The Viewer.',
      open: false,
    },
    {
      question:
        'How many questions does it take to make a successful FAQ Page?',
      answer: 'This many.',
      open: false,
    },
  ]);
  const [additionals, setAdditionals] = useState([
    {
      question: 'How many order does it take to screw in a lightbulb?',
      answer: "None. We don't address hardware issues.",
      open: false,
    },
    {
      question: 'Who is the most awesome person?',
      answer: 'You. The Viewer.',
      open: false,
    },
    {
      question:
        'How many questions does it take to make a successful FAQ Page?',
      answer: 'This many.',
      open: false,
    },
  ]);

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
        <Typography variant="h5" diplay="flex" justifySelf="flex-start">
          TRACKER ORDER:
        </Typography>
        <Grid
          item
          md
          container
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
        <Button className={classes.button} diplay="flex" justifySelf="flex-end">
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
          direction={{ xs: 'column', md: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justify="space-between"
          alignItems="center"
          className={classes.container}
        >
          <Typography variant="h5" p={1}>
            Did not find what you were looking for? Contact us
          </Typography>
          <Grid item md display="flex" justifyContent="flex-end">
            <Button className={classes.button}>CONTACT</Button>
          </Grid>
        </Stack>
      </Box>
      <Box mt={5}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <img
            alt="register"
            src="/assets/img/bank1.png"
            width={50}
            height={50}
          />

          <img
            alt="register"
            src="/assets/img/visa_bank.jpg"
            width={50}
            height={40}
          />

          <img
            alt="register"
            src="/assets/img/mastercard.png"
            width={50}
            height={40}
          />

          <img
            alt="register"
            src="/assets/img/bank1.png"
            width={50}
            height={50}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <Button
            className={classes.link_buttons}
            // onClick={handleOnboarding}
            size="large"
          >
            Track Orders
          </Button>
          <Button
            className={classes.link_buttons}
            // onClick={handleOnboarding}
            size="large"
          >
            Privacy Policy
          </Button>
          <Button
            className={classes.link_buttons}
            // onClick={handleOnboarding}
            size="large"
          >
            Terms of Services
          </Button>
        </Stack>
        <Typography
          className={classes.copyright}
          variant="body1"
          align="center"
        >
          {new Date().getFullYear()}
          {' MERCHPALS, ALL RIGHT RESERVED'}
        </Typography>
      </Box>
    </Box>
  );
}
