import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import tutorialData from "../../data/tutorialData.json";

const TutorialIntroduction = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Tabs oben */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tutorialData.map((tut, index) => (
          <button
            key={index}
            className={`border px-4 py-2 rounded ${
              selected === index
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => setSelected(index)}
          >
            {tut.headline}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="prose max-w-3xl w-full">
        <h1>{tutorialData[selected].headline}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {tutorialData[selected].description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TutorialIntroduction;
