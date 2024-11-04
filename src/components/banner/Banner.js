import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './banner.css';

const Banner = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const totalImages = 5; // Update this to the number of images you have

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Generate a random number between 1 and the total number of images
    const randomNumber = Math.floor(Math.random() * totalImages) + 1;

    // Dynamically import the image based on the random number
    import(`../../image/banners/${randomNumber}.png`)
      .then((image) => setBannerImage(image.default))
      .catch((err) => console.error("Error loading banner image:", err));
  }, []);

  if (!bannerImage) return null; // Return null until the image is loaded

  return (
    <div className='bannerContainer'>
      <div className='banner'>
        <img data-aos="fade-left" src={bannerImage} alt='Image Generator' className='banner' />
      </div>
    </div>
  );
};

export default Banner;