/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Root
const cityRoot = "city";

// Api Versions
const v1 = "v1";

export const routesV1 = {
    version: v1,
    city: {
        root: cityRoot,
        getByName: `/${cityRoot}/:name`
    }
};
