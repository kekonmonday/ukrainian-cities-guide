// All properties that a City has
export type CityProps = CreateCityProps;

// Properties that are needed for a city creation
export interface CreateCityProps {
    name: string;
    mayor: string;
    description: string;
    areaTotalKm: string;
}
