import React, { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  CreditCard,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import RecentBookingsTable from "../../components/dashboard/RecentBookingsTable";
import BookingCalendar from "../../components/dashboard/BookingCalendar";
import RevenueChart from "../../components/dashboard/RevenueChart";
import BookingsChart from "../../components/dashboard/BookingsChart";
import { getProviderMandaps } from "../../services/mandapApi";
import { getBookingsByProvider } from "../../services/bookingApi";
import { format, subDays, addDays } from "date-fns";

const DashboardPage: React.FC = () => {
  const [mandaps, setMandaps] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    bookings: 0,
    revenue: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  
  // Mock blocked dates for now
  const blockedDates = [];

  const getMandaps = async () => {
    try {
      const result = await getProviderMandaps();
      setMandaps(result);
    } catch (error) {
      console.error("Error fetching mandaps:", error);
    }
  };

  const getBookings = async () => {
    try {
      const result = await getBookingsByProvider();
      // Transform API data to match component expectations
      const transformedBookings = result.map((booking) => ({
        id: booking._id,
        mandapId: booking.mandapId._id,
        mandapName: booking.mandapId.mandapName,
        customerId: booking.userId._id,
        customerName: booking.userId.name,
        customerEmail: booking.userId.email || '',
        startDate: booking.orderDates[0],
        endDate: booking.orderDates[booking.orderDates.length - 1],
        totalAmount: booking.totalAmount,
        status: booking.paymentStatus === 'completed' ? 'completed' : 'confirmed',
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt,
      }));
      setBookings(transformedBookings);
      
      // Calculate analytics
      const totalBookings = transformedBookings.length;
      const totalRevenue = transformedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const pendingBookings = transformedBookings.filter(b => b.paymentStatus === 'pending').length;
      const completedBookings = transformedBookings.filter(b => b.status === 'completed').length;
      
      setAnalyticsData({
        bookings: totalBookings,
        revenue: totalRevenue,
        pendingBookings,
        completedBookings,
      });
      
      // Generate monthly data (simplified)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = new Date().getMonth();
      const monthlyStats = months.map((month, index) => {
        const monthBookings = transformedBookings.filter(booking => {
          const bookingMonth = new Date(booking.createdAt).getMonth();
          return bookingMonth === index;
        });
        return {
          month,
          bookings: monthBookings.length,
          revenue: monthBookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
        };
      });
      setMonthlyData(monthlyStats);
      
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getMandaps(), getBookings()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const recentBookings = bookings.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={analyticsData.bookings}
          icon={<BookOpen className="h-6 w-6" />}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${analyticsData.revenue.toLocaleString()}`}
          icon={<CreditCard className="h-6 w-6" />}
        />
        <StatCard
          title="Pending Bookings"
          value={analyticsData.pendingBookings}
          icon={<CalendarIcon className="h-6 w-6" />}
        />
        <StatCard
          title="Completed Bookings"
          value={analyticsData.completedBookings}
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyData} />
        <BookingsChart data={monthlyData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentBookingsTable bookings={recentBookings} />
        </div>
        <div>
          <BookingCalendar bookings={bookings} blockedDates={blockedDates} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
