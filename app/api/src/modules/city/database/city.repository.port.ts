import {RepositoryPort} from "@libs/ddd";
import {CityEntity} from "@modules/city/domain/city.entity";

export type CityRepositoryPort = RepositoryPort<CityEntity>;
