const Header = ({ shops }) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 bg-blue-900 p-5 uppercase text-white">
            <div className="flex gap-2">
                {shops.map((shop) => (
                    <img className="aspect-square w-8" src={shop.logoUrl} />
                ))}
            </div>
            <a href="/">
                <h1>Product Finder</h1>
            </a>
        </div>
    );
};
export default Header;
