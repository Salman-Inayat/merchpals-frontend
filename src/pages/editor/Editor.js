import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, Card, Grid, Stack, Typography, Input, Avatar } from '@mui/material';
import { fabric } from 'fabric';
import { makeStyles } from '@mui/styles';
import { Delete, Undo, Redo } from '@mui/icons-material';
import { bgcolor, Box } from '@mui/system';
import ColorPallete from './ColorPallete';
import useEditor from '../../components/editor/useEditor';
import FontControls from './FontControls';
import CanvasEditor from '../../components/editor/canvasEditor';
import Smileys from './Smileys';
import ShirtSVG from '../../assets/images/gray-tshirt.svg';
import SmileySVG from '../../assets/images/smiley.svg';

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      // order: 3,
      // position: 'fixed',
      // bottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      // padding: '0rem 1rem',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 4%',

    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: '0px',
    },
  },
  button: {
    minWidth: '80px',
    backgroundColor: '#e7e9eb',
    color: '#000',
    boxShadow: '0px 5px 5px rgba(0,0,0,0.2)',
    [theme.breakpoints.down('sm')]: {
      // padding: '6px',
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
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40px',
    height: '40px',
    border: 'none',
  },
}));

const Editor = forwardRef((props, ref) => {
  const { triggerExport = 0, canvasJSON, saveEditDesign } = props;

  const classes = useStyles();

  const editorJs = useEditor();
  const [toggleSmileys, setToggleSmileys] = useState(false);
  const [toggleFontControls, setToggleFontControls] = useState(false);
  const [miniature, setMiniature] = useState();

  const [finalJson, setFinalJson] = useState([]);
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

    // if (isCanvasBlank(canvas)) {
    //   span.hidden = false;
    // } else {
    //   span.hidden = true;
    // }
  }, []);

  const MINUTE_MS = 500;

  useEffect(() => {
    var canvas = document.getElementById('canvas');
    var span = document.getElementById('alt-text');
    const interval = setInterval(() => {
      if (isCanvasBlank(canvas)) {
        span.hidden = false;
      } else {
        span.hidden = true;
      }
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
    );

    return !pixelBuffer.some(color => color !== 0);
  }

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (triggerExport > 0) {
      exportCanvas();
    }
  }, [triggerExport]);

  useImperativeHandle(ref, () => ({
    saveDesign() {
      exportCanvas();
    },
  }));

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

  const exportCanvas = () => {
    editorJs.exportCanvas();
  };

  const exportCanvasToJSON = () => {
    const exportedCanvasJson = editorJs.saveCanvasToJSON();
    return exportedCanvasJson;
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
  };

  const cropImageDone = () => {
    editorJs.cropImageDone();
  };

  const handleExportButton = () => {
    const editorState = editorJs.exportCanvas();
  };

  const handleTextEditingFinished = () => {
    editorJs.finishTextEditing();
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
    <Grid container spacing={2} alignItems="center" style={{ marginLeft: '10px' }}>
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="h3" align="center">
          Create Your Design
        </Typography>
      </Grid>
      <Grid item md={12} spacing={1} sm={12} xs={12} className={classes.canvasContainer}>
        <Grid container spacing={{ xs: 0, sm: 0, md: 1 }}>
          <Grid item md={2} sm={3} xs={3}>
            <Smileys addPng={addPng} />
            <FontControls
              setFontColor={setFontColor}
              setFontFamily={setFontFamily}
              handleTextEditingFinished={handleTextEditingFinished}
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

            <div id="crop-image-done-button" hidden>
              <Button
                variant="contained"
                onClick={cropImageDone}
                className={`${classes.cropDone} ${classes.button}`}
              >
                Done
              </Button>
            </div>
          </Grid>
          <Grid
            item
            md={8}
            xs={6}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card className={`${classes.editor} fabric-canvas-wrapper`}>
              <CanvasEditor
                onReady={editorJs.onReady}
                class="fabric-canvas-wrapper"
                canvasJSON={canvasJSON}
              />
            </Card>
          </Grid>
          <Grid item md={2} sm={3} xs={3}>
            <ColorPallete setCanvasBackground={setCanvasBackground} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container md={12} sm={12} xs={12} spacing={1} className={classes.controlsContainer}>
          <Stack
            direction="column"
            spacing={3}
            // justifyContent="center"
            alignItems="center"
            // alignContent="center"
            className={classes.buttonContainer}
          >
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
              <Avatar src={SmileySVG} style={{ height: '25px', width: '25px' }} />
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
          </Stack>
          <Stack
            direction="column"
            // spacing={4}
            // justifyContent="center"
            alignItems="center"
            // alignContent="center"
            className={classes.buttonContainer}
          >
            <Grid item display="flex" justifyContent="center" alignItems="center">
              <div className={classes.miniatureContaienr}>
                <img src={ShirtSVG} className={classes.shirtImage} />
                <span
                  id="alt-text"
                  style={{
                    height: '50px',
                    width: '50px',
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid white',
                  }}
                ></span>
                <canvas id="static" width="50" height="50" className={classes.miniature}></canvas>
              </div>
            </Grid>
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            alignItems="center"
            className={classes.buttonContainer}
          >
            <Button
              size="small"
              variant="contained"
              onClick={undo}
              className={`${classes.undo} ${classes.button}`}
            >
              Undo
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={redo}
              className={`${classes.redo} ${classes.button}`}
            >
              Redo
            </Button>
            <Button
              onClick={deleteSelected}
              variant="contained"
              className={`${classes.delete} ${classes.button}`}
            >
              <Delete />
            </Button>
          </Stack>
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
});

export default Editor;
