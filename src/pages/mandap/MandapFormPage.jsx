import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  ArrowLeft,
  Save,
  Plus,
  X,
  Upload,
  Check,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { mandaps } from "../../utils/mock-data";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Basic Info", completed: false },
  { id: 2, name: "Venue Details", completed: false },
  { id: 3, name: "Facilities & Payments", completed: false },
];

const venueTypes = [
  "Banquet Hall",
  "Community Hall",
  "Lawn",
  "Resort",
  "Farmhouse",
  "Hotel",
  "Rooftop",
  "Convention Centre",
];

const amenitiesOptions = [
  "WiFi",
  "Parking",
  "Air Conditioning",
  "Catering Service",
  "Decoration Service",
  "Sound System",
  "Lighting System",
  "Projector",
  "Stage",
  "Dance Floor",
  "Generator",
  "Security Service",
  "Elevator",
];

const outdoorFacilitiesOptions = [
  "Garden",
  "Pool",
  "Beach Access",
  "Smoking Zones",
  "Outdoor Lighting",
  "Parking Area",
  "Kids Play Area",
  "Outdoor Bar",
  "Barbeque Area",
  "Terrace",
];

const paymentOptions = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
];

const statesAndCities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Delhi: [
    "New Delhi",
    "Central Delhi",
    "South Delhi",
    "North Delhi",
    "East Delhi",
  ],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
};

export default function MandapFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    mandapName: "",
    availableDates: [],
    venueType: [],
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    penaltyChargesPerHour: "",
    cancellationPolicy: "",
    venueImages: [],
    guestCapacity: "",
    venuePricing: "",
    securityDeposit: "",
    securityDepositType: "",
    amenities: [],
    outdoorFacilities: [],
    advancePayment: "",
    paymentMethods: [],
    bookingConfirmationTimeline: "",
    guestEntryPolicy: "",
    isExternalCateringAllowed: false,
  });

  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (isEditing) {
      const mandap = mandaps.find((m) => m.id === id);
      if (mandap) {
        setFormData({
          ownerName: "Raj Patel",
          mandapName: mandap.mandapName || mandap.name,
          availableDates: mandap.availableDates || [],
          venueType: mandap.venueType || [],
          address: mandap.address || {
            street: "",
            city: "",
            state: "",
            pincode: "",
          },
          penaltyChargesPerHour: mandap.penaltyChargesPerHour?.toString() || "",
          cancellationPolicy: mandap.cancellationPolicy || "",
          venueImages: mandap.venueImages || mandap.images || [],
          guestCapacity:
            mandap.guestCapacity?.toString() ||
            mandap.capacity?.toString() ||
            "",
          venuePricing:
            mandap.venuePricing?.toString() || mandap.price?.toString() || "",
          securityDeposit: mandap.securityDeposit?.toString() || "",
          securityDepositType: mandap.securityDepositType || "",
          amenities: mandap.amenities || [],
          outdoorFacilities: mandap.outdoorFacilities || [],
          advancePayment: "",
          paymentMethods: mandap.paymentOptions || [],
          bookingConfirmationTimeline: "",
          guestEntryPolicy: "",
          isExternalCateringAllowed: mandap.isExternalCateringAllowed || false,
        });
      }
    }
  }, [id, isEditing]);

  useEffect(() => {
    if (formData.address.state) {
      setAvailableCities(statesAndCities[formData.address.state] || []);
    } else {
      setAvailableCities([]);
    }
  }, [formData.address.state]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleDateAdd = (date) => {
    if (date && !formData.availableDates.includes(date)) {
      setFormData((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, date],
      }));
    }
  };

  const handleDateRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter((_, i) => i !== index),
    }));
  };

  const handleImageAdd = (files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        venueImages: [...prev.venueImages, ...newImages],
      }));
    }
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      venueImages: prev.venueImages.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(
        isEditing
          ? "Mandap updated successfully!"
          : "Mandap registered successfully!"
      );
      navigate("/mandaps");
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center min-w-0">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep === step.id
                ? "bg-orange-500 border-orange-500 text-white"
                : currentStep > step.id
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
          </div>
          <span
            className={`ml-2 text-sm font-medium whitespace-nowrap ${
              currentStep >= step.id ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                currentStep > step.id ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <Input
          label="Mandap Name"
          value={formData.mandapName}
          onChange={(e) => handleInputChange("mandapName", e.target.value)}
          placeholder="Enter mandap name"
          required
          fullWidth
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Dates <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="flex-1 block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => {
              if (e.target.value) {
                handleDateAdd(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.availableDates.map((date, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-primary-100 rounded-full px-3 py-1 text-sm"
            >
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
                onChange={() => handleArrayToggle("venueType", type)}
                className="mr-2"
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Select
          label="State"
          options={[
            { value: "", label: "Select state" },
            ...Object.keys(statesAndCities).map((state) => ({
              value: state,
              label: state,
            })),
          ]}
          value={formData.address.state}
          onChange={(value) => {
            handleInputChange("address.state", value);
            handleInputChange("address.city", "");
          }}
          fullWidth
        />
        <Select
          label="City"
          options={[
            { value: "", label: "Select city" },
            ...availableCities.map((city) => ({ value: city, label: city })),
          ]}
          value={formData.address.city}
          onChange={(value) => handleInputChange("address.city", value)}
          fullWidth
          disabled={!formData.address.state}
        />
        <Input
          label="Pin Code"
          value={formData.address.pincode}
          onChange={(e) => handleInputChange("address.pincode", e.target.value)}
          placeholder="Enter pin code"
          fullWidth
        />
      </div>

      <Textarea
        label="Full Address"
        value={formData.address.street}
        onChange={(e) => handleInputChange("address.street", e.target.value)}
        placeholder="Enter complete venue address"
        required
        fullWidth
        rows={3}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Penalty Charges per Hour (₹)"
          type="number"
          value={formData.penaltyChargesPerHour}
          onChange={(e) =>
            handleInputChange("penaltyChargesPerHour", e.target.value)
          }
          placeholder="₹"
          required
          fullWidth
        />
        <Select
          label="Cancellation Policy"
          options={[
            { value: "", label: "Select cancellation policy" },
            { value: "No Refund", label: "No Refund" },
            { value: "Partial Refund", label: "Partial Refund" },
            { value: "Full Refund", label: "Full Refund" },
          ]}
          value={formData.cancellationPolicy}
          onChange={(value) => handleInputChange("cancellationPolicy", value)}
          required
          fullWidth
        />
      </div>
    </div>
  );

  const renderVenueDetails = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Venue Images
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Upload venue images (Multiple selection allowed)
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="venue-images"
            onChange={(e) => handleImageAdd(e.target.files)}
          />
          <label
            htmlFor="venue-images"
            className="mt-2 inline-block cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
          >
            Choose Images
          </label>
        </div>
        {formData.venueImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {formData.venueImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Venue ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Guest Capacity (max)"
          type="number"
          value={formData.guestCapacity}
          onChange={(e) => handleInputChange("guestCapacity", e.target.value)}
          required
          fullWidth
        />
        <Input
          label="Venue Pricing (₹)"
          type="number"
          value={formData.venuePricing}
          onChange={(e) => handleInputChange("venuePricing", e.target.value)}
          placeholder="₹ 0"
          required
          fullWidth
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Security Deposit (₹)"
          type="number"
          value={formData.securityDeposit}
          onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
          placeholder="₹ 0"
          required
          fullWidth
        />
        <Select
          label="Security Deposit Type"
          options={[
            { value: "", label: "Select deposit type" },
            { value: "Refundable", label: "Refundable" },
            { value: "Non-Refundable", label: "Non-Refundable" },
          ]}
          value={formData.securityDepositType}
          onChange={(value) => handleInputChange("securityDepositType", value)}
          required
          fullWidth
        />
      </div>
    </div>
  );

  const renderFacilitiesAndPayments = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Indoor Amenities
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleArrayToggle("amenities", amenity)}
                className="mr-2"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Outdoor Facilities
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {outdoorFacilitiesOptions.map((facility) => (
            <label key={facility} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.outdoorFacilities.includes(facility)}
                onChange={() =>
                  handleArrayToggle("outdoorFacilities", facility)
                }
                className="mr-2"
              />
              <span className="text-sm">{facility}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1  gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                label="Advance Payment Required (%)"
                type="number"
                value={formData.advancePayment}
                onChange={(e) =>
                  handleInputChange("advancePayment", e.target.value)
                }
                required
                fullWidth={false}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Methods Accepted{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {paymentOptions.map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.includes(method)}
                        onChange={() =>
                          handleArrayToggle("paymentMethods", method)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderVenueDetails();
      case 3:
        return renderFacilitiesAndPayments();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate("/mandaps")}
        >
          Back
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 ml-4">
          {isEditing ? "Edit Mandap" : "Add New Mandap"}
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          {renderStepIndicator()}

          <div className="min-h-[500px]">{renderCurrentStep()}</div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="h-4 w-4" />}
              fullWidth={window.innerWidth < 640}
            >
              Previous
            </Button>

            {currentStep === 3 ? (
              <Button
                onClick={handleSubmit}
                loading={loading}
                icon={<Save className="h-4 w-4" />}
                className="bg-orange-500 hover:bg-orange-600"
                fullWidth={window.innerWidth < 640}
              >
                Submit Registration
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600"
                fullWidth={window.innerWidth < 640}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
