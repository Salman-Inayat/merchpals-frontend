import React, { useEffect, useState, useRef } from 'react';
// import { fabric } from 'fabric';
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Button, Card, Grid, Stack, Typography, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete, Undo, Redo } from '@mui/icons-material';
import { bgcolor, Box } from '@mui/system';
import ColorPallete from './ColorPallete';
import FabricEditor from '../../components/editor/useEditor';
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
  const [miniature, setMiniature] = useState('');

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

    setTimeout(() => {
      style1.style.display = 'none';
      style2.style.display = 'none';
      style3.style.display = 'none';
      style4.style.display = 'none';
      style5.style.display = 'none';
      style6.style.display = 'none';
      style7.style.display = 'none';
      style8.style.display = 'none';
      style9.style.display = 'none';
      style10.style.display = 'none';
      style11.style.display = 'none';
      style12.style.display = 'none';
      style13.style.display = 'none';
      style14.style.display = 'none';
      style15.style.display = 'none';
    }, 10);
  }, []);

  const addText = () => {
    editorJs.addText();
  };

  const addPng = img => {
    editorJs.getImgPolaroid(img);
  };

  const deleteSelected = () => {
    editorJs.removeSelected();
    // editor?.deleteSelected();
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

  const setFontSize = fontSize => {
    editorJs?.setFontSize(fontSize);
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
    // setCropDoneButton(true);
  };

  const cropImageDone = () => {
    editorJs.cropImageDone();
  };

  const handleImageClick = () => {
    const miniature = editorJs.showMiniature();

    return <img src={`${miniature}`} />;
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <div style={{ height: '10px' }}>
        <p id="style1">Paragraph demo</p>
        <p id="style2">Paragraph demo </p>
        <p id="style3">Paragraph demo </p>
        <p id="style4">Paragraph demo </p>
        <p id="style5">Paragraph demo </p>
        <p id="style6">Paragraph demo </p>
        <p id="style7">Paragraph demo </p>
        <p id="style8">Paragraph demo </p>
        <p id="style9">Paragraph demo </p>
        <p id="style10">Paragraph demo </p>
        <p id="style11">Paragraph demo </p>
        <p id="style12">Paragraph demo </p>
        <p id="style13">Paragraph demo </p>
        <p id="style14">Paragraph demo </p>
        <p id="style15">Paragraph demo </p>
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
      <Grid xs={1}>
        <div
        // style="    right: 25px;
        // display: inline-block;
        // text-align: center;
        // position: absolute;
        // "
        // class="width:40%"
        >
          <img
            src="/assets/img/OGG1.png"
            className="f-22"
            style={{
              border: '1px solid black',
              width: '450px',
              height: '100px',
            }}
            onClick={handleImageClick}
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
          {/* {cropDoneButton && ( */}
          <Button
            variant="contained"
            onClick={cropImageDone}
            id="crop-image-done-button"
            hidden
          >
            Done
          </Button>
          {/* )} */}
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
            <input type="file" hidden onChange={e => addImage(e)} />
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
