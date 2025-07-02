// firestore_crud.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, onSnapshot, updateDoc, deleteDoc, deleteField, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyALgujzwLPqBw7wRWbl7Fpa5FBwXBFUILE",
  authDomain: "myportifolio-yahya.firebaseapp.com",
  projectId: "myportifolio-yahya",
  storageBucket: "myportifolio-yahya.firebasestorage.app",
  messagingSenderId: "893246042498",
  appId: "1:893246042498:web:b61c6525e9c32738f49f9b",
  measurementId: "G-T17NJ7YCTQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);
const auth = getAuth(app);

// Google login function
export async function googlelogin() {
	const provider = new GoogleAuthProvider();
	const result = await signInWithPopup(auth, provider);
	const user = result.user;
	localStorage.setItem("email", user.email)
	localStorage.setItem("Logined", true)
	console.log(user)
	return user.email;

}
const dbs = {
	addDocument: async (collectionName, documentId, data) => {
		try {
			await setDoc(doc(db, collectionName, documentId), data);
			// console.log(`Document written with ID: ${documentId}`);
		} catch (e) {
			// console.error('Error adding document: ', e);
			throw e;
		}
	},

	readDocument: async (collectionName, documentId) => {
		const docRef = doc(db, collectionName, documentId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			return docSnap.data();
		} else {
			console.log('No such document!');
			return null;
		}
	},

	readCollection: async (collectionName) => {
		const querySnapshot = await getDocs(collection(db, collectionName));
		const data = [];
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			data.push({ id: doc.id, ...doc.data() });
		});
		return data;
	},

	sortCollection: async (collectionName, field, direction = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, orderBy(field, direction));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (sorted by ${field} ${direction})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error sorting collection:', error);
			throw error;
		}
	},

	whereCollection: async (collectionName, field, operator, value) => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(field, operator, value));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${field} ${operator} ${value})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering collection:', error);
			throw error;
		}
	},
	whereAndSortCollection: async (collectionName, fieldWhere, operator, valueWhere, fieldOrder, directionOrder = 'asc') => {
		try {
			const collectionRef = collection(db, collectionName);
			const q = query(collectionRef, where(fieldWhere, operator, valueWhere), orderBy(fieldOrder, directionOrder));
			const querySnapshot = await getDocs(q);
			const data = [];
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()} (filtered where ${fieldWhere} ${operator} ${valueWhere}, sorted by ${fieldOrder} ${directionOrder})`);
				data.push({ id: doc.id, ...doc.data() });
			});
			return data;
		} catch (error) {
			console.error('Error filtering and sorting collection:', error);
			throw error;
		}
	},

	updateDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await updateDoc(docRef, data);
			console.log('Document updated successfully');
		} catch (e) {
			console.error('Error updating document: ', e);
			throw e;
		}
	},

	updateOrSetDocument: async (collectionName, documentId, data) => {
		const docRef = doc(db, collectionName, documentId);

		try {
			await setDoc(docRef, data, { merge: true });
			console.log('Document updated or set successfully');
		} catch (e) {
			console.error('Error updating or setting document: ', e);
			throw e;
		}
	},

	deleteDocument: async (collectionName, documentId) => {
		try {
			await deleteDoc(doc(db, collectionName, documentId));
			console.log('Document deleted successfully');
		} catch (e) {
			console.error('Error deleting document: ', e);
			throw e;
		}
	},
	deleteBy: async (collectionName, column, value) => {
		const docs = await hive.whereCollection(collectionName, column, "==", value);
		for (const docItem of docs) {
			await hive.deleteDocument(collectionName, docItem.id);
			console.log(`Deleted document with ID: ${docItem.id}`);
		}
	},
	updateBy: async (collectionName, column, value, data) => {
		const docs = await hive.whereCollection(collectionName, column, "==", value);
		for (const docItem of docs) {
			await hive.updateDocument(collectionName, docItem.id, data);
			console.log(`Updated document with ID: ${docItem.id}`);
		}
	}
	// // Add document to subcollection
	// addSubcollectionDocument: async (collectionName, documentId, subcollectionName, subDocId, data) => {
	// 	try {
	// 		const subDocRef = doc(db, collectionName, documentId, subcollectionName, subDocId);
	// 		await setDoc(subDocRef, data);
	// 		console.log(`Subdocument written with ID: ${subDocId}`);
	// 	} catch (error) {
	// 		console.error('Error adding subdocument:', error);
	// 		throw error;
	// 	}
	// },

	// // Read all documents from subcollection
	// readSubcollection: async (collectionName, documentId, subcollectionName) => {
	// 	try {
	// 		const subcollectionRef = collection(db, collectionName, documentId, subcollectionName);
	// 		const querySnapshot = await getDocs(subcollectionRef);
	// 		const data = [];
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(`${doc.id} =>`, doc.data());
	// 			data.push({ id: doc.id, ...doc.data() });
	// 		});
	// 		return data;
	// 	} catch (error) {
	// 		console.error('Error reading subcollection:', error);
	// 		throw error;
	// 	}
	// },
	// readSubcollectionDocument: async (collectionName, documentId, subcollectionName, subDocId) => {
	// 	try {
	// 		const subDocRef = doc(db, collectionName, documentId, subcollectionName, subDocId);
	// 		const subDocSnap = await getDoc(subDocRef);

	// 		if (subDocSnap.exists()) {
	// 			console.log(`Subdocument data for ID ${subDocId}:`, subDocSnap.data());
	// 			return subDocSnap.data();
	// 		} else {
	// 			console.log(`No such subdocument with ID ${subDocId}`);
	// 			return null;
	// 		}
	// 	} catch (error) {
	// 		console.error('Error reading subdocument:', error);
	// 		throw error;
	// 	}
	// },
	// // Update subcollection document
	// updateSubcollectionDocument: async (collectionName, documentId, subcollectionName, subDocId, data) => {
	// 	try {
	// 		const subDocRef = doc(db, collectionName, documentId, subcollectionName, subDocId);
	// 		await updateDoc(subDocRef, data);
	// 		console.log(`Subdocument with ID ${subDocId} updated`);
	// 	} catch (error) {
	// 		console.error('Error updating subdocument:', error);
	// 		throw error;
	// 	}
	// },

	// // Delete subcollection document
	// deleteSubcollectionDocument: async (collectionName, documentId, subcollectionName, subDocId) => {
	// 	try {
	// 		const subDocRef = doc(db, collectionName, documentId, subcollectionName, subDocId);
	// 		await deleteDoc(subDocRef);
	// 		console.log(`Subdocument with ID ${subDocId} deleted`);
	// 	} catch (error) {
	// 		console.error('Error deleting subdocument:', error);
	// 		throw error;
	// 	}
	// }
};

export default dbs;