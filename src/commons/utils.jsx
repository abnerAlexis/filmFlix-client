export const mapMovie = (movie) => {
  return {
    Id: movie._id,
    Title: movie.Title,
    Year: movie.Year,
    Image: movie.ImageURL,
    Genre: movie.Genre,
    Featured: movie.Featured.toString(),
    Description: movie.Description,
    Director: movie.Director.Name,
    Actors: movie.Actors.join(", "),
  };
};

export const updateFavoriteMovies = async (
  username,
  token,
  movieId,
  methodType
) => {
  console.log(`movieId: ${movieId}`);

  try {
    const fetchUrl = `https://film-flix-3b34b5f2dccd.herokuapp.com/users/${username}/movies/${movieId}`;
    console.log(`fetchUrl: ${fetchUrl}`);
    console.log(`token: ${token}`);
    console.log(`username: ${username}`);
    const response = await fetch(fetchUrl, {
      method: methodType.toUpperCase(),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed ot toggle favorite status");
    } else {
      console.log("Everything went well.");
    }
  } catch (error) {
    console.error("Error updating favorites:", error.message);
  }
};

export const deleteAccount = async (username, token) => {
  try {
    const deleteResponse = await fetch(
      `https://film-flix-3b34b5f2dccd.herokuapp.com/users/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Your account has been successfully deleted.");
        console.log("Your account has been successfully deleted.");
      } else {
        alert("Your account has NOT been deleted.");
        console.log("Your account has NOT been deleted.");
      }
    });
  } catch (error) {
    alert("ERROR: Your account has NOT been deleted.");
    console.log("Update failed Error:", error.toString());
  }
};

export const updateUser = async (username, newUser, token) => {
  console.log(
    `username: ${username}, newUser: ${JSON.stringify(
      newUser
    )}, token: ${token}`
  );
  try {
    const response = await fetch(
      `https://film-flix-3b34b5f2dccd.herokuapp.com/users/update/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Your account has been successfully updated.");
        console.log("Your account has been successfully updated.");
      } else {
        alert("Your account has NOT been updated.");
        console.log("Your account has NOT been updated.");
      }
    });
  } catch (error) {
    alert("ERROR: Your account has NOT been updated.");
    console.log("Update failed Error:", error.toString());
  }
};

//AI suggestion over an error: The specified value "1999-06-27T00:00:00.000Z"
// does not conform to the required format, "yyyy-MM-dd"
export const formatDateStringToApiFormat = (originalDateString) => {
  return new Date(originalDateString).toISOString().split("T")[0];
};
