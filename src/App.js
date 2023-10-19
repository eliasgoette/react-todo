import React, { useState, useEffect } from "react";
import "./style.css";
import { getStoredLists, setStoredLists } from "./components/storage";
import { ERROR_STATES } from "./components/Generic/ErrorBanner";
import Header from "./components/Generic/Header";
import Todo from "./components/Todo/Todo";
import ErrorBanner from "./components/Generic/ErrorBanner";
import Footer from "./components/Generic/Footer";

export default function App() {
  const [lists, setLists] = useState([]);
  const [errorState, setErrorState] = useState(ERROR_STATES.CLEAR);

  useEffect(() => {
    (async () => {
      const storedLists = await getStoredLists();
      setLists(storedLists);
    })();
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