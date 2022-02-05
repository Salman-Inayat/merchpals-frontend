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
  IconButton,
  Chip,
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
import PhoneFrame from '../../../assets/images/iphone_mockup_ready.png';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SelectTheme from '../../../components/themeCustomize/selectTheme';

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
  picsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  frameContainer: {
    position: 'relative',
    height: '80vh',
    flexBasis: '55%',
    width: '50vw',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '75%',
      height: '60vh',
    },
  },
  phoneFrame: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '20rem',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: '10',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  uploadingPhotos: {
    position: 'relative',
    top: '15%',
    left: '0',
    width: '100%',
    height: '22vh',
    [theme.breakpoints.down('sm')]: {
      height: '18vh',
      top: ' 15%',
    },
  },
  coverPhoto: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',

    '&:active': {
      border: '2px solid blue',
    },
  },
  logoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  logoPhoto: {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  uploadIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    cursor: 'pointer',
  },
}));

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
  const [images, setImages] = useState({
    logo: 'https://images.unsplash.com/photo-1643874626318-964452868452?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    coverAvatar:
      'https://images.unsplash.com/photo-1643819999990-1697109b1559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  });
  const classes = useStyle();
  const [slugMessage, setSlugMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState();
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
    if (themeColor) {
      data.themeColor = themeColor;
    }
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
  console.log('theme', themeColor);
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
              <Grid item md={12} xs={12}>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chip label="1" variant="contained" color="primary" />
                  <Typography variant="h5" color="initial" align="center">
                    Profile and cover pic
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={12} xs={12} className={classes.picsContainer}>
                <Box className={classes.frameContainer}>
                  <img src={PhoneFrame} className={classes.phoneFrame}></img>
                  <Box className={classes.uploadingPhotos}>
                    <img
                      src={images.coverAvatar}
                      className={classes.coverPhoto}
                      onClick={handleChangeStoreAvatarButton}
                    ></img>
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
                    <Box className={classes.logoContainer}>
                      <img
                        src={images.logo}
                        className={classes.logoPhoto}
                      ></img>

                      <IconButton
                        aria-label="upload"
                        className={classes.uploadIcon}
                        onClick={handleChangeStoreLogoButton}
                      >
                        <CameraAltIcon
                          sx={{
                            color: '#fff',
                            fontSize: '2rem',
                          }}
                        />
                      </IconButton>
                    </Box>
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
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item md={12} xs={12}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Chip label="3" variant="contained" color="primary" />
                <Typography variant="h5" color="initial" align="center">
                  Add username
                </Typography>
              </Stack>
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

            <Grid item md={12} xs={12}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Chip label="4" variant="contained" color="primary" />
                <Typography variant="h5" color="initial" align="center">
                  Name your store
                </Typography>
              </Stack>
            </Grid>

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

            <Grid container>
              <SelectTheme setThemeColor={setThemeColor} />
            </Grid>

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
