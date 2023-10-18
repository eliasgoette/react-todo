import React, { useState, useEffect } from "react";
import "./style.css";
import { getStoredLists, setStoredLists } from "./components/storage";
import Header from "./components/Generic/Header";
import Todo from "./components/Todo/Todo";

export default function App() {
  const [lists, setLists] = useState([]);

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

  return(
    <div>
      <Header />
      <Todo lists={lists} saveLists={saveLists} />
    </div>
  );
}