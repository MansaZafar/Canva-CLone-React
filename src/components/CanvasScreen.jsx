import React, { useState, useEffect, useContext } from "react";
import "../css/main.css";
import { fabric } from "fabric";
import { CanvasContext } from "../func/CanvaContext.js";

const CanvasScreen = ({ setCanvasState }) => {
  const CanvasRef = useContext(CanvasContext);
  const [canvas, setCanvas] = useState(null);
  const [activeCanvas, SetActive] = useState(false);

  const SetCanvasActive = () => {
    SetActive(!activeCanvas);
  };

  useEffect(() => {
    const initCanvas = () => new fabric.Canvas("c");
    const fabricObj = initCanvas();
    setCanvas(fabricObj);
    setCanvasState(fabricObj);
  }, []);

  useEffect(() => {
    const HandleKeydown = (event) => {
      if (event.key === "Delete") {
        if (
          (activeCanvas && canvas.getActiveObject() === undefined) ||
          canvas.getActiveObject() === null
        ) {
          canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
        } else {
          canvas.remove(canvas.getActiveObject());
        }
      }
    };

    window.addEventListener("keydown", HandleKeydown);

    return () => {
      window.removeEventListener("keydown", HandleKeydown);
    };
  }, [activeCanvas]);

  return (
    <main>
      <div
        className={
          activeCanvas ? "activeCanvas containcontainer" : "containcontainer"
        }
        onClick={SetCanvasActive}
      >
        <div id="containcanvas">
          <canvas id="c" height="600px" width="800px" ref={CanvasRef}></canvas>
        </div>
      </div>
    </main>
  );
};

export default CanvasScreen;
