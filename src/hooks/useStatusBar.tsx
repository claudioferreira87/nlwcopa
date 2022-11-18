import { useContext } from "react";

import { StatusBarContext, StatusBarProps } from "../contexts/StatusBarContext";

export function useStatusBar(): StatusBarProps {
  const context = useContext(StatusBarContext);
  return context;
}