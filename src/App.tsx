import { ChangeEvent, useState } from "react";
import { Zap } from "lucide-react";
import { useDataFetch } from "./hooks";
import logo from "./assets/images/cookie.png";

const coinFormat = (value: number): string => {
	const formattedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `SB$${formattedValue}`;
};

const App = () => {
	const data = useDataFetch();
	const [budget, setBudget] = useState<number>(0);
	const [gemBundle, setGemBundle] = useState<number>(4.99);
	const [gemCount, setGemCount] = useState<number>(0);
	const [usingSac, SetUsingSac] = useState<boolean>(false);

	const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBudget(isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value));
	};

	const handlePackageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setGemBundle(parseFloat(event.target.value));
		switch (event.target.value) {
			case "4.74":
				setGemCount(675);
				break;
			case "4.99":
				setGemCount(675);
				break;
			case "9.49":
				setGemCount(1350);
				break;
			case "9.99":
				setGemCount(1350);
				break;
			case "23.74":
				setGemCount(3375);
				break;
			case "24.99":
				setGemCount(3375);
				break;
			case "47.49":
				setGemCount(6750);
				break;
			case "49.99":
				setGemCount(6750);
				break;
			case "94.99":
				setGemCount(13500);
				break;
			case "99.99":
				setGemCount(13500);
				break;
			default:
				setGemCount(69);
				break;
		}
	};

	const handleSacChange = (event: ChangeEvent<HTMLInputElement>) => {
		SetUsingSac(event.target.checked);
	};

	const cookiePrice: number = data?.products.BOOSTER_COOKIE.quick_status.sellPrice ?? 0;
	const storeBundlesPurchasable = Math.floor(budget / gemBundle);
	const selectedBundle: number = Math.floor(storeBundlesPurchasable * gemCount) ?? 0;
	const purchasable12Pack: number = Math.abs((storeBundlesPurchasable * gemCount) / 3900) ?? 0;

	return (
		<>
			<div className="p-4 grid grid-cols-2 md:grid-cols-3">
				<div className="hidden md:block" />
				<div className="order-1 md:order-2 flex flex-row gap-2 items-center justify-self-center">
					<img className="w-10 h-10" src={logo} alt="Logo: Minecraft Cookie" />
					<h1 className="text-xl">Cookie Calculator</h1>
				</div>
				<div className="order-2 md:order-3 group flex flex-row items-center justify-self-end">
					<div className="group-hover:block hidden p-2 pl-4 pr-12 -mr-10 bg-neutral-900 border border-neutral-700 rounded-full">
						<p className="text-xs text-neutral-400 font-medium">nanos.club</p>
					</div>
					<a href="https://nanos.club" target="norel noopen" className="p-3 flex bg-neutral-800 border border-neutral-700 rounded-full">
						<Zap size="16" className="stroke-yellow-500" />
					</a>
				</div>
			</div>
			<div className="w-[90%] mx-auto grid place-items-center mt-[30dvh]">
				<form className="p-4 mb-5 flex flex-col gap-5 bg-neutral-800 rounded-xl">
					<div className="flex flex-row gap-2 items-center">
						<input id="budget" name="budget" type="number" step="5" placeholder="My Budget" className="flex-grow p-2 bg-neutral-700/50 rounded-md focus:rounded-md" value={budget === 0 ? "" : budget} onChange={handleBudgetChange} />
						<div className="bg-neutral-700/50 p-2 rounded-md">
							<span className="text-neutral-400">USD</span>
						</div>
					</div>
					<div className="flex flex-row gap-5">
						<label className="flex flex-row gap-2 items-center">
							<input id="sac" name="sac" type="checkbox" checked={usingSac} onChange={handleSacChange} />
							<span>Support a Creator?</span>
						</label>
						<div className="bg-neutral-700 w-0.5 rounded-full" />
						<div className="flex flex-col md:flex-row md:gap-2 items-center">
							<p>Package:</p>
							<select value={usingSac ? gemBundle : ""} onChange={handlePackageChange}>
								<option value={usingSac ? 4.74 : 4.99}>
									{usingSac ? "$4.74" : "$4.99"}
								</option>
								<option value={usingSac ? 9.49 : 9.99}>
									{usingSac ? "$9.49" : "$9.99"}
								</option>
								<option value={usingSac ? 23.74 : 24.99}>
									{usingSac ? "$23.74" : "$24.99"}
								</option>
								<option value={usingSac ? 47.49 : 49.99}>
									{usingSac ? "$47.49" : "$49.99"}
								</option>
								<option value={usingSac ? 94.99 : 99.99}>
									{usingSac ? "$94.99" : "$99.99"}
								</option>
							</select>
						</div>
					</div>
				</form>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col md:flex-row gap-2 justify-between items-center bg-neutral-800 rounded-xl p-4">
						<p>Rough Estimate:</p>
						<span>{coinFormat(Math.floor((selectedBundle * purchasable12Pack) * cookiePrice))}</span>
					</div>
					<span className="text-xs text-center text-neutral-400">this tool becomes inaccurate when over ~$100-$200</span>
				</div>
			</div>
		</>
	);
};

export default App;
