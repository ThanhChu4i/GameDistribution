import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

<<<<<<< HEAD
const Header = ({ title, subtitle }) => {
=======
const Headerr = ({ title, subtitle }) => {
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

<<<<<<< HEAD
export default Header;
=======
export default Headerr;
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
