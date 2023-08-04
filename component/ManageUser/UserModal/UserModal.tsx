import React from "react";
import i18next from "ng_client/node_modules/i18next/i18next.js";

import InputWithIcon from 'ng_client/component/Component/Inputs/InputWithIcon/InputWithIcon';
import Select from 'ng_client/component/Component/Selects/Select/Select'
import SearchSelect from 'ng_client/component/Component/Selects/SearchSelect/SearchSelect'
import {Model, Options} from "ng_client/component/interface/instanceInterface"


interface UserModalInterface{
    clientsCount : number,
    handleClose() : void,
    modal : boolean,
    mode : string,
    setClientsCount(clientsNumber : number) : void,
    id : number
}

const UserModal = ({clientsCount, handleClose, modal, mode, setClientsCount, id} : UserModalInterface) => {

    const localToken = localStorage.getItem("ls.auth_token");
    let token;
    if (localToken !== null) {
        token = localToken.replace(/"/g, "");
    }

    const [anrs, setAnrs] = React.useState<Model[]>([]);

    const rolesOptions = [
        { value: "superadminfo", translation: "Administrator" },
        { value: "userfo", translation: "User" },
        { value: "ceo", translation: "Global dashboard" },
    ];

    const permissionsOptions : Options[] = [
        { value: "-1", translation: "No access" },
        { value: "0", translation: "Read" },
        { value: "1", translation: "Read and write" },
    ];

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [roles, setRoles] = React.useState<string[]>([]);
    const [definePassword, setDefinePassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [userPermissions, setUserPermissions] = React.useState<{ id: any; rwd: any; }[]>([]);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    React.useEffect(() => {
        let anrsClient;
        const clientAnrFetch = fetch(`api/client-anr`, {
            headers: {
                Accept: "application/json, text/plain, */*",
                Token: token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setAnrs(data.anrs);
                anrsClient = data.anrs
            })
            .catch((error) => console.error(error));

        Promise.all([clientAnrFetch]).then( result => {
            if (mode !== "create") {
                fetch(`api/users/${id}`, {
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        Token: token,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        let permissions: { id: any; rwd: any }[] = [];
                        for (let i = 0; i < data.anrs.length; i++) {
                            permissions.push({
                                id: data.anrs[i].id,
                                rwd: data.anrs[i].rwd,
                            });
                        }
                        setFirstName(data.firstname);
                        setLastName(data.lastname);
                        setEmail(data.email);
                        setRoles(data.role);
                        setUserPermissions(permissions);
                        setDefinePassword(false);
                        setPassword("");
                        setConfirmPassword("");
                    })
                    .catch((error) => console.error(error));
            } else {
                let permissions: { id: any; rwd: any }[] = [];
    
                for(let i = 0; i<anrsClient.length; i++){
                    permissions.push({
                        id: anrsClient[i].id,
                        rwd: -1,
                    });
                }
                setFirstName("");
                setLastName("");
                setEmail("");
                setRoles([]);
                setUserPermissions(permissions);
                setDefinePassword(false);
                setPassword("");
                setConfirmPassword("");
            }
        })
    }, []);

    function onFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function onLastNameChange(event) {
        setLastName(event.target.value);
    }

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onDefinePasswordChange() {
        setDefinePassword(!definePassword);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function onConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function onUserArnsChange(event, anrId) {
        console.log(event, anrId);
        const selectedRwd = event.target.value;
        const anr = { id: Number(anrId), rwd: selectedRwd };
    
        setUserPermissions((prevPermissions) => {
            const existingAnrIndex = prevPermissions.findIndex((item) => item.id === anrId);
    
            if (selectedRwd === "-1") {
                if (existingAnrIndex !== -1) {
                    const updatedPermissions = [...prevPermissions];
                    updatedPermissions[existingAnrIndex] = { ...prevPermissions[existingAnrIndex], rwd: selectedRwd };
                    return updatedPermissions;
                }
            } else {
                if (existingAnrIndex !== -1) {
                    return prevPermissions.map((item) =>
                        item.id === anrId ? { ...item, rwd: selectedRwd } : item
                    );
                } else {
                    return [...prevPermissions, anr];
                }
            }
            return prevPermissions; 
        });
    }
    

    function onValidation() {
        if (mode === "create") {
            fetch(`api/users`, {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Token: token,
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    role: roles,
                    anrs: userPermissions,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setClientsCount(clientsCount + 1);
                    }
                })
                .catch((error) => console.error(error));
        } else {
            fetch(`api/users/${id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Token: token,
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    role: roles,
                    anrs: userPermissions,
                }),
            }).catch((error) => console.error(error));
        }
        handleClose();
    }


    function disabeldCreate() {
        if (firstName === "" || lastName == "" || email == "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="modal-alert">
            <div
                className={`${windowWidth > 960 ? "modal-user" : "modal-user-fullscreen"
                    } d-flex flex-column`}
            >
                <div className="d-flex justify-content-between primary-backgroundcolor">
                    <h4 className="m-3">
                        {mode === "create"
                            ? i18next.t("Add an user")
                            : i18next.t("Edit user")}
                    </h4>
                    <button
                        className="btn me-2"
                        onClick={handleClose}
                        style={{ color: "white" }}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="userForm flex-grow-1">
                    <form className="m-3">
                        <div className="d-flex">
                            <InputWithIcon
                                hasToBeFilled={true}
                                icon="bi bi-person-fill"
                                label="First name"
                                value={firstName}
                                onChange={onFirstNameChange}
                                className="flex-grow-1"
                                title={i18next.t("Please fill out this field.")}
                            />
                            <InputWithIcon
                                hasToBeFilled={true}
                                label="Last name"
                                value={lastName}
                                onChange={onLastNameChange}
                                className="flex-grow-1 ms-2"
                                title={i18next.t("Please fill out this field.")}
                            />
                        </div>
                        <div>
                            <InputWithIcon
                                hasToBeFilled={true}
                                icon="bi bi-envelope-fill"
                                label="E-mail"
                                value={email}
                                onChange={onEmailChange}
                                title={i18next.t("Please fill out this field.")}
                            />
                        </div>
                        <SearchSelect
                            value={roles}
                            label="Permissions and roles"
                            setValue={setRoles}
                            options={rolesOptions}
                            multiple={true}
                            icon="bi bi-card-list"
                        />
                        <div className="form-check form-switch my-4 pl-5">
                            <input
                                className="form-check-input switch-input-lg"
                                type="checkbox"
                                onChange={onDefinePasswordChange}
                            />
                            <label className="form-check-label ps-3">
                                {i18next.t("Set password")}
                            </label>
                        </div>
                        {definePassword && (
                            <div className='pb-4'>
                                <InputWithIcon
                                    icon="bi bi-lock-fill"
                                    label="Password"
                                    value={password}
                                    onChange={onPasswordChange}
                                />
                                <InputWithIcon
                                    icon="bi bi-lock-fill"
                                    label="Confirm password"
                                    value={confirmPassword}
                                    onChange={onConfirmPasswordChange}
                                />
                            </div>
                        )}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>{i18next.t("Risk analysis label")}</th>
                                    <th>{i18next.t("Persmissions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {anrs.map((anr, index) => {
                                    return (
                                        <tr key={anr.id}>
                                            <td>{anr[`label${anr.language}`]}</td>
                                            <td>
                                                <Select
                                                    options={permissionsOptions}
                                                    onChange={onUserArnsChange}
                                                    value={userPermissions[index] ? userPermissions[index].rwd : ""}
                                                    index={anr.id} 
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className="d-flex justify-content-end align-items-center my-3">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleClose}
                    >
                        {i18next.t("Cancel")}
                    </button>
                    <button
                        className="btn btn-outline-warning mx-2"
                        onClick={onValidation}
                        disabled={disabeldCreate()}
                    >
                        {mode === "create"
                            ? i18next.t("Create")
                            : i18next.t("Save")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
