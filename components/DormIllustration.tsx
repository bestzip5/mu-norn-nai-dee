export default function DormIllustration({ large = false }: { large?: boolean }) {
  return (
    <div aria-hidden="true" className={`flex items-end justify-center overflow-hidden border-b-[24px] border-brand bg-brand-soft pt-8 ${large ? "h-64 sm:h-96" : "h-52 sm:h-56"}`}>
      <div className={`origin-bottom rounded-t-lg bg-white px-4 pt-3 ${large ? "scale-125 sm:scale-150" : ""}`}>
        <div className="grid grid-cols-4 gap-2 border-[7px] border-brand bg-brand p-1">
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className="h-6 w-6 bg-brand-soft" />
          ))}
        </div>
      </div>
    </div>
  );
}
