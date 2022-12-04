import {ApiProperty} from "@nestjs/swagger";
import {ResponseBase} from "@libs/api/response.base";

export class CityBuildingResponseDto extends ResponseBase {
    @ApiProperty({
        example: "Меморіальний центр Голокосту «Бабин Яр»",
        description: "Name of building"
    })
    name: string;

    @ApiProperty({
        example: "Description of building",
        description:
            "Babi Yar Holocaust Memorial Center (Ukrainian: Меморіальний центр Голокосту «Бабин Яр»), officially the Foundation and Babyn Yar Holocaust Memorial Center, is an educational institution that documents, explains and commemorates the Babi Yar shootings of September 1941 and aims to broaden and sustain the memory of The Holocaust in Eastern Europe, taking into account geopolitical changes during the 20th century. On September 29, 2016, President of Ukraine Petro Poroshenko, together with public figures and philanthropists, initiated the creation of the first Babi Yar Holocaust Memorial Center. The Memorial Center is planned to be opened in Kyiv, Ukraine, in 2025/26."
    })
    description: string;
}
