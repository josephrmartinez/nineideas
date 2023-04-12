import React, { useState } from "react";

export default function IdeasList({ ideaList, updateIdea }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedIdea, setEditedIdea] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedIdea(ideaList[index]);
  };

  const handleInputChange = (event) => {
    setEditedIdea(event.target.value);
  };

  function handleInputBlur() {
    setEditIndex(-1);
    updateIdea(editIndex, editedIdea)
  };

  function checkSubmitIdea(event) {
    if (event.key === 'Enter' && editedIdea.trim().length > 3) {
      handleInputBlur()
    }
  }

  const ideas = ideaList.map((each, index) => {
    const initialRows = Math.ceil(each.length / 40)

      return (
    <div key={each}>
      {editIndex === index ? (
        <textarea
          className="my-4 tracking-wide w-full p-0 text-gray-700"
          value={editedIdea}
            onChange={handleInputChange}
            onKeyDown={checkSubmitIdea}
          onBlur={handleInputBlur}
          rows={initialRows}
        />
      ) : (
        <div
                className="tracking-wide text-gray-700"
                style={{marginTop: '16px', marginBottom: '22px'}}
          onClick={() => handleEditClick(index)}
        >
          {each}
        </div>
      )}
      <div className="border-b"></div>
        </div>
      )
  });

  return <div>{ideas}</div>;
}
