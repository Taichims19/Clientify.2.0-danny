import { Box, Typography, Avatar } from "@mui/material";

const Header = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">Clientify Partner</Typography>
      <Box display="flex" alignItems="center">
        <Avatar alt="Alice Kuvalis" src="/profile.jpg" />
        <Box ml={2}>
          <Typography variant="subtitle1">Account Manager</Typography>
          {/* <Typography variant="body2">Alice Kuvalis</Typography> */}
          <Typography variant="body2">Daniel Mendez</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
