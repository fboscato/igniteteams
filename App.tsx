import { ThemeProvider } from 'styled-components'
import { Groups } from "@screens/Groups";
import theme from '@theme/index';
import {Roboto_400Regular,Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto';
import { Loading } from '@/components/Loading';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontLoaded] =useFonts({Roboto_400Regular,Roboto_700Bold})
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
     {fontLoaded ? <Groups />:<Loading/>}
    </ThemeProvider>
  )
}


