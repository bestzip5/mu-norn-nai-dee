import type { Dormitory } from "@/data/dormitories";

type DormCardProps = {
  dormitory: Dormitory;
};

export default function DormCard({ dormitory }: DormCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{dormitory.name}</h3>
      <p className="mt-1 text-sm text-slate-600">Area: {dormitory.area}</p>
      <dl className="my-6 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-600">Overall rating</dt>
          <dd className="rounded-md bg-blue-50 px-2 py-1 font-semibold text-blue-900">
            {dormitory.overallRating.toFixed(1)} / 5
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-600">Safety rating</dt>
          <dd className="font-medium">{dormitory.safetyRating.toFixed(1)} / 5</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-600">Electricity</dt>
          <dd className="font-medium">฿{dormitory.electricityPrice.toFixed(2)} / kWh</dd>
        </div>
      </dl>
      <div className="mb-6 border-t border-slate-100 pt-4">
        <p className="mb-2 text-sm font-medium text-slate-700">Transportation</p>
        <ul className="flex flex-wrap gap-2">
          {dormitory.transportationOptions.map((option) => (
            <li key={option} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          type="button"
          disabled
          aria-describedby={`details-note-${dormitory.id}`}
          className="w-full cursor-not-allowed rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500"
        >
          View Details
        </button>
        <p id={`details-note-${dormitory.id}`} className="mt-2 text-center text-xs text-slate-500">
          Detail pages coming soon
        </p>
      </div>
    </article>
  );
}
