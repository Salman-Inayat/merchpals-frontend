import { useEffect, useState } from "react";
import { Grid, Stack, TextField, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { baseURL } from '../../../configs/const';

const useStyle = makeStyles(() => ({
  heading: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  fileInput: {
    marginLeft: '20px'
  }
}))

const Input = styled('input')({
  display: 'none',
});

const StoreForm = ({
  createStore,
  createStoreError = false
}) => {
  const [phoneNo, setPhoneNo] = useState();
  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNo: '',
    message: ''
  });
  const [images, setImages] = useState({logo: '', coverAvatar: ''});
  const classes = useStyle();
  const [slugMessage, setSlugMessage] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (createStoreError) {
      setLoading(false);
    }
  }, [createStoreError])
  const storeSchema = Yup.object().shape({
    name: Yup.string()
      .required("Store name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    slug: Yup.string()
      .required("Store slug is required")
      .matches(/^[a-z0-9]+[a-z0-9-]+[a-z0-9]$/, "Only alpha numeric characters with hyphen (-) are allowed")
      .min(2, "Too Short!")
      .max(15, "Too Long!"),
  });
  
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({ 
    resolver: yupResolver(storeSchema)
  });

  const onSubmit = (data) => {
    setLoading(true);
    console.log({images});
    createStore({...data, ...images})
  };

  const onError = (err) => {
    console.log('err', err);
  }
  

  const setImage = async (name, file) => {
    setImages({...images, [name]: file})
  }

  const isSlugValid = () => {
    const slug = watch('slug');
    setLoading(true);
    axios.get(`${baseURL}/store/validate-slug/${encodeURI(slug)}`)
    .then(response => {
      console.log({ response });
      setSlugMessage('')
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      console.log({ errp: err.response.data });
      setSlugMessage(err.response.data.message)
    })
  }
  return (
    <Grid container>
      <Grid container justifyContent='center' alignItems='center' mt={5} pb={18}>
        <Grid item xs={8}  container  justifyContent='center' alignItems='center' spacing={3}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Stack spacing={3} style={{width: '500px'}}>
              <Typography align='center' className={classes.heading}>Lets create your Store</Typography>
              <TextField
                fullWidth
                label="Store Name"
                {...register("name")}
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
              />

              <TextField
                fullWidth
                label="Store url"
                {...register("slug")}
                error={Boolean(errors.slug?.message) || Boolean(slugMessage)}
                helperText={errors.slug?.message || slugMessage}
                onBlur={isSlugValid}
              />

              <TextField
                fullWidth
                label="twitch"
                {...register("twitch")}
                error={Boolean(errors.twitch?.message)}
                helperText={errors.twitch?.message}
              />

              <TextField
                fullWidth
                label="youtube"
                {...register("youtube")}
                error={Boolean(errors.youtube?.message)}
                helperText={errors.youtube?.message}
              />

              <TextField
                fullWidth
                label="Instagram"
                {...register("instagram")}
                error={Boolean(errors.instagram?.message)}
                helperText={errors.instagram?.message}
              />

              <TextField
                fullWidth
                label="Tiktok"
                {...register("Tiktok")}
                error={Boolean(errors.Tiktok?.message)}
                helperText={errors.Tiktok?.message}
              />

              <Grid container>
                <Grid xs={3} item> Logo </Grid>
                <Grid xs={5} item>
                  <label htmlFor="logo-button-file">
                    <Input 
                      name="logo" 
                      accept="image/*" 
                      id="logo-button-file" type="file" 
                      onChange={(e) => setImage('logo', e.target.files[0])}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Grid>
              </Grid>

              <Grid container>
                <Grid xs={3} item> Cover Photo </Grid>
                <Grid xs={5} item>
                  <label htmlFor="coverAvatar-button-file">
                    <Input 
                      name="coverAvatar" 
                      accept="image/*" 
                      id="coverAvatar-button-file" 
                      type="file"  
                      onChange={(e) => setImage('coverAvatar', e.target.files[0])}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Grid>
              </Grid>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Create Store
              </LoadingButton>
              </Stack>
            </form>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { StoreForm as default }