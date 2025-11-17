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

                <CollapsibleSection title="Project Overview" defaultExpanded>
                  {project.description ? (
                    <MarkdownMUI text={project.description} />
                  ) : (
                    <Typography variant="body1" paragraph>No overview available.</Typography>
                  )}
                </CollapsibleSection>

                <CollapsibleSection title="Process">
                  {project.slug === 'image-description-generator' ? (
                    <Box sx={{ textAlign: 'left' }}>
                      <List sx={{ listStyleType: 'disc', pl: 3 }}>
                        <ListItem sx={{ display: 'list-item' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body1' }}
                            primary={
                              'The requirements were to quickly start a model that allows us to iteratively train an image recognition model to recognize and give us the description of the image. I created this artifact that allows users to upload an image. Once the image is uploaded it uses BLIP (a vision-language pretraining (VLP)) model that runs through 12 layers of Vision transformers and then finally spits out a coherent text description.'
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body1' }}
                            primary={
                              'In order to use this tool, please follow instructions and requirements mentioned here. Please note the demo in the portfolio may or may not run due to resource availability under the free tier of Streamlit. For best results please run it locally.'
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body1' }}
                            primary={
                              'Next, I built a portfolio website as GitHub did not seem to satisfy the requirements of 1.6. I decided to use Vercel to host my portfolio as it represents my skills as a software developer to develop an application from scratch. I built the components in the following order: left nav → experience → education → projects → about me, and set the general theme of the application.'
                            }
                          />
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                          <Box>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              Things that were considered when developing the portfolio by browsing other portfolios for ideas were:
                            </Typography>
                            <List sx={{ listStyleType: 'circle', pl: 4 }}>
                              <ListItem sx={{ display: 'list-item' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body1' }} primary={"Night and Day mode to assure we're not burning anyone's eyes."} />
                              </ListItem>
                              <ListItem sx={{ display: 'list-item' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body1' }} primary={'Make all a TLDR (Too long; didn\'t read) summary of the sections.'} />
                              </ListItem>
                              <ListItem sx={{ display: 'list-item' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body1' }} primary={'Not add too much overwhelming text per section.'} />
                              </ListItem>
                              <ListItem sx={{ display: 'list-item' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body1' }} primary={'Use symbolic icons over text and buttons to show better UX design.'} />
                              </ListItem>
                              <ListItem sx={{ display: 'list-item' }}>
                                <ListItemText primaryTypographyProps={{ variant: 'body1' }} primary={'Link demos when we can to projects.'} />
                              </ListItem>
                            </List>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  ) : project.slug === 'image-vectorizer' ? (
                    <Box sx={{ textAlign: 'left' }}>
                      <List sx={{ listStyleType: 'disc', pl: 3 }}>
                        <ListItem sx={{ display: 'list-item' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body1' }}
                            primary={
                              'While thinking about enhancing the Image generator from 2.5 and learning about training Deep learning models I was thinking about how I can make sure the models remember for long term and from each other’s memory. After a little bit of research I was able to come up with a solution of using a vector DB to map the AI models learning data. The vector DB takes the weights assigned by a model when processing an image and saves it to a Postgres’s DB with “n” dimension vectoring where “n” is the number of data points. I created a docker image with vectorized Postgres DB that makes sure the learnt data is preserved.'
                            }
                          />
                          <Box sx={{ mt: 1 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/DB_vector.png"
                              alt="Vectorized Postgres DB diagram"
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 8,
                                border: '1px solid #ddd',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                marginTop: '0.5em',
                              }}
                            />
                          </Box>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body1' }}
                            primary={
                              'While uploading images I wanted to show a visualization of the data in the database. This was a complicated endeavor since the data was “n” demential and it hard to visualize it in a UI. So I made the hard decision to only show those datapoint that have the highest level of variance between the vectors. At first I used the tried and test chart.js to represent the to biggest vectors datapoints in a 2d x and y axis chart. But I got some feedback from my partner to try to add more dimensions. So I researched and implemented poorly which allows 3d charts.'
                            }
                          />
                          <Box sx={{ mt: 1 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/ui_vector.png"
                              alt="UI vector visualization screenshot"
                              style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 8,
                                border: '1px solid #ddd',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                marginTop: '0.5em',
                              }}
                            />
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
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

                <CollapsibleSection title="Value Proposition" defaultExpanded>
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
                  {/* Optional textual evidence intro */}
                  {project.evidenceText && (
                    <Box sx={{ mb: 2 }}>
                      <MarkdownMUI text={project.evidenceText} />
                    </Box>
                  )}

                  {/* README evidence if provided */}
                  {project.readmeUrl && (
                    <ReadmeAccordion url={project.readmeUrl} />
                  )}

                  {/* Fallback when nothing provided */}
                  {!project.evidenceText && !project.readmeUrl && (
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
            {project.slug === 'ai-chatbot' && (
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href="https://chatbot-lnoz14skvy.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View a demo of ${project.title}`}
              >
                View Demo
              </Button>
            )}
            {project.slug === 'image-description-generator' && (
              <Button
                variant="contained"
                color="secondary"
                component="a"
                href="https://image-rec.streamlit.app"
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
