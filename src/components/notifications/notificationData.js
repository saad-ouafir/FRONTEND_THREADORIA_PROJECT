// Sample data - in a real app, this would come from API
export const samplePublicFollows = [
  {
    id: 101,
    user: {
      id: 1,
      name: "Ahmed Mohamed",
      username: "@ahmed",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    time: "1 hour ago",
    read: false
  },
  {
    id: 102,
    user: {
      id: 2,
      name: "Sarah Johnson",
      username: "@sarah",
      avatar: "https://i.pravatar.cc/150?img=16"
    },
    time: "3 hours ago",
    read: true
  },
  {
    id:103,
    user:{
      id:3,
      name:"Hamid Skefkef",
      username:"@hamidSkefkef",
      avatar:"https://i.pravatar.cc/150?img=1"
    },
    time:"2 hours ago",
    read: false
  }
];

export const sampleFollowRequests = [
  {
    id: 1,
    follower: {
      id: 3,
      name: "Hamid Skefkef",
      username: "@hamidSkefkef",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    requested_at: "2 hours ago",
    read: false
  },
  {
    id: 2,
    follower: {
      id: 4,
      name: "Jhon Ait Doe",
      username: "@7imaroJo7a",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    requested_at: "4 hours ago",
    read: true
  },
  {
    id: 3,
    follower: {
      id: 8,
      name: "Marie Dupont",
      username: "@marieDupont",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    requested_at: "5 hours ago",
    read: false
  },
  {
    id: 4,
    follower: {
      id: 9,
      name: "Pierre Martin",
      username: "@pierreMartin",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    requested_at: "6 hours ago",
    read: true
  },
  {
    id: 5,
    follower: {
      id: 10,
      name: "Sophie Laurent",
      username: "@sophieLaurent",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
    requested_at: "1 day ago",
    read: false
  }
];

export const sampleNotifications = [
  {
    id: 4,
    type: 'like',
    user: {
      id: 5,
      name: "henry sanchez",
      username: "@henrySanchez",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    messageKey: 'notifications.liked_thread',
    defaultMessage: 'liked your thread',
    time: "1 day ago",
    read: false
  },
  {
    id: 5,
    type: 'reply',
    user: {
      id: 6,
      name: "Alice Johnson",
      username: "@alice",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    messageKey: 'notifications.replied_thread',
    defaultMessage: 'replied to your thread',
    time: "2 days ago",
    read: true
  },
  {
    id: 6,
    type: 'repost',
    user: {
      id: 7,
      name: "Bob Wilson",
      username: "@bob",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    messageKey: 'notifications.reposted_thread',
    defaultMessage: 'reposted your thread',
    time: "3 days ago",
    read: false
  },
  {
    id: 7,
    type: 'like',
    user: {
      id: 11,
      name: "Emma Davis",
      username: "@emmaDavis",
      avatar: "https://i.pravatar.cc/150?img=14"
    },
    messageKey: 'notifications.liked_thread',
    defaultMessage: 'liked your thread',
    time: "4 days ago",
    read: true
  },
  {
    id: 8,
    type: 'reply',
    user: {
      id: 12,
      name: "Michael Brown",
      username: "@michaelBrown",
      avatar: "https://i.pravatar.cc/150?img=17"
    },
    messageKey: 'notifications.replied_thread',
    defaultMessage: 'replied to your thread',
    time: "5 days ago",
    read: true
  },
  {
    id: 9,
    type: 'repost',
    user: {
      id: 13,
      name: "Lisa Anderson",
      username: "@lisaAnderson",
      avatar: "https://i.pravatar.cc/150?img=18"
    },
    messageKey: 'notifications.reposted_thread',
    defaultMessage: 'reposted your thread',
    time: "1 week ago",
    read: true
  }
];
