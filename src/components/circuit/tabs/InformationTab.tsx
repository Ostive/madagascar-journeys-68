import { Clock, Users, Gauge, Calendar, MapPin, Package, PackageX, Shirt, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Circuit } from "@/types";

interface InformationTabProps {
  circuit: Circuit;
}

const InformationTab = ({ circuit }: InformationTabProps) => {
  // Combine predefined and custom highlights
  const allHighlights = [
    ...(circuit.highlights || []),
    ...(circuit.custom_highlights || [])
  ];

  return (
    <div className="space-y-8">
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
        className="prose max-w-none"
      >
        <h3 className="text-xl font-semibold text-gray-900">Description</h3>
        <p className="text-gray-600">{circuit.long_description}</p>
      </motion.div>

      {/* Points forts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900">Points forts</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allHighlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              {highlight}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Inclus / Non inclus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-900">Inclus</h3>
          </div>
          <ul className="space-y-2">
            {circuit.included?.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PackageX className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Non inclus</h3>
          </div>
          <ul className="space-y-2">
            {circuit.not_included?.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Conseils vestimentaires */}
      {circuit.clothing_advisor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Shirt className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-900">Conseils vestimentaires</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Indispensables</h4>
              <ul className="space-y-2">
                {circuit.clothing_advisor.essential_items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Recommandés</h4>
              <ul className="space-y-2">
                {circuit.clothing_advisor.recommended_items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Informations pratiques */}
      {circuit.practical_info && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-900">Informations pratiques</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Santé et sécurité</h4>
                <ul className="space-y-2">
                  {circuit.practical_info.health_safety.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Meilleure période</h4>
                <ul className="space-y-2">
                  {circuit.practical_info.best_time_to_visit.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Hébergement</h4>
                <ul className="space-y-2">
                  {circuit.practical_info.accommodation.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Transport</h4>
                <ul className="space-y-2">
                  {circuit.practical_info.transportation.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InformationTab;