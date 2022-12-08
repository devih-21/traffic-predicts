import axios from 'axios';
import qs from 'querystringify';
// require("dotenv");

export const baseUrl = 'http://localhost:8000';
export const urlRemobay = 'http://localhost:8000';

const TIMEOUT = 300000;

const getAuthToken = () => {
  return {
    token: localStorage.getItem('token') || '',
    refresh_token: localStorage.getItem('refresh_token') || '',
  };
};

axios.defaults.withCredentials = true;

const handleResponse = (r, isAuth) => {
  console.log('error', r);
  if (!r) {
    window.location.href = '/sign-in';
    return;
  }
  if (r.code === 'ERR_NETWORK') {
    window.location.href = '/sign-in';
    return r;
  } else if (r?.status === 500) {
    // if (isAuth) window.location.href = "/500";
    return r;
  } else {
    return r;
  }
};

const redirectToSomethingWentWrongScreen = () => {
  return setTimeout(() => {
    window.location.href = '/500';
  }, TIMEOUT);
};

export const rest = {
  get: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const { token, refresh_token } = getAuthToken();
      if (token && refresh_token) {
        options = {
          headers: {
            token: token,
            refresh_token: refresh_token,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.get(
        `${baseUrl + endpoint}${
          JSON.stringify(params) !== '{}' ? '?' : ''
        }${qs.stringify({ ...params })}`,
        options.headers ? options : {},
      );
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err, isAuth);
    }
  },

  post: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const { token, refresh_token } = getAuthToken();
      if (token && refresh_token) {
        options = {
          headers: {
            token: token,
            refresh_token: refresh_token,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.post(baseUrl + endpoint, { ...params }, options);
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },
  postForm: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const { token, refresh_token } = getAuthToken();
      if (token && refresh_token) {
        options = {
          headers: {
            token: token,
            refresh_token: refresh_token,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.post(
        urlRemobay + endpoint,
        { ...params },
        options,
      );
      clearTimeout(handleTimeout);
      return res;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },
  postAI: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const { token, refresh_token } = getAuthToken();
      if (token && refresh_token) {
        options = {
          headers: {
            token: token,
            refresh_token: refresh_token,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.post(baseUrl + endpoint, { ...params }, options);
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },
  put: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            Cookie: auth,
          },
        };
      }
    }
    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.put(baseUrl + endpoint, { ...params }, options);
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },
  patch: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            Cookie: auth,
          },
        };
      }
    }
    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.patch(baseUrl + endpoint, { ...params }, options);
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },
  delete: async (endpoint, params, timeout = TIMEOUT, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            Cookie: auth,
          },
        };
      }
    }
    const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
    try {
      const res = await axios.delete(
        baseUrl + endpoint,
        options.headers ? options : {},
      );
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response?.data, isAuth);
    }
  },

  // postFormData: (endpoint, params, timeout = TIMEOUT, header) => {
  //   const options = {
  //     method: "POST",
  //     body: params.formData,
  //     headers: {
  //       ...header,
  //       auth,
  //     },
  //   };
  //   const handleTimeout = redirectToSomethingWentWrongScreen(timeout);
  //   return fetch(baseUrl + endpoint, options).then((r) => {
  //     clearTimeout(handleTimeout);
  //     return handleResponse(r);
  //   });
  // },

  // putFormData: (endpoint, params, header) => {
  //   const options = {
  //     method: "PUT",
  //     body: params.formData,
  //     headers: {
  //       ...header,
  //       auth,
  //     },
  //   };
  //   const handleTimeout = redirectToSomethingWentWrongScreen();
  //   return fetch(baseUrl + endpoint, options).then((r) => {
  //     clearTimeout(handleTimeout);
  //     return handleResponse(r);
  //   });
  // },
};
