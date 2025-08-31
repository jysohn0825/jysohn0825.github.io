<template>
  <div class="posts">
    <header class="posts-header">
      <h1>All Posts</h1>
      <p>{{ posts.length > 0 ? `${posts.length} posts` : 'No posts yet' }}</p>
    </header>
    
    <main class="posts-content">
      <div v-if="posts.length === 0" class="no-posts">
        <h2>Coming Soon! 🚀</h2>
        <p>I'm working on some exciting content. Check back soon for new posts!</p>
      </div>
      
      <div v-else class="posts-list">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <h2>
            <router-link :to="`/posts/${post.slug}`">
              {{ post.title }}
            </router-link>
          </h2>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <router-link :to="`/posts/${post.slug}`" class="read-more">
            Read more →
          </router-link>
        </article>
      </div>
    </main>
  </div>
</template>

<script>
import { getPostList } from '../utils/markdown.js'

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      loading: true,
      error: null
    }
  },
  async created() {
    await this.loadPosts()
  },
  methods: {
    async loadPosts() {
      try {
        this.loading = true
        this.posts = await getPostList()
      } catch (error) {
        this.error = error.message
        console.error('Error loading posts:', error)
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.posts {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.posts-header {
  text-align: center;
  margin-bottom: 3rem;
}

.posts-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.posts-header p {
  color: #666;
  font-size: 1.1rem;
}

.no-posts {
  text-align: center;
  padding: 3rem 0;
}

.no-posts h2 {
  color: #333;
  margin-bottom: 1rem;
}

.no-posts p {
  color: #666;
  font-size: 1.1rem;
}

.posts-list {
  display: grid;
  gap: 2rem;
}

.post-card {
  padding: 1.5rem;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-card h2 {
  margin-bottom: 1rem;
}

.post-card h2 a {
  color: #333;
  text-decoration: none;
  font-size: 1.4rem;
}

.post-card h2 a:hover {
  color: #667eea;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.post-date {
  color: #666;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid #e2e8f0;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  color: #5a67d8;
}
</style>