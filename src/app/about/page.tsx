import { Box, Typography, Container, Paper, List, ListItem, ListItemText, Divider, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

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
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <IconButton
              aria-label="Email"
              component="a"
              href="mailto:hingorani.pratik@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <EmailIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component="a"
              href="https://www.linkedin.com/in/pratik-hingorani"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              component="a"
              href="https://github.com/phingorani"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}