import { useEffect, useState } from "react";
import { CookieData } from "../types";

const coinFormat = (number: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return formatter.format(number);
};

const CookieGrabber = () => {
	const [data, setData] = useState<CookieData | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://api.hypixel.net/skyblock/bazaar");
				const json = await response.json();
				setData(json);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	const cookiePrice = data?.products.BOOSTER_COOKIE.quick_status.sellPrice || 0;

	return (
		<>
			<div className="mt-[40vh] grid place-items-center">
				<p>cookie prices rn fr</p>
				<p>{coinFormat(cookiePrice)}</p>
			</div>
		</>
	);
};

export default CookieGrabber;
