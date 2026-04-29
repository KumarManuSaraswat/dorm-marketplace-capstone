import { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';
import './App.css';

const ITEMS_KEY = 'dorm-marketplace-items';

function App() {
  const [items, setItems] = useState([]);
  const [activeView, setActiveView] = useState('browse'); // 'browse' or 'seller'

  // Load items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(ITEMS_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Persist items to localStorage
  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  // Check for expired claims every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => 
        prevItems.map(item => {
          if (item.status === 'claimed' && item.claimExpiresAt) {
            const now = new Date();
            if (now > new Date(item.claimExpiresAt)) {
              return { ...item, status: 'available', claimedBy: null, claimExpiresAt: null };
            }
          }
          return item;
        })
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const addItem = (newItem) => {
    const item = {
      id: Date.now().toString(),
      ...newItem,
      status: 'available',
      createdAt: new Date().toISOString(),
    };
    setItems(prev => [item, ...prev]);
  };

  const claimItem = useCallback((itemId) => {
    setItems(prev => prev.map(item => {
      // Atomic claim - only claim if still available (handles concurrency)
      if (item.id === itemId && item.status === 'available') {
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min
        return {
          ...item,
          status: 'claimed',
          claimedBy: `Student ${Math.floor(Math.random() * 1000)}`, // Mock user
          claimExpiresAt: expiresAt,
        };
      }
      return item;
    }));
  }, []);

  const completeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const markSold = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const availableItems = items.filter(item => item.status === 'available');

  return (
    <div className="app">
      <header className="header">
        <h1>🏠 Dorm Marketplace</h1>
        <nav className="nav">
          <button 
            className={activeView === 'browse' ? 'active' : ''}
            onClick={() => setActiveView('browse')}
          >
            Browse Items ({availableItems.length})
          </button>
          <button 
            className={activeView === 'seller' ? 'active' : ''}
            onClick={() => setActiveView('seller')}
          >
            Sell Item
          </button>
        </nav>
      </header>

      <main className="main">
        {activeView === 'browse' ? (
          <div className="browse-view">
            <ItemList 
              items={availableItems}
              onClaim={claimItem}
              onComplete={completeItem}
              onMarkSold={markSold}
              isBuyerView={true}
            />
          </div>
        ) : (
          <div className="seller-view">
            <AddItemForm onAddItem={addItem} />
            <ItemList 
              items={items}
              onClaim={claimItem}
              onComplete={completeItem}
              onMarkSold={markSold}
              isBuyerView={false}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;