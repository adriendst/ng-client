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
                    React.createElement('div', { className: 'm-3' },
                        React.createElement('h4', null, i18next.t(props.alertData.title)),
                        React.createElement('p', null, i18next.t(props.alertData.text))
                    ),
                    React.createElement('div', { className: 'd-flex justify-content-end fixed-bottom m-2' },
                        React.createElement('button', { className: 'btn btn-outline-primary mr-2', onClick: props.handleClose },
                            i18next.t('Cancel')
                        ),
                        React.createElement('button', { className: 'btn btn-outline-primary', onClick: props.alertData.actionButton === 'Delete' ? handleDelete : handleReset },
                            i18next.t(props.alertData.actionButton)
                        )
                    )
                )
            )
        )
    )
}


exports.UserAlert = UserAlert