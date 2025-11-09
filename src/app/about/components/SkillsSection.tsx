'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, TextField, Chip } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

interface Skill {
  name: string;
  url: string;
}

interface Skills {
  [category: string]: Skill[];
}

const skills: Skills = {
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
    { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
    { name: 'Vercel', url: 'https://vercel.com/' },
  ],
  'AI/ML': [
    { name: 'Streamlit', url: 'https://streamlit.io/' },
    { name: 'Pandas', url: 'https://pandas.pydata.org/' },
    { name: 'Pillow', url: 'https://python-pillow.org/' },
    { name: 'Transformers', url: 'https://huggingface.co/docs/transformers/index' },
    { name: 'PyTorch', url: 'https://pytorch.org/' },
    { name: 'LangChain', url: 'https://www.langchain.com/' },
    { name: 'Gemini', url: 'https://deepmind.google/technologies/gemini/' },
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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
          <BuildIcon sx={{ mr: 1 }} /> Skills
        </Typography>
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
    </>
  );
}
