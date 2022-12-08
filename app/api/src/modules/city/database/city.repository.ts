import {CityRepositoryPort} from "./city.repository.port";
import {z} from "zod";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {SparqlRepositoryBase} from "@libs/db/sparql-repository.base";
import {CityEntity} from "@modules/city/domain/city.entity";
import {CityMapper} from "@modules/city/city.mapper";
import {SparqlExecutorPort} from "@libs/module/sparql/sparql.type";
import {SPARQL_EXECUTOR} from "@libs/module/sparql/sparql.di-tokens";

export const citySchema = z.object({
    name: z.string(),
    areaTotalKm: z.string(),
    description: z.string(),
    mayor: z.string(),
    knownFor: z
        .array(
            z.object({
                name: z.string(),
                description: z.string()
            })
        )
        .optional()
});

export type CityModel = z.TypeOf<typeof citySchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class CityRepository extends SparqlRepositoryBase<CityEntity, CityModel> implements CityRepositoryPort {
    protected schema = citySchema;

    constructor(@Inject(SPARQL_EXECUTOR) sparqlExecutor: SparqlExecutorPort, mapper: CityMapper) {
        super(sparqlExecutor, mapper, new Logger(CityRepository.name));
    }
}
