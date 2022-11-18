import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from "./src/components/Loading";

import { THEME } from './src/styles/theme';
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";
import { StatusBarProvider } from "./src/contexts/StatusBarContext";
import { useStatusBar } from "./src/hooks/useStatusBar";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })
  const { hidden } = useStatusBar();
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBarProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
            hidden={hidden}
          />
          {
            fontsLoaded ? <Routes /> : <Loading />
          }
        </StatusBarProvider>
      </AuthContextProvider>
    </NativeBaseProvider >
  );
}
