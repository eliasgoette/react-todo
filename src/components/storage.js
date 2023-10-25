let lists = [];

// Uncomment for demo lists
// lists = [
//     {
//         name: 'Work',
//         content: [
//             {
//                 title: 'Meeting',
//                 notes: '',
//                 completed: true,
//                 important: true,
//                 duedate: new Date()
//             },
//             {
//                 title: 'Project',
//                 notes: 'Ask ... for his opinion on the landing page.',
//                 completed: false,
//                 important: false,
//                 duedate: new Date()
//             },
//             {
//                 title: 'Learn React',
//                 notes: 'States, hooks',
//                 completed: false,
//                 important: true,
//                 duedate: new Date()
//             },
//             {
//                 title: 'Apply for dev job',
//                 notes: 'New photos',
//                 completed: false,
//                 important: true,
//                 duedate: new Date()
//             }
//         ]
//     },
//     {
//         name: 'Home',
//         content: [
//             {
//                 title: 'Clean the floor',
//                 notes: '',
//                 completed: true,
//                 important: false,
//                 duedate: new Date()
//             }
//         ]
//     },
//     {
//         name: 'Misc',
//         content: [
//             {
//                 title: 'Buy ingredients for pancakes',
//                 notes: '[ingredients]',
//                 completed: false,
//                 important: false,
//                 duedate: new Date()
//             },
//             {
//                 title: 'Call doc',
//                 notes: 'For health check',
//                 completed: false,
//                 important: false,
//                 duedate: new Date()
//             }
//         ]
//     }
// ];

export function getStoredLists() {
    const storedLists = localStorage.getItem('react-todo-lists');

    if (storedLists) {
        return JSON.parse(storedLists);
    }

    return lists;
}

export function setStoredLists(updatedLists) {
    localStorage.setItem('react-todo-lists', JSON.stringify(updatedLists));
}