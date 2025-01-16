import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-bold text-red-600">500</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Server Error
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Something went wrong on our end. Please try again later.
          </p>
          <div className="mt-8">
            <Button
              onClick={() => navigate(-1)}
              className="mr-4"
              variant="outline"
            >
              Go Back
            </Button>
            <Button onClick={() => navigate("/")}>
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
