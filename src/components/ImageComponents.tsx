import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const GloAlchemistLogo = ({ className = "", width = 200, height = 80 }: LogoProps) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="/alch-logo.png"
        alt="Glo Alchemist Logo"
        width={width}
        height={height}
        className="object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
        priority
      />
    </div>
  );
};

interface HeroImageProps {
  className?: string;
}

export const HeroImage = ({ className = "" }: HeroImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/hero-img.png"
        alt="Beautiful skin care treatment"
        fill
        className="object-cover rounded-3xl hover:scale-105 transition-transform duration-500 shadow-2xl"
        priority
      />
      {/* Subtle overlay for better visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/5 to-transparent rounded-3xl"></div>
      
      {/* Optional decorative border */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200/20"></div>
    </div>
  );
};