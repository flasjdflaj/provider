import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X, Upload } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { mandaps } from "../../utils/mock-data";
import { toast } from "sonner";

const PhotographerFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    mandapId: [],
    photographerName: "",
    photographyTypes: [
      {
        phtype: "",
        pricePerEvent: "",
        sampleWork: [],
      },
    ],
    isActive: true,
  });

  const photographyTypeOptions = [
    "Candid",
    "Traditional",
    "Pre-wedding",
    "Post-wedding",
    "Drone Photography",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const addPhotographyType = () => {
    setFormData((prev) => ({
      ...prev,
      photographyTypes: [
        ...prev.photographyTypes,
        {
          phtype: "",
          pricePerEvent: "",
          sampleWork: [],
        },
      ],
    }));
  };

  const removePhotographyType = (index) => {
    setFormData((prev) => ({
      ...prev,
      photographyTypes: prev.photographyTypes.filter((_, i) => i !== index),
    }));
  };

  const updatePhotographyType = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      photographyTypes: prev.photographyTypes.map((type, i) =>
        i === index ? { ...type, [field]: value } : type
      ),
    }));
  };

  const handleSampleWorkUpload = (typeIndex, files) => {
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const updatedTypes = [...formData.photographyTypes];
      updatedTypes[typeIndex].sampleWork = [
        ...updatedTypes[typeIndex].sampleWork,
        ...newImages,
      ];
      setFormData((prev) => ({ ...prev, photographyTypes: updatedTypes }));
    }
  };

  const removeSampleWork = (typeIndex, imageIndex) => {
    const updatedTypes = [...formData.photographyTypes];
    updatedTypes[typeIndex].sampleWork.splice(imageIndex, 1);
    setFormData((prev) => ({ ...prev, photographyTypes: updatedTypes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      isEditing
        ? "Photographer updated successfully!"
        : "Photographer added successfully!"
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
          {isEditing ? "Edit Photographer" : "Add New Photographer"}
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Photographer Name"
                value={formData.photographerName}
                onChange={(e) =>
                  handleInputChange("photographerName", e.target.value)
                }
                placeholder="Enter photographer name"
                required
                fullWidth
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Mandaps <span className="text-red-500">*</span>
                </label>
                <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {mandaps.map((mandap) => (
                    <label key={mandap.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={formData.mandapId.includes(mandap.id)}
                        onChange={() =>
                          handleArrayToggle("mandapId", mandap.id)
                        }
                        className="mr-2"
                      />
                      <span className="text-sm">
                        {mandap.mandapName || mandap.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Photography Types</h3>
                <Button
                  type="button"
                  onClick={addPhotographyType}
                  icon={<Plus className="h-4 w-4" />}
                  size="sm"
                >
                  Add Photography Type
                </Button>
              </div>

              {formData.photographyTypes.map((type, typeIndex) => (
                <div
                  key={typeIndex}
                  className="bg-blue-50 p-4 rounded-lg mb-4 border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      Photography Type #{typeIndex + 1}
                    </h4>
                    {formData.photographyTypes.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removePhotographyType(typeIndex)}
                        variant="danger"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <Select
                      label="Photography Type"
                      options={[
                        { value: "", label: "Select type" },
                        ...photographyTypeOptions.map((option) => ({
                          value: option,
                          label: option,
                        })),
                      ]}
                      value={type.phtype}
                      onChange={(value) =>
                        updatePhotographyType(typeIndex, "phtype", value)
                      }
                      fullWidth
                    />

                    <Input
                      label="Price for this type (₹)"
                      type="number"
                      value={type.pricePerEvent}
                      onChange={(e) =>
                        updatePhotographyType(
                          typeIndex,
                          "pricePerEvent",
                          e.target.value
                        )
                      }
                      placeholder="₹ 0"
                      fullWidth
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sample Work
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Upload sample work (Multiple images allowed)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id={`sample-work-${typeIndex}`}
                        onChange={(e) =>
                          handleSampleWorkUpload(typeIndex, e.target.files)
                        }
                      />
                      <label
                        htmlFor={`sample-work-${typeIndex}`}
                        className="mt-2 inline-block cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
                      >
                        Choose Images
                      </label>
                    </div>

                    {type.sampleWork.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {type.sampleWork.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <img
                              src={image}
                              alt={`Sample work ${imageIndex + 1}`}
                              className="w-full h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeSampleWork(typeIndex, imageIndex)
                              }
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
              ))}
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
                {isEditing ? "Update Photographer" : "Add Photographer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotographerFormPage;
