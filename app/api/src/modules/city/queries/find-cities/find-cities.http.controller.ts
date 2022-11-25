import {Controller, Get, HttpStatus, Query} from "@nestjs/common";
import {routesV1} from "@config/app.routes";
import {QueryBus} from "@nestjs/cqrs";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Result} from "oxide.ts";
import {Paginated} from "@libs/ddd";
import {PaginatedQueryRequestDto} from "@libs/api/paginated-query.request.dto";
import {ResponseBase} from "@libs/api/response.base";
import {CityMapper} from "@modules/city/city.mapper";
import {CityPaginatedResponseDto} from "@modules/city/dtos/city.paginated.response.dto";
import {FindCitiesQuery} from "@modules/city/queries/find-cities/find-cities.query-handler";
import {CityModel} from "@modules/city/database/city.repository";

@Controller(routesV1.version)
export class FindCitiesHttpController {
    constructor(private readonly queryBus: QueryBus, private readonly cityMapper: CityMapper) {}

    @Get(routesV1.city.root)
    @ApiOperation({summary: "Find cities"})
    @ApiResponse({
        status: HttpStatus.OK,
        type: CityPaginatedResponseDto
    })
    async findCities(@Query() queryParams: PaginatedQueryRequestDto): Promise<CityPaginatedResponseDto> {
        const query = new FindCitiesQuery({
            limit: queryParams?.limit,
            page: queryParams?.page
        });
        const result: Result<Paginated<CityModel>, Error> = await this.queryBus.execute(query);

        const paginated = result.unwrap();

        return new CityPaginatedResponseDto({
            ...paginated,
            data: paginated.data.map((city) => ({
                ...new ResponseBase({id: city.name}),
                name: city.name
            }))
        });
    }
}
