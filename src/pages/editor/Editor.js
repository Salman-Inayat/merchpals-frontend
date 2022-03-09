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
import FrontShirtSVG from '../../assets/images/gray-front-tshirt.svg';
import BackShirtSVG from '../../assets/images/gray-back-tshirt.svg';
import SmileySVG from '../../assets/images/svgs/smiley.svg';
import RedoSVG from '../../assets/images/svgs/redo.svg';
import UndoSVG from '../../assets/images/svgs/undo.svg';
import BackSVG from '../../assets/images/svgs/Back1.svg';
import ColorSVG from '../../assets/images/svgs/colorP1.svg';
import GreyXSVG from '../../assets/images/svgs/greyX.svg';
import ImageSVG from '../../assets/images/svgs/imagea1.svg';
import ShapeSVG from '../../assets/images/svgs/shapeA1.svg';
import TextSVG from '../../assets/images/svgs/t5.svg';
import CircleSVG from '../../assets/images/svgs/previewCircle.svg';
import SquareSVG from '../../assets/images/svgs/previewSquare.svg';
import TriangleSVG from '../../assets/images/svgs/previewTriangle.svg';

import ColorPng from '../../assets/images/color.png';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  CANVAS_WIDTH_DESKTOP,
  CANVAS_HEIGHT_DESKTOP,
  CANVAS_WIDTH_MOBILE,
  CANVAS_HEIGHT_MOBILE,
} from '../../configs/const';
import {
  updateFrontCanvasShape,
  updateBackCanvasShape,
  updateCanvasMode,
} from '../../store/redux/actions/canvas';
import { clearDesign } from '../../store/redux/actions/design';
import { useDispatch, useSelector } from 'react-redux';
import Shapes from './Shapes';

const useStyles = makeStyles(theme => ({
  editor: {
    width: CANVAS_WIDTH_DESKTOP,
    height: CANVAS_HEIGHT_DESKTOP,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: CANVAS_WIDTH_MOBILE,
      height: CANVAS_HEIGHT_MOBILE,
    },
  },
  canvasElement: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      // order: 3,
      // position: 'fixed',
      // bottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      // padding: '0rem 1rem',
      justifyContent: 'space-around',
      // padding: '0 6%',
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
  buttonRowContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  PopUpModel: {
    position: 'absolute',
    top: '23%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    height: '145px',
    padding: '8px 4px',
    backgroundColor: '#fff',
    zIndex: '1',
    width: '115px',
    [theme.breakpoints.down('sm')]: {
      left: '42%',
    },
  },
  colorModel: {
    height: '93px',
    top: '11%',
    [theme.breakpoints.down('sm')]: {
      height: '98px',
    },
  },
  shapeModal: {
    height: '70px',
  },
  SmileyModal: {
    height: '108px',
    top: '13%',

    [theme.breakpoints.down('sm')]: {
      top: '9%',
      height: '85px',
    },
  },
  cropDone: {
    width: '88px',
    height: '56px',
    top: '0%',
    left: '50%',
  },
  fontModal: {
    width: '120px',
  },
  closeColorModal: {
    cursor: 'pointer',
    position: 'absolute',
    top: '-13px',
    left: '90%',
    [theme.breakpoints.down('sm')]: {
      left: '86%',
    },
  },

  frontBack: {
    backgroundColor: '#E7E9EB',
    padding: '2px 3px',
    // margin: '24px 10px 0px 10px',
    borderRadius: '10px',
  },
}));

const Editor = forwardRef((props, ref) => {
  const {
    triggerExport = 0,
    frontCanvasJSON,
    backCanvasJSON,
    saveEditDesign,
    designName,
    title,
  } = props;
  const canvasShape = useSelector(state => state.canvas.shape);
  const frontCanvasShape = useSelector(state => state.canvas.frontShape);
  const backCanvasShape = useSelector(state => state.canvas.backShape);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [toggleSmileys, setToggleSmileys] = useState(false);
  const [toggleFontControls, setToggleFontControls] = useState(false);
  const [miniature, setMiniature] = useState();
  const [openColorModal, setOpenColorModal] = useState(false);
  const [canvasMode, setCanvasMode] = useState('front');

  const editorJs = useEditor('front');
  const backEditorJs = useEditor('back');

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

  const MINUTE_MS = 500;

  useEffect(() => {
    handleBlankCanvas();
  }, []);

  useEffect(() => {
    handleBlankCanvas();
  }, [canvasMode]);

  const handleBlankCanvas = () => {
    var canvas = document.getElementById(`${canvasMode}-canvas`);
    var span = document.getElementById(`${canvasMode}-canvas-placeholder`);
    const interval = setInterval(() => {
      if (isCanvasBlank(canvas)) {
        span.hidden = false;
      } else {
        span.hidden = true;
      }
    }, MINUTE_MS);

    return () => clearInterval(interval);
  };

  const isCanvasBlank = canvas => {
    // console.log('call canvass');
    const context = canvas.getContext('2d');

    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
    );
    // console.log('canvas', !pixelBuffer.some(color => color !== 0));
    return !pixelBuffer.some(color => color !== 0);
  };

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
    if (canvasMode === 'front') {
      editorJs.addText();
    } else {
      backEditorJs.addText();
    }
    handleTextControls();
  };

  const addPng = img => {
    if (canvasMode === 'front') {
      editorJs.getImgPolaroid(img);
    } else {
      backEditorJs.getImgPolaroid(img);
    }
  };

  const deleteSelected = () => {
    if (canvasMode === 'front') {
      editorJs.removeSelected();
    } else {
      backEditorJs.removeSelected();
    }
  };

  const setCanvasBackground = bgColor => {
    if (canvasMode === 'front') {
      editorJs.setCanvasFill(bgColor);
    } else {
      backEditorJs.setCanvasFill(bgColor);
    }
  };

  const setCavasBackgroundImage = imgUrl => {
    if (canvasMode === 'front') {
      editorJs.setCanvasImage(imgUrl);
    } else {
      backEditorJs.setCanvasImage(imgUrl);
    }
  };

  const setFontColor = color => {
    if (canvasMode === 'front') {
      editorJs?.setFontColor(color);
    } else {
      backEditorJs?.setFontColor(color);
    }
  };

  const setFontFamily = fontFamily => {
    if (canvasMode === 'front') {
      editorJs?.setFontFamily(fontFamily);
    } else {
      backEditorJs?.setFontFamily(fontFamily);
    }
  };

  const exportCanvas = () => {
    editorJs.exportCanvas('front');
    backEditorJs.exportCanvas('back');
  };

  const addImage = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      if (canvasMode === 'front') {
        editorJs.addImageOnCanvas(data);
      } else {
        backEditorJs.addImageOnCanvas(data);
      }
    };
    reader.readAsDataURL(file);
  };

  const undo = () => {
    if (canvasMode === 'front') {
      editorJs.undo();
    } else {
      backEditorJs.undo();
    }
  };

  const redo = () => {
    if (canvasMode === 'front') {
      editorJs.redo();
    } else {
      backEditorJs.redo();
    }
  };

  const cropImage = () => {
    if (canvasMode === 'front') {
      editorJs.cropImage();
    } else {
      backEditorJs.cropImage();
    }
  };

  const cropImageDone = () => {
    if (canvasMode === 'front') {
      editorJs.cropImageDone();
    } else {
      backEditorJs.cropImageDone();
    }
  };

  const handleExportButton = () => {
    const editorState =
      canvasMode === 'front' ? editorJs.exportCanvas() : backEditorJs.exportCanvas();
  };

  const handleTextEditingFinished = () => {
    if (canvasMode === 'front') {
      editorJs.finishTextEditing();
    } else {
      backEditorJs.finishTextEditing();
    }
  };
  const handleTextControls = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = true;
    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    imageControls.hidden = true;
  };
  const handleShapeControls = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = shapeControl.hidden === true ? false : true;
    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    imageControls.hidden = true;
  };
  const handleSmileyControlsToggle = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = true;
    smileyControls.hidden = smileyControls.hidden === false ? true : false;
    fontControls.hidden = true;
    imageControls.hidden = true;
    backgroundControl.hidden = true;
  };

  const handleOpenColorModal = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = true;
    backgroundControl.hidden = backgroundControl.hidden === false ? true : false;
    smileyControls.hidden = true;
    fontControls.hidden = true;
    imageControls.hidden = true;
  };
  const handleCloseColorModal = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = true;
    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    fontControls.hidden = true;
    imageControls.hidden = true;
  };

  const handleImageControl = () => {
    const smileyControls = document.getElementById('smileyContainer');
    const fontControls = document.getElementById('textControls');
    const imageControls = document.getElementById('crop-image-button');
    const backgroundControl = document.getElementById('background-button');
    const shapeControl = document.getElementById('shape-button');

    shapeControl.hidden = true;
    backgroundControl.hidden = true;
    smileyControls.hidden = true;
    fontControls.hidden = true;
  };

  const addShape = value => {
    switch (canvasMode) {
      case 'front':
        dispatch(updateFrontCanvasShape(value));
        break;
      case 'back':
        dispatch(updateBackCanvasShape(value));
        break;
      default:
        break;
    }
  };

  const toggleFrontCanvas = () => {
    setCanvasMode('front');

    dispatch(updateCanvasMode('front'));
  };

  const toggleBackCanvas = () => {
    setCanvasMode('back');
    dispatch(updateCanvasMode('back'));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={12} sm={12} xs={12}>
        <Typography variant="h3" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className={classes.canvasContainer}>
        <Grid container spacing={{ xs: 0, sm: 0, md: 1 }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ padding: '0px' }}
          >
            {/* <Card
              className={`${classes.editor} fabric-canvas-wrapper`}
              style={{
                borderRadius:
                  frontCanvasShape === 'triangle' || backCanvasShape === 'triangle'
                    ? '0px'
                    : '1rem',
              }}
            > */}
            <div hidden={canvasMode === 'front' ? false : true} id="front-canvas-container">
              <CanvasEditor
                onReady={editorJs.onReady}
                class="front-canvas-wrapper"
                canvasJSON={frontCanvasJSON}
                designName={designName}
                canvasMode={canvasMode}
              />
            </div>

            <div hidden={canvasMode === 'back' ? false : true} id="back-canvas-container">
              <CanvasEditor
                onReady={backEditorJs.onReady}
                class="back-canvas-wrapper"
                canvasJSON={backCanvasJSON}
                designName={designName}
                canvasMode={canvasMode}
              />
            </div>
            {/* </Card> */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <Grid container className={classes.controlsContainer}>
          {/* <Stack direction="row" alignItems="center" className={classes.buttonContainer}></Stack> */}
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
              onClick={handleOpenColorModal}
              className={`${classes.button}`}
            >
              <Avatar src={ColorSVG} style={{ height: '25px', width: '25px' }} />
            </Button>

            <Button
              variant="contained"
              onClick={addText}
              className={`${classes.addText} ${classes.button}`}
            >
              <Avatar src={TextSVG} style={{ height: '25px', width: '25px' }} />
            </Button>
            <Button
              variant="contained"
              onClick={handleSmileyControlsToggle}
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
              <img src={ImageSVG} style={{ height: '25px', width: '25px' }} />
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
            spacing={3}
            alignItems="center"
            className={classes.buttonContainer}
          >
            {/* <Grid item md={12} sm={12} xs={12}> */}
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.frontBack}
            >
              <Button
                variant="contained"
                onClick={() => toggleFrontCanvas()}
                className={`${classes.button}`}
                style={{
                  backgroundColor: canvasMode === 'front' ? '#fff' : 'transparent',
                  minWidth: '75px',
                  boxShadow: 'none',
                }}
              >
                Front
              </Button>
              <Button
                variant="contained"
                onClick={() => toggleBackCanvas()}
                className={`${classes.button}`}
                style={{
                  backgroundColor: canvasMode === 'back' ? '#fff' : 'transparent',
                  minWidth: '75px',

                  boxShadow: 'none',
                }}
              >
                Back
              </Button>
            </Stack>
            {/* </Grid> */}
            {/* <Grid item display="flex" justifyContent="center" alignItems="center"> */}

            <div className={classes.miniatureContaienr}>
              <img
                src={FrontShirtSVG}
                className={classes.shirtImage}
                style={{
                  display: canvasMode === 'front' ? 'block' : 'none',
                }}
              />
              <img
                src={BackSVG}
                className={classes.shirtImage}
                style={{
                  display: canvasMode === 'front' ? 'none' : 'block',
                }}
              />
              {canvasMode === 'front' ? (
                <span id="front-canvas-placeholder">
                  <img
                    src={
                      canvasMode === 'front' && frontCanvasShape === 'circle'
                        ? CircleSVG
                        : canvasMode === 'front' && frontCanvasShape === 'triangle'
                        ? TriangleSVG
                        : SquareSVG
                    }
                    style={{
                      height: '60px',
                      width: '60px',
                      position: 'absolute',
                      top: '20%',
                      left: '31%',
                      zIndex: '10',
                      color: 'white',
                    }}
                  />
                </span>
              ) : (
                <span id="back-canvas-placeholder">
                  <img
                    src={
                      canvasMode === 'back' && backCanvasShape === 'circle'
                        ? CircleSVG
                        : canvasMode === 'back' && backCanvasShape === 'triangle'
                        ? TriangleSVG
                        : SquareSVG
                    }
                    style={{
                      height: '60px',
                      width: '60px',
                      position: 'absolute',
                      top: '20%',
                      left: '31%',
                      zIndex: '10',
                      color: 'white',
                    }}
                  />
                </span>
              )}

              <canvas
                hidden={canvasMode === 'front' ? false : true}
                id="front-canvas-preview"
                width="50"
                height="50"
                className={classes.miniature}
              ></canvas>
              <canvas
                hidden={canvasMode === 'back' ? false : true}
                id="back-canvas-preview"
                width="50"
                height="50"
                className={classes.miniature}
              ></canvas>
            </div>
            {/* </Grid> */}
          </Stack>

          <Stack
            direction="column"
            spacing={3}
            alignItems="center"
            className={classes.buttonContainer}
            sx={{ position: 'relative' }}
          >
            <Button
              variant="contained"
              onClick={handleShapeControls}
              className={`${classes.addText} ${classes.button}`}
            >
              <Avatar src={ShapeSVG} style={{ height: '25px', width: '25px' }} />
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={undo}
              className={`${classes.undo} ${classes.button}`}
            >
              <Avatar src={UndoSVG} style={{ height: '25px', width: '25px' }} />
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={redo}
              className={`${classes.redo} ${classes.button}`}
            >
              <Avatar src={RedoSVG} style={{ height: '25px', width: '25px' }} />
            </Button>
            <Button
              onClick={deleteSelected}
              variant="contained"
              className={`${classes.delete} ${classes.button}`}
            >
              <Delete />
            </Button>

            <Paper
              elevation={5}
              className={`${classes.PopUpModel} ${classes.shapeModal}`}
              id="shape-button"
              hidden
            >
              <img
                src={GreyXSVG}
                style={{ height: '25px', width: '20px' }}
                className={classes.closeColorModal}
                onClick={handleCloseColorModal}
              />
              <Shapes addShape={addShape} />
            </Paper>
            <Paper
              elevation={5}
              className={`${classes.PopUpModel} ${classes.colorModel}`}
              id="background-button"
              hidden
            >
              <img
                src={GreyXSVG}
                style={{ height: '25px', width: '20px' }}
                className={classes.closeColorModal}
                onClick={handleCloseColorModal}
              />

              <ColorPallete
                setCanvasBackground={setCanvasBackground}
                setCavasBackgroundImage={setCavasBackgroundImage}
              />
            </Paper>

            <Paper
              elevation={5}
              id="smileyContainer"
              hidden
              className={`${classes.PopUpModel} ${classes.SmileyModal}`}
            >
              <img
                src={GreyXSVG}
                style={{ height: '25px', width: '20px' }}
                className={classes.closeColorModal}
                onClick={handleCloseColorModal}
              />
              <Smileys addPng={addPng} />
            </Paper>

            <Paper
              elevation={5}
              id="textControls"
              hidden
              className={`${classes.PopUpModel} ${classes.fontModal}`}
            >
              <img
                src={GreyXSVG}
                style={{ height: '25px', width: '20px' }}
                className={classes.closeColorModal}
                onClick={handleCloseColorModal}
              />
              <FontControls
                setFontColor={setFontColor}
                setFontFamily={setFontFamily}
                handleTextEditingFinished={handleTextEditingFinished}
              />
            </Paper>
            <Paper
              elevation={5}
              id="crop-image-button"
              hidden
              className={`${classes.PopUpModel} ${classes.cropDone}`}
            >
              <img
                src={GreyXSVG}
                style={{ height: '25px', width: '20px' }}
                className={classes.closeColorModal}
                onClick={handleCloseColorModal}
              />
              <Button variant="contained" onClick={cropImage} className={` ${classes.button}`}>
                Crop
              </Button>
            </Paper>
            <Paper
              elevation={5}
              id="crop-image-done-button"
              hidden
              className={`${classes.PopUpModel} ${classes.cropDone}`}
            >
              <Button variant="contained" onClick={cropImageDone} className={`${classes.button}`}>
                Done
              </Button>
            </Paper>
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
