import axios from "axios";

const Sitter = axios.create({
    baseURL: "http://localhost:8080/api/sitter",
})

const User = axios.create({
    baseURL: "http://localhost:8080/api/user",
})

export {
    Sitter, User
}