import { db } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .orderBy('createdAt', 'desc')
      .get();

    const feedback = [];

    snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }));

    return { feedback };
  } catch (error) {
    console.error(`Error getting all Feedback ${error}`);
    return { error };
  }
}

export async function getUserSites(userId) {
  const querySnapshot = await db
    .collection('sites')
    .where('author', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  const sites = [];

  querySnapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

  return { sites };
}

export async function getAllSites() {
  try {
    const querySnapshot = await db
      .collection('sites')
      .orderBy('createdAt', 'desc')
      .get();

    const sites = [];

    querySnapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

    return { sites };
  } catch (error) {
    console.error(`Error getting all sites ${error}`);
    return { error };
  }
}

export async function getUserFeedback(userId) {
  const querySnapshot = await db
    .collection('feedback')
    .where('authorId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  const feedback = [];

  querySnapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }));

  return { feedback };
}
