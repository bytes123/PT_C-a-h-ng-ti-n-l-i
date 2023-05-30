import React from "react";
import StarpointSection from "../Utils/StarpointSection";
import ShowMore from "react-show-more-list";
import Time from "../../utils/components/Time";

export default function ReviewSection({ className, rateList }) {
  return (
    <div className={`${className} product_review-wrapper`}>
      <h3 className="text-3xl font-bold font-mono mb-10">
        Lời nhận xét & số sao
      </h3>
      <ShowMore items={rateList} by={5}>
        {({ current, onMore }) => (
          <>
            <ul className="product_review-list">
              {current.map((item, index) => (
                <li className="product_review-item border rounded-2xl p-10 mb-5 font-quicksand">
                  <div className="flex" key={item.id}>
                    <div className="profile-infor mb-5 text-center">
                      <img
                        src={`http://localhost:8000/resources/avatar/${
                          item?.avatar ?? "default.jpg"
                        }`}
                        alt=""
                        className="avatar rounded-full w-[80px] h-[80px] object-cover"
                      />
                      <p className="text-active font-bold mt-5 ">
                        {item.author}
                      </p>
                    </div>
                    <div className="rate-main ml-10">
                      <p className="rate-date opacity-60 mb-2">
                        <Time timestamp={item.createdAt} />
                      </p>
                      <div className="flex mb-2">
                        <StarpointSection starpoint={item.starpoint} />
                      </div>
                      <p className="rate-content font-semibold opacity-70 text-2xl leading-9">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {current.length < rateList.length ? (
              <button
                className="background-active mt-5 text-white font-semibold font-quicksand text-2xl p-4 rounded-2xl"
                onClick={() => {
                  if (!!onMore) onMore();
                }}
              >
                Xem thêm
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </ShowMore>
    </div>
  );
}
