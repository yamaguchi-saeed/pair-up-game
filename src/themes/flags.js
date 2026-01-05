//Flags themex
// All 271 flag codes - optimized and organized by region so i can see better, and made due to assets naming system
const flagCodes = [
  // Europe
  "ad","al","am","at","ax","az","ba","be","bg","by","ch","cy","cz",
  "de","dk","ee","es","es-ct","es-ga","es-pv","fi","fo","fr","gb","gb-eng","gb-nir","gb-sct","gb-wls",
  "ge","gi","gr","hr","hu","ie","im","is","it","je","gg","li","lt","lu","lv",
  "mc","md","me","mk","mt","nl","no","pl","pt","ro","rs","ru","se","si","sj","sk","sm","ua","va","xk",
  
  // Asia
  "ae","af","am","az","bd","bh","bn","bt","cn","ge","hk","id","il","in","iq","ir","jo","jp",
  "kg","kh","kp","kr","kw","ky","kz","la","lb","lk","mm","mn","mo","mv","my","np","om","ph","pk","ps",
  "qa","sa","sg","sy","th","tj","tl","tm","tr","tw","uz","vn","ye",
  
  // Africa
  "ao","bf","bi","bj","bw","cd","cf","cg","ci","cm","cv","dj","dz","eg","eh","er","et",
  "ga","gh","gm","gn","gq","gw","ke","km","lr","ls","ly","ma","mg","ml","mr","mu","mw","mz",
  "na","ne","ng","re","rw","sc","sd","sh","sh-ac","sh-hl","sh-ta","sl","sn","so","ss","st","sz",
  "td","tg","tz","ug","za","zm","zw",
  
  // Americas
  "ag","ai","ar","aw","bb","bl","bm","bo","bq","br","bs","bz","ca","cl","co","cr","cu","cw",
  "dm","do","ec","fk","gd","gf","gl","gp","gs","gt","gu","gy","hn","ht","jm","kn","ky","lc",
  "mf","mq","ms","mx","ni","pa","pe","pm","pn","pr","py","sr","sv","sx","tc","tt","us","uy",
  "vc","ve","vg","vi",
  
  // Oceania
  "as","au","cc","ck","cx","fj","fm","gu","hm","ki","mh","mp","nc","nf","nr","nu","nz","pf",
  "pg","pn","pw","sb","tk","to","tv","um","vu","wf","ws",
  
  // International/Regional
  "un","eu","arab","asean","eac","cefta","pc","aq","bv","cp","dg","hm","io","tf","um","xx"
];

// Create flags array with public/Assets folder paths
const flags = flagCodes.map(code => ({
  id: code,
  name: code.toUpperCase(),
  src: `/Assets/flags/${code}.svg`,
}));

export default flags;

// Export count for debugging
export const flagCount = flags.length;