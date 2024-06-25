import { useCallback, useEffect, useState } from "react"
import { FlatList } from "react-native"
import { Text } from 'react-native';
import { Container, } from './styles'
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { GroupCard } from '@/components/CroupCard';
import { ListEmpty } from "@/components/ListemEmpty";
import { Button } from "@/components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupGetAll";
export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroups() {
    navigation.navigate('new')
  }
  async function fetchGroup() {
    try {
    const data = await groupsGetAll()
    setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroups(group: string) {
    navigation.navigate('players',{group})


  }

  useFocusEffect(useCallback(()=>{
    fetchGroup()
  },[])) 
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
            onPress={() =>handleOpenGroups(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Nenhuma turma cadastrada"
          />
        )}
      />
      <Button
        title="Criar nova turma"
        onPress={handleNewGroups}
      />
    </Container>
  );
}


