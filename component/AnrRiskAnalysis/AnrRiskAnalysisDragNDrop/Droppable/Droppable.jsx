const Droppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `between${props.instance.id}`,
      data: props.instance
    });

    const style = {
      height: isOver ? '25px' : '9px',
      border: isOver ? '2px dashed #33B5E5' : 'none',
      marginTop: isOver ? '5px' : '0px',
      marginBottom: isOver ? '5px' : '0px',
    };

    return (
      React.createElement('div', { ref: setNodeRef, style: style })
    )
  }

  exports.Droppable = Droppable