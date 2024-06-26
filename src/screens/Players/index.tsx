import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Filter } from "@/components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { ListEmpty } from "@/components/ListemEmpty";
import { Button } from "@/components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppError } from "src/util/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayersStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemovByGroup } from "@storage/player/playerRemovByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { groupRemoveByName } from "@screens/Groups/groupRemoveByName";
import { Loading } from "@/components/Loading";
type RouteParams = {
  group: string
}
export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayersStorageDTO[]>([])
  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams
  const newPlayerNameInputRef = useRef<TextInput>(null)
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova Pessoa", 'Informe o nome da pessoa para adicionar')
    }
    const newPlayers = {
      name: newPlayerName,
      team,
    }
    try {
      await playerAddByGroup(newPlayers, group)
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.menssage)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possivel adicionar.')
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await playerGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      setIsLoading(false)
    } catch (error) {
      console.log("error", error)
      Alert.alert('Não foi possiver carregar as pessoas')
    }

  }
  async function handleRemovePlayers(playerName: string) {
    try {
      await playerRemovByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.')
    }
  }
  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel remover o grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", 'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }
  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a lagera e separe os times"
      />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa!"
          autoCorrect={false}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>
      {
        isLoading ? <Loading /> :

          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard name={item.name}
                onRemove={() => handleRemovePlayers(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty
                message="Não a pessoa nesse time"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 },
            ]}
          />
      }
      <Button title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}