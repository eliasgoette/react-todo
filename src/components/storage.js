import { db } from './firebase';
import 'firebase/firestore';

const isOnline = () => navigator.onLine;

export async function getStoredLists() {
    try {
        let lists = [];

        // Fetch data from Firestore if online, else from localStorage
        if (isOnline()) {
            const listsCollection = await db.collection('todoLists').get();
            lists = listsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Update localStorage with the latest data when online
            localStorage.setItem('react-todo-lists', JSON.stringify(lists));
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

export function setStoredLists(updatedLists) {
    try {
        // Always update localStorage
        localStorage.setItem('react-todo-lists', JSON.stringify(updatedLists));

        // If online, synchronize the data with Firestore
        if (isOnline()) {
            updatedLists.forEach(async (list) => {
                if (list.id) {
                    await db.collection('todoLists').doc(list.id).update(list);
                } else {
                    await db.collection('todoLists').add(list);
                }
            });
        }
    } catch (error) {
        console.error("Error saving lists: ", error);
    }
}