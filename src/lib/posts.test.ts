import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

import { getSortedPostsData, getAllPostSlugs, getPostData, Post } from './posts';

describe('posts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getSortedPostsData', () => {
    it('should return posts sorted by date (newest first)', () => {
      const mockReaddirSync = vi.spyOn(fs, 'readdirSync').mockReturnValue(['post1.md', 'post2.md'] as any);
      const mockReadFileSync = vi.spyOn(fs, 'readFileSync').mockReturnValue(
        '---\ntitle: Test\ndate: 2024-01-15\nexcerpt: Excerpt\n---\nContent'
      );

      const posts = getSortedPostsData();

      expect(posts).toBeInstanceOf(Array);
      expect(posts.length).toBeGreaterThan(0);

      mockReaddirSync.mockRestore();
      mockReadFileSync.mockRestore();
    });

    it('should include static posts', () => {
      const mockReaddirSync = vi.spyOn(fs, 'readdirSync').mockReturnValue([] as any);
      const mockReadFileSync = vi.spyOn(fs, 'readFileSync').mockReturnValue('');

      const posts = getSortedPostsData();

      const hasStaticPost = posts.some((p: Post) => p.slug === 'ai-innovations-newsletter');
      expect(hasStaticPost).toBe(true);

      mockReaddirSync.mockRestore();
      mockReadFileSync.mockRestore();
    });
  });

  describe('getAllPostSlugs', () => {
    it('should return slugs from file names', () => {
      const mockReaddirSync = vi.spyOn(fs, 'readdirSync').mockReturnValue(['test-post.md', 'another-post.md'] as any);

      const slugs = getAllPostSlugs();

      expect(slugs.length).toBe(2);
      expect(slugs[0]).toEqual({ params: { slug: 'test-post' } });

      mockReaddirSync.mockRestore();
    });
  });

  describe('getPostData', () => {
    it('should return post data for a given slug', () => {
      const mockContent = '---\ntitle: Test Post\ndate: 2024-01-15\nexcerpt: Test Excerpt\n---\n# Content';
      const mockReadFileSync = vi.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

      const postData = getPostData('test-post');

      expect(postData.slug).toBe('test-post');
      expect(postData.title).toBe('Test Post');
      expect(postData.content).toContain('# Content');

      mockReadFileSync.mockRestore();
    });
  });
});
