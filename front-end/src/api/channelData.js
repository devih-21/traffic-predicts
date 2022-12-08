import { rest } from './rest';

export const apiChannelData = {
  getInfo: () => rest.get('/info', {}, null, true),
};
