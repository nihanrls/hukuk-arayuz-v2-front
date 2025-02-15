interface TagFilterProps {
    tags: string[];
    selectedTags: string[];
    onTagSelect: (tag: string) => void;
  }
  
  const TagFilter = ({ tags, selectedTags, onTagSelect }: TagFilterProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold text-[#111C31] mb-4 font-ubuntu">
          Kategoriler
        </h3>
        <div className="space-y-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 font-nunito
                ${selectedTags.includes(tag) 
                  ? 'bg-[#6454a4] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TagFilter;