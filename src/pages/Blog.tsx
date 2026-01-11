import BlogPage from "@/components/blogs/BlogPage";
import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mt-16">
        <BlogPage />
      </section>
    </main>
  );
};

export default Blog;
