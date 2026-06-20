export function showLoader(loader) {
    loader.style.display = "block";
}

export function hideLoader(loader) {
    loader.style.display = "none";
}

export function getProxyUrl(url) {
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
}