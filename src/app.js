import React, {useState, useHook} from "react";

const App = () => {

    const [message, setMessage] = useState('frontend');

    

    return (
        <div>
           {message}
        </div>
    )
}

export default App;

