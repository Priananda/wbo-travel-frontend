import { redirect } from "next/navigation";

export default function HomeUsers() {
  redirect("/users/dashboard");
}
