import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReservationAvatarProps {
  step: number;
  message: string;
}

const ReservationAvatar = ({ step, message }: ReservationAvatarProps) => {
  return (
    <div className="flex items-start gap-4 mb-6 bg-white/50 p-4 rounded-lg backdrop-blur-sm">
      <Avatar className="w-12 h-12">
        <AvatarImage src="/lovable-uploads/avatar.png" alt="Avatar" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold mb-1">Étape {step}</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ReservationAvatar;