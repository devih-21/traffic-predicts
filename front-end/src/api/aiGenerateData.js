import { rest } from './rest';

export const apiAiGenerateData = {
  scriptCreation: (query) =>
    rest.postAI('/content-generator', query, null, false),
  videoCreation: (query) => rest.postAI('/gen-tool9', query, null, false),
  create: (query) => rest.postAI('/open_playground', query, null, false),
  contentCreation: (query) =>
    rest.postAI('/content-generator', query, null, false),
  createPostTw: (query) => rest.postAI('/tw/gen_post', query, null, false),
  translate: (query) => rest.post('/ai_translate', query, null, false),
};
