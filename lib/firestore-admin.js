import { compareAsc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export async function getAllFeedback(siteId, route) {
  try {
    let ref = db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .where('status', '==', 'active');

    if (route) {
      ref = ref.where('route', '==', route);
    }

    const snapshot = await ref.get();

    const feedback = [];

    snapshot.forEach((doc) => feedback.push({ id: doc.id, ...doc.data() }));

    const sortedFeedback = feedback.map((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    console.log('sortedFeedback => ', sortedFeedback);

    return { feedback: sortedFeedback };
  } catch (error) {
    console.error(`Error getting all Feedback ${error}`);
    return { error };
  }
}

export async function getUserSites(userId) {
  try {
    const querySnapshot = await db
      .collection('sites')
      .where('author', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const sites = [];

    querySnapshot.forEach((doc) => sites.push({ id: doc.id, ...doc.data() }));

    return { sites };
  } catch (error) {
    console.error(`ERROR getting user Sites ${error}`);
  }
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
  try {
    const querySnapshot = await db
      .collection('feedback')
      .where('authorId', '==', userId)
      .where('status', '!=', 'removed')
      .get();

    const feedback = [];

    querySnapshot.forEach((doc) =>
      feedback.push({ id: doc.id, ...doc.data() })
    );

    return { feedback };
  } catch (error) {
    console.error(`Error getting user feedback ${error}`);
  }
}

export async function getSite(siteId) {
  const doc = await db.collection('sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };

  return { site };
}
