import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Grid, Button } from '@mui/material';

export default function ImageCrop(props) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);

  const cropImage = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    const base64Image = canvas.toDataURL('image/jpeg');
    props.handleStoreAvatarChange(base64Image);
    props.handleClose();
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Grid>
      <Grid item md={12}>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" accept="image/*" onChange={onSelectFile} hidden />
        </Button>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
            style={{ width: '80%' }}
            circularCrop={true}
          />
        </Grid>
        <Grid item md={6}>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Button
          onClick={() => cropImage(previewCanvasRef.current, completedCrop)}
          variant="contained"
        >
          Crop
        </Button>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
      </Grid>
      {/* <Button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </Button> */}
    </Grid>
  );
}
