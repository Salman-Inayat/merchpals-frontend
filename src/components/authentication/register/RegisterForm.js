import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// material
import { makeStyles } from "@mui/styles";
import { Grid, Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhoneNumberInput } from "../../phone-number-input";

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: '5px',
    color: '#FF4842',
    marginLeft: '14px',
    fontSize: '0.75rem'
  }
}))
export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNo: '',
    message: ''
  });

  const navigate = useNavigate();
  const classes = useStyles();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmPassword: Yup.string()
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
        const formattedPhoneNo = `+${phoneNo}`;
        const data = {
          ...values,
          phoneNo: formattedPhoneNo,
        }
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/sign-up`, { data }).then(response => {
          localStorage.setItem('phoneNoForOTP', formattedPhoneNo);
          navigate("/otp-verification", { replace: true });
        }).catch(error => {
          actions.setSubmitting(false);
          let err = error.response.data.message;
          if (error.response.data.name === 'object') {
            err = JSON.parse(error.response.data.message);
          }
          if(typeof err === 'string'){
            setFormErrors({ phoneNo: '', email: '', message: err })
          } else {
            setFormErrors({phoneNo: err.phoneNo, email: err.email , message: '' })
          }
        })
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <PhoneNumberInput 
            phoneNo={phoneNo} 
            setPhoneNo={(value) => {
                setFormErrors({...formErrors, phoneNo: ''});
                setPhoneNo(value)
              }
            } 
            error={formErrors.phoneNo} 
          />

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            onKeyUp={() => setFormErrors({...formErrors, email: ''})}
            error={Boolean(touched.email && errors.email) || Boolean(formErrors.email)}
            helperText={(touched.email && errors.email) || formErrors.email}
          />

          <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {formik.values.password.length > 7 && <TextField
            fullWidth
            autoComplete={+new Date()}
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            {...getFieldProps("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />}

          {formErrors.message && 
            <Grid className={classes.error} item>
              {formErrors.message}
            </Grid>
          }

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
