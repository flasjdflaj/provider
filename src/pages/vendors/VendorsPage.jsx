import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Camera, Utensils, Bed } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const VendorsPage = () => {
  // Mock data for demonstration
  const caterers = [
    {
      id: '1',
      catererName: 'Royal Caterers',
      foodType: 'Both',
      isActive: true
    }
  ];

  const photographers = [
    {
      id: '1',
      photographerName: 'Capture Moments',
      isActive: true
    }
  ];

  const rooms = [
    {
      id: '1',
      mandapId: '1',
      isActive: true
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
        <div className="flex flex-wrap gap-2">
          <Link to="/vendors/caterers/new">
            <Button icon={<Plus className="h-4 w-4" />} size="sm">
              Add Caterer
            </Button>
          </Link>
          <Link to="/vendors/photographers/new">
            <Button icon={<Plus className="h-4 w-4" />} size="sm" variant="secondary">
              Add Photographer
            </Button>
          </Link>
          <Link to="/vendors/rooms/new">
            <Button icon={<Plus className="h-4 w-4" />} size="sm" variant="outline">
              Add Room
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Utensils className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Caterers</h3>
            <p className="text-3xl font-bold text-primary-600 mb-2">{caterers.length}</p>
            <p className="text-sm text-gray-500">Active caterers</p>
            <div className="mt-4">
              <Link to="/vendors/caterers/new">
                <Button variant="outline" size="sm" fullWidth>
                  Add Caterer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Camera className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Photographers</h3>
            <p className="text-3xl font-bold text-primary-600 mb-2">{photographers.length}</p>
            <p className="text-sm text-gray-500">Active photographers</p>
            <div className="mt-4">
              <Link to="/vendors/photographers/new">
                <Button variant="outline" size="sm" fullWidth>
                  Add Photographer
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Bed className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rooms</h3>
            <p className="text-3xl font-bold text-primary-600 mb-2">{rooms.length}</p>
            <p className="text-sm text-gray-500">Active rooms</p>
            <div className="mt-4">
              <Link to="/vendors/rooms/new">
                <Button variant="outline" size="sm" fullWidth>
                  Add Room
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Vendor Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Utensils className="h-5 w-5 text-primary-500 mr-3" />
                <div>
                  <p className="font-medium">Royal Caterers</p>
                  <p className="text-sm text-gray-500">Added new menu category - Premium</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Camera className="h-5 w-5 text-primary-500 mr-3" />
                <div>
                  <p className="font-medium">Capture Moments</p>
                  <p className="text-sm text-gray-500">Updated sample work portfolio</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-primary-500 mr-3" />
                <div>
                  <p className="font-medium">Laxmi Garden Rooms</p>
                  <p className="text-sm text-gray-500">Added 5 new AC rooms</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorsPage;