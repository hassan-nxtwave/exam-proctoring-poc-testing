import { Dispatch, SetStateAction, useEffect, useState } from "react";

const isFirefoxBrowser = () => true;

export const checkCameraAvailabilityForFirefoxBrowser = async (
  stateSetterCallback: (value: boolean) => void,
  onSuccess?: () => void
) => {
  console.log("Firefox browser: Checking camera availability...");
  try {
    if (!navigator.mediaDevices) {
      stateSetterCallback(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    stateSetterCallback(true);
    stream.getTracks().forEach((track) => track.stop()); // Clean up immediately
    onSuccess?.();
  } catch (error) {
    stateSetterCallback(false);
  }
};

const useCameraAvailable = () => {
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);

  let permissionStatus; // To hold the reference to the permission status object
  let firefoxIntervalId;

  const checkCameraAvailabilityForOtherBrowsers = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.permissions) {
        setIsCameraAvailable(false);
        return;
      }

      // Request camera access to check if it is possible
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setIsCameraAvailable(true);

      stream.getTracks().forEach((track) => track.stop());

      // Check and monitor the permission status
      permissionStatus = await navigator.permissions.query({
        name: "camera",
      });
      permissionStatus.addEventListener("change", handlePermissionChange);
    } catch (error) {
      // Errors could be due to user denying permission or no camera available
      setIsCameraAvailable(false);

      console.log("Error while checking camera availability:", error);

      // Check and monitor the permission status
      permissionStatus = await navigator.permissions.query({
        name: "camera",
      });
      permissionStatus.addEventListener("change", handlePermissionChange);
    }
  };

  const handlePermissionChange = () => {
    checkCameraAvailabilityForOtherBrowsers();
  };

  const sideEffect = () => {
    // Initial check
    if (isFirefoxBrowser()) {
      firefoxIntervalId = setInterval(
        () => {
          checkCameraAvailabilityForFirefoxBrowser(setIsCameraAvailable, () => {
            clearInterval(firefoxIntervalId);
          });
        },
        5000 // TODO: interval should be configurable
      );

      return () => {
        clearInterval(firefoxIntervalId);
      };
    } else {
      checkCameraAvailabilityForOtherBrowsers();
      return () => {
        // Clean up the permission change listener when the hook unmounts or re-runs
        permissionStatus?.removeEventListener("change", handlePermissionChange);
      };
    }
  };

  useEffect(sideEffect, []);

  return [isCameraAvailable, setIsCameraAvailable];
};

export default useCameraAvailable;
