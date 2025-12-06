import { Box, Typography, Container, Paper, Divider, IconButton, Stack, Chip, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { SteamIcon } from '../components/icons/SteamIcon';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SkillsSection } from './components/SkillsSection';
import { ContactForm } from './components/ContactForm';

interface NationalPark {
  name: string;
  url: string;
}


const nationalParks: NationalPark[] = [
  { name: 'Acadia', url: 'https://www.nps.gov/acad/index.htm' },
  { name: 'Zion', url: 'https://www.nps.gov/zion/index.htm' },
  { name: 'North Cascades', url: 'https://www.nps.gov/noca/index.htm' },
  { name: 'Mount Rainier', url: 'https://www.nps.gov/mora/index.htm' },
  { name: 'Glacier', url: 'https://www.nps.gov/glac/index.htm' },
  { name: 'Olympic', url: 'https://www.nps.gov/olym/index.htm' },
  { name: 'Great Smoky Mountains', url: 'https://www.nps.gov/grsm/index.htm' },
];

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
          src="/img.png"
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography component="h1" variant="h2" gutterBottom>
          Pratik Hingorani
        </Typography>
        <Typography component="h2" variant="h5" color="text.secondary" gutterBottom>
          Forward-looking Software Engineer with 7 years background in creating and executing modern, scalable and maintainable software solutions.
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1 }} /> About Me
                </Typography>
                <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                  As a seasoned Senior Software Engineer, I specialize in transforming complex business needs into high-impact, user-centric digital solutions. With a proven track record of leading projects from inception to deployment, I thrive on building scalable, full-stack applications and integrating cutting-edge AI to drive efficiency and revenue.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                My passion lies in leveraging technology to solve real-world problems. At Hyatt, I am currently leading the charge to infuse AI into the core of our reservation systems. This includes architecting a data aggregation pipeline using gRPC and GraphQL to feed a Large Language Model (Claude 3.5 Haiku), which generates personalized customer proposals and saves our sales team countless hours. Furthermore, I developed an AI-powered reasoning model that increased high-value lead revenue by 32% through intelligent ranking.
              </Typography>
              <Typography variant="body1" paragraph>
                My expertise spans the full software development lifecycle. On the frontend, I have extensive experience with modern frameworks like React, Next.js, and Angular, creating robust and reusable component libraries and micro-frontend architectures with Module Federation. On the backend, I&apos;ve designed and implemented resilient CRUD APIs using Spring Boot and serverless functions with AWS Lambda. My work has directly contributed to significant business growth, including launching a new booking website that generated over $5.4M in revenue.
              </Typography>
              <Typography variant="body1" paragraph>
                Beyond feature development, I am deeply committed to building resilient and secure infrastructure. I have been instrumental in modernizing legacy systems by migrating VM-based applications to scalable Docker and Kubernetes environments and have redesigned enterprise-level security by integrating SSO with Azure Entra and Multi-Factor Authentication.
              </Typography>
              <Typography variant="body1" paragraph>
                I am driven by the challenge of building what&apos;s next and am always exploring new ways to apply technology to create intuitive, powerful, and impactful user experiences.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ my: 2 }} />

          <SkillsSection />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SportsEsportsIcon sx={{ mr: 1 }} /> Hobbies
          </Typography>
          <Typography variant="body1" paragraph>
            When I&apos;m not coding, I enjoy a variety of activities that keep me balanced and inspired. I&apos;m an avid hiker, and I love exploring new trails and spending time in nature. I&apos;m also a passionate homelabber, and I enjoy building and experimenting with my own servers and network infrastructure. And when it&apos;s time to unwind, I&apos;m a dedicated gamer, and I love diving into new worlds and challenging myself with new games.
          </Typography>
          <Typography variant="body1" paragraph>
            Some of the national parks I&apos;ve had the pleasure of visiting include:
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
          <ContactForm />
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
