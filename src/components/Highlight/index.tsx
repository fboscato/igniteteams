import { Container, Subtitle, Tilte } from "./sytle";

type Props ={
  title:string,
  subtitle:string,
}
export function Highlight({title, subtitle}:Props) {
  return (
    <Container>
      <Tilte>
        {title}
      </Tilte>
      <Subtitle>
        {subtitle}
      </Subtitle>
    </Container>
  )
}