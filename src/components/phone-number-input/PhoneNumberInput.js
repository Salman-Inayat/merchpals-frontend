import { makeStyles } from "@mui/styles";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const useStyles = makeStyles({
  phoneNo: {
    width: "100% !important",
  },
});

const PhoneNumberInput = ({ phoneNo, setPhoneNo }) => {
  const classes = useStyles();
  return (
    <PhoneInput
      inputClass={classes.phoneNo}
      country={"us"}
      value={phoneNo}
      onChange={(phone) => setPhoneNo(phone)}
    />
  );
};

export default PhoneNumberInput;
