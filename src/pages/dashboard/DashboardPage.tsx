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
import {
  bookings,
  blockedDates,
  analyticsData,
  monthlyData,
} from "../../utils/mock-data";
import axios from "axios";
import { getProviderMandaps } from "../../services/mandapApi";

const DashboardPage: React.FC = () => {
  const recentBookings = bookings.slice(0, 5);
  const [mandaps, setMandaps] = useState([]);
  const getMandaps = async () => {
    const result = await getProviderMandaps();
    setMandaps(result);
    console.log(result, "result+++++++++++=====");
  };

  useEffect(() => {
    getMandaps();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={analyticsData.bookings}
          icon={<BookOpen className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${analyticsData.revenue.toLocaleString()}`}
          icon={<CreditCard className="h-6 w-6" />}
          change={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Bookings"
          value={analyticsData.pendingBookings}
          icon={<CalendarIcon className="h-6 w-6" />}
          change={{ value: 2, isPositive: false }}
        />
        <StatCard
          title="Completed Bookings"
          value={analyticsData.completedBookings}
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 15, isPositive: true }}
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
