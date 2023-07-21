import { useDataFetch } from "../hooks";

const coinFormat = (value: number): string => {
	const formattedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `SB$${formattedValue}`;
};

const CookieGrabber = () => {
	const data = useDataFetch();

	return (
		<p>{coinFormat(data?.products.BOOSTER_COOKIE.quick_status.sellPrice || 0)}</p>
	);
};

export default CookieGrabber;
