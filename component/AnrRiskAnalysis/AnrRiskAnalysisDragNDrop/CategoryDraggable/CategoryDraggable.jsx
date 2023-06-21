const CategoryDraggable = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.object.uuid,
      data: props.object
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
      React.createElement('div', { ref: setNodeRef, style: style, ...listeners, ...attributes },
        React.createElement('div', { className: 'ps-4 py-1' }, props.object[`name${props.model.language}`])
      )
    );
  }

  exports.CategoryDraggable = CategoryDraggable
  