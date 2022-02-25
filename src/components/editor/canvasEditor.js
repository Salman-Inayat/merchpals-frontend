function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
const React = require('react');
const React__default = _interopDefault(React);

import { fabric } from 'fabric';

import { useEffect, useRef } from 'react';
import { initAligningGuidelines } from './gridlines/alignment';
import { initCenteringGuidelines } from './gridlines/center';
import { useMediaQuery } from 'react-responsive';
import {
  CANVAS_HEIGHT_DESKTOP,
  CANVAS_HEIGHT_MOBILE,
  CANVAS_WIDTH_DESKTOP,
  CANVAS_WIDTH_MOBILE,
} from '../../configs/const';

const CanvasEditor = _ref => {
  var className = _ref.class,
    onReady = _ref.onReady,
    canvasJSON = _ref.canvasJSON,
    designName = _ref.designName;

  var canvasElParent = useRef(null);
  var canvasEl = useRef(null);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(function () {
    var canvas = new fabric.Canvas(canvasEl.current, {
      hoverCursor: 'pointer',
      selection: false,
      selectionBorderColor: 'blue',
      fireRightClick: true, // <-- enable firing of right click events
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true, // <--  prevent context menu from showing
    });

    if (isDesktop) {
      canvas.setDimensions({ width: CANVAS_WIDTH_DESKTOP, height: CANVAS_HEIGHT_DESKTOP });
    }
    if (isMobile) {
      canvas.setDimensions({ width: CANVAS_WIDTH_MOBILE, height: CANVAS_HEIGHT_MOBILE });
    }
    // if (isDesktop){

    // }
    initAligningGuidelines(canvas);
    initCenteringGuidelines(canvas, false);

    var setCurrentDimensions = function setCurrentDimensions() {
      var _canvasElParent$curre, _canvasElParent$curre2;
      const outerCanvasContainer = document.getElementsByClassName(className)[0];
      const ratio = canvas.getWidth() / canvas.getHeight();
      const containerWidth = outerCanvasContainer.clientWidth;
      const containerHeight = outerCanvasContainer.clientHeight;

      // const scale = containerWidth / canvas.getWidth();
      // const zoom = canvas.getZoom() * scale;
      canvas.setDimensions({
        width: containerWidth,
        height: containerWidth / ratio,
      });
      // canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

      canvas.renderAll();
    };

    var resizeCanvas = function resizeCanvas() {
      setCurrentDimensions();
    };

    setCurrentDimensions();
    window.addEventListener('resize', resizeCanvas, false);

    if (onReady) {
      onReady(canvas, canvasJSON, designName);
    }

    return function () {
      canvas.dispose();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return React__default.createElement(
    'div',
    {
      ref: canvasElParent,
      id: className,
    },
    React__default.createElement('canvas', {
      ref: canvasEl,
      id: 'canvas',
    }),
  );
};

export default CanvasEditor;
