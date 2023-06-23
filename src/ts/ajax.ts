import fetchWithT from "./fetchWithTimeout";

const TEST = false;
const SERVER_URL = "http://10.133.23.122:8082";

const account = {
    async login(username: string, password: string): Promise<{ status: string, data: string }> {
        if (ajax.TEST) return {
            status: "200",
            data: "123"
        }
        const retObj = await fetchWithT(ajax.serverUrl + "/api/login", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(x => x.json());
        return retObj;
    },

    async getUserInfo(token: string): Promise<{ username: string, avatar: string, addr: string, money: number }> {
        if (ajax.TEST) return {
            username: "haha",
            avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
            addr: "地址",
            money: 1
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/userinfo?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            retObj.data.avatar = ajax.serverUrl + retObj.data.avatar;
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async getBusinessInfoByGid(gid: number): Promise<{
        avatar: string,
        name: string,
        goodsRank: number,
        businessRank: number,
    }> {
        if (ajax.TEST) return {
            avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
            name: "商家A",
            goodsRank: 4.9,
            businessRank: 5.0,
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/businessInfo?gid=${gid}`).then(x => x.json());
        if (retObj.status == "200") {
            retObj.data.avatar = ajax.serverUrl + retObj.data.avatar;
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // async getBackstagePermissionList(token: string): Promise<{
    //     type: "item" | "folder";
    //     text: string;
    //     url: string;
    //     children: SideBarJSCell[];
    // }> {

    // }
    async getPermission(token: string): Promise<"CUSTOMER" | "BUSINESS" | "ROOT"> {
        if (ajax.TEST) {
            return "CUSTOMER";
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/permission?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
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

    async saveConfig(token: string, obj: {
        name?: string;
        avatar?: Blob;
        addr?: string;
        pwd?: string;
    }) {
        if (ajax.TEST) return true;
        const fd = new FormData();
        fd.append("token", token);

        console.log(obj)
        if (obj.name) fd.append("name", obj.name);
        if (obj.avatar) {
            fd.append("avatar", obj.avatar);
        }
        if (obj.addr) fd.append("addr", obj.addr);
        if (obj.pwd) fd.append("pwd", obj.pwd);
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/api/config`,
            {
                method: "post",
                body: fd
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // customer
    async buy(token: string, gid: number, cnt: number): Promise<{status: number,data?: "",message?: string}> {
        if (ajax.TEST) return {
            status: 200,
        };
        return await fetchWithT(`${ajax.serverUrl}/api/buy?token=${encodeURIComponent(token)}&gid=${gid}&cnt=${cnt}`).then(x => x.json());
    },

    async getBuyingHistory(token: string): Promise<any[][]> {
        if (ajax.TEST) {
            return [["商品名称","商品价格","购买数量","商家名称","购买时间"], ["a","b","c","d","e"], ["a","b","c","d","e"], ["a","b","c","d","e"]];
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/purchasehistory?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async getMoneyInfo(token: string): Promise<number[]> {
        if (ajax.TEST) {
            return [50, 30.5];
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/moneyinfo?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // business
    async getIncomes(token: string): Promise<number[]> {
        if (ajax.TEST) {
            return [5, 3.5];
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/business/incomes?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async getGoodsManageTable(token: string) {
        if (ajax.TEST) {
            return {
                data: [
                    {gid: 1,name: "a",price: 2,tags: "jfs;asdf"}
                ],
                key: {
                    gid: "封面",
                    name: "名称",
                    price: "价格",
                    tags: "标签",
                }
            }
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/business/goodsTable?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // line: ["name","price","tags":['tag']]
    async deleteGoodsManageTableLines(token: string, lines: any) {
        console.log("delete", lines);
        if (ajax.TEST) {
            return true;
        }
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/business/goodsTable/delete`,
            {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    lines: lines
                }),
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async updateGoodsManageTableLine(token: string, line: any) {
        if (ajax.TEST) {
            return true;
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            if (n=="cover") {
                fd.append("cover",line[n]);
            } else if (n=="descImg") {
                for (let img of line[n]) {
                    
                }
            } else {
                fd.append(n,line[n]);
            }
        }
        console.log("update",fd);
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/business/goodsTable/update`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // line: ["name","price","tags":['tag']]
    async addGoodsManageTableLine(token: string, line: any) {
        if (ajax.TEST) {
            return true;
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            fd.append(n,line[n]);
        }
        console.log("add",fd);
        // fd.append("account",line);
        // fd.append("avatar",line);
        // fd.append("name",line);
        // fd.append("password",line);
        // fd.append("permission",line);
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/business/goodsTable/add`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // manager
    async getUserTable(token: string): Promise<{data: [],key: {}}> {
        if (ajax.TEST) {
            // return [["gid","Account", "Name", "Permission"], ["hah", "哈哈", "CUSTOMER"], ["ha", "哈哈", "CUSTOMER"], ["h", "哈哈", "CUSTOMER"]];
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/manager/users?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },


    // line: ["account", "name", "permission": ["CUSTOMER","BUSINESS","ROOT"]]
    async deleteUserTableLines(token: string, lines: any) {
        console.log("delete", lines);
        if (ajax.TEST) {
            return true;
        }
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/manage/userTable/delete`,
            {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    lines: lines
                }),
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // line: ["account", "name", "permission": ["CUSTOMER","BUSINESS","ROOT"]]
    async addUserTableLine(token: string, line: any) {
        if (ajax.TEST) {
            return true;
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            fd.append(n,line[n]);
        }
        console.log("add",fd);
        // fd.append("account",line);
        // fd.append("avatar",line);
        // fd.append("name",line);
        // fd.append("password",line);
        // fd.append("permission",line);
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/manage/userTable/add`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async updateUserTableLine(token: string, line: any) {
        if (ajax.TEST) {
            return true;
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            fd.append(n,line[n]);
        }
        console.log("update",fd);
        // fd.append("account",line);
        // fd.append("avatar",line);
        // fd.append("name",line);
        // fd.append("password",line);
        // fd.append("permission",line);
        const retObj = await fetchWithT(
            `${ajax.serverUrl}/manage/userTable/update`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },
}

const page = {
    async getRecommendList(cnt: number): Promise<{
        id: number,
        name: string,
        price: number,
        cover: string,
    }[]> {
        if (ajax.TEST) {
            var arr = [];
            for (let i = 0; i < 10; i++) {
                arr[i] = {
                    id: i,
                    name: '普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架',
                    price: 100,
                    cover: '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                }
            }
            return arr;
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/recommend?num=${cnt}`).then(x => x.json());
        if (retObj.status == '200') {
            return retObj.data.map((x: { name: any; id: number; price: any; }) => ({
                id: x.id,
                name: x.name,
                price: x.price,
                cover: ajax.getCoverImgSrc(x.id)
            }));
        } else throw Error(retObj.message);
    },

    async getGoodsDetail(gid: number): Promise<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        cnt: number,
        descCount: number
    }> {
        if (ajax.TEST) return {
            name: "string",
            price: 3,
            id: 1,
            tags: ["string"],
            cnt: 0,
            descCount: 2
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/goods?id=${gid}`).then(x => x.json());
        if (retObj.status == '200') {
            retObj.data.tags = retObj.data.tags.split(";");
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async search(keyword: string,limit: number): Promise<{
        id: number,
        name: string,
        price: number,
        cover: string,
    }[]> {
        if (ajax.TEST) {
            var arr = [];
            for (let i = 0; i < 10; i++) {
                arr[i] = {
                    id: i,
                    name: '普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架',
                    price: 100,
                    cover: '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                }
            }
            return arr;
        }
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/search?keyword=${keyword}&limit=${limit}`).then(x => x.json());
        if (retObj.status == '200') {
            return retObj.data.map((x: { name: any; id: number; price: any; }) => ({
                id: x.id,
                name: x.name,
                price: x.price,
                cover: ajax.getCoverImgSrc(x.id)
            }));
        } else throw Error(retObj.message);
    },

    getCoverImgSrc(gid: number): string {
        return `${ajax.serverUrl}/img/cover?id=${gid}`;
    },

    getDescImgSrc(gid: number, index: number): string {
        return `${ajax.serverUrl}/img/desc?id=${gid}&index=${index}`;
    }
}

const ajax = {
    serverUrl: SERVER_URL,
    TEST,
    ...account,
    ...page,
};

export default ajax;
