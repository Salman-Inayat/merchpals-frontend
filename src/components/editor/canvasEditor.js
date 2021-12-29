function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
const React = require('react');
const React__default = _interopDefault(React);

import { fabric } from 'fabric';

import { useEffect, useRef } from 'react';
import { initAligningGuidelines } from './gridlines/alignment';
import { initCenteringGuidelines } from './gridlines/center';

const CanvasEditor = _ref => {
  var className = _ref.className,
    onReady = _ref.onReady;
  var canvasElParent = useRef(null);
  var canvasEl = useRef(null);
  useEffect(function () {
    var canvas = new fabric.Canvas(canvasEl.current, {
      hoverCursor: 'pointer',
      selection: false,
      selectionBorderColor: 'blue',
      fireRightClick: true, // <-- enable firing of right click events
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true, // <--  prevent context menu from showing
    });

    initAligningGuidelines(canvas);
    initCenteringGuidelines(canvas, false);

    var setCurrentDimensions = function setCurrentDimensions() {
      var _canvasElParent$curre, _canvasElParent$curre2;

      canvas.setHeight(
        ((_canvasElParent$curre = canvasElParent.current) === null ||
        _canvasElParent$curre === void 0
          ? void 0
          : _canvasElParent$curre.clientHeight) || 0,
      );
      canvas.setWidth(
        ((_canvasElParent$curre2 = canvasElParent.current) === null ||
        _canvasElParent$curre2 === void 0
          ? void 0
          : _canvasElParent$curre2.clientWidth) || 0,
      );
      canvas.renderAll();
    };

    var resizeCanvas = function resizeCanvas() {
      setCurrentDimensions();
    };

    setCurrentDimensions();
    window.addEventListener('resize', resizeCanvas, false);

    if (onReady) {
      console.log('Ready: ', onReady);
      onReady(canvas);
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
      className: className,
    },
    React__default.createElement('canvas', {
      ref: canvasEl,
    }),
  );
};

export default CanvasEditor;
