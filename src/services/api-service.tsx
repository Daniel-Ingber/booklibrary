import axios from "axios";
import { BookResponse } from "../models/book-response";
import { BookRequest } from "../models/book-request";

const _axios = axios.create({
  baseURL:"https://6a4136981ff1d27becc1596b.mockapi.io/api",
  timeout: 10000,
  headers:{
    "Content-Type": "application/json",
  },

});

export const ApiService = {
  getBooks: () => _axios.get<Array<BookResponse>>("/books"),
  createBook: (request:BookRequest) => _axios.post<BookResponse>("/books", request),
  deleteBook: (id:string) => _axios.delete<BookResponse>(`/books/${id}`),
  editBook: (id:string, request:BookRequest) => _axios.put<BookResponse>(`/books/${id}`, request),
  
  // for testing purposes
  sendError: () => _axios.get("/randomURLtoSend404"),
  getBook: (id:string) => _axios.get<BookResponse>(`/books/${id}`),
  // for testing purposes
}