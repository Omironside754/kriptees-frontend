import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogPost, clearBlogErrors, clearBlogMessage } from "../../actions/blogActions";
// import { useAlert } from 'react-alert'; // Or any other notification system

// Assuming Sidebar is part of a parent Admin layout structure.
// If not, it might need to be explicitly included here or in App.js routing.

const NewBlogPost = ({ history }) => { // history might be passed if using older react-router for navigation
  const dispatch = useDispatch();
  // const alert = useAlert(); // Example: using react-alert

  const { loading, error, success } = useSelector((state) => state.newBlogPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (error) {
      // alert.error(error);
      console.error("Blog Creation Error:", error);
      dispatch(clearBlogErrors());
    }
    if (success) {
      // alert.success("Blog post created successfully!");
      console.log("Blog post created successfully!");
      dispatch(clearBlogMessage());
      setTitle("");
      setContent("");
      setImageUrl("");
      // Optionally navigate to the blog post list
      // if (history) history.push('/admin/blog/posts');
    }
  }, [dispatch, error, success, /* history */]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      // alert.error("Title and Content are required.");
      console.error("Title and Content are required.");
      return;
    }
    const postData = {
      title,
      content,
      imageUrl,
      // Author will be derived by the backend from the token
    };
    dispatch(createBlogPost(postData));
  };

  return (
    // This div would typically be a child of a layout that includes the Sidebar
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
        {/* Simple text error/success display, replace with toasts as needed */}
        {error && <p className="text-red-500 text-xs italic mt-4">Error: {error}</p>}
        {/* Success message is handled by console log and clearing form, can add visible text if needed */}
      </form>
    </div>
  );
};

export default NewBlogPost;
