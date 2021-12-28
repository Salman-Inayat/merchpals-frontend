import React from 'react';
import {
  Grid,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const FontColor = props => {
  const [fontColor, setFontColor] = React.useState('');

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
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Font Color</InputLabel>
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
  const [fontFamily, setFontFamily] = React.useState('');

  const fontFamilies = [
    'Alpha-Slab',
    'Anton',
    'Arbutus',
    'Bangers',
    'BebasNeue',
    'Blackops',
    'Bungee',
    'BungeeS',
    'Caveat',
    'Cinzel',
    'Dance',
    'DelaGothic',
    'Fredoka',
    'RussoOne',
    'Tourney',
  ];

  const handleFontFamilyChange = event => {
    props.setFontFamily(event.target.value);
    setFontFamily(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
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
                  {fontFamily}
                </div>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FontSize = props => {
  const [fontSize, setFontSize] = React.useState('');

  const fontSizes = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
    '26',
    '28',
  ];

  const handleFontSizeChange = event => {
    props.setFontSize(event.target.value);
    setFontSize(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Font Size</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={fontSize}
        label="Age"
        onChange={handleFontSizeChange}
        autoWidth
      >
        {fontSizes.map((fontSize, index) => (
          <MenuItem value={fontSize} key={index}>
            <Grid container>
              <Grid item xs={12}>
                <div
                  style={{
                    height: '24px',
                    width: '80px',
                    padding: '2px',
                  }}
                >
                  {fontSize}
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

  return (
    <div id="textControls" hidden>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
          >
            <FontFamily setFontFamily={setFontFamily} />
            <FontColor setFontColor={setFontColor} />
            {/* <FontSize setFontSize={setFontSize} /> */}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default FontControls;
