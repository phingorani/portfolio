'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, TextField, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Skill {
  name: string;
  url: string;
}

interface Skills {
  [category: string]: Skill[];
}

const skills: Skills = {
  Languages: [
    { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
    { name: 'Python', url: 'https://www.python.org/' },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Java', url: 'https://www.java.com/' },
  ],
  'Frontend': [
    { name: 'React', url: 'https://react.dev/' },
    { name: 'Next.js', url: 'https://nextjs.org/' },
    { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
    { name: 'MUI', url: 'https://mui.com/' },
    { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
    { name: 'HTML/CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'AngularJs', url: 'https://angularjs.org/' },
    { name: 'SingleSPA', url: 'https://single-spa.js.org/' },
  ],
  Backend: [
    { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
    { name: 'Node.js', url: 'https://nodejs.org/' },
    { name: 'Spring Boot', url: 'https://spring.io/' },
    { name: 'Flask', url: 'https://flask.palletsprojects.com/' },
    { name: 'Django', url: 'https://www.djangoproject.com/' },
  ],
  'AI/ML': [
    { name: 'vLLM', url: 'https://docs.vllm.ai/' },
    { name: 'LM Studio', url: 'https://lmstudio.ai/' },
    { name: 'CUDA', url: 'https://developer.nvidia.com/cuda-toolkit' },
    { name: 'Sentence-Transformers', url: 'https://www.sbert.net/' },
    { name: 'LangChain', url: 'https://www.langchain.com/' },
    { name: 'PyTorch', url: 'https://pytorch.org/' },
    { name: 'Transformers', url: 'https://huggingface.co/docs/transformers/index' },
    { name: 'scikit-learn', url: 'https://scikit-learn.org/' },
    { name: 'Pandas', url: 'https://pandas.pydata.org/' },
  ],
  Infrastructure: [
    { name: 'Kubernetes', url: 'https://kubernetes.io/' },
    { name: 'K3s', url: 'https://k3s.io/' },
    { name: 'Docker', url: 'https://www.docker.com/' },
    { name: 'Ansible', url: 'https://www.ansible.com/' },
    { name: 'ArgoCD', url: 'https://argoproj.github.io/cd/' },
    { name: 'Traefik', url: 'https://traefik.io/' },
    { name: 'Proxmox', url: 'https://www.proxmox.com/' },
    { name: 'Tailscale', url: 'https://tailscale.com/' },
    { name: 'Nginx', url: 'https://nginx.org/' },
    { name: 'Cloudflare', url: 'https://www.cloudflare.com/' },
  ],
  'Monitoring & Auth': [
    { name: 'Prometheus', url: 'https://prometheus.io/' },
    { name: 'Grafana', url: 'https://grafana.com/' },
    { name: 'Home Assistant', url: 'https://www.home-assistant.io/' },
    { name: 'Authelia', url: 'https://www.authelia.com/' },
    { name: 'NextAuth', url: 'https://next-auth.js.org/' },
    { name: 'OAuth 2.0', url: 'https://oauth.net/2/' },
  ],
  Database: [
    { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
    { name: 'Redis', url: 'https://redis.io/' },
    { name: 'SQLite', url: 'https://www.sqlite.org/' },
    { name: 'pgvector', url: 'https://github.com/pgvector/pgvector' },
    { name: 'DynamoDB', url: 'https://aws.amazon.com/dynamodb/' },
    { name: 'MySQL', url: 'https://www.mysql.com/' },
  ],
  Testing: [
    { name: 'Vitest', url: 'https://vitest.dev/' },
    { name: 'Playwright', url: 'https://playwright.dev/' },
    { name: 'Jest', url: 'https://jestjs.io/' },
    { name: 'Cypress', url: 'https://www.cypress.io/' },
    { name: 'JUnit', url: 'https://junit.org/' },
    { name: 'Selenium', url: 'https://www.selenium.dev/' },
  ],
  'CI/CD & Tools': [
    { name: 'Git', url: 'https://git-scm.com/' },
    { name: 'GitHub Actions', url: 'https://github.com/features/actions' },
    { name: 'Jenkins', url: 'https://www.jenkins.io/' },
    { name: 'Splunk', url: 'https://www.splunk.com/' },
    { name: 'Vercel', url: 'https://vercel.com/' },
  ],
};

export function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = useMemo(() => {
    if (!searchTerm) {
      return skills;
    }

    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = Object.entries(skills).reduce((acc, [category, skillList]) => {
      const filteredList = skillList.filter(
        (skill) =>
          skill.name.toLowerCase().includes(lowercasedFilter) ||
          category.toLowerCase().includes(lowercasedFilter)
      );

      if (filteredList.length > 0) {
        acc[category] = filteredList;
      }

      return acc;
    }, {} as Skills);

    return filtered;
  }, [searchTerm]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="skills-content"
        id="skills-header"
      >
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <BuildIcon sx={{ mr: 1 }} /> Skills
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <TextField
              label="Search Skills"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '50%' }}
            />
          </Box>
          {Object.entries(filteredSkills).map(([category, skillList]) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                <b>{category}</b>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skillList.map((skill) => (
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
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
