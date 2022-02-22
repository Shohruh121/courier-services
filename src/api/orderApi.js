import axios from "axios";

const token = localStorage.getItem("token");

export const orderApi = {
   getAll: () => axios.get(
      "http://shohruh.narzullayev.uz/api/v1/order/",
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   getOne: (id) => axios.get(
      `http://shohruh.narzullayev.uz/api/v1/order/${id}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   create: (params) => axios.post(
      "http://shohruh.narzullayev.uz/api/v1/order",
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   update: (id, params) => axios.put(
      `http://shohruh.narzullayev.uz/api/v1/order/${id}`,
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   ),
   delete: (id) => axios.delete(
      `http://shohruh.narzullayev.uz/api/v1/order/${id}`,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   )
}