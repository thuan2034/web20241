import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type SoundSettingsSlice = {
  soundEffects: boolean;
  speakingExercises: boolean;
  listeningExercises: boolean;
  setSoundEffects: (isOn: boolean) => void;
  setSpeakingExercises: (isOn: boolean) => void;
  setListeningExercises: (isOn: boolean) => void;
};

export const createSoundSettingsSlice: BoundStateCreator<SoundSettingsSlice> = (
  set,
) => ({
  soundEffects: true,
  speakingExercises: true, // Giữ lại giá trị mặc định
  listeningExercises: true, // Giữ lại giá trị mặc định
  setSoundEffects: () => {}, 
  setSpeakingExercises: () => {}, 
  setListeningExercises: () => {}, 
});
