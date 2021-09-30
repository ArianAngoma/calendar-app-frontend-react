import {useState} from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // Funcion para limpiar el formulario
    const reset = (newFormState = initialState) => {
        setValues(newFormState)
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset];
}