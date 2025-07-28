import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Check, XCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Booking } from '../../types';
import { format } from 'date-fns';

interface RecentBookingsTableProps {
  bookings: Booking[];
}

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ bookings }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-50 text-success-700';
      case 'cancelled':
        return 'bg-error-50 text-error-700';
      case 'pending':
        return 'bg-warning-50 text-warning-700';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-50 text-success-700';
      case 'partial':
        return 'bg-warning-50 text-warning-700';
      case 'pending':
        return 'bg-error-50 text-error-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Link to="/bookings">
          <Button variant="link" className="text-sm p-0" icon={<ExternalLink className="h-4 w-4" />}>
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-3 py-3 text-left font-medium text-gray-500">ID</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Mandap</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Amount</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-3 py-3 text-left font-medium text-gray-500">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-3 font-medium">#{booking.id}</td>
                  <td className="px-3 py-3">{booking.mandapName}</td>
                  <td className="px-3 py-3">{booking.customerName}</td>
                  <td className="px-3 py-3">
                    {format(new Date(booking.startDate), 'dd MMM yyyy')}
                  </td>
                  <td className="px-3 py-3">₹{booking.totalAmount.toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      <span className="capitalize">{booking.paymentStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookingsTable;