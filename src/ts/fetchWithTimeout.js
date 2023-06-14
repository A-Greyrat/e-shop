export default async function fetchWithT(url, opt) {
    const controller = new AbortController();
    const td = setTimeout(() => controller.abort(), opt && opt.timeout || 5000);
    const resp = await fetch(url, {...opt, signal: controller.signal});
    clearTimeout(td);
    return resp;
}
