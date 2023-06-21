const DropDownMenu = (props) => {
    return (
        React.createElement('div', { className: 'd-flex align-items-center justify-content-between ps-3', style: { backgroundColor: 'grey' } },
        React.createElement('div', null, 'Risk analysis'),
        React.createElement('button', { className: 'btn', onClick: props.onChange },
          React.createElement('i', { className: props.show ? 'bi bi-chevron-up ms-3' : 'bi bi-chevron-down ms-3' })
        )
      )
    )
}

exports.DropDownMenu = DropDownMenu