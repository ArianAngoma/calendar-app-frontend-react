import Modal from 'react-modal';
import {useState} from "react";

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

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    /* Cerrar Modal */
    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-bottom">

                <h1>Hola Mundo</h1>
                <hr/>
                <span>Hola</span>

            </Modal>
        </div>
    )
}