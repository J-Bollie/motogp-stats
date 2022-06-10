import axios from "axios";
import fs from "fs";
import { AppDataPath, getCountries } from "./utils";
import { IWinners } from "./interfaces";
import { getPaginationLimit } from "./utils";

const URI = "https://www.motogp.com/api/results-front/be/results-api/race-placements?category=e8c110ad-64aa-4e8e-8a86-f2f152f6a942";
let winners = <IWinners[]>[];

getCountries().then((response) => {
	const countries = response as any;

	getPaginationLimit().then(async (response) => {
		const pagination = response as number;

		for (let i = 1; i <= pagination; i++) {
			await axios({
				method: "GET",
				url: URI + "&page=" + i,
			}).then((response) => {
				response.data.data.forEach((element: any) => {
					const ridername = element.riderName || "";
					const circuit = element.circuit.name || "";
					const season = element.season.year || 0;

					const countrieISO = element.countryIso;
					const country = countries.find((country: any) => country.iso === countrieISO);

					winners.push({
						ridername: ridername,
						circuit: circuit,
						country: country,
						season: season,
					});
				});
			});
		}

		if (winners.length !== 0) {
			const data = JSON.stringify({
				results: winners.length,
				data: winners,
			});
			fs.writeFileSync(AppDataPath + "/motogp-winners.json", data);
		}
	});
});
