import React, { useState, useEffect } from "react";
import "./style.css";
import { auth, signInAnonymously, googleProvider, analytics, logEvent } from "./components/firebase";
import { getStoredLists, setStoredLists } from "./components/storage";
import { ERROR_STATES } from "./components/Generic/ErrorBanner";
import Header from "./components/Generic/Header";
import Todo from "./components/Todo/Todo";
import ErrorBanner from "./components/Generic/ErrorBanner";
import Footer from "./components/Generic/Footer";

export default function App() {
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null); // User state
  const [errorState, setErrorState] = useState(ERROR_STATES.CLEAR);

  useEffect(() => {
    // Monitor user authentication state
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);

        const fetchLists = async () => {
          const storedLists = await getStoredLists(user.uid); // Modify to accept userID
          setLists(storedLists);
        };

        fetchLists();
      } else {
        // Clear user and lists
        setUser(null);
        setLists([]);
      }
    });

    // Log PWA installations to Analytics
    const handleAppInstalled = () => {
      logEvent(analytics, 'pwa_installed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup the listener and auth subscription on unmount
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      reportErrorState(error.message);
    }
  };

  const signInAnonymously = async () => {
    try {
      await auth.signInAnonymously();
    } catch (error) {
      console.error("Error signing in anonymously", error);
      reportErrorState(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
      reportErrorState(error.message);
    }
  };

  const saveLists = async (updatedLists) => {
    setLists(updatedLists);
    if (user) {
      await setStoredLists(user.uid, updatedLists);
    }
  }

  const reportErrorState = (newErrorState) => {
    setErrorState(newErrorState);
  }

  return (
    <div>
      <Header />
      {user ? (
        <div>
          <p>Welcome, {user.displayName || "Anonymous User"}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <button onClick={signInAnonymously}>Sign in Anonymously</button>
        </div>
      )}
      <Todo lists={lists} saveLists={saveLists} onError={reportErrorState} />
      <ErrorBanner errorState={errorState} onClearErrors={() => reportErrorState(ERROR_STATES.CLEAR)} />
      <Footer />
    </div>
  );
}