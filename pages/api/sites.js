import db from '@/lib/firebase-admin';

export default async function handler(_, res) {
  const querySnapshot = await db
    .collection('sites')
    .orderBy('createdAt', 'desc')
    .get();
  const sites = [];

  querySnapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

  res.status(200).json({ sites });
}
