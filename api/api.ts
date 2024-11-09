import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const $api = axios.create({
    baseURL: String(process.env.VITE_DB_PORT),
});

export { $api };
