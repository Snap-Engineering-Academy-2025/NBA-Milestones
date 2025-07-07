import { createTheme } from "@mui/material/styles";

const fenwayTheme = createTheme({
    typography: {
        fontFamily: 'Fenway, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'white', // 👈 This sets the text color for all buttons
                },
            },
        },
    },
});
export default fenwayTheme;