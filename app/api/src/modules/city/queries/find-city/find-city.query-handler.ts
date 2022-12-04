import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {Ok, Result} from "oxide.ts";
import {QueryBase, QueryParams} from "@libs/ddd/query.base";
import {CityModel} from "../../database/city.repository";
import {Inject} from "@nestjs/common";
import {SPARQL_EXECUTOR} from "@libs/module/sparql/sparql.di-tokens";
import {SparqlExecutorPort} from "@libs/module/sparql/sparql.type";

export class FindCityQuery extends QueryBase {
    readonly name?: string;

    constructor(props: QueryParams<FindCityQuery>) {
        super();
        this.name = props.name;
    }
}

@QueryHandler(FindCityQuery)
export class FindCityQueryHandler implements IQueryHandler {
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
    async execute(query: FindCityQuery): Promise<Result<CityModel, Error>> {
        const citySparqlQuery = `
select (str(?c_name) as ?name) (str(?c_areaTotalKm) as ?areaTotalKm) (str(?c_description ) as ?description) (str(?c_leaderName) as ?leaderName)
where 
{ 
  ?city a dbo:City ;
    foaf:name "${query.name}"@en.
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
LIMIT 1
        `;

        const buildingsSparqlQuery = `
select str(?c_name) as ?name str(?c_description) as ?description
where 
{ 
    ?thing a dbo:Building ;
        foaf:name ?c_name ;
        rdfs:comment ?c_description ;
        dbo:location dbr:${query.name} .

    optional {
        { ?city rdfs:comment  ?c_description . }
        FILTER ( LANG(?c_description ) = "en" )
    }
}
        `;

        const [city] = await this.sparqlExecutor.execute(citySparqlQuery);

        const cityBuildings = await this.sparqlExecutor.execute(buildingsSparqlQuery);

        return Ok({
            name: city.name,
            areaTotalKm: city.areaTotalKm,
            description: city.description,
            mayor: city.leaderName,
            knownFor: cityBuildings.map((cityBuilding) => {
                return {
                    name: cityBuilding.name,
                    description: cityBuilding.description
                };
            })
        });
    }
}
