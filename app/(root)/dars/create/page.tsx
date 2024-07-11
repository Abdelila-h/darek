import DarForm from "@/components/shared/dar-form";
import { auth } from "@clerk/nextjs/server";

const CreateDar = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    console.log(userId);

    return (
        <>
        <section className="bg-slate-50 py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">CREATE DAR</h3>
        </section>
        <div className="wrapper my-8">
            <DarForm userId={userId} type="Create" />
        </div>
        </>
    )
}

export default CreateDar;