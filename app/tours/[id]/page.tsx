import { fetchBmTourDetail } from "@/lib/fetchTours";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function TourDetailPage({ params }: PageProps) {
  const { id } = await params;
  const tour = await fetchBmTourDetail(id);

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{tour.name}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Reference Number:</strong> {tour.refNumber}
          </p>
          <p>
            <strong>Status:</strong> {tour.status}
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(tour.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Cost:</strong> ${tour.cost.toLocaleString()}
          </p>
          <p>
            <strong>Views:</strong> {tour.viewCount}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{tour.content}</p>
        </div>
      </div>
    </div>
  );
}
