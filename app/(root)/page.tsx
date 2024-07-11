import Collection from "@/components/shared/collection";
import Search from "@/components/shared/search";
import { getAllDars } from "@/lib/actions/dar.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const dars = await getAllDars({
    query: searchText,
    category,
    page,
    limit: 6
  });

  console.log(dars);

  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Mre7ba bik f dark Jdida</h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search />
        CATEGORY
      </div>
      <Collection
        data={dars?.data || []}
        emptyTitle="No DARS Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Dars"
        limit={6}
        page={1}
        totalPages={2}
         />
    </section>
  );
}
