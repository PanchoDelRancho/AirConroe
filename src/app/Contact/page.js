"use client";
import {
  Card,
  CardBody,
  Text,
  CardFooter,
  Button,
  Box,
  Heading,
  useColorMode,
  useBreakpointValue,
  Flex,
  CardHeader,
  Stack,
  StackDivider,
  Image,
  Icon,
} from "@chakra-ui/react";
import {
  FiPhone,
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";

export default function Home() {
  const { colorMode } = useColorMode();
  const breakpointValue = useBreakpointValue({
    base: "base",
    md: "medium",
    lg: "large",
  });

  const lightTitle = "rgba(255, 255, 255, 0.75)";
  const darkTitle = "rgba(26, 32, 44, 0.30)";

  const lightCard = "rgba(255, 255, 255, 0.90)";
  const darkCard = "rgba(26, 32, 44, 0.90)";
  const getTitleColor = () => {
    return colorMode === "light" ? lightTitle : darkTitle;
  };
  const getCardColor = () => {
    return colorMode === "light" ? lightCard : darkCard;
  };

  return (
    <Box
      bgImage={
        breakpointValue === "large"
          ? "url('/images/lightanddarkhousepixel.png')"
          : colorMode === "light"
          ? "url('/images/lightside.png')"
          : "url('/images/darkside.png')"
      }
      bgSize="cover"
      height="100%"
      bgAttachment="fixed"
      pt="10vh"
    >
      <Box h="90vh" display="flex" justifyContent="center" alignItems="center">
        <Stack
          direction={
            breakpointValue === "medium" || breakpointValue === "base"
              ? "column"
              : "row"
          }
        >
          <Box
            backgroundColor={getCardColor()}
            boxSize={breakpointValue === "large" ? "70vh" : "45vh"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius=".5rem"
          >
            <Image
              borderRadius=".5rem"
              boxSize={breakpointValue === "large" ? "60vh" : "35vh"}
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
          </Box>
          <Card h={breakpointValue === "large" ? "70vh" : "35vh"}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box display="flex" alignItems="center">
                  <Icon as={FiPhone} boxSize={8} color="teal.300" m="2vh" />
                  <Text fontSize="xl">(999)783-2093</Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Icon as={FiMail} boxSize={8} color="teal.300" m="2vh" />
                  <Text fontSize="xl">thisEmail@thisotherThing.com</Text>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Icon as={FiTwitter} boxSize={8} color="teal.300" m="2vh" />
                  <Icon as={FiLinkedin} boxSize={8} color="teal.300" m="2vh" />
                  <Icon as={FiInstagram} boxSize={8} color="teal.300" m="2vh" />
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
