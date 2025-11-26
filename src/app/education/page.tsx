'use client'
import { Typography, Container, Paper } from '@mui/material';
import { educations } from '@/lib/education';
import Link from 'next/link';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';
import Image from 'next/image';

const getLogo = (slug: string) => {
  if (slug === 'depaul') {
    return '/depaul.png';
  }
  return null;
};

export default function EducationPage() {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ mt: 8 }}>
        Education
      </Typography>
      <Timeline position="alternate">
        {educations.map((education, index) => (
          <TimelineItem key={education.slug}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align={index % 2 === 0 ? 'right' : 'left'}
              variant="body2"
              color="text.secondary"
            >
              {education.date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <SchoolIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Link href={`/education/${education.slug}`} passHref style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {getLogo(education.slug) && (
                    <Image src={getLogo(education.slug)!} alt={`${education.university} logo`} width={100} height={50} style={{ marginBottom: '10px', objectFit: 'contain' }} />
                  )}
                  <Typography variant="h6" component="h1">
                    {education.university}
                  </Typography>
                  <Typography>{education.degree}</Typography>
                </Paper>
              </Link>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}
