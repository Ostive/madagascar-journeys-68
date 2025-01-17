import { Clock, Users, Gauge } from "lucide-react";
import { motion } from "framer-motion";

interface InformationTabProps {
  circuit: any;
}

const InformationTab = ({ circuit }: InformationTabProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
        Informations essentielles
      </h2>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Durée</p>
              <p className="text-lg font-semibold text-gray-900">{circuit.duration_days} jours</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Taille du groupe</p>
              <p className="text-lg font-semibold text-gray-900">{circuit.persons}</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Difficulté</p>
              <p className="text-lg font-semibold text-gray-900">{circuit.difficulty}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100/20 shadow-lg shadow-emerald-100/10"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
        <p className="text-gray-600 leading-relaxed">{circuit.long_description || circuit.description}</p>
      </motion.div>
    </div>
  );
};

export default InformationTab;