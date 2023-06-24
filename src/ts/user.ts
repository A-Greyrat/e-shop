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

    logout() {
        this.token = "";
    },

    forceLogout() {
        alert("登录已过期，请重新登录。");
        this.token = "";
        location.href = "/";
    },

    async getInfo() {
        try {
            var obj = await ajax.getUserInfo(this.token);
            if (obj.status=="200") return this.info = obj.data;
            else throw Error(obj.message);
        } catch (e) {
            console.log(e);
            this.forceLogout();
            return {
                username: "",
                avatar: "",
                addr: "",
                money: 0,
            };
        }
    },

    // url: 相对路径 必须从/backstage/开始
    getPermissionListFromPermission(permission: "CUSTOMER" | "BUSINESS" | "ROOT"): {
        type: "item" | "folder";
        text: string;
        url?: string;
        children?: any[];
    }[] {
        if (permission == "CUSTOMER") {
            return [
                {type: "item", text: "个人信息", url: "home"},
                {type: "item", text: "余额管理", url: "money"},
                {type: "item", text: "购买历史", url: "buyinghistory"},
            ]
        } else if (permission == "BUSINESS") {
            return [
                {type: "item", text: "个人信息", url: "home"},
                {type: "item", text: "商品管理", url: "goods"},
            ]
        } else if (permission == "ROOT") {
            return [
                {type: "item", text: "个人信息", url: "home"},
                {type: "item", text: "用户管理", url: "users"},
            ]
        } else {
            return [];
        }
    },

    async getBackstagePermissionList() {
        try {
            var permission = await ajax.getPermission(this.token);
            return this.getPermissionListFromPermission(permission);
        } catch (e) {
            console.log(e);
            return [];
        }
    },

    convertResultToTable(object: any) {
        if (!object || object[0] instanceof Array) return object;
        var names = [];
        var originHead = [];
        for (let n in object.key) {
            originHead.push(n);
            names.push(object.key[n]);
        }
        var allTable = [];
        allTable.push(names);
        for (let obj of object.data) {
            let line = [];
            for (let name in object.key) {
                line.push(obj[name]);
            }
            allTable.push(line);
        }
        return [originHead,allTable];
    },
};

user.token = localStorage.getItem("e-shop-usertoken") || "";
Subscription.createSubscriptions(user, ["token"]);
user.tokenSubscription.subscribe((token: string) => localStorage.setItem("e-shop-usertoken", token))

if (user.token) await user.getInfo();

export default user;