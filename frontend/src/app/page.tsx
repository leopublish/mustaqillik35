export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>O‘zbekiston mustaqilligining 35 yilligi</h1>
      <p>Frontend xizmati ishga tushirilgan.</p>
      <p>
        Backend holati:{' '}
        <a href="http://localhost:8000/api/health/">
          http://localhost:8000/api/health/
        </a>
      </p>
    </main>
  );
}