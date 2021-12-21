import Page from "../../components/Page";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { OtpVerifyInput } from "../../components/authentication/otp-verify-input";
import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const OtpVerification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [otp, setOtp] = useState();

  const handleSubmit = () => {
    console.log(otp);
  };

  return (
    <Page title="Verify Otp">
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid
            container
            style={{ backgroundColor: "white" }}
            className={classes.grid}
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item container justify="center">
              <Grid item container alignItems="center" direction="column">
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <LockOutlined />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Verification Code
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Paper elevation={0}>
                <Typography variant="body">
                  Please enter the verification code sent to your mobile
                </Typography>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item spacing={3} justify="center">
                <OtpVerifyInput otp={otp} setOtp={setOtp} />
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Verify
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link color="secondary">
                    <Typography variant="body2">Resend OTP</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Page>
  );
};

export default OtpVerification;
