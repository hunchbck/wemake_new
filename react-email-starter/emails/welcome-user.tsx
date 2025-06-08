import { Body, Container, Head, Html, Text } from "@react-email/components";

export const WelcomeUser = ({ username }: { username: string }) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text className="font-sans text-2xl font-bold text-rose-600">
            Welcome to onepy.kr {username}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
