
import { Typography, Container, Paper } from '@mui/material';

export default function HomePage() {
  return (
    <Container component="main" maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" paragraph>
          Please navigate to the about page to learn more about me.
        </Typography>
      </Paper>
    </Container>
  );
}
