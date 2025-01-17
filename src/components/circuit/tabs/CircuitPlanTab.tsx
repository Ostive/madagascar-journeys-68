import { motion } from "framer-motion";

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
      <div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-8">
          Itinéraire jour par jour
        </h2>
        <div className="space-y-8">
          {itinerary?.map((day, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="relative pl-8"
            >
              {/* Timeline line */}
              {index < itinerary.length - 1 && (
                <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 to-emerald-100/50"></div>
              )}
              
              {/* Day marker */}
              <div className="absolute left-0 top-1 transform -translate-x-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200/50"></div>
              </div>

              {/* Content */}
              <div className="space-y-2 pb-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-emerald-600">Jour {day.day}</span>
                  <span className="text-gray-300">•</span>
                  <h3 className="text-lg font-medium text-gray-900">{day.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircuitPlanTab;