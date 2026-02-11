import NodeCache from "node-cache";

//TTL = 600 seconds = 10 minutes
const weatherCache = new NodeCache({ sdtTTL: 600, checkperiod: 120 });

export default weatherCache;
