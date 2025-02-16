import React, { useState, useRef } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

const gridSize = 16;

type PixelArtEditorProps = {};

const PixelArtEditor: React.FC<PixelArtEditorProps> = () => {
  const [color, setColor] = useState<string>("#000000");
  const [pixels, setPixels] = useState<string[]>(
    Array(gridSize * gridSize).fill("#ffffff")
  );
  const gridRef = useRef<HTMLDivElement>(null);

  const handlePixelClick = (index: number) => {
    const newPixels = [...pixels];
    newPixels[index] = color;
    setPixels(newPixels);
  };

  const downloadImage = () => {
    if (gridRef.current) {
      html2canvas(gridRef.current).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "pixel-art.png";
        link.click();
      });
    }
  };

  return (
    <div className="container text-center py-4">
      <SketchPicker color={color} onChange={(c) => setColor(c.hex)} />
      <div
        ref={gridRef}
        className="d-grid border mt-4 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: "auto",
          display: "grid",
          gap: "0px",
          border: "2px solid black",
        }}
      >
        {pixels.map((pixelColor, index) => (
          <div
            key={index}
            className="border"
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: pixelColor,
              cursor: "pointer",
              border: "1px solid black",
            }}
            onClick={() => handlePixelClick(index)}
          />
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={downloadImage}>
        ダウンロード
      </button>
    </div>
  );
};

export default PixelArtEditor;
