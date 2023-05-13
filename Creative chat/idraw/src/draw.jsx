import React, { useRef, useState } from 'react';


const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [strokeSize, setStrokeSize] = useState(2);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setPrevPosition({ x: offsetX, y: offsetY });
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    if (isEraser) {
      context.globalCompositeOperation = 'destination-out';
      context.strokeStyle = 'rgba(0,0,0,1)';
      context.lineWidth = strokeSize;
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = strokeColor;
      context.lineWidth = strokeSize;
    }

    if (blurEnabled) {
      context.filter = 'blur(2px)';
    } else {
      context.filter = 'none';
    }

    context.lineTo(offsetX, offsetY);
    context.stroke();
    setPrevPosition({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSizeChange = (e) => {
    setStrokeSize(parseInt(e.target.value, 10));
  };

  const handleColorChange = (e) => {
    setStrokeColor(e.target.value);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const toggleBlur = () => {
    setBlurEnabled(!blurEnabled);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'drawing.png';
    link.click();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className='container'>
        
        <label>
          Size:
          <input type="number" value={strokeSize} onChange={handleSizeChange} min="1" max="10" />
        </label>
        <label>
          Color:
          <input type="color" value={strokeColor} onChange={handleColorChange} />
        </label>
        <button onClick={toggleEraser}>{isEraser ? 'Disable Eraser' : 'Enable Eraser'}</button>
        <button onClick ={toggleBlur}>{blurEnabled ? 'Disable Blur' : 'Enable Blur'}</button>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={handleDownload}>Download</button>
</div>
</div>
);
};


export default DrawingApp;
