import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/course/${course._id}`}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 text-left">
        <h3 className="text-lg font-semibold text-gray-900">{course.courseTitle}</h3>
        <p className="text-sm text-gray-500 mb-2">{course.educator.name}</p>

        <div className="flex items-center space-x-2 mb-2">
          <p className="text-sm font-medium text-yellow-600">{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt={i < Math.floor(calculateRating(course)) ? 'Star filled' : 'Star empty'}
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">({course.courseRatings.length})</p>
        </div>

        <p className="text-base font-bold text-gray-800">
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
