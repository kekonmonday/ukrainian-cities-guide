import {Param, Controller, Get, HttpStatus} from "@nestjs/common";
import {routesV1} from "@config/app.routes";
import {QueryBus} from "@nestjs/cqrs";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Result} from "oxide.ts";
import {CityResponseDto} from "@modules/city/dtos/city.response.dto";
import {FindCityQuery} from "@modules/city/queries/find-city/find-city.query-handler";
import {CityModel} from "@modules/city/database/city.repository";
import {CityMapper} from "@modules/city/city.mapper";
import {CityBuildingResponseDto} from "@modules/city/dtos/city-building.response.dto";

@Controller(routesV1.version)
export class FindCityHttpController {
    constructor(private readonly queryBus: QueryBus, private readonly cityMapper: CityMapper) {}

    @Get(routesV1.city.getByName)
    @ApiOperation({summary: "Find city"})
    @ApiResponse({
        status: HttpStatus.OK,
        type: CityResponseDto
    })
    async findCity(@Param("name") name: string): Promise<CityResponseDto> {
        const query = new FindCityQuery({
            name
        });
        const result: Result<CityModel, Error> = await this.queryBus.execute(query);

        const city = result.unwrap();

        const response = new CityResponseDto({
            id: city.name
        });
        response.name = city.name;
        response.mayor = city.mayor;
        response.description = city.description;
        response.areaTotalKm = city.areaTotalKm;

        response.knownFor = city.knownFor?.map((building) => {
            const buildingDto = new CityBuildingResponseDto({
                id: building.name
            });

            buildingDto.name = building.name;
            buildingDto.description = building.description;

            return buildingDto;
        });

        return response;
    }
}
