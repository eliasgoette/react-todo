import { db } from './firebase';
import 'firebase/firestore';

const isOnline = () => navigator.onLine;

export async function getStoredLists(userId) {
    try {
        let lists = [];

        if (isOnline()) {
            const userDocRef = db.collection('users').doc(userId);
            const userDoc = await userDocRef.get();

            if (userDoc.exists) {
                // Extract the lists from the user's document
                lists = userDoc.data().lists || [];

                // Update localStorage with the latest data when online
                localStorage.setItem('react-todo-lists', JSON.stringify(lists));
            } else {
                console.log("No such document for the user!");
                // Optionally handle the case for a new user with no document
            }
        } else {
            const storedLists = localStorage.getItem('react-todo-lists');
            lists = storedLists ? JSON.parse(storedLists) : [];
        }

        return lists;
    } catch (error) {
        console.error("Error fetching lists: ", error);
        return [];
    }
}

export async function setStoredLists(userId, updatedLists) {
    try {
        // Always update localStorage
        localStorage.setItem('react-todo-lists', JSON.stringify(updatedLists));

        // If online, synchronize the data with Firestore
        if (isOnline()) {
            const userDocRef = db.collection('users').doc(userId);
            await userDocRef.set({ lists: updatedLists }, { merge: true });
        }
    } catch (error) {
        console.error("Error saving lists: ", error);
    }
}