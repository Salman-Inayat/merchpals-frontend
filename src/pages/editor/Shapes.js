import { useState } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Circle from '../../assets/images/svgs/Circle.svg';
import Triangle from '../../assets/images/svgs/Triangle.svg';
import Square from '../../assets/images/svgs/Square.svg';
const useStyles = makeStyles(theme => ({
  smileys: {
    width: '1rem',
    height: '1.1em',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      // width: '60px',
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      // width: '5rem',
      // height: '1.4rem',
      display: 'inline-block',
    },
  },
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
        SelectDisplayProps={{ style: { paddingTop: 5, paddingBottom: 5 } }}
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
