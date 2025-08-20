import React, { useState } from 'react';
import { CardMedia, Box } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';

const ProductImage = ({ src, alt, height = 240, className, sx = {} }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <Box
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          ...sx
        }}
        className={className}
      >
        <ImageIcon sx={{ fontSize: '3rem', opacity: 0.5 }} />
      </Box>
    );
  }

  return (
    <CardMedia
      component="img"
      height={height}
      image={src}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      sx={{
        objectFit: 'cover',
        opacity: imageLoading ? 0.7 : 1,
        transition: 'opacity 0.3s ease',
        ...sx
      }}
    />
  );
};

export default ProductImage;