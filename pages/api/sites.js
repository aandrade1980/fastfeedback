import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/firestore-admin';
import { logger, prepObjectKeys } from '@/util/logger';

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const sites = await getUserSites(uid);

    res.status(200).json(sites);
  } catch (error) {
    const headers = prepObjectKeys(req.headers);

    logger.error(
      {
        request: {
          headers,
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );
    res.status(500).json({ error });
  }
}
