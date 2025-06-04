import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  if (!post) {
    return null;
  }

  const { _id, title, content, imageUrl, author, createdAt, authorName } = post;

  const snippet = content ? (content.length > 100 ? content.substring(0, 100) + "..." : content) : ""; // Shorter snippet for card

  return (
    <Link to={`/blog/post/${_id}`} className="block group">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col"> {/* Ensure card takes full height if in a grid row */}
        {imageUrl && (
          <div className="w-full h-48 overflow-hidden"> {/* Standardized image height */}
            <img
              src={imageUrl}
              alt={title || 'Blog Post Image'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow to push Read More down */}
          <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
            {title || 'Untitled Post'}
          </h3>
          {snippet && (
            <p className="text-gray-600 text-sm mb-3 flex-grow"> {/* Added flex-grow to description */}
              {snippet}
            </p>
          )}
          {/* Author and Date can be added here if desired, or kept minimal as per example */}
          {/*
          <p className="text-gray-500 text-xs mb-1">
            By: {author ? author.name : (authorName || "Anonymous")}
          </p>
          <p className="text-gray-500 text-xs">
            {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
          </p>
          */}
          <div className="mt-auto pt-2"> {/* mt-auto to push to bottom */}
            <span className="text-indigo-500 group-hover:text-indigo-700 font-semibold text-sm">Read More &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
