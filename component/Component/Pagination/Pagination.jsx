const Pagination = (props) => {
    const [paginationOptions, setPaginationOptions] = React.useState([]);
    const [firstUser, setFirstUser] = React.useState();
    const [lastUser, setLastUser] = React.useState();

    const rowPerPageOption = [
        { value: 10, translation: '10' },
        { value: 25, translation: '25' },
        { value: 50, translation: '50' },
        { value: 100, translation: '100' }
    ];

    React.useEffect(() => {
        const paginationOpt = [];
        const totalPages = Math.ceil(props.userCount / props.rowPerPage);
        const currentPage = Math.min(props.pagination, totalPages);

        for (let i = 1; i <= totalPages; i++) {
            paginationOpt.push({ value: i, translation: `${i}` });
        }

        setPaginationOptions(paginationOpt);
        if (props.userCount === 0) {
            setFirstUser(0);
        } else {
            setFirstUser((currentPage - 1) * props.rowPerPage + 1);
        }
        setLastUser(Math.min(currentPage * props.rowPerPage, props.userCount));
    }, [props.rowPerPage, props.pagination, props.userCount]);

    return React.createElement('div', { className: 'd-flex justify-content-end flex-wrap' },
        React.createElement('div', { className: 'd-flex' },
            React.createElement('p', { className: 'mt-3' }, `${i18next.t('Page')}:`),
            React.createElement(Select, { options: paginationOptions, value: props.pagination, onChange: props.onPaginationChange, className: 'mt-2' })
        ),
        React.createElement('div', { className: 'ms-5 d-flex' },
            React.createElement('p', { className: 'mt-3' }, `${i18next.t('Rows per page')}:`),
            React.createElement(Select, { options: rowPerPageOption, value: props.rowPerPage, onChange: props.onRowPerPageChange, className: 'mt-2' })
        ),
        React.createElement('div', { className: 'ms-5 d-flex' },
            React.createElement('div', { className: '' },
                React.createElement('p', { className: 'mt-3' }, `${firstUser} - ${lastUser} ${i18next.t('of')} ${props.userCount}`)
            ),
            React.createElement('button', { className: 'btn', onClick: () => props.setPagination(props.pagination - 1), disabled: props.rowPerPage > props.userCount || props.pagination === 1 },
                React.createElement('i', { className: 'bi bi-caret-left-fill' })
            ),
            React.createElement('button', { className: 'btn', onClick: () => props.setPagination(props.pagination + 1), disabled: lastUser === props.userCount },
                React.createElement('i', { className: 'bi bi-caret-right-fill' })
            )
        )
    );
}

exports.Pagination = Pagination