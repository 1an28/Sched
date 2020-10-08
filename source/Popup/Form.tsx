import React from "react";

const Form: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        alert('A name was submitted');
        event.preventDefault();
    };

    return(
        <form onSubmit = {handleSubmit}>
            <input type = "time" />
            <input type = "time" />
            <input type = "submit" />
        </form>
    );
};

export default Form;