import { useState } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Circle from '../../assets/images/svgs/Circle.svg';
import Triangle from '../../assets/images/svgs/Triangle.svg';
import Square from '../../assets/images/svgs/Square.svg';
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
const Shapes = ({ addShape }) => {
  const classes = useStyles();
  const shapes = [
    {
      value: 'square',
      image: Square,
    },
    { value: 'triangle', image: Triangle },
    { value: 'circle', image: Circle },
  ];

  const [shape, setShape] = useState('square');

  const handleShapeChange = event => {
    setShape(event.target.value);
    addShape(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Shapes</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={shape}
        label="Shape"
        onChange={handleShapeChange}
        // SelectDisplayProps={{ style: { paddingTop: 5, paddingBottom: 5 } }}
      >
        {shapes.map((shape, index) => (
          <MenuItem value={shape.value} key={index}>
            <img key={index} src={shape.image} className={classes.smileys} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Shapes;
