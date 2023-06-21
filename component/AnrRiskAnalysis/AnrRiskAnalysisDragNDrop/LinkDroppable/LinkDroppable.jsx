const linkDroppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `link`,
    });

    return (
      React.createElement('a', { ref: setNodeRef, href: `#/client/project/${props.model.id}/anr`, className: 'btn d-flex align-items-center' },
        React.createElement('i', { className: 'bi bi-house-door-fill icon-large px-3' }),
        React.createElement('span', null, props.model[`label${props.model.language}`])
      )
    )
  }

  exports.linkDroppable = linkDroppable