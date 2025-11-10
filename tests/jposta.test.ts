import { expect, test } from "vitest";
import { getAddress, getPrefs, getCitiesByPref, type City, type Pref } from "../lib";

test.each(["bomb", "aaa-bbbb", "123456a"])(
	"getAddress(%s) throws an error",
	async (zipCode) => {
		await expect(getAddress(zipCode)).rejects.toThrow();
	},
);

test.each(["1234567", "123-4567", "0001234"])(
	"getAddress(%s) returns null (actually not exists)",
	async (zipCode) => {
		const address = await getAddress(zipCode);
		expect(address).toBeNull();
	},
);

test.each`
	zipCode       | expected
	${"0700973"}  | ${"北海道旭川市４区３条"}
	${"004-0021"} | ${"北海道札幌市厚別区青葉町"}
	${"039-2189"} | ${"青森県上北郡おいらせ町青葉"}
	${"029-4504"} | ${"岩手県胆沢郡金ケ崎町永沢"}
	${"981-2173"} | ${"宮城県伊具郡丸森町天炉"}
	${"010-0833"} | ${"秋田県秋田市旭川新藤田東町"}
	${"999-8315"} | ${"山形県飽海郡遊佐町大蕨岡"}
	${"965-0031"} | ${"福島県会津若松市相生町"}
	${"100-6810"} | ${"東京都千代田区大手町ＪＡビル"}
	${"100-0001"} | ${"東京都千代田区千代田"}
	${"150-6208"} | ${"東京都渋谷区桜丘町渋谷サクラステージＳＨＩＢＵＹＡサイドＳＨＩＢＵＹＡタワー"}
	${"100-1701"} | ${"東京都青ヶ島村青ヶ島村一円"}
	${"300-1414"} | ${"茨城県稲敷市戌渡"}
	${"213-0014"} | ${"神奈川県川崎市高津区新作"}
	${"326-0808"} | ${"栃木県足利市本城"}
	${"270-1100"} | ${"千葉県我孫子市"}
	${"370-3571"} | ${"群馬県前橋市池端町"}
	${"401-0013"} | ${"山梨県大月市大月"}
	${"333-0865"} | ${"埼玉県川口市伊刈"}
	${"949-0112"} | ${"新潟県糸魚川市上路"}
	${"381-0042"} | ${"長野県長野市稲田"}
	${"939-0321"} | ${"富山県射水市青井谷"}
	${"928-0008"} | ${"石川県輪島市マリンタウン"}
	${"916-0262"} | ${"福井県丹生郡越前町宇須尾"}
	${"410-2103"} | ${"静岡県伊豆の国市エメラルドタウン"}
	${"501-0438"} | ${"岐阜県本巣郡北方町平成"}
	${"458-0818"} | ${"愛知県名古屋市緑区鳴海町"}
	${"518-0859"} | ${"三重県伊賀市上野相生町"}
	${"525-0068"} | ${"滋賀県草津市南草津プリムタウン"}
	${"602-0848"} | ${"京都府京都市上京区扇町"}
	${"671-1136"} | ${"兵庫県姫路市大津区恵美酒町"}
	${"557-0013"} | ${"大阪府大阪市西成区天神ノ森"}
	${"630-8037"} | ${"奈良県奈良市中町"}
	${"640-1363"} | ${"和歌山県海草郡紀美野町田"}
	${"682-0721"} | ${"鳥取県東伯郡湯梨浜町田後"}
	${"699-0763"} | ${"島根県出雲市大社町日御碕"}
	${"701-2623"} | ${"岡山県美作市英田青野"}
	${"736-0053"} | ${"広島県安芸郡海田町寿町"}
	${"744-0000"} | ${"山口県下松市"}
	${"769-0401"} | ${"香川県三豊市財田町財田上"}
	${"797-1603"} | ${"愛媛県大洲市河辺町横山"}
	${"779-1404"} | ${"徳島県阿南市阿瀬比町"}
	${"784-0034"} | ${"高知県安芸市赤野乙"}
	${"822-1324"} | ${"福岡県田川郡糸田町旭ケ丘"}
	${"843-0304"} | ${"佐賀県嬉野市嬉野町岩屋川内"}
	${"811-5301"} | ${"長崎県壱岐市芦辺町芦辺浦"}
	${"869-5561"} | ${"熊本県葦北郡芦北町芦北"}
	${"879-1138"} | ${"大分県宇佐市青森"}
	${"889-4303"} | ${"宮崎県えびの市池島"}
	${"893-2503"} | ${"鹿児島県肝属郡南大隅町根占横別府"}
	${"907-1801"} | ${"沖縄県八重山郡与那国町与那国"}
`("getAddress($zipCode) returns $expected", async ({ zipCode, expected }) => {
	const address = await getAddress(zipCode);
	expect(`${address?.pref}${address?.city}${address?.area || ""}`).toEqual(
		expected,
	);
	// Verify that cityCode is present and is a number
	expect(address?.cityCode).toBeDefined();
	expect(typeof address?.cityCode).toBe("number");
	expect(address?.cityCode).toBeGreaterThan(0);
});

test("getPrefs returns the list of prefectures with keys and names", () => {
	const prefs = getPrefs();
	const expectedPrefs: Pref[] = [
		{ key: "01", name: "北海道" },
		{ key: "02", name: "青森県" },
		{ key: "03", name: "岩手県" },
		{ key: "04", name: "宮城県" },
		{ key: "05", name: "秋田県" },
		{ key: "06", name: "山形県" },
		{ key: "07", name: "福島県" },
		{ key: "08", name: "茨城県" },
		{ key: "09", name: "栃木県" },
		{ key: "10", name: "群馬県" },
		{ key: "11", name: "埼玉県" },
		{ key: "12", name: "千葉県" },
		{ key: "13", name: "東京都" },
		{ key: "14", name: "神奈川県" },
		{ key: "15", name: "新潟県" },
		{ key: "16", name: "富山県" },
		{ key: "17", name: "石川県" },
		{ key: "18", name: "福井県" },
		{ key: "19", name: "山梨県" },
		{ key: "20", name: "長野県" },
		{ key: "21", name: "岐阜県" },
		{ key: "22", name: "静岡県" },
		{ key: "23", name: "愛知県" },
		{ key: "24", name: "三重県" },
		{ key: "25", name: "滋賀県" },
		{ key: "26", name: "京都府" },
		{ key: "27", name: "大阪府" },
		{ key: "28", name: "兵庫県" },
		{ key: "29", name: "奈良県" },
		{ key: "30", name: "和歌山県" },
		{ key: "31", name: "鳥取県" },
		{ key: "32", name: "島根県" },
		{ key: "33", name: "岡山県" },
		{ key: "34", name: "広島県" },
		{ key: "35", name: "山口県" },
		{ key: "36", name: "徳島県" },
		{ key: "37", name: "香川県" },
		{ key: "38", name: "愛媛県" },
		{ key: "39", name: "高知県" },
		{ key: "40", name: "福岡県" },
		{ key: "41", name: "佐賀県" },
		{ key: "42", name: "長崎県" },
		{ key: "43", name: "熊本県" },
		{ key: "44", name: "大分県" },
		{ key: "45", name: "宮崎県" },
		{ key: "46", name: "鹿児島県" },
		{ key: "47", name: "沖縄県" },
	];
	expect(prefs).toEqual(expectedPrefs);

	// Additional validation for structure
	expect(Array.isArray(prefs)).toBe(true);
	expect(prefs.length).toBe(47);
	prefs.forEach((pref: Pref) => {
		expect(pref).toHaveProperty('key');
		expect(pref).toHaveProperty('name');
		expect(typeof pref.key).toBe('string');
		expect(typeof pref.name).toBe('string');
		expect(pref.key).toMatch(/^\d{2}$/); // Should be zero-padded 2-digit string
	});
});

test.each([0, 48, -1, 1.5, "0", "48", "-1", "abc", "", null, undefined])(
	"getCitiesByPref(%s) throws an error for invalid prefecture index",
	async (prefIndex) => {
		await expect(getCitiesByPref(prefIndex as any)).rejects.toThrow();
	},
);

test("getCitiesByPref(13) returns Tokyo cities", async () => {
	const cities = await getCitiesByPref(13);
	const cityNames = cities.map((city: City) => city.name);
	expect(cityNames).toContain("千代田区");
	expect(cityNames).toContain("中央区");
	expect(cityNames).toContain("港区");
	expect(cityNames).toContain("新宿区");
	expect(cityNames).toContain("墨田区");
	expect(cityNames).toContain("江戸川区");
	expect(cityNames).toContain("江東区");
	expect(Array.isArray(cities)).toBe(true);
	expect(cities.length).toBeGreaterThan(20);
	// Check that cities have correct structure
	cities.forEach((city: City) => {
		expect(city).toHaveProperty('key');
		expect(city).toHaveProperty('name');
		expect(typeof city.key).toBe('string');
		expect(typeof city.name).toBe('string');
	});
	// Check that cities are sorted by key
	const sortedByKeys = [...cities].sort((a, b) => parseInt(a.key) - parseInt(b.key));
	expect(cities).toEqual(sortedByKeys);
});

test("getCitiesByPref(27) returns Osaka cities", async () => {
	const cities = await getCitiesByPref(27);
	const cityNames = cities.map((city: City) => city.name);
	expect(cityNames).toContain("大阪市中央区");
	expect(cityNames).toContain("大阪市北区");
	expect(cityNames).toContain("大阪市西区");
	expect(Array.isArray(cities)).toBe(true);
	expect(cities.length).toBeGreaterThan(30);
	// Check that cities are sorted by key
	const sortedByKeys = [...cities].sort((a, b) => parseInt(a.key) - parseInt(b.key));
	expect(cities).toEqual(sortedByKeys);
});

test("getCitiesByPref(1) returns Hokkaido cities", async () => {
	const cities = await getCitiesByPref(1);
	const cityNames = cities.map((city: City) => city.name);
	expect(cityNames).toContain("札幌市中央区");
	expect(cityNames).toContain("札幌市北区");
	expect(cityNames).toContain("函館市");
	expect(cityNames).toContain("旭川市");
	expect(Array.isArray(cities)).toBe(true);
	expect(cities.length).toBeGreaterThan(150);
	// Check that cities are sorted by key
	const sortedByKeys = [...cities].sort((a, b) => parseInt(a.key) - parseInt(b.key));
	expect(cities).toEqual(sortedByKeys);
});

test("getCitiesByPref returns unique cities only", async () => {
	const cities = await getCitiesByPref(13);
	const uniqueCityKeys = [...new Set(cities.map((city: City) => city.key))];
	const uniqueCityNames = [...new Set(cities.map((city: City) => city.name))];
	expect(cities.length).toBe(uniqueCityKeys.length);
	expect(cities.length).toBe(uniqueCityNames.length);
});

test("getCitiesByPref returns array for all valid prefecture indices", async () => {
	// Test a few more prefectures to ensure the function works generally
	const testCases = [
		{ index: 11, expectedCity: "さいたま市" }, // Saitama
		{ index: 14, expectedCity: "横浜市" }, // Kanagawa
		{ index: 23, expectedCity: "名古屋市" }, // Aichi
	];

	for (const { index, expectedCity } of testCases) {
		const cities = await getCitiesByPref(index);
		expect(Array.isArray(cities)).toBe(true);
		expect(cities.length).toBeGreaterThan(0);
		// Check that the expected city is in the results (may be exact match or part of a longer city name)
		expect(cities.some((city: City) => city.name.includes(expectedCity))).toBe(true);
		// Check structure
		cities.forEach((city: City) => {
			expect(city).toHaveProperty('key');
			expect(city).toHaveProperty('name');
			expect(typeof city.key).toBe('string');
			expect(typeof city.name).toBe('string');
		});
	}
});

test("getCitiesByPref accepts both string and number prefecture indices", async () => {
	// Test with number
	const citiesWithNumber = await getCitiesByPref(13);
	expect(citiesWithNumber.length).toBeGreaterThan(0);

	// Test with string number
	const citiesWithString = await getCitiesByPref("13");
	expect(citiesWithString.length).toBeGreaterThan(0);

	// Results should be identical
	expect(citiesWithNumber).toEqual(citiesWithString);

	// Test with other string numbers
	const citiesWithZeroPaddedString = await getCitiesByPref("01");
	expect(citiesWithZeroPaddedString.length).toBeGreaterThan(0);
	expect(citiesWithZeroPaddedString[0].name).toBe("札幌市中央区");
});
