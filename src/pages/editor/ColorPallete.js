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
}));

const ColorPallete = ({ setCanvasBackground, setCavasTextureImage, customClass }) => {
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
  const textures = ['1.png', '2.png', '3.png'];
  const background = [
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

  const [bgSolid, setBgSolid] = useState(solid[2]);
  const [bgTexture, setBgTexture] = useState('1.png');
  const [bgBackground, setBgBackground] = useState(background[8]);

  const handleBgSolidChange = event => {
    setBgSolid(event.target.value);
    setCanvasBackground(event.target.value);
  };

  const handleBgTextureChange = event => {
    setBgTexture(event.target.value);
    console.log(`/texture-image/${event.target.value}`);

    setCavasTextureImage(`/texture-image/${event.target.value}`);
    // const addImage = e => {
    //   var file = e.target.files[0];
    //   var reader = new FileReader();
    //   reader.onload = function (f) {
    //     var data = f.target.result;
    //     editorJs.addImageOnCanvas(data);
    //   };
    //   reader.readAsDataURL(file);
    // };
    // setCanvasBackground(event.target.value);
  };

  const handleBgBackgroundChange = event => {
    setBgBackground(event.target.value);
    setCanvasBackground(event.target.value);
  };

  // return (
  //   <Stack className={classes.colorPallete}>
  //     {colors.map((bgColor, index) => (
  //       <div
  //         key={index}
  //         style={{
  //           backgroundColor: bgColor,
  //         }}
  //         className={classes.color}
  //         onClick={() => setCanvasBackground(bgColor)}
  //       />
  //     ))}
  //   </Stack>
  // );

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
            SelectDisplayProps={{ style: { paddingTop: 13, paddingBottom: 10 } }}
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
            SelectDisplayProps={{ style: { paddingTop: 13, paddingBottom: 10 } }}
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
      <Box mt={1}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Background</InputLabel>
          <Select
            // SelectDisplayProps={{ style: { padding: '10px 5px 5px 10px' } }}
            SelectDisplayProps={{ style: { paddingTop: 13, paddingBottom: 10 } }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bgBackground}
            label="Color"
            onChange={handleBgBackgroundChange}
          >
            {background.map((bgBackground, index) => (
              <MenuItem value={bgBackground} key={index}>
                <Grid container>
                  <Grid item xs={12}>
                    <div
                      style={{
                        backgroundColor: bgBackground,
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
    </Box>
  );
};

export default ColorPallete;
