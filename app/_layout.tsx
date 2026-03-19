import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '@theme/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Bukovel_ExtraLight: require('@assets/fonts/Bukovel-Extralight.otf'),
    Bukovel_Light:      require('@assets/fonts/Bukovel-Light.otf'),
    Bukovel_Regular:    require('@assets/fonts/Bukovel-Regular.otf'),
    Bukovel_Medium:     require('@assets/fonts/Bukovel-Medium.otf'),
    Bukovel_SemiBold:   require('@assets/fonts/Bukovel-Semibold.otf'),
    Bukovel_Bold:       require('@assets/fonts/Bukovel-Bold.otf'),
    Bukovel_Thin:       require('@assets/fonts/Bukovel-Thin.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider initialTheme="winter">
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
