import { useState } from "react"
import { FlatList } from "react-native"
import { Text } from 'react-native';
import { Container, } from './styles'
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/CroupCard';
import { ListEmpty } from "@/components/ListemEmpty";
import { Button } from "@/components/Button";
export function Groups() {
  const [groups, setGroup] = useState([])
  return (
    <Container>
      <Header />
      <Highlight
        title='Turma'
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex:1}}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Nenhuma turma cadastrada"
          />
        )}
      />
      <Button
        title="Criar nova turma"
      />
    </Container>
  );
}


