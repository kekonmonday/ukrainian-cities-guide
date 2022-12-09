import { useQuery } from '@tanstack/react-query';
import { ApiError, CityDetails, CityList } from 'types';
import { fetcher } from './utils';

export const useCityList = (page: number, pageSize: number) =>
  useQuery<unknown, ApiError, CityList>(['city', page, pageSize], () =>
    fetcher(`v1/city?page=${page}&limit=${pageSize}`)
  );

export const useCityDetails = (id: string) =>
  useQuery<unknown, ApiError, CityDetails>(['city', id], () => fetcher(`v1/city/${id}`));
