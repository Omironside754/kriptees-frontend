import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogPosts, clearBlogErrors } from "../../actions/blogActions";
import { Link } from "react-router-dom";
import { deleteBlogPost } from "../../actions/blogActions";


const BlogPostList = () => {
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => state.blogPosts);

  useEffect(() => {
    dispatch(getAllBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      
      console.error("Error fetching blog posts:", error);
      dispatch(clearBlogErrors());
    }
  }, [dispatch, error]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      dispatch(deleteBlogPost(id));
    }
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

                      <>
                        <Link
                          to={`/admin/blog/edit/${post._id}`}
                          className="w-5 h-5 mr-3 transform hover:text-blue-500 hover:scale-110"
                          title="Edit Blog"
                        >
                          ✏️
                        </Link>

                        <button
                          onClick={() => handleDelete(post._id)}
                          className="w-5 h-5 transform hover:text-red-500 hover:scale-110"
                          title="Delete Blog"
                        >
                          🗑️
                        </button>
                      </>

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
