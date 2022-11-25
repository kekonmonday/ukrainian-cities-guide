import {AggregateRoot} from "@libs/ddd";
import {Mapper} from "@libs/ddd";
import {RepositoryPort} from "@libs/ddd";
import {LoggerPort} from "../ports/logger.port";
import {ObjectLiteral} from "../types";
import {SparqlExecutorPort} from "@libs/module/sparql/sparql.type";

export abstract class SparqlRepositoryBase<Aggregate extends AggregateRoot<any>, DbModel extends ObjectLiteral>
    implements RepositoryPort<Aggregate>
{
    protected constructor(
        private readonly _sparqlExecutor: SparqlExecutorPort,
        protected readonly mapper: Mapper<Aggregate, DbModel>,
        protected readonly logger: LoggerPort
    ) {}

    get sparqlExecutor(): SparqlExecutorPort {
        return this._sparqlExecutor;
    }
}
