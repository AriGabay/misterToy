const axios = require('axios');
const KEY = 'toys';
const URL = 'http://localhost:3030/api/toy';
export const toyService = {
  query,
  getById,
  saveToy,
  removeToy,
};

function query(searchFilter) {
  const params = [];
  if (searchFilter) {
    if (searchFilter.name) {
      params.push(`name=${searchFilter.name}`);
    }
    if (searchFilter.inStock) {
      params.push(`inStock=${searchFilter.inStock}`);
    }
    if (searchFilter.price) {
      params.push(`price=${searchFilter.price}`);
    }
    if (searchFilter.sortBy) {
      params.push(`sortBy=${searchFilter.sortBy}`);
    }
    if (params.length > 0) {
      params[0] = `?${params[0]}`;
    }
  }
  const queryString = params.join('&');
  return axios.get(URL + queryString).then(toysList => toysList.data);
}
function getById(id) {
  return axios.get(`${URL}/${id}`).then(res => res.data);
}
function saveToy(toy) {
  return axios.post(URL, { params: { toy } }).then(res => res.data);
}
function removeToy(id) {
  return axios.delete(URL, { params: { id } }).then(res => res.data);
}
