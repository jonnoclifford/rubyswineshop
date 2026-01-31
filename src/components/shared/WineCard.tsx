import { WineItem } from '@/types/content';

interface WineCardProps {
  wine: WineItem;
}

export function WineCard({ wine }: WineCardProps) {
  return (
    <div className="py-3 border-b border-navy/5 last:border-0">
      <div className="flex justify-between items-baseline gap-4 mb-1">
        <h3 className="font-serif text-body-lg text-navy">{wine.name}</h3>
        <div className="flex-shrink-0 font-medium text-body-md text-navy">
          {wine.price}
        </div>
      </div>

      <p className="text-body-sm text-navy/60 leading-relaxed">
        {wine.producer && <span className="font-medium">{wine.producer}</span>}
        {wine.producer && wine.region && ' · '}
        {wine.region && <span>{wine.region}</span>}
        {(wine.producer || wine.region) && wine.description && ' · '}
        {wine.description && <span className="italic">{wine.description}</span>}
      </p>

      {(wine.glassPrice || wine.bottlePrice) && (
        <div className="flex gap-4 mt-1 text-body-sm text-navy/60">
          {wine.glassPrice && <span>Glass: {wine.glassPrice}</span>}
          {wine.bottlePrice && <span>Bottle: {wine.bottlePrice}</span>}
        </div>
      )}
    </div>
  );
}
