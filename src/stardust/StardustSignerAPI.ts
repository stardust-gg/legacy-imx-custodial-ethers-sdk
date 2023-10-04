import { SignRequestPayload } from '../types';
import AbstractStardustAPI from './AbstractStardustAPI';

export default class StardustSignerAPI extends AbstractStardustAPI {
  // eslint-disable-next-line no-useless-constructor
  constructor(apiKey: string) {
    super(apiKey);
  }

  async signMessage(requestParams: SignRequestPayload): Promise<string> {
    const { signature } = await this.apiPost('sign/message', requestParams);
    return signature;
  }
}
