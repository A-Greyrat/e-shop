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
            var resp = await ajax.login(username, password);
        } catch (e) {
            console.log(e);
            return "NETWORK_ERROR";
        }
        if (resp.status=="403") return "INVALID";
        this.token = resp.data;
        return "OK";
    },

    logout() {
        this.token = "";
    },

    forceLogout() {
        alert("登录已过期，请重新登录。");
        this.logout();
        location.href = "/";
    },

    async getInfo() {
        try {
            return this.info = await ajax.getUserInfo(this.token);
        } catch (e) {
            console.log(e);
            // todo
            // this.forceLogout();
        }
    },

    async getPermission() {
        try {
            return await ajax.getPermission(this.token);
        } catch (e) {
            console.log(e);
            // this.forceLogout();
        }
    },

    async getBackstagePermissionList() {
        try {
            var permission = await ajax.getPermission(this.token);
            return ajax.getPermissionListFromPermission(permission);
        } catch (e) {
            console.log(e);
            return [];
        }
    },

    async saveConfig(obj: any) {
        try {
            return await ajax.saveConfig(this.token,obj);
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    // customer
    async buy(gid: number, cnt: number) {
        try {
            return await ajax.buy(this.token, gid, cnt);
        } catch (e) {
            console.log(e);
            // this.forceLogout();
        }
    },

    async getMoneyInfo() {
        try {
            return await ajax.getMoneyInfo(this.token);
        } catch (e) {
            console.log(e);
            return [];
            // this.forceLogout();
        }
    },

    // business
    async getIncomes() {
        try {
            var incomes = await ajax.getIncomes(this.token);
            return incomes;
        } catch (e) {
            console.log(e);
            return [];
        }
    },

    async getGoodsManageTable() {
        try {
            var table = await ajax.getGoodsManageTable(this.token);
            return table;
        } catch (e) {
            console.log(e);
            return [];
        }
    },

    async deleteGoodsManageTableLines(lines: any[][]) {
        try {
            return await ajax.deleteGoodsManageTableLines(this.token,lines);
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    async addGoodsManageTableLines(lines: any[][]) {
        try {
            return await ajax.addGoodsManageTableLines(this.token,lines);
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    // manager
    async getUserTable() {
        try {
            return await ajax.getUserTable(this.token);
        } catch (e) {
            console.log(e);
            return [];
        }
    },

    async deleteUserTableLines(lines: string[][]) {
        try {
            return await ajax.deleteUserTableLines(this.token,lines);
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    async addUserTableLines(lines: string[][]) {
        try {
            return await ajax.addUserTableLines(this.token,lines);
        } catch (e) {
            console.log(e);
            return false;
        }
    },
};

user.token = localStorage.getItem("e-shop-usertoken") || "";
Subscription.createSubscriptions(user, ["token"]);
user.tokenSubscription.subscribe((token: string) => localStorage.setItem("e-shop-usertoken",token))

if (user.token) await user.getInfo();

export default user;