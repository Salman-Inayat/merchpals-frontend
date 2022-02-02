import { useEffect, useState } from 'react';
import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { baseURL } from '../../../configs/const';
import ImageCrop from '../../../components/imageCrop';

const useStyle = makeStyles(theme => ({
  container: {
    backgroundColor: '#eae9e5',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  form: {
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textfield: {
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
  },
  storeNameField: {
    width: '50%',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  fileInput: {
    marginLeft: '20px',
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    // bgcolor: 'background.paper',
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '50%',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const Input = styled('input')({
  display: 'none',
});

const StoreForm = ({ createStore, createStoreError = false }) => {
  const [phoneNo, setPhoneNo] = useState();
  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNo: '',
    message: '',
  });
  const [images, setImages] = useState({ logo: '', coverAvatar: '' });
  const classes = useStyle();
  const [slugMessage, setSlugMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);

  useEffect(() => {
    if (createStoreError) {
      setLoading(false);
    }
  }, [createStoreError]);
  const storeSchema = Yup.object().shape({
    name: Yup.string()
      .required('Store name is required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    slug: Yup.string()
      .required('Store slug is required')
      .matches(
        /^[a-z0-9]+[a-z0-9-]+[a-z0-9]$/,
        'Only alpha numeric characters with hyphen (-) are allowed',
      )
      .min(2, 'Too Short!')
      .max(15, 'Too Long!'),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(storeSchema),
  });

  const onSubmit = data => {
    setLoading(true);
    createStore({ ...data, ...images });
    // console.log(images);
  };

  const onError = err => {
    console.log('err', err);
  };

  const setImage = async (name, file) => {
    setImages({ ...images, [name]: file });
  };

  const isSlugValid = () => {
    const slug = watch('slug');
    setLoading(true);
    axios
      .get(`${baseURL}/store/validate-slug/${encodeURI(slug)}`)
      .then(response => {
        console.log({ response });
        setSlugMessage('');
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log({ errp: err.response.data });
        setSlugMessage(err.response.data.message);
      });
  };

  const handleOpenAvatarModal = () => setOpenAvatarModal(true);
  const handleCloseAvatarModal = () => setOpenAvatarModal(false);

  const handleOpenLogoModal = () => setOpenLogoModal(true);
  const handleCloseLogoModal = () => setOpenLogoModal(false);

  const handleChangeStoreAvatarButton = () => {
    handleOpenAvatarModal();
    setToggleStoreAvatarButton(!toggleStoreAvatarButton);
  };

  const handleChangeStoreLogoButton = () => {
    handleOpenLogoModal();
    setToggleStoreLogoButton(!toggleStoreLogoButton);
  };

  const handleStoreAvatarChange = value => {
    setImages({ ...images, coverAvatar: value });
  };

  const handleStoreLogoChange = value => {
    setImages({ ...images, logo: value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      mt={5}
      pb={18}
      className={classes.container}
    >
      <Grid item md={12} xs={12} className={classes.formContainer}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack spacing={3} className={classes.form}>
            <Typography align="center" className={classes.heading}>
              Lets create your Store
            </Typography>

            <Grid container>
              <Grid xs={3} item>
                {' '}
                Cover Photo{' '}
              </Grid>
              <Grid xs={5} item>
                {/* <label htmlFor="logo-button-file">
                    <Input
                      name="logo"
                      accept="image/*"
                      id="logo-button-file"
                      type="file"
                      onChange={e => setImage('logo', e.target.files[0])}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      onClick={handleChangeStoreAvatarButton}
                    >
                      Upload
                    </Button>
                  </label> */}
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleChangeStoreAvatarButton}
                >
                  Upload
                </Button>
                <Modal
                  open={openAvatarModal}
                  onClose={handleCloseAvatarModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modalBox}>
                    <ImageCrop
                      handleClose={handleCloseAvatarModal}
                      handleStoreAvatarChange={handleStoreAvatarChange}
                      variant="storeAvatar"
                    />
                  </Box>
                </Modal>
              </Grid>
            </Grid>

            <Grid container>
              <Grid xs={3} item>
                {' '}
                Logo{' '}
              </Grid>
              <Grid xs={5} item>
                {/* <label htmlFor="coverAvatar-button-file">
                    <Input
                      name="coverAvatar"
                      accept="image/*"
                      id="coverAvatar-button-file"
                      type="file"
                      onChange={e => setImage('coverAvatar', e.target.files[0])}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label> */}
                <Button
                  variant="contained"
                  component="span"
                  onClick={handleChangeStoreLogoButton}
                >
                  Upload
                </Button>
                <Modal
                  open={openLogoModal}
                  onClose={handleCloseLogoModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className={classes.modalBox}>
                    <ImageCrop
                      handleClose={handleCloseLogoModal}
                      handleStoreLogoChange={handleStoreLogoChange}
                      variant="storeLogo"
                    />
                  </Box>
                </Modal>
              </Grid>
            </Grid>

            <Stack spacing={3} direction="row">
              <TextField
                fullWidth
                placeholder="Instagram"
                // label="Instagram"
                {...register('instagram')}
                error={Boolean(errors.instagram?.message)}
                helperText={errors.instagram?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                className={classes.textfield}
                size="small"
              />

              <TextField
                fullWidth
                placeholder="Tiktok"
                // label="Tiktok"
                {...register('Tiktok')}
                error={Boolean(errors.Tiktok?.message)}
                helperText={errors.Tiktok?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                className={classes.textfield}
                size="small"
              />
            </Stack>

            <Stack spacing={3} direction="row">
              <TextField
                fullWidth
                placeholder="Youtube"
                // label="youtube"
                {...register('youtube')}
                error={Boolean(errors.youtube?.message)}
                helperText={errors.youtube?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                className={classes.textfield}
                size="small"
              />

              <TextField
                fullWidth
                placeholder="Twitch"
                // label="twitch"
                {...register('twitch')}
                error={Boolean(errors.twitch?.message)}
                helperText={errors.twitch?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                className={classes.textfield}
                size="small"
              />
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
              <TextField
                label="Store Name"
                {...register('name')}
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                className={[classes.textfield, classes.storeNameField].join(
                  ' ',
                )}
                size="small"
              />
              <Typography variant="h5">&#39;s MERCH STORE</Typography>
            </Stack>

            <TextField
              fullWidth
              label="Store url"
              {...register('slug')}
              error={Boolean(errors.slug?.message) || Boolean(slugMessage)}
              helperText={errors.slug?.message || slugMessage}
              onBlur={isSlugValid}
              className={classes.textfield}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Get Store
            </LoadingButton>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export { StoreForm as default };
