import React, { useState, useEffect, createContext, useContext } from "react";

export const themes = {
  dark: "",
  light: "white-content",
};

export const ThemeContext = createContext();

export function useThemeCtx() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(true);
  const [checked, setChecked] = useState(true);

  //   let transition = () => {
  //     document.documentElement.classList.add("transition");
  //     window.setTimeout(() => {
  //       document.documentElement.classList.remove("transition");
  //     }, 1000);
  //   };

  useEffect(() => {
    setTheme(checked);
    if (theme) {
      //   transition();
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      //   transition();
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [theme, checked]);

  const value = {
    setTheme,
    setChecked,
    checked,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}
