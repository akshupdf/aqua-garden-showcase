import AdminPage from "@/components/admin/AdminPage";
import Navbar from "@/components/Navbar";

const Admin = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mt-16">
        <AdminPage />
      </section>
    </main>
  );
};

export default Admin;