import axios, { AxiosError } from 'axios';
import { ApiError } from 'types';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true,
  timeout: 60000,
  timeoutErrorMessage: 'Request Timeout',
});

const errorToApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<any>;
    const json = err.toJSON() as Record<string, unknown>;

    const code: number = err.response?.data?.status || json.status || 0;
    const message: string = err.response?.data?.message || json.message || 'Unknown Error';

    return new ApiError(code, message);
  }

  return new ApiError(0, 'Unknown Error');
};

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    throw errorToApiError(error);
  }
};
