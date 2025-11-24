import { Typography, Container, Paper, Chip, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ReadmeAccordion } from '../components/ReadmeAccordion';
import { CollapsibleSection } from '../components/CollapsibleSection';
import { ValuePropositionExpandable } from '../components/ValuePropositionExpandable';
import { MarkdownMUI } from '../components/MarkdownMUI';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const slug = (await params).slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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
          {/* Markdown is rendered in client components to avoid passing function props across the server->client boundary */}
          {(() => {
            return (
              <>
                {/* Objective (non-collapsible) */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" gutterBottom>Objective</Typography>
                  <Typography variant="body1" paragraph>
                    {project.objective ?? project.shortDescription ?? 'No objective provided.'}
                  </Typography>
                </Box>

                <CollapsibleSection title="Project Overview">
                  {project.description ? (
                    <MarkdownMUI text={project.description} />
                  ) : (
                    <Typography variant="body1" paragraph>No overview available.</Typography>
                  )}
                </CollapsibleSection>

                <CollapsibleSection title="Process">
                  {project.process ? (
                    <MarkdownMUI text={project.process} />
                  ) : (
                    <Typography variant="body1" paragraph>
                      {`This section will highlight the development process for ${project.title}.`}
                    </Typography>
                  )}
                </CollapsibleSection>

                {/* Tools (non-collapsible) */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" gutterBottom>Tools</Typography>
                  {project.techStack && project.techStack.length > 0 ? (
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
                  )}
                </Box>

                <CollapsibleSection title="Value Proposition">
                  {(() => {
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
                  })()}
                </CollapsibleSection>

                <CollapsibleSection title="Evidence">
                  {project.evidenceSections && project.evidenceSections.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {project.evidenceSections.map((section, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          {section.imageSrc && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={section.imageSrc}
                              alt={`Evidence image ${index + 1}`}
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 8,
                                border: '1px solid #ddd',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                marginBottom: '1em', // Added margin-bottom here
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

                  {/* README evidence if provided */}
                  {project.readmeUrl && (
                    <ReadmeAccordion url={project.readmeUrl} />
                  )}

                  {/* Fallback when nothing provided (redundant now, but kept for clarity in diff) */}
                  {!project.evidenceSections?.length && !project.readmeUrl && (
                    <Typography variant="body1" paragraph>No evidence provided.</Typography>
                  )}
                </CollapsibleSection>
              </>
            );
          })()}

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

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// No fallback summarization; value proposition must be provided via
// shortValueProposition (and optionally longValueProposition).
