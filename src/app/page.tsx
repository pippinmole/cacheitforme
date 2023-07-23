import {getServerSession} from "next-auth";
import SplashScreen from "@/components/homepage/SplashScreen";
import {authOptions} from "@/lib/auth";
import FeatureSection from "@/components/homepage/FeatureSection";

export default async function Homepage() {
  const session = await getServerSession(authOptions)

  console.log("Session: " + session)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SplashScreen />

      <FeatureSection/>
    </main>
  )
}
