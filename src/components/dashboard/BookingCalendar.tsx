import React, { useState } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Booking, BlockedDate } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface BookingCalendarProps {
  bookings: Booking[];
  blockedDates: BlockedDate[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings, blockedDates }) => {
  const [date, setDate] = useState(new Date());
  
  const getDateType = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Check if date is blocked
    const isBlocked = blockedDates.some(
      (blockedDate) => 
        formattedDate >= blockedDate.startDate && 
        formattedDate <= blockedDate.endDate
    );
    
    if (isBlocked) return 'blocked';
    
    // Check if date has a booking
    const hasBooking = bookings.some(
      (booking) => 
        formattedDate >= booking.startDate && 
        formattedDate <= booking.endDate
    );
    
    if (hasBooking) return 'booked';
    
    return 'available';
  };
  
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    
    const dateType = getDateType(date);
    
    switch (dateType) {
      case 'blocked':
        return 'bg-gray-200 text-gray-400';
      case 'booked':
        return 'bg-primary-100 text-primary-800 font-bold';
      default:
        return '';
    }
  };
  
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const dateType = getDateType(date);
    let dotColor = '';
    
    switch (dateType) {
      case 'blocked':
        dotColor = 'bg-gray-400';
        break;
      case 'booked':
        dotColor = 'bg-primary-500';
        break;
      default:
        return null;
    }
    
    return <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${dotColor}`}></div>;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="custom-calendar">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            tileContent={tileContent}
          />
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
            <span>Blocked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-white border border-gray-300 mr-2"></div>
            <span>Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;