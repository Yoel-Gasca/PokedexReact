import { useState } from "react"

// Fucionamiento del formulario
export const useForm = (initialForm ={}) => {
    const [formState, setFormState] = useState(initialForm);

    // Entrada de formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //Reseteo de formulario
    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    };
    
};