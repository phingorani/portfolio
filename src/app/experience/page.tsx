'use client'
import { Typography, Container, Paper } from '@mui/material';
import { experiences } from '@/lib/experience';
import Link from 'next/link';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import WorkIcon from '@mui/icons-material/Work';
import Image from 'next/image';
import { motion } from 'framer-motion';

const getLogo = (slug: string) => {
  switch (slug) {
    case 'jpmorgan':
      return '/JPMorgan_logo.svg';
    case 'hyatt':
      return '/Hyatt_Logo.svg';
    default:
      return null;
  }
};

export default function ExperiencePage() {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ mt: 8 }}>
        Experience
      </Typography>
      <Timeline position="alternate">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.slug}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align={index % 2 === 0 ? 'right' : 'left'}
              variant="body2"
              color="text.secondary"
            >
              {experience.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <WorkIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Link href={`/experience/${experience.slug}`} passHref style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {getLogo(experience.slug) && (
                    <Image src={getLogo(experience.slug)!} alt={`${experience.company} logo`} width={100} height={50} style={{ marginBottom: '10px' }} />
                  )}
                  <Typography variant="h6" component="h1">
                    {experience.company}
                  </Typography>
                  <Typography>{experience.title}</Typography>
                </Paper>
              </Link>
            </TimelineContent>
          </TimelineItem>
          </motion.div>
        ))}
      </Timeline>
    </Container>
  );
}
