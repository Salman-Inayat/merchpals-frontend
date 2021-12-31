import { useState } from "react";
import { Grid, Stack, TextField, Button, Typography } from "@mui/material";
import PhoneNumberInput from '../../../components/phone-number-input';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  heading: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
}))

const StoreForm = () => {
  const [phoneNo, setPhoneNo] = useState();
  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNo: '',
    message: ''
  });

  const classes = useStyle();
  
  return (
    <Grid container>
      <Grid container justifyContent='center' alignItems='center' mt={5} pb={18}>
        <Grid item xs={8}  container  justifyContent='center' alignItems='center' spacing={3}>
          <Stack spacing={3} style={{width: '500px'}}>
            <Typography align='center' className={classes.heading}>Lets create your Store</Typography>
            <TextField
              fullWidth
              label="Store Name"
            />

            <PhoneNumberInput 
              phoneNo={phoneNo} 
              setPhoneNo={(value) => {
                setFormErrors({...formErrors, phoneNo: ''});
                setPhoneNo(value)
                }
              } 
              error={formErrors.phoneNo} 
            />

            { phoneNo?.length > 2 && (
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                label="Email address"
                onKeyUp={() => setFormErrors({...formErrors, email: ''})}
              />
            )}

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create Store
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { StoreForm as default }