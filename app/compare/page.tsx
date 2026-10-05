import type { Metadata } from "next";
import DormComparison from "@/components/DormComparison";
import { dormitories } from "@/data/dormitories";

export const metadata: Metadata = {
  title: "เปรียบเทียบหอพัก | MU นอนไหนดี",
};

export default async function ComparePage({ searchParams }: PageProps<"/compare">) {
  const params = await searchParams;
  const firstId = typeof params.first === "string" ? params.first : "";
  const secondId = typeof params.second === "string" ? params.second : "";
  const first = dormitories.find((dorm) => dorm.id === firstId);
  const second = dormitories.find((dorm) => dorm.id === secondId);
  let notice = "";
  if ((firstId && !first) || (secondId && !second)) {
    notice = "ไม่พบหอพักบางรายการในลิงก์ กรุณาเลือกหอพักใหม่";
  } else if (first && first.id === second?.id) {
    notice = "กรุณาเลือกหอพักคนละแห่งเพื่อเปรียบเทียบ";
  }

  return (
    <DormComparison
      key={`${firstId}-${secondId}`}
      initialFirstId={first?.id ?? ""}
      initialSecondId={second?.id === first?.id ? "" : second?.id ?? ""}
      initialNotice={notice}
    />
  );
}
