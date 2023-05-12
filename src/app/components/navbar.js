import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  useColorMode,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
} from "@chakra-ui/react";
import { FiWind, FiSun, FiMoon } from "react-icons/fi";
import NextLink from "next/link";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode("dark");

  return (
    <Box
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, .85)"
          : "rgba(26, 32, 44, 1)"
      }
      // rgba(26,32,44,.5)
      px={4}
      pos="fixed"
      top="0"
      w="100%"
      zIndex={3}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Menu>
          <MenuButton
            size={"md"}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            p="auto"
            as={Button}
          >
            <FiWind />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="/Schedule">
              Schedule
            </MenuItem>
            <MenuItem as="a" href="/">
              About
            </MenuItem>
            <MenuItem as="a" href="/Contact">
              Contact
            </MenuItem>
          </MenuList>
        </Menu>
        <Text fontSize={"xl"}>Air Conroe</Text>
        <Stack
          direction={"row"}
          spacing={6}
          display={{ base: "none", md: "block" }}
        >
          <NextLink href="/Schedule">Schedule</NextLink>
          <NextLink href="/">About</NextLink>
          <NextLink href="/Contact">Contact</NextLink>
        </Stack>
        <IconButton
          size={"md"}
          icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
          aria-label={"Toggle Dark Mode"}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
}

export default Navbar;
