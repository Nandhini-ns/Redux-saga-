// // export const createContainerApi = async (payload) => {
// //   const response = await fetch(
// //     "https://hastin-container.com/staging/api/container-group/create",
// //     {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(payload),
// //     }
// //   );

// //   if (!response.ok) {
// //     throw new Error(`HTTP error! status: ${response.status}`);
// //   }

// //   return await response.json();
// // };


// import axios from "axios";

// export const createContainerApi = async (payload) => {
//   const token = localStorage.getItem("authToken");
//   console.log("Token:", token);

//   return await axios.post(
//     "/staging/api/container-group/create", // relative URL
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `
// BslogiKey ${token}`,
// "Aid": "86f15c81-66d3-4237-bb29-6c4e7a9daacf"

//       },
//     }
//   );
// };

import axios from "axios";

const BASE_URL = "https://91.203.132.120/staging/api";
const TOKEN = localStorage.getItem("authToken");

const headers = {
  "Content-Type": "application/json",
  "authorization": `BslogiKey ${TOKEN}`,
  "Aid": "86f15c81-66d3-4237-bb29-6c4e7a9daacf",
};

// Fetch Groups 
export const fetchContainerGroupsApi = async () => {
  const res = await axios.get(`${BASE_URL}/container-group/get`, { headers });
  return res.data;
};

// Fetch Ports / Locations 
export const fetchPortsApi = async () => {
  const res = await axios.get(`${BASE_URL}/port/all`, { headers });
  return res.data;
};
