import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_AUTH,
  headers: {
    Authorization: `Bearer ${cookies['token']}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const apiState = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  headers: {
    Authorization: `Bearer ${cookies['token']}`,
    'Content-Type': 'application/json; charset=utf-8',
  },
});
