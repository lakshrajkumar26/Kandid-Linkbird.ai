// lib/store/useAppStore.ts
import {create} from "zustand";

type AppState = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  // small placeholder for when we open lead detail sheet later
  selectedLeadId: number | null;
  setSelectedLeadId: (id: number | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (v: boolean) => set({ sidebarCollapsed: v }),

  activeTab: "Dashboard",
  setActiveTab: (tab: string) => set({ activeTab: tab }),

  selectedLeadId: null,
  setSelectedLeadId: (id: number | null) => set({ selectedLeadId: id }),
}));
