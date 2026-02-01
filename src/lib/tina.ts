import { createLocalDatabase } from "@tinacms/datalayer";

// For now, we're using local database for development
// In production, this should be configured with Tina Cloud credentials
// See: https://tina.io/docs/self-hosted/overview/

const database = createLocalDatabase();

export default database;
