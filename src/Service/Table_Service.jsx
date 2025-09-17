
import axios from "axios";

const BASE_URL = "https://hastin-container.com/staging/api";

export const fetchContainersApi = () => {
  const token = localStorage.getItem("authToken");
console.log("Token:", token);
  // Make sure payload is defined BEFORE using it
const payload = {
  pagination: {
    index: 1,
    rowCount: -1,
    searchObj: null,
    sortingObj: null,
  },
};


  return axios.put(`${BASE_URL}/container/search/ACTIVE`, payload, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `BslogiKey ${token}`,
      "Aid" :"86f15c81-66d3-4237-bb29-6c4e7a9daacf"
    },
  });
};

// Create Container


//View Container by ID
export const viewContainerApi = (id) => {
  const token = localStorage.getItem("authToken");
  return axios.get(`${BASE_URL}/container/fetch-booking-history/${id}`, {
    headers: {
      "authorization": `BslogiKey ${token}`,
      "Aid": "86f15c81-66d3-4237-bb29-6c4e7a9daacf",
    },
  });
};

// Edit Container by ID
export const editContainerApi = (id, updatedData) => {
  const token = localStorage.getItem("authToken");
  return axios.put(`${BASE_URL}/${id}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
      "authorization": `BslogiKey ${token}`,
      "Aid": "86f15c81-66d3-4237-bb29-6c4e7a9daacf",
    },
  });
};

