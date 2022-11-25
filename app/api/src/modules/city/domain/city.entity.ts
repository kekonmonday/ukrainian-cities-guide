import {AggregateRoot, AggregateID} from "@libs/ddd";
import {CityProps, CreateCityProps} from "./city.types";
import {v4} from "uuid";

export class CityEntity extends AggregateRoot<CityProps> {
    protected readonly _id: AggregateID;

    static create(create: CreateCityProps): CityEntity {
        const id = v4();
        const props: CityProps = {...create};
        const user = new CityEntity({id, props});
        return user;
    }

    /* You can create getters only for the properties that you need to
  access and leave the rest of the properties private to keep entity
  encapsulated. To get all entity properties (for saving it to a
  database or mapping a response) use .getPropsCopy() method
  defined in a EntityBase parent class */

    validate(): void {
        // entity business rules validation to protect it's invariant before saving entity to a database
    }
}
