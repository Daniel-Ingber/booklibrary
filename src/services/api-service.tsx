import axios from "axios";
import { BookResponse } from "../models/book-response";
import { BookRequest } from "../models/book-request";

const _axios = axios.create({
  baseURL:"https://6a4136981ff1d27becc1596b.mockapi.io/api/",
  timeout: 10000,
  headers:{
    "Content-Type": "application/json",
  },

});

export const ApiService = {
  getMovies: () => _axios.get<Array<BookResponse>>("/books"),
  createMovie: (request:BookRequest) => _axios.post<BookResponse>("/books", request),
  deleteMovie: (id:string) => _axios.delete<BookResponse>(`/books/${id}`),
}