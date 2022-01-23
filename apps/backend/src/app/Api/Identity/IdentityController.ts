import { Response, Request } from 'express';
import { resolveJWTToken } from '../../Services/JWTService';

import { agent } from '../../Veramo/setup';

interface IResolvedUserResponse {
  did: string;
  metadata?: Object;
}

// Used in combination with useUser hook on platform
export const resolveIdentityFromJWT = async (req: Request, res: Response) => {
  try {
    const { at } = req.cookies;
    const resolvedJWT = resolveJWTToken(at);
    if (!resolvedJWT) {
      throw Error();
    }

    await agent.resolveDid({
      didUrl: resolvedJWT.did,
    });

    const response: IResolvedUserResponse = {
      did: resolvedJWT.did,
    };

    return res.send(response);
  } catch (e) {
    return res.status(401).send({ message: 'Access denied' });
  }
};
