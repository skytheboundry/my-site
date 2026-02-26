"use client";

import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export default function Banner({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}: BannerProps) {
  return (
    <div className="relative w-full h-[420px] md:h-[800] overflow-hidden">

      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Banner"
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content Bottom Left */}
      <div className="absolute bottom-10 left-6 md:left-30 z-10 max-w-6xl text-white">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            {subtitle}
          </p>
        )}

        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}