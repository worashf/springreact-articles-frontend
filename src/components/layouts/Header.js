import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Search from "../layouts/Search";
const Header = ({ title, subTitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box mb="5px" >

                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subTitle}
                </Typography>
            </Box>
            <Box display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
                height="50px"
                >

                <Search />
            </Box>
        </Box>
    );
};

export default Header;