import UserInfo from "@/components/shared/profile/user-info";
import { auth } from "@clerk/nextjs/server";


const ProfilePage = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  console.log(userId);


  return (
    <div className="m-14 grid grid-cols-6 grid-rows-6 justify-around gap-5">
      <div className="shrink-0 col-start-1 row-start-2 row-span-2 bg-green-200">
        <ul className="flex flex-col justify-evenly gap-4">
          <li>Personal Infos</li>
          <li>Messaging</li>
          <li>My DARS</li>
          <li>Logout</li>
        </ul>
      </div>
      <div className="col-start-3 row-start-1 col-span-4 row-span-6 bg-red-200 p-5">CONTAINER</div>
    </div>
  );
};

export default ProfilePage;
