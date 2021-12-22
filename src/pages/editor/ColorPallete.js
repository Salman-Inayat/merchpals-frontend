import { Stack } from '@mui/material';
import React from 'react'

const ColorPallete = ({setCanvasBackground, customClass}) => {
  const colors = [
    "#ffffff00",
    "#000000",
    "#FFFFFF",
    "#9c9793",
    "#490097",
    "#727DCE",
    "#B400FF",
    "#B674CA",
    "#FF00FF",
    "#F5a0d2",
    "#EC008C",
    "#FF0060",
    "#A11851",
    "#F7A1A0",
    "#FFBE9F",
    "#FF534C",
    "#FF3D4C",
    "#FF1730",
    "#FFD100",
    "#DAAA00",
    "#321900",
    "#AA9C81",
    "#8A7C48",
    "#2A360F",
    "#006500",
    "#5D6A12",
    "#E1FFA9",
    "#B5F746",
    "#00FF00",
    "#7CFFA3",
    "#00FFC5",
    "#57C793",
    "#96C8A2",
    "#008675",
    "#009EE0",
    "#00BEFF",
    "#00FFFA",
    "#CDE0F0",
    "#f5f5f5",
    "#CE2357",
    "#6EE7C2",
    "#87AEB4",
    "#FCBC0A",
    "#ED553B",
    "#006763",
    "#FFF4E0",
    "#C06C84",
    "#FCBC0A",
    "#6B4A7D",
    "#152551",
    "#FDC0B3",
    "#8c8c88",
  ];
  return (
    <Stack className={customClass}>
      {colors.map((bgColor) => (
        <div
          style={{
            backgroundColor: bgColor,
            height: "24px",
            width: "70px",
            border: "1px solid #000",
          }}
          onClick={() => setCanvasBackground(bgColor)}
        />
      ))}
    </Stack>
  )
}

export default ColorPallete
