const EVENT = "fable:notifications:changed";

function storageKey(email) {
  return `fable:notifications:${email || "guest"}`;
}

function readList(email) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey(email));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeList(email, list) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(email), JSON.stringify(list));
  } catch {}
}

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

export function getNotifications(email) {
  return readList(email);
}

export function getUnreadCount(list) {
  return list.filter((n) => !n.read).length;
}

export function addNotification({ email, type, message, dedupeKey }) {
  if (!email) return { added: false, notifications: [] };

  const list = readList(email);

  if (dedupeKey && list.some((n) => n.dedupeKey === dedupeKey)) {
    return { added: false, notifications: list };
  }

  const notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    message,
    dedupeKey: dedupeKey || null,
    time: new Date().toISOString(),
    read: false,
  };

  const next = [notification, ...list];
  writeList(email, next);
  emit();
  return { added: true, notifications: next };
}

export function markAllNotificationsRead(email) {
  if (!email) return [];
  const list = readList(email).map((n) => ({ ...n, read: true }));
  writeList(email, list);
  emit();
  return list;
}

export function markNotificationRead(email, id) {
  if (!email) return [];
  const list = readList(email).map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  writeList(email, list);
  emit();
  return list;
}

export function subscribeNotifications(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

export function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}