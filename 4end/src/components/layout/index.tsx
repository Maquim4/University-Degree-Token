import React, { ReactNode } from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Head } from "./Head";
interface Props {
  children: ReactNode;
}

const confetti = {
  light: {
    primary: "4299E1", // blue.400
    secondary: "BEE3F8", // blue.100
  },

  dark: {
    primary: "1A365D", // blue.900
    secondary: "2A4365", // blue.800
  },
};

export function Layout(props: Props) {
  return (
    <>
      <Head />
      <Box
        margin="0 auto"
        minH="100vh"
      >
        <Header />
        <Container maxW="container.md">{props.children}</Container>
        <Footer />
      </Box>
    </>
  );
}
