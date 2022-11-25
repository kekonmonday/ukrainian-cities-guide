import {get} from "env-var";
import "@libs/utils/dotenv";

export const sparqlConfig = {
    endpointUrl: get("SPARQL_ENDPOINT_URL").required().asString()
};

export const sparqlEndpointUrl = sparqlConfig.endpointUrl;
