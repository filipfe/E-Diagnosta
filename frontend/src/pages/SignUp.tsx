import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <section className="padding pt-[1in] flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <Link to="/rejestracja/klient" className="flex flex-col p-6 items-center rounded shadow-md gap-4">
                    <img src="./oijafe.png" alt="" />
                    <h3 className="font-semibold text-xl">Jestem klientem</h3>
                </Link>
                <div className="w-full h-[1px] bg-primary md:w-[1px] md:h-[2in]" />
                <Link to='/rejestracja/skp' className="flex flex-col p-6 items-center rounded shadow-md gap-4">
                    <img src="./oijafe.png" alt="" />
                    <h3 className="font-semibold text-xl">Reprezentuję stację kontroli pojazdów</h3>
                </Link>
            </div>
        </section>
    )
}