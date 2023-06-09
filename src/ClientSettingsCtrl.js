(function () {

/*   i18next
  .init({
      lng: localStorage.getItem('ls.uiLanguage').replace(/"/g, ''),
      debut: true,
      resources: {
          0: {
              translation: en
          },
          1: {
              translation: fr,
          }
      }
  }) */

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
                        defaultValue: props.value,
                        onChange: props.onChange
                    })
                ),
            )
        )
    }

  const SelectWithIcon = (props) => {
    return React.createElement(
      'div', { className: 'row mb-2' },
      React.createElement(
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


  const GeneralSettings = () => {

    const token = localStorage.getItem('ls.auth_token').replace(/"/g, '');

    const options = [
      { value: 'true', translation: 'I agree' },
      { value: 'false', translation: 'I don’t agree' }
    ];
    
    const [client, setClient] = React.useState({
      contact_email: '',
      id: 0,
      model_id: 0,
      name: '',
      stats: false,
    });

    const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');

    var isInvalidEmail;

    if (client.contact_email === '') {
      isInvalidEmail = false
    }
    else {
      isInvalidEmail = !emailRegex.test(client.contact_email)
    }

    function updateClient() {
      if (client.id > 0) {
        fetch('api/client/' + client.id, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Token': token
          },
          body: JSON.stringify(client)
        })
          .catch(error => {
            console.error(error)
          });

        fetch('api/stats/general-settings/', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Token': token
          },
          body: JSON.stringify({ is_sharing_enabled: client.stats })
        })
          .catch(error => {
            console.error(error)
          })
      }
    }

    function onClientNameChange(event) {
      setClient({ ...client, name: event.target.value })
    }

    function onClientMailChange(event) {
      setClient({ ...client, contact_email: event.target.value })
    }

    function onShareStatsChange(event) {
      setClient({ ...client, stats: JSON.parse(event.target.value) })
    }

    React.useEffect(() => {
      let tempClientData = {};

      const fetchClientData = fetch('api/client', {
        headers: {
          'Token': token
        }
      })
        .then(response => response.json())
        .then(data => {
          const dataOf = data.clients[0];
          tempClientData = { ...tempClientData, ...dataOf };
        })
        .catch(error => console.error(error));

      const fetchStats = fetch('api/stats/general-settings/', {
        headers: {
          'Token': token
        }
      })
        .then(response => response.json())
        .then(data => {
          const stats = data.data.is_sharing_enabled;
          tempClientData = { ...tempClientData, stats };
        })
        .catch(error => console.error(error));

      Promise.all([fetchClientData, fetchStats])
        .then(() => {
          setClient(tempClientData);
        });
    }, []);


    return React.createElement('div', { className: 'm-2' },
      React.createElement('div', { className: 'card' },
        React.createElement('div', { className: 'card-body' },
          React.createElement('h3', { className: 'my-3' }, i18next.t('General settings')),
          React.createElement('form', { name: 'clientForm', onSubmit: updateClient },
            React.createElement('h2', { className: 'mb-4' }, i18next.t('Organization information')),
            React.createElement(InputWithIcon, { icon: 'bi bi-caret-right-fill', label: 'Name', value: client.name, onChange: onClientNameChange }),
            React.createElement(InputWithIcon, { icon: 'bi bi-envelope-fill', label: 'Contact e-mail', value: client.contact_email, onChange: onClientMailChange }),
            isInvalidEmail && React.createElement('div', { className: 'text-danger' },
              React.createElement('p', { className: 'd-flex justify-content-center', style: { color: 'red' } }, i18next.t('You must enter a valid e-mail address'))
            ),
            React.createElement('h2', { className: 'mb-4' }, i18next.t('Sharing statistics')),
            React.createElement(SelectWithIcon, { icon: 'bi bi-bar-chart-fill', label: 'Do you agree to share the statistics ?', value: client.stats.toString(), onChange: onShareStatsChange, options: options }),
            React.createElement('div', { className: 'form-group mt-4' },
              React.createElement('button', {
                className: 'btn btn-primary',
                disabled: (client.name === '' || client.contact_email === '' || isInvalidEmail) ? true : false
              }, i18next.t('Update settings'))
            )
          )
        )
      )
    );
  }


  angular
    .module('ClientApp')
    .controller('ClientSettingsCtrl', [
      '$scope', 'gettextCatalog', 'toastr', '$http', 'StatsService',
      ClientSettingsCtrl
    ])
    .component('generalSettings', react2angular(GeneralSettings))


  /**
  * Account Controller for the Client module
  */
  function ClientSettingsCtrl($scope, gettextCatalog, toastr, $http, StatsService) {

    $scope.getSettings = function () {
      $http.get('api/client').then(function (data) {
        if (data.data.clients.length > 0) {
          $scope.client = data.data.clients[0];

          StatsService.getGeneralSettings()
            .then(function (data) {
              $scope.client.stats = data.data.is_sharing_enabled;
            });
        } else {
          $scope.client = {
            contact_email: '',
            id: 0,
            model_id: 0,
            name: '',
            stats: false,
          }
        }
      });
    }

    $scope.updateClient = function () {
      if ($scope.client.id > 0) {

        $http.patch('api/client/' + $scope.client.id, $scope.client).then(function () {
          StatsService.updateGeneralSettings(null, { is_sharing_enabled: $scope.client.stats }).then(function () {
            toastr.success(gettextCatalog.getString('Your settings have been updated successfully'));
          });
        });
      } else {
        $http.post('api/client', $scope.client).then(function () {
          StatsService.updateGeneralSettings(null, { is_sharing_enabled: $scope.client.stats }).then(function () {
            toastr.success(gettextCatalog.getString('Your settings have been updated successfully'));
          });
        });
      }
    }
  }
})();
