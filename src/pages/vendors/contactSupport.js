import { useEffect, useState } from 'react';
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
    fontWeight: 'bolder',
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
}));

function ContactSupport({ toggleContactModal }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [contactDetails, setContactDetails] = useState({
    email: '',
    name: '',
    phoneNo: '',
    message: '',
  });

  const ContactSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    name: Yup.string().required('Name is required'),
    phoneNo: Yup.string().required('Phone Number is required'),
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

  const [email, name, phoneNo, message] = watch([
    'email',
    'name',
    'phoneNo',
    'message',
  ]);

  useEffect(() => {
    setContactDetails({
      email,
      name,
      phoneNo,
      message,
    });
  }, [email, name, phoneNo, message]);

  const handleSubmit = () => {
    axios
      .post(`${baseURL}/contact`, contactDetails)
      .then(res => {
        toggleContactModal();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item md={11}>
        <Typography variant="h4" component="h4">
          Contact Support
        </Typography>
      </Grid>
      <Grid item md={1}>
        <IconButton aria-label="delete" onClick={() => toggleContactModal()}>
          <CloseIcon />
        </IconButton>
      </Grid>

      <Grid item md={6} xs={12}>
        <InputLabel className={classes.label}>
          Name <span className={classes.required}>*</span>
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
      <Grid item md={6} xs={12}>
        <InputLabel className={classes.label}>
          Phone Number <span className={classes.required}>*</span>
        </InputLabel>
        <Input
          {...register('phoneNo', {
            onChange: e => {
              if (errors.phoneNo) {
                trigger('phoneNo');
              }
            },
          })}
          className={classes.textField}
          placeholder="Phone Number"
        />
        <span className={classes.fieldError}>{errors?.phoneNo?.message}</span>
      </Grid>
      <Grid item md={12} xs={12}>
        <InputLabel className={classes.label}>
          Email <span className={classes.required}>*</span>
        </InputLabel>
        {/* <Input
          {...register('email', {
            onChange: e => {
              if (errors.email) {
                trigger('email');
              }
            },

            // pattern: {
            //   value:
            //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            //   message: 'Invalid email address',
            // },

            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={classes.textField}
          placeholder="Email"
          type="email"
        /> */}
        <input
          {...register('email', {
            required: 'Please enter your email address',
            // pattern: {
            //   value:
            //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            //   message: 'Invalid email address',
            // },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          //   className={`input w-full ${
          //     !errors.email && dirtyFields.email && '!bg-green-50'
          //   }`}
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
          placeholder="Message"
        />
        <span className={classes.fieldError}>{errors?.message?.message}</span>
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default ContactSupport;
