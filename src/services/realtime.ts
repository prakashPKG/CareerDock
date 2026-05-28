import { Notification } from "@/models/Notification";

type NotifyPayload = {
  userId: string;
  type: string;
  title: string;
  body?: string;
  href?: string;
};

export async function notifyUser(payload: NotifyPayload) {
  const notification = await Notification.create(payload);
  console.info("[realtime:notification]", payload.userId, payload.type);
  return notification;
}
