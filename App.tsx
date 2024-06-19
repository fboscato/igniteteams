import { ThemeProvider } from 'styled-components'
import { Players } from "@screens/Players";
import theme from '@theme/index';
import {Roboto_400Regular,Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto';
import { Loading } from '@/components/Loading';
import { StatusBar } from 'react-native';
import { Routes } from 'src/routes';


export default function App() {
  const [fontLoaded] =useFonts({Roboto_400Regular,Roboto_700Bold})
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
     {fontLoaded ? <Routes/>:<Loading/>}
    </ThemeProvider>
  )
}


