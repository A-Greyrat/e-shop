import ajax from "./ajax";
import Subscription from "./Subscription.js";

const mainController = {
    // todo: 登录状态持久化
    token: "",// test
    tokenSubscription: new Subscription(),
    async login(username: string, password: string): Promise<"OK" | "INVALID" | "NETWORK_ERROR"> {
        try {
            var token = await ajax.login(username,password);
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

    async getUserInfo() {
        return await ajax.getUserInfo(this.token);
    }
};

Subscription.createSubscriptions(mainController,["token"]);

export default mainController;