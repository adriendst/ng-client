import React from "react";
import {useDroppable} from 'ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js'
import { Instance } from "ng_client/component/interface/instanceInterface";

interface DroppableInterface{
  instance : Instance
}

const Droppable = ({instance} : DroppableInterface) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `between${instance.id}`,
    data: instance,
  });

  const style = {
    height: isOver ? '25px' : '9px',
    border: isOver ? '2px dashed #33B5E5' : 'none',
    marginTop: isOver ? '5px' : '0px',
    marginBottom: isOver ? '5px' : '0px',
  };

  return (
    <div ref={setNodeRef} style={style} />
  );
};

export default Droppable;