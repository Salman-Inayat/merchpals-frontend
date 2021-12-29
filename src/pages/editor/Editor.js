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

const useStyles = makeStyles({
  editor: {
    width: '500px',
    height: '500px',
  },
  images: {
    height: '500px',
    overflow: 'scroll',
    display: 'inline-block',
  },
  colorPallete: {
    height: '500px',
    overflow: 'scroll',
    display: 'inline-block',
  },
  bottomButtons: {
    alignItems: 'center',
    alignContent: 'center',
  },
});

const Editor = () => {
  const classes = useStyles();

  const editorJs = useEditor();
  const [toggleSmileys, setToggleSmileys] = useState(false);
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

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setMiniature(editorJs.getMiniature());
  });

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

  return (
    <Grid container spacing={2} alignItems="center">
      <div style={{ height: '10px' }}>
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
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Create Your Design Here
        </Typography>
      </Grid>
      <Grid item xs={1}>
        {toggleSmileys ? (
          <Smileys addPng={addPng} className={classes.images} />
        ) : (
          ''
        )}
      </Grid>
      <Grid item xs={5}>
        <Card className={classes.editor}>
          <CanvasEditor onReady={editorJs.onReady} />
        </Card>
      </Grid>
      <Grid item xs={1}>
        <ColorPallete
          customClass={classes.colorPallete}
          setCanvasBackground={setCanvasBackground}
        />
      </Grid>
      <Grid xs={3}>
        <div
          style={{
            display: 'inline-block',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <img
            src="/assets/img/OGG1.png"
            style={{
              border: '1px solid black',
              width: '350px',
              height: '300px',
              position: 'relative',
              top: '0',
              left: '0',
            }}
          />
          <img
            src={miniature}
            style={{
              position: 'absolute',
              top: '100px',
              left: '120px',
              width: '100px',
              height: '100px',
              border: 'none',
            }}
          />
        </div>
      </Grid>
      <Grid item md={12} xs={2}>
        <FontControls
          setFontColor={setFontColor}
          setFontFamily={setFontFamily}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          alignContent="center"
        >
          <Button variant="contained" onClick={undo}>
            <Undo />
          </Button>
          <Button variant="contained" onClick={redo}>
            <Redo />
          </Button>
          <div id="crop-image-button" hidden>
            <Button variant="contained" onClick={cropImage}>
              Crop Image
            </Button>
          </div>
          {cropDoneButton && (
            <Button
              variant="contained"
              onClick={cropImageDone}
              id="crop-image-done-button"
              hidden
            >
              Done
            </Button>
          )}
          <Button variant="contained" onClick={addText}>
            {' '}
            Add Text{' '}
          </Button>
          <Button
            variant="contained"
            onClick={() => setToggleSmileys(!toggleSmileys)}
          >
            Smileys
          </Button>
          <Button variant="contained" component="label">
            Upload a picture
            <input
              type="file"
              hidden
              onChange={e => addImage(e)}
              accept="image/png, image/jpeg"
            />
          </Button>
          <Button onClick={deleteSelected} variant="contained" color="error">
            <Delete />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Editor;
