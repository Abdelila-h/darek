"use client";

import { IDar } from "@/lib/database/models/dar.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { useAuth  } from '@clerk/nextjs'
import Image from "next/image";
import DeleteConfirm from "./delete-confirm";

type CardProps = {
    dar: IDar,
}

const Card = ({ dar }: CardProps) => {
    const { userId } = useAuth();
    const isDarCreator = userId === dar.user.clerkId;

    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            <Link href={`/dars/${dar._id}`}
                  style={{backgroundImage: `url(${dar.imageUrl})`}}
                  className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500" />
             { /* IS DAR OWNER ... */}

            {isDarCreator && (
                <div className="absolute top-2 right-2 flex flex-col gap-4 bg-white p-3 rounded-xl shadow-sm transition-all">
                    <Link href={`/dars/${dar._id}/update`}>
                        <Image src="/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <DeleteConfirm darId={dar._id} />
                </div>
            )}

             <Link href={`/dars/${dar._id}`}
                   className="flex flex-col gap-3 p-5 min-h-[230px] md:gap-4">
                <div className="flex gap-2">
                    <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">{dar.price}</span>
                    <p className="p-semibold-14 rounded-full w-min bg-gray-500/10 px-4 py-1 text-gray-500">{dar.category.name}</p>
                </div>
                <p className="p-medium-16 p-medium-18 text-gray-500">{formatDateTime(dar.freeDateTime).dateTime}</p>
                <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{dar.title}</p>
                <div className="flex-between w-full">
                    <p className="p-medium-14 md:p-medium-16 text-gray-600">{dar.user.firstName} {dar.user.lastName}</p>
                </div>
             </Link>

        </div>
    )
}

export default Card;