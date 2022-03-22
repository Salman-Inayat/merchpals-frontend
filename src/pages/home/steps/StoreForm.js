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
import ImageCrop from '../../../components/imageCrop/imageCrop';
import PhoneFrame from '../../../assets/images/iPhone-display.png';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SelectTheme from '../../../components/themeCustomize/selectTheme';
import { useSelector } from 'react-redux';
import { fontWeight } from '@mui/system';
import { ThemeCustomise, themeStyles } from '../../../components/themeCustomize/themeStyle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const useStyle = makeStyles(theme => ({
  container: {
    backgroundColor: '#eae9e5',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 6rem ',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  form: {
    width: '90%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
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
    width: '60vw',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    [theme.breakpoints.down('md')]: {
      height: '70vh',
    },
    [theme.breakpoints.down('sm')]: {
      flexBasis: '75%',
      height: '65vh',
    },
    [theme.breakpoints.down('xs')]: {
      flexBasis: '75%',
      height: '70vh',
    },
  },
  phoneFrame: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '17rem',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: '10',

    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  uploadingPhotos: {
    position: 'relative',
    top: '1%',
    left: '0',
    width: '100%',
    height: '22vh',

    [theme.breakpoints.down('sm')]: {
      height: '18vh',
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
    cursor: 'pointer',
  },
  uploadIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
    cursor: 'pointer',
  },
  uploadCoverIcon: {
    position: 'absolute',
    // top: '50%',
    // left: '80%',
    right: '0',
    bottom: '0',
    // transform: 'translate(-50%, -50%)',
    color: '#fff',
    cursor: 'pointer',
  },
  store_name: {
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      marginTop: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      marginTop: '1rem',
    },
  },
  topBar: {
    padding: '0px 5%',
    marginTop: '10%',
  },
  coverCamer: {
    borderRadius: '50%',
    backgroundColor: '#2C9BF4',
    color: '#fff',
    padding: '5px',
    fontSize: '1.8rem',
    [theme.breakpoints.down('md')]: {
      marginRight: '12px',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: '2px',
    },
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
    logo: '',
    coverAvatar: '',
  });
  const [showImg, setShowImg] = useState({
    coverAvatar: '',
    logo: '',
  });
  // let themeClass;
  const classes = useStyle();
  const [slugMessage, setSlugMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState();
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openLogoModal, setOpenLogoModal] = useState(false);
  const [toggleStoreAvatarButton, setToggleStoreAvatarButton] = useState(false);
  const [toggleStoreLogoButton, setToggleStoreLogoButton] = useState(false);
  const [storeName, setStoreName] = useState(false);
  const [themeClass, setThemeClass] = useState();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (createStoreError) {
      setLoading(false);
    }
  }, [createStoreError]);

  const storeSchema = Yup.object().shape({
    name: Yup.string().required('Store name is required').min(2, 'Too Short!').max(15, 'Too Long!'),
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
  };

  const onError = err => {
    console.log('err', err);
  };

  const setImage = async (name, file) => {
    setImages({ ...images, [name]: file });
    setShowImg({ ...showImg, [name]: URL.createObjectURL(file) });
  };

  // const isSlugValid = () => {
  //   axios
  //     .post(`${baseURL}/store/validate-slug`, { storeName })
  //     .then(response => {
  //       setSlugMessage('');
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //       setSlugMessage(err.response.data.message);
  //     });
  //   // axios
  //   //   .get(`${baseURL}/store/validate-slug/${encodeURI(slug)}`)
  //   //   .then(response => {
  //   //     setSlugMessage('');
  //   //     setLoading(false);
  //   //   })
  //   //   .catch(err => {
  //   //     setLoading(false);
  //   //     setSlugMessage(err.response.data.message);
  //   //   });
  // };

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
  const handleStoreName = e => {
    setStoreName(e.target.value);
    const name = e.target.value.trim();
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      axios
        .post(`${baseURL}/store/validate-slug`, { storeName: name })
        .then(response => {
          setSlugMessage('');
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setSlugMessage(err.response.data.message);
        });
    }, 1000);

    setTimer(newTimer);
  };

  const themeClasses = themeStyles();
  const theme = useSelector(state => state.design);
  useEffect(() => {
    if (theme.themeColor) {
      const tmpthemeClass = ThemeCustomise(themeClasses, theme.themeColor);
      setThemeClass(tmpthemeClass);
    } else {
      const tmpthemeClass = ThemeCustomise(themeClasses, 'WHITE');
      setThemeClass(tmpthemeClass);
    }
  }, [theme.themeColor]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      // mt={5}
      pb={18}
      className={classes.container}
    >
      <Grid item md={12} xs={12} className={classes.formContainer}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack spacing={3} className={classes.form}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Grid container justifyContent="center" alignItems="center" spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                      <Chip label="1" variant="contained" color="primary" />
                      <Typography variant="h5" color="initial" align="center">
                        Profile and cover pic
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.picsContainer}>
                    <Box className={` ${classes.frameContainer} ${themeClass}`}>
                      <img src={PhoneFrame} className={`${classes.phoneFrame} `}></img>
                      <Grid container item md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                          <Grid
                            item
                            container
                            md={12}
                            xs={12}
                            alignItems="center"
                            className={classes.topBar}
                          >
                            <Grid
                              item
                              md={9}
                              sm={9}
                              xs={9}
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <Typography variant="h6">Official Store</Typography>
                            </Grid>
                            <Grid
                              item
                              md={3}
                              sm={3}
                              xs={3}
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ShoppingCartOutlinedIcon
                                // className={themeColorClass}
                                sx={{ fontSize: '1.5rem' }}
                              />
                            </Grid>
                          </Grid>
                          <Box className={classes.uploadingPhotos}>
                            <img
                              src={
                                showImg.coverAvatar
                                  ? showImg.coverAvatar
                                  : images.coverAvatar === ''
                                  ? '/assets/img/sand_cover_pic.jpg'
                                  : images.coverAvatar
                              }
                              className={classes.coverPhoto}
                              onClick={handleChangeStoreAvatarButton}
                            ></img>

                            <IconButton
                              aria-label="upload"
                              className={classes.uploadCoverIcon}
                              sx={{ display: images.coverAvatar ? 'none' : 'block' }}
                              // display={images.coverAvatar ? 'none' : 'block'}
                              onClick={handleChangeStoreAvatarButton}
                            >
                              {/* <img src="assets/img/camera.png" width="auto" /> */}
                              <CameraAltIcon className={classes.coverCamer} />
                            </IconButton>
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
                                  setImage={setImage}
                                />
                              </Box>
                            </Modal>
                            <Box className={classes.logoContainer}>
                              {showImg.logo ? (
                                <img
                                  src={showImg.logo}
                                  className={classes.logoPhoto}
                                  onClick={handleChangeStoreLogoButton}
                                />
                              ) : (
                                <IconButton
                                  aria-label="upload"
                                  className={classes.uploadIcon}
                                  sx={{ display: images.logo ? 'none' : 'block' }}
                                  onClick={handleChangeStoreLogoButton}
                                >
                                  <CameraAltIcon
                                    sx={{
                                      borderRadius: '50%',
                                      backgroundColor: '#2C9BF4',
                                      color: '#fff',
                                      padding: '13px',
                                      fontSize: '5rem',
                                    }}
                                  />
                                </IconButton>
                              )}
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
                                  setImage={setImage}
                                />
                              </Box>
                            </Modal>
                          </Box>
                          <Box textAlign="center">
                            <Typography className={classes.store_name}>
                              {storeName}&#39;S MERCH STORE
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  {/* <Grid item md={12} xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                    </Grid>
                  </Grid> */}
                </Grid>
              </Grid>

              <Grid item md={6} xs={12}>
                <Grid container justifyContent="center" alignItems="center" spacing={4}>
                  <Grid item md={12} xs={12}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Chip label="2" variant="contained" color="primary" />
                        <Typography variant="h5" color="initial" align="center">
                          Choose your theme
                        </Typography>
                      </Stack>
                      <SelectTheme setThemeColor={setThemeColor} />
                    </Stack>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
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

                      <Grid item md={12} xs={12}>
                        <Stack spacing={3} direction="row">
                          <TextField
                            fullWidth
                            placeholder="Instagram"
                            // label="Instagram"
                            {...register('instagram')}
                            error={Boolean(errors.instagram?.message)}
                            helperText={errors.instagram?.message}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
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
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                            className={classes.textfield}
                            size="small"
                          />
                        </Stack>
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <Stack spacing={3} direction="row">
                          <TextField
                            fullWidth
                            placeholder="Youtube"
                            // label="youtube"
                            {...register('youtube')}
                            error={Boolean(errors.youtube?.message)}
                            helperText={errors.youtube?.message}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
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
                              startAdornment: <InputAdornment position="start">@</InputAdornment>,
                            }}
                            className={classes.textfield}
                            size="small"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <Grid container spacing={2}>
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

                      <Grid item md={12} x={12}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <TextField
                            label="Store Name"
                            {...register('name')}
                            error={Boolean(errors.name?.message) || Boolean(slugMessage)}
                            helperText={errors.name?.message || slugMessage}
                            className={[classes.textfield, classes.storeNameField].join(' ')}
                            size="small"
                            inputProps={{ maxLength: 15 }}
                            onChange={handleStoreName}

                            // onBlur={isSlugValid}
                          />
                          <Typography variant="h5">&#39;s MERCH STORE</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      // loading={loading}
                      disabled={
                        images.coverAvatar === '' || images.logo === '' || themeColor === ''
                          ? true
                          : false
                      }
                    >
                      Get Store
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export { StoreForm as default };
