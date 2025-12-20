'use client';
import { PreviewableImage } from '@/app/components/PreviewableImage';
import { Typography, Container, Paper, Chip, Box, Button, Stepper, Step, StepButton, StepLabel, StepContent } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { ReadmeAccordion } from '../components/ReadmeAccordion';
import { ValuePropositionExpandable } from '../components/ValuePropositionExpandable';
import { MarkdownMUI } from '../components/MarkdownMUI';
import { ReflectionSection } from '../components/ReflectionSection';
import { useState } from 'react';
import { Project } from '@/lib/projects'; // Import Project type

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeStep, setActiveStep] = useState(0);

  const sections = [
    { title: 'Showcase', id: 'evidence' },
    { title: 'Objective', id: 'objective' },
    { title: 'Project Overview', id: 'project-overview' },
    { title: 'Process', id: 'process' },
    { title: 'Tools', id: 'tools' },
    { title: 'Value Proposition', id: 'value-proposition' },
    { title: 'Reflection', id: 'reflection' },
  ];
  
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            {project.evidenceSections && project.evidenceSections.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {project.evidenceSections.map((section, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    {section.imageSrc && (
                      <PreviewableImage
                        src={section.imageSrc}
                        alt={`Evidence image ${index + 1}`}
                        width={500}
                        height={500}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: 8,
                          border: '1px solid #ddd',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          marginBottom: '1em',
                        }}
                      />
                    )}
                    <MarkdownMUI text={section.text} />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1" paragraph>No evidence provided.</Typography>
            )}
            {project.readmeUrl && <ReadmeAccordion url={project.readmeUrl} />}
          </>
        );
      case 1:
        return (
          <Typography variant="body1" paragraph>
            {project.objective ?? project.shortDescription ?? 'No objective provided.'}
          </Typography>
        );
      case 2:
        return project.description ? (
          <MarkdownMUI text={project.description} />
        ) : (
          <Typography variant="body1" paragraph>No overview available.</Typography>
        );
      case 3:
        return project.process ? (
          <MarkdownMUI text={project.process} />
        ) : (
          <Typography variant="body1" paragraph>
            {`This section will highlight the development process for ${project.title}.`}
          </Typography>
        );
      case 4:
        return project.techStack && project.techStack.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {project.techStack.map((tech) => (
              <Chip
                key={tech.name}
                label={tech.name}
                component="a"
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                clickable
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body1" paragraph>No tools listed.</Typography>
        );
      case 5:
        const shortText = project.shortValueProposition || '';
        const longText = project.longValueProposition || '';
        if (!shortText && !longText) {
          return (
            <Typography variant="body1" paragraph>
              No value proposition available.
            </Typography>
          );
        }
        if (longText) {
          return (
            <ValuePropositionExpandable
              shortText={shortText}
              longText={longText}
            />
          );
        }
        return <MarkdownMUI text={shortText} />;
      case 6:
        return project.reflection ? (
          <ReflectionSection text={project.reflection} />
        ) : (
          <Typography variant="body1" paragraph>
            No reflection available.
          </Typography>
        );
      default:
        return 'Unknown step';
    }
  };

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
          {project.title}
        </Typography>
        <Box sx={{ mt: 4, width: '100%' }}>
          <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
            {sections.map((section, index) => (
              <Step key={section.id} completed={false}>
                <StepButton onClick={() => setActiveStep(index === activeStep ? -1 : index)}>
                  <StepLabel>{section.title}</StepLabel>
                </StepButton>
                <StepContent>
                  {getStepContent(index)}
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              component="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              View on <GitHubIcon sx={{ ml: 1 }} />
            </Button>
            {project.demoUrl && ( // Add this block for demoUrl
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View a demo of ${project.title}`}
              >
                View Demo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}