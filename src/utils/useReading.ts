import { useState } from "react";

const synth = window.speechSynthesis;
const speach = new SpeechSynthesisUtterance();

export const useReading = () => {
  const [isReading, setIsReading] = useState(synth.speaking);

  const startReading = (text: string) => {
    speach.text = text;
    speach.voice = synth.getVoices()[15];
    speach.onend = () => {
      setIsReading(synth.speaking);
    };
    synth.speak(speach);
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
