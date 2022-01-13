import React from "react";
import { makeStyles } from "@mui/styles";
import PhoneInput from "react-phone-input-2";
import { Typography,Grid } from "@mui/material";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles({
  phoneNo: {
    width: "100% !important",
  },
  error: {
    marginTop: '5px',
    color: '#FF4842',
    marginLeft: '14px',
    fontSize: '0.75rem'
  }
});

const PhoneNumberInput = ({ phoneNo, setPhoneNo, error, inputStyle = {} }) => {
  const classes = useStyles();
  return (
    <Grid>
      <PhoneInput
        inputClass={classes.phoneNo}
        country={"us"}
        value={phoneNo}
        onChange={(phone) => setPhoneNo(phone)}
        isValid={!error}
        inputStyle={inputStyle}
      />
      {error && <Typography className={classes.error}>{error}</Typography>}
    
    </Grid>
  );
};

export default PhoneNumberInput;
