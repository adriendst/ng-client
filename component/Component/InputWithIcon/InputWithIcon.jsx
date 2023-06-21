const InputWithIcon = (props) => {
  return React.createElement(
    'div', { className: `row mb-4 ${props.className ? props.className : ''}` },
    props.icon && React.createElement(
      'div', { className: 'col-auto d-flex align-items-center' },
      React.createElement(
        'i', { className: props.icon + ' icon-large' }
      ),
    ),
    React.createElement(
      'div', { className: 'col' },
      React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, i18next.t(props.label) + ' *'),
      React.createElement(
        'div', { className: '' }, // Ajout de la classe 'input-group' pour entourer l'input
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          defaultValue: props.value,
          onChange: props.onChange,
          title: props.title
        })
      ),
    )
  );
};

exports.InputWithIcon = InputWithIcon;

