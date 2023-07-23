import {getServerSession} from "next-auth";
import SplashScreen from "@/components/homepage/SplashScreen";
import {authOptions} from "@/lib/auth";

export default async function Homepage() {
  const session = await getServerSession(authOptions)

  console.log("Session: " + session)

  return (
    <SplashScreen />
  )
}
