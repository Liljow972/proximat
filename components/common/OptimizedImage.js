import React, { useState, memo } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useIntersectionObserver } from '../../hooks/usePerformance';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  sx = {},
  ...props 
}) => {
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box 
      ref={imageRef}
      sx={{ 
        width, 
        height, 
        position: 'relative',
        overflow: 'hidden',
        ...sx 
      }}
      {...props}
    >
      {!isLoaded && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%"
          animation="wave"
        />
      )}
      
      {isIntersecting && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: isLoaded ? 'static' : 'absolute',
            top: 0,
            left: 0,
          }}
          loading="lazy"
        />
      )}
      
      {hasError && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            color: 'grey.500',
            fontSize: '0.875rem'
          }}
        >
          Image non disponible
        </Box>
      )}
    </Box>
  );
});

export default OptimizedImage;