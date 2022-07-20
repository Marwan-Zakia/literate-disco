const Borders = () => {
    return (
        <div className=" select-none absolute h-full top-0  ">
            {Array(24)
                .fill(0)
                .map((_, i) => (
                    <span
                        key={i}
                        className={`w-[2px]  h-full bg-[#ffe0e042]`}
                        style={{ position: "absolute", left: `${i * 180}px` }}></span>
                ))
            }
        </div >
    );
};


export default Borders;