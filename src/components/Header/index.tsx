import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackIncon, BackButton } from "./styles";
import logoImg from "@assets/logo.png"
type Props = {
  showBackButton?: boolean
}
export function Header({ showBackButton = false }: Props) {
  const navagation = useNavigation()
  function handleGoBack(){
    navagation.navigate('groups')

  }
  return (
    <Container>
      { 
        showBackButton &&
        <BackButton onPress={handleGoBack}>
          <BackIncon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  )
}