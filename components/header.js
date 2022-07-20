import { useState } from "react";

const Header = () => {
	const [defultViewHour, setDefultViewHour] = useState(8);
	return (
		
		<div className="grid grid-cols-[10.3%_1fr]">
			<div className="h-[60px]  bg-red-600 sticky left-0 z-50" >
			</div>
				<div className="flex sticky select-none top-0 z-30">
					{
						Array(24).fill().map((_, i) => (
							<span className="w-[180px] bg-slate-200 h-[60px]   z-40 " key={i}>
								<p className=" pl-4">{i}</p>
								<span style={{ position: "absolute", left: `${i * 180}px` }} className="  w-[2px] top-0  h-full bg-red-100 z-40">

								</span>
							</span>


						))}


				</div>
	
		</div>

	);
};
export default Header;
