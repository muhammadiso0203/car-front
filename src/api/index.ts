import axios from "axios";

export const api = axios.create({
    baseURL: "https://car-0203.up.railway.app/"
})