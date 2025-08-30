<template>
  <div class="about">
    <header class="about-header">
      <h1>About Me</h1>
    </header>
    
    <main class="about-content">
      <section class="profile">
        <div class="profile-text">
          <h2>Hello, I'm JY! 👨‍💻</h2>
          <p>
            Welcome to my personal blog. I'm a passionate developer who loves 
            exploring new technologies, sharing knowledge, and building amazing web experiences.
          </p>
          <p>
            This blog serves as a space where I document my journey in software development,
            share tutorials, discuss interesting topics, and reflect on my experiences.
          </p>
        </div>
      </section>
      
      <section class="interests">
        <h2>What I'm Interested In</h2>
        <div class="tags">
          <span class="tag">Vue.js</span>
          <span class="tag">JavaScript</span>
          <span class="tag">Web Development</span>
          <span class="tag">Frontend</span>
          <span class="tag">UI/UX</span>
          <span class="tag">Open Source</span>
        </div>
      </section>
      
      <section class="contact">
        <h2>Get In Touch</h2>
        <p>
          Feel free to reach out if you want to discuss technology, collaborate on projects,
          or just say hello!
        </p>
        <div class="contact-links">
          <a href="#" class="contact-link">GitHub</a>
          <a href="#" class="contact-link">Twitter</a>
          <a href="#" class="contact-link">LinkedIn</a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.about-content section {
  margin-bottom: 3rem;
}

.profile-text h2 {
  color: #333;
  margin-bottom: 1rem;
}

.profile-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.interests h2 {
  color: #333;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid #e2e8f0;
}

.contact h2 {
  color: #333;
  margin-bottom: 1rem;
}

.contact p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
}

.contact-link {
  color: #667eea;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #667eea;
  border-radius: 6px;
  transition: all 0.2s;
}

.contact-link:hover {
  background: #667eea;
  color: white;
}
</style>