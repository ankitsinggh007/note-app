import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ImageGallery = ({ images, onDelete, onUpload = () => {} }) => {
  const [newImage, setNewImage] = useState(null);

  // Function to handle image upload (fallback if not passed)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // Create object URL for image preview
      setNewImage(newImageUrl); // Optionally save image preview state
    //   onUpload(newImageUrl); // Call the passed function to handle the image upload
    }
  };

  return (
    <div className="w-full h-56 overflow-y-scroll z-10 border border-gray-300 rounded-md p-4 flex flex-wrap gap-4">
     

      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-24 h-24 border border-gray-300 rounded-md flex flex-col items-center justify-center"
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute top-1 right-1">
            <button
              className="text-gray-500 bg-white p-1 rounded-full hover:bg-red-100"
              onClick={() => onDelete(index)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Image Placeholder */}
      <div className="relative w-24 h-24 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
        <span className="text-xl">+</span>
        <div className="text-xs">Add Image</div>
        {/* File input for adding image */}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
