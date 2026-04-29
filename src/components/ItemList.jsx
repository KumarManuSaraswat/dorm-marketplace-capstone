import ItemCard from './ItemCard';

export default function ItemList({ items, onClaim, onComplete, onMarkSold, isBuyerView }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div>📦</div>
        <h3>No items available</h3>
        <p>{isBuyerView ? "Check back soon or list your own item!" : "List your first item to get started."}</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClaim={onClaim}
          onComplete={onComplete}
          onMarkSold={onMarkSold}
          isBuyerView={isBuyerView}
        />
      ))}
    </div>
  );
}