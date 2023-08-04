import React from "react";
import {useDroppable} from 'ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js'
import { Model } from "ng_client/component/interface/instanceInterface";

interface LinkDroppableInterface{
  model : Model
}

const LinkDroppable = ({model} : LinkDroppableInterface) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'link',
  });

  return (
    <a
      ref={setNodeRef}
      href={`#/client/project/${model.id}/anr`}
      className="btn d-flex align-items-center"
    >
      <i className="bi bi-house-door-fill icon-large px-3" />
      <span>{model[`label${model.language}`]}</span>
    </a>
  );
};

export default LinkDroppable;