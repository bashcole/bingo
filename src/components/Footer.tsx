import { Box } from "@chakra-ui/react";

const Footer = () => {
    return (
    <Box display='flex' justifyContent="center" opacity={0.4} fontSize="sm" as="footer" p={3}>
      &copy; {new Date().getFullYear()} Marian Petrov. All Rights Reserved.
    </Box>
  );
};

export default Footer;
