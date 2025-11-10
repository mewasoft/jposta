const u = (o, s, p) => {
  const i = o[s];
  return i ? typeof i == "function" ? i() : Promise.resolve(i) : new Promise((t, r) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(r.bind(null, new Error("Unknown variable dynamic import: " + s + (s.split("/").length !== p ? ". Note that variables only represent file names one level deep." : ""))));
  });
}, a = {
  host: ""
}, e = a, c = [
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
  "沖縄県"
], l = async (o) => {
  if (o.length !== 7 && o.length !== 8)
    throw new Error(`Zip code must be 7 or 8 characters: ${o}`);
  if (o.length === 8 && !/^\d{3}-\d{4}$/.test(o))
    throw new Error(`Invalid zip code: ${o}`);
  if (o.length === 7 && !/^\d{7}$/.test(o))
    throw new Error(`Invalid zip code: ${o}`);
  const s = o.replace("-", ""), p = s.slice(0, 2), i = await f(p);
  if (!i || !i[s])
    return null;
  const [t, r, z, m] = i[s], n = c[t - 1];
  if (typeof t != "number" || typeof r != "number" || typeof z != "string" || typeof m != "string" || typeof n != "string")
    throw new Error(`Internal error data broken: ${i[s]}`);
  return {
    pref: n,
    prefNum: t,
    cityCode: r,
    city: z,
    area: m || void 0
  };
}, f = async (o) => {
  if (e.host !== "") {
    const { default: p } = await import(`${e.host}/z${o}.json`);
    return p;
  }
  const { default: s } = await u(/* @__PURE__ */ Object.assign({ "./zips/z00.json": () => import("./z00-2hTTOIjv.js"), "./zips/z01.json": () => import("./z01-_ejNSEkp.js"), "./zips/z02.json": () => import("./z02-BzA_h5IH.js"), "./zips/z03.json": () => import("./z03-D7GPAFjf.js"), "./zips/z04.json": () => import("./z04-z2wQSvxf.js"), "./zips/z05.json": () => import("./z05-Bgyosesk.js"), "./zips/z06.json": () => import("./z06-CTFdiRVr.js"), "./zips/z07.json": () => import("./z07-BpP-SoT9.js"), "./zips/z08.json": () => import("./z08-99ZBbLAs.js"), "./zips/z09.json": () => import("./z09-Ba5Uv9th.js"), "./zips/z10.json": () => import("./z10-B1Vzj5VG.js"), "./zips/z11.json": () => import("./z11-3SZSasOe.js"), "./zips/z12.json": () => import("./z12-BAIpMqAc.js"), "./zips/z13.json": () => import("./z13-BuAyVXcE.js"), "./zips/z14.json": () => import("./z14-BKPpnIIh.js"), "./zips/z15.json": () => import("./z15-vcNxuASB.js"), "./zips/z16.json": () => import("./z16-CZ0n_qdT.js"), "./zips/z17.json": () => import("./z17-BYyQDnqi.js"), "./zips/z18.json": () => import("./z18-BKEPQCeP.js"), "./zips/z19.json": () => import("./z19-B_y18hC1.js"), "./zips/z20.json": () => import("./z20-DljK8_Y_.js"), "./zips/z21.json": () => import("./z21-CpRY3tl-.js"), "./zips/z22.json": () => import("./z22-C0xpJmfT.js"), "./zips/z23.json": () => import("./z23-B5hJifW_.js"), "./zips/z24.json": () => import("./z24-BZUO6IJ9.js"), "./zips/z25.json": () => import("./z25-BlOZSTNg.js"), "./zips/z26.json": () => import("./z26-Cv-5UNnu.js"), "./zips/z27.json": () => import("./z27-BzNJ7WMf.js"), "./zips/z28.json": () => import("./z28-Dxy3S0G1.js"), "./zips/z29.json": () => import("./z29-BeDaGzyy.js"), "./zips/z30.json": () => import("./z30-BeeRYZ1T.js"), "./zips/z31.json": () => import("./z31-DRtTGYH-.js"), "./zips/z32.json": () => import("./z32-C08UI6jW.js"), "./zips/z33.json": () => import("./z33-_emCkwzy.js"), "./zips/z34.json": () => import("./z34-BRqo20d1.js"), "./zips/z35.json": () => import("./z35-DmUnc2sv.js"), "./zips/z36.json": () => import("./z36-lbHtDhXL.js"), "./zips/z37.json": () => import("./z37-DrRyrN4O.js"), "./zips/z38.json": () => import("./z38-CjSPj_71.js"), "./zips/z39.json": () => import("./z39-DygvtizI.js"), "./zips/z40.json": () => import("./z40-GaT6AfGA.js"), "./zips/z41.json": () => import("./z41-B-honsia.js"), "./zips/z42.json": () => import("./z42-BABF7zvd.js"), "./zips/z43.json": () => import("./z43-CFvkqQ1H.js"), "./zips/z44.json": () => import("./z44-CYEW98sw.js"), "./zips/z45.json": () => import("./z45-Cl438dwM.js"), "./zips/z46.json": () => import("./z46-BLpjUvrY.js"), "./zips/z47.json": () => import("./z47-CkCGxZZA.js"), "./zips/z48.json": () => import("./z48-BUk1_8rb.js"), "./zips/z49.json": () => import("./z49-DZ4ew0sV.js"), "./zips/z50.json": () => import("./z50-Bn_nfijn.js"), "./zips/z51.json": () => import("./z51-tn3Kn1qm.js"), "./zips/z52.json": () => import("./z52-BSTptxH5.js"), "./zips/z53.json": () => import("./z53-BHtZViYX.js"), "./zips/z54.json": () => import("./z54-BRDZF7O8.js"), "./zips/z55.json": () => import("./z55-Bcm0CSx4.js"), "./zips/z56.json": () => import("./z56-Cxs6xwgh.js"), "./zips/z57.json": () => import("./z57-DuHA45uO.js"), "./zips/z58.json": () => import("./z58-BYvn4PNA.js"), "./zips/z59.json": () => import("./z59-Bqq_35UK.js"), "./zips/z60.json": () => import("./z60-CNEEC-p_.js"), "./zips/z61.json": () => import("./z61-oLp1fAyL.js"), "./zips/z62.json": () => import("./z62-DWr2Sk56.js"), "./zips/z63.json": () => import("./z63-BbHOwKPJ.js"), "./zips/z64.json": () => import("./z64-CGDJX6eX.js"), "./zips/z65.json": () => import("./z65-Bn1SFt6j.js"), "./zips/z66.json": () => import("./z66-rYacn4wJ.js"), "./zips/z67.json": () => import("./z67-Bu9UPB_m.js"), "./zips/z68.json": () => import("./z68-D_fbqsLg.js"), "./zips/z69.json": () => import("./z69-BOZ_JGoc.js"), "./zips/z70.json": () => import("./z70-BjeAkhNh.js"), "./zips/z71.json": () => import("./z71-gIHnyb-J.js"), "./zips/z72.json": () => import("./z72-Dtf39UN5.js"), "./zips/z73.json": () => import("./z73-C1PVQCh-.js"), "./zips/z74.json": () => import("./z74-Bt9dSrTt.js"), "./zips/z75.json": () => import("./z75-Dxg298gC.js"), "./zips/z76.json": () => import("./z76-BBzfHrcs.js"), "./zips/z77.json": () => import("./z77-poi982XH.js"), "./zips/z78.json": () => import("./z78-KtAoTkdI.js"), "./zips/z79.json": () => import("./z79-DX5jgWMl.js"), "./zips/z80.json": () => import("./z80-ChfKhQuM.js"), "./zips/z81.json": () => import("./z81-D3KKv6i_.js"), "./zips/z82.json": () => import("./z82-DhUGIte9.js"), "./zips/z83.json": () => import("./z83-BKRUuHrr.js"), "./zips/z84.json": () => import("./z84-BlfxKcvW.js"), "./zips/z85.json": () => import("./z85-BiIf8zNW.js"), "./zips/z86.json": () => import("./z86-GaFINbFs.js"), "./zips/z87.json": () => import("./z87-L_iEuKbp.js"), "./zips/z88.json": () => import("./z88-BuPacNDG.js"), "./zips/z89.json": () => import("./z89-BDtIt7sV.js"), "./zips/z90.json": () => import("./z90-CPSzSF7a.js"), "./zips/z91.json": () => import("./z91-CLUgaAwo.js"), "./zips/z92.json": () => import("./z92-D6xY6Upc.js"), "./zips/z93.json": () => import("./z93-DfS4Kh-5.js"), "./zips/z94.json": () => import("./z94-B4l5sOxM.js"), "./zips/z95.json": () => import("./z95-BKZUYd7t.js"), "./zips/z96.json": () => import("./z96-DbBKeZTb.js"), "./zips/z97.json": () => import("./z97-Dp9nUTC8.js"), "./zips/z98.json": () => import("./z98-Ukjnu72h.js"), "./zips/z99.json": () => import("./z99-DLoSb7jN.js") }), `./zips/z${o}.json`, 3);
  return s;
}, y = (o) => {
  e.host = o.host || a.host;
}, g = () => c.map((o, s) => ({
  key: String(s + 1).padStart(2, "0"),
  name: o
})), h = async (o) => {
  const s = typeof o == "string" ? parseInt(o) : o;
  if (!Number.isInteger(s) || s < 1 || s > 47)
    throw new Error(`Prefecture index must be an integer between 1 and 47: ${o}`);
  const p = /* @__PURE__ */ new Map();
  for (let i = 0; i <= 99; i++) {
    const t = i.toString().padStart(2, "0");
    try {
      const r = await f(t);
      if (!r)
        continue;
      for (const [, z] of Object.entries(r)) {
        const [m, n, j] = z;
        m === s && j && !p.has(n.toString()) && p.set(n.toString(), j);
      }
    } catch {
      continue;
    }
  }
  return Array.from(p.entries()).map(([i, t]) => ({ key: i, name: t })).sort((i, t) => parseInt(i.key) - parseInt(t.key));
};
export {
  y as configureJposta,
  l as getAddress,
  h as getCitiesByPref,
  g as getPrefs
};
