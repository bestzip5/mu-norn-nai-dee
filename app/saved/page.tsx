import SavedDormitories from "@/components/SavedDormitories";

export const metadata = {
  title: "หอพักที่บันทึกไว้ | MU นอนไหนดี",
};

export default function SavedPage() {
  return (
    <main id="main-content" className="flex-1 bg-surface">
      <section className="page-container py-8 sm:py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">หอพักที่บันทึกไว้</h1>
        <p className="mt-2 text-sm leading-6 text-muted">รายการนี้ผูกกับบัญชีของคุณและเปิดดูได้เมื่อเข้าสู่ระบบ</p>
        <div className="mt-6"><SavedDormitories /></div>
      </section>
    </main>
  );
}
