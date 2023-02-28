import { forwardRef, ReactNode } from 'react'
import {Link} from "react-router-dom";
import {
    Container,
    Box,
    Stack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";

import ThemeToggleButton from "@/components/ThemeToggleButton";
interface Props {
    children?: ReactNode;
}
export type Ref = HTMLButtonElement;

import {HamburgerIcon} from '@chakra-ui/icons'
const MenuLink = forwardRef<Ref,Props>((props, ref) => {
    {/* @ts-ignore */}
    return <Link ref={ref} as={Link} {...props} />
})

const NavBar = () => {
    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue("#ffffff40", "#20202380")}
            css={{backdropFilter: "blur(10px)"}}
            zIndex={2}
        >
            {/* @ts-ignore */}
            <Container align="center"
                display="flex"
                p={2}
                maxW="container.md"
                justify="space-between"
            >
                <Stack
                    direction={{base: "column", md: "row"}}
                    display={{base: "none", md: "flex"}}
                    width={{base: "full", md: "auto"}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{base: 4, md: 0}}
                >
                    <Link to="/">Home</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                </Stack>

                {/* @ts-ignore */}
                <Box flex={1} align="right">
                    <ThemeToggleButton/>

                    <Menu isLazy id="navbar-menu">
                        <MenuButton
                            display={{base: "inline-block", md: "none"}}
                            as={IconButton}
                            icon={<HamburgerIcon/>}
                            variant="outline"
                            aria-label="Options"
                        />
                        <MenuList>
                            {/* @ts-ignore */}
                            <MenuItem as={MenuLink} to="/">
                                Home
                            </MenuItem>

                            {/* @ts-ignore */}
                            <MenuItem as={MenuLink} to="/leaderboard">
                                Leaderboard
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Container>
        </Box>
    );
};

export default NavBar;
