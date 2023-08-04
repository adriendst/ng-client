import React from "react";
import { useDroppable } from 'ng_client/node_modules/@dnd-kit/core/dist/core.cjs.development.js'
import * as ReactRedux from 'react-redux'
import { Instance, Model, State } from "ng_client/component/interface/instanceInterface"

interface InstanceDraggableInterface {
  instance: Instance,
  language: number
  updateInstances(id: number): void,
  isActive?: boolean
}
const InnerDroppable = ({instance, language, updateInstances, isActive} : InstanceDraggableInterface) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `on${instance.id}`,
    data:instance,
  });

  const projectId: number = ReactRedux.useSelector((state: State) => state.riskAnalysis.model.id)
  const link = `/#/client/project/${projectId}/anr/inst/${instance.id}`

  //dropaable's style
  const style = {
    color: isOver ? '#388E3C' : 'black',
  };
  return (
    <div ref={setNodeRef}>
      <div className="d-flex align-items-center">
        {instance.child.length > 0 && (
          <span
            onClick={() => updateInstances(instance.id)}
            style={{ backgroundColor: 'rgb(241,241,241)', minHeight: '17px', minWidth: '17px' }}
            className="d-flex align-items-center justify-content-center me-1 treeview-button"
          >
            {instance.isShow ? '-' : '+'}
          </span>
        )}
        {instance.scope === 2 && (
          <span className="bi bi-globe pe-1" style={{ color: 'rgba(245,124,0)' }} />
        )}
        <a href={link} style={style}>
          <span className={`treeview ${isActive && 'active-inst'}`}>
            {instance[`name${language}`]}
          </span>
        </a>
      </div>
    </div>
  );
};

export default InnerDroppable;