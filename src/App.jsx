import { useState } from "react";
import Gatekeeper from "./components/Gatekeeper.jsx";
import QuestionIntro from "./components/QuestionIntro.jsx";
import TeddyBear from "./components/TeddyBear.jsx";
import ValentineIntro from "./components/ValentineIntro.jsx";
import Envelope from "./components/Envelope.jsx";  
import LoveLetter from "./components/LoveLetter.jsx";
import HeartText from "./components/HeartText.jsx";

export default function App() {
  const [step, setStep] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => (prev > 0 ? prev - 1 : 0));
  
  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    goNext(); // Move to QuestionIntro after authentication
  };

  switch (step) {
    case 0:
      return <Gatekeeper onAuthorized={handleAuthenticated} />;

    case 1:
      return <QuestionIntro onYes={goNext} />;

    case 2:
      return <TeddyBear onBack={goBack} onNext={goNext} />;

    case 3:
      return <ValentineIntro onNext={goNext} onBack={goBack} />;

    case 4:
      return <Envelope onNext={goNext} onBack={goBack} />;

    case 5:
      return <LoveLetter onOpen={goNext} onBack={goBack} />;

    case 6:
      return <HeartText onBack={goBack} />;

    default:
      return <Gatekeeper onAuthorized={handleAuthenticated} />;
  }
} 