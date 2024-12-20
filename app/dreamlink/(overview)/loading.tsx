import { FormSkeleton } from "@/app/ui/Skeletons";

export default function Loading() {
  return (
    <div className="flex justify-center py-14">
      <FormSkeleton />
    </div>
  );
}
