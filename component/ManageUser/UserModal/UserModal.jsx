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
                            React.createElement(InputWithIcon, {label: 'Last name', value: lastName, onChange: onLastNameChange, className: 'flex-grow-1 ms-2', title: i18next.t('Please fill out this field.') })
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


exports.UserModal = UserModal