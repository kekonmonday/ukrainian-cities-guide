import {DynamicModule, Module} from "@nestjs/common";
import {SparqlConfig} from "@libs/module/sparql/sparql.type";
import {SparqlExecutor} from "@libs/module/sparql/sparql-executor.service";
import {SPARQL_EXECUTOR} from "@libs/module/sparql/sparql.di-tokens";

@Module({})
export class SparqlModule {
    static register(options: SparqlConfig): DynamicModule {
        return {
            module: SparqlModule,
            providers: [
                {
                    provide: SPARQL_EXECUTOR,
                    useValue: new SparqlExecutor(options)
                }
            ],
            exports: [SPARQL_EXECUTOR]
        };
    }
}
