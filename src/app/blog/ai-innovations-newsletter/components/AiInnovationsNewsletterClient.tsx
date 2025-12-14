'use client';

import {
    Container,
    Typography,
    Box,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemText,
    Snackbar,
    IconButton,
    Chip,
} from '@mui/material';
import { NewsletterSignup } from '@/app/components/NewsletterSignup';
import React, { useState } from 'react';
import { PreviewableImage } from "@/app/components/PreviewableImage";
import TrendingUp from '@mui/icons-material/TrendingUp';
import Code from '@mui/icons-material/Code';
import Palette from '@mui/icons-material/Palette';
import SupportAgent from '@mui/icons-material/SupportAgent';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import LinkIcon from '@mui/icons-material/Link';
import { StyledBlockquote } from '@/app/components/StyledBlockquote';
import { AnimateOnScroll } from '@/app/components/AnimateOnScroll';
import { ImageNavigation } from './ImageNavigation';

const BlogPostTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography component="h1" variant="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
        {children}
    </Typography>
);

const PostMetadata = ({ date }: { date: string }) => (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Published on {new Date(date).toLocaleDateString()}
    </Typography>
);

const SectionHeader = ({ icon, children, id }: { icon: React.ReactNode, children: React.ReactNode, id: string }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCopyLink = () => {
        const link = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(link).then(() => {
            setOpenSnackbar(true);
        });
    };

    return (
        <Box
            id={id}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 6,
                mb: 3,
                scrollMarginTop: '80px',
                '& .MuiIconButton-root': { opacity: 0 },
                '&:hover .MuiIconButton-root': { opacity: 1 },
            }}
        >
            {icon}
            <Typography component="h2" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', m: 0 }}>
                {children}
            </Typography>
            <IconButton onClick={handleCopyLink} size="small" aria-label="copy section link" sx={{ transition: 'opacity 0.2s' }}>
                <LinkIcon fontSize="small" />
            </IconButton>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                message="Link copied to clipboard!"
            />
        </Box>
    );
};

const StyledDivider = () => (
    <Divider sx={{ my: 6, borderColor: 'rgba(0, 0, 0, 0.2)' }} />
);

const BodyText = ({ children }: { children: React.ReactNode }) => (
    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'text.primary' }}>
        {children}
    </Typography>
);

const BulletList = ({ items }: { items: string[] }) => {
    const highlightPhrases = (text: string) => {
        const phrasesToHighlight = [
            "How it's transforming business",
            "Use Case Spotlight",
            "Future Potential",
        ];

        let highlightedText: (string | React.ReactNode)[] = [text];

        phrasesToHighlight.forEach(phrase => {
            const newHighlightedText: (string | React.ReactNode)[] = [];
            highlightedText.forEach((segment, i) => {
                if (typeof segment === 'string') {
                    const parts = segment.split(new RegExp(`(${phrase}:?)`, 'i'));
                    parts.forEach((part, index) => {
                        if (part.toLowerCase().startsWith(phrase.toLowerCase())) {
                            newHighlightedText.push(
                                <React.Fragment key={`${phrase}-${i}-${index}`}>
                                    <Chip color="primary" label={part} size="small" sx={{ mb: 1, mr: 1 }} />
                                    <br />
                                </React.Fragment>
                            );
                        } else {
                            newHighlightedText.push(part);
                        }
                    });
                } else {
                    newHighlightedText.push(segment);
                }
            });
            highlightedText = newHighlightedText;
        });

        return highlightedText;
    };

    return (
        <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
            {items.map((item, index) => (
                <ListItem key={index} sx={{ display: 'list-item', p: 0, mb: 1 }}>
                    <ListItemText primary={highlightPhrases(item)} sx={{ '& .MuiListItemText-primary': { fontSize: '1.1rem', lineHeight: 1.7, color: 'text.primary' } }} />
                </ListItem>
            ))}
        </List>
    );
};

const PostImage = ({ src, alt }: { src: string; alt: string }) => (
    <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: '100%' }}>
            <PreviewableImage
                src={src}
                alt={alt}
                width={700}
                height={400}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                }}
            />
        </Paper>
         <Typography variant="caption" display="block" align="center" color="text.secondary" sx={{ mt: 1 }}>
            {alt}
        </Typography>
    </Box>
);

interface AiInnovationsNewsletterClientProps {
    post: {
        title: string;
        date: string;
    };
    sections: {
        id: string;
        title: string;
        imageUrl: string;
    }[];
}

export default function AiInnovationsNewsletterClient({ post, sections }: AiInnovationsNewsletterClientProps) {
    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <article>
                <header>
                    <AnimateOnScroll>
                        <BlogPostTitle>{post.title}</BlogPostTitle>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.1}>
                        <PostMetadata date={post.date} />
                    </AnimateOnScroll>
                </header>

                <AnimateOnScroll delay={0.3}>
                    <BodyText>
                        Welcome to your monthly briefing on the ever-evolving world of Artificial Intelligence. This past month has been nothing short of transformative, with AI tools moving beyond simple assistance to become powerful, proactive partners in complex business environments. This edition explores groundbreaking updates in three key sectors: Software Development, Creative & Design, and Customer Experience. Let&#39;s dive in.
                    </BodyText>
                </AnimateOnScroll>

                <ImageNavigation sections={sections} />

                <AnimateOnScroll delay={0.2}>
                    <StyledDivider />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.3}>
                    <SectionHeader id="months-focus" icon={<TrendingUp color="primary" />}>The Month&#39;s Focus: From Assistant to Autonomous Partner</SectionHeader>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.4}>
                    <BodyText>
                        We&#39;re observing a significant trend: AI is no longer just about automating repetitive tasks. The latest wave of innovation is delivering AI that can understand intent, manage entire workflows, and even anticipate needs. This month&#39;s highlighted products from Cognition Labs, Canva, and leaders in the CX space showcase this leap perfectly.
                    </BodyText>
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.2}>
                    <StyledDivider />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.3}>
                    <SectionHeader id="software-development" icon={<Code color="primary" />}>1. Software Development: The Rise of the AI Software Engineer</SectionHeader>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.4}>
                    <StyledBlockquote>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Company to Watch:</strong> Cognition Labs</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Product Evolution:</strong> Devin, the AI Software Engineer</Typography>
                    </StyledBlockquote>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                    <BodyText>
                        Devin made waves by demonstrating an incredible ability to tackle entire development projects. The latest updates in November have pushed its capabilities even further. It&#39;s now faster, more autonomous, and can be more safely integrated into company workflows.
                    </BodyText>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.6}>
                    <BulletList items={[
                        "How it's transforming business: Instead of just completing single lines of code, Devin can now be tasked with an objective, like 'Refactor this component to improve performance' or 'Set up a continuous integration pipeline.' It can plan the task, write the code across multiple files, run tests, and debug issues on its own. This allows human developers to offload significant chunks of work and focus on high-level architecture and creative problem-solving.",
                        "Use Case Spotlight: A development team used Devin to manage a pull request for a legacy codebase. The AI analyzed the proposed changes, cross-referenced them with the project's history to identify potential conflicts, ran its own set of builds, and left comments for the human reviewer highlighting critical areas to inspect. This reduced the review time by an estimated 60%.",
                        "Future Potential: As these tools mature, they will act as tireless, expert team members. They will enable smaller teams to build more ambitious products and will dramatically accelerate the pace of software innovation.",
                    ]} />
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.7}>
                    <PostImage src="/BlogImg1.png" alt="Diagram showing an AI agent autonomously handling a development workflow from task description to pull request." />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.2}>
                    <StyledDivider />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.3}>
                    <SectionHeader id="creative-design" icon={<Palette color="primary" />}>2. Creative & Design: The AI-Powered Multimedia Studio</SectionHeader>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.4}>
                    <StyledBlockquote>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Company to Watch:</strong> Canva</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Product Evolution:</strong> Magic Studio (with Magic Design for Video)</Typography>
                    </StyledBlockquote>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                    <BodyText>
                        Canva has cemented its position as a go-to platform for accessible design, and its AI-powered Magic Studio is a key reason why. The latest updates have brought sophisticated video generation to the masses.
                    </BodyText>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.6}>
                    <BulletList items={[
                        "How it's transforming business: With Magic Design for Video, a user can simply provide a prompt like, 'Create a 30-second ad for our new coffee shop, highlighting our cozy atmosphere and organic beans.' The AI will select stock video clips, generate a narrative structure, choose appropriate background music, and assemble a complete video draft.",
                        "Use Case Spotlight: A small marketing agency needed to produce social media video ads for three different clients on a tight budget. Using Magic Studio, a single marketer was able to generate initial video drafts for all three campaigns in under an hour. They then spent their time fine-tuning the AI's output with client-specific branding, rather than starting from scratch.",
                        "Future Potential: The barrier to entry for video production is collapsing. This will empower small businesses, educators, and non-profits to create engaging multimedia content that was previously out of reach, leveling the playing field for digital marketing and communication.",
                    ]}/>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.7}>
                    <PostImage src="/BlogImg2.png" alt="A UI screenshot of an AI video generator, showing a text prompt on one side and a generated video timeline on the other." />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.2}>
                    <StyledDivider />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.3}>
                    <SectionHeader id="customer-experience" icon={<SupportAgent color="primary" />}>3. Customer Experience: Proactive, Emotionally-Aware Support</SectionHeader>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.4}>
                    <StyledBlockquote>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Industry Trend:</strong> Proactive & Empathetic AI</Typography>
                        <Typography variant="body1" sx={{ color: 'text.primary' }}><strong>Platforms to Watch:</strong> Zendesk, NICE, and others integrating this technology.</Typography>
                    </StyledBlockquote>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                    <BodyText>
                        The latest innovation in customer support is the deployment of emotionally intelligent AI that doesn&#39;t wait for the customer to complain.
                    </BodyText>
                </AnimateOnScroll>
                 <AnimateOnScroll delay={0.6}>
                    <BulletList items={[
                        "How it's transforming business: These systems analyze user behavior in real-time. If a user is 'rage-clicking' a button, repeatedly visiting the same help page, or hesitating on a checkout screen, the AI can proactively intervene. It can open a a helpful, context-aware message like, 'It seems you might be having trouble with our checkout. Can I help?' By analyzing the customer's language (sentiment analysis), the AI can also adjust its tone, escalating to a human agent if it detects significant frustration.",
                        "Use Case Spotlight: An e-commerce site integrated a proactive AI assistant. The system identified that users who spent more than three minutes on the 'shipping options' page had an 80% cart abandonment rate. The AI was configured to proactively offer a discount code for free shipping to these users. This single change reduced cart abandonment by 15% in the first month.",
                        "Future Potential: Customer support will become a seamless part of the user experience, not a separate, often frustrating, department. By anticipating needs and resolving issues before they escalate, businesses can build deeper loyalty and significantly improve customer satisfaction.",
                    ]}/>
                 </AnimateOnScroll>
                <AnimateOnScroll delay={0.7}>
                    <PostImage src="/BlogImg3.png" alt="A graph showing a decrease in customer support tickets and an increase in customer satisfaction after a implementing proactive AI." />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.2}>
                    <StyledDivider />
                </AnimateOnScroll>

                <AnimateOnScroll delay={0.3}>
                    <SectionHeader id="conclusion" icon={<CheckCircleOutline color="primary" />}>Conclusion: A Smarter Partnership</SectionHeader>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.4}>
                    <BodyText>
                        The advancements of November 2025 make one thing clear: our relationship with AI is evolving. From the software engineer&#39;s terminal to the marketer&#39;s design canvas, AI is graduating from a simple tool to a sophisticated, autonomous collaborator. By taking over complex workflows and even anticipating our needs, these systems are freeing up human talent to focus on what we do best: strategy, creativity, and building genuine connections.
                    </BodyText>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                    <BodyText>
                        We&#39;ll be watching these trends closely and will bring you the latest updates next month.
                    </BodyText>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.6}>
                    <BodyText>
                        <strong>Until then, stay curious.</strong>
                    </BodyText>
                </AnimateOnScroll>

            </article>
            <NewsletterSignup />
        </Container>
    );
}
