import React, { useEffect, useState } from "react";
// import WebCam from "react-webcam";
import "./styles.css";
// import useCameraAvailable from "./usePermission";

export default function App() {
  const [isInFullScreen, setIsInFullScreen] = React.useState(false);

  // const [isCameraAvailable, setIsCameraAvailable] = useCameraAvailable();

  useEffect(() => {
    if (isInFullScreen) {
      document.documentElement?.requestFullscreen();
      console.log("Full screen entered");
    } else {
      document.exitFullscreen().catch((_) => {});
      console.log("FULL_SCREEN_EXITED");
    }
  }, [isInFullScreen]);

  // useEffect(() => {
  //   console.log({ isCameraAvailable });
  // }, [isCameraAvailable]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <WebCam
        onUserMedia={() => {
          console.log("on User media");
        }}
        onUserMediaError={() => {
          console.log("User Media ERROR 💀 ☠️ 💀");
        }}
      /> */}

      <button
        onClick={() => {
          setIsInFullScreen(!isInFullScreen);
        }}
      >
        🫨 Toggle Full screen{" "}
      </button>
    </div>
  );
}

export const FullscreenComponent = () => {
  return (
    <button onClick={() => setIsInFullScreen(!isInFullScreen)}>
      {isInFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
    </button>
  );
};
