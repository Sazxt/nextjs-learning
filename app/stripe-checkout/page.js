
import { StripePayemnt } from "../components/home_page/stripepayment";
import Navbar from "../components/navbar";
export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar/>
            <div className="p-2">
                <StripePayemnt/>
            </div>
        </main>);;
}
