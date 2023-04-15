import { useContext, useEffect, useState, createContext } from "react";

interface WindowWidthContext {
  windowWidth: number;
}

interface WidthProviderProps {
  children: React.ReactNode;
}

export const UseWidthContext = createContext<WindowWidthContext>({
  windowWidth: 0,
});

export const WidthProvider = ({ children }: WidthProviderProps) => {
  const [windowWidth, setWindowWitdh] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWitdh(window.innerWidth);
      const handleResize = () => setWindowWitdh(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <UseWidthContext.Provider value={{ windowWidth }}>
      {children}
    </UseWidthContext.Provider>
  );
};

export default function useWidth() {
  return useContext(UseWidthContext);
}
