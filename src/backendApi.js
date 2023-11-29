import axios from "axios";

const Sitter = axios.create({
    baseURL: "http://localhost:8080/api/sitter",
})

export {
    Sitter
}