import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import Control from './Control';

const socket = io('http://localhost:3000')
const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPosition, setLastPosition] = useState({ x: null, y: null })
    const [drawingMode, setDrawingMode] = useState('draw')
    const [rectPosition, setRectPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 900
        canvas.height = 400
        const context = canvas.getContext("2d")
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        contextRef.current = context;
        socket.on('drawing', onDrawingEvent);
        socket.on('rectangle', onRectangle)
        socket.on('text', onText)
        return () => {
            socket.off('drawing', onDrawingEvent);
        };
    }, [])

    const startDrawing = ({ nativeEvent }) => {
        setIsDrawing(true);
        if (drawingMode === 'draw') {
            contextRef.current.beginPath()
            contextRef.current.moveTo(nativeEvent.offsetX, nativeEvent.offsetY)
            setLastPosition({ x: nativeEvent.offsetX, y: nativeEvent.offsetY })
        }


        if (drawingMode === 'rectangle') {
            setRectPosition({ x: nativeEvent.offsetX, y: nativeEvent.offsetY })
        }

    }
    const draw = ({ nativeEvent }) => {
        if (isDrawing && drawingMode === 'rectangle') {
            contextRef.current.beginPath();
            contextRef.current.rect(
                rectPosition.x,
                rectPosition.y,
                nativeEvent.offsetX - rectPosition.x,
                nativeEvent.offsetY - rectPosition.y
            );
            contextRef.current.stroke();
            contextRef.current.clearRect(
                rectPosition.x,
                rectPosition.y,
                nativeEvent.offsetX - rectPosition.x,
                nativeEvent.offsetY - rectPosition.y
            );
        }


        if (!isDrawing || drawingMode != 'draw') return
        if(drawingMode==='draw'){
            contextRef.current.moveTo(lastPosition.x, lastPosition.y)
            contextRef.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY)
            contextRef.current.stroke()
            socket.emit('drawing', { x: nativeEvent.offsetX, y: nativeEvent.offsetY, a: lastPosition.x, b: lastPosition.y })
            setLastPosition({ x: nativeEvent.offsetX, y: nativeEvent.offsetY })
        }
       


    }
    const stopDrawing = () => {
        if (isDrawing && drawingMode === 'rectangle') {
            const { x, y } = lastPosition;
            // drawRectangle(x, y, 100, 50);
            // socket.emit('drawRectangle', { x, y, width: 100, height: 50 });
        }
        setIsDrawing(false);
        contextRef.current.closePath();
    }
    const drawRectangle = (x, y, width, height) => {
        contextRef.current.beginPath();
        contextRef.current.rect(x, y, width, height);
        contextRef.current.stroke();
    };
    const onRectangle = () => {

    }
    const onText = () => {

    }

    const onDrawingEvent = (data) => {
        const { x, y, a, b } = data;

        contextRef.current.moveTo(a, b)
        contextRef.current.lineTo(x, y)
        contextRef.current.stroke();


    };
    return (<>
        <div><Control setDrawingMode={setDrawingMode} /></div>

        <canvas className="border-black border-2" ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}></canvas>
    </>
    )
}

export default DrawingCanvas