import {ApiProperty} from "@nestjs/swagger";
import {ResponseBase} from "@libs/api/response.base";
import {CityBuildingResponseDto} from "@modules/city/dtos/city-building.response.dto";

export class CityResponseDto extends ResponseBase {
    @ApiProperty({
        example: "Kyiv",
        description: "Name of city"
    })
    name: string;

    @ApiProperty({
        example: "Area of city",
        description: "839"
    })
    areaTotalKm: string;

    @ApiProperty({
        example: "Description of city",
        description:
            "Kyiv (/ˈkiːjɪv/ KEE-yiv, /ˈkiːv/ KEEV; Ukrainian: Київ, pronounced [ˈkɪjiu̯]) or Kiev (/ˈkiːɛv/ KEE-ev) is the capital and most populous city of Ukraine. It is in north-central Ukraine along the Dnieper River. As of 1 January 2021, its population was 2,962,180, making Kyiv the seventh-most populous city in Europe."
    })
    description: string;

    @ApiProperty({
        example: "Vitali Klitschko",
        description: "Name of mayor of city"
    })
    mayor: string;

    @ApiProperty({isArray: true, type: CityBuildingResponseDto})
    knownFor?: CityBuildingResponseDto[];
}
