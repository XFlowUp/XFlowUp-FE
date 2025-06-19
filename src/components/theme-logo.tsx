'use client';
import React, { useEffect, useState, memo, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface ThemeLogo {
  darkLogo: string;
  lightLogo: string;
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const ThemeLogo = memo(
  ({
    darkLogo,
    lightLogo,
    name,
    width = 64,
    height = 64,
    className = 'object-contain',
  }: ThemeLogo) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const logoSrc = useMemo(() => {
      return mounted && resolvedTheme === 'dark' ? darkLogo : lightLogo;
    }, [mounted, resolvedTheme, darkLogo, lightLogo]);

    return (
      <Image
        src={logoSrc}
        alt={`${name} logo`}
        width={width}
        height={height}
        className={className}
      />
    );
  }
);

ThemeLogo.displayName = 'ThemeLogo';

export default ThemeLogo;
