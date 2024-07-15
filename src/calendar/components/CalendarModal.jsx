import { useMemo, useState } from "react";
import { addHours, differenceInSeconds, isDate } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from "../../hooks";

import "./CalendarModal.css";

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}

//es el id del elemento que está en index.html
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { closeDateModal } = useUiStore();
    const { isDateModalOpen } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState( false );

    const [formValues, setformValues] = useState({
        title: 'Titulo',
        notes: 'Notas',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });

    const { title, notes, start, end } = formValues;

    const titleClass = useMemo( () => {

        if( !formSubmitted ) return '';

        return ( title.length <= 0 ? 'is-invalid' : '')

    }, [ title, formSubmitted ]);


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

    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted( true );
        
        if( start === null ) {
            Swal.fire("Error en fechas","Falta ingresar Fecha y hora inicio","error");
            return;
        }

        const difference = differenceInSeconds( end, start );
        if( isNaN( difference ) || difference < 0 ) {
            Swal.fire("Error en fechas","Revisar las fechas ingresadas","error");
            return;
        } 

        if( title.length <= 0 ) return; 
        
    }

    const onClose = () => {
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
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={ onSubmit } className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ start }
                        onChange={ (event) => onDatePickerChanged(event, 'start') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={ formValues.start }
                        selected={ end }
                        onChange={ (event) => onDatePickerChanged(event, 'end') }
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ "form-control " + titleClass }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ onInputChanged }
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
                        value={ notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

