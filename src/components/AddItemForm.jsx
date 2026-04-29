import { useState } from 'react';

export default function AddItemForm({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddItem({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <h2>List Your Item</h2>
      <div className="form-group">
        <label htmlFor="title">Item Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mini fridge, Calculus textbook, etc."
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Condition, pickup location, etc."
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
        List Item for Free
      </button>
    </form>
  );
}