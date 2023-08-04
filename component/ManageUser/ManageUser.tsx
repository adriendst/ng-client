import React from 'react'
import i18next from 'ng_client/node_modules/i18next/i18next.js'
import InputWithIcon from 'ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon';
import Select from 'ng_client/component/Component/Selects/Select/Select'
import UserModal from 'ng_client/component/ManageUser/UserModal/UserModal'
import HeaderCell from 'ng_client/component/ManageUser/HeaderCell/HeaderCell'
import Pagination from 'ng_client/component/Component/Pagination/Pagination'
import Popup from 'ng_client/component/Component/Popup/Popup'

import {AlertData, Client} from "ng_client/component/interface/instanceInterface"

const ManageUser = (props) => {

  const localToken = localStorage.getItem('ls.auth_token');
  let token;
  if (localToken !== null) {
   token = localToken.replace(/"/g, '');
  }  
  
  const currentUserId = localStorage.getItem('ls.uid');

  const [clients, setClients] = React.useState<Client[]>([]);
  const [clientsCount, setClientsCount] = React.useState(0);

  const [search, setSearch] = React.useState('');
  const [show, setShow] = React.useState('1');

  const [modal, setModal] = React.useState(false);
  const [modalMode, setModalMode] = React.useState('create');
  const [userId, setUserId] = React.useState();

  const [alertData, setAlertData] = React.useState<AlertData | undefined>();
  const [alert, setAlert] = React.useState(false);

  const [sortField, setSortField] = React.useState('firstname');
  const [sortOrder, setSortOrder] = React.useState('-');
  const [pagination, setPagination] = React.useState(1);
  const [rowPerPage, setRowPerPage] = React.useState(25);

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
      } else {
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
    fetch(
      `api/users?filter=${search}&limit=${rowPerPage}&order=${sortOrder}${sortField}&page=${pagination}&status=${show}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Token: token
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setClients(data.users);
        setClientsCount(data.count);
      })
      .catch((error) => console.error(error));
  }

  React.useEffect(() => {
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
    } else {
      setSortField(field);
      setSortOrder('');
    }
  }

  function changeStatus(client) {
    if (client.id !== Number(currentUserId)) {
      const updatedStatus = client.status === 1 ? 0 : 1;
      const updatedClient = { ...client, status: updatedStatus };

      const updatedClients = clients?.map((c) =>
        c.id === client.id ? updatedClient : c
      );
      setClients(updatedClients);

      fetch(`api/users/${client.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Token: token
        },
        body: JSON.stringify(updatedClient)
      }).catch((error) => console.error(error));
    }
  }

  //Status options
  const options = [
    { value: 'all', translation: 'Show all' },
    { value: '0', translation: 'Show inactive only' },
    { value: '1', translation: 'Show active only' }
  ];

  function handleReset() {
    fetch(`api/users/${userId}/resetPassword`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
            'Token': token
        }
    })
        .catch(error => console.error(error));
    hideAlert()
}

function handleDelete() {
  fetch(`api/users/${userId}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Token': token
      }
  })
      .catch(error => console.error(error));

  hideAlert()
  getUsers()
  setClientsCount(clientsCount - 1)
}

  return (
    <div className="m-2 card">
      {modal && (
        <UserModal
          handleClose={hideModal}
          mode={modalMode}
          id={userId}
          modal={modal}
          clientsCount={clientsCount}
          setClientsCount={setClientsCount}
        />
      )}
      {alert && <Popup
      onValidate={alertData?.actionButton === 'Delete' ? handleDelete : handleReset}
        alertData={alertData}
        handleClose={hideAlert}
      />}
      <div className="d-flex flex-wrap p-3">
        <div className="d-flex me-auto">
          <h2 className="mt-2 me-2">
            <span>{i18next.t('Users')}</span>
            <button
              className="btn"
              onClick={() => showModal('create', 0)}
              title={i18next.t('Add an user')}
            >
              <i className="bi bi-patch-plus-fill icon-large primary-color" />
            </button>
          </h2>
          <InputWithIcon
            label="Search"
            onChange={onSearchChange}
            value={search}
            className='flex-grow-1'
          />
        </div>
        <div className="d-flex">
          <Select
            options={options}
            value={show}
            onChange={onShowChange}
            customWidth='200px'
          />
          <button className="btn" onClick={resetFilters}>
            <i className="bi bi-arrow-counterclockwise icon-large icon-large primary-color" />
          </button>
        </div>
      </div>
      <div className="table-container">
        <table
          className="table table-striped table-hover"
          style={{ minWidth: '700px', overflowX: 'auto' }}
        >
          <thead>
            <tr>
              <HeaderCell
                onSortChange={onSortChange}
                label="Status"
                value="status"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <HeaderCell
                onSortChange={onSortChange}
                label="First name"
                value="firstname"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <HeaderCell
                onSortChange={onSortChange}
                label="Last name"
                value="lastname"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <HeaderCell
                onSortChange={onSortChange}
                label="E-mail"
                value="email"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <HeaderCell
                onSortChange={onSortChange}
                label="2FA"
                value="isTwoFactorAuthEnabled"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <th className="header-cell" style={{ color: 'rgba(0,0,0,.54)' }}>
{/*                 <header-cell-content />
 */}              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              return (
                <tr key={client.id}>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        changeStatus(client);
                      }}
                    >
                      <i
                        className={
                          Number(currentUserId) === client.id
                            ? 'bi bi-check-lg icon-large'
                            : client.status === 1
                              ? 'bi bi-check-lg icon-large primary-color'
                              : 'bi bi-x-lg icon-large primary-color'
                        }
                      />
                    </button>
                  </td>
                  <td>{client.firstname}</td>
                  <td>{client.lastname}</td>
                  <td>{client.email}</td>
                  <td>
                    <span>
                      {client.isTwoFactorAuthEnabled === true
                        ? i18next.t('Enabled')
                        : i18next.t('Not enabled')}
                    </span>
                  </td>
                  <td style={{ minWidth: 160 }}>
                    <button
                      className="btn btn-no-outline"
                      onClick={() => showModal('edit', client.id)}
                      title={i18next.t('Edit')}
                    >
                      <i className="bi bi-pencil-fill icon-large primary-color" />
                    </button>
                    <button
                      className="btn"
                      onClick={() => showAlert('reset', client.id)}
                      title={i18next.t('Reset password')}
                    >
                      <i
                        className={
                          Number(currentUserId) === client.id
                            ? 'bi bi-arrow-repeat icon-large'
                            : 'bi bi-arrow-repeat icon-large primary-color'
                        }
                      />
                    </button>
                    <button
                      className="btn"
                      onClick={() => showAlert('delete', client.id)}
                      title={i18next.t('Delete')}
                    >
                      <i
                        className={
                          Number(currentUserId) === client.id
                            ? 'bi bi-trash-fill icon-large'
                            : 'bi bi-trash-fill icon-large danger-color'
                        }
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        userCount={clientsCount}
        onPaginationChange={onPaginationChange}
        onRowPerPageChange={onRowPerPageChange}
        pagination={pagination}
        rowPerPage={rowPerPage}
        setPagination={setPagination}
      />
    </div>
  );
};

export default ManageUser;