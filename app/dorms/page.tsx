import DormListing from "@/components/DormListing";
import { dormitoryAreas } from "@/data/dormitories";

export default async function DormsPage({ searchParams }: PageProps<"/dorms">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const area = params.area === "all" ? "all" : dormitoryAreas.find((area) => area.value === params.area)?.value;
  return <DormListing key={`${query}-${area}`} initialQuery={query} initialArea={area} />;
}
