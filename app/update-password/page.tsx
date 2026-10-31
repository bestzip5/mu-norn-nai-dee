import UpdatePasswordForm from "@/components/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-10 sm:py-16">
        <div className="mx-auto max-w-md rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-brand">MU นอนไหนดี</p>
          <h1 className="mt-2 text-2xl font-bold">ตั้งรหัสผ่านใหม่</h1>
          <div className="mt-6"><UpdatePasswordForm /></div>
        </div>
      </section>
    </main>
  );
}
