const Select = (props) => {
    if (!props.options || props.options.length === 0) {
        return null;
    }
    return React.createElement(
      'div', { className: 'row mb-2' },
      props.icon && React.createElement(
        'div', { className: 'col-auto d-flex align-items-center' },
        React.createElement(
          'i', { className: props.icon + ' icon-large' },
        ),
      ),
      React.createElement(
        'div', { className: 'col' },
        React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, i18next.t(props.label)),
        React.createElement(
          'div', null,
          React.createElement('select', {
            className: 'form-select',
            value: props.value,
            onChange: props.onChange,
            title: i18next.t(props.title)
          },
            props.options.map(option => {
              return React.createElement('option', {
                value: option.value,
                className: 'selectOption',
                key : option.value
              }, i18next.t(option.translation))
            }),
          )
        ),
      )
    )
  }

exports.Select = Select