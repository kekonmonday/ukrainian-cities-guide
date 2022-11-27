export type CityList = {
  count: number;
  limit: number;
  page: number;
  data: {
    id: string;
    name: string;
  }[];
};

export type CityDetails = {
  id: string;
  name: string;
  mayor: string;
  description: string;
  areaTotalKm: string;
};
