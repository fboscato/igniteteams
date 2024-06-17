import {TouchableOpacityProps} from 'react-native'
import { ButtonIconTypeStyleProps, Container, Icon } from './stiles'
import {MaterialIcons} from '@expo/vector-icons'
type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}
export function ButtonIcon({icon,type = 'PRIMARY',...rest}:Props){
  return (
    <Container>
      <Icon 
      name={icon} 
      type='PRIMARY'
      />
    </Container>
  )
}