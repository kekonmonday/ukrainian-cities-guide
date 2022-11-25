/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific queries should be defined
    in a respective repository.
*/

export class Paginated<T> {
    readonly count: number;
    readonly limit: number;
    readonly page: number;
    readonly data: readonly T[];

    constructor(props: Paginated<T>) {
        this.count = props.count;
        this.limit = props.limit;
        this.page = props.page;
        this.data = props.data;
    }
}

export type OrderBy = {field: string | true; param: "asc" | "desc"};

export type PaginatedQueryParams = {
    limit: number;
    page: number;
    offset: number;
    orderBy: OrderBy;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface
export interface RepositoryPort<Entity> {}
