import React, { useState } from "react";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        //this prevents the default behavior of the form which is to reload entire page
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };
        fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/login", 
        {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                onLoggedIn(username);
            } else {
                alert("Login Failed.")
            }
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                minLength={5}
                required
            />
            </label>
            <label>
                Password:
                <input type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};