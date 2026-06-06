import ArticleContent from "@/components/blogs/ArticleContent";
import Navbar from "@/components/Navbar";

const ArticlePage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ArticleContent />
    </main>
  );
};

export default ArticlePage;