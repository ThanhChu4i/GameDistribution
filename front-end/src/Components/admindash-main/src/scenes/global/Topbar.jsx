import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Setting from "../Setting";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const toggleSetting = () => {
    setIsSettingOpen((prev) => !prev);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center" position="relative">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={toggleSetting}>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Conditionally render Setting component below the button */}
        {isSettingOpen && (
          <Box
            position="absolute"
            top="40px" // Adjust to control the space below the icon
            right="0px"
            bgcolor="background.paper"
            boxShadow={3}
            borderRadius="5px"
            p={2}
            zIndex={10}
          >
            <Setting />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
