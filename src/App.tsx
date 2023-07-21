import {ChangeEvent, useState} from "react";
import { CookieGrabber } from "./components";
import { Zap } from "lucide-react";

const currencyFormat = (number: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return formatter.format(number);
};

const App = () => {
	const [budget, setBudget] = useState<number>(0);
	const [packageDefault, setPackageDefault] = useState<number>(4.99);
	const [packageCode, setPackageCode] = useState<string>("BOOSTER_COOKIE");

	const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBudget(isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value));
	};

	const handlePackageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPackageDefault(parseFloat(event.target.value));
	};

	return (
		<>
			<div className="absolute top-2 right-2">
				<a href="https://nanos.club" target="norel noopen" className="p-3 flex bg-neutral-800 border border-neutral-700 rounded-full">
					<Zap size="16" className="stroke-yellow-500" />
				</a>
			</div>
			<div className="grid place-items-center mt-[30dvh]">
				<form className="flex flex-col gap-5">
					<input id="budget" name="budget" type="number" placeholder="Budget" className="p-2 bg-neutral-700/50 rounded-md focus:rounded-md" value={budget === 0 ? "" : budget} onChange={handleBudgetChange} />
					<input id="sac" name="sac" type="checkbox" />
					<div className="flex flex-row gap-5">
						<p>Package:</p>
						<label>
							<input
								type="radio"
								name="radial"
								value="4.99"
								checked={packageDefault === 4.99}
								onChange={handlePackageChange}
							/>
							$4.99
						</label>
						<label>
							<input
								type="radio"
								name="radial"
								value="9.99"
								checked={packageDefault === 9.99}
								onChange={handlePackageChange}
							/>
							$9.99
						</label>
						<label>
							<input
								type="radio"
								name="radial"
								value="24.99"
								checked={packageDefault === 24.99}
								onChange={handlePackageChange}
							/>
							$24.99
						</label>
						<label>
							<input
								type="radio"
								name="radial"
								value="49.99"
								checked={packageDefault === 49.99}
								onChange={handlePackageChange}
							/>
							$49.99
						</label>
						<label>
							<input
								type="radio"
								name="radial"
								value="99.99"
								checked={packageDefault === 99.99}
								onChange={handlePackageChange}
							/>
							$99.99
						</label>
					</div>
				</form>
				<CookieGrabber />
			</div>
		</>
	);
};

export default App;
