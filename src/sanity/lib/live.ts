import { createClient } from "next-sanity";
import { defineLive } from "next-sanity/live";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

const token = process.env.SANITY_API_READ_TOKEN;

const liveClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
      token,
    })
  : null;

const live = liveClient
  ? defineLive({
      client: liveClient,
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
