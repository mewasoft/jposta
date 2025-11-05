type JpostaConfig = {
	host: string;
};

const defaultConfig: JpostaConfig = {
	host: "",
};

const currentConfig = defaultConfig;

const prefs = [
	"北海道",
	"青森県",
	"岩手県",
	"宮城県",
	"秋田県",
	"山形県",
	"福島県",
	"茨城県",
	"栃木県",
	"群馬県",
	"埼玉県",
	"千葉県",
	"東京都",
	"神奈川県",
	"新潟県",
	"富山県",
	"石川県",
	"福井県",
	"山梨県",
	"長野県",
	"岐阜県",
	"静岡県",
	"愛知県",
	"三重県",
	"滋賀県",
	"京都府",
	"大阪府",
	"兵庫県",
	"奈良県",
	"和歌山県",
	"鳥取県",
	"島根県",
	"岡山県",
	"広島県",
	"山口県",
	"徳島県",
	"香川県",
	"愛媛県",
	"高知県",
	"福岡県",
	"佐賀県",
	"長崎県",
	"熊本県",
	"大分県",
	"宮崎県",
	"鹿児島県",
	"沖縄県",
];

export type Address = {
	pref: string;
	prefNum: number;
	city: string;
	area?: string;
};

export const getAddress = async (zipCode: string): Promise<Address | null> => {
	if (zipCode.length !== 7 && zipCode.length !== 8) {
		throw new Error(`Zip code must be 7 or 8 characters: ${zipCode}`);
	}
	if (zipCode.length === 8 && !/^\d{3}-\d{4}$/.test(zipCode)) {
		throw new Error(`Invalid zip code: ${zipCode}`);
	}
	if (zipCode.length === 7 && !/^\d{7}$/.test(zipCode)) {
		throw new Error(`Invalid zip code: ${zipCode}`);
	}

	const zip = zipCode.replace("-", "");
	const group = zip.slice(0, 2);
	const json = await fetchJson(group);

	if (!json || !json[zip]) {
		return null;
	}

	const [prefNum, city, area] = json[zip];
	const pref = prefs[prefNum - 1];

	if (
		typeof prefNum !== "number" ||
		typeof city !== "string" ||
		typeof area !== "string" ||
		typeof pref !== "string"
	) {
		throw new Error(`Internal error data broken: ${json[zip]}`);
	}

	return {
		pref: pref,
		prefNum: prefNum,
		city: city,
		area: area || undefined,
	};
};

const fetchJson = async (chunk: string) => {
	if (currentConfig.host !== "") {
		const { default: json } = await import(
			`${currentConfig.host}/z${chunk}.json`
		);
		return json;
	}

	const { default: json } = await import(`./zips/z${chunk}.json`);
	return json;
};

export const configureJposta = (config: Partial<JpostaConfig>) => {
	currentConfig.host = config.host || defaultConfig.host;
};

export const getPrefs = (): string[] => {
	return prefs;
};

export const getCitiesByPref = async (prefIndex: number): Promise<string[]> => {
	if (!Number.isInteger(prefIndex) || prefIndex < 1 || prefIndex > 47) {
		throw new Error(`Prefecture index must be an integer between 1 and 47: ${prefIndex}`);
	}

	const citiesSet = new Set<string>();

	// Load all JSON chunks (z00 to z99)
	for (let i = 0; i <= 99; i++) {
		const chunk = i.toString().padStart(2, '0');
		try {
			const json = await fetchJson(chunk);
			if (!json) continue;

			// Iterate through all postal codes in this chunk
			for (const [, addressData] of Object.entries(json)) {
				const [prefNum, city] = addressData as [number, string, string];
				if (prefNum === prefIndex && city) {
					citiesSet.add(city);
				}
			}
		} catch (error) {
			// Continue even if a chunk fails to load
			continue;
		}
	}

	// Convert Set to sorted array
	return Array.from(citiesSet).sort();
};
