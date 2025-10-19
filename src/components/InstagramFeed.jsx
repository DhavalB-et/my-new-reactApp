import { useEffect } from "react";

const InstagramFeed = () => {
  useEffect(() => {
    // Dynamically load the Elfsight script once when the component mounts
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Optional cleanup if component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full py-10 flex justify-center">
      <div
        className="elfsight-app-371cbac3-ebe2-44d6-8b69-af8a70b79fa6"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default InstagramFeed;
