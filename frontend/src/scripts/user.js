import axios from "axios";

const api = path => `http://localhost:5000/api/${path}`;

const getAllUsers = (onSuccess, onFail) => {
  axios
    .get(api("users/all"))
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
    .delete(api("users/delete"), {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(() => onSuccess(userId))
    .catch(err => {
      onFail("Error deleting the user.");
      console.error(err);
    });
};

const createUser = async (formData, onSuccess, onFail) => {
  if (formData.password !== formData.confirmPassword) {
    onFail("Passwords do not match.");
    return;
  }

  const { _confirmPassword, ...credentials } = formData;

  try {
    // Send signup request with formData
    const response = await axios.post(api("users/signup"), credentials);

    const token = response.data.token;
    localStorage.setItem("token", token); // Store token in localStorage

    // Fetch the logged-in user's profile
    const userResponse = await axios.get(api("users/profile"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    onSuccess(userResponse.data); // Set user data in context
  } catch (err) {
    onFail("Invalid credentials or error logging in.");
    console.error(err);
  }
};

const loginUser = async (credentials, onSuccess, onFail) => {
  try {
    const response = await axios.post(api("users/login"), credentials);

    const token = response.data.token;
    localStorage.setItem("token", token); // Store token in localStorage

    // Fetch the logged-in user's profile
    const userResponse = await axios.get(api("users/profile"), {
      headers: { Authorization: `Bearer ${token}` },
    });

    onSuccess(userResponse.data); // Set user data using context
  } catch (err) {
    onFail("Invalid credentials or error logging in.");
    console.error(err);
  }
};

export { getAllUsers, deleteUser, createUser, loginUser };
