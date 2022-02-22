import axios from "axios";

export const authApi = {
   login: (params) => axios.post(
      "http://shohruh.narzullayev.uz/api/v1/auth/login",
      params,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
   )
}
