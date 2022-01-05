import { Stack } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  smileyContainer: {
    height: '450px',
    overflow: 'scroll',
    // [theme.breakpoints.down('md')]: {
    //   overflowX: 'scroll',
    //   overflowY: 'hidden',
    //   whiteSpace: 'nowrap',
    //   height: '50px',
    // },

    [theme.breakpoints.down('sm')]: {
      height: '225px',
    },
  },
  smileys: {
    width: '100%',
    height: '75px',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '60px',
      height: '30px',
      margin: '10px 0px',
      display: 'inline-block',
    },

    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '30px',
      margin: '10px 0px',
      display: 'inline-block',
    },
  },
}));

const Smileys = ({ addPng, className }) => {
  const classes = useStyles();

  const images = [
    '1.svg',
    '2.svg',
    '3.svg',
    '4.svg',
    '5.svg',
    '6.svg',
    '7.svg',
    '8.svg',
    '9.svg',
    '10.svg',
    '11.svg',
    '12.svg',
    '13.svg',
    '14.svg',
    '15.svg',
    '16.svg',
    '17.svg',
    '18.svg',
    '19.svg',
    '20.svg',

    '21.svg',
    '22.svg',
    '23.svg',
    '24.svg',
    '25.svg',
    '26.svg',
    '27.svg',
    '28.svg',
    '29.svg',
    '30.svg',
    '31.svg',
    '32.svg',
    '33.svg',
    '34.svg',
    '35.svg',
    '36.svg',
    '37.svg',
    '38.svg',
    '39.svg',
    '40.svg',

    '41.svg',
    '42.svg',
    '43.svg',
    '44.svg',
    '45.svg',
    '46.svg',
    '47.svg',
    '48.svg',
    '49.svg',
    '50.svg',
    '51.svg',
    '52.svg',
    '53.svg',
    '54.svg',
    '55.svg',
    '56.svg',
    '57.svg',
    '58.svg',
    '59.svg',
    '60.svg',

    '61.svg',
    '62.svg',
    '63.svg',
    '64.svg',
    '65.svg',
    '66.svg',
    '67.svg',
    '68.svg',
    '69.svg',
    '70.svg',
    '71.svg',
    '72.svg',
    '73.svg',
    '74.svg',
    '75.svg',
    '76.svg',
    '77.svg',
    '78.svg',
    '79.svg',
    '80.svg',

    '81.svg',
    '82.svg',
    '83.svg',
    '84.svg',
    '85.svg',
    '86.svg',
    '87.svg',
    '88.svg',
    '89.svg',
    '90.svg',
    '91.svg',
    '92.svg',
    '93.svg',
    '94.svg',
    '95.svg',
    '96.svg',
    '97.svg',
    '98.svg',
    '99.svg',
    '100.svg',
  ];

  return (
    <div className={classes.smileyContainer} id="smileyContainer" hidden>
      {images.map((oneImage, index) => (
        <img
          key={index}
          src={`/svg-icons/${oneImage}`}
          onClick={() => addPng(`/svg-icons/${oneImage}`)}
          className={classes.smileys}
        />
      ))}
    </div>
  );
};

export default Smileys;