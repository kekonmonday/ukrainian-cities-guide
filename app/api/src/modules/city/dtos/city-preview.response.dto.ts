import {ApiProperty} from "@nestjs/swagger";
import {ResponseBase} from "@libs/api/response.base";

export class CityPreviewResponseDto extends ResponseBase {
    @ApiProperty({
        example: "Kyiv",
        description: "Name of city"
    })
    name: string;
}
