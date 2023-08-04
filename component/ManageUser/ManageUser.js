var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ManageUser = function (props) {
    var _a;
    var token = (_a = localStorage.getItem('ls.auth_token')) === null || _a === void 0 ? void 0 : _a.replace(/"/g, '');
    var currentUserId = localStorage.getItem('ls.uid');
    var _b = React.useState(), clients = _b[0], setClients = _b[1];
    var _c = React.useState(0), clientsCount = _c[0], setClientsCount = _c[1];
    var _d = React.useState(''), search = _d[0], setSearch = _d[1];
    var _e = React.useState('1'), show = _e[0], setShow = _e[1];
    var _f = React.useState(false), modal = _f[0], setModal = _f[1];
    var _g = React.useState('create'), modalMode = _g[0], setModalMode = _g[1];
    var _h = React.useState(), userId = _h[0], setUserId = _h[1];
    var _j = React.useState(), alertData = _j[0], setAlertData = _j[1];
    var _k = React.useState(false), alert = _k[0], setAlert = _k[1];
    var _l = React.useState('firstname'), sortField = _l[0], setSortField = _l[1];
    var _m = React.useState('-'), sortOrder = _m[0], setSortOrder = _m[1];
    var _o = React.useState(1), pagination = _o[0], setPagination = _o[1];
    var _p = React.useState(25), rowPerPage = _p[0], setRowPerPage = _p[1];
    function showModal(value, id) {
        setModalMode(value);
        setModal(true);
        setUserId(id);
    }
    function hideModal() {
        setModal(false);
        setModalMode('create');
    }
    function showAlert(value, id) {
        if (id !== Number(currentUserId)) {
            if (value === 'delete') {
                setAlertData({
                    title: 'Are you sure you want to delete user?',
                    text: 'This operation is irreversible.',
                    actionButton: 'Delete'
                });
            }
            else {
                setAlertData({
                    title: 'Are you sure you want to reset the password of the user?',
                    text: 'The user will have to use the password recovery feature.',
                    actionButton: 'Reset'
                });
            }
            setAlert(true);
            setUserId(id);
        }
    }
    function hideAlert() {
        setAlert(false);
    }
    function onRowPerPageChange(event) {
        setRowPerPage(event.target.value);
        setPagination(1);
    }
    function onPaginationChange(event) {
        setPagination(event.target.value);
    }
    function getUsers() {
        var headers = {
            Accept: 'application/json, text/plain, */*'
        };
        if (token) {
            headers.Token = token;
        }
        fetch("api/users?filter=".concat(search, "&limit=").concat(rowPerPage, "&order=").concat(sortOrder).concat(sortField, "&page=").concat(pagination, "&status=").concat(show), { headers: headers })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            setClients(data.users);
            setClientsCount(data.count);
        })["catch"](function (error) { return console.error(error); });
    }
    React.useEffect(function () {
        if (!modal) {
            getUsers();
        }
    }, [sortField, sortOrder, modal, pagination, rowPerPage, show, search]);
    function onSearchChange(event) {
        setSearch(event.target.value);
        setPagination(1);
    }
    function onShowChange(event) {
        setShow(event.target.value);
        setPagination(1);
    }
    function resetFilters() {
        setShow('1');
        setSearch('');
    }
    function onSortChange(field) {
        if (field === sortField) {
            setSortOrder(sortOrder === '' ? '-' : '');
        }
        else {
            setSortField(field);
            setSortOrder('');
        }
    }
    function changeStatus(client) {
        if (client.id !== Number(currentUserId)) {
            var updatedStatus = client.status === 1 ? 0 : 1;
            var updatedClient_1 = __assign(__assign({}, client), { status: updatedStatus });
            var updatedClients = clients === null || clients === void 0 ? void 0 : clients.map(function (c) {
                return c.id === client.id ? updatedClient_1 : c;
            });
            setClients(updatedClients);
            var headers = {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            };
            if (token) {
                headers.Token = token;
            }
            fetch("api/users/".concat(client.id), {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(updatedClient_1)
            })["catch"](function (error) { return console.error(error); });
        }
    }
    var options = [
        { value: 'all', translation: 'Show all' },
        { value: '0', translation: 'Show inactive only' },
        { value: '1', translation: 'Show active only' }
    ];
    function handleReset() {
        var headers = {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        };
        if (token) {
            headers.Token = token;
        }
        fetch("api/users/".concat(userId, "/resetPassword"), {
            headers: headers
        })["catch"](function (error) { return console.error(error); });
        hideAlert();
    }
    function handleDelete() {
        var headers = {
            Accept: 'application/json, text/plain, */*'
        };
        if (token) {
            headers.Token = token;
        }
        fetch("api/users/".concat(userId), {
            method: 'DELETE',
            headers: headers
        })["catch"](function (error) { return console.error(error); });
        hideAlert();
        getUsers();
        setClientsCount(clientsCount - 1);
    }
    return (React.createElement("div", { className: "m-2 card" },
        modal && (React.createElement(UserModal, { handleClose: hideModal, mode: modalMode, id: userId, modal: modal, clientsCount: clientsCount, setClientsCount: setClientsCount })),
        alert && React.createElement(Popup, { onValidate: alertData.actionButton === 'Delete' ? handleDelete : handleReset, alertData: alertData, handleClose: hideAlert }),
        React.createElement("div", { className: "d-flex flex-wrap p-3" },
            React.createElement("div", { className: "d-flex me-auto" },
                React.createElement("h2", { className: "mt-2 me-2" },
                    React.createElement("span", null, i18next.t('Users')),
                    React.createElement("button", { className: "btn", onClick: function () { return showModal('create'); }, title: i18next.t('Add an user') },
                        React.createElement("i", { className: "bi bi-patch-plus-fill icon-large primary-color" }))),
                React.createElement(InputWithIcon, { className: "", label: "Search", onChange: onSearchChange, value: search })),
            React.createElement("div", { className: "d-flex" },
                React.createElement(Select, { options: options, value: show, onChange: onShowChange, className: "mt-2" }),
                React.createElement("button", { className: "btn", onClick: resetFilters },
                    React.createElement("i", { className: "bi bi-arrow-counterclockwise icon-large icon-large primary-color" })))),
        React.createElement("div", { className: "table-container" },
            React.createElement("table", { className: "table table-striped table-hover", style: { minWidth: '700px', overflowX: 'auto' } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: "Status", value: "status", sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: "First name", value: "firstname", sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: "Last name", value: "lastname", sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: "E-mail", value: "email", sortField: sortField, sortOrder: sortOrder }),
                        React.createElement(HeaderCell, { onSortChange: onSortChange, label: "2FA", value: "isTwoFactorAuthEnabled", sortField: sortField, sortOrder: sortOrder }),
                        React.createElement("th", { className: "header-cell", style: { color: 'rgba(0,0,0,.54)' } },
                            React.createElement("header-cell-content", null)))),
                React.createElement("tbody", null, clients && clients.map(function (client) {
                    return (React.createElement("tr", { key: client.id },
                        React.createElement("td", null,
                            React.createElement("button", { className: "btn", onClick: function () {
                                    changeStatus(client);
                                } },
                                React.createElement("i", { className: Number(currentUserId) === client.id
                                        ? 'bi bi-check-lg icon-large'
                                        : client.status === 1
                                            ? 'bi bi-check-lg icon-large primary-color'
                                            : 'bi bi-x-lg icon-large primary-color' }))),
                        React.createElement("td", null, client.firstname),
                        React.createElement("td", null, client.lastname),
                        React.createElement("td", null, client.email),
                        React.createElement("td", null,
                            React.createElement("span", null, client.isTwoFactorAuthEnabled === true
                                ? i18next.t('Enabled')
                                : i18next.t('Not enabled'))),
                        React.createElement("td", { style: { minWidth: 160 } },
                            React.createElement("button", { className: "btn btn-no-outline", onClick: function () { return showModal('edit', client.id); }, title: i18next.t('Edit') },
                                React.createElement("i", { className: "bi bi-pencil-fill icon-large primary-color" })),
                            React.createElement("button", { className: "btn", onClick: function () { return showAlert('reset', client.id); }, title: i18next.t('Reset password') },
                                React.createElement("i", { className: Number(currentUserId) === client.id
                                        ? 'bi bi-arrow-repeat icon-large'
                                        : 'bi bi-arrow-repeat icon-large primary-color' })),
                            React.createElement("button", { className: "btn", onClick: function () { return showAlert('delete', client.id); }, title: i18next.t('Delete') },
                                React.createElement("i", { className: Number(currentUserId) === client.id
                                        ? 'bi bi-trash-fill icon-large'
                                        : 'bi bi-trash-fill icon-large danger-color' })))));
                })))),
        React.createElement(Pagination, { userCount: clientsCount, onPaginationChange: onPaginationChange, onRowPerPageChange: onRowPerPageChange, pagination: pagination, rowPerPage: rowPerPage, setPagination: setPagination })));
};
