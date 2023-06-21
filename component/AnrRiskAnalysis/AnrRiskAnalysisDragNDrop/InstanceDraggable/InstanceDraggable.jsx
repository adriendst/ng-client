const InstanceDraggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.instance.id,
      data: props.instance
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      maxHeight : '1px'
    } : undefined;


    return (
      React.createElement('li', { key: props.instance.id, ref: setNodeRef, style: style, ...listeners, ...attributes },
        React.createElement(InnerDroppable, { instance: props.instance, language : props.model.language, updateInstances : props.updateInstances }),
        props.instance.isShow && props.instance.child && props.instance.child.length > 0 && (
          React.createElement('ol', { className: 'no-list-style treeview2 instances pt-2' },
            props.instance.child.map(child => {
              return React.createElement(InstanceDraggable, { instance: child, key: child.id, model : props.model, updateInstances : props.updateInstances })
            })
          )
        ),
        React.createElement(Droppable, { instance: props.instance }),
      )
    );
  }

  exports.InstanceDraggable = InstanceDraggable