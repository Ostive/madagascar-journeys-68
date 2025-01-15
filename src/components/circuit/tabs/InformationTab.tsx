import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Gauge } from "lucide-react";

interface InformationTabProps {
  circuit: any;
}

const InformationTab = ({ circuit }: InformationTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Essential Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-gray-500">{circuit.duration_days} days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Group Size</p>
                <p className="text-sm text-gray-500">{circuit.persons}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Difficulty</p>
                <p className="text-sm text-gray-500">{circuit.difficulty}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-gray-600">{circuit.long_description || circuit.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InformationTab;