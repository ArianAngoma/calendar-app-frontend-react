import {useState} from "react";

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";

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

/* Fecha inicial */
const now = moment();
/* Fecha final */
const end = now.clone().add('1', 'days');

export const CalendarModal = () => {
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(end.toDate());

    /* Cerrar Modal */
    const closeModal = () => {

    }

    /* Inicio de fecha */
    const handleStartDateChange = (e) => {
        // console.log(e);
        setDateStart(e);
    }

    /* Fin de fecha */
    const handleEndDateChange = (e) => {
        // console.log(e);
        setDateEnd(e);
    }

    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-bottom">

                <h1> Nuevo evento </h1>
                <hr/>

                <form className="container">

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={dateStart}
                            className="form-control"
                            disableClock={true}
                            format="y-MM-dd"/>
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            className="form-control"
                            disableClock={true}
                            minDate={dateStart}
                            format="y-MM-dd"/>
                    </div>

                    <hr/>

                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"/>
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"/>
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