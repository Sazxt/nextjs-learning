import Counter from "../components/home_page/counter-redux";
import Navbar from "../components/navbar";
export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar/>
            <div className="p-2">
                <Counter/>
            </div>
        </main>);;
}
