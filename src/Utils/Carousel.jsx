import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const CarouselComponent = () => {
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG23/TVs/Manish/BAU/prime/primepc/Sony_Homepage_DesktopHeroTemplate_3000x1200._CB569336872_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/pcacc/jup3/Best-selling-PC-accessories_MED_PC_Hero3000-x-1200._CB569329943_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img24/Sports/July/Olympics/GW/Hero/Rec/Combinedbank/5298-Sports----Olympic-gateway-graphics-3000x1200-REC-B1._CB567383842_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/AUGART24/3000X1200_Watch2R_Prime._CB567641511_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/headphones/Aug_24/Boult_Z40_Tallhero_3000x1200._CB567805368_.jpg',
  ];
  const theme = useTheme();
  const isSmallLaptop = useMediaQuery(theme.breakpoints.between(640,710))
  const isTab = useMediaQuery(theme.breakpoints.between(565, 640))
  const isSmallTab = useMediaQuery(theme.breakpoints.between(500, 565))
  const isBigMobile = useMediaQuery(theme.breakpoints.between(355, 500))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down(355))

  return (
    <Box sx={{ height: '100vh' }}>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showIndicators={false}>
        {images.map((image, index) => (
          <Box key={index} sx={{ height: isSmallLaptop? '90vh' : isTab ? '80vh' : isSmallTab ? '70vh' : isBigMobile ? '50vh' : isSmallMobile? '40vh':  '100vh' }}>
            <img
              src={image}
              alt={`slide ${index}`}
              style={{
                height: '100%',
                objectFit: 'cover',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselComponent;
