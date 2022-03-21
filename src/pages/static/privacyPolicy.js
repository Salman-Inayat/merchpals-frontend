import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Grid, Typography, Avatar, useMediaQuery, Hidden, Divider } from '@mui/material';
import { Box } from '@mui/system';
import Footer from '../../layouts/static/footer';

const useStyles = makeStyles(theme => ({
  rowContainer: {
    paddingLeft: '5em',
    paddingRight: '5em',
    paddingTop: '3rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '1.5em',
      paddingRight: '1.5em',
      paddingTop: '1rem',
    },
  },
  divider: {
    width: '100%',
    background: 'black',
  },
}));

const PrivacyPolicy = props => {
  const classes = useStyles();

  return (
    <Box className={classes.rowContainer}>
      <Grid container>
        <Typography variant="h1">Privacy Policy</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Divider className={classes.divider} />
      <Grid item md={9} mt={4} mb={2}>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>

        <Typography variant="h3" mt={3}>
          What is Lorem Ipsum?
        </Typography>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
        <Typography variant="h3" mt={3}>
          What is Lorem Ipsum?
        </Typography>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
        <Typography variant="h3" mt={3}>
          What is Lorem Ipsum?
        </Typography>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
        <Typography variant="h3" mt={3}>
          What is Lorem Ipsum?
        </Typography>
        <Typography variant="body1">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Divider className={classes.divider} />
      <Box mt={5}>
        <Footer />
      </Box>
    </Box>
  );
};
export default PrivacyPolicy;
