import { formatDistanceToNow } from 'date-fns';

export default function ItemCard({ item, onClaim, onComplete, onMarkSold, isBuyerView }) {
  const getStatusBadge = () => {
    switch (item.status) {
      case 'available':
        return <span className="status-badge status-available">Available</span>;
      case 'claimed':
        return (
          <span className="status-badge status-claimed">
            Claimed by {item.claimedBy}
            {item.claimExpiresAt && (
              <div className="timer">
                Expires {formatDistanceToNow(new Date(item.claimExpiresAt))}
              </div>
            )}
          </span>
        );
      case 'completed':
        return <span className="status-badge status-completed">Completed</span>;
      default:
        return null;
    }
  };

  const canClaim = item.status === 'available' && isBuyerView;
  const showSellerActions = !isBuyerView || item.status === 'claimed';

  return (
    <div className="item-card">
      <div className="item-image">
        📦 {item.title}
      </div>
      <h2 className="item-title">{item.title}</h2>
      <p className="item-description">{item.description}</p>
      {getStatusBadge()}
      
      <div className="item-meta">
        <small>Listed {formatDistanceToNow(new Date(item.createdAt))} ago</small>
      </div>

      <div className="item-actions">
        {canClaim && (
          <button className="btn btn-primary" onClick={() => onClaim(item.id)}>
            Claim Item
          </button>
        )}
        
        {showSellerActions && (
          <>
            {item.status === 'claimed' && (
              <button className="btn btn-primary" onClick={() => onComplete(item.id)}>
                Mark Completed
              </button>
            )}
            <button className="btn btn-danger btn-secondary" onClick={() => onMarkSold(item.id)}>
              {item.status === 'available' ? 'Mark as Sold' : 'Remove'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}