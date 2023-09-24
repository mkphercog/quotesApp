import { useState } from "react";

const synth = window.speechSynthesis;
const speach = new SpeechSynthesisUtterance();

export const useReading = () => {
  const [isReading, setIsReading] = useState(synth.speaking);

  const startReading = (text: string) => {
    speach.voice = synth.getVoices()[15];
    console.log(synth.getVoices()[15]);
    speach.lang = "pl-PL";
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
