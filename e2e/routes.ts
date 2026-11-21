import { readFileSync } from "node:fs";

const factory = JSON.parse(readFileSync("factory.json", "utf8"));
const directions: { id: string }[] = JSON.parse(readFileSync("content/directions.json", "utf8"));

export const launched: boolean = factory.launched;
export const clientName: string = factory.client.name;

/** Pages that exist only before launch: the review page and the mockup directions. */
export const prelaunchRoutes = ["/review", ...directions.map((direction) => `/directions/${direction.id}`)];

/** Add every real page here as it is built. Each one gets the layout and accessibility checks for free. */
export const siteRoutes = ["/"];

export const liveRoutes = launched ? siteRoutes : [...siteRoutes, ...prelaunchRoutes];
