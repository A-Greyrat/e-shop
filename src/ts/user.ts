import ajax from "./ajax.js";
import Subscription from "./Subscription.js";

const user = {
    token: "",// test
    tokenSubscription: new Subscription(),

    info: {
        username: "",
        avatar: "",
        addr: "",
        money: 0,
    },

    async login(username: string, password: string): Promise<"OK" | "INVALID" | "NETWORK_ERROR"> {
        try {
            var token = await ajax.login(username, password);
        } catch (e) {
            console.log(e);
            return "NETWORK_ERROR";
        }
        if (!token) return "INVALID";
        this.token = token;
        return "OK";
    },

    logout() {
        this.token = "";
    },

    async getInfo() {
        return this.info = await ajax.getUserInfo(this.token);
    },

    async buy(gid: number, cnt: number) {
        return await ajax.buy(this.token, gid, cnt);
    }
};

// todo: 规范持久化
user.token = localStorage.getItem("e-shop-usertoken") || "";
Subscription.createSubscriptions(user, ["token"]);
user.tokenSubscription.subscribe((token: string) => localStorage.setItem("e-shop-usertoken",token))

if (user.token) await user.getInfo();

export default user;