import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogPostDetails,
  updateBlogPost,
  clearBlogErrors,
  clearBlogMessage,
} from "../../actions/blogActions";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const { post, loading, error } = useSelector((state) => state.blogPostDetails);
  const { success, error: updateError } = useSelector((state) => state.newBlogPost);

  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([""]);

  useEffect(() => {
    dispatch(getBlogPostDetails(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post && post._id === postId) {
      setTitle(post.title || "");
      setSections(post.sections || [""]);
    }
  }, [post, postId]);

  useEffect(() => {
    if (error || updateError) {
      toast.error(error || updateError);
      dispatch(clearBlogErrors());
    }

    if (success) {
      toast.success("Blog post updated successfully!");
      dispatch(clearBlogMessage());
      navigate("/admin/dashboard");
    }
  }, [error, updateError, success, dispatch, navigate]);

  const handleSectionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, ""]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const payload = { title, sections };
    dispatch(updateBlogPost(postId, payload));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit Blog Post</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {sections.map((section, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-600 font-medium mb-1">
              Section {index + 1}
            </label>
            <textarea
              value={section}
              required
              onChange={(e) => handleSectionChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              rows="4"
            />
            {sections.length > 1 && (
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="text-red-500 mt-1 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300 mb-4"
        >
          Add Section
        </button>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
