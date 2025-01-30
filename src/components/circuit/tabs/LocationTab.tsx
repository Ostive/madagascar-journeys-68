import CircuitMap from "@/components/maps/CircuitMap";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface LocationTabProps {
  circuit: any;
}

const LocationTab = ({ circuit }: LocationTabProps) => {
  // Get unique cities from the circuit's itinerary
  const cities = circuit?.itinerary?.map((day: any) => ({
    name: day.title,
    coordinates: day.coordinates || [47.5162, -18.8792],
    day: day.day
  })) || [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
        Villes visitées
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Map with connected cities */}
        <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <div className="p-4 border-b border-emerald-100/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Circuit</p>
                <p className="text-base font-medium text-gray-900">{circuit.name}</p>
              </div>
            </div>
          </div>
          <CircuitMap 
            cities={cities}
            className="w-full h-[600px]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LocationTab;