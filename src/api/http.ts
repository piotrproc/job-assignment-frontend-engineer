import axios from "axios";

const API_BASE_URL = "http://192.168.1.13:3000/api";
const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: DEFAULT_REQUEST_TIMEOUT_MS,
});