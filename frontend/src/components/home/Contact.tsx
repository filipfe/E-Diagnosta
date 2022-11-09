export default function Contact() {
    return (
        <section className="padding bg-primary min-h-[4in] mb-[2in] flex flex-col relative xl:flex-row xl:justify-between items-center">
            <h2 className="flex flex-col gap-2 text-white mb-8">
                <span className="font-semibold">Skontaktuj się z nami</span>
                <span className="font-bold text-4xl">za pomocą formularza</span>
            </h2>
            <div className="bg-white rounded-xl py-10 px-8 xl:absolute xl:right-[12vw] xl:top-[30%] 2xl:right-[18vw] xl:max-w-[40%] flex flex-col gap-6 shadow-[0px_0px_81px_rgba(15,50,235,0.07)]">
                <h3 className="font-bold text-xl">Masz jakieś pytania?</h3>
                <form className="flex flex-col md:grid grid-cols-2 gap-4">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                    <textarea className="col-span-2" name="message" id="message"></textarea>
                    <button className="bg-font transition-colors w-max font-medium hover:bg-darkPrimary text-white rounded flex items-center py-3 px-6">Wyślij formularz</button>
                </form>
            </div>
        </section>
    )
}