import { create } from 'zustand';

export const useProfileStore = create(set => ({
  answers: [],
  addAnswer: (answer) => set(state => ({ answers: [...state.answers, answer] })),
}));