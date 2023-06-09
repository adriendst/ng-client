(function () {

    refreshLanguage()


    const InputWithIcon = (props) => {
        return React.createElement(
            'div', { className: `row mb-4 ${props.className} ` },
            React.createElement(
                'div', { className: 'col-auto d-flex align-items-center' },
                React.createElement(
                    'i', { className: props.icon + ' icon-large' },
                ),
            ),
            React.createElement(
                'div', { className: 'col' },
                React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, i18next.t(props.label) + ' *'),
                React.createElement(
                    'div', { className: '' },
                    React.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        value: props.value,
                        onChange: props.onChange,
                        title: props.title
                    })
                ),
            )
        )
    }

    const Select = (props) => {
        if (!props.options || props.options.length === 0) {
            return null;
        }

        return React.createElement(
            'div', { className: `mb-2 ${props.className}` },
            React.createElement(
                'div', { className: 'd-flex align-items-center' },
                React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, i18next.t(props.label)),
                React.createElement(
                    'div', { className: 'flex-grow-1' },
                    React.createElement('select', {
                        className: 'form-select',
                        value: props.value,
                        onChange: props.onChange,
                        title: i18next.t(props.title),
                    },
                        props.options.map(option => {
                            return React.createElement('option', {
                                value: option.value,
                                className: 'selectOption',
                                key: option.value
                            }, i18next.t(option.translation))
                        }),
                    )
                ),
            )
        )
    }


    const UserAlert = (props) => {
        if (!props.alertData || props.alertData.length === 0) {
            return null;
        }

        const token = localStorage.getItem('ls.auth_token').replace(/"/g, '');

        function handleDelete() {
            fetch(`api/users/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Token': token
                }
            })
                .catch(error => console.error(error));

            props.handleClose()
            props.loadUser()
            props.setClientsCount(props.clientsCount - 1)
        }

        function handleReset() {
            fetch(`api/users/${props.id}/resetPassword`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Token': token
                }
            })
                .catch(error => console.error(error));

            props.handleClose()
        }

        return (
            React.createElement('div', { className: "modal-alert", style: { display: props.show ? 'block' : 'none' } },
                React.createElement('div', { className: 'alert-delete' },
                    React.createElement('div', null,
                        React.createElement('div', null,
                            React.createElement('h4', null, i18next.t(props.alertData.title)),
                            React.createElement('p', null, i18next.t(props.alertData.text))
                        ),
                        React.createElement('div', { className: 'd-flex justify-content-end' },
                            React.createElement('button', { className: 'btn btn-outline-primary', onClick: props.handleClose }, i18next.t('Cancel')),
                            React.createElement('button', { className: 'btn btn-outline-primary', onClick: props.alertData.actionButton === 'Delete' ? handleDelete : handleReset }, i18next.t(props.alertData.actionButton))
                        )
                    )
                )
            )
        )
    }

    const UserModal = (props) => {
        const token = localStorage.getItem('ls.auth_token').replace(/"/g, '');

        const [anrs, setAnrs] = React.useState([])

        const rolesOptions = [
            { value: 'superadminfo', translation: 'Administrator' },
            { value: 'userfo', translation: 'User' },
            { value: 'ceo', translation: 'Global dashboard' }
        ]

        const perissionsOptions = [
            { value: '-1', translation: 'No access' },
            { value: '0', translation: 'Read' },
            { value: '1', translation: 'Read and write' }
        ]

        const [firstName, setFirstName] = React.useState('')
        const [lastName, setLastName] = React.useState('')
        const [email, setEmail] = React.useState('')
        const [roles, setRoles] = React.useState([])
        const [definePassword, setDefinePassword] = React.useState(false)
        const [password, setPassword] = React.useState('')
        const [confirmPassword, setConfirmPassword] = React.useState('')
        const [userPermissions, setUserPermissions] = React.useState([])

        React.useEffect(() => {
            fetch(`api/client-anr`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Token': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAnrs(data.anrs)
                })
                .catch(error => console.error(error));
        }, [])

        React.useEffect(() => {
            setFirstName('')
            setLastName('')
            setEmail('')
            setRoles([])
            setUserPermissions([])
            setDefinePassword(false)
            setPassword('')
            setConfirmPassword('')

            if (props.mode !== 'create') {
                fetch(`api/users/${props.id}`, {
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Token': token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        let test = [];
                        for (let i = 0; i < data.anrs.length; i++) {
                            test.push({ id: data.anrs[i].id, rwd: data.anrs[i].rwd })
                        }
                        setFirstName(data.firstname)
                        setLastName(data.lastname)
                        setEmail(data.email)
                        setRoles(data.role)
                        setUserPermissions(test)
                    })
                    .catch(error => console.error(error));
            }
        }, [props.modal]);

        function onFirstNameChange(event) {
            setFirstName(event.target.value)
        }

        function onLastNameChange(event) {
            setLastName(event.target.value)
        }

        function onEmailChange(event) {
            setEmail(event.target.value)
        }

        function onDefinePasswordChange() {
            setDefinePassword(!definePassword)
        }

        function onPasswordChange(event) {
            setPassword(event.target.value)
        }

        function onConfirmPasswordChange(event) {
            setConfirmPassword(event.target.value)
        }


        function onUserArnsChange(anrId, event) {
            const selectedRwd = event.target.value;
            const anr = { id: Number(anrId), rwd: selectedRwd };

            setUserPermissions((prevPermissions) => {
                const existingAnr = prevPermissions.find((item) => item.id === anrId);

                if (selectedRwd === "-1") {
                    return prevPermissions.filter((item) => item.id !== anrId);
                } else if (existingAnr) {
                    return prevPermissions.map((item) =>
                        item.id === anrId ? { ...item, rwd: selectedRwd } : item
                    );
                } else {
                    return [...prevPermissions, anr];
                }
            });
        }


        function onValidation() {
            if (props.mode === 'create') {
                fetch(`api/users`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Token': token
                    },
                    body: JSON.stringify({ firstname: firstName, lastname: lastName, email: email, role: roles, anrs: userPermissions })
                })
                    .then(response => {
                        if (response.ok) {
                            props.setClientsCount(props.clientsCount + 1)
                        }
                    })
                    .catch(error => console.error(error));
            }
            else {
                fetch(`api/users/${props.id}`, {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Token': token
                    },
                    body: JSON.stringify({ firstname: firstName, lastname: lastName, email: email, role: roles, anrs: userPermissions })
                })
                    .catch(error => console.error(error));
            }
            props.handleClose()
        }

        function disabeldCreate() {
            if (firstName === '' || lastName == '') {
                return true
            }
            else { return false }
        }


        $(document).ready(function () {
            $('.js-example-basic-multiple').select2();
        });

        $('.js-example-basic-multiple').on('change', function (event) {
            const selectedOptions = $(this).val();
            setRoles(selectedOptions)
        });

        return (
            React.createElement('div', { className: 'modal-alert', style: { display: props.show ? 'block' : 'none' } },
                React.createElement('div', { className: 'modal-main d-flex flex-column' },
                    React.createElement('div', { className: 'd-flex justify-content-between primary-backgroundcolor' },
                        React.createElement('h4', { className: 'm-3' }, props.mode === 'create' ? i18next.t('Add an user') : i18next.t('Edit user')),
                        React.createElement('button', { className: 'btn me-2', onClick: props.handleClose, style: { color: 'white' } },
                            React.createElement('i', { className: 'bi bi-x-lg' })
                        )
                    ),
                    React.createElement('div', { className: 'userForm flex-grow-1' },
                        React.createElement('form', { className: 'm-3' },
                            React.createElement('div', { className: 'd-flex' },
                                React.createElement(InputWithIcon, { icon: 'bi bi-person-fill', label: 'First name', value: firstName, onChange: onFirstNameChange, className: 'flex-grow-1', title: i18next.t('Please fill out this field.') }),
                                React.createElement(InputWithIcon, { label: 'Last name', value: lastName, onChange: onLastNameChange, className: 'flex-grow-1', title: i18next.t('Please fill out this field.') })
                            ),
                            React.createElement('div', null,
                                React.createElement(InputWithIcon, { icon: 'bi bi-envelope-fill', label: 'E-mail', value: email, onChange: onEmailChange, title: i18next.t('Please fill out this field.') }),
                            ),
                            React.createElement(
                                'div', { className: 'row mb-2' },
                                React.createElement(
                                    'div', { className: 'col-auto d-flex align-items-center' },
                                    React.createElement(
                                        'i', { className: 'bi bi-card-list icon-large' },
                                    ),
                                ),
                                React.createElement(
                                    'div', { className: 'col' },
                                    React.createElement('label', { style: { color: 'rgba(0,0,0,0.54)' } }, i18next.t('Permissions and roles')),
                                    React.createElement('div', null,
                                        React.createElement('select', { className: 'js-example-basic-multiple', name: 'roles[]', multiple: true, value: roles, readOnly: true },
                                            rolesOptions.map(option => {
                                                return React.createElement('option', {
                                                    value: option.value,
                                                    className: 'selectOption',
                                                    key: option.value,
                                                }, i18next.t(option.translation))
                                            }),
                                        ),
                                    )
                                ),
                                React.createElement('div', { className: 'form-check form-switch my-5 pl-5' },
                                    React.createElement('input', { className: 'form-check-input switch-input-lg', type: 'checkbox', onChange: onDefinePasswordChange }),
                                    React.createElement('label', { className: 'form-check-label ps-3' }, i18next.t('Set password'))
                                )
                            ),
                            definePassword && React.createElement('div', null,
                                React.createElement(InputWithIcon, { icon: 'bi bi-lock-fill', label: 'Password', value: password, onChange: onPasswordChange }),
                                React.createElement(InputWithIcon, { icon: 'bi bi-lock-fill', label: 'Confirm password', value: confirmPassword, onChange: onConfirmPasswordChange }),
                            ),
                            React.createElement('table', { className: 'table table-bordered' },
                                React.createElement('thead', {},
                                    React.createElement('tr', {},
                                        React.createElement('th', {}, i18next.t('Risk analysis label')),
                                        React.createElement('th', {}, i18next.t('Persmissions')),
                                    )
                                ),
                                React.createElement('tbody', {},
                                    anrs.map((anr, index) => {
                                        return React.createElement('tr', { key: anr.id },
                                            React.createElement('td', null, anr[`label${anr.language}`]),
                                            React.createElement('td', null,
                                                React.createElement(Select, { options: perissionsOptions, onChange: onUserArnsChange.bind(null, anr.id), value: userPermissions[index] ? userPermissions[index].rwd : '' })
                                            ),
                                        )
                                    })
                                )
                            ),
                        )
                    ),
                    React.createElement('div', { className: 'd-flex justify-content-end align-items-center my-3' },
                        React.createElement('button', { className: 'btn btn-outline-secondary', onClick: props.handleClose }, i18next.t('Cancel')),
                        React.createElement('button', { className: 'btn btn-outline-warning mx-2', onClick: onValidation, disabled: disabeldCreate() }, props.mode === 'create' ? i18next.t('Create') : i18next.t('Save'))
                    )
                )
            )
        )
    }


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
                            React.createElement(headerCell, { onSortChange: onSortChange, label: 'Status', value: 'status', sortField: sortField, sortOrder: sortOrder }),
                            React.createElement(headerCell, { onSortChange: onSortChange, label: 'First name', value: 'firstname', sortField: sortField, sortOrder: sortOrder }),
                            React.createElement(headerCell, { onSortChange: onSortChange, label: 'Last name', value: 'lastname', sortField: sortField, sortOrder: sortOrder }),
                            React.createElement(headerCell, { onSortChange: onSortChange, label: 'E-mail', value: 'email', sortField: sortField, sortOrder: sortOrder }),
                            React.createElement(headerCell, { onSortChange: onSortChange, label: '2FA', value: 'isTwoFactorAuthEnabled', sortField: sortField, sortOrder: sortOrder }),
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


    const headerCell = (props) => {
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



    angular
        .module('ClientApp')
        .controller('ClientAdminUsersCtrl', [
            '$scope', '$state', 'toastr', '$mdMedia', '$mdDialog', 'gettextCatalog', 'ClientUsersService',
            'TableHelperService', 'UserService', '$rootScope',
            ClientAdminUsersCtrl
        ])
        .component('manageUser', react2angular(ManageUser))


    /**
     * Admin Users Controller for the Client module
     */
    function ClientAdminUsersCtrl($scope, $state, toastr, $mdMedia, $mdDialog, gettextCatalog, ClientUsersService,
        TableHelperService, UserService, $rootScope) {

        $scope.myself = UserService.getUserId();

        $scope.users = TableHelperService.build('-firstname', 25, 1, '');
        $scope.users.activeFilter = 1;
        var initUsersFilter = true;
        $scope.$watch('users.activeFilter', function () {
            if (initUsersFilter) {
                initUsersFilter = false;
            } else {
                $scope.updateUsers();
            }
        });



        $scope.removeFilter = function () {
            TableHelperService.removeFilter($scope.users);
            $scope.users.activeFilter = 1;
        };

        $scope.updateUsers = function () {
            var query = angular.copy($scope.users.query);
            query.status = $scope.users.activeFilter;

            $scope.users.promise = ClientUsersService.getUsers(query);
            $scope.users.promise.then(
                function (data) {
                    $scope.users.items = data;
                }
            );
        };

        TableHelperService.watchSearch($scope, 'users.query.filter', $scope.users.query, $scope.updateUsers);

        $scope.toggleUserStatus = function (user) {
            ClientUsersService.patchUser(user.id, { status: !user.status }, function () {
                user.status = !user.status;
            });
        }

        $scope.createNewUser = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            $mdDialog.show({
                controller: ['$scope', '$mdDialog', 'ClientAnrService', CreateUserDialogCtrl],
                templateUrl: 'views/dialogs/create.user.html',
                targetEvent: ev,
                scope: $scope.$dialogScope.$new(),
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            })
                .then(function (user) {
                    ClientUsersService.createUser(user,
                        function () {
                            $scope.updateUsers();
                            toastr.success(gettextCatalog.getString('The user has been created successfully.',
                                { firstname: user.firstname, lastname: user.lastname }), gettextCatalog.getString('Creation successful'));
                        });
                }, function (reject) {
                    $scope.handleRejectionDialog(reject);
                });
        };

        $scope.editUser = function (ev, user) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

            ClientUsersService.getUser(user.id).then(function (userData) {
                $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'ClientAnrService', 'user', CreateUserDialogCtrl],
                    templateUrl: 'views/dialogs/create.user.html',
                    targetEvent: ev,
                    scope: $scope.$dialogScope.$new(),
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                        'user': userData
                    }
                })
                    .then(function (user) {
                        ClientUsersService.patchUser(user.id, user,
                            function () {
                                $scope.updateUsers();
                                toastr.success(gettextCatalog.getString('The user has been edited successfully.',
                                    { firstname: user.firstname, lastname: user.lastname }), gettextCatalog.getString('Edition successful'));

                                if (user.id == UserService.getUserId()) {
                                    $rootScope.$broadcast('fo-anr-changed');
                                }
                            }
                        );
                    }, function (reject) {
                        $scope.handleRejectionDialog(reject);
                    });
            });
        };

        $scope.resetUserPassword = function (ev, user) {
            var confirm = $mdDialog.confirm()
                .title(gettextCatalog.getString('Are you sure you want to reset the password of the user?'))
                .textContent(gettextCatalog.getString('The user will have to use the password recovery feature.'))
                .targetEvent(ev)
                .theme('light')
                .ok(gettextCatalog.getString('Reset'))
                .cancel(gettextCatalog.getString('Cancel'));
            $mdDialog.show(confirm).then(function () {
                ClientUsersService.resetUserPassword(user.id,
                    function () {
                        $scope.updateUsers();
                        toastr.success(gettextCatalog.getString("The user's password has been reset.",),
                            gettextCatalog.getString('Reset successful'));
                    }
                );
            });
        };

        $scope.deleteUser = function (ev, item) {
            var confirm = $mdDialog.confirm()
                .title(gettextCatalog.getString('Are you sure you want to delete user?',
                    { firstname: item.firstname, lastname: item.lastname }))
                .textContent(gettextCatalog.getString('This operation is irreversible.'))
                .targetEvent(ev)
                .theme('light')
                .ok(gettextCatalog.getString('Delete'))
                .cancel(gettextCatalog.getString('Cancel'));
            $mdDialog.show(confirm).then(function () {
                ClientUsersService.deleteUser(item.id,
                    function () {
                        $scope.updateUsers();
                        toastr.success(gettextCatalog.getString('The user has been deleted.',
                            { firstname: item.firstname, lastname: item.lastname }), gettextCatalog.getString('Deletion successful'));
                    }
                );
            });
        };
    }


    function CreateUserDialogCtrl($scope, $mdDialog, ClientAnrService, user) {
        ClientAnrService.getAnrs().then(function (data) {
            $scope.anrs = data.anrs;
            $scope.anrs.sort(function (a, b) {
                var str1 = a['label' + a.language];
                var str2 = b['label' + b.language];
                return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
            });

            for (var i = 0; i < $scope.anrs.length; ++i) {
                if (!$scope.anrById[$scope.anrs[i].id]) {
                    $scope.anrById[$scope.anrs[i].id] = $scope.anrs[i];
                    $scope.anrs[i].rwd = -1;
                }
            }
        });

        $scope.anrById = {};
        if (user != undefined && user != null) {
            $scope.user = user;
            // Ensure password isn't set, otherwise it will be erased with the encrypted value, and is going to be
            // encrypted again.
            $scope.user.password = undefined;
            $scope.user.currentAnr = undefined;

            if (user.anrs) {
                for (var i = 0; i < user.anrs.length; ++i) {
                    $scope.anrById[user.anrs[i].id] = user.anrs[i];
                }
            }
        } else {
            $scope.user = {
                firstname: '',
                lastname: '',
                email: '',
                role: []
            };
        }

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.create = function () {
            var cleanedAnrs = [];
            for (var i in $scope.anrById) {
                var anr = $scope.anrById[i];

                if (anr.rwd >= 0) {
                    cleanedAnrs.push({ id: i, rwd: anr.rwd });
                }
            }


            $scope.user.anrs = cleanedAnrs;

            $mdDialog.hide($scope.user);
        };
    }

})();
