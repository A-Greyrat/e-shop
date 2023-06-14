export default async function fetchWithT(url,opt) {
    var controller = new AbortController();
    var td = setTimeout(() => controller.abort(),opt.timeout ?? 5000);
    var resp = await fetch(url,{ ...opt, signal: controller.signal });
    clearTimeout(td);
    return resp;
}