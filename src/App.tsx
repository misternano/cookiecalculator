import { ChangeEvent, useState } from "react";
import { Zap } from "lucide-react";
import { useDataFetch } from "./hooks";

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

	const handlePackageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
			<div className="absolute top-2 right-2">
				<a href="https://nanos.club" target="norel noopen" className="p-3 flex bg-neutral-800 border border-neutral-700 rounded-full">
					<Zap size="16" className="stroke-yellow-500" />
				</a>
			</div>
			<div className="grid place-items-center mt-[30dvh]">
				<form className="p-4 mb-5 flex flex-col gap-5 bg-neutral-800 rounded-xl">
					<div className="flex flex-row gap-5 justify-between">
						<input id="budget" name="budget" type="number" placeholder="Budget" className="flex-grow p-2 bg-neutral-700/50 rounded-md focus:rounded-md" value={budget === 0 ? "" : budget} onChange={handleBudgetChange} />
						<label className="flex flex-row gap-1 items-center">
							<input id="sac" name="sac" type="checkbox" checked={usingSac} onChange={handleSacChange} />
							<span>Support a Creator?</span>
						</label>
					</div>
					<div className="flex flex-row gap-5">
						<p>Package:</p>
						<label className="flex flex-row gap-1">
							<input
								type="radio"
								name="radial"
								value={usingSac ? 4.74 : 4.99}
								checked={usingSac ? gemBundle === 4.74 : gemBundle === 4.99}
								onChange={handlePackageChange}
							/>
							<span>{usingSac ? "$4.74" : "$4.99"}</span>
						</label>
						<label className="flex flex-row gap-1">
							<input
								type="radio"
								name="radial"
								value={usingSac ? 9.49 : 9.99}
								checked={usingSac ? gemBundle === 9.49 : gemBundle === 9.99}
								onChange={handlePackageChange}
							/>
							<span>{usingSac ? "$9.49" : "$9.99"}</span>
						</label>
						<label className="flex flex-row gap-1">
							<input
								type="radio"
								name="radial"
								value={usingSac ? 23.74 : 24.99}
								checked={usingSac ? gemBundle === 23.74 : gemBundle === 24.99}
								onChange={handlePackageChange}
							/>
							<span>{usingSac ? "$23.74" : "$24.99"}</span>
						</label>
						<label className="flex flex-row gap-1">
							<input
								type="radio"
								name="radial"
								value={usingSac ? 47.49 : 49.99}
								checked={usingSac ? gemBundle === 47.49 : gemBundle === 49.99}
								onChange={handlePackageChange}
							/>
							<span>{usingSac ? "$47.49" : "$49.99"}</span>
						</label>
						<label className="flex flex-row gap-1">
							<input
								type="radio"
								name="radial"
								value={usingSac ? 94.99 : 99.99}
								checked={usingSac ? gemBundle === 94.99 : gemBundle === 99.99}
								onChange={handlePackageChange}
							/>
							<span>{usingSac ? "$94.99" : "$99.99"}</span>
						</label>
					</div>
				</form>
				<div className="flex flex-col gap-5">
					<div className="flex flex-row gap-5 justify-between">
						<p>Rough Estimate:</p>
						<span>{coinFormat(Math.floor((selectedBundle * purchasable12Pack) * cookiePrice))}</span>
					</div>
					<span className="text-xs text-neutral-400">this tool becomes inaccurate when over ~$100-$200</span>
				</div>
			</div>
		</>
	);
};

export default App;
