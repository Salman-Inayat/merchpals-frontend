import { fabric } from 'fabric';
import 'fabric-history';
import * as changedpi from 'changedpi';
import { initAligningGuidelines } from './gridlines/alignment';
import { initCenteringGuidelines } from './gridlines/center';
import { useState, useLayoutEffect, useRef } from 'react';
import 'fabric-history';

const useEditor = canvasId => {
  let [canvas, setCanvas] = useState();

  const size = {
    width: 450,
    height: 450,
  };
  const sizeMobile = {
    width: 225,
    height: 225,
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

  let isMobile = false;
  let isTablet = false;
  let isDesktopDevice = false;

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

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    initAligningGuidelines(canvas);
    initCenteringGuidelines(canvas, isMobile);

    canvas.on({
      'object:moving': e => {},
      'object:modified': e => {
        const selectedObject = e.target;
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
        resetPanels();
      },
      'object:added': e => {
        const selectedObject = e.target;
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
        resetPanels();
      },
      'selection:updated': e => {
        const selectedObject = e.target;
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
        resetPanels();
        if (selectedObject.type !== 'textbox') {
          document.getElementById('textControls').hidden = true;
        }

        if (selectedObject.type !== 'image') {
          document.getElementById('crop-image-button').hidden = true;
          console.log(selectedObject);
        }

        if (selectedObject.type == 'i-text') {
          // textSelection.emit("addText");
          // document.getElementById('textControls').hidden = false;
        } else if (
          selectedObject.type == 'path' ||
          selectedObject.type == 'group'
        ) {
          // textSelection.emit("addsmiley");
        } else if (selectedObject.type == 'image') {
          // // textSelection.emit("image")
        }
      },
      'object:selected': e => {
        const selectedObject = e.target;
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
        console.log(selectedObject.type);
        if (selectedObject.type === 'textbox') {
          document.getElementById('textControls').hidden = false;
        } else if (selectedObject.type === 'image') {
          document.getElementById('crop-image-button').hidden = false;
          document.getElementById('textControls').hidden = true;
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
        const selectedObject = e.target;
        selected = null;
        resetPanels();
        if (selectedObject == undefined) {
          // textSelection.emit("cleared");
        }
      },
    });

    if (!isMobile) {
      canvas.setWidth(size.width);
      canvas.setHeight(size.height);
    } else {
      canvas.setWidth(sizeMobile.width);
      canvas.setHeight(sizeMobile.height);
    }

    // get references to the html canvas element & its context
    canvas.on('mouse:down', e => {
      const canvasElement = document.getElementById('canvas');
    });
  });

  const undo = () => {
    canvas.undo();
  };

  const redo = () => {
    canvas.redo();
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
      const text = new fabric.IText('Sample Text', {
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
        mr: false,
        bl: false,
        br: true,
        tl: false,
        tr: false,
        mtr: true,
      });

      canvas.on({
        'text:editing:entered': e => {
          if (e.target.type === 'textbox') {
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
      canvas.renderAll();
    }
    if (!isMobile) {
      const text = new fabric.Textbox('Sample Text', {
        left: 50,
        top: 150,
        fontFamily: 'Caveat',
        angle: 0,
        scaleX: 1.5,
        scaleY: 1.5,
        fill: '#000000',
        fontWeight: '',
        hasRotatingPoint: true,
        // align: 'mid',
        // originX: 'center',
        // originY: 'center',
      });
      text.setControlsVisibility({
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
      canvas.on({
        'text:editing:entered': e => {
          if (e.target.type === 'textbox') {
            if (e.target.text === 'Sample Text') {
              e.target.text = '';
              e.target.hiddenTextarea.value = ''; // NEW
              canvas.renderAll();
            }
          }
        },
      });

      canvas.discardActiveObject().renderAll();
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
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
        selectItemAfterAdded(image);
      });
    }
  };

  const cropImage = () => {
    var image;

    image = canvas.getActiveObject();

    const tl = image.aCoords.tl;
    const tr = image.aCoords.tr;
    const bl = image.aCoords.bl;

    var mask = new fabric.Rect({
      fill: 'rgba(0,0,0,0.5)',
      left: image.aCoords.tl.x,
      top: image.aCoords.tl.y,
      width: new fabric.Point(tl.x, tl.y).distanceFrom(tr),
      height: new fabric.Point(tl.x, tl.y).distanceFrom(bl),
    });

    mask.set({
      maxWidth: image.width,
      maxHeight: image.height,
    });

    // mask.on('changed', function() {
    //   mask.set({
    //     width:
    //   });
    // });

    canvas.add(mask);
    canvas.bringToFront(mask);
    canvas.setActiveObject(mask);
    canvas.renderAll();
  };

  const cropImageDone = () => {
    var image;
    var mask;

    console.log(canvas._objects);
    mask = canvas.getActiveObject();
    image = canvas._objects[canvas._objects.length - 2];

    var scale = {
      x: image.scaleX,
      y: image.scaleY,
    };

    image.set({
      left: mask.left,
      top: mask.top,
      width: mask.width,
      height: mask.height,
      scaleX: mask.scaleX,
      scaleY: mask.scaleY,
      // cropX: mask.left / scale.x,
      // cropY: mask.top / scale.y,
    });

    image.setCoords();
    canvas.remove(mask);
    canvas.setActiveObject(image);
    canvas.renderAll();
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
    if (!canvasProperties.canvasImage) {
      canvas.backgroundColor = canvasProperties.canvasFill;
      canvas.renderAll();
    }
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

  const setCanvasImage = () => {
    const self = this;
    if (canvasProperties.canvasImage) {
      canvas.setBackgroundColor(
        new fabric.Pattern({
          source: canvasProperties.canvasImage,
          repeat: 'repeat',
        }),
        () => {
          self.canvasProperties.canvasFill = '';
          self.canvas.renderAll();
        },
      );
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
    // console.log(object.type);

    // const ctx = canvas.getSelectionContext();

    // if (object.type === 'i-text') {
    //   const text = object;
    //   console.log('text width', text.width);

    //   var actualWidth = text.scaleX * text.width;
    //   var largest = canvas.getActiveObject().__lineWidths[0];
    //   var tryWidth = (largest + 5) * text.scaleX;
    //   canvas.getActiveObject().set('width', tryWidth);
    //   if (text.left + actualWidth >= canvas.width - 10) {
    //     //console.log(canvas.height - arrowLeft)
    //     text.set('width', canvas.width - text.left - 10);
    //   }
    //   canvas.renderAll();

    //   console.log('text width', text.width);
    // }
    canvas.renderAll();
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
    setActiveStyle(
      'opacity',
      parseInt(canvasProperties.opacity, 10) / 100,
      null,
    );
  };

  const getFill = () => {
    canvasProperties.fill = getActiveStyle('fill', null);
  };

  const setFill = () => {
    setActiveStyle('fill', canvasProperties.fill, null);
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
    setActiveStyle(
      'fontWeight',
      canvasProperties.fontWeight ? 'bold' : '',
      null,
    );
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
      // textString = '';
    } else if (activeGroup) {
      canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach(object => {
        self.canvas.remove(object);
      });
    }
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
    let url = image.src.replace(
      /^data:image\/png/,
      'data:application/octet-stream',
    );
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
    localStorage.setItem('Kanvas', json);
  };
  const deviceDetect = () => {
    // isMobile = deviceService.isMobile();
    // isTablet = deviceService.isTablet();
    // isDesktopDevice = deviceService.isDesktop();
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
  const saveFinalJson = (userDetails, products) => {
    let json = JSON.stringify(canvas);
    json = JSON.parse(json);
    const formatOne = new Image();
    const formatTwo = new Image();
    const formatThree = new Image();
    const formatFour = new Image();
    if (isMobile) {
      var mult1 = 2700 / 225;
      var mult2 = 3000 / 225;
      var mult3 = 1050 / 225;
      var mult4 = 831 / 225;
    }
    if (!isMobile) {
      var mult1 = 2700 / 450;
      var mult2 = 3000 / 450;
      var mult3 = 1050 / 450;
      var mult4 = 831 / 450;
    }
    formatOne.src = canvas.toDataURL({ format: 'png', multiplier: mult1 });
    formatTwo.src = canvas.toDataURL({ format: 'png', multiplier: mult2 });
    formatThree.src = canvas.toDataURL({ format: 'png', multiplier: mult3 });
    formatFour.src = canvas.toDataURL({ format: 'png', multiplier: mult4 });
    let dp = userDetails.profilePic;
    let cover = userDetails.coverPic;
    userDetails.profilePic = '';
    userDetails.coverPic = '';
    formatOne.src = changedpi.changeDpiDataUrl(formatOne.src, 300);
    formatTwo.src = changedpi.changeDpiDataUrl(formatTwo.src, 300);
    formatThree.src = changedpi.changeDpiDataUrl(formatThree.src, 300);
    formatFour.src = changedpi.changeDpiDataUrl(formatFour.src, 300);
    console.log(formatOne.src);
    console.log(formatTwo.src);
    console.log(formatThree.src);
    console.log(formatFour.src);
    userDetails['JSON'] = JSON.stringify(json);
    var finaljson = {
      vendorId: phoneFormat(userDetails.phone),
      vendorStoreName: userDetails.storeName.toLowerCase(),
      displayName: userDetails.storeName.toLowerCase(),
      userDetails: userDetails,
      imgData: [
        {
          name: 'ProfilePic',
          data: chopBegining(dp),
        },
        {
          name: 'CoverPic',
          data: chopBegining(cover),
        },
      ],
      products: [
        {
          designName: 'default',
          designProduct: products,
          designJson: json,
          designImage: [
            {
              name: '2700x2700',
              data: chopBegining(formatOne.src),
            },
            {
              name: '3000x3000',
              data: chopBegining(formatTwo.src),
            },
            {
              name: '1050x1050',
              data: chopBegining(formatThree.src),
            },
            {
              name: '831x831',
              data: chopBegining(formatFour.src),
            },
          ],
        },
      ],
    };

    // service.submitUser(finaljson);
    console.log(finaljson);
    // service.getsubmitUser().subscribe((resp1) => {
    //   createStoreResponse.emit(resp1);
    // });
  };

  const showMiniature = () => {
    const miniature = canvas.toDataURL();
    return miniature;
  };

  const canvasReady = canvasReady => {
    setCanvas(canvasReady);
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
    showMiniature,
  };
};

export default useEditor;
