import React from "react";

function SkeletonComment(props) {
  const { number = 3 } = props;
  return (
    <>
      {[...Array(number).keys()].map((item) => (
        <div key={item} className="flex space-x-4">
          <div className="animate-pulse bg-gray-200 w-10 h-10 rounded-full overflow-hidden"></div>
          <div className="flex-grow">
            <div className="flex flex-col space-y-2">
              <div className="animate-pulse bg-gray-200 rounded-lg h-7 w-[250px]"></div>
              <div className="animate-pulse bg-gray-200 rounded-lg h-5 w-full"></div>
              <div className="animate-pulse bg-gray-200 rounded-lg h-3 w-[100px]"></div>
              {/* <span className="text-base">{comment?.comment}</span>
              <div className="flex space-x-6 my-1 text-gray-400 text-sm font-light">
                <span>
                  {formatDistanceToNow(
                    new Date(comment?.updated_at || comment?.created_at),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
                <button className="font-light">Reply</button>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonComment;
