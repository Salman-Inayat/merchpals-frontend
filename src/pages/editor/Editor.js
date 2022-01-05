import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Button, Card, Grid, Stack, Typography, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete, Undo, Redo } from '@mui/icons-material';
import { bgcolor, Box } from '@mui/system';
import ColorPallete from './ColorPallete';
import useEditor from '../../components/editor/useEditor';
import FontControls from './FontControls';
import CanvasEditor from '../../components/editor/canvasEditor';
import Smileys from './Smileys';
import ShirtSVG from '../../assets/images/gray-tshirt.svg';

const useStyles = makeStyles(theme => ({
  editor: {
    width: '450px',
    height: '450px',
    [theme.breakpoints.down('sm')]: {
      width: '225px',
      height: '225px',
    },
  },
  controlsContainer: {
    // order: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      // order: 3,
      // position: 'fixed',
      // bottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      // position: 'fixed',
      // bottom: theme.spacing(2),
    },
  },
  canvasContainer: {
    // order: 3,
    // [theme.breakpoints.down('md')]: {
    //   order: 2,
    //   marginBottom: '50px',
    // },
  },
  bottomButtons: {
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '50px',
      padding: '6px',
    },
  },
  miniatureContaienr: {
    display: 'inline-block',
    textAlign: 'center',
    position: 'relative',
    margin: '20px 0px',
  },
  shirtImage: {
    width: '150px',
    height: '150px',
    position: 'relative',
    top: '0',
    left: '0',
    [theme.breakpoints.down('sm')]: {
      width: '150px',
      height: '150px',
    },
  },
  miniature: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
    height: '50px',
    border: 'none',
  },
}));

const Editor = ({ exportBase64 = () => {} }) => {
  const classes = useStyles();

  const editorJs = useEditor();
  const [toggleSmileys, setToggleSmileys] = useState(false);
  const [toggleFontControls, setToggleFontControls] = useState(false);
  const [cropDoneButton, setCropDoneButton] = useState(false);
  const [miniature, setMiniature] = useState();

  useEffect(() => {
    var style1 = document.getElementById('style1');
    var style2 = document.getElementById('style2');
    var style3 = document.getElementById('style3');
    var style4 = document.getElementById('style4');
    var style5 = document.getElementById('style5');
    var style6 = document.getElementById('style6');
    var style7 = document.getElementById('style7');
    var style8 = document.getElementById('style8');
    var style9 = document.getElementById('style9');
    var style10 = document.getElementById('style10');
    var style11 = document.getElementById('style11');
    var style12 = document.getElementById('style12');
    var style13 = document.getElementById('style13');
    var style14 = document.getElementById('style14');
    var style15 = document.getElementById('style15');

    style1.style.fontFamily = 'Alpha-Slab';
    style2.style.fontFamily = 'Anton';
    style3.style.fontFamily = 'Arbutus';
    style4.style.fontFamily = 'Bangers';
    style5.style.fontFamily = 'BebasNeue';
    style6.style.fontFamily = 'Blackops';
    style7.style.fontFamily = 'Bungee';
    style8.style.fontFamily = 'Caveat';
    style9.style.fontFamily = 'Cinzel';
    style10.style.fontFamily = 'Dance';
    style11.style.fontFamily = 'DelaGothic';
    style12.style.fontFamily = 'Fredoka';
    style13.style.fontFamily = 'RussoOne';
    style14.style.fontFamily = 'Tourney';
    style15.style.fontFamily = 'BungeeS';
  }, []);

  useEffect(() => {
    // return () => {
    localStorage.setItem('initialDesign', miniature);
    console.log('unmount');
    // };
  });

  const firstUpdate = useRef(true);

  // useLayoutEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }

  //   setMiniature(editorJs.getMiniature());
  // });

  const addText = () => {
    editorJs.addText();
  };

  const addPng = img => {
    editorJs.getImgPolaroid(img);
  };

  const deleteSelected = () => {
    editorJs.removeSelected();
  };

  const setCanvasBackground = bgColor => {
    editorJs.setCanvasFill(bgColor);
  };

  const setFontColor = color => {
    editorJs?.setFontColor(color);
  };

  const setFontFamily = fontFamily => {
    editorJs?.setFontFamily(fontFamily);
  };

  const addImage = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      editorJs.addImageOnCanvas(data);
    };
    reader.readAsDataURL(file);
  };

  const undo = () => {
    editorJs.undo();
  };

  const redo = () => {
    editorJs.redo();
  };

  const cropImage = () => {
    editorJs.cropImage();
    setCropDoneButton(true);
  };

  const cropImageDone = () => {
    editorJs.cropImageDone();
    setCropDoneButton(false);
  };

  const handleExportButton = () => {
    const editorState = editorJs.exportCanvas();
    exportBase64(editorState);
  };

  const handleControlsToggle = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');

    smileyControls.hidden = smileyControls.hidden == true ? false : true;
    fontControls.hidden = true;
    imageControls.hidden = true;
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      style={{ marginLeft: '10px' }}
    >
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="h3" align="center">
          Create Your Design Here
        </Typography>
      </Grid>
      <Grid
        item
        md={12}
        spacing={1}
        sm={12}
        xs={12}
        className={classes.canvasContainer}
      >
        <Grid container spacing={1}>
          <Grid item md={2} sm={2} xs={2}>
            <Smileys addPng={addPng} />
            <FontControls
              setFontColor={setFontColor}
              setFontFamily={setFontFamily}
            />
            <div id="crop-image-button" hidden>
              <Button
                variant="contained"
                onClick={cropImage}
                className={`${classes.crop} ${classes.button}`}
              >
                Crop
              </Button>
            </div>
            {cropDoneButton && (
              <Button
                variant="contained"
                onClick={cropImageDone}
                id="crop-image-done-button"
                hidden
                className={`${classes.cropDone} ${classes.button}`}
              >
                Done
              </Button>
            )}
          </Grid>
          <Grid
            item
            md={8}
            xs={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card className={`${classes.editor} fabric-canvas-wrapper`}>
              <CanvasEditor
                onReady={editorJs.onReady}
                class="fabric-canvas-wrapper"
              />
            </Card>
          </Grid>
          <Grid item md={2} sm={1} xs={2}>
            <ColorPallete setCanvasBackground={setCanvasBackground} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={2} className={classes.controlsContainer}>
          <Grid
            md={12}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <div className={classes.miniatureContaienr}>
              <img src={ShirtSVG} className={classes.shirtImage} />
              <canvas
                id="static"
                width="50"
                height="50"
                className={classes.miniature}
              ></canvas>
            </div>
          </Grid>
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={8} sm={12} xs={12}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              alignContent="center"
              className={classes.buttonContainer}
            >
              <Button
                variant="contained"
                onClick={undo}
                className={`${classes.undo} ${classes.button}`}
              >
                <Undo />
              </Button>
              <Button
                variant="contained"
                onClick={redo}
                className={`${classes.redo} ${classes.button}`}
              >
                <Redo />
              </Button>

              <Button
                variant="contained"
                onClick={addText}
                className={`${classes.addText} ${classes.button}`}
              >
                Text
              </Button>
              <Button
                variant="contained"
                onClick={handleControlsToggle}
                className={`${classes.smileys} ${classes.button}`}
              >
                Smileys
              </Button>
              <Button
                variant="contained"
                component="label"
                className={`${classes.imageUpload} ${classes.button}`}
              >
                Image
                <input
                  type="file"
                  hidden
                  onChange={e => addImage(e)}
                  accept="image/png, image/jpeg"
                />
              </Button>
              <Button
                onClick={deleteSelected}
                variant="contained"
                color="error"
                className={`${classes.delete} ${classes.button}`}
              >
                <Delete />
              </Button>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12}></Grid>
          <Grid
            item
            md={12}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={handleExportButton} variant="contained">
              Export
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={1}>
        <div style={{ height: '1px', width: '1px' }}>
          <span id="style1"></span>
          <span id="style2"> </span>
          <span id="style3"> </span>
          <span id="style4"> </span>
          <span id="style5"> </span>
          <span id="style6"> </span>
          <span id="style7"> </span>
          <span id="style8"> </span>
          <span id="style9"> </span>
          <span id="style10"> </span>
          <span id="style11"> </span>
          <span id="style12"> </span>
          <span id="style13"> </span>
          <span id="style14"> </span>
          <span id="style15"> </span>
        </div>
      </Grid>
      <Grid>{/* <canvas id="static" width="50" height="50"></canvas> */}</Grid>
    </Grid>
  );
};

export default Editor;
