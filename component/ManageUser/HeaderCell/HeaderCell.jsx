const HeaderCell = (props) => {
    return (
        React.createElement(
            'th',
            {
                className: 'header-cell',
                onClick: () => props.onSortChange(props.value),
                style: { cursor: 'pointer' },
            },
            React.createElement('div', { className: 'header-cell-content' },
                React.createElement('span', null, i18next.t(props.label)),
                props.sortField === props.value ? props.sortOrder === '' ?

                    React.createElement('i', {
                        className: 'bi bi-arrow-up-short icon-large',
                    })
                    :
                    React.createElement('i', {
                        className: 'bi bi-arrow-down-short icon-large',
                    })
                    :
                    React.createElement('i', {
                        className: 'bi bi-arrow-up-short icon-large arrow-icon',
                        style: { color: "grey" }
                    }),
            )
        )
    )
}

exports.HeaderCell = HeaderCell