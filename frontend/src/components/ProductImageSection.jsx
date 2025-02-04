import { useState } from "react";

const ProductImageSection = ({ image }) => {
  const [zoomProps, setZoomProps] = useState({ scale: 1, x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomProps({ scale: 1.5, x, y });
  };

  const handleMouseLeave = () => {
    setZoomProps({ scale: 1, x: 0, y: 0 });
  };

  return (
    <>
      <div className="flex w-1/2 h-1/2 justify-center max-md:w-[80%] max-md:mb-5 max-sm:mb-0 max-sm:mt-10 max-sm:w-full">
        <div className="image-div w-[60%] h-full flex justify-center bg-blue-500 overflow-hidden max-sm:w-[80%]">
          <img
            className="w-full object-cover transition-transform duration-300 cursor-pointer"
            src={image}
            alt="T-Shirt"
            style={{
              transform: `scale(${zoomProps.scale})`,
              transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </>
  );
};

export default ProductImageSection;
