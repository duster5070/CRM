import React from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  count: number;
};

const StarRating: React.FC<StarRatingProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <FaStar className="h-5 w-5 text-orange-400" key={index} />
      ))}
    </div>
  );
};

export default StarRating;
