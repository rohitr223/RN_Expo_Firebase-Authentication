// ---- accessing the firebase backend ----
import axios from "axios";

// add your firebase key here
// Go to your firebase project and click on "Project Settings" and finally copy the "Web Api Key"
const API_KEY = "firebase-web-api-key";

// authenticate the user
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  //console.log(response.data);

  // get the user token
  const token = response.data.idToken

  return token;
}

// create a new user
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

// login an existing user
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
