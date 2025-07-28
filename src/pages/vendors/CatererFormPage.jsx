import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X, Upload } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import { mandaps } from "../../utils/mock-data";
import { toast } from "sonner";

const CatererFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    mandapId: [],
    catererName: "",
    menuCategories: [
      {
        category: "",
        menuItems: [],
        pricePerPlate: "",
        categoryImage: "",
      },
    ],
    foodType: [],
    isCustomizable: false,
    customizableItems: [],
    hasTastingSession: false,
    isActive: true,
  });

  const [newMenuItem, setNewMenuItem] = useState({
    itemName: "",
    itemPrice: "",
  });
  const [newCustomItem, setNewCustomItem] = useState({
    itemName: "",
    itemPrice: "",
  });

  const foodTypes = ["Veg", "Non-Veg", "Jain", "Other"];
  const categoryOptions = ["Basic", "Standard", "Premium", "Luxury"];

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

  const addMenuCategory = () => {
    setFormData((prev) => ({
      ...prev,
      menuCategories: [
        ...prev.menuCategories,
        {
          category: "",
          menuItems: [],
          pricePerPlate: "",
          categoryImage: "",
        },
      ],
    }));
  };

  const removeMenuCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      menuCategories: prev.menuCategories.filter((_, i) => i !== index),
    }));
  };

  const updateMenuCategory = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      menuCategories: prev.menuCategories.map((cat, i) =>
        i === index ? { ...cat, [field]: value } : cat
      ),
    }));
  };

  const addMenuItem = (categoryIndex) => {
    if (newMenuItem.itemName && newMenuItem.itemPrice) {
      const updatedCategories = [...formData.menuCategories];
      updatedCategories[categoryIndex].menuItems.push({
        itemName: newMenuItem.itemName,
        itemPrice: parseFloat(newMenuItem.itemPrice),
      });
      setFormData((prev) => ({ ...prev, menuCategories: updatedCategories }));
      setNewMenuItem({ itemName: "", itemPrice: "" });
    }
  };

  const removeMenuItem = (categoryIndex, itemIndex) => {
    const updatedCategories = [...formData.menuCategories];
    updatedCategories[categoryIndex].menuItems.splice(itemIndex, 1);
    setFormData((prev) => ({ ...prev, menuCategories: updatedCategories }));
  };

  const addCustomizableItem = () => {
    if (newCustomItem.itemName && newCustomItem.itemPrice) {
      setFormData((prev) => ({
        ...prev,
        customizableItems: [
          ...prev.customizableItems,
          {
            itemName: newCustomItem.itemName,
            itemPrice: parseFloat(newCustomItem.itemPrice),
          },
        ],
      }));
      setNewCustomItem({ itemName: "", itemPrice: "" });
    }
  };

  const removeCustomizableItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      customizableItems: prev.customizableItems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      isEditing
        ? "Caterer updated successfully!"
        : "Caterer added successfully!"
    );
    navigate("/vendors");
  };

  return (
    <div className="mx-auto space-y-6 p-4 sm:p-6">
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
          {isEditing ? "Edit Caterer" : "Add New Caterer"}
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                label="Caterer Name"
                value={formData.catererName}
                onChange={(e) =>
                  handleInputChange("catererName", e.target.value)
                }
                placeholder="Enter caterer name"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {foodTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.foodType.includes(type)}
                      onChange={() => handleArrayToggle("foodType", type)}
                      className="mr-2"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Menu Categories</h3>
                <Button
                  type="button"
                  onClick={addMenuCategory}
                  icon={<Plus className="h-4 w-4" />}
                  size="sm"
                >
                  Add Menu Category
                </Button>
              </div>

              {formData.menuCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-yellow-50 p-4 rounded-lg mb-4 border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      Category #{categoryIndex + 1}
                    </h4>
                    {formData.menuCategories.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeMenuCategory(categoryIndex)}
                        variant="danger"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <Select
                      label="Menu Category"
                      options={[
                        { value: "", label: "Select category" },
                        ...categoryOptions.map((cat) => ({
                          value: cat,
                          label: cat,
                        })),
                      ]}
                      value={category.category}
                      onChange={(value) =>
                        updateMenuCategory(categoryIndex, "category", value)
                      }
                      fullWidth
                    />

                    <Input
                      label="Category Price (₹ per plate)"
                      type="number"
                      value={category.pricePerPlate}
                      onChange={(e) =>
                        updateMenuCategory(
                          categoryIndex,
                          "pricePerPlate",
                          e.target.value
                        )
                      }
                      placeholder="₹ 0"
                      fullWidth
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Menu Items
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <Input
                        placeholder="Enter menu item"
                        value={newMenuItem.itemName}
                        onChange={(e) =>
                          setNewMenuItem((prev) => ({
                            ...prev,
                            itemName: e.target.value,
                          }))
                        }
                        fullWidth
                      />
                      <Input
                        placeholder="Price"
                        type="number"
                        value={newMenuItem.itemPrice}
                        onChange={(e) =>
                          setNewMenuItem((prev) => ({
                            ...prev,
                            itemPrice: e.target.value,
                          }))
                        }
                        className="w-full sm:w-32"
                      />
                      <Button
                        type="button"
                        onClick={() => addMenuItem(categoryIndex)}
                        icon={<Plus className="h-4 w-4" />}
                        size="sm"
                      >
                        Add Item
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {category.menuItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between bg-white p-2 rounded border"
                        >
                          <span className="text-sm">
                            {item.itemName} - ₹{item.itemPrice}
                          </span>
                          <Button
                            type="button"
                            onClick={() =>
                              removeMenuItem(categoryIndex, itemIndex)
                            }
                            variant="ghost"
                            size="sm"
                            icon={<X className="h-4 w-4" />}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Upload category image
                      </p>
                      <input type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isCustomizable}
                    onChange={(e) =>
                      handleInputChange("isCustomizable", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span>Customization Allowed</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasTastingSession}
                    onChange={(e) =>
                      handleInputChange("hasTastingSession", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span>Tasting Session Available</span>
                </label>
              </div>
            </div>

            {formData.isCustomizable && (
              <div>
                <h4 className="font-medium mb-2">Customizable Items</h4>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <Input
                    placeholder="Enter customizable item"
                    value={newCustomItem.itemName}
                    onChange={(e) =>
                      setNewCustomItem((prev) => ({
                        ...prev,
                        itemName: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={newCustomItem.itemPrice}
                    onChange={(e) =>
                      setNewCustomItem((prev) => ({
                        ...prev,
                        itemPrice: e.target.value,
                      }))
                    }
                    className="w-full sm:w-32"
                  />
                  <Button
                    type="button"
                    onClick={addCustomizableItem}
                    icon={<Plus className="h-4 w-4" />}
                    size="sm"
                  >
                    Add Item
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.customizableItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded"
                    >
                      <span className="text-sm">
                        {item.itemName} - ₹{item.itemPrice}
                      </span>
                      <Button
                        type="button"
                        onClick={() => removeCustomizableItem(index)}
                        variant="ghost"
                        size="sm"
                        icon={<X className="h-4 w-4" />}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                {isEditing ? "Update Caterer" : "Add Caterer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CatererFormPage;
