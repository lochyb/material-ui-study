import './App.css';
import {
  Box,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Filter from './Filter.tsx';
import FacetedFilter from './FacetedFilter.tsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.palette.background.default,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ padding: 4 }}>
          <Typography variant="h1">Material UI</Typography>

          <Filter />
          <FacetedFilter />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
