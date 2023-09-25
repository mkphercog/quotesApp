import { useState } from "react";

const synth = window.speechSynthesis;
const speach = new SpeechSynthesisUtterance();

export const useReading = () => {
  const [isReading, setIsReading] = useState(synth.speaking);

  const startReading = (text: string) => {
    const polandVoice = synth
      .getVoices()
      .find((item) => item.name === "Google polski");

    if (polandVoice) {
      speach.voice = polandVoice;
    } else {
      speach.pitch = 0.3;
      speach.rate = 1;
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
