import {Logger, Module, Provider} from "@nestjs/common";
import {CityRepository} from "./database/city.repository";
import {CqrsModule} from "@nestjs/cqrs";
import {CITY_REPOSITORY} from "./city.di-tokens";
import {FindCitiesHttpController} from "@modules/city/queries/find-cities/find-cities.http.controller";
import {FindCityHttpController} from "@modules/city/queries/find-city/find-city.http.controller";
import {FindCityQueryHandler} from "@modules/city/queries/find-city/find-city.query-handler";
import {FindCitiesQueryHandler} from "@modules/city/queries/find-cities/find-cities.query-handler";
import {CityMapper} from "@modules/city/city.mapper";
import {SparqlModule} from "@libs/module/sparql/sparql.module";
import {sparqlEndpointUrl} from "@config/sparql.config";

const httpControllers = [FindCitiesHttpController, FindCityHttpController];

const queryHandlers: Provider[] = [FindCitiesQueryHandler, FindCityQueryHandler];

const mappers: Provider[] = [CityMapper];

const repositories: Provider[] = [{provide: CITY_REPOSITORY, useClass: CityRepository}];

@Module({
    imports: [SparqlModule.register({endpointUrl: sparqlEndpointUrl}), CqrsModule],
    controllers: [...httpControllers],
    providers: [Logger, ...repositories, ...queryHandlers, ...mappers]
})
export class CityModule {}
