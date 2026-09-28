import DormCard from "@/components/DormCard";
import { dormitories } from "@/data/dormitories";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-xl font-bold text-blue-900">MU Norn Nai Dee</p>
          <p className="mt-1 text-sm text-slate-600">Student living around Salaya</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Find your place</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A dorm that fits your university life.</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Explore dormitories around Mahidol University, Salaya. Get a quick
            look at ratings, electricity costs, and ways to get to campus.
          </p>
        </div>
        <p className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
          ข้อมูลจากแบบสอบถามนักศึกษามหาวิทยาลัยมหิดลชั้นปีที่ 1 ปีการศึกษา
          2568 จำนวน 103 คน ตามรายงานโครงงาน MU นอนไหนดี
        </p>
        <section aria-labelledby="dormitories-heading" className="mt-10">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="dormitories-heading" className="text-xl font-semibold">Explore dormitories</h2>
            <p className="text-sm text-slate-600">
              {dormitories.length} dormitories from the report
            </p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dormitories.map((dormitory) => (
              <li key={dormitory.id}><DormCard dormitory={dormitory} /></li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="mx-auto w-full max-w-6xl px-6 pb-8 text-sm text-slate-500">
        MU Norn Nai Dee · A student portfolio project
      </footer>
    </div>
  );
}
