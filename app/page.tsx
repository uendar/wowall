import Browse from "@/components/Browse";
import { categories, wallpapers } from "@/lib/wallpapers";

export default function Home() {
  return (
    <main>
      <Browse items={wallpapers} categories={categories} />
    </main>
  );
}
