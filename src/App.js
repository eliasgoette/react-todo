import React, { useState } from "react";
import "./style.css";
import Header from "./components/Generic/Header";
import Todo from "./components/Todo/Todo";

const DUMMY_LISTS = [
  {
    name: 'Work',
    content: [
      {
        title: 'Meeting',
        notes: 'Be on time!!!',
        completed: true,
        important: true,
        duedate: new Date()
      },
      {
        title: 'Project',
        notes: 'Ask ... for his opinion on the landing page.',
        completed: false,
        important: false,
        duedate: new Date()
      },
      {
        title: 'Learn React',
        notes: 'States, hooks',
        completed: false,
        important: true,
        duedate: new Date()
      },
      {
        title: 'Apply for dev job',
        notes: 'New photos',
        completed: false,
        important: true,
        duedate: new Date()
      }
    ]
  },
  {
    name: 'Home',
    content: [
      {
        title: 'Clean the floor',
        notes: '',
        completed: true,
        important: false,
        duedate: new Date()
      }
    ]
  },
  {
    name: 'Misc',
    content: [
      {
        title: 'Buy ingredients for pancakes',
        notes: '[ingredients]',
        completed: false,
        important: false,
        duedate: new Date()
      },
      {
        title: 'Call doc',
        notes: 'For health check',
        completed: false,
        important: false,
        duedate: new Date()
      }
    ]
  }
];

export default function App() {
  const [lists, setLists] = useState(DUMMY_LISTS);

  const saveLists = (updatedLists) => {
    // Update state
    setLists(updatedLists);

    // Save to persistant storage
    // (TODO)
  }

  return(
    <div>
      <Header />
      <Todo lists={lists} saveLists={saveLists} />
    </div>
  );
}