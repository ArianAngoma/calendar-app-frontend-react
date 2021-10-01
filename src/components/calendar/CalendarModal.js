import {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import DatePicker, {registerLocale} from 'react-datepicker';
import es from 'date-fns/locale/es';
import moment from 'moment';
import Swal from 'sweetalert2';

/* Importaciones propias */
import {useForm} from '../../hooks/useForm';
import {uiCloseModal} from '../../actions/ui';
import {eventAddNew, eventClearActiveEvent} from '../../actions/events';

/* Estilos del DatePicker */
import 'react-datepicker/dist/react-datepicker.css';

/* Estilos del Modal */
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

/* Configuración del Modal */
Modal.setAppElement('#root');

/* Configuración del idioma de DatePicker */
registerLocale('es', es);

/* Fecha inicial */
const now = moment().minutes(0).seconds(0).add(1, 'hours');
/* Fecha final */
const end = now.clone().add(1, 'hours');

/* Estado inicial del evento */
const initEvent = {
    title: '',
    notes: '',
    star: now.toDate(),
    end: end.toDate()
}

export const CalendarModal = () => {
    /* dispatch de Redux */
    const dispatch = useDispatch();

    /* Estado del modal */
    const {modalOpen} = useSelector(state => state.ui);
    /* Estado del activeEvent */
    const {activeEvent} = useSelector(state => state.calendar);

    /* Estados de las fechas */
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());

    /* Estado del título del formulario */
    const [titleValid, setTitleValid] = useState(true);

    /* Obtener información del formulario */
    const [formValues, handleInputChange, reset] = useForm(initEvent)
    const {title, notes, start, end: endDate} = formValues;

    /* Cambiar la información de formValues con la información de activeEvent */
    useEffect(() => {
        // console.log(activeEvent);
        if (activeEvent) reset(activeEvent);
    }, [activeEvent, reset]);

    /* Cerrar Modal */
    const closeModal = () => {
        dispatch(uiCloseModal());

        /* Limpiar evento activo */
        dispatch(eventClearActiveEvent());

        /* Limpiar formValues */
        reset(initEvent);
    }

    /* Inicio de fecha */
    const handleStartDateChange = (e) => {
        // console.log(e);
        setDateStart(e);

        /* Cambiar el estado si cambia la fecha de inicio */
        reset({
            ...formValues,
            start: e
        })
    }

    /* Fin de fecha */
    const handleEndDateChange = (e) => {
        // console.log(e);
        setDateEnd(e);

        /* Cambiar el estado si cambia la fecha de fin */
        reset({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        // console.log(formValues);

        const momentStart = moment(start);
        const momentEnd = moment(endDate);

        /* Validar las fechas */
        if (momentStart.isSameOrAfter(momentEnd)) return Swal.fire('Error', 'La fecha fin debe de ser mayor o igual a la fecha de inicio', 'error');

        /* Validar el título */
        if (title.trim().length < 2) return setTitleValid(false);
        else setTitleValid(true);

        /* Grabar un nuevo evento */
        dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Angoma'
            }
        }));

        /* Cerrar el modal */
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-bottom">

                <h1> Nuevo evento </h1>
                <hr/>

                <form className="container"
                      onSubmit={handleSubmitForm}>

                    <div className="form-group">
                        <label>Fecha de inicio</label>
                        <DatePicker
                            locale="es"
                            selected={dateStart}
                            onChange={handleStartDateChange}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={20}
                            timeCaption="time"
                            dateFormat="MMM d, yyyy h:mm aa"/>
                    </div>

                    <div className="form-group">
                        <label>Fecha de fin</label>
                        <DatePicker
                            locale="es"
                            selected={dateEnd}
                            onChange={handleEndDateChange}
                            className="form-control"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={20}
                            timeCaption="time"
                            dateFormat="MMM d, yyyy h:mm aa"
                            minDate={dateStart}/>
                    </div>

                    <hr/>

                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && 'is-invalid'}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={title}/>
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            onChange={handleInputChange}
                            value={notes}/>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block">
                        <i className="far fa-save"/>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    )
}