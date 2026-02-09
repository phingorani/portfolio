import { describe, it, expect, vi } from 'vitest';

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  readdirSync: vi.fn(),
}));

vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}));

const mockFs = vi.mocked(require('fs'), { strict: true });
const mockPath = vi.mocked(require('path'), { strict: true });

import { getSortedPostsData, getAllPostSlugs, getPostData, Post } from './posts';

describe('posts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSortedPostsData', () => {
    it('should return posts sorted by date (newest first)', () => {
      mockFs.readdirSync.mockReturnValue(['post1.md', 'post2.md']);
      mockFs.readFileSync.mockReturnValue(
        '---\ntitle: Test\ndate: 2024-01-15\nexcerpt: Excerpt\n---\nContent'
      );
      mockPath.join.mockImplementation((...args) => args.join('/'));

      const posts = getSortedPostsData();

      expect(posts).toBeInstanceOf(Array);
    });

    it('should include static posts', () => {
      mockFs.readdirSync.mockReturnValue([]);
      mockFs.readFileSync.mockReturnValue('');
      mockPath.join.mockImplementation((...args) => args.join('/'));

      const posts = getSortedPostsData();

      const hasStaticPost = posts.some((p: Post) => p.slug === 'ai-innovations-newsletter');
      expect(hasStaticPost).toBe(true);
    });
  });

  describe('getAllPostSlugs', () => {
    it('should return slugs from file names', () => {
      mockFs.readdirSync.mockReturnValue(['test-post.md', 'another-post.md']);
      mockPath.join.mockImplementation((...args) => args.join('/'));

      const slugs = getAllPostSlugs();

      expect(slugs.length).toBe(2);
      expect(slugs[0]).toEqual({ params: { slug: 'test-post' } });
    });
  });

  describe('getPostData', () => {
    it('should return post data for a given slug', () => {
      const mockContent = '---\ntitle: Test Post\ndate: 2024-01-15\nexcerpt: Test Excerpt\n---\n# Content';
      
      mockFs.readFileSync.mockReturnValue(mockContent);
      mockPath.join.mockImplementation((...args) => args.join('/'));

      const postData = getPostData('test-post');

      expect(postData.slug).toBe('test-post');
      expect(postData.title).toBe('Test Post');
      expect(postData.content).toContain('# Content');
    });
  });
});
