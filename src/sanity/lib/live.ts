import "server-only";

import { defineLive } from "next-sanity/live";

import { isSanityConfigured } from "../env";
import { client } from "./client";
import { token } from "./token";

const live =
  isSanityConfigured && client
    ? defineLive({
        client,
        serverToken: token,
        browserToken: token,
      })
    : null;

export const sanityFetch =
  live?.sanityFetch ??
  (async () => ({
    data: null,
    sourceMap: null,
    tags: [],
  }));

export const SanityLive = live?.SanityLive ?? (() => null);
