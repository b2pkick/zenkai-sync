import React from 'react'
import { useEditor,GeoShapeGeoStyle,DefaultColorStyle,DefaultDashStyle} from 'tldraw'
import { Button } from '@/components/ui/button'
import { Pen, Hand, Square, Circle, Diamond ,TextCursor, Eraser, Undo, Redo, ArrowBigUpIcon, ArrowBigRight, LineSquiggle, MousePointer2} from 'lucide-react'

export default function CustomToolbar({roomCode}) {
  const editor = useEditor()
  const setGeoShape = (shape) => {
    editor.setStyleForNextShapes(GeoShapeGeoStyle, shape)
    editor.setStyleForNextShapes(DefaultDashStyle,'solid')
    editor.setCurrentTool('geo')
  }

  const imageExport=async()=>{
    const shapeIds=editor.getCurrentPageShapes().map((shape)=>shape.id)
    const {blob} =await editor.toImage(shapeIds,{format:'png'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a')
    a.href=url
    a.download='board.png'
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div>
    <div className="absolute bottom-5 w-[85%] flex left-[50%] translate-x-[-50%] z-50 gap-3 flex-wrap justify-center">
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('text')} 
        title="text tool"
      >
      <TextCursor className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('eraser')} 
        title="eraser tool"
      >
      <Eraser className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('draw')} 
        title="pen tool"
      >
      <Pen className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('hand')} 
        title="hand navigation tool"
      >
      <Hand className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>setGeoShape('rectangle')} 
        title="rectangle box"
      >
      <Square className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>setGeoShape('ellipse')}
        title="circle box"
      >
      <Circle className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>setGeoShape('diamond')} 
        title="diamond shape"
      >
      <Diamond className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.undo()} 
        title="diamond shape"
      >
      <Undo className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.redo()} 
        title="diamond shape"
      >
      <Redo className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('arrow')} 
        title="diamond shape"
      >
      <ArrowBigRight className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('line')} 
        title="diamond shape"
      >
      <LineSquiggle className="text-black" />
      </Button>
      <Button 
        className={"bg-white w-8 md:w-12"} onClick={()=>editor.setCurrentTool('select')} 
        title="diamond shape"
      >
      <MousePointer2 className="text-black" />
      </Button>
    </div>
    <div className='absolute left-5 top-5 grid grid-cols-4 gap-2'> 
      <Button onClick={()=>editor.zoomIn()} className={"bg-white w-8 md:w-12"}>
        +
      </Button>
      <Button onClick={()=>editor.resetZoom()} className={"bg-white w-8 md:w-12"}>
        r
      </Button>
      <Button onClick={()=>editor.zoomToFit()} className={"bg-white w-8 md:w-12"}>
        f
      </Button>
      <Button onClick={()=>editor.zoomOut()} className={"bg-white w-8 md:w-12"}>
        -
      </Button>
      <Button onClick={()=>editor.deleteShapes(editor.getCurrentPageShapes().map(shape=>shape.id))} className={"bg-white w-8 md:w-12"}>
        c
      </Button>
      <Button onClick={imageExport} className={"bg-white w-8 md:w-12"}>
        e
      </Button>
    </div>
    <div className='absolute right-5 top-5 gap-2 grid grid-cols-2'> 
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'red')} className={"bg-red-500 w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'black')} className={"bg-black w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'yellow')} className={"bg-yellow-400 w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'orange')} className={"bg-orange-500 w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'grey')} className={"bg-gray-500 w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'green')} className={"bg-green-500 w-7 h-7 rounded-full border-2"}>
      </button>
      <button onClick={()=>editor.setStyleForNextShapes(DefaultColorStyle, 'pink')} className={"bg-pink-500 w-7 h-7 rounded-full border-2"}>
      </button>
    </div>
    <p className='text-xl absolute right-3 top-44'>{roomCode}</p>
    </div>
  )
}