import { useEffect, useState } from "react";
import { CookieData } from "../types";

const useDataFetch = () => {
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

	return data;
};

export default useDataFetch;
