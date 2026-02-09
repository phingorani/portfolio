import { describe, it, expect } from 'vitest';
import { projects } from './projects';

describe('projects', () => {
  it('should contain expected projects', () => {
    const projectNames = projects.map(p => p.title);
    
    expect(projectNames).toContain('Artifact 5 Food Sentiment Analysis');
    expect(projectNames).toContain('Portfolio Website');
    expect(projectNames).toContain('Artifact 1 AI-Powered Chatbot');
  });

  it('should have at least 7 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(7);
  });

  it('should have projects with required fields', () => {
    projects.forEach(project => {
      expect(project).toHaveProperty('slug');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('githubUrl');
    });
  });

  it('should have projects with short descriptions', () => {
    projects.forEach(project => {
      expect(project).toHaveProperty('shortDescription');
      expect(project.shortDescription.length).toBeGreaterThan(0);
    });
  });

  it('should have tech stack arrays', () => {
    const projectWithTechStack = projects.find(p => p.techStack && p.techStack.length > 0);
    expect(projectWithTechStack).toBeDefined();
  });

  it('should have sentiment analysis project with evidence sections', () => {
    const product = projects.find(p => p.title === 'Artifact 5 Food Sentiment Analysis');
    expect(product?.evidenceSections).toBeInstanceOf(Array);
  });
});
