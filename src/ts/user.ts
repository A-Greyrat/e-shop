import ajax from "./ajax.js";
import Subscription from "./Subscription.js";

const user = {
    // todo: 登录状态持久化
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

Subscription.createSubscriptions(user, ["token"]);
if (user.token) user.getInfo();

export default user;