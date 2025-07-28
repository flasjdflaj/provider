import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import MandapCard from '../../components/mandap/MandapCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { getProviderMandaps, deleteMandap } from '../../services/mandapApi';
import { toast } from 'sonner';

const MandapsListPage = () => {
  const [mandaps, setMandaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMandaps();
  }, []);

  const fetchMandaps = async () => {
    try {
      setLoading(true);
      const result = await getProviderMandaps();
      // Transform API data to match component expectations
      const transformedMandaps = result.map(mandap => ({
        id: mandap._id,
        mandapName: mandap.mandapName,
        name: mandap.mandapName, // fallback
        description: mandap.mandapDesc,
        address: {
          street: mandap.address?.fullAddress || '',
          city: mandap.address?.city || '',
          state: mandap.address?.state || '',
          pincode: mandap.address?.pinCode || '',
        },
        guestCapacity: mandap.guestCapacity,
        capacity: mandap.guestCapacity, // fallback
        venuePricing: mandap.venuePricing,
        price: mandap.venuePricing, // fallback
        venueImages: mandap.venueImages || [],
        images: mandap.venueImages || [], // fallback
        amenities: mandap.amenities || [],
        venueType: mandap.venueType || [],
        securityDeposit: mandap.securityDeposit,
        cancellationPolicy: mandap.cancellationPolicy,
        penaltyChargesPerHour: mandap.penaltyChargesPerHour,
        isExternalCateringAllowed: mandap.isExternalCateringAllowed,
        createdAt: mandap.createdAt,
      }));
      setMandaps(transformedMandaps);
    } catch (error) {
      console.error('Error fetching mandaps:', error);
      toast.error('Failed to fetch mandaps');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (mandapId) => {
    if (window.confirm('Are you sure you want to delete this mandap?')) {
      try {
        await deleteMandap(mandapId);
        setMandaps(prevMandaps => prevMandaps.filter(mandap => mandap.id !== mandapId));
        toast.success('Mandap deleted successfully');
      } catch (error) {
        console.error('Error deleting mandap:', error);
        toast.error('Failed to delete mandap');
      }
    }
  };

  const filteredMandaps = mandaps.filter(mandap => {
    const matchesSearch = mandap.mandapName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mandap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (mandap.address?.city || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'high-capacity' && mandap.guestCapacity >= 400) return matchesSearch;
    if (filter === 'medium-capacity' && mandap.guestCapacity < 400 && mandap.guestCapacity >= 200) return matchesSearch;
    if (filter === 'low-capacity' && mandap.guestCapacity < 200) return matchesSearch;
    
    return false;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Wedding Venues</h1>
        <Link to="/mandaps/new">
          <Button icon={<Plus className="h-4 w-4" />}>
            Add New Mandap
          </Button>
        </Link>
      </div>
        
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select
              options={[
                { value: 'all', label: 'All Venues' },
                { value: 'high-capacity', label: 'High Capacity (400+)' },
                { value: 'medium-capacity', label: 'Medium Capacity (200-399)' },
                { value: 'low-capacity', label: 'Low Capacity (<200)' },
              ]}
              value={filter}
              onChange={setFilter}
              fullWidth
              icon={<Filter className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandaps.map(mandap => (
          <MandapCard key={mandap.id} mandap={mandap} onDelete={handleDelete} />
        ))}
      </div>

      {filteredMandaps.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
          <Link to="/mandaps/new" className="mt-4 inline-block">
            <Button icon={<Plus className="h-4 w-4" />}>
              Add Your First Mandap
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MandapsListPage;

            placeholder="Search venues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Venues</option>
            <option value="high-capacity">High Capacity (400+)</option>
            <option value="medium-capacity">Medium Capacity (200-399)</option>
            <option value="low-capacity">Low Capacity (&lt;200)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMandaps.map(mandap => (
          <MandapCard key={mandap.id} mandap={mandap} onDelete={handleDelete} />
        ))}
      </div>

      {filteredMandaps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MandapsListPage;