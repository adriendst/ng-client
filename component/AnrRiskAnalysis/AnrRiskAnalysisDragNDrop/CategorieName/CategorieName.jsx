const CategorieName = (props) => {
    return React.createElement('div', { onClick: () => props.updateCategories(props.categId), id: props.categId, className: 'd-flex align-items-center', style: { maxHeight: 20, fontWeight: 'bold' } },
      React.createElement('span', { style: { border: 1, backgroundColor: 'rgb(241,241,241)', minHeight: '17px', minWidth: '17px' }, className: 'd-flex align-items-center justify-content-center m-1' }, props.isShow ? '-' : '+'),
      React.createElement('span', null, props.label)
    )
  }

  exports.CategorieName = CategorieName