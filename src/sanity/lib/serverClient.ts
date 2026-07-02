import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";
import { token } from "./token";

/** Server-only client for authenticated reads (drafts, live preview). Not used by Studio. */
export const serverClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
      token,
    })
  : null;
