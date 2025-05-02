import axios from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    slug: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export const getBlogPosts = async (page = 1, pageSize = 6) => {
  try {
    console.log('Making API call to:', `${STRAPI_API_URL}/api/blog-posts`);
    const response = await api.get(`/api/blog-posts`, {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'populate': '*'
      }
    });
    console.log('Raw API response:', response);

    // Strapi v4 response format kontrolü
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response format from Strapi');
    }

    return {
      data: response.data.data,
      meta: response.data.meta
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 6,
          pageCount: 1,
          total: 0
        }
      }
    };
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/api/blog-posts`, {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*'
      }
    });

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return null;
    }

    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}; 