import {Injectable, LiteralObject} from "@nestjs/common";
import {SparqlConfig, SparqlExecutorPort} from "@libs/module/sparql/sparql.type";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SparqlClient = require("sparql-http-client");

interface SparqlProperty {
    value: string;
    datatype: {
        value: string;
        language: string;
    };
}

interface SparqlObject {
    [key: string]: SparqlProperty;
}

@Injectable()
export class SparqlExecutor implements SparqlExecutorPort {
    private readonly endpointUrl: string;

    constructor(config: SparqlConfig) {
        this.endpointUrl = config.endpointUrl;
    }

    async execute(query: string): Promise<LiteralObject[]> {
        const client = new SparqlClient({endpointUrl: this.endpointUrl});

        const stream = await client.query.select(query);

        return new Promise((resolve, reject) => {
            const rows: LiteralObject[] = [];

            stream.on("data", (row: SparqlObject) => {
                const obj: LiteralObject = {};

                Object.entries(row).forEach(([key, value]) => {
                    obj[key] = value.value;
                });

                rows.push(obj);
            });

            stream.on("end", () => {
                resolve(rows);
            });

            stream.on("error", (error) => {
                reject(error);
            });
        });
    }
}
