import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function AboutPage() {
  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          mb: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h2" gutterBottom>
          Pratik Hingorani
        </Typography>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          Forward-looking Software Engineer with 7 years background in creating and executing modern, scalable and maintainable software solutions.
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" paragraph>
            Proven ability to leverage full-stack knowledge and experience to build interactive and user-centered websites and API's from inception to deployment as well as AI integration.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Typography variant="body1" paragraph>
            <b>Languages:</b> Javascript, Java, Python, Typescript
            <br />
            <b>Backend:</b> Node.js, Spring Framework, Django
            <br />
            <b>UI:</b> AngularJs, HTML, CSS, React, MUI, Next.js, SingleSPA
            <br />
            <b>Persistence:</b> Mybatis, Hibernate
            <br />
            <b>Database:</b> Informix, MySQL, Postgres, SQLite, DynamoDB, Aurora
            <br />
            <b>Testing:</b> Karma, Jasmine, Protractor, Selenium, Junit, Mockito, Cypress, Jest
            <br />
            <b>CI/CD:</b> Jenkins, Stash(Bitbucket), Splunk, Git
            <br />
            <b>SDLC:</b> Agile (2 week sprints), Kanban, Waterfall, Scrum
          </Typography>





          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body1" paragraph>
            - Email: hingorani.pratik@gmail.com
            <br />
            - LinkedIn: https://www.linkedin.com/in/pratik-hingorani
            <br />
            - GitHub: https://github.com/phingorani
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}