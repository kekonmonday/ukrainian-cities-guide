import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {Ok, Result} from "oxide.ts";
import {PaginatedQueryBase} from "@libs/ddd/query.base";
import {CityModel} from "../../database/city.repository";
import {Inject} from "@nestjs/common";
import {SPARQL_EXECUTOR} from "@libs/module/sparql/sparql.di-tokens";
import {SparqlExecutorPort} from "@libs/module/sparql/sparql.type";
import {Paginated} from "@libs/ddd";

export class FindCitiesQuery extends PaginatedQueryBase {}

@QueryHandler(FindCitiesQuery)
export class FindCitiesQueryHandler implements IQueryHandler {
    constructor(
        @Inject(SPARQL_EXECUTOR)
        private readonly sparqlExecutor: SparqlExecutorPort
    ) {}

    /**
     * In read model we don't need to execute
     * any business logic, so we can bypass
     * domain and repository layers completely
     * and execute query directly
     */
    async execute(query: FindCitiesQuery): Promise<Result<Paginated<CityModel>, Error>> {
        const citiesSparqlQuery = `
select (str(?c_name) as ?name) (str(?c_areaTotalKm) as ?areaTotalKm) (str(?c_description ) as ?description) (str(?c_leaderName) as ?leaderName)
where 
{ 
  ?city a dbo:City ;
    dbo:country dbr:Ukraine .
  ?city dbp:areaTotalKm ?c_areaTotalKm  .
  ?city foaf:name ?c_name .
  ?city dbp:areaTotalKm ?c_areaTotalKm . 
  ?city dbp:leaderName ?c_leaderName .
  optional {
     { ?city rdfs:comment  ?c_description . }
     FILTER ( LANG(?c_description ) = "en" )
  }
}
order by asc(?city)
OFFSET ${query.page * query.limit}
LIMIT ${query.limit}
        `;

        const countSparqlQuery = `
select (count(?city) as ?count)
where 
{ 
  ?city a dbo:City ;
    dbo:country dbr:Ukraine .
  ?city dbp:areaTotalKm ?c_areaTotalKm  .
  ?city foaf:name ?c_name .
  ?city dbp:areaTotalKm ?c_areaTotalKm . 
  ?city dbp:leaderName ?c_leaderName .
}
        `;

        const cities = (await this.sparqlExecutor.execute(citiesSparqlQuery)) as CityModel[];
        const [{count}] = await this.sparqlExecutor.execute(countSparqlQuery);

        return Ok(
            new Paginated({
                data: cities,
                count: parseInt(count),
                limit: query.limit,
                page: query.page
            })
        );
    }
}
