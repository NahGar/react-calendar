import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

import "./CalendarModal.css";

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%', left: '50%', right: 'auto', bottom: 'auto%', marginRight: '-50%', transform: 'translate(-50%, -50%)',
    }
}

//es el id del elemento que está en index.html
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { user } = useAuthStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    const { isDateModalOpen, closeDateModal } = useUiStore();
    
    const [formSubmitted, setFormSubmitted] = useState( false );

    const [contolsDisabled, setContolsDisabled] = useState( false );

    const [formValues, setformValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
    });

    let title, notes, start, end;
    if( formValues !== null ) {
        title = formValues.title;
        notes = formValues.notes;
        start = formValues.start;
        end = formValues.end;
    } 
 
    const titleClass = useMemo( () => {
        
        if( !formSubmitted ) return '';
        
        return ( title.length <= 0 ? 'is-invalid' : '')
        
    }, [ title, formSubmitted ]);
    
    useEffect(() => {
        if( activeEvent !== null ) {
            setformValues({ ...activeEvent });

            setContolsDisabled( ( activeEvent.id === undefined || activeEvent.user._id === user.uid ) ? false : true );
        }
    }, [activeEvent]);

    console.log({contolsDisabled});
    

    const onInputChanged = ( value ) => {
        setformValues({
            ...formValues,
            [value.target.name]: value.target.value
        });
    }

    //elementChanging = start || end. event = valor
    const onDatePickerChanged = ( event, elementChanging ) => {
        setformValues({
            ...formValues,
            [elementChanging]: event
        });
    }

    const onSubmit = async ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );
        
        if( start === null ) {
            Swal.fire("Error en fechas","Falta ingresar Fecha y hora inicio","error");
            return;
        }

        const difference = differenceInSeconds( end, start );
        if( isNaN( difference ) || difference < 0 ) {
            Swal.fire("Error en fechas","Revisar las fechas/horas ingresadas","error");
            return;
        }

        if( title.length <= 0 ) return; 
        
        await startSavingEvent( formValues );

        onClose();
    }

    const onClose = () => {
        setFormSubmitted(false);
        closeDateModal();
    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onClose }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-11">
                        <h1> { ( !formValues.hasOwnProperty("_id") ) ? "Nuevo evento" : "Modificar evento" } </h1>
                    </div>
                    <div className="col-1 float-end">
                        <button className="btnClose" onClick={ onClose }><i className="fa-solid fa-square-xmark"></i> </button>   
                    </div>
                </div>
            </div>
            
            <hr />
            <form onSubmit={ onSubmit } className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ start || '' }
                        onChange={ (event) => onDatePickerChanged(event, 'start') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        disabled={ contolsDisabled }
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={ start }
                        selected={ end || ''}
                        onChange={ (event) => onDatePickerChanged(event, 'end') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        disabled={ contolsDisabled }
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Título y notas</label>
                    <input 
                        type="text" 
                        className={ "form-control " + titleClass }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title || '' }
                        onChange={ onInputChanged }
                        disabled={ contolsDisabled }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes || '' }
                        onChange={ onInputChanged }
                        disabled={ contolsDisabled }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className="form-group mb-2">
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block floatRight"
                        disabled={ contolsDisabled }
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </div>

            </form>

        </Modal>
    )
}

