import {ApiProperty} from "@nestjs/swagger";
import {PaginatedResponseDto} from "@libs/api/paginated.response.base";
import {CityPreviewResponseDto} from "@modules/city/dtos/city-preview.response.dto";

export class CityPaginatedResponseDto extends PaginatedResponseDto<CityPreviewResponseDto> {
    @ApiProperty({type: CityPreviewResponseDto, isArray: true})
    readonly data: readonly CityPreviewResponseDto[];
}
