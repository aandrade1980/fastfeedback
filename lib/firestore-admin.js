import firebase from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firebase
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

export async function getAllSites() {
  try {
    const querySnapshot = await firebase
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
