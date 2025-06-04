import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogPosts, clearBlogErrors } from "../../actions/blogActions";
import { Link } from "react-router-dom";
// import { useAlert } from 'react-alert';

// Assuming Sidebar is part of a parent Admin layout structure.

const BlogPostList = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { loading, error, posts } = useSelector((state) => state.blogPosts);

  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      console.error("Error fetching blog posts:", error);
      dispatch(clearBlogErrors());
    }
  }, [dispatch, error]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    // This div would typically be a child of a layout that includes the Sidebar
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Link
          to="/admin/blog/new"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create New Post
        </Link>
      </div>

      {loading && <p className="text-center text-gray-600">Loading posts...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">Error: {error}</p>}

      {!loading && !error && posts && posts.length === 0 && (
        <p className="text-center text-gray-600">No blog posts found. <Link to="/admin/blog/new" className="text-blue-500 hover:underline">Create one?</Link></p>
      )}

      {!loading && !error && posts && posts.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Author</th>
                <th className="py-3 px-6 text-center">Created At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className="font-medium">{post.title}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {post.author ? post.author.name : (post.authorName || "N/A")} {/* Backend might populate author or just send authorName */}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {/* Example: Link to view post (if public view exists) */}
                      {/* <Link to={`/blog/${post._id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link> */}
                      {/* Example: Edit link */}
                      {/* <Link to={`/admin/blog/edit/${post._id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </Link> */}
                      {/* Placeholder for future actions like delete */}
                       <span className="text-xs text-gray-400">No actions</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogPostList;
