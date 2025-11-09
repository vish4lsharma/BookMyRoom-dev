import { useSyncExternalStore } from "react";

// Simple in-memory store (replace with Firestore later)
let wishlist = []; // array of room objects
const listeners = new Set();

function emit() {
  for (const l of listeners) l();
}

// Subscribe for useSyncExternalStore
function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function addToWishlist(room) {
  const exists = wishlist.some((r) => r.id === room.id);
  if (!exists) {
    wishlist = [room, ...wishlist];
    emit();
  }
}

export function removeFromWishlist(id) {
  const next = wishlist.filter((r) => r.id !== id);
  if (next.length !== wishlist.length) {
    wishlist = next;
    emit();
  }
}

export function isWishlisted(id) {
  return wishlist.some((r) => r.id === id);
}

export function getSnapshot() {
  return wishlist;
}

// Hook to consume the store
export function useWishlist() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return {
    list,
    add: addToWishlist,
    remove: removeFromWishlist,
    isWishlisted,
  };
}
