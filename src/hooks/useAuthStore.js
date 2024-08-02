import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        
        dispatch( onChecking() );
        
        try {
            const { data } = await calendarApi.post('/auth',{ email, password });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-date', new Date().getTime() );
            const { name, uid } = data;

            dispatch( onLogin({ name, uid }) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        
        dispatch( onChecking() );
        
        try {
            const resp = await calendarApi.post('/auth/new',{ name, email, password });
            
            const { uid, token } = resp.data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-date', new Date().getTime() );

            dispatch( onLogin({ name, uid }) );

        } catch (error) {
            console.log(error);

            dispatch( onLogout( error.response.data?.msg ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        
        const token = localStorage.getItem('token');
        if( !token ) {
            return dispatch( onLogout() );
        }

        try {
            const resp = await calendarApi.get('/auth/renew');
            
            const { name, uid, token } = resp.data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-date', new Date().getTime() );

            dispatch( onLogin({ name, uid }) );

        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }
    
    return {
        //propiedades
        status, 
        user, 
        errorMessage,

        //metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}