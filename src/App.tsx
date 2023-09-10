import { ChangeEvent, useState } from "react";
import { AlertCircle, Zap } from "lucide-react";
import { useDataFetch } from "./hooks";
import logo from "./assets/images/cookie.png";

const coinFormat = (value: number): string => {
	const formattedValue = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return `$${formattedValue}`;
};

const App = () => {
	const data = useDataFetch();
	const [budget, setBudget] = useState<number>(0);
	const [gemBundle, setGemBundle] = useState<number>(4.74);
	const [gemCount, setGemCount] = useState<number>(675);

	const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBudget(isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value));
	};

	const handlePackageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setGemBundle(parseFloat(event.target.value));
		switch (event.target.value) {
			case "4.74":
				setGemCount(675);
				break;
			case "9.49":
				setGemCount(1390);
				break;
			case "23.74":
				setGemCount(3600);
				break;
			case "47.49":
				setGemCount(7300);
				break;
			case "94.99":
				setGemCount(16400);
				break;
			default:
				setGemCount(675);
				break;
		}
	};
	console.log(gemBundle);

	const cookiePrice: number = Math.floor(data?.products.BOOSTER_COOKIE.quick_status.sellPrice ?? 0);
	const purchasableStoreBundles: number = Math.floor(budget / gemBundle) ?? 0;
	const multiplyGemStore: number = Math.floor(purchasableStoreBundles * gemCount) ?? 0;
	const purchasableCookies: number = Math.floor(multiplyGemStore / 325) ?? 0;
	const estimateTotal: number = Math.floor(purchasableCookies * cookiePrice);

	return (
		<>
			<header className="p-4 grid grid-cols-2 md:grid-cols-3">
				<div className="hidden md:block" />
				<div className="order-1 md:order-2 flex flex-row gap-2 items-center justify-self-center">
					<img className="w-10 h-10" src={logo} alt="Minecraft Cookie" />
					<h1 className="text-xl">Cookie Calculator</h1>
				</div>
				<a href="https://nanos.club" target="norel noopen" className="order-2 md:order-3 group flex flex-row items-center justify-self-end focus:outline-0">
					<div className="group-hover:block hidden p-2 pl-4 pr-12 -mr-10 bg-neutral-900 border border-neutral-700 rounded-full group-focus:outline">
						<p className="text-xs text-neutral-400 font-medium">nanos.club</p>
					</div>
					<div className="p-3 flex bg-neutral-800 border border-neutral-700 rounded-full group-focus:outline">
						<Zap size="16" className="stroke-yellow-500" />
					</div>
				</a>
			</header>
			<main className="w-[90%] mx-auto grid place-items-center mt-[25dvh]">
				<form className="min-w-[25rem] p-2 flex flex-col bg-neutral-800 border border-neutral-700 rounded-xl">
					<div className="flex flex-row items-center rounded-md">
						<input id="budget" name="budget" type="number" step="5" placeholder="My Budget" className="flex-grow p-2 bg-neutral-700/50 rounded-l-md focus:rounded-l-md" value={budget === 0 ? "" : budget} onChange={handleBudgetChange} />
						<div className="p-2 bg-neutral-700 rounded-r-md">
							<span className="text-neutral-400">USD</span>
						</div>
					</div>
					<div className="flex flex-row justify-center gap-5 mt-5">
						<div className="flex flex-row gap-2 items-center">
							<p>Package:</p>
							<select value={gemBundle} onChange={handlePackageChange}>
								<option className="text-black" value="4.74">
									$4.74
								</option>
								<option className="text-black" value="9.49">
									$9.49
								</option>
								<option className="text-black" value="23.74">
									$23.74
								</option>
								<option className="text-black" value="47.49">
									$47.49
								</option>
								<option className="text-black" value="94.99">
									$94.99
								</option>
							</select>
						</div>
						<div className="w-0.5 bg-neutral-700 rounded-full" />
						<p className="text-neutral-400">{gemCount} Gems</p>
					</div>
					<span className="mt-3 text-xs text-center text-neutral-400">Be sure to use a Support a Creator code for 5% off!</span>
					<div className="h-0.5 my-2 bg-neutral-700 rounded-full" />
					<div className="flex flex-row justify-center gap-2">
						<p>Roughly:</p>
						<span className={estimateTotal > 1 ? "text-emerald-400" : "text-neutral-400"}>{coinFormat(estimateTotal)}</span>
					</div>
				</form>
				<div className="mt-5 p-2 pr-3 flex flex-row gap-2 bg-red-500/10 border border-red-600 rounded-full">
					<AlertCircle size="16" className="stroke-red-500" />
					<p className="text-xs text-center text-red-500">
						this tool may become inaccurate when using a budget over ~$100
					</p>
				</div>
			</main>
		</>
	);
};

export default App;
