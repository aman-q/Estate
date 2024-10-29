import { useState } from "react";
interface SliderProps {
  images?: string[]; // Made optional
  initialIndex?: number; // Made optional
}

const Slider: React.FC<SliderProps> = ({ images = [], initialIndex = 0 }) => {
  const [imageIndex, setImageIndex] = useState<number>(initialIndex);

  const changeSlide = (direction: "left" | "right") => {
    if (images.length === 0) return; // Prevent errors if images are empty.

    if (direction === "left") {
      setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="relative">
      {images.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button
            onClick={() => changeSlide("left")}
            className="absolute left-0 p-2 text-white"
          >
            <img src="/arrow.png" alt="Left Arrow" className="w-8" />
          </button>
          <img
            src={images[imageIndex]}
            alt={`Image ${imageIndex + 1}`}
            className="h-auto max-w-full max-h-screen"
          />
          <button
            onClick={() => changeSlide("right")}
            className="absolute right-0 p-2 text-white"
          >
            <img src="/arrow.png" alt="Right Arrow" className="w-8 rotate-180" />
          </button>
          <button
            onClick={() => setImageIndex(-1)} // Avoid `null` usage here.
            className="absolute top-0 right-0 p-4 text-white text-2xl"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
