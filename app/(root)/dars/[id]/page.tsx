import Collection from "@/components/shared/collection";
import { getDarById, getRelatedDarsByCategory } from "@/lib/actions/dar.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const DarDetails = async ({ params: { id }, searchParams }: SearchParamProps ) => {
  const dar = await getDarById(id);
  const relatedDars = await getRelatedDarsByCategory({
    categoryId: dar.category._id,
    darId: dar._id,
    page: searchParams.page as string,
  }
  )
  console.log(dar);

  return (
    <>
    <section className="flex justify-center bg-cyan-50 mt-10 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={dar.imageUrl}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex flex-col w-full gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{dar.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {dar.price} MAD
                </p>
                <p className="p-medium-16 rounded-full bg-gray-400/10 px-4 py-2.5 text-gray-500">
                  {dar.category.name}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{" "}
                <span className="text-primary-500">
                  {dar.user.firstName} {dar.user.lastName}
                </span>
              </p>
            </div>
          </div>
          {/* MESSAGE BUTTON*/}
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={32}
                height={32}
              />
              <div>
                <p>{formatDateTime(dar.formatDateTime).dateOnly}</p>
                <p className="ml-1">
                  {formatDateTime(dar.formatDateTime).timeOnly}
                </p>
              </div>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{dar.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-gray-600">Kidayra DAR?</p>
            <p className="p-medium-16 lg:p-regular-18">{dar.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{dar.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Other DARS From the same USER */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Other {dar.category.name}s:</h2>
      <Collection
        data={relatedDars?.data || []}
        emptyTitle="No DARS Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Dars"
        limit={6}
        page={1}
        totalPages={2}
         />
    </section>
    </>
  );
};

export default DarDetails;
