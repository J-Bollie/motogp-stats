import axios from "axios";

const URI = "https://www.motogp.com/api/results-front/be/results-api/race-placements?category=e8c110ad-64aa-4e8e-8a86-f2f152f6a942&page=1";

export const getPaginationLimit = () => {
	return new Promise((resolve, reject) => {
		axios({
			method: "GET",
			url: URI,
		})
			.then((response) => {
				resolve(response.data.pagination["Pagination-Total"]);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const getCountries = () => {
	return new Promise((resolve, reject) => {
		axios({
			method: "GET",
			url: "https://www.motogp.com/api/results-front/be/riders-api/countries",
		})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const AppDataPath =
	process.env.APPDATA || (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share");
