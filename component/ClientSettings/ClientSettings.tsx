import React from 'react'
import i18next from "ng_client/node_modules/i18next/i18next.js";
import InputWithIcon from 'ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon';
import EmailInput from 'ng_client/component/Component/Inputs/EmailInput/EmailInput'
import Select from 'ng_client/component/Component/Selects/Select/Select'

import {Client} from "ng_client/component/interface/instanceInterface"

const ClientSettings = () => {

  const localToken = localStorage.getItem('ls.auth_token');
  let token;
  if (localToken !== null) {
   token = localToken.replace(/"/g, '');
  }

  const options = [
    { value: 'true', translation: 'I agree' },
    { value: 'false', translation: 'I don’t agree' }
  ];

  const [client, setClient] = React.useState<Client>({
    contact_email: '',
    id: 0,
    model_id: 0,
    name: '',
    stats: false,
  });

  const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
  const secondPartRegex = new RegExp('^[a-zA-Z0-9.]+$');



  const [isValidEmail, setIsValidEmail] = React.useState(true)
  const [emailWarningMessage, setEmailWarningMessage] = React.useState('')



  React.useEffect(() => {
/*     console.log(client.contact_email)
    console.log(secondPartRegex.test(client.contact_email.split('@')[1])) */

    if (client.contact_email === '') {
      setIsValidEmail(false)
      setEmailWarningMessage('Please fill out this field')
    }
    else {
      if (emailRegex.test(client.contact_email)) {
        setIsValidEmail(true)
        setEmailWarningMessage('')
      }
      else {
        setIsValidEmail(false)
/*         console.log(client.contact_email.includes('@'))
        console.log(client.contact_email.slice(-1)) */
        if (client.contact_email.includes('@')) {
          if (client.contact_email.slice(-1) === '@') {
            setEmailWarningMessage(`Please enter a part following \'@\'. \'${client.contact_email}\' is complete.`)
          }
          else if(client.contact_email.slice(-1) === '.'){
            const secondPart = client.contact_email.split('@')[1]
            setEmailWarningMessage(`\'.\' is used at a wrong position in \'${secondPart}\'`)
          }
          else if(!secondPartRegex.test(client.contact_email.split('@')[1])){
            const secondPart = client.contact_email.split('@')[1];
            const invalidCharacterMatch = secondPart.match(/[^A-Za-z0-9.]/);
            let invalidCharacter;
            if (invalidCharacterMatch !== null) {
               invalidCharacter = invalidCharacterMatch[0];
              // Continue with the rest of your code
            }            setEmailWarningMessage(`A part following \'@\' should not contain the symbol \'${invalidCharacter}\'`);
          }
        }
        else {
          setEmailWarningMessage(`Please include an \'@\' in the email adress. \'${client.contact_email}\' is missing an \'@\'.`)
        }
      }
    }

  }, [client.contact_email])


  function updateClient() {
    if (client.id > 0) {
      const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      };
      
      if (token !== null) {
        headers['Token'] = token;
      }
      
      fetch('api/client/' + client.id, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(client)
      })
        .catch(error => {
          console.error(error);
        });

      fetch('api/stats/general-settings/', {
        method: 'PATCH',
        headers,
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
/*     let tempClientData: {
      contact_email: string;
      id: number;
      model_id: number;
      name: string;
      stats: boolean;
    } = {
      contact_email: '',
      id: 0,
      model_id: 0,
      name: '',
      stats: false,
    }; */


    let tempClientData;

    const headers = {}
    if(token !== null){
headers['Token'] = token
    }

    const fetchClientData = fetch('api/client', {
      headers
    })
      .then(response => response.json())
      .then(data => {
        const dataOf = data.clients[0];
        tempClientData = { ...tempClientData, ...dataOf};
      })
      .catch(error => console.error(error));

    const fetchStats = fetch('api/stats/general-settings/', {
      headers
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


  return (
    <div className="m-2">
      <div className="card">
        <div className="card-body">
          <h3 className="my-3">{i18next.t('General settings')}</h3>
          <form name="clientForm" onSubmit={updateClient}>
            <h2 className="mb-4">{i18next.t('Organization information')}</h2>
            <InputWithIcon
              hasToBeFilled
              icon="bi bi-caret-right-fill"
              label="Name"
              value={client.name}
              onChange={onClientNameChange}
            />
            <EmailInput
              isCorrectlyFilled={isValidEmail}
              icon="bi bi-envelope-fill"
              label="Contact e-mail"
              value={client.contact_email}
              onChange={onClientMailChange}
              title={emailWarningMessage}
            />
            {/* {isInvalidEmail && (
              <div className="text-danger">
                <p className="d-flex justify-content-center" style={{ color: 'red' }}>
                  {i18next.t('You must enter a valid e-mail address')}
                </p>
              </div>
            )} */}
            <h2 className="mb-4">{i18next.t('Sharing statistics')}</h2>
            <Select
              icon="bi bi-bar-chart-fill"
              label="Do you agree to share the statistics ?"
              value={client.stats.toString()}
              onChange={onShareStatsChange}
              options={options}
            />
            <div className="form-group mt-4">
              <button
                className="btn btn-primary"
                disabled={client.name === '' || client.contact_email === '' || !isValidEmail}
              >
                {i18next.t('Update settings')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSettings