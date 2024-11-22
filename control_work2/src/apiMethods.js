/*
  Goto https://reqres.in/ for documentation on this api.
  
  If you haven't used axios, documentation here: https://github.com/axios/axios
  OR use any method / library you're comfortable with to perform the request(s).

  **** These stubs are just provided as a convienece, ****
  **** feel free to change whatever you like to accomplish the goal. ****
*/

import axios from "axios";

const baseUrl = "https://reqres.in/api";

export const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/users?page=1`);
  return response.data.data; // Returns the array of users
};

export const deleteUser = async (id) => {
  await axios.delete(`${baseUrl}/users/${id}`);
};


