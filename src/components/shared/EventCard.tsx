import { Card, CardContent } from '@/components/ui/card';
import { Event, ColorScheme } from '@/types/content';
import { Calendar, Clock } from 'lucide-react';

interface EventCardProps {
  event: Event;
  colorScheme?: ColorScheme;
}

export function EventCard({ event, colorScheme }: EventCardProps) {
  // Card styling based on section background
  // Dark section = dark cards with light text
  // Light/Terracotta section = light cards with dark text

  const isDarkSection = colorScheme === 'dark';
  const isLightCard = !isDarkSection;

  const cardBg = isDarkSection
    ? 'bg-navy/70'
    : 'bg-cream/95';

  const borderColor = isDarkSection
    ? 'border-cream/20'
    : 'border-terracotta/20';

  // Text colors - opposite of card background for contrast
  const headingColor = isLightCard ? 'text-navy' : 'text-cream';
  const textColor = isLightCard ? 'text-navy/80' : 'text-cream/90';
  const accentColor = isLightCard ? 'text-terracotta' : 'text-terracotta';

  // Badge styling
  const badgeClasses = isDarkSection
    ? 'bg-cream/20 text-cream'
    : 'bg-navy/10 text-navy';

  return (
    <Card className={`${borderColor} ${cardBg} hover:shadow-md transition-shadow h-full flex flex-col`}>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Calendar className={`w-5 h-5 ${accentColor} flex-shrink-0 mt-1`} />
          <div className="flex-1">
            <h3 className={`font-serif text-heading-sm ${headingColor} mb-1`}>
              {event.title}
            </h3>
            <p className={`text-body-sm ${accentColor} font-medium`}>
              {event.date}
            </p>
          </div>
        </div>

        {event.time && (
          <div className={`flex items-center gap-2 mb-3 text-body-sm ${textColor}`}>
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
        )}

        <p className={`text-body-md ${textColor} leading-relaxed`}>
          {event.description}
        </p>

        {event.recurring && (
          <span className={`inline-block mt-3 px-3 py-1 ${badgeClasses} text-body-sm rounded-full`}>
            Recurring
          </span>
        )}
      </CardContent>
    </Card>
  );
}
