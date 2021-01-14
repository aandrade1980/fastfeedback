import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set(
      {
        uid,
        ...data
      },
      { merge: true }
    );
}

export async function createSite(data) {
  const { id } = await firestore.collection('sites').add(data);

  return id;
}

export async function createFeedback(data) {
  const { id } = await firestore.collection('feedback').add(data);

  return id;
}
