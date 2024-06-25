import { Header } from "@/components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@/components/Highlight";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "src/util/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('')
  const route = useRoute
  const navigator = useNavigation()
  async function handleNew() {
    try {
      if(group.trim().length === 0) {
        return Alert.alert("Novo Gropo", "Informe o nome da turma")
      }
      await groupCreate(group)
      navigator.navigate('players', { group })

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Gropo", error.menssage)
      } else {
        Alert.alert("Novo Gropo", "Não foi possivel criar o grupo")
        console.log(error)
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title={'Nova turma'}
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}

        />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}