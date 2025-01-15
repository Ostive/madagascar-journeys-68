import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CircuitPlanTabProps {
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}

const CircuitPlanTab = ({ itinerary }: CircuitPlanTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Day by Day Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {itinerary?.map((day, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l border-gray-200 last:pb-0">
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Day {day.day}: {day.title}</h3>
                  <p className="text-sm text-gray-600">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitPlanTab;