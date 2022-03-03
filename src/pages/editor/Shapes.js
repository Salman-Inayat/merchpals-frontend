import { useState } from 'react';
import { Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
  smileys: {
    width: '1rem',
    height: '1.1em',
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '60px',
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      width: '5rem',
      height: '1.4rem',
      display: 'inline-block',
    },
  },
}));
const Shapes = ({ addShape }) => {
  const classes = useStyles();
  const shapes = [
    {
      value: 'square',
      image: '2.png',
    },
    { value: 'triangle', image: '3.png' },
    { value: 'circle', image: '1.png' },
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
        // SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 2 } }}
      >
        {shapes.map((shape, index) => (
          <MenuItem value={shape.value} key={index}>
            <img key={index} src={`/shapes-image/${shape.image}`} className={classes.smileys} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Shapes;
