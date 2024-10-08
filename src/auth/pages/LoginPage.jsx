import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useForm, useAuthStore } from '../../hooks';

import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const { errorMessage, startLogin, startRegister } = useAuthStore();

    const { loginEmail, 
        loginPassword, 
        onInputChange:onLoginInputChange } = useForm(loginFormFields);
    const {
        registerName, registerEmail, 
        registerPassword, 
        registerPassword2, 
        onInputChange:onRegisterInputChange} = useForm(registerFormFields);

    
    useEffect(() => {
        if( errorMessage !== undefined ) {
            Swal.fire("Error en login",errorMessage,"error");
        }
    }, [errorMessage])
    

    const loginSubmit = ( event ) => {
        event.preventDefault();

        if( !loginEmail ) {
            Swal.fire("Error en login","Falta indicar correo","error");
            return;
        }
        if( !loginPassword ) {
            Swal.fire("Error en login","Falta indicar contraseña","error");
            return;
        }

        startLogin({ email:loginEmail, password:loginPassword });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        
        if( !registerName ) {
            Swal.fire("Error en login","Falta indicar nombre","error");
            return;
        }
        if( !registerEmail ) {
            Swal.fire("Error en login","Falta indicar correo","error");
            return;
        }
        if( !registerPassword ) {
            Swal.fire("Error en login","Falta indicar contraseña","error");
            return;
        }
        if( registerPassword !== registerPassword2 ) {
            Swal.fire("Error en registro","No coinciden las contraseñas","error");
            return;
        }

        startRegister({ name:registerName, email:registerEmail, password:registerPassword });
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
