import { useEffect, useState } from "react";
import { cancelRender, useDelayRender } from "remotion";
import { waitForDonnitFonts } from "./theme";

/** Only mounts children once DM Sans is fully loaded (avoids flashes on render). */
export const WaitForFonts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { delayRender, continueRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Waiting for Donnit fonts"));

  useEffect(() => {
    if (fontsLoaded) return;
    waitForDonnitFonts()
      .then(() => setFontsLoaded(true))
      .catch((err) => cancelRender(err));
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) continueRender(handle);
  }, [continueRender, fontsLoaded, handle]);

  if (!fontsLoaded) return null;
  return <>{children}</>;
};
