const ManageUser = () => {
    const token = localStorage.getItem('ls.auth_token').replace(/"/g, '');
    const currentUserId = localStorage.getItem('ls.uid')

    const [clients, setClients] = React.useState([])
    const [clientsCount, setClientsCount] = React.useState(0)

    const [search, setSearch] = React.useState('')
    const [show, setShow] = React.useState('1')

    const [modal, setModal] = React.useState(false)
    const [modalMode, setModalMode] = React.useState('create')
    const [userId, setUserId] = React.useState()

    const [alertData, setAlertData] = React.useState()
    const [alert, setAlert] = React.useState(false)

    const [sortField, setSortField] = React.useState('firstname');
    const [sortOrder, setSortOrder] = React.useState('-');
    const [pagination, setPagination] = React.useState(1);
    const [rowPerPage, setRowPerPage] = React.useState(25);


    function showModal(value, id) {
        setModalMode(value)
        setModal(true)
        setUserId(id)
    }

    function hideModal() {
        setModal(false)
        setModalMode('create')
    }

    function showAlert(value, id) {
        if (id !== Number(currentUserId)) {
            if (value === 'delete') {
                setAlertData({ title: 'Are you sure you want to delete user?', text: 'This operation is irreversible.', actionButton: 'Delete' })
            }
            else {
                setAlertData({ title: 'Are you sure you want to reset the password of the user?', text: 'The user will have to use the password recovery feature.', actionButton: 'Reset' })
            }
            setAlert(true)
            setUserId(id)
        }
    }

    function hideAlert() {
        setAlert(false)
    }

    function onRowPerPageChange(event) {
        setRowPerPage(event.target.value);
        setPagination(1)
    }

    function onPaginationChange(event) {
        setPagination(event.target.value);
    }

    function getUsers() {
        fetch(`api/users?filter=${search}&limit=${rowPerPage}&order=${sortOrder}${sortField}&page=${pagination}&status=${show}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Token': token
            }
        })
            .then(response => response.json())
            .then(data => {
                setClients(data.users)
                setClientsCount(data.count)
            })
            .catch(error => console.error(error));
    }

    React.useEffect(() => {
        if (modal === false) {
            getUsers()
        }
    }, [sortField, sortOrder, modal, pagination, rowPerPage, show, search]);


    function onSearchChange(event) {
        setSearch(event.target.value)
        setPagination(1)
    }

    function onShowChange(event) {
        setShow(event.target.value)
        setPagination(1)
    }

    function resetFilters() {
        setShow('1')
        setSearch('')
    }

    function onSortChange(field) {
        console.log(sortField)
        console.log(sortOrder)
        if (field === sortField) {
            setSortOrder(sortOrder === '' ? '-' : '');
        } else {
            setSortField(field);
            setSortOrder('');
        }
    }

    function changeStatus(client) {
        if (client.id !== Number(currentUserId)) {
            const updatedStatus = client.status === 1 ? 0 : 1;
            const updatedClient = { ...client, status: updatedStatus };

            const updatedClients = clients.map(c => (c.id === client.id ? updatedClient : c));
            setClients(updatedClients);

            fetch(`api/users/${client.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Token': token
                },
                body: JSON.stringify(updatedClient)
            })
                .catch(error => console.error(error));
        }
    }

    const options = [
        { value: 'all', translation: 'Show all' },
        { value: '0', translation: 'Show inactive only' },
        { value: '1', translation: 'Show active only' }
    ];

    return React.createElement('div', { className: 'm-2 card' },
        React.createElement(UserModal, { show: modal, handleClose: hideModal, mode: modalMode, id: userId, modal: modal, clientsCount: clientsCount, setClientsCount: setClientsCount }),
        React.createElement(UserAlert, { show: alert, handleClose: hideAlert, id: userId, alertData: alertData, loadUser: getUsers, clientsCount: clientsCount, setClientsCount: setClientsCount }),
        React.createElement('div', { className: 'd-flex flex-wrap p-3' },
            React.createElement('div', { className: 'd-flex me-auto' },
                React.createElement('h2', { className: 'mt-2 me-2' },
                    React.createElement('span', null, i18next.t('Users')),
                    React.createElement('button', { className: 'btn', onClick: () => showModal('create'), title: i18next.t('Add an user') },
                        React.createElement('i', { className: 'bi bi-patch-plus-fill icon-large primary-color' })
                    )),
                React.createElement('form', null,
                    React.createElement('div', null,
                        React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, `${i18next.t('Search')}...`),
                        React.createElement('div', {},
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: search,
                                onChange: onSearchChange
                            })
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'd-flex' },
                React.createElement(Select, { options: options, value: show, onChange: onShowChange, className: 'mt-2' }),
                React.createElement('button', { className: 'btn', onClick: resetFilters },
                    React.createElement('i', { className: 'bi bi-arrow-counterclockwise icon-large icon-large primary-color' })
                )
            )
        ),
        React.createElement('div', { className: 'table-container' },
            React.createElement('table', { className: 'table table-striped table-hover', style: { minWidth: '700px', overflowX: 'auto' } },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: 'Status', value: 'status', sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: 'First name', value: 'firstname', sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: 'Last name', value: 'lastname', sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: 'E-mail', value: 'email', sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: '2FA', value: 'isTwoFactorAuthEnabled', sortField: sortField, sortOrder: sortOrder }),
                        React.createElement('th', { className: 'header-cell' }, React.createElement('header-cell-content', null, 'Actions'))
                    )
                ),
                React.createElement('tbody', null,
                    clients.map(client => {
                        return React.createElement('tr', { key: client.id },
                            React.createElement('td', null,
                                React.createElement('button', { className: 'btn', onClick: () => { changeStatus(client) } },
                                    React.createElement('i', { className: Number(currentUserId) === client.id ? 'bi bi-check-lg icon-large' : client.status === 1 ? 'bi bi-check-lg icon-large primary-color' : 'bi bi-x-lg icon-large primary-color' })
                                ),
                            ),
                            React.createElement('td', null, client.firstname),
                            React.createElement('td', null, client.lastname),
                            React.createElement('td', null, client.email),
                            React.createElement('td', null,
                                React.createElement('span', null, client.isTwoFactorAuthEnabled === true ? i18next.t('Enabled') : i18next.t('Not enabled')),
                            ),
                            React.createElement('td', { style: { minWidth: 160 } },
                                React.createElement('button', { className: 'btn btn-no-outline', onClick: () => showModal('edit', client.id), title: i18next.t('Edit') },
                                    React.createElement('i', { className: 'bi bi-pencil-fill icon-large primary-color' })
                                ),
                                React.createElement('button', { className: 'btn', onClick: () => showAlert('reset', client.id), title: i18next.t('Reset password') },
                                    React.createElement('i', { className: Number(currentUserId) === client.id ? 'bi bi-arrow-repeat icon-large' : 'bi bi-arrow-repeat icon-large primary-color' })
                                ),
                                React.createElement('button', { className: 'btn', onClick: () => showAlert('delete', client.id), title: i18next.t('Delete') },
                                    React.createElement('i', { className: Number(currentUserId) === client.id ? 'bi bi-trash-fill icon-large' : 'bi bi-trash-fill icon-large danger-color' })
                                )
                            )
                        )
                    }),
                )
            )
        ),
        React.createElement(Pagination, { userCount: clientsCount, onPaginationChange: onPaginationChange, onRowPerPageChange: onRowPerPageChange, pagination: pagination, rowPerPage: rowPerPage, setPagination: setPagination })
    )
};

exports.ManageUser = ManageUser
