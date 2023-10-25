import React, { useState, useEffect } from "react";
import "./style.css";
import "./components/firebase";
import { getStoredLists, setStoredLists } from "./components/storage";
import { ERROR_STATES } from "./components/Generic/ErrorBanner";
import Header from "./components/Generic/Header";
import Todo from "./components/Todo/Todo";
import ErrorBanner from "./components/Generic/ErrorBanner";
import Footer from "./components/Generic/Footer";
import { analytics, logEvent } from "./components/firebase";

export default function App() {
  const [lists, setLists] = useState([]);
  const [errorState, setErrorState] = useState(ERROR_STATES.CLEAR);

  useEffect(() => {
    const storedLists = getStoredLists();
    setLists(storedLists);

    // Log PWA installations to Analytics
    const handleAppInstalled = () => {
      logEvent(analytics, 'pwa_installed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const saveLists = async (updatedLists) => {
    // Update state
    setLists(updatedLists);

    // Save to persistent storage
    await setStoredLists(updatedLists);
  }

  const reportErrorState = (newErrorState) => {
    setErrorState(newErrorState);
  }

  return (
    <div>
      <Header />
      <Todo lists={lists} saveLists={saveLists} onError={reportErrorState} />
      <ErrorBanner errorState={errorState} onClearErrors={() => reportErrorState(ERROR_STATES.CLEAR)} />
      <Footer />
    </div>
  );
}