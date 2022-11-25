import {LiteralObject} from "@nestjs/common";

export interface SparqlConfig {
    endpointUrl: string;
}

export interface SparqlExecutorPort {
    execute(query: string): Promise<LiteralObject[]>;
}
