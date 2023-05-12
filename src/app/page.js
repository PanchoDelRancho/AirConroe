"use client";
import {
  Card,
  CardBody,
  Text,
  Button,
  Box,
  useColorMode,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

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
    >
      <Box className="about" mx={breakpointValue !== "base" ? "15vw" : ".5rem"}>
        <Box h="95vh">
          <Box
            h="40vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column">
              <Button colorScheme="yellow" fontSize="5vh" h="10vh">
                Urgent Service
              </Button>
              <Button
                as="a"
                href="/Schedule"
                colorScheme="blue"
                fontSize="5vh"
                h="10vh"
                mt="5vh"
              >
                Schedule
              </Button>
            </Flex>
          </Box>
          <Card size="lg" align="center" h="45vh" bg={getCardColor()} mb="10vh">
            <CardBody align="center">
              <Text
                display="flex"
                fontSize="xl"
                px="5vw"
                alignItems="center"
                h="100%"
              >
                We understand the frustration of dealing with a malfunctioning
                air conditioning system. If you require immediate assistance,
                please click the 'Urgent Service' button above and our team will
                promptly contact you to address the issue.
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
      <Box className="about" mx={breakpointValue !== "base" ? "15vw" : ".5rem"}>
        <Box h="95vh">
          <Box
            h="40vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              background={getTitleColor()}
              fontSize="5vh"
              backdropFilter="invert(70%)"
              h="10vh"
            >
              About Us
            </Button>
          </Box>
          <Card size="lg" align="center" h="47vh" bg={getCardColor()} mb="10vh">
            <CardBody align="center">
              <Text
                display="flex"
                fontSize="xl"
                px="5vw"
                alignItems="center"
                h="100%"
              >
                We are a team of experienced air conditioning specialists
                dedicated to providing top-quality service. No matter the issue
                you're facing with your system, we have the knowledge and
                expertise to fix it efficiently and effectively. We prioritize
                your comfort and the air quality of your home, so you can rest
                easy knowing that you're in good hands.
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
      <Box className="about" mx={breakpointValue !== "base" ? "15vw" : ".5rem"}>
        <Box h="95vh">
          <Box
            h="40vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              as="a"
              href="/Contact"
              background={getTitleColor()}
              fontSize="5vh"
              backdropFilter="invert(70%)"
              h="10vh"
            >
              Contact Us
            </Button>
          </Box>
          <Card size="lg" align="center" h="45vh" bg={getCardColor()} mb="10vh">
            <CardBody align="center">
              <Text
                display="flex"
                fontSize="xl"
                px="5vw"
                alignItems="center"
                h="100%"
              >
                We hope you found our website informative and helpful. If you
                have any concerns about submitting your information online,
                please feel free to contact us by phone. Our number is available
                in the contact section, or you can click the 'Contact Us' button
                above. We are always happy to assist you in any way we can.
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
