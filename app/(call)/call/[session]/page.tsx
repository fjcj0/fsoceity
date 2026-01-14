const page = () => {
    if (process.env.NODE_ENV === 'production') return (
        <div className="w-screen h-screen flex items-center justify-center">
            <h1 className="text-white text-4xl">Under Development</h1>
        </div>
    )
    return (
        <div className="w-screen h-screen bg-[#161616] flex flex-col items-center justify-center">

        </div>
    );
}
export default page;