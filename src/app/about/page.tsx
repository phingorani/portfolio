import { Box, Typography, Container, Paper, Divider, IconButton, Stack, Chip, Avatar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { SteamIcon } from '../components/icons/SteamIcon'; // Corrected import path
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const nationalParks = [
  { name: 'Acadia', url: 'https://www.nps.gov/acad/index.htm' },
  { name: 'Zion', url: 'https://www.nps.gov/zion/index.htm' },
  { name: 'North Cascades', url: 'https://www.nps.gov/noca/index.htm' },
  { name: 'Mount Rainier', url: 'https://www.nps.gov/mora/index.htm' },
  { name: 'Glacier', url: 'https://www.nps.gov/glac/index.htm' },
  { name: 'Olympic', url: 'https://www.nps.gov/olym/index.htm' },
  { name: 'Great Smoky Mountains', url: 'https://www.nps.gov/grsm/index.htm' },
];

const skills = {
  Languages: [
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Java', url: 'https://www.java.com/' },
    { name: 'Python', url: 'https://www.python.org/' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
  ],
  Backend: [
    { name: 'Node.js', url: 'https://nodejs.org/' },
    { name: 'Spring Framework', url: 'https://spring.io/' },
    { name: 'Django', url: 'https://www.djangoproject.com/' },
  ],
  UI: [
    { name: 'AngularJs', url: 'https://angularjs.org/' },
    { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'React', url: 'https://react.dev/' },
    { name: 'MUI', url: 'https://mui.com/' },
    { name: 'Next.js', url: 'https://nextjs.org/' },
    { name: 'SingleSPA', url: 'https://single-spa.js.org/' },
  ],
  Persistence: [
    { name: 'Mybatis', url: 'https://mybatis.org/mybatis-3/' },
    { name: 'Hibernate', url: 'https://hibernate.org/' },
  ],
  Database: [
    { name: 'Informix', url: 'https://www.ibm.com/products/informix' },
    { name: 'MySQL', url: 'https://www.mysql.com/' },
    { name: 'Postgres', url: 'https://www.postgresql.org/' },
    { name: 'SQLite', url: 'https://www.sqlite.org/' },
    { name: 'DynamoDB', url: 'https://aws.amazon.com/dynamodb/' },
    { name: 'Aurora', url: 'https://aws.amazon.com/rds/aurora/' },
  ],
  Testing: [
    { name: 'Karma', url: 'https://karma-runner.github.io/' },
    { name: 'Jasmine', url: 'https://jasmine.github.io/' },
    { name: 'Protractor', url: 'https://www.protractortest.org/' },
    { name: 'Selenium', url: 'https://www.selenium.dev/' },
    { name: 'Junit', url: 'https://junit.org/' },
    { name: 'Mockito', url: 'https://site.mockito.org/' },
    { name: 'Cypress', url: 'https://www.cypress.io/' },
    { name: 'Jest', url: 'https://jestjs.io/' },
  ],
  'CI/CD': [
    { name: 'Jenkins', url: 'https://www.jenkins.io/' },
    { name: 'Bitbucket', url: 'https://bitbucket.org/' },
    { name: 'Splunk', url: 'https://www.splunk.com/' },
    { name: 'Git', url: 'https://git-scm.com/' },
  ],
  SDLC: [
    { name: 'Agile', url: 'https://www.atlassian.com/agile' },
    { name: 'Kanban', url: 'https://www.atlassian.com/agile/kanban' },
    { name: 'Waterfall', url: 'https://www.atlassian.com/agile/waterfall' },
    { name: 'Scrum', url: 'https://www.scrum.org/' },
  ],
};

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
        <Avatar
          alt="Pratik Hingorani"
          src="/img.png" // Updated to use img.png
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography component="h1" variant="h2" gutterBottom>
          Pratik Hingorani
        </Typography>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          Forward-looking Software Engineer with 7 years background in creating and executing modern, scalable and maintainable software solutions.
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon sx={{ mr: 1 }} /> About Me
          </Typography>
          <Typography variant="body1" paragraph>
            Proven ability to leverage full-stack knowledge and experience to build interactive and user-centered websites and API's from inception to deployment as well as AI integration.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <BuildIcon sx={{ mr: 1 }} /> Skills
          </Typography>
          {Object.entries(skills).map(([category, skills]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <b>{category}</b>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={skill.name}
                    component="a"
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                  />
                ))}
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsEsportsIcon sx={{ mr: 1 }} /> Hobbies
          </Typography>
          <Typography variant="body1" paragraph>
            When I'm not coding, I enjoy a variety of activities that keep me balanced and inspired. I'm an avid hiker, and I love exploring new trails and spending time in nature. I'm also a passionate homelabber, and I enjoy building and experimenting with my own servers and network infrastructure. And when it's time to unwind, I'm a dedicated gamer, and I love diving into new worlds and challenging myself with new games.
          </Typography>
          <Typography variant="body1" paragraph>
            Some of the national parks I've had the pleasure of visiting include:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {nationalParks.map((park) => (
              <Chip
                key={park.name}
                label={park.name}
                component="a"
                href={park.url}
                target="_blank"
                rel="noopener noreferrer"
                clickable
              />
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <ContactMailIcon sx={{ mr: 1 }} /> Contact
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
            <IconButton
              aria-label="Steam"
              component="a"
              href="https://steamcommunity.com/profiles/76561197990018899/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              <SteamIcon width={32} height={32} />
            </IconButton>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
