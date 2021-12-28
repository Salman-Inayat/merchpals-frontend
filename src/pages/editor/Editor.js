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
  const canvasRef = useRef(null);

  const editorJs = useEditor('canvas', canvasRef);
  // const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [cropDoneButton, setCropDoneButton] = useState(false);
  const [miniature, setMiniature] = useState('');

  useEffect(() => {
    // editor?.canvas.setWidth('500px');
    // editor?.canvas.setHeight('500px');

    setTimeout(() => {
      var style1 = document.getElementById('style1');
      style1.style.fontFamily = 'Alpha-Slab';
      console.log('Style set', style1);
    }, 1000);

    setTimeout(() => {
      var style2 = document.getElementById('style2');
      style2.style.fontFamily = 'Anton';
      console.log('Style set', style2);
    }, 1000);

    setTimeout(() => {
      var style3 = document.getElementById('style3');
      style3.style.fontFamily = 'Arbutus';
      console.log('Style set', style3);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   setMiniature(editorJs.showMiniature());
  // }, [editorJs]);

  const images = [
    '1.svg',
    '2.svg',
    '3.svg',
    '4.svg',
    '5.svg',
    '6.svg',
    '7.svg',
    '8.svg',
    '9.svg',
    '10.svg',
    '11.svg',
    '12.svg',
    '13.svg',
    '14.svg',
    '15.svg',
    '16.svg',
    '17.svg',
    '18.svg',
    '19.svg',
    '20.svg',

    '21.svg',
    '22.svg',
    '23.svg',
    '24.svg',
    '25.svg',
    '26.svg',
    '27.svg',
    '28.svg',
    '29.svg',
    '30.svg',
    '31.svg',
    '32.svg',
    '33.svg',
    '34.svg',
    '35.svg',
    '36.svg',
    '37.svg',
    '38.svg',
    '39.svg',
    '40.svg',

    '41.svg',
    '42.svg',
    '43.svg',
    '44.svg',
    '45.svg',
    '46.svg',
    '47.svg',
    '48.svg',
    '49.svg',
    '50.svg',
    '51.svg',
    '52.svg',
    '53.svg',
    '54.svg',
    '55.svg',
    '56.svg',
    '57.svg',
    '58.svg',
    '59.svg',
    '60.svg',

    '61.svg',
    '62.svg',
    '63.svg',
    '64.svg',
    '65.svg',
    '66.svg',
    '67.svg',
    '68.svg',
    '69.svg',
    '70.svg',
    '71.svg',
    '72.svg',
    '73.svg',
    '74.svg',
    '75.svg',
    '76.svg',
    '77.svg',
    '78.svg',
    '79.svg',
    '80.svg',

    '81.svg',
    '82.svg',
    '83.svg',
    '84.svg',
    '85.svg',
    '86.svg',
    '87.svg',
    '88.svg',
    '89.svg',
    '90.svg',
    '91.svg',
    '92.svg',
    '93.svg',
    '94.svg',
    '95.svg',
    '96.svg',
    '97.svg',
    '98.svg',
    '99.svg',
    '100.svg',
  ];

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

  return (
    <Grid container spacing={2} alignItems="center">
      <div hidden>
        <p id="style1">P</p>
        <p id="style2">P</p>
        <p id="style3">P</p>
        <p id="style4">P</p>
        <p id="style5">P</p>
        <p id="style6">P</p>
        <p id="style7">P</p>
        <p id="style8">P</p>
        <p id="style9">P</p>
        <p id="style10">P</p>
        <p id="style11">P</p>
        <p id="style12">P</p>
      </div>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Create Your Design Here
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Stack direction="column" className={classes.images}>
          {images.map((oneImage, index) => (
            <img
              src={`/svg-icons/${oneImage}`}
              onClick={() => addPng(`/svg-icons/${oneImage}`)}
              style={{
                width: '100%',
                height: '75px',
                overflow: 'auto',
              }}
              key={index}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Card className={classes.editor}>
          {/* <FabricJSCanvas className={classes.editor} onReady={onReady} /> */}
          {/* <FabricEditor /> */}
          <canvas id="canvas" ref={canvasRef}></canvas>
        </Card>
      </Grid>
      <Grid item xs={1}>
        <ColorPallete
          customClass={classes.colorPallete}
          setCanvasBackground={setCanvasBackground}
        />
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
          <Button variant="contained" component="label">
            Upload a picture
            <input type="file" hidden onChange={e => addImage(e)} />
          </Button>
          <Button onClick={deleteSelected} variant="contained" color="error">
            <Delete />
          </Button>
        </Stack>
      </Grid>
      <Grid>
        <div
        // style="    right: 25px;
        // display: inline-block;
        // text-align: center;
        // position: absolute;
        // "
        // class="width:40%"
        >
          <img src="/assets/img/OGG1.png" className="f-22" />
          <img src={`${miniature}`} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Editor;
