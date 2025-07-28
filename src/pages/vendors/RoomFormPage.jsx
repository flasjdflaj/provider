import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { mandaps } from "../../utils/mock-data";
import { toast } from "sonner";

const RoomFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    mandapId: "",
    AcRoom: {
      noOfRooms: "",
      pricePerNight: "",
      amenities: [],
      roomImages: [],
    },
    NonAcRoom: {
      noOfRooms: "",
      pricePerNight: "",
      amenities: [],
      roomImages: [],
    },
    isActive: true,
  });

  const acAmenities = [
    "WiFi",
    "TV",
    "AirConditioning",
    "MiniBar",
    "RoomService",
    "Balcony",
    "Desk",
    "Safe",
  ];

  const nonAcAmenities = [
    "WiFi",
    "TV",
    "Fan",
    "RoomService",
    "Balcony",
    "Desk",
    "Safe",
  ];

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

  const handleAmenityToggle = (roomType, amenity) => {
    setFormData((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        amenities: prev[roomType].amenities.includes(amenity)
          ? prev[roomType].amenities.filter((item) => item !== amenity)
          : [...prev[roomType].amenities, amenity],
      },
    }));
  };

  const handleImageUpload = (roomType, files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        [roomType]: {
          ...prev[roomType],
          roomImages: [...prev[roomType].roomImages, ...newImages],
        },
      }));
    }
  };

  const removeImage = (roomType, imageIndex) => {
    setFormData((prev) => ({
      ...prev,
      [roomType]: {
        ...prev[roomType],
        roomImages: prev[roomType].roomImages.filter(
          (_, i) => i !== imageIndex
        ),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      isEditing ? "Room updated successfully!" : "Room added successfully!"
    );
    navigate("/vendors");
  };

  return (
    <div className=" mx-auto space-y-6 p-4 sm:p-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate("/vendors")}
        >
          Back
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 ml-4">
          {isEditing ? "Edit Room" : "Add New Room"}
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Select
                label="Select Mandap"
                options={[
                  { value: "", label: "Select mandap" },
                  ...mandaps.map((mandap) => ({
                    value: mandap.id,
                    label: mandap.mandapName || mandap.name,
                  })),
                ]}
                value={formData.mandapId}
                onChange={(value) => handleInputChange("mandapId", value)}
                required
                fullWidth
              />
            </div>

            {/* AC Room Section */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">AC Rooms</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Number of AC Rooms"
                  type="number"
                  value={formData.AcRoom.noOfRooms}
                  onChange={(e) =>
                    handleInputChange("AcRoom.noOfRooms", e.target.value)
                  }
                  min="0"
                  fullWidth
                />

                <Input
                  label="Price per Night (₹)"
                  type="number"
                  value={formData.AcRoom.pricePerNight}
                  onChange={(e) =>
                    handleInputChange("AcRoom.pricePerNight", e.target.value)
                  }
                  min="0"
                  fullWidth
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AC Room Amenities
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {acAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.AcRoom.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle("AcRoom", amenity)}
                        className="mr-2"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AC Room Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Upload AC room images
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="ac-room-images"
                    onChange={(e) =>
                      handleImageUpload("AcRoom", e.target.files)
                    }
                  />
                  <label
                    htmlFor="ac-room-images"
                    className="mt-2 inline-block cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
                  >
                    Choose Images
                  </label>
                </div>

                {formData.AcRoom.roomImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.AcRoom.roomImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`AC Room ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("AcRoom", index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Non-AC Room Section */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Non-AC Rooms</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Number of Non-AC Rooms"
                  type="number"
                  value={formData.NonAcRoom.noOfRooms}
                  onChange={(e) =>
                    handleInputChange("NonAcRoom.noOfRooms", e.target.value)
                  }
                  min="0"
                  fullWidth
                />

                <Input
                  label="Price per Night (₹)"
                  type="number"
                  value={formData.NonAcRoom.pricePerNight}
                  onChange={(e) =>
                    handleInputChange("NonAcRoom.pricePerNight", e.target.value)
                  }
                  min="0"
                  fullWidth
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Non-AC Room Amenities
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {nonAcAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.NonAcRoom.amenities.includes(amenity)}
                        onChange={() =>
                          handleAmenityToggle("NonAcRoom", amenity)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Non-AC Room Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Upload Non-AC room images
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="non-ac-room-images"
                    onChange={(e) =>
                      handleImageUpload("NonAcRoom", e.target.files)
                    }
                  />
                  <label
                    htmlFor="non-ac-room-images"
                    className="mt-2 inline-block cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
                  >
                    Choose Images
                  </label>
                </div>

                {formData.NonAcRoom.roomImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.NonAcRoom.roomImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Non-AC Room ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage("NonAcRoom", index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/vendors")}
                fullWidth={window.innerWidth < 640}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                icon={<Save className="h-4 w-4" />}
                fullWidth={window.innerWidth < 640}
              >
                {isEditing ? "Update Room" : "Add Room"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomFormPage;
