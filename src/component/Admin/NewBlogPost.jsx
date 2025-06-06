import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogPost, clearBlogErrors, clearBlogMessage } from "../../actions/blogActions";

const NewBlogPost = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newBlogPost);

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([]); // dynamic content+image structure

  useEffect(() => {
    if (error) {
      console.error("Blog Creation Error:", error);
      dispatch(clearBlogErrors());
    }
    if (success) {
      console.log("Blog post created successfully!");
      dispatch(clearBlogMessage());
      setTitle("");
      setBlocks([]);
    }
  }, [dispatch, error, success]);

  const addBlock = (type) => {
    setBlocks([...blocks, { type, value: "" }]);
  };

  const handleBlockChange = (index, newValue) => {
    const newBlocks = [...blocks];
    newBlocks[index].value = newValue;
    setBlocks(newBlocks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      console.error("Title is required.");
      return;
    }

    const postData = {
      title,
      sections: blocks,
    };

    dispatch(createBlogPost(postData));
  };

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Section Blocks */}
        {blocks.map((block, index) => (
          <div key={index} className="mb-6">
            {block.type === "content" ? (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">Content #{index + 1}</label>
                <textarea
                  rows="6"
                  value={block.value}
                  onChange={(e) => handleBlockChange(index, e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="Enter paragraph text here"
                  required
                ></textarea>
              </>
            ) : (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">Image URL #{index + 1}</label>
                <input
                  type="url"
                  value={block.value}
                  onChange={(e) => handleBlockChange(index, e.target.value)}
                  className="border p-2 w-full rounded"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {block.value && (
                  <img
                    src={block.value}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 max-h-96 w-full object-contain rounded shadow"
                  />
                )}
              </>
            )}
          </div>
        ))}

        {/* Buttons to Add More Blocks */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => addBlock("content")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add Content
          </button>
          <button
            type="button"
            onClick={() => addBlock("image")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            + Add Image
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-900 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Blog Post"}
        </button>

        {/* Error display */}
        {error && <p className="text-red-500 text-xs italic mt-4">Error: {error}</p>}
      </form>
    </div>
  );
};

export default NewBlogPost;
