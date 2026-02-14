
import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Trash2, CheckCircle } from 'lucide-react';

interface HandwritingCanvasProps {
  onCapture: (image: string) => void;
  isProcessing: boolean;
}

const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({ onCapture, isProcessing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#ffffff';

    // Clear canvas with black background initially for better contrast
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
      setHasContent(true);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasContent(false);
      }
    }
  };

  const captureImage = () => {
    if (!canvasRef.current || !hasContent) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full max-w-[500px] h-[300px] bg-black rounded-2xl border-2 border-slate-700 cursor-crosshair shadow-2xl transition-all group-hover:border-indigo-500"
        />
        {!hasContent && !isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <p className="text-slate-400 font-medium">Draw something here...</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2 py-3 glass rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Trash2 size={18} />
          Clear
        </button>
        <button
          disabled={!hasContent || isProcessing}
          onClick={captureImage}
          className="flex-[2] flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <CheckCircle size={18} />
              Analyze Handwriting
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HandwritingCanvas;
