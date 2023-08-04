import React from "react";
import {useDraggable} from 'ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js'
import InnerDroppable from 'ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/InnerDroppable/InnerDroppable';
import Droppable from 'ng_client/component/AnrRiskAnalysis/AnrRiskAnalysisDragNDrop/Droppable/Droppable';
import { Instance, Model } from "ng_client/component/interface/instanceInterface";

interface InstanceDraggableInterface{
  instance : Instance,
  model : Model,
  updateInstances(id : number) : void,
  isActive? : boolean
}

const InstanceDraggable = ({instance, model, updateInstances, isActive} : InstanceDraggableInterface) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: instance.id,
    data: instance,
  });

  //draggable's style
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    maxHeight: '1px',
  } : undefined;

  return (
    <li key={instance.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <InnerDroppable instance={instance} language={model.language} updateInstances={updateInstances} isActive={isActive} />
      {instance.isShow && instance.child && instance.child.length > 0 && (
        <ol className="no-list-style treeview2 instances pt-2">
          {instance.child.map(child => (
            <InstanceDraggable instance={child} key={child.id} model={model} updateInstances={updateInstances} />
          ))}
        </ol>
      )}
      <Droppable instance={instance} />
    </li>
  );
};

export default InstanceDraggable;