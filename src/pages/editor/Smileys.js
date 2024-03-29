import { useState } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  smileyContainer: {
    height: '450px',
    overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: '225px',
    },
  },
  smileys: {
    width: '4rem',

    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '60px',

      display: 'inline-block',
    },

    [theme.breakpoints.down('sm')]: {
      width: '2rem',
      display: 'inline-block',
    },
  },
  // smiliesPaper: {
  //   position: 'absolute',
  //   top: '280px',
  //   left: '62%',
  //   transform: 'translate(-50%, -50%)',
  //   width: '150px',
  //   height: '170px',
  //   padding: '8px 8px',
  //   backgroundColor: '#fff',
  //   [theme.breakpoints.down('sm')]: {
  //     width: '120px',

  //     top: '230px',
  //     left: '85%',
  //   },
  // },
}));

const Smileys = ({ addPng, className }) => {
  const classes = useStyles();

  const images = [
    '1-smiley.svg',
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
    '20.svg',
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
    '101.svg',
  ];

  const [smiley, setSmiley] = useState('1.svg');

  const handleSmileyChange = event => {
    setSmiley(event.target.value);
    addPng(`/svg-icons/${event.target.value}`);
    setSmiley('1-smiley.svg');
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Smiley</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={smiley}
        label="Color"
        onChange={handleSmileyChange}
      >
        {images.map((image, index) => (
          <MenuItem value={image} key={index}>
            <img key={index} src={`/svg-icons/${image}`} className={classes.smileys} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Smileys;
