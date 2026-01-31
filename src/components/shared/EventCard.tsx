import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types/content';
import { Calendar, Clock } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="border-terracotta/20 bg-cream hover:shadow-md transition-shadow h-full flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <Calendar className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-serif text-heading-sm text-navy mb-1">
              {event.title}
            </h3>
            <p className="text-body-sm text-terracotta font-medium">
              {event.date}
            </p>
          </div>
        </div>

        {event.time && (
          <div className="flex items-center gap-2 mb-3 text-body-sm text-navy/70">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
        )}

        <p className="text-body-md text-navy/80 leading-relaxed">
          {event.description}
        </p>

        {event.recurring && (
          <span className="inline-block mt-3 px-3 py-1 bg-terracotta/10 text-terracotta text-body-sm rounded-full">
            Recurring
          </span>
        )}
      </CardContent>
    </Card>
  );
}
