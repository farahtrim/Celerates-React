import React, { useState, useEffect } from 'react';
import NoteCard from './NoteCard';

const moodColors = {
    Happy: '#FFD93D',
    Calm: '#A7F3D0',
    Sad: '#3B82F6',
    Energetic: '#F97316',
    Anxious: '#8B5CF6'
  };

  const moodEmojis = {
    Happy: '😊',
    Calm: '🧘‍♀️',
    Sad: '😢',
    Energetic: '⚡',
    Anxious: '😰'
  };

function NoteBoard() {
  const [notes, setNotes] = useState([]);
  const [newText, setNewText] = useState('');
  const [mood, setMood] = useState('Happy');

  useEffect(() => {
    const saved = localStorage.getItem('moodnotes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodnotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newText.trim() === '') return;
    const newNote = {
      id: Date.now(),
      text: newText,mood,
      color: moodColors[mood],
      timestamp: new Date().toDateString()
    };
    setNotes([newNote, ...notes]);
    setNewText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">MoodNotes 🧠🖊️</h2>

    
      <div className="flex flex-col gap-2 mb-6">
        <textarea
          className="border p-2 rounded"
          rows={2}
          placeholder="Tuliskan perasaan atau refleksi harianmu..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={mood}
          onChange={e => setMood(e.target.value)}
        >
          {Object.keys(moodColors).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button
          onClick={addNote}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Tambah Catatan mu..
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-center text-gray-400 italic">Belum ada catatan. Yuk mulai menulis!</p>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              id={note.id}
              text={note.text}
              color={note.color}
              mood={note.mood}
              emoji={moodEmojis[note.mood]}
              timestamp={note.timestamp}
              onDelete={deleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteBoard;