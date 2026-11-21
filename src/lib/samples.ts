import { site } from "@/lib/site";

export type Member = (typeof site.members)[number];
export type ChatLine = (typeof site.chat)[number];

/** Sample members and messages for the mockups. Plainly samples: never real people. */
export const members: Member[] = site.members;
export const [featured] = site.members;
export const chat: ChatLine[] = site.chat;
