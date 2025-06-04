import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts, clearBlogErrors } from '../../actions/blogActions';
import BlogPostCard from './BlogPostCard';
// import { useAlert } from 'react-alert'; // Or any other notification system

const BlogPage = () => {
  const dispatch = useDispatch();
  // const alert = useAlert(); // Example for notifications

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center my-8 text-gray-900"> {/* Updated title and classes */}
        BLOGS
      </h1>

      {loading && (
        <div className="text-center">
          {/* You can use a spinner component here */}
          <p className="text-lg text-gray-600">Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"> {/* Updated grid classes */}
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-gray-500 text-lg">
            No blog posts available at the moment. Please check back soon!
          </p>
        )
      )}
    </div>
  );
};

export default BlogPage;
