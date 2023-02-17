import { Configuration, OpenAIApi } from "openai";
import { PineconeClient } from "pinecone-client";

import { semanticQuery } from "../semanticQuery.js";
import { SemanticSearchMetadata } from "../types.js";

export async function search(query: string) {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY!,
    })
  );

  const pinecone = new PineconeClient<SemanticSearchMetadata>({
    apiKey: process.env.PINECONE_API_KEY!,
    baseUrl: process.env.PINECONE_BASE_URL!,
    namespace: process.env.PINECONE_NAMESPACE!,
  });

  const response = await semanticQuery(
    query || "Hello world",
    openai,
    pinecone
  );

  console.log(JSON.stringify(response, null, 2));
}
