import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Bell, Calendar, Info, Check } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Notification {
  id: string;
  created_at: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
}

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reservation":
        return Calendar;
      case "info":
        return Info;
      default:
        return Bell;
    }
  };

  if (loading) {
    return <div className="text-gray-600">Chargement des notifications...</div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune notification</h3>
        <p className="mt-2 text-gray-500">
          Vous n'avez pas encore reçu de notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h2>
        <p className="text-gray-500">Restez informé de vos activités</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.read
                  ? "bg-white border-gray-100"
                  : "bg-emerald-50 border-emerald-100"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    notification.read
                      ? "bg-gray-100 text-gray-500"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-medium ${
                        notification.read ? "text-gray-700" : "text-gray-900"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(notification.created_at), "d MMMM", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <p
                    className={`mt-1 text-sm ${
                      notification.read ? "text-gray-500" : "text-gray-700"
                    }`}
                  >
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                    title="Marquer comme lu"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
