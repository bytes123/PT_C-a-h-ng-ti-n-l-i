import React, { useEffect } from "react";

export default function useSectionObserver(imageRef, contentRef) {
  useEffect(() => {
    // Create the IntersectionObserver
    let observer = new IntersectionObserver((entries) => {
      // Check if the image intersects with the viewport
      if (entries[0].isIntersecting) {
        // If it does, load the image and show it
        let img = imageRef.current;
        let content = contentRef.current;
        img.classList.add("active");
        content.classList.add("active");
      }
    });

    // Start observing the image
    observer.observe(imageRef.current);

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return 1;
}
