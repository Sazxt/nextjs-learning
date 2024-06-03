import TeamComponent from "../components/home_page/team";
import Navbar from "../components/navbar";
export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar/>
            <div className="p-2">
                <TeamComponent/>
            </div>
        </main>);;
}
