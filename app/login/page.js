import Login from "../components/Login";
import Navbar from "../components/navbar";
export const metadata = {
    title: 'Login Page',
    description: 'Login',
}
export default function Home() {
    return (
        <main className="min-h-screen">
            <Login/>
        </main>);
}
