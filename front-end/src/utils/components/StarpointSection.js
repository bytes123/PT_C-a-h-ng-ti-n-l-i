import React from "react";

export default function StarpointSection({ starpoint, className }) {
  return (
    <div className={`${className} item_starpoint-wrapper w-100`}>
      <div className="item_star-rate">
        <div
          className="item_star-rating"
          style={{ width: `${starpoint * 0.2 * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
