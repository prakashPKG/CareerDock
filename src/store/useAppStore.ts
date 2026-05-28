import { create } from "zustand";

type Theme = "dark" | "light";

type AppState = {
  theme: Theme;
  selectedRoadmap: string;
  notifications: number;
  setTheme: (theme: Theme) => void;
  setSelectedRoadmap: (roadmap: string) => void;
  setNotifications: (count: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  selectedRoadmap: "JavaScript",
  notifications: 0,
  setTheme: (theme) => set({ theme }),
  setSelectedRoadmap: (selectedRoadmap) => set({ selectedRoadmap }),
  setNotifications: (notifications) => set({ notifications })
}));
