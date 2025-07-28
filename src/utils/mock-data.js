import { addDays, subDays, format } from "date-fns";

// Current mock user/provider
export const currentUser = {
  id: "1",
  name: "Raj Patel",
  email: "provider@gmail.com",
  phone: "9876543210",
  role: "provider",
  createdAt: "2023-01-15T00:00:00Z",
};

// Mock mandaps with updated schema
export const mandaps = [
  {
    id: "1",
    mandapName: "Laxmi Garden",
    description:
      "A beautiful venue for wedding ceremonies with lush green gardens.",
    providerId: "1",
    availableDates: [
      format(addDays(new Date(), 7), "yyyy-MM-dd"),
      format(addDays(new Date(), 14), "yyyy-MM-dd"),
      format(addDays(new Date(), 21), "yyyy-MM-dd"),
    ],
    venueType: ["Lawn", "Banquet Hall"],
    address: {
      street: "123 Wedding Lane",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    penaltyChargesPerHour: 5000,
    cancellationPolicy: "Partial Refund",
    venueImages: [
      "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
      "https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg",
    ],
    guestCapacity: 500,
    venuePricing: 75000,
    securityDeposit: 15000,
    securityDepositType: "Refundable",
    amenities: [
      "WiFi",
      "Parking",
      "Air Conditioning",
      "Catering Service",
      "Sound System",
    ],
    outdoorFacilities: ["Garden", "Parking Area", "Outdoor Lighting"],
    paymentOptions: ["Cash", "Credit Card", "UPI", "Net Banking"],
    isExternalCateringAllowed: true,
    isActive: true,
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "2",
    mandapName: "Royal Banquet",
    description:
      "An elegant indoor banquet hall perfect for grand celebrations.",
    providerId: "1",
    availableDates: [
      format(addDays(new Date(), 10), "yyyy-MM-dd"),
      format(addDays(new Date(), 17), "yyyy-MM-dd"),
      format(addDays(new Date(), 24), "yyyy-MM-dd"),
    ],
    venueType: ["Banquet Hall"],
    address: {
      street: "456 Celebration Road",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    penaltyChargesPerHour: 3000,
    cancellationPolicy: "No Refund",
    venueImages: [
      "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
      "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg",
    ],
    guestCapacity: 300,
    venuePricing: 60000,
    securityDeposit: 12000,
    securityDepositType: "Refundable",
    amenities: ["WiFi", "Parking", "Air Conditioning", "Sound System", "Stage"],
    outdoorFacilities: ["Parking Area"],
    paymentOptions: ["Cash", "Credit Card", "Debit Card", "UPI"],
    isExternalCateringAllowed: false,
    isActive: true,
    createdAt: "2023-03-15T00:00:00Z",
    updatedAt: "2023-03-15T00:00:00Z",
  },
  {
    id: "3",
    mandapName: "Horizon View",
    description: "A rooftop venue with panoramic city views.",
    providerId: "1",
    availableDates: [
      format(addDays(new Date(), 5), "yyyy-MM-dd"),
      format(addDays(new Date(), 12), "yyyy-MM-dd"),
      format(addDays(new Date(), 19), "yyyy-MM-dd"),
    ],
    venueType: ["Rooftop"],
    address: {
      street: "789 Skyline Avenue",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    penaltyChargesPerHour: 4000,
    cancellationPolicy: "Full Refund",
    venueImages: [
      "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg",
      "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg",
    ],
    guestCapacity: 200,
    venuePricing: 45000,
    securityDeposit: 9000,
    securityDepositType: "Refundable",
    amenities: ["WiFi", "Sound System", "Lighting System", "Generator"],
    outdoorFacilities: ["Terrace", "Outdoor Bar", "Outdoor Lighting"],
    paymentOptions: ["Cash", "UPI", "Net Banking"],
    isExternalCateringAllowed: true,
    isActive: true,
    createdAt: "2023-04-20T00:00:00Z",
    updatedAt: "2023-04-20T00:00:00Z",
  },
];

// Mock bookings
export const bookings = [
  {
    id: "1",
    mandapId: "1",
    mandapName: "Laxmi Garden",
    customerId: "c1",
    customerName: "Amit Shah",
    customerEmail: "amit@example.com",
    customerPhone: "9876543210",
    startDate: format(subDays(new Date(), 10), "yyyy-MM-dd"),
    endDate: format(subDays(new Date(), 9), "yyyy-MM-dd"),
    totalAmount: 75000,
    status: "completed",
    paymentStatus: "completed",
    createdAt: format(subDays(new Date(), 20), "yyyy-MM-dd"),
  },
  {
    id: "2",
    mandapId: "2",
    mandapName: "Royal Banquet",
    customerId: "c2",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    customerPhone: "8765432109",
    startDate: format(addDays(new Date(), 5), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 6), "yyyy-MM-dd"),
    totalAmount: 60000,
    status: "confirmed",
    paymentStatus: "partial",
    createdAt: format(subDays(new Date(), 15), "yyyy-MM-dd"),
  },
  {
    id: "3",
    mandapId: "1",
    mandapName: "Laxmi Garden",
    customerId: "c3",
    customerName: "Rahul Verma",
    customerEmail: "rahul@example.com",
    customerPhone: "7654321098",
    startDate: format(addDays(new Date(), 15), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 16), "yyyy-MM-dd"),
    totalAmount: 75000,
    status: "confirmed",
    paymentStatus: "pending",
    createdAt: format(subDays(new Date(), 5), "yyyy-MM-dd"),
  },
  {
    id: "4",
    mandapId: "3",
    mandapName: "Horizon View",
    customerId: "c4",
    customerName: "Neha Joshi",
    customerEmail: "neha@example.com",
    customerPhone: "6543210987",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    totalAmount: 45000,
    status: "confirmed",
    paymentStatus: "completed",
    createdAt: format(subDays(new Date(), 8), "yyyy-MM-dd"),
  },
];

// Mock blocked dates
export const blockedDates = [
  {
    id: "1",
    mandapId: "1",
    startDate: format(addDays(new Date(), 20), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 22), "yyyy-MM-dd"),
    reason: "Maintenance",
    createdAt: format(subDays(new Date(), 2), "yyyy-MM-dd"),
  },
  {
    id: "2",
    mandapId: "2",
    startDate: format(addDays(new Date(), 10), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 12), "yyyy-MM-dd"),
    reason: "Renovation",
    createdAt: format(subDays(new Date(), 5), "yyyy-MM-dd"),
  },
];

// Mock analytics data
export const analyticsData = {
  bookings: 24,
  revenue: 1650000,
  pendingBookings: 5,
  completedBookings: 19,
};

// Mock monthly data for charts
export const monthlyData = [
  { month: "Jan", bookings: 2, revenue: 150000 },
  { month: "Feb", bookings: 3, revenue: 225000 },
  { month: "Mar", bookings: 1, revenue: 60000 },
  { month: "Apr", bookings: 4, revenue: 280000 },
  { month: "May", bookings: 2, revenue: 120000 },
  { month: "Jun", bookings: 5, revenue: 325000 },
  { month: "Jul", bookings: 3, revenue: 180000 },
  { month: "Aug", bookings: 2, revenue: 90000 },
  { month: "Sep", bookings: 1, revenue: 45000 },
  { month: "Oct", bookings: 0, revenue: 0 },
  { month: "Nov", bookings: 0, revenue: 0 },
  { month: "Dec", bookings: 1, revenue: 75000 },
];

// Mock reviews
export const reviews = [
  {
    id: "1",
    mandapId: "1",
    userId: "u1",
    userName: "Priya Sharma",
    rating: 5,
    comment:
      "Beautiful venue with excellent amenities. The staff was very helpful and professional.",
    createdAt: "2024-02-15T10:30:00Z",
    images: [
      "https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg",
      "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
    ],
  },
  {
    id: "2",
    mandapId: "1",
    userId: "u2",
    userName: "Rahul Verma",
    rating: 4,
    comment:
      "Great location and beautiful decor. Slightly expensive but worth it.",
    createdAt: "2024-02-10T15:20:00Z",
  },
  {
    id: "3",
    mandapId: "2",
    userId: "u3",
    userName: "Anjali Patel",
    rating: 5,
    comment: "Perfect venue for our wedding. The banquet hall is stunning!",
    createdAt: "2024-02-05T09:15:00Z",
    images: [
      "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
    ],
  },
  {
    id: "4",
    mandapId: "3",
    userId: "u4",
    userName: "Vikram Singh",
    rating: 4,
    comment:
      "Amazing rooftop view and great ambiance. The outdoor facilities are excellent.",
    createdAt: "2024-01-28T14:45:00Z",
  },
  {
    id: "5",
    mandapId: "2",
    userId: "u5",
    userName: "Meera Gupta",
    rating: 3,
    comment:
      "Good venue but the sound system could be better. Overall decent experience.",
    createdAt: "2024-01-20T11:30:00Z",
  },
];

// Mock caterers
export const caterers = [
  {
    id: "1",
    mandapId: ["1", "2"],
    catererName: "Royal Caterers",
    menuCategory: {
      category: "Premium",
      menuItems: [
        { itemName: "Paneer Butter Masala", itemPrice: 250 },
        { itemName: "Dal Makhani", itemPrice: 200 },
        { itemName: "Biryani", itemPrice: 300 },
      ],
      pricePerPlate: 750,
      categoryImage:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    },
    foodType: "Both",
    isCustomizable: true,
    hasTastingSession: true,
    isActive: true,
  },
];

// Mock photographers
export const photographers = [
  {
    id: "1",
    mandapId: ["1", "3"],
    photographerName: "Capture Moments",
    photographyTypes: [
      {
        phtype: "Candid",
        pricePerEvent: 25000,
        sampleWork: [
          "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
        ],
      },
      {
        phtype: "Traditional",
        pricePerEvent: 20000,
        sampleWork: [
          "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
        ],
      },
    ],
    isActive: true,
  },
];

// Mock rooms
export const rooms = [
  {
    id: "1",
    mandapId: "1",
    AcRoom: {
      noOfRooms: 10,
      pricePerNight: 3000,
      amenities: ["WiFi", "TV", "AirConditioning", "RoomService"],
      roomImages: [
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
      ],
    },
    NonAcRoom: {
      noOfRooms: 5,
      pricePerNight: 2000,
      amenities: ["WiFi", "TV", "Fan", "RoomService"],
      roomImages: [
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      ],
    },
    isActive: true,
  },
];
