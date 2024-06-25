import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Filter } from "@/components/Filter";
import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { ListEmpty } from "@/components/ListemEmpty";
import { Button } from "@/components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "src/util/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayersStorageDTO } from "@storage/player/PlayerStorageDTO";
type RouteParams = {
  group: string
}
export function Players() {
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayersStorageDTO[]>([])
  const route = useRoute()
  const { group } = route.params as RouteParams
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
      const playersByTeam = await playerGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log("error", error)
      Alert.alert('Não foi possiver carregar as pessoas')
    }

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
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name}
            onRemove={() => { }}
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
      <Button title="Remover turma"
        type="SECONDARY"
      />
    </Container>
  )
}