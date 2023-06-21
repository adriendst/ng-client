const InnerDroppable = (props) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `on${props.instance.id}`,
      data: props.instance
    });

    const style = {
      color: isOver ? '#388E3C' : 'black',
    };

    return (
      React.createElement('div', { ref: setNodeRef, style: { /* minHeight: '25px' */ } },
        React.createElement('div', { className: 'd-flex align-items-center' },
          props.instance.child.length > 0 && React.createElement('span', { /* tabIndex : 0, */ onClick: () => props.updateInstances(props.instance.id), style: { backgroundColor: 'rgb(241,241,241)', minHeight: '17px', minWidth: '17px' }, className: 'd-flex align-items-center justify-content-center me-1 treeview-button' }, props.instance.isShow ? '-' : '+'),
          props.instance.scope === 2 && React.createElement('span', { className: 'bi bi-globe pe-1', style: { color: 'rgba(245,124,0)' } }),
          React.createElement('span', { style: style, className: 'treeview' }, props.instance[`name${props.language}`]),
        ))
    )
  }

  exports.InnerDroppable = InnerDroppable;
