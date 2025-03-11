import axios from "axios";

const getAllUsers = (onSuccess, onFail) => {
  axios
    .get("http://localhost:5000/api/users/all")
    .then(response => {
      onSuccess(response.data); // Set the users state with the fetched data
    })
    .catch(err => {
      onFail("Error fetching users.");
      console.log(err);
    });
};

const deleteUser = (userId, onSuccess, onFail) => {
  axios
    .delete("http://localhost:5000/api/users/delete", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => onSuccess(userId))
    .catch(err => {
      onFail("Error deleting the user.");
      console.error(err);
    });
};

export { getAllUsers, deleteUser };
