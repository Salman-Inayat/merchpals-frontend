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
    designName = _ref.designName,
    canvasMode = _ref.canvasMode;

  var canvasElParent = useRef(null);
  var frontCanvasEl = useRef(null);
  var backCanvasEl = useRef(null);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(function () {
    const canvas = new fabric.Canvas(
      canvasMode === 'front' ? frontCanvasEl.current : backCanvasEl.current,
      {
        hoverCursor: 'pointer',
        selection: false,
        selectionBorderColor: 'blue',
        fireRightClick: true, // <-- enable firing of right click events
        fireMiddleClick: true, // <-- enable firing of middle click events
        stopContextMenu: true, // <--  prevent context menu from showing
      },
    );

    if (isDesktop) {
      canvas.setDimensions({ width: CANVAS_WIDTH_DESKTOP, height: CANVAS_HEIGHT_DESKTOP });
    }
    if (isMobile) {
      canvas.setDimensions({ width: CANVAS_WIDTH_MOBILE, height: CANVAS_HEIGHT_MOBILE });
    }

    initAligningGuidelines(canvas);
    initCenteringGuidelines(canvas, isMobile);

    if (onReady) {
      onReady(canvas, canvasJSON, designName);
    }

    return function () {
      canvas.dispose();
    };
  }, []);

  return React__default.createElement(
    'div',
    {
      ref: canvasElParent,
      id: className,
    },
    React__default.createElement('canvas', {
      ref: canvasMode === 'front' ? frontCanvasEl : backCanvasEl,
      id: `${canvasMode}-canvas`,
    }),
  );
};

export default CanvasEditor;
