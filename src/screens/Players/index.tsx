import { Input } from "@/components/Input";
import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";

import { Container, Form } from "./styles";
import { Filter } from "@/components/Filter";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turna"
        subtitle="adicione a lagera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon icon="add" />
      </Form>
      <Filter title="Turama A"
      
      />
    </Container>
  )
}