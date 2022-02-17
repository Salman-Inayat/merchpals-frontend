import React, { useEffect, useState } from 'react';
import { Grid, Stack, Box, Typography, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PhoneFrame from '../../../assets/images/StoreGeneratedPAGE1.png';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    jusifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
  phoneFrame: {
    width: '20rem',
    height: '20rem',
  },
  copyContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    margin: '0 auto',
    width: '100%',
  },
  copyLinkText: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
}));

function FlowComplete({ storeURL }) {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);
  const [confettiRun, setConfettiRun] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setConfettiRun(false);
    }, 3000);
  }, []);
  const copyToClipboard = text => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    setCopied(true);
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item md={12}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Box>
              <Typography variant="h5" color="initial" align="center">
                It&#39;s Live!
              </Typography>
              <Typography variant="h5" color="initial" align="center">
                Add your store link to your bio
              </Typography>
            </Box>
            <img src={PhoneFrame} className={classes.phoneFrame}></img>
            <Grid item md={12} sm={12} xs={12} className={classes.copyContent}>
              <TextField
                id="outlined-read-only-input"
                label={!storeURL && 'Copy Store Link'}
                value={`${process.env.REACT_APP_URL}/${storeURL}`}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <Box>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => copyToClipboard(`${process.env.REACT_APP_URL}/${storeURL}`)}
                      >
                        <ContentCopyIcon color="white" />
                      </Button>
                    </Box>
                  ),
                }}
                fullWidth
                className={classes.copyLinkText}
              />
            </Grid>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/vendor', { replace: true })}
            >
              Go to dashboard
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Confetti numberOfPieces={confettiRun ? 500 : 0} />
    </div>
  );
}

export default FlowComplete;
