import factory from "../../factory.json";
import siteContent from "../../content/site.json";
import directionList from "../../content/directions.json";
import reviewContent from "../../content/review.json";

export type Direction = { id: string; name: string; idea: string };

/** True once factory.json says the site is launched. Until then nothing is indexable. */
export const launched: boolean = factory.launched;

export const client = factory.client;
export const site = siteContent;
export const directions: Direction[] = directionList;
export const review = reviewContent;

/** Pre-launch pages (the review page and mockup directions) disappear at launch. */
export const prelaunchOnly = !launched;
