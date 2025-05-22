import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      <div className={`task-manager ${darkTheme ? "dark" : "light"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
