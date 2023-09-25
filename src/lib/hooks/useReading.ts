import { useState } from "react";

const GOOGLE_POLAND_VOICE = "Google polski";
const synth = window.speechSynthesis;
const speach = new SpeechSynthesisUtterance();

export const useReading = () => {
  const [isReading, setIsReading] = useState(synth.speaking);

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
      setIsReading(synth.speaking);
    };
    setIsReading(synth.speaking);
  };

  const stopReading = () => {
    synth.cancel();
    setIsReading(synth.speaking);
  };

  return {
    startReading,
    stopReading,
    isReading,
  };
};
