import Web3Login from "../components/home_page/web-login";
import Navbar from "../components/navbar";
export const metadata = {
    title: 'Web3 SmartContract',
    description: 'Login',
}
export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar/>
            <div className="p-2">
                <Web3Login/>
            </div>
        </main>);;
}
