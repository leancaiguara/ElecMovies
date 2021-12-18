import axios from "axios";

export function order(ruta) {
  return axios.get(ruta).then((res) => res.data);
}
