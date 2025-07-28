import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Image as ImageIcon, Search, ArrowLeft } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { format } from "date-fns";

export default function ReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Mock data for reviews
  const reviews = [
    {
      id: "1",
      mandapId: "1",
      userId: "u1",
      userName: "Priya Sharma",
      rating: 5,
      comment:
        "Beautiful venue with excellent amenities. The staff was very helpful and professional.",
      createdAt: "2024-02-15T10:30:00Z",
    },
    {
      id: "2",
      mandapId: "1",
      userId: "u2",
      userName: "Rahul Verma",
      rating: 4,
      comment:
        "Great location and beautiful decor. Slightly expensive but worth it.",
      createdAt: "2024-02-10T15:20:00Z",
    },
    {
      id: "3",
      mandapId: "2",
      userId: "u3",
      userName: "Anjali Patel",
      rating: 5,
      comment: "Perfect venue for our wedding. The banquet hall is stunning!",
      createdAt: "2024-02-05T09:15:00Z",
    },
  ];

  // Mock mandaps data
  const mandaps = [
    {
      id: "1",
      mandapName: "Laxmi Garden",
      name: "Laxmi Garden",
    },
    {
      id: "2",
      mandapName: "Royal Banquet",
      name: "Royal Banquet",
    },
  ];

  // Filter reviews based on mandap ID if provided
  let filteredReviews = reviews.filter((review) => {
    if (id && review.mandapId !== id) return false;

    // Find the mandap for the current review
    const reviewMandap = mandaps.find((m) => m.id === review.mandapId);

    const matchesSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reviewMandap &&
        (reviewMandap.mandapName || reviewMandap.name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesRating =
      ratingFilter === "all" || review.rating.toString() === ratingFilter;

    return matchesSearch && matchesRating;
  });

  const mandap = id ? mandaps.find((m) => m.id === id) : null;
  const averageRating =
    filteredReviews.length > 0
      ? filteredReviews.reduce((acc, curr) => acc + curr.rating, 0) /
        filteredReviews.length
      : 0;

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    filteredReviews.forEach((review) => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {id && (
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="h-4 w-4" />}
              onClick={() => navigate("/mandaps")}
              className="mr-4"
            >
              Back to Mandaps
            </Button>
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {mandap
              ? `Reviews for ${mandap.mandapName || mandap.name}`
              : "All Reviews"}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-500">
            ({filteredReviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search reviews by customer name, comment, or mandap name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              fullWidth
            />
          </div>

          <div className="w-full md:w-48">
            <Select
              options={[
                { value: "all", label: "All Ratings" },
                { value: "5", label: "5 Stars" },
                { value: "4", label: "4 Stars" },
                { value: "3", label: "3 Stars" },
                { value: "2", label: "2 Stars" },
                { value: "1", label: "1 Star" },
              ]}
              value={ratingFilter}
              onChange={setRatingFilter}
              fullWidth
            />
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="text-sm font-medium w-8">{rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current mx-2" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${
                        filteredReviews.length > 0
                          ? (ratingDistribution[rating] /
                              filteredReviews.length) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 ml-2 w-8">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No reviews found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || ratingFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : mandap
                ? "No reviews yet for this mandap."
                : "No reviews available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => {
            const reviewMandap = mandaps.find((m) => m.id === review.mandapId);
            return (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {review.userName}
                        </h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {!mandap && reviewMandap && (
                        <p className="text-sm text-primary-600 mb-2">
                          Review for:{" "}
                          {reviewMandap.mandapName || reviewMandap.name}
                        </p>
                      )}

                      <p className="text-sm text-gray-500 mb-3">
                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                      </p>

                      <p className="text-gray-700">{review.comment}</p>

                      {review.images && review.images.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <ImageIcon className="h-4 w-4 mr-1" />
                            <span>Photos from the review</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {review.images.map((image, index) => (
                              <div
                                key={index}
                                className="relative aspect-square rounded-lg overflow-hidden"
                              >
                                <img
                                  src={image}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
