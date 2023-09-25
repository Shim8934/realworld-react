import axios from 'axios';

const API_ROOT =
    process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080/api';

const apiRequest = async(url, body, method = 'GET') => {
  const headers = new Headers();

  if (body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_ROOT}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let result;

  try {
    result = await response.json();
  } catch (error) {
    result = { errors: { [response.status]: [response.statusText] } };
  }

  if (!response.ok) throw result;

  return result;
};

const requests = {
  del: (url) => apiRequest(url, undefined, 'DELETE'),

  get: (url, query = {}) => {
    if (Number.isSafeInteger(query?.page)) {
      query.limit = query.limit ? query.limit : 10;
      query.offset = query.page * query.limit;
    }
    delete query.page;
    const isEmptyQuery = query == null || Object.keys(query).length === 0;

    return apiRequest(isEmptyQuery ? url : `${url}?${serialize(query)}`);
  },

  put: (url, body) => apiRequest(url, body, 'PUT'),

  post: (url, body) => apiRequest(url, body, 'POST'),
};


const Auth = {

  register: (email, password) => requests.post('/register', {user: {email, password}}),

  login: (email, password) => requests.post('/login', {user : email, password}),


};

const Articles = {
  getArticles: (id) => requests.get(`/articles/${id}`),
};

const setToken = (token) => {
  if (token) {
    apiRequest.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  else {
    delete apiRequest.defaults.headers['Authorization'];
  }
}

export default {
  Auth,
  Articles,
  setToken
};