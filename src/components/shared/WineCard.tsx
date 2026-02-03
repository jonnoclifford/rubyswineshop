import { WineItem, ColorScheme } from '@/types/content';

interface WineCardProps {
  wine: WineItem;
  colorScheme?: ColorScheme;
}

export function WineCard({ wine, colorScheme }: WineCardProps) {
  // Proper contrast: dark backgrounds get light text, light backgrounds get dark text
  const isDarkBg = colorScheme === 'dark';

  const borderColor = isDarkBg
    ? 'border-cream/10'
    : 'border-navy/5';

  const headingColor = isDarkBg ? 'text-cream' : 'text-navy';
  const textColor = isDarkBg ? 'text-cream/90' : 'text-navy/80';

  return (
    <div className={`py-3 border-b ${borderColor} last:border-0`}>
      <div className="flex justify-between items-baseline gap-4 mb-1">
        <h3 className={`font-serif text-body-lg ${headingColor}`}>{wine.name}</h3>
        <div className={`flex-shrink-0 font-medium text-body-md ${headingColor}`}>
          {wine.price}
        </div>
      </div>

      <p className={`text-body-sm ${textColor} leading-relaxed`}>
        {wine.producer && <span className="font-medium">{wine.producer}</span>}
        {wine.producer && wine.region && ' · '}
        {wine.region && <span>{wine.region}</span>}
        {(wine.producer || wine.region) && wine.description && ' · '}
        {wine.description && <span className="italic">{wine.description}</span>}
      </p>

      {(wine.glassPrice || wine.bottlePrice) && (
        <div className={`flex gap-4 mt-1 text-body-sm ${textColor}`}>
          {wine.glassPrice && <span>Glass: {wine.glassPrice}</span>}
          {wine.bottlePrice && <span>Bottle: {wine.bottlePrice}</span>}
        </div>
      )}
    </div>
  );
}
