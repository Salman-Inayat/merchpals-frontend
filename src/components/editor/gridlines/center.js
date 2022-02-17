import { fabric } from 'fabric';
/**
 * Augments canvas by assigning to `onObjectMove` and `onAfterRender`.
 * This kind of sucks because other code using those methods will stop functioning.
 * Need to fix it by replacing callbacks with pub/sub kind of subscription model.
 * (or maybe use existing fabric.util.fire/observe (if it won't be too slow))
 */
export const initCenteringGuidelines = (canvas, mobile) => {
  if (mobile) {
    var canvasWidth = 225,
      canvasHeight = 225,
      canvasWidthCenter = canvasWidth / 2;
    canvasHeightCenter = canvasHeight / 2;
  } else {
    var canvasWidth = 450,
      canvasHeight = 450,
      canvasWidthCenter = canvasWidth / 2,
      canvasHeightCenter = canvasHeight / 2;
  }

  var canvasWidthCenterMap = {},
    canvasHeightCenterMap = {},
    centerLineMargin = 2,
    centerLineColor = '#007bff',
    centerLineWidth = 2,
    ctx = canvas.getSelectionContext(),
    viewportTransform;

  for (
    var i = canvasWidthCenter - centerLineMargin, len = canvasWidthCenter + centerLineMargin;
    i <= len;
    i++
  ) {
    canvasWidthCenterMap[Math.round(i)] = true;
  }
  for (
    var i = canvasHeightCenter - centerLineMargin, len = canvasHeightCenter + centerLineMargin;
    i <= len;
    i++
  ) {
    canvasHeightCenterMap[Math.round(i)] = true;
  }

  function showVerticalCenterLine() {
    showCenterLine(canvasWidthCenter + 0.5, 0, canvasWidthCenter + 0.5, canvasHeight);
  }

  function showHorizontalCenterLineMobile() {
    let x1 = 0,
      y1 = canvasHeightCenter + 0.5,
      x2 = canvasWidth,
      y2 = canvasHeightCenter + 0.5;
    ctx.save();
    ctx.strokeStyle = centerLineColor;
    ctx.lineWidth = centerLineWidth;
    ctx.beginPath();
    ctx.moveTo(x1 - 20 * viewportTransform[0], y1 * viewportTransform[3]);
    ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);
    ctx.stroke();
    ctx.restore();
  }

  function showHorizontalCenterLine() {
    showCenterLine(0, canvasHeightCenter + 0.5, canvasWidth, canvasHeightCenter + 0.5);
  }
  function showCenterLine(x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = centerLineColor;
    ctx.lineWidth = centerLineWidth;
    ctx.beginPath();
    ctx.moveTo(x1 * viewportTransform[0], y1 * viewportTransform[3]);
    ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);
    ctx.stroke();
    ctx.restore();
  }

  var afterRenderActions = [],
    isInVerticalCenter,
    isInHorizontalCenter;

  canvas.on('mouse:down', function () {
    viewportTransform = canvas.viewportTransform;
  });

  canvas.on('object:moving', function (e) {
    var object = e.target,
      objectCenter = object.getCenterPoint(),
      transform = canvas._currentTransform;

    if (!transform) return;

    isInVerticalCenter = Math.round(objectCenter.x) in canvasWidthCenterMap;
    isInHorizontalCenter = Math.round(objectCenter.y) in canvasHeightCenterMap;

    if (isInHorizontalCenter || isInVerticalCenter) {
      object.setPositionByOrigin(
        new fabric.Point(
          isInVerticalCenter ? canvasWidthCenter : objectCenter.x,
          isInHorizontalCenter ? canvasHeightCenter : objectCenter.y,
        ),
        'center',
        'center',
      );
    }
  });

  canvas.on('before:render', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  canvas.on('after:render', function () {
    if (isInVerticalCenter) {
      showVerticalCenterLine();
    }
    if (isInHorizontalCenter) {
      if (mobile) {
        showHorizontalCenterLineMobile();
      } else {
        showHorizontalCenterLine();
      }
    }
  });

  canvas.on('mouse:up', function () {
    // clear these values, to stop drawing guidelines once mouse is up
    isInVerticalCenter = isInHorizontalCenter = null;
    canvas.renderAll();
  });
  var intervalId = window.setInterval(function () {
    let lines = localStorage.getItem('clearLines');
    if (lines == 'true') {
      isInVerticalCenter = isInHorizontalCenter = null;
      // canvas.renderAll();
      localStorage.setItem('clearLines', 'false');
    }
  }, 500);
};
