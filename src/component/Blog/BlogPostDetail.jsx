import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostDetails, clearBlogErrors } from '../../actions/blogActions';
import ReactMarkdown from 'react-markdown';

const BlogPostDetail = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const { loading, error, post } = useSelector((state) => state.blogPostDetails);

  useEffect(() => {
    if (postId) dispatch(getBlogPostDetails(postId));
    return () => dispatch(clearBlogErrors());
  }, [dispatch, postId]);

  useEffect(() => {
    if (error) console.error(`Error fetching blog post (ID: ${postId}):`, error);
  }, [dispatch, error, postId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading post details...</p>
      </div>
    );
  }

  if (error || !post || Object.keys(post).length === 0) {
    return (
      <div className="w-full px-4 py-12 text-center">
        <p className="text-xl text-gray-500">{error || 'Blog post not found.'}</p>
        <Link to="/blog" className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const { title, sections = [], createdAt, author, authorName } = post;
  const postDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'Date not available';
  const displayAuthor = author?.name || authorName || 'Anonymous';

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 mt-24">
        <h1 className="text-4xl font-extrabold leading-snug mb-4 text-gray-900">
          {title || 'Untitled Post'}
        </h1>
        <div className="text-sm text-gray-500 mb-10">
          <p className="mb-1">
            By: <span className="font-semibold text-gray-700">{displayAuthor}</span>
          </p>
          <p>
            Published: <span className="font-semibold text-gray-700">{postDate}</span>
          </p>
        </div>
      </div>

      {sections.map((section, index) => {
        if (section.type === 'image') {
          return (
            <div key={index} className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
              <img src={section.value} alt={`Blog Image ${index}`} className="w-full h-auto object-cover" />
            </div>
          );
        } else if (section.type === 'content') {
          return (
            <div key={index} className="max-w-6xl mx-auto px-4 sm:px-6 my-10 text-gray-800 leading-relaxed">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-semibold my-3" {...props} />,
                  p: ({ node, ...props }) => <p className="my-2 leading-relaxed text-gray-800" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-4 my-1" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                }}
              >
                {section.value}
              </ReactMarkdown>

            </div>
          );
        } else {
          return null;
        }
      })}

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-gray-200 text-center">
        <Link
          to="/blog"
          className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
        >
          &larr; Back to All Posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetail;
