import { create } from "zustand";

type ExplorerState = {
  query: string;
  provider: string;
  tag: string;
  kind: string;
  setQuery: (value: string) => void;
  setProvider: (value: string) => void;
  setTag: (value: string) => void;
  setKind: (value: string) => void;
  initialize: (state: Pick<ExplorerState, "query" | "provider" | "tag" | "kind">) => void;
};

export const useExplorerStore = create<ExplorerState>((set) => ({
  query: "",
  provider: "all",
  tag: "all",
  kind: "all",
  setQuery: (value) => set({ query: value }),
  setProvider: (value) => set({ provider: value }),
  setTag: (value) => set({ tag: value }),
  setKind: (value) => set({ kind: value }),
  initialize: (state) => set(state),
}));