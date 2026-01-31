import { Card, CardContent } from '@/components/ui/card';
import { WineItem } from '@/types/content';

interface WineCardProps {
  wine: WineItem;
}

export function WineCard({ wine }: WineCardProps) {
  return (
    <Card className="border-navy/10 bg-cream hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-heading-sm text-navy">{wine.name}</h3>
          <span className="font-sans text-body-md text-terracotta font-semibold ml-4">
            {wine.price}
          </span>
        </div>

        {(wine.producer || wine.region) && (
          <p className="text-body-sm text-navy/70 mb-2">
            {wine.producer && <span className="font-medium">{wine.producer}</span>}
            {wine.producer && wine.region && ' • '}
            {wine.region && <span>{wine.region}</span>}
          </p>
        )}

        {wine.description && (
          <p className="text-body-sm text-navy/80 leading-relaxed">
            {wine.description}
          </p>
        )}

        {(wine.glassPrice || wine.bottlePrice) && (
          <div className="flex gap-4 mt-3 text-body-sm text-navy/70">
            {wine.glassPrice && <span>Glass: {wine.glassPrice}</span>}
            {wine.bottlePrice && <span>Bottle: {wine.bottlePrice}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
