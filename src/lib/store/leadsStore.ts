// lib/store/leadsStore.ts
import { create } from "zustand";

type LeadsState = {
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
};

export const useLeadsStore = create<LeadsState>((set) => ({
  selectedLeadId: null,
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
}));
