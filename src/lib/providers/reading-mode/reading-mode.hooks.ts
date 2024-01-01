import { useContext } from "react";
import { ReadingModeContext } from "./reading-mode.context";

const GOOGLE_POLAND_VOICE = "Google polski";
const synth = window.speechSynthesis;
const speach = new SpeechSynthesisUtterance();

export const useReadingMode = () => {
  const context = useContext(ReadingModeContext);

  if (!context) {
    throw new Error("useReadingMode must be used within a ReadingModeContext");
  }

  const { state, dispatch } = context;

  const startReading = (text: string) => {
    const polandGoogleVoice = synth
      .getVoices()
      .find((item) => item.name === GOOGLE_POLAND_VOICE);

    if (polandGoogleVoice) {
      speach.voice = polandGoogleVoice;
    }

    speach.text = text;

    synth.speak(speach);

    speach.onend = () => {
      dispatch({
        type: "SET_READING_TYPE",
        payload: {
          type: "NO_READING",
        },
      });
    };
  };

  const actions = {
    setIsReading: (text: string) => {
      dispatch({
        type: "SET_READING_TYPE",
        payload: {
          type: "READING",
        },
      });
      startReading(text);
    },

    stopReading: () => {
      dispatch({
        type: "SET_READING_TYPE",
        payload: {
          type: "NO_READING",
        },
      });
      synth.cancel();
    },
  };

  return {
    ...state,
    ...actions,
  };
};
