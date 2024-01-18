import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const URL = "https://film-flix-3b34b5f2dccd.herokuapp.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    fetch(URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  return (
    <form>
      <label>
        Username:
        <input  
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5}
          required
        />
      </label>
      <label>
        Passport:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          suggested= "current-password"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
