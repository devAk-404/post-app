import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const PostCard = React.memo(
  ({ post, onEdit, onDelete, isDeleting, isAnyDeleting }) => {
    return (
      <div
        className={`bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg 
    transition-all duration-500 ease-in-out
    ${
      isDeleting
        ? "opacity-0 translate-x-5 pointer-events-none"
        : "opacity-100 translate-x-0"
    }
  `}
      >
        <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-700">{post.body}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => {
              onEdit(post);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={isAnyDeleting}
            className={`flex items-center gap-2 font-medium py-2 px-4 rounded-lg shadow transition duration-200 ${
              isAnyDeleting
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <PencilSquareIcon className="w-5 h-5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className={`flex items-center gap-2 font-medium py-2 px-4 rounded-lg shadow transition duration-200 ${
              isDeleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="w-5 h-5" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    );
  }
);

export default PostCard;
