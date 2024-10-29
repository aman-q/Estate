import { useState } from "react";

interface SliderProps {
  images: string[];
  initialIndex: number;
}

const Slider: React.FC<SliderProps> = ({ images, initialIndex }) => {
  const [imageIndex, setImageIndex] = useState<number>(initialIndex);

  const changeSlide = (direction: "left" | "right") => {
    if (direction === "left") {
      setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    } else {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <div className="relative">
      {imageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button
            onClick={() => changeSlide("left")}
            className="absolute left-0 p-2 text-white"
          >
            <img src="/arrow.png" alt="Left Arrow" className="w-8" />
          </button>
          <img
            src={images[imageIndex]}
            alt=""
            className="h-auto max-w-full max-h-screen"
          />
          <button
            onClick={() => changeSlide("right")}
            className="absolute right-0 p-2 text-white"
          >
            <img src="/arrow.png" alt="Right Arrow" className="w-8 rotate-180" />
          </button>
          <button
            onClick={() => setImageIndex(null!)}
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
