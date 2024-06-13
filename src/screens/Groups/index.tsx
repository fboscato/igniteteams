
import { Text } from 'react-native';
import { Container, } from './styles'
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
      title='Turma'
      subtitle='Jogue com sua turma'
      />

    
    </Container>
  );
}


