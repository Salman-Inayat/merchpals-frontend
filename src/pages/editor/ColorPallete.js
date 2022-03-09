import React, { useState } from 'react';
import { Grid, Stack, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, color } from '@mui/system';

const useStyles = makeStyles(theme => ({
  colorPallete: {
    height: '450px',
    overflow: 'scroll',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      height: '225px',
    },
  },
  color: {
    height: '24px',
    width: '70px',
    border: '1px solid #000',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '15px',
    },
  },
  bgColors: {
    height: '20px',
    width: '80px',
    border: '1px solid #000',
    [theme.breakpoints.down('sm')]: {
      width: '65px',
    },
  },
  rootFirstSelect: {
    padding: '0px',
  },
  texture: {
    width: '5rem',
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

const ColorPallete = ({ setCanvasBackground, setCavasBackgroundImage, customClass }) => {
  const classes = useStyles();

  const solid = [
    '#ffffff00',
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
  const textures = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.png',
    '14.png',
    '15.png',
    '16.png',
    '17.png',
    '18.png',
    '19.png',
    '20.png',
    '21.png',
    '22.png',
    '23.png',
    '24.png',
    '25.png',
    '26.png',
    '27.png',
    '28.png',
    '29.png',
    '30.png',
    '31.png',
    '32.png',
  ];

  const [bgSolid, setBgSolid] = useState(solid[2]);
  const [bgTexture, setBgTexture] = useState('1.png');

  const handleBgSolidChange = event => {
    setBgSolid(event.target.value);
    setCanvasBackground(event.target.value);
  };

  const handleBgTextureChange = event => {
    setBgTexture(event.target.value);
    console.log(`/texture-image/${event.target.value}`);
    setCavasBackgroundImage(`/texture-image/${event.target.value}`);
  };

  return (
    <Box>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Solid</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bgSolid}
            label="Color"
            onChange={handleBgSolidChange}
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 6 } }}
          >
            {solid.map((bgSolid, index) => (
              <MenuItem value={bgSolid} key={index}>
                <Grid container>
                  <Grid item xs={12}>
                    <div
                      style={{
                        backgroundColor: bgSolid,
                      }}
                      className={classes.bgColors}
                    />
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={1}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Texture</InputLabel>
          <Select
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 2 } }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bgTexture}
            label="Color"
            onChange={handleBgTextureChange}
          >
            {textures.map((texture, index) => (
              <MenuItem value={texture} key={index}>
                <img key={index} src={`/texture-image/${texture}`} className={classes.texture} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ColorPallete;
