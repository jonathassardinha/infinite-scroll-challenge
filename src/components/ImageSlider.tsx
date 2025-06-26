import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";

type ImageCarouselProps = {
  images: string[];
};

export const ImageSlider = ({ images }: ImageCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <div
      className="relative w-full max-w-[400px] h-[300px] sm:h-[350px] md:h-[400px] mx-auto"
      aria-roledescription="carousel"
      aria-label="Product image carousel"
    >
      {/* Slider wrapper */}
      <div
        ref={sliderRef}
        className="keen-slider w-full h-full overflow-hidden"
      >
        {images.map((src, index) => (
          <div
            className="keen-slider__slide w-full flex justify-center items-center"
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${images.length}`}
          >
            <div className="max-w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={`Product image ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots inside the slider area to select each image */}
      {images.length > 1 && (
        <div className="absolute bottom-1 flex justify-center gap-2 z-10 mb-2 w-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full ${
                currentSlide === idx ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
