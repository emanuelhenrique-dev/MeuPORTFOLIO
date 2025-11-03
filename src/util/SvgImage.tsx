import { useEffect, useRef } from 'react';
import SVGInject from '@iconfu/svg-inject';

type SVGImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function SVGImage(props: SVGImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      SVGInject(imgRef.current);
    }
  }, []);

  return <img ref={imgRef} {...props} />;
}
