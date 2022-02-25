import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, Card, Grid, Stack, Typography, Input, Avatar, Modal, Paper } from '@mui/material';
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
import ColorPng from '../../assets/images/color.png';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  CANVAS_WIDTH_DESKTOP,
  CANVAS_HEIGHT_DESKTOP,
  CANVAS_WIDTH_MOBILE,
  CANVAS_HEIGHT_MOBILE,
} from '../../configs/const';
const useStyles = makeStyles(theme => ({
  editor: {
    width: CANVAS_WIDTH_DESKTOP,
    height: CANVAS_HEIGHT_DESKTOP,
    [theme.breakpoints.down('sm')]: {
      width: CANVAS_WIDTH_MOBILE,
      height: CANVAS_HEIGHT_MOBILE,
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
  colorModal: {
    position: 'absolute',
    top: '280px',
    left: '62%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '170px',
    padding: '8px 8px',
    backgroundColor: '#fff',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      width: '120px',
      top: '110px',
      left: '84%',
    },
  },
  crop_and_done: {
    position: 'absolute',
    top: '280px',
    left: '62%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      top: '110px',
      left: '90%',
    },
  },
  closeColorModal: {
    cursor: 'pointer',
    position: 'absolute',
    top: '-10px',
    right: '-4px',
    opacity: '0.8',
  },

  SmileyModal: {
    position: 'absolute',
    top: '280px',
    left: '62%',
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

const Editor = forwardRef((props, ref) => {
  const { triggerExport = 0, canvasJSON, saveEditDesign, designName } = props;

  const classes = useStyles();

  const editorJs = useEditor();
  const [toggleSmileys, setToggleSmileys] = useState(false);
  const [toggleFontControls, setToggleFontControls] = useState(false);
  const [miniature, setMiniature] = useState();
  const [openColorModal, setOpenColorModal] = useState(false);

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
  const handleTextControls = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');

    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    imageControls.hidden = true;
  };
  const addText = () => {
    editorJs.addText();
    handleTextControls();
  };

  const addPng = img => {
    editorJs.getImgPolaroid(img);
  };

  const deleteSelected = () => {
    editorJs.removeSelected();
  };

  const setCanvasBackground = bgColor => {
    console.log('call color');
    editorJs.setCanvasFill(bgColor);
  };
  const setCavasTextureImage = imgUrl => {
    console.log('call textue', imgUrl);
    editorJs.setCanvasImage(imgUrl);
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
    const backgroundControl = document.getElementById('background-button');

    smileyControls.hidden = smileyControls.hidden == true ? false : true;
    fontControls.hidden = true;
    imageControls.hidden = true;
    backgroundControl.hidden = true;
  };

  const handleOpenColorModal = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');

    backgroundControl.hidden = !backgroundControl.hidden;
    smileyControls.hidden = true;
    fontControls.hidden = true;
    imageControls.hidden = true;
  };

  const handleImageControl = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');

    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    fontControls.hidden = true;
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ marginLeft: '10px' }}>
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="h3" align="center">
          Create Your Design
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className={classes.canvasContainer}>
        <Grid container spacing={{ xs: 0, sm: 0, md: 1 }}>
          <Grid
            item
            md={10}
            xs={12}
            sm={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'relative' }}
          >
            <div id="background-button" hidden>
              <Paper elevation={5} className={classes.colorModal}>
                <CancelOutlinedIcon
                  fontSize="small"
                  className={classes.closeColorModal}
                  onClick={() => setOpenColorModal(false)}
                />
                <ColorPallete
                  setCanvasBackground={setCanvasBackground}
                  setCavasTextureImage={setCavasTextureImage}
                />
              </Paper>
            </div>
            <div id="smileyContainer" hidden className={classes.SmileyModal}>
              <Smileys addPng={addPng} />
            </div>
            <div id="textControls" hidden>
              <FontControls
                setFontColor={setFontColor}
                setFontFamily={setFontFamily}
                handleTextEditingFinished={handleTextEditingFinished}
              />
            </div>
            <div id="crop-image-button" hidden>
              <Button
                variant="contained"
                onClick={cropImage}
                className={`${classes.crop_and_done} ${classes.button}`}
              >
                Crop
              </Button>
            </div>

            <div id="crop-image-done-button" hidden>
              <Button
                variant="contained"
                onClick={cropImageDone}
                className={`${classes.crop_and_done} ${classes.button}`}
              >
                Done
              </Button>
            </div>
            <Card className={`${classes.editor} fabric-canvas-wrapper`}>
              <CanvasEditor
                onReady={editorJs.onReady}
                class="fabric-canvas-wrapper"
                canvasJSON={canvasJSON}
                designName={designName}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={1} className={classes.controlsContainer}>
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
              onClick={handleImageControl}
            >
              Image
              <input
                type="file"
                hidden
                onChange={e => addImage(e)}
                onClick={event => {
                  event.target.value = null;
                }}
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
              variant="contained"
              onClick={handleOpenColorModal}
              className={`${classes.button}`}
            >
              <Avatar src={ColorPng} style={{ height: '25px', width: '25px' }} />
            </Button>

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
