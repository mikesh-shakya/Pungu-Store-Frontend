//isLoggedIn
export const isLoggedIn = () => {
  let data = sessionStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

// doLogin
export const doLogin = (data, next) => {
  sessionStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout
export const doLogout = (next) => {
  sessionStorage.removeItem("data");
  next();
};

//get Current User
export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return JSON.parse(sessionStorage.getItem("data"))?.userDTO;
  } else {
    return null;
  }
};

// get token
export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(sessionStorage.getItem("data")).token;
  } else {
    return undefined;
  }
};
