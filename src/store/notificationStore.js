import { create } from 'zustand';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    userId: '1',
    type: 'booking',
    title: 'New Booking Request',
    message: 'You have a new booking request for Laxmi Garden',
    read: false,
    createdAt: new Date().toISOString(),
    data: { bookingId: '1', mandapId: '1' }
  },
  {
    id: '2',
    userId: '1',
    type: 'review',
    title: 'New Review',
    message: 'You received a 5-star review for Royal Banquet',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    data: { reviewId: '1', mandapId: '2' }
  },
  {
    id: '3',
    userId: '1',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of ₹75,000 received for Laxmi Garden booking',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    data: { bookingId: '1', mandapId: '1' }
  }
];

export const useNotificationStore = create((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: state.notifications.find((n) => n.id === id && !n.read)
        ? state.unreadCount - 1
        : state.unreadCount,
    })),
}));