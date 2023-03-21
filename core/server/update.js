const currentVersion = GetResourceMetadata(curName, "version", 0);

const config = {
    method: "get",
    headers: {
        "User-Agent": "request"
    },
};

async function fetchLatestRelease() {
    const request = await axios.get("https://api.github.com/repos/EinS4ckZwiebeln/IcarusAdvancedAnticheat/releases", config);
    return request.data[0].name.toString().slice(1);
}

async function checkForUpdates() {
    const latestRelease = await fetchLatestRelease();
    if (currentVersion != latestRelease) {
        console.log(`^1This version of Icarus is outdated. Please update to the latest version!\nLatest Version: ${latestRelease} | Current Version: ${currentVersion}`);
    }
}

checkForUpdates();