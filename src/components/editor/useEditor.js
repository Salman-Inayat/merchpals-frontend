import { fabric } from 'fabric';
import 'fabric-history';
import * as changedpi from 'changedpi';
import { initAligningGuidelines } from './gridlines/alignment';
import { initCenteringGuidelines } from './gridlines/center';
import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { SAVE_FRONT_DESIGN, SAVE_BACK_DESIGN } from '../../store/redux/types';
import { fill } from 'lodash';
import { clearDesign } from '../../store/redux/actions/design';

import {
  CANVAS_WIDTH_DESKTOP,
  CANVAS_HEIGHT_DESKTOP,
  CANVAS_WIDTH_MOBILE,
  CANVAS_HEIGHT_MOBILE,
  CANVAS_WIDTH_TABLET,
  CANVAS_HEIGHT_TABLET,
} from '../../configs/const';

const useEditor = mode => {
  const canvasShape = useSelector(state =>
    mode === 'front' ? state.canvas.frontShape : state.canvas.backShape,
  );
  const canvasMode = useSelector(state => state.canvas.mode);

  let [canvas, setCanvas] = useState();
  let [canvasJSON, setCanvasJSON] = useState();
  let [canvasName, setCanvasName] = useState();
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  let isDesktop = useMediaQuery({ minWidth: 992 });
  let isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  let isMobile = useMediaQuery({ maxWidth: 767 });

  const size = {
    width: CANVAS_WIDTH_DESKTOP,
    height: CANVAS_HEIGHT_DESKTOP,
  };
  const sizeMobile = {
    width: CANVAS_WIDTH_MOBILE,
    height: CANVAS_HEIGHT_MOBILE,
  };

  const sizeTablet = {
    width: CANVAS_WIDTH_TABLET,
    height: CANVAS_HEIGHT_TABLET,
  };

  let canvasProperties = {
    canvasFill: '#ffffff',
    canvasImage: '',
    id: null,
    opacity: null,
    fill: null,
    fontSize: null,
    lineHeight: null,
    charSpacing: null,
    fontWeight: null,
    fontStyle: null,
    textAlign: null,
    fontFamily: 'Alpha-Slab',
    TextDecoration: '',
  };

  let json;
  let globalEditor = false;
  let textEditor = false;
  let imageEditor = false;
  let figureEditor = false;
  let selected;
  let state = [];
  let mods = 0;
  let textSelection;
  let url = '';

  const [c2, setC2] = useState();
  const [ctx2, setCtx2] = useState();
  const firstUpdate = useRef(true);

  const applyProperties = selectedObject => {
    selectedObject.hasRotatingPoint = true;
    selectedObject.transparentCorners = false;
    selectedObject.cornerColor = 'white';
    selectedObject.cornerStyle = 'circle';
    selectedObject.transparentCorners = false;
    selectedObject.cornerStrokeColor = '#116dff';
    selectedObject.padding = 5;
    selectedObject.cornerSize = 30;
    selectedObject.rotatingPointOffset = 30;
    selectedObject.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      br: true,
      tl: false,
      tr: false,
      mtr: true,
    });

    if (selectedObject.type === 'textbox') {
      selectedObject.setControlsVisibility({
        mr: true,
      });
    }

    if (selectedObject.type === 'rect') {
      selectedObject.cornerStyle = 'rect';
      selectedObject.cornerSize = 15;
      (selectedObject.cornerColor = 'blue'),
        selectedObject.setControlsVisibility({
          mt: true,
          mb: true,
          ml: true,
          mr: true,
          bl: false,
          br: false,
          tl: false,
          tr: false,
          mtr: false,
        });
    }
  };

  useEffect(() => {
    setC2(document.getElementById(`${mode}-canvas-preview`));
    var ctx = document.getElementById(`${mode}-canvas-preview`).getContext('2d');
    setCtx2(ctx);
    setCounter(counter + 1);
  }, []);

  const updateShape = () => {
    const canvasWrapper = document.getElementById(`${mode}-canvas-wrapper`);
    const canvasContainer = document.getElementById(`${mode}-canvas-container`);

    const circle = new fabric.Circle({
      radius: isMobile ? CANVAS_HEIGHT_MOBILE / 2 : CANVAS_WIDTH_DESKTOP / 2,
    });

    const rect = new fabric.Rect({
      width: CANVAS_WIDTH_DESKTOP,
      height: CANVAS_HEIGHT_DESKTOP,
    });

    const p1 = { left: 0, top: 0 };
    const p2 = { left: canvas.width, top: 0 };
    const p3 = { left: canvas.width / 2, top: canvas.height };

    const triangle = new fabric.Polygon([
      { x: p1.left, y: p1.top },
      { x: p2.left, y: p2.top },
      { x: p3.left, y: p3.top },
    ]);

    const canvasClipPaths = [
      'circle(225px at center)',
      'none',
      'polygon(0px 0px, 450px 0px, 225px 450px)',
    ];

    const previewClipPaths = ['circle(20px at center)', 'none', 'polygon(0 0, 100% 0, 50% 100%)'];

    let json;

    switch (canvasShape) {
      case 'circle':
        canvasContainer.style.removeProperty('padding');
        canvasContainer.style.removeProperty('height');
        canvasContainer.style.removeProperty('width');
        canvasContainer.style.removeProperty('position');
        canvasContainer.style.removeProperty('background');
        canvasContainer.style.removeProperty('clip-path');

        canvas.clipPath = circle;
        json = JSON.stringify(canvas);

        canvas.renderAll();

        c2.style.clipPath = previewClipPaths[0];
        canvasContainer.style.borderRadius = '50%';

        canvasWrapper.style.clipPath = canvasClipPaths[0];

        break;
      case 'square':
        canvasContainer.style.removeProperty('padding');
        canvasContainer.style.removeProperty('position');
        canvasContainer.style.removeProperty('background');
        canvasContainer.style.removeProperty('clip-path');

        canvasWrapper.style.clipPath = canvasClipPaths[1];
        canvas.clipPath = rect;
        json = JSON.stringify(canvas);

        canvas.renderAll();

        c2.style.clipPath = previewClipPaths[1];
        canvasContainer.style.borderRadius = '5px';
        canvasContainer.style.border = '2px solid #000';
        break;
      case 'triangle':
        canvasContainer.style.removeProperty('border');

        canvas.clipPath = triangle;
        json = JSON.stringify(canvas);

        canvas.renderAll();

        c2.style.clipPath = previewClipPaths[2];

        canvasContainer.style.clipPath = 'polygon(0px 0px, 454px 0px, 227px 454px)';
        canvasContainer.style.background = 'black';
        canvasContainer.style.padding = '0';
        canvasContainer.style.height = '454px';
        canvasContainer.style.width = '454px';
        canvasContainer.style.position = 'relative';

        canvasWrapper.style.clipPath = canvasClipPaths[2];
        canvasWrapper.style.background = '#fff';
        canvasWrapper.style.position = 'absolute';
        canvasWrapper.style.top = '2px';
        canvasWrapper.style.left = '2px';
        break;
      default:
        canvas.clipPath = rect;
        break;
    }

    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
  };

  const loadJson = (canvas, json) => {
    console.log('loading json');
    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (o, object) {
      canvasProperties.canvasFill = canvas.backgroundColor;

      canvas.on({
        'selection:created': function () {
          let selectedObject = canvas.getActiveObject();
          if (selectedObject) {
            applyProperties(selectedObject);
          }
        },
        'object:added': e => {
          const selectedObject = e.target;
          applyProperties(selectedObject);
          localStorage.setItem('design', canvas.toDataURL());
          resetPanels();
        },
      });
    });
    if (canvas.getObjects().length == 0) {
      const text = new fabric.Textbox('s', {
        left: 40,
        top: 100,
        opacity: 0.1,
        fontSize: 5,
        hasControls: false,
        hasRotatingPoint: false,
        lockMovementX: true,
        lockMovementY: true,
      });
      canvas.add(text);
    }
    canvas.renderAll();

    afterRender();
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (canvasJSON) {
      loadJson(canvas, canvasJSON);
      // dispatch(clearDesign());
    }

    updateShape();

    initAligningGuidelines(canvas);
    initCenteringGuidelines(canvas, isMobile);

    canvas.on({
      'object:moving': e => {},
      'object:modified': e => {
        const selectedObject = e.target;

        applyProperties(selectedObject);

        localStorage.setItem('design', canvas.toDataURL());
        afterRender();

        resetPanels();
      },
      'object:added': e => {
        const selectedObject = e.target;
        applyProperties(selectedObject);
        localStorage.setItem('design', canvas.toDataURL());

        afterRender();
        resetPanels();
      },
      'selection:updated': e => {
        const selectedObject = e.target;
        applyProperties(selectedObject);
        // document.getElementById('deleteButton').hidden = false;
        resetPanels();
        if (selectedObject.type !== 'textbox') {
          document.getElementById('textControls').hidden = true;
        }

        if (selectedObject.type === 'textbox') {
          document.getElementById('textControls').hidden = false;
          document.getElementById('smileyContainer').hidden = true;
        }

        if (selectedObject.type !== 'image') {
          document.getElementById('crop-image-button').hidden = true;
        }

        if (selectedObject.type === 'image') {
          document.getElementById('crop-image-button').hidden = false;
        }

        if (selectedObject.type == 'i-text') {
          // textSelection.emit("addText");
          // document.getElementById('textControls').hidden = false;
        } else if (selectedObject.type == 'path' || selectedObject.type == 'group') {
          // textSelection.emit("addsmiley");
        } else if (selectedObject.type == 'image') {
          // // textSelection.emit("image")
        }
      },
      'object:selected': e => {
        const selectedObject = e.target;
        applyProperties(selectedObject);
        resetPanels();

        if (selectedObject.type !== 'group' && selectedObject) {
          getId();
          getOpacity();

          switch (selectedObject.type) {
            case 'rect':
            case 'circle':
            case 'triangle':
              figureEditor = true;
              getFill();
              break;
            case 'i-text':
              // textSelection.emit("addText");
              textEditor = true;
              getLineHeight();
              getCharSpacing();
              getBold();
              getFill();
              getTextDecoration();
              getTextAlign();
              //getFontFamily();

              break;
            case 'image':
              // textSelection.emit("image");
              break;
            case 'path':
              // textSelection.emit("addsmiley");
              break;
          }
        } else if (selectedObject.type == 'group' && selectedObject) {
          // textSelection.emit("addsmiley");
        }
      },
      'selection:created': e => {
        const selectedObject = e.target;
        // document.getElementById('deleteButton').hidden = false;
        if (selectedObject.type === 'textbox') {
          selectedObject.set({
            editable: true,
            cursorWidth: 1,
          });
          document.getElementById('textControls').hidden = false;
          document.getElementById('smileyContainer').hidden = true;
        } else if (selectedObject.type === 'image') {
          document.getElementById('crop-image-button').hidden = false;
          document.getElementById('textControls').hidden = true;
          document.getElementById('smileyContainer').hidden = true;
        }
      },
      'before:selection:cleared': e => {
        if (e.target.type === 'textbox') {
          document.getElementById('textControls').hidden = true;
        } else if (e.target.type === 'image') {
          document.getElementById('crop-image-button').hidden = true;
        }
      },
      'selection:cleared': e => {
        localStorage.setItem('clearLines', 'true');
        // document.getElementById('deleteButton').hidden = true;
        const selectedObject = e.target;
        selected = null;
        resetPanels();
        if (selectedObject == undefined) {
          // textSelection.emit("cleared");
        }
      },
    });

    if (isMobile) {
      canvas.setWidth(sizeMobile.width);
      canvas.setHeight(sizeMobile.height);
    } else if (isTablet) {
      canvas.setWidth(sizeTablet.width);
      canvas.setHeight(sizeTablet.height);
    } else {
      canvas.setWidth(size.width);
      canvas.setHeight(size.height);
    }

    // get references to the html canvas element & its context
    canvas.on('mouse:down', e => {
      const canvasElement = document.getElementById('canvas');
      afterRender();
    });

    canvas.on('mouse:moving', e => {});

    canvas.on({
      'text:editing:entered': e => {
        if (e.target.type === 'textbox') {
          // if (e.target.text === 'Sample Text') {
          //   e.target.text = '';
          //   e.target.hiddenTextarea.value = ''; // NEW
          //   canvas.renderAll();
          // }
        }
      },
      'text:editing:exited': e => {
        const activeObject = canvas.getActiveObject();

        activeObject.set({
          hasControls: true,
          lockMovementX: false,
          lockMovementY: false,
          lockScalingX: false,
          lockScalingY: false,
          lockRotation: false,
          editable: false,
          cursorWidth: 0,
          moveCursor: 'pointer',
        });

        canvas.renderAll();
        document.getElementById('editing-button').hidden = true;
      },
    });
  });

  function copy(copiedCanvas, canvas) {
    if (canvas.backgroundColor === '#ffffff00' || canvas.backgroundColor === '') {
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
    }
    ctx2.drawImage(copiedCanvas, 0, 0);
  }

  function afterRender() {
    var originalVP = canvas.viewportTransform;
    // place the canvas on center of the preview
    if (isMobile) {
      canvas.viewportTransform = [0.14, 0, 0, 0.14, 0, 0];
    } else {
      canvas.viewportTransform = [0.11, 0, 0, 0.11, 0, 0];
    }

    copy(canvas.toCanvasElement(), canvas);
    canvas.viewportTransform = originalVP;
  }

  const undo = () => {
    canvas.undo();
    afterRender();
  };

  const redo = () => {
    canvas.redo();
    afterRender();
  };

  const saveState = () => {
    stateManager.saveState();
    canvas.renderAll();
  };

  const changeSize = () => {
    if (!isMobile) {
      canvas.setWidth(size.width);
      canvas.setHeight(size.height);
    } else {
      canvas.setWidth(sizeMobile.width);
      canvas.setHeight(sizeMobile.height);
    }
  };

  // Block "Add text"

  const addText = () => {
    if (isMobile) {
      const text = new fabric.Textbox('Sample Text', {
        left: 40,
        top: 100,
        selected: true,
        fontFamily: 'Alpha-Slab',
        angle: 0,
        fill: '#000000',
        scaleX: 0.6,
        scaleY: 0.6,
        fontWeight: '',
        hasRotatingPoint: true,
        scaleToWidth: true,
      });

      text.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: true,
        bl: false,
        br: true,
        tl: false,
        tr: false,
        mtr: true,
      });

      canvas.on({
        'text:editing:entered': e => {
          if (e.target.type === 'textbox') {
            document.getElementById('editing-button').hidden = false;
            if (e.target.text === 'Sample Text') {
              e.target.text = '';
              e.target.hiddenTextarea.value = ''; // NEW
              canvas.renderAll();
            }
          }
        },
      });

      extend(text, randomId());
      canvas.discardActiveObject().renderAll();
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.centerObject(text);
      text.setCoords();
      canvas.renderAll();
      afterRender();
    }
    if (!isMobile) {
      const text = new fabric.Textbox('Sample Text', {
        fontFamily: 'Caveat',
        angle: 0,
        scaleX: 1.3,
        scaleY: 1.3,
        fill: '#000000',
        fontWeight: '',
        hasRotatingPoint: true,
        width: 200,
      });
      text.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: true,
        bl: false,
        br: true,
        tl: false,
        tr: false,
        mtr: true,
      });
      canvas.on({
        'text:editing:entered': e => {
          if (e.target.type === 'textbox') {
            document.getElementById('editing-button').hidden = false;
            if (e.target.text === 'Sample Text') {
              e.target.text = '';
              e.target.hiddenTextarea.value = '';
              canvas.renderAll();
            }
          }
        },
      });

      canvas.discardActiveObject().renderAll();
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.centerObject(text);
      text.setCoords();
      canvas.renderAll();
      afterRender();
    }
  };

  const finishTextEditing = () => {
    const activeObject = canvas.getActiveObject();
    canvas.fire('text:editing:exited');
    afterRender();
  };

  const getImgPolaroid = img => {
    // const el = event.target;
    fabric.loadSVGFromURL(img, (objects, options) => {
      const image = fabric.util.groupSVGElements(objects, options);
      if (!isMobile) {
        image.set({
          left: 170,
          top: 150,
          angle: 0,
          padding: 10,

          scaleX: 1,
          scaleY: 1,
          hasRotatingPoint: true,
        });
        image.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          bl: false,
          br: true,
          tl: false,
          tr: false,
          mtr: true,
        });
      }
      if (isMobile) {
        image.set({
          left: 75,
          top: 75,
          angle: 0,
          padding: 10,
          cornerSize: 10,

          hasRotatingPoint: true,
        });
        image.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          bl: false,
          br: true,
          tl: false,
          tr: false,
          mtr: true,
        });
      }

      image.scaleToWidth(100);
      image.scaleToHeight(100);
      extend(image, randomId());
      canvas.add(image);
      canvas.centerObject(image);
      image.setCoords();
      selectItemAfterAdded(image);
    });
  };

  // Block "Upload Image"

  const addImageOnCanvas = url => {
    if (url) {
      fabric.Image.fromURL(url, image => {
        image.set({
          left: 50,
          top: 50,
          angle: 0,
          padding: 10,
          cornerSize: 10,

          scaleX: 1,
          scaleY: 1,
          hasRotatingPoint: true,
        });
        image.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          bl: false,
          br: true,
          tl: false,
          tr: false,
          mtr: true,
        });
        image.scaleToWidth(200);
        image.scaleToHeight(200);
        extend(image, randomId());
        canvas.add(image);
        canvas.centerObject(image);
        image.setCoords();
        selectItemAfterAdded(image);
      });
    }
  };

  const cropImage = () => {
    var image;
    var minX, minY, maxX, maxY;

    image = canvas.getActiveObject();

    minX = image.oCoords.tl.x;
    maxX = image.oCoords.br.x;
    minY = image.oCoords.tl.y;
    maxY = image.oCoords.br.y;

    const tl = image.aCoords.tl;
    const tr = image.aCoords.tr;
    const bl = image.aCoords.bl;

    var maxScaleX = 1;
    var maxScaleY = 1;

    var mask = new fabric.Rect({
      fill: 'rgba(0,0,0,0.2)',
      originX: 'left',
      originY: 'top',
      stroke: 'black',
      opacity: 1,
      left: image.aCoords.tl.x,
      top: image.aCoords.tl.y,
      width: new fabric.Point(tl.x, tl.y).distanceFrom(tr),
      height: new fabric.Point(tl.x, tl.y).distanceFrom(bl),
      angle: image.angle,
      hasRotatingPoint: false,
      transparentCorners: false,
      borderColor: 'black',
      padding: 0,
      cornerStyle: 'circle',
      borderDashArray: [5, 5],
      borderScaleFactor: 1.3,
      maxWidth: new fabric.Point(tl.x, tl.y).distanceFrom(tr),
      maxHeight: new fabric.Point(tl.x, tl.y).distanceFrom(bl),
      // lockMovementX: true,
      // lockMovementY: true,
    });

    mask.on('scaling', function () {
      if (this.scaleX > maxScaleX) {
        this.scaleX = maxScaleX;
      }
      if (this.scaleY > maxScaleY) {
        this.scaleY = maxScaleY;
      }
    });

    // mask.on('moving', function () {
    //   var top = mask.top;
    //   var bottom = top + mask.height;
    //   var left = mask.left;
    //   var right = left + mask.width;

    //   var topBound = image.top;
    //   var bottomBound = topBound + image.height;
    //   var leftBound = image.left;
    //   var rightBound = leftBound + image.width;

    //   mask.set({
    //     left: Math.min(Math.max(left, leftBound), rightBound - mask.width),
    //     top: Math.min(Math.max(top, topBound), bottomBound - mask.height),
    //   });
    // });

    canvas.add(mask);
    canvas.bringToFront(mask);
    canvas.setActiveObject(mask);
    canvas.renderAll();
    afterRender();
    document.getElementById('crop-image-done-button').hidden = false;
  };

  const cropImageDone = () => {
    var image;
    var mask;

    mask = canvas.getActiveObject();
    image = canvas._objects[canvas._objects.length - 2];

    let rect = new fabric.Rect({
      left: mask.left,
      top: mask.top,
      width: mask.getScaledWidth(),
      height: mask.getScaledHeight(),
      absolutePositioned: true,
      angle: mask.angle,
    });

    // add to the current image clicpPath property
    // image.clipPath = rect;

    canvas.remove(mask);
    var cropped = new Image();

    const canvasBackgroundColor = canvas.backgroundColor;
    canvas.backgroundColor = '#ffffff00';

    cropped.src = canvas.toDataURL({
      format: 'png',
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });

    canvas.backgroundColor = canvasBackgroundColor;

    cropped.onload = function () {
      let cropped_image = new fabric.Image(cropped);
      cropped_image.left = rect.left;
      cropped_image.top = rect.top;
      cropped_image.angle = rect.angle;
      cropped_image.setCoords();
      canvas.add(cropped_image);
      canvas.remove(image);
      canvas.setActiveObject(cropped_image);
      canvas.renderAll();
    };

    document.getElementById('crop-image-done-button').hidden = true;
  };

  const readUrl = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = readerEvent => {
        url = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const removeWhite = url => {
    url = '';
  };

  // Block "Add figure"

  const addFigure = figure => {
    let add;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#3f51b5',
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          angle: 0,
          fill: '#4caf50',
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100,
          height: 100,
          left: 10,
          top: 10,
          fill: '#2196f3',
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50,
          left: 10,
          top: 10,
          fill: '#ff5722',
        });
        break;
    }
    extend(add, randomId());
    canvas.add(add);
    selectItemAfterAdded(add);
  };

  /*Canvas*/

  const cleanSelect = () => {
    canvas.discardActiveObject().renderAll();
  };

  const selectItemAfterAdded = obj => {
    canvas.discardActiveObject().renderAll();
    canvas.setActiveObject(obj);
  };

  const setCanvasFill = bgcolor => {
    canvasProperties.canvasFill = bgcolor;
    if (canvasProperties.canvasImage) canvasProperties.canvasImage = '';
    if (!canvasProperties.canvasImage) {
      canvas.setBackgroundImage(null);
      canvas.backgroundColor = canvasProperties.canvasFill;
      canvas.renderAll();
      afterRender();
    }
    //setMiniature(canvas.toDataURL());
  };

  const extend = (obj, id) => {
    obj.toObject = (toObject => {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          id,
        });
      };
    })(obj.toObject);
  };

  const setCanvasImage = imgUrl => {
    canvasProperties.canvasImage = imgUrl;
    if (canvasProperties.canvasImage) {
      fabric.Image.fromURL(canvasProperties.canvasImage, function (img, isError) {
        canvas.setBackgroundImage(
          img,
          () => {
            canvas.backgroundColor = '';
            canvas.renderAll();
            afterRender();
          },
          { scaleX: canvas.width / img.width, scaleY: canvas.height / img.height },
        );
      });
    }
  };

  const randomId = () => {
    return Math.floor(Math.random() * 999999) + 1;
  };

  /*------------------------Global actions for element------------------------*/

  const getActiveStyle = (styleName, object) => {
    object = object || canvas.getActiveObject();
    if (!object) {
      return '';
    }

    if (object.getSelectionStyles && object.isEditing) {
      return object.getSelectionStyles()[styleName] || '';
    } else {
      return object[styleName] || '';
    }
  };

  const setActiveStyle = (styleName, value, object) => {
    object = object || canvas.getActiveObject(); // as fabric.IText;
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({ underline: true });
        } else {
          object.setSelectionStyles({ underline: false });
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({ overline: true });
        } else {
          object.setSelectionStyles({ overline: false });
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({ linethrough: true });
        } else {
          object.setSelectionStyles({ linethrough: false });
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();
    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    canvas.renderAll();
  };

  const getActiveProp = name => {
    const object = canvas.getActiveObject();
    if (!object) {
      return '';
    }

    return object[name] || '';
  };

  const setActiveProp = (name, value) => {
    const object = canvas.getActiveObject();
    if (!object) {
      return;
    }
    object.set(name, value);
    canvas.renderAll();
    //setMiniature(canvas.toDataURL());
    afterRender();
  };

  const clone = () => {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

    if (activeObject) {
      let clone;
      switch (activeObject.type) {
        case 'rect':
          clone = new fabric.Rect(activeObject.toObject());
          break;
        case 'circle':
          clone = new fabric.Circle(activeObject.toObject());
          break;
        case 'triangle':
          clone = new fabric.Triangle(activeObject.toObject());
          break;
        case 'i-text':
          clone = new fabric.IText('', activeObject.toObject());
          break;
        case 'image':
          clone = fabric.util.object.clone(activeObject);
          break;
      }
      if (clone) {
        clone.set({ left: 10, top: 10 });
        canvas.add(clone);
        selectItemAfterAdded(clone);
      }
    }
  };

  const getId = () => {
    canvasProperties.id = canvas.getActiveObject().toObject().id;
  };

  const setId = () => {
    const val = canvasProperties.id;
    const complete = canvas.getActiveObject().toObject();

    canvas.getActiveObject().toObject = () => {
      complete.id = val;
      return complete;
    };
  };

  const getOpacity = () => {
    canvasProperties.opacity = getActiveStyle('opacity', null) * 100;
  };

  const setOpacity = () => {
    setActiveStyle('opacity', parseInt(canvasProperties.opacity, 10) / 100, null);
  };

  const getFill = () => {
    canvasProperties.fill = getActiveStyle('fill', null);
  };

  const setFill = () => {
    setActiveStyle('fill', canvasProperties.fill, null);
    //setMiniature(canvas.toDataURL());
    afterRender();
  };

  const getLineHeight = () => {
    canvasProperties.lineHeight = getActiveStyle('lineHeight', null);
  };

  const setLineHeight = () => {
    setActiveStyle('lineHeight', parseFloat(canvasProperties.lineHeight), null);
  };

  const getCharSpacing = () => {
    canvasProperties.charSpacing = getActiveStyle('charSpacing', null);
  };

  const setCharSpacing = () => {
    setActiveStyle('charSpacing', canvasProperties.charSpacing, null);
  };

  const getFontSize = () => {
    canvasProperties.fontSize = getActiveStyle('fontSize', null);
  };

  const setFontSize = () => {
    setActiveStyle('fontSize', parseInt(canvasProperties.fontSize, 10), null);
  };

  const getBold = () => {
    canvasProperties.fontWeight = getActiveStyle('fontWeight', null);
  };

  const setBold = () => {
    canvasProperties.fontWeight = !canvasProperties.fontWeight;
    setActiveStyle('fontWeight', canvasProperties.fontWeight ? 'bold' : '', null);
  };

  const setFontStyle = () => {
    canvasProperties.fontStyle = !canvasProperties.fontStyle;
    if (canvasProperties.fontStyle) {
      setActiveStyle('fontStyle', 'italic', null);
    } else {
      setActiveStyle('fontStyle', 'normal', null);
    }
  };

  const getTextDecoration = () => {
    canvasProperties.TextDecoration = getActiveStyle('textDecoration', null);
  };

  const setTextDecoration = value => {
    let iclass = canvasProperties.TextDecoration;
    if (iclass.includes(value)) {
      iclass = iclass.replace(RegExp(value, 'g'), '');
    } else {
      iclass += ` ${value}`;
    }
    canvasProperties.TextDecoration = iclass;
    setActiveStyle('textDecoration', canvasProperties.TextDecoration, null);
  };

  const hasTextDecoration = value => {
    return canvasProperties.TextDecoration.includes(value);
  };

  const getTextAlign = () => {
    canvasProperties.textAlign = getActiveProp('textAlign');
  };

  const setTextAlign = value => {
    canvasProperties.textAlign = value;
    setActiveProp('textAlign', canvasProperties.textAlign);
  };

  const getFontFamily = () => {
    canvasProperties.fontFamily = getActiveProp('fontFamily');
  };

  const setFontFamily = value => {
    setActiveProp('fontFamily', value);
  };

  const setFontColor = value => {
    canvasProperties.fontColor = value;
    setActiveProp('fill', canvasProperties.fontColor);
  };

  /*System*/

  const removeSelected = () => {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      afterRender();
      // textString = '';
    } else if (activeGroup) {
      canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach(object => {
        self.canvas.remove(object);
      });
    }

    afterRender();
  };

  const bringToFront = () => {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      canvas.discardActiveObject();
      activeGroup.forEach(object => {
        object.bringToFront();
      });
    }
  };

  const sendToBack = () => {
    const activeObject = canvas.getActiveObject();
    const activeGroup = canvas.getActiveObjects();

    if (activeObject) {
      canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      canvas.discardActiveObject();
      activeGroup.forEach(object => {
        object.sendToBack();
      });
    }
  };

  const confirmClear = () => {
    // if (confirm("Are you sure?")) {
    //   canvas.clear();
    // }
  };

  const rasterize = () => {
    const image = new Image();

    var mult = 1350 / 450;
    image.src = canvas.toDataURL({
      format: 'png',
      multiplier: mult,
    });
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('myCanvas');
    let url = image.src.replace(/^data:image\/png/, 'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  };

  const rasterizeSVG = () => {
    const w = window.open('');
    w.document.write(canvas.toSVG());
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG());
  };

  const saveCanvasToJSON = () => {
    const json = JSON.stringify(canvas);
    return json;
  };

  const deviceDetect = () => {
    isMobile = deviceService.isMobile();
    isTablet = deviceService.isTablet();
    isDesktopDevice = deviceService.isDesktop();
  };

  const loadCanvasFromJSON = () => {
    const CANVAS = [];

    // and load everything from the same json
    canvas.loadFromJSON(CANVAS, () => {
      // making sure to render canvas at the end
      canvas.renderAll();

      // and checking if object's "name" is preserved
    });
  };

  const rasterizeJSON = () => {
    json = JSON.stringify(canvas, null, 2);
  };

  const resetPanels = () => {
    textEditor = false;
    imageEditor = false;
    figureEditor = false;
  };
  const chopBegining = data => {
    let modifiedData = data.replace('data:image/png;base64,', '');
    modifiedData = modifiedData.replace(/"/g, '');
    return modifiedData;
  };
  const phoneFormat = phone => {
    var number = phone;
    number = number.replace('(', '');
    number = number.replace(')', '');
    number = number.replace(' ', '');
    number = number.replace('-', '');
    return '+1' + number;
  };

  const isCanvasEmpty = canvas => {
    const blank = document.createElement('canvas');

    blank.width = canvas.width;
    blank.height = canvas.height;

    console.log(mode, 'is empty: ', canvas.toDataURL() === blank.toDataURL());
    return canvas.toDataURL() === blank.toDataURL();
  };

  // function isCanvasBlank(canvas) {
  //   const context = canvas.getContext('2d');

  //   const pixelBuffer = new Uint32Array(
  //     context.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
  //   );

  //   return !pixelBuffer.some(color => color !== 0);
  // }

  const exportCanvas = mode => {
    if (!isCanvasEmpty(canvas)) {
      let json = JSON.stringify(canvas);

      const formatOne = new Image();
      const formatTwo = new Image();
      const formatThree = new Image();
      const formatFour = new Image();
      const formatFive = new Image();
      if (isMobile) {
        var mult1 = 3600 / CANVAS_WIDTH_MOBILE;
        var mult2 = 2700 / CANVAS_WIDTH_MOBILE;
        var mult3 = 1050 / CANVAS_WIDTH_MOBILE;
        var mult4 = 879 / CANVAS_WIDTH_MOBILE;
      }
      if (!isMobile) {
        var mult1 = 3600 / CANVAS_WIDTH_DESKTOP;
        var mult2 = 2700 / CANVAS_WIDTH_DESKTOP;
        var mult3 = 1050 / CANVAS_WIDTH_DESKTOP;
        var mult4 = 879 / CANVAS_WIDTH_DESKTOP;
      }
      formatOne.src = canvas.toDataURL({ format: 'png', multiplier: mult1 });
      formatTwo.src = canvas.toDataURL({ format: 'png', multiplier: mult2 });
      formatThree.src = canvas.toDataURL({ format: 'png', multiplier: mult3 });
      formatFour.src = canvas.toDataURL({ format: 'png', multiplier: mult4 });
      formatFive.src = canvas.toDataURL({ format: 'png', multiplier: 1 });
      formatOne.src = changedpi.changeDpiDataUrl(formatOne.src, 300);
      formatTwo.src = changedpi.changeDpiDataUrl(formatTwo.src, 300);
      formatThree.src = changedpi.changeDpiDataUrl(formatThree.src, 300);
      formatFour.src = changedpi.changeDpiDataUrl(formatFour.src, 300);
      formatFive.src = changedpi.changeDpiDataUrl(formatFive.src, 300);

      const canvas2 = document.createElement('canvas');
      const ctx2 = canvas2.getContext('2d');
      canvas2.width = 879;
      canvas2.height = 1833;

      const backgroundColor = canvas.backgroundColor;
      ctx2.fillStyle = backgroundColor;
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

      var myImage = new Image();
      myImage.src = formatFour.src;

      myImage.onload = function () {
        ctx2.drawImage(
          myImage,
          canvas2.width / 2 - myImage.width / 2,
          canvas2.height / 2 - myImage.height / 2,
        );
        formatFour.src = canvas2.toDataURL({ format: 'png', multiplier: 1 });
        formatFour.src = changedpi.changeDpiDataUrl(formatFour.src, 300);

        const design = {
          designName: canvasName === undefined ? 'default' : canvasName,
          designJson: json,
          designImages: [
            {
              name: '3600x3600',
              data: formatOne.src,
            },
            {
              name: '2700x2700',
              data: formatTwo.src,
            },

            {
              name: '1050x1050',
              data: formatThree.src,
            },
            {
              name: '879x1833',
              data: formatFour.src,
            },
            {
              name: 'thumbnail',
              data: formatFive.src,
            },
          ],
        };

        switch (mode) {
          case 'front':
            dispatch({ type: SAVE_FRONT_DESIGN, payload: design });
            break;
          case 'back':
            dispatch({ type: SAVE_BACK_DESIGN, payload: design });
            break;
          default:
            break;
        }
      };
    } else {
      switch (mode) {
        case 'front':
          dispatch({ type: SAVE_FRONT_DESIGN, payload: null });
          break;
        case 'back':
          dispatch({ type: SAVE_BACK_DESIGN, payload: null });
          break;
        default:
          break;
      }
    }
  };

  const canvasReady = (canvas, canvasJSON, designName) => {
    setCanvas(canvas);
    setCanvasName(designName);
    setCanvasJSON(canvasJSON);
  };

  return {
    onReady: canvasReady,
    resetPanels,
    undo,
    redo,
    changeSize,
    addText,
    getImgPolaroid,
    setCanvasImage,
    addImageOnCanvas,
    addFigure,
    removeSelected,
    setFontFamily,
    setFontColor,
    setFontSize,
    setCanvasFill,
    cropImage,
    cropImageDone,

    exportCanvas,
    saveCanvasToJSON,
    finishTextEditing,
  };
};

export default useEditor;
