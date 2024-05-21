import axios from "axios";

export const api = axios.create({
  baseURL: process.env.URL_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})