'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Box } from '@mui/material';

interface PreviewableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export function PreviewableImage({ src, alt, width = 800, height = 600, style }: PreviewableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={style}
        />
      </Box>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: src, alt: alt }]}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .8)' } }}
      />
    </>
  );
}
