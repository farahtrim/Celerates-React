import React from 'react';

function NoteCard({ id, text, color, mood, emoji, timestamp, onDelete}) {
  return (
    <div
      className="p-4 rounded-md shadow-md mb-4"
      style={{ 
        backgroundColor: color,
    borderLeft: '5px solid rgba(0,0,0,0.1)'
 }}
    >
        <div className='text-sm text-gray-700 mb-1'>
          {emoji} <strong>{mood}</strong> – <em>{timestamp}</em>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 text-white font-bold"
        >
          ×
        </button>
      <p className="text-white font-semibold">{text}</p>
    </div>
  );
}

export default NoteCard;
