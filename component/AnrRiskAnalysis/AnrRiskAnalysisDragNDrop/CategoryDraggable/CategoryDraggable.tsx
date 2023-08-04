import React from "react";
import {useDraggable} from 'ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js'
import { Object, Model } from "ng_client/component/interface/instanceInterface";

interface CategoryDraggableInterface{
  model : Model,
  object : Object
}

const CategoryDraggable = ({model, object} : CategoryDraggableInterface) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: object.uuid,
    data: object,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="ps-4 py-1">
        {object.scope === 2 && (
          <span className="bi bi-globe pe-1" style={{ color: 'rgba(245,124,0)' }} />
        )}
        <span>{object[`name${model.language}`]}</span>
      </div>
    </div>
  );
};

export default CategoryDraggable;

