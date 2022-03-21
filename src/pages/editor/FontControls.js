import React, { useState } from 'react';
import {
  Grid,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
  fontModal: {
    position: 'absolute',
    top: '180px',
    left: '115%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '170px',
    padding: '8px 8px',
    backgroundColor: '#fff',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      width: '155px',
      top: '110px',
      left: '80%',
    },
  },
}));
const FontColor = props => {
  const [fontColor, setFontColor] = useState('#000000');

  const colors = [
    '#000000',
    '#FFFFFF',
    '#9c9793',
    '#490097',
    '#727DCE',
    '#B400FF',
    '#B674CA',
    '#FF00FF',
    '#F5a0d2',
    '#EC008C',
    '#FF0060',
    '#A11851',
    '#F7A1A0',
    '#FFBE9F',
    '#FF534C',
    '#FF3D4C',
    '#FF1730',
    '#FFD100',
    '#DAAA00',
    '#321900',
    '#AA9C81',
    '#8A7C48',
    '#2A360F',
    '#006500',
    '#5D6A12',
    '#E1FFA9',
    '#B5F746',
    '#00FF00',
    '#7CFFA3',
    '#00FFC5',
    '#57C793',
    '#96C8A2',
    '#008675',
    '#009EE0',
    '#00BEFF',
    '#00FFFA',
    '#CDE0F0',
    '#f5f5f5',
    '#CE2357',
    '#6EE7C2',
    '#87AEB4',
    '#FCBC0A',
    '#ED553B',
    '#006763',
    '#FFF4E0',
    '#C06C84',
    '#FCBC0A',
    '#6B4A7D',
    '#152551',
    '#FDC0B3',
    '#8c8c88',
  ];

  const handleFontColorChange = event => {
    setFontColor(event.target.value);
    props.setFontColor(event.target.value);
    setFontColor('#000000');
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Color</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fontColor}
        label="Age"
        onChange={handleFontColorChange}
        autoWidth
      >
        {colors.map((fontColor, index) => (
          <MenuItem value={fontColor} key={index}>
            <Grid container>
              <Grid item xs={12}>
                <div
                  style={{
                    backgroundColor: fontColor,
                    height: '20px',
                    width: '90px',
                    border: '1px solid #000',
                  }}
                />
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FontFamily = props => {
  const [fontFamily, setFontFamily] = useState('');

  const fontFamilies = [
    'Alpha-Slab',
    'Anton',
    'Arbutus',
    'Bangers',
    'BebasNeue',
    'Blackops',
    'Bungee',
    'Caveat',
    'Cinzel',
    'Dance',
    'DelaGothic',
    'Fredoka',
    'RussoOne',
    'Tourney',
    'BungeeS',
  ];

  const handleFontFamilyChange = event => {
    props.setFontFamily(event.target.value);
    setFontFamily(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Style</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fontFamily}
        label="Age"
        onChange={handleFontFamilyChange}
        autoWidth
      >
        {fontFamilies.map((fontFamily, index) => (
          <MenuItem value={fontFamily} key={index}>
            <Grid container>
              <Grid item xs={12}>
                <div
                  style={{
                    height: '24px',
                    width: '80px',
                    padding: '2px',
                  }}
                >
                  <p id={`style${index + 1}`} style={{ fontFamily: `${fontFamily}` }}>
                    {fontFamily}
                  </p>
                </div>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FontControls = props => {
  const { setFontFamily, setFontColor } = props;
  const classes = useStyles();
  const handleTextEditingFinished = () => {
    props.handleTextEditingFinished();
  };

  return (
    <Paper elevation={5}>
      <Stack direction="column" spacing={2} alignItems="center" alignContent="center">
        <FontFamily setFontFamily={setFontFamily} />
        <FontColor setFontColor={setFontColor} />
        <div id="editing-button" hidden>
          <Button onClick={handleTextEditingFinished} variant="contained" color="primary">
            {' '}
            Done
          </Button>
        </div>
      </Stack>
    </Paper>
  );
};

export default FontControls;
