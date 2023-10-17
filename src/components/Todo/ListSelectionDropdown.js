import React from "react";

export default function ListSelectDropdown({lists, selectedListIndex, onSelectListIndex}) {
    return(
        <div>
            <label>Select list</label>
            <select value={selectedListIndex} onChange={(e) => onSelectListIndex(e.target.selectedIndex)}>
                {lists.map((list, index) => <option key={index} value={index}>{list.name}</option>)}
            </select>
        </div>
    );
}