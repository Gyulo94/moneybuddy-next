import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProfile } from "@/lib/actions/user.actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CheckPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  console.log("auth", session);

  const getMe = await getProfile(session?.user.email);
  return (
    <div className="container mx-auto h-screen border flex justify-center gap-2">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[500px]">ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>이메일 인증 유무</TableHead>
              <TableHead>Oauth</TableHead>
              <TableHead>ROLE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={getMe.id}>
              <TableCell className="font-medium">{getMe.id}</TableCell>
              <TableCell>{getMe.name}</TableCell>
              <TableCell>{getMe.email}</TableCell>
              <TableCell>{getMe.isEmailVerified ? "O" : "X"}</TableCell>
              <TableCell>
                {getMe.google ? "google" : getMe.kakao ? "kakao" : "local"}
              </TableCell>
              <TableCell>{getMe.role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
