import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Calendar, Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Select from '../ui/Select';

const statesAndCities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Delhi': ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi']
};

const venueTypes = [
  'Banquet Hall', 'Community Hall', 'Lawn', 'Resort', 'Farmhouse', 
  'Hotel', 'Rooftop', 'Convention Centre'
];

const amenitiesOptions = [
  'WiFi', 'Parking', 'Air Conditioning', 'Catering Service', 'Decoration Service',
  'Sound System', 'Lighting System', 'Projector', 'Stage', 'Dance Floor',
  'Generator', 'Security Service', 'Elevator'
];

const foodTypes = ['Veg', 'Non-Veg', 'Jain', 'Other'];

const MandapFormModal = ({ mandap, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    mandapName: '',
    description: '',
    availableDates: [],
    venueType: [],
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    guestCapacity: '',
    venuePricing: '',
    securityDeposit: '',
    venueImages: [],
    amenities: [],
    foodType: [],
    penaltyChargesPerHour: '',
    cancellationPolicy: '',
    isExternalCateringAllowed: false,
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mandap) {
      setFormData({
        mandapName: mandap.mandapName || mandap.name || '',
        description: mandap.description || '',
        availableDates: mandap.availableDates || [],
        venueType: mandap.venueType || [],
        address: mandap.address || { street: '', city: '', state: '', pincode: '' },
        guestCapacity: mandap.guestCapacity?.toString() || mandap.capacity?.toString() || '',
        venuePricing: mandap.venuePricing?.toString() || mandap.price?.toString() || '',
        securityDeposit: mandap.securityDeposit?.toString() || '',
        venueImages: mandap.venueImages || mandap.images || [],
        amenities: mandap.amenities || [],
        foodType: mandap.foodType || [],
        penaltyChargesPerHour: mandap.penaltyChargesPerHour?.toString() || '',
        cancellationPolicy: mandap.cancellationPolicy || '',
        isExternalCateringAllowed: mandap.isExternalCateringAllowed || false,
      });
    }
  }, [mandap]);

  useEffect(() => {
    if (formData.address.state) {
      setAvailableCities(statesAndCities[formData.address.state] || []);
    } else {
      setAvailableCities([]);
    }
  }, [formData.address.state]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleDateAdd = (date) => {
    if (date && !formData.availableDates.includes(date)) {
      setFormData(prev => ({
        ...prev,
        availableDates: [...prev.availableDates, date],
      }));
    }
  };

  const handleDateRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, i) => i !== index),
    }));
  };

  const handleImageAdd = (files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        venueImages: [...prev.venueImages, ...newImages],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      venueImages: prev.venueImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {mandap ? 'Edit Mandap' : 'Add New Mandap'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onCancel} icon={<X className="h-4 w-4" />} />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Mandap Name"
                value={formData.mandapName}
                onChange={(e) => handleInputChange('mandapName', e.target.value)}
                placeholder="Enter mandap name"
                required
                fullWidth
              />
              <Input
                label="Guest Capacity"
                type="number"
                value={formData.guestCapacity}
                onChange={(e) => handleInputChange('guestCapacity', e.target.value)}
                placeholder="Enter capacity"
                required
                fullWidth
              />
            </div>

            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter mandap description"
              required
              fullWidth
              rows={3}
            />
          </div>

          {/* Available Dates */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Dates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="flex-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => {
                  if (e.target.value) {
                    handleDateAdd(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.availableDates.map((date, index) => (
                <div key={index} className="inline-flex items-center bg-primary-100 rounded-full px-3 py-1 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                  <button
                    type="button"
                    onClick={() => handleDateRemove(index)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {venueTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.venueType.includes(type)}
                    onChange={() => handleArrayToggle('venueType', type)}
                    className="mr-2"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Select
                label="State"
                options={[
                  { value: '', label: 'Select state' },
                  ...Object.keys(statesAndCities).map(state => ({ value: state, label: state }))
                ]}
                value={formData.address.state}
                onChange={(value) => {
                  handleInputChange('address.state', value);
                  handleInputChange('address.city', '');
                }}
                fullWidth
              />
              <Select
                label="City"
                options={[
                  { value: '', label: 'Select city' },
                  ...availableCities.map(city => ({ value: city, label: city }))
                ]}
                value={formData.address.city}
                onChange={(value) => handleInputChange('address.city', value)}
                fullWidth
                disabled={!formData.address.state}
              />
              <Input
                label="Pin Code"
                value={formData.address.pincode}
                onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                placeholder="Enter pin code"
                fullWidth
              />
            </div>

            <Textarea
              label="Full Address"
              value={formData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              placeholder="Enter complete venue address"
              required
              fullWidth
              rows={3}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Venue Pricing (₹)"
              type="number"
              value={formData.venuePricing}
              onChange={(e) => handleInputChange('venuePricing', e.target.value)}
              placeholder="₹ 0"
              required
              fullWidth
            />
            <Input
              label="Security Deposit (₹)"
              type="number"
              value={formData.securityDeposit}
              onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
              placeholder="₹ 0"
              required
              fullWidth
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Upload venue images (Multiple selection allowed)</p>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                id="venue-images"
                onChange={(e) => handleImageAdd(e.target.files)}
              />
              <label htmlFor="venue-images" className="mt-2 inline-block cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
                Choose Images
              </label>
            </div>
            {formData.venueImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {formData.venueImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Venue ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleArrayToggle('amenities', amenity)}
                    className="mr-2"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Food Type
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {foodTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.foodType.includes(type)}
                    onChange={() => handleArrayToggle('foodType', type)}
                    className="mr-2"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Penalty Charges per Hour (₹)"
              type="number"
              value={formData.penaltyChargesPerHour}
              onChange={(e) => handleInputChange('penaltyChargesPerHour', e.target.value)}
              placeholder="₹"
              fullWidth
            />
            <Select
              label="Cancellation Policy"
              options={[
                { value: '', label: 'Select cancellation policy' },
                { value: 'No Refund', label: 'No Refund' },
                { value: 'Partial Refund', label: 'Partial Refund' },
                { value: 'Full Refund', label: 'Full Refund' },
              ]}
              value={formData.cancellationPolicy}
              onChange={(value) => handleInputChange('cancellationPolicy', value)}
              fullWidth
            />
          </div>

          <div>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={formData.isExternalCateringAllowed}
                onChange={(e) => handleInputChange('isExternalCateringAllowed', e.target.checked)}
                className="mr-2" 
              />
              <span>External Catering Allowed</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              icon={<Save className="h-4 w-4" />}
            >
              {mandap ? 'Update Mandap' : 'Add Mandap'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MandapFormModal;