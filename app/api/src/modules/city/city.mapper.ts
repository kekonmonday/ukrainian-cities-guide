import {Mapper} from "@libs/ddd";
import {Injectable} from "@nestjs/common";
import {CityModel, citySchema} from "@modules/city/database/city.repository";
import {CityEntity} from "@modules/city/domain/city.entity";
import {CityResponseDto} from "@modules/city/dtos/city.response.dto";

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class CityMapper implements Mapper<CityEntity, CityModel, CityResponseDto> {
    toPersistence(entity: CityEntity): CityModel {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const copy = entity.getPropsCopy();
        const record: CityModel = {...copy};
        return citySchema.parse(record);
    }

    toDomain(record: CityModel): CityEntity {
        citySchema.parse(record);
        const entity = new CityEntity({
            id: record.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            props: {
                name: record.name,
                areaTotalKm: record.areaTotalKm,
                description: record.description,
                mayor: record.mayor
            }
        });
        return entity;
    }

    toResponse(entity: CityEntity): CityResponseDto {
        const props = entity.getPropsCopy();
        const response = new CityResponseDto(entity);
        response.name = props.name;
        response.areaTotalKm = props.areaTotalKm;
        response.description = props.description;
        response.mayor = props.mayor;
        return response;
    }
}
