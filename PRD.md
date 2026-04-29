# Dorm Marketplace PRD

## 1. Scope Cut

- **Payments**: Real money transactions require complex payment gateways, PCI compliance, and fraud detection - out of scope for Day 1 prototype.
- **Live Chat**: Real-time messaging adds WebSocket complexity and moderation requirements - users can coordinate pickup details in person.
- **Advanced Search**: Filtering by category/price/location adds UI complexity - Day 1 MVP uses simple list view.

## 2. MVP Features

- **List Items**: Sellers can add items with title, description, and photo placeholder.
- **Browse & Claim**: Buyers see available items and claim first-come-first-served.
- **Item Lifecycle**: Items transition through Available → Claimed → Completed/Expired states with seller overrides.

## 3. Acceptance Criteria - Claim Item Flow

**Given** an item is listed as Available,  
**When** a buyer clicks "Claim Item",  
**Then** the item immediately shows as Claimed by that buyer and unavailable to others.

**Given** a buyer has claimed an item,  
**When** they confirm pickup within 10 minutes OR seller marks as completed,  
**Then** the item shows as Completed and disappears from listings.

**Given** a claimed item expires after 10 minutes without pickup confirmation,  
**When** the timer expires,  
**Then** the item returns to Available status automatically.