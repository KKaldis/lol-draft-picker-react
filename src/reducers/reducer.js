export const getChampions = (state) => {
    return state.state.champions
}

const reducer = (state = {}, action) => ({
    champions: ["AATROX", "AHRI", "AKALI", "ALISTAR", "AMUMU", "ANIVIA",
        "ANNIE", "APHELIOS", "ASHE", "AURELION SOL", "AZIR", "BARD", "BLITZCRANK",
        "BRAND", "BRAUM", "CAITLYN", "CAMILLE", "CASSIOPEIA", "CHO'GATH", "CORKI",
        "DARIUS", "DIANA", "DR. MUNDO", "DRAVEN", "EKKO", "ELISE", "EVELYNN", "EZREAL",
        "FIDDLESTICKS", "FIORA", "FIZZ", "GALIO", "GANGPLANK", "GAREN", "GNAR",
        "GRAGAS", "GRAVES", "GWEN", "HECARIM", "HEIMERDINGER", "ILLAOI", "IRELIA",
        "IVERN", "JANNA", "JARVAN IV", "JAX", "JAYCE", "JHIN", "JINX", "KAI'SA",
        "KALISTA", "KARMA", "KARTHUS", "KASSADIN", "KATARINA", "KAYLE", "KAYN", "KENNEN",
        "KHA'ZIX", "KINDRED", "KLED", "KOG'MAW", "LEBLANC", "LEE SIN", "LEONA", "LILLIA",
        "LISSANDRA", "LUCIAN", "LULU", "LUX", "MALPHITE", "MALZAHAR", "MAOKAI",
        "MASTER YI", "MISS FORTUNE", "MORDEKAISER", "MORGANA", "NAMI", "NASUS", "NAUTILUS",
        "NEEKO", "NIDALEE", "NOCTURNE", "NUNU & WILLUMP", "OLAF", "ORIANNA", "ORNN",
        "PANTHEON", "POPPY", "PYKE", "QIYANA", "QUINN", "RAKAN", "RAMMUS", "REK'SAI",
        "RELL", "RENEKTON", "RENGAR", "RIVEN", "RUMBLE", "RYZE", "SAMIRA", "SEJUANI",
        "SENNA", "SERAPHINE", "SETT", "SHACO", "SHEN", "SHYVANA", "SINGED", "SION",
        "SIVIR", "SKARNER", "SONA", "SORAKA", "SWAIN", "SYLAS", "SYNDRA", "TAHM KENCH",
        "TALIYAH", "TALON", "TARIC", "TEEMO", "THRESH", "TRISTANA", "TRUNDLE", "TRYNDAMERE",
        "TWISTED FATE", "TWITCH", "UDYR", "URGOT", "VARUS", "VAYNE", "VEIGAR", "VEL'KOZ",
        "VI", "VIEGO", "VIKTOR", "VLADIMIR", "VOLIBEAR", "WARWICK", "WUKONG", "XAYAH",
        "XERATH", "XIN ZHAO", "YASUO", "YONE", "YORICK", "YUUMI", "ZAC", "ZED", "ZIGGS",
        "ZILEAN", "ZOE", "ZYRA"
    ]

})


export default reducer