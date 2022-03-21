import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../configs/const';
import LoggedInVendor from '../../layouts/LoggedInVendor';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Button,
  Input,
  InputLabel,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PhoneNumberInput from '../../components/phone-number-input/PhoneNumberInput';

const useStyles = makeStyles(theme => ({
  textField: {
    border: '1px solid #ddd',
    height: '45px',
    width: '100%',
    padding: '8px 10px',
    marginTop: '5px',
    borderRadius: '4px',
    '&:after': {
      border: '1px solid #ddd',
    },
  },
  label: {
    marginLeft: '3px',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'black',
  },
  required: {
    color: 'red',
  },
  continueBtn: {
    width: '80%',
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: '20px',
    '&:hover': {
      color: 'black',
      backgroundColor: 'yellow',
    },
  },
  error: {
    color: 'red',
    fontWeight: 600,
  },
  fieldError: {
    color: 'red',
    fontWeight: 400,
    fontSize: '11px',
  },
  headingContainer: {
    position: 'relative',
  },
  closeModalButton: {
    position: 'absolute',
    top: '1.3rem',
    right: '0.3rem',
  },
}));

const ContactSupport = props => {
  const classes = useStyles();
  const [contactDetails, setContactDetails] = useState({
    email: '',
    name: '',
    phoneNo: '',
    message: '',
    email_from: '',
  });
  const [phoneNo, setPhoneNo] = useState('');
  const [toggleSubmit, setToggleSubmit] = useState(true);

  const ContactSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email address'),
    name: Yup.string().required('Name is required'),
    message: Yup.string().required('Message is required'),
  });

  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(ContactSchema),
  });

  const [email, name, message] = watch(['email', 'name', 'message']);

  useEffect(() => {
    setContactDetails({
      email,
      name,
      phoneNo: `+${phoneNo}`,
      message,
      email_from: props.email_from,
    });
    if (
      email !== '' &&
      name !== '' &&
      phoneNo !== '' &&
      phoneNo.length >= 10 &&
      message !== '' &&
      !errors.email &&
      !errors.name &&
      !errors.phoneNo &&
      !errors.message
    ) {
      setToggleSubmit(false);
    } else {
      setToggleSubmit(true);
    }
  }, [email, name, message, phoneNo]);

  const handleSubmit = () => {
    props.handleModalAndSnackbar();

    axios
      .post(`${baseURL}/contact`, contactDetails)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2} p={2} className={classes.headingContainer}>
      <Grid item md={12} xs={12}>
        <Typography variant="h4" component="h4">
          Contact Support
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={() => props.toggleContactModal()}
          className={classes.closeModalButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid item md={12} xs={12}>
        <InputLabel className={classes.label}>
          Your Name <span className={classes.required}>*</span>
        </InputLabel>
        <Input
          {...register('name', {
            onChange: e => {
              if (errors.name) {
                trigger('name');
              }
            },
          })}
          className={classes.textField}
          placeholder="Name"
        />
        <span className={classes.fieldError}>{errors?.name?.message}</span>
      </Grid>
      <Grid item md={12} xs={12}>
        <PhoneNumberInput
          phoneNo={contactDetails.phoneNo}
          setPhoneNo={value => {
            setPhoneNo(value);
          }}
        />
        <span className={classes.fieldError}>{errors?.phoneNo?.message}</span>
      </Grid>
      <Grid item md={12} xs={12}>
        <InputLabel className={classes.label}>
          Your Email <span className={classes.required}>*</span>
        </InputLabel>
        <Input
          {...register('email', {
            onChange: e => {
              if (errors.email) {
                trigger('email');
              }
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={classes.textField}
          placeholder="Email"
          type="email"
        />
        <span className={classes.fieldError}>{errors.email?.message}</span>
      </Grid>

      <Grid item md={12} xs={12}>
        <InputLabel className={classes.label}>
          Message <span className={classes.required}>*</span>
        </InputLabel>
        <Input
          {...register('message', {
            onChange: e => {
              if (errors.message) {
                trigger('message');
              }
            },
          })}
          className={classes.textField}
          style={{ height: '100px' }}
          placeholder="Message"
          multiline
          rows={4}
        />
        <span className={classes.fieldError}>{errors?.message?.message}</span>
      </Grid>
      <Grid item md={12} display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleSubmit} disabled={toggleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactSupport;
