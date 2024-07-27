import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';

const CarouselComponent = () => {
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/JULY_BAU/Tall_Hero_3000X1200_AISW._CB569215871_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/Manish/BAU/prime/primepc/Sony_Homepage_DesktopHeroTemplate_3000x1200._CB569336872_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/pcacc/jup3/Best-selling-PC-accessories_MED_PC_Hero3000-x-1200._CB569329943_.jpg'
  ];

  return (
    <Box>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showIndicators = {false}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide ${index}`} style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}/>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselComponent;
