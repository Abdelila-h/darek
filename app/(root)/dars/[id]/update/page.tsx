import DarForm from "@/components/shared/dar-form";
import { getDarById } from "@/lib/actions/dar.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateDarProps = {
    params: {
        id: string
    }
}

const UpdateDar = async ( {params : { id }}: UpdateDarProps) => {

    const dar = await getDarById(id)
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">UPDATE DAR</h3>
        </section>
        <div className="wrapper my-8">
            <DarForm userId={userId} type="Update" darId={dar._id} dar={dar} />
        </div>
        </>
    )
}

export default UpdateDar;