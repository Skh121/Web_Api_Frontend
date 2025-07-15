import React from "react";
const TagSelector = ({ tags, selectedTags, onTagClick }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-2">
      Trade Setup Tags
    </label>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagClick(tag)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            selectedTags.includes(tag)
              ? "bg-blue-600 text-white"
              : "bg-[#2a2a2a] text-gray-300 hover:bg-gray-600"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);
export default TagSelector;
