import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostDetails, clearBlogErrors } from '../../actions/blogActions';
// import { useAlert } from 'react-alert'; // Or any other notification system

const BlogPostDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  // const alert = useAlert(); // Example for notifications

  const { loading, error, post } = useSelector((state) => state.blogPostDetails);

  useEffect(() => {
    if (postId) {
      dispatch(getBlogPostDetails(postId));
    }
    // Cleanup function to clear errors when component unmounts or postId changes
    return () => {
      dispatch(clearBlogErrors());
    };
  }, [dispatch, postId]);

  useEffect(() => {
    if (error) {
      // alert.error(error);
      console.error(`Error fetching blog post (ID: ${postId}):`, error);
      // Consider redirecting to a 404 page or BlogPage if post not found
    }
  }, [dispatch, error, postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading post details...</p>
        {/* You could use a spinner component here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <Link to="/blog" className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  if (!post || Object.keys(post).length === 0) {
    return (
      !loading && ( // Ensure not to show this if still loading
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-500">Blog post not found.</p>
          <Link to="/blog" className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            &larr; Back to Blog
          </Link>
        </div>
      )
    );
  }

  const { title, content, imageUrl, author, createdAt, authorName } = post;
  const postDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Date not available";
  const displayAuthor = author ? author.name : (authorName || "Anonymous");


  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl"> {/* Existing container */}
      <article className="bg-white shadow-xl rounded-lg p-6 md:p-10"> {/* Added padding here, removed overflow-hidden initially */}

        <h1 className="text-4xl font-bold my-6 text-center text-gray-900 leading-tight">
          {title || 'Untitled Post'}
        </h1>

        <div className="text-center text-sm text-gray-500 mb-6">
          <p className="mb-1">
            By: <span className="font-semibold text-gray-700">{displayAuthor}</span>
          </p>
          <p>
            Published: <span className="font-semibold text-gray-700">{postDate}</span>
          </p>
        </div>

        {imageUrl && (
          <div className="my-4 rounded-lg shadow-md overflow-hidden"> {/* Added overflow-hidden for rounded corners on image */}
            <img
              src={imageUrl}
              alt={title || 'Blog Post Image'}
              className="w-full max-w-3xl mx-auto " // Removed max-h, rely on natural aspect ratio up to max-w-3xl
            />
          </div>
        )}

        {/* Using prose for Tailwind Typography styling if available, otherwise basic text styling */}
        <div className="prose lg:prose-xl mx-auto my-4 text-gray-800 leading-relaxed whitespace-pre-wrap">
          {content || 'No content available.'}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
            &larr; Back to All Posts
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
