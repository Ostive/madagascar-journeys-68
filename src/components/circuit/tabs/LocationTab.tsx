import CircuitMap from "@/components/maps/CircuitMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationTabProps {
  circuit: any;
}

const LocationTab = ({ circuit }: LocationTabProps) => {
  // This is a placeholder. In a real application, you would get the actual coordinates
  const locations = [
    {
      name: "Starting Point",
      coordinates: [47.5162, -18.8792],
      day: 1
    },
    // Add more locations based on the itinerary
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Circuit Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <p className="text-sm text-gray-600">{circuit.tour_location}</p>
          </div>
          <CircuitMap locations={locations} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationTab;