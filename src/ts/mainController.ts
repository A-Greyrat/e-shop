import ajax from "./ajax";
// @ts-ignore
import {Subscription} from "./Subscription.js";

const mainController = {
    token: "",
    tokenSubscription: new Subscription(),
    async login(username: string, password: string): Promise<"OK" | "INVALID" | "NETWORK_ERROR"> {
        try {
            var obj = await ajax.login(username,password);
        } catch (e) {
            console.log(e);
            return "NETWORK_ERROR";
        }
        if (obj.statusCode!=200 || !obj.token) return "INVALID";
        this.token = obj.token;
        return "OK";
    }
};

mainController.tokenSubscription.bindProperty(mainController,"token");

export default mainController;