import { useState } from "react";
import { Grid, Stack, TextField, Button, Typography, Label } from "@mui/material";
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
  createStore
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
  
  const storeSchema = Yup.object().shape({
    name: Yup.string()
      .required("Store name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    slug: Yup.string()
      .required("Store slug is required")
      .min(2, "Too Short!")
      .max(15, "Too Long!"),
  });
  
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({ 
    resolver: yupResolver(storeSchema)
  });

  const onSubmit = (data) => {
    // console.log({ data });
    console.log({images});
    createStore({...data, ...images})
  };

  const onError = (err) => {
    console.log('err', err);
  }
  
  const readFile = (file) => {
    if (!file) {
      return;
    }
  
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
  
      reader.onload = function (event) {
        var _event$target;
        resolve(
          event === null || event === void 0
            ? void 0
            : (_event$target = event.target) === null || _event$target === void 0
            ? void 0
            : _event$target.result
        );
      };
  
      reader.onerror = function (event) {
        reader.abort();
        reject(event);
      };
      reader.readAsDataURL(file);
    });
  };
  

  const setImage = async (name, file) => {
    // const base64Image = await readFile(file)
    // console.log({base64Image});
    console.log({file});
    setImages({...images, [name]: file})
  }

  const isSlugValid = () => {
    const slug = watch('slug');
    axios.get(`${baseURL}/store/validate-slug/${encodeURI(slug)}`)
    .then(response => {
      console.log({ response });
      setSlugMessage('')
    })
    .catch(err => {
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
                label="Slug"
                {...register("slug")}
                error={Boolean(errors.slug?.message) || Boolean(slugMessage)}
                helperText={errors.slug?.message || slugMessage}
                onBlur={isSlugValid}
              />

              <TextField
                fullWidth
                label="Facebook"
                {...register("facebook")}
                error={Boolean(errors.facebook?.message)}
                helperText={errors.facebook?.message}
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
                label="Twitter"
                {...register("twitter")}
                error={Boolean(errors.twitter?.message)}
                helperText={errors.twitter?.message}
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

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create Store
              </Button>
              </Stack>
            </form>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { StoreForm as default }