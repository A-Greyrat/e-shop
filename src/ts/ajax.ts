import fetchWithT from "./fetchWithTimeout";

const TEST = false;
const SERVER_URL = "http://10.133.14.70:8082";

type Status = {
    status: string;
    message?: string;
};

const account = {
    async login(username: string, password: string): Promise<Status & { data: string }> {
        if (ajax.TEST) return {
            status: "200",
            data: "123"
        }
        const retObj = await fetchWithT(ajax.SERVER_URL + "/api/login", {
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

    async getUserInfo(token: string): Promise<Status & {
        data: {
            username: string;
            avatar: string;
            addr: string;
            money: number;
        }
    }> {
        if (ajax.TEST) return {
            status: "200",
            data: {
                username: "haha",
                avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
                addr: "地址",
                money: 1
            }
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/userinfo?token=${encodeURIComponent(token)}`).then(x => x.json());
        retObj.data.avatar = ajax.SERVER_URL + retObj.data.avatar;
        return retObj;
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
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/businessInfo?gid=${gid}`).then(x => x.json());
        if (retObj.status == "200") {
            retObj.data.avatar = ajax.SERVER_URL + retObj.data.avatar;
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async getPermission(token: string): Promise<"CUSTOMER" | "BUSINESS" | "ROOT"> {
        if (ajax.TEST) {
            return "ROOT";
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/permission?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async saveConfig(token: string, obj: {
        name?: string;
        avatar?: Blob;
        addr?: string;
        pwd?: string;
    }): Promise<Status> {
        if (ajax.TEST) return {status: "200"};
        const fd = new FormData();
        fd.append("token", token);
        for (let n in obj) {
            fd.append(n,obj[n]);
        }
        return await fetchWithT(
            `${ajax.SERVER_URL}/api/config`,
            {
                method: "post",
                body: fd
            }
        ).then(x => x.json());
    },

    // customer
    async buy(token: string, gid: number, cnt: number): Promise<Status & {data?: "",message?: string}> {
        if (ajax.TEST) return {
            status: "200",
        };
        return await fetchWithT(`${ajax.SERVER_URL}/api/buy?token=${encodeURIComponent(token)}&gid=${gid}&cnt=${cnt}`).then(x => x.json());
    },

    async reCharge(token: string, money: number): Promise<Status> {
        if (ajax.TEST) return {status: "200"};
        return fetchWithT(`${ajax.SERVER_URL}/api/charge`,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                money
            })
        }).then(x=>x.json());
    },

    async getBuyingHistory(token: string): Promise<any[][]> {
        if (ajax.TEST) {
            return [["商品名称","商品价格","购买数量","商家名称","购买时间"], ["a","b","c","d","e"], ["a","b","c","d","e"], ["a","b","c","d","e"]];
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/purchasehistory?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    async getMoneyInfo(token: string): Promise<number[]> {
        if (ajax.TEST) {
            return [50, 30.5];
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/moneyinfo?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // business
    async getIncomes(token: string): Promise<number[]> {
        if (ajax.TEST) {
            return [5, 3.5];
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/business/incomes?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    /*async getGoodsManageTable(token: string): Promise<{
        data: {
            name: string,
            price: number,
            cnt: number,
            gid: number,
            tags: string,
        }[];
        key: {
            name: string,
            price: string,
            cnt: string,
            gid: string,
            tags: string,
        };
    }> {
        if (ajax.TEST) {
            return {
                data: [
                    {
                        name: "name",
                        price: 3,
                        cnt: 2,
                        gid: 0,
                        tags: "商品标签",
                    }
                ],
                key: {
                    name: "商品名称",
                    price: "商品价格",
                    cnt: "商品数量",
                    gid: "",
                    tags: "商品标签",
                }
            }
        }
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/business/goodsTable?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // lines: gid[]
    async deleteGoodsManageTableLines(token: string, lines: string[]): Promise<Status> {
        if (ajax.TEST) {
            return {
                status: "200"
            };
        }
        return await fetchWithT(
            `${ajax.SERVER_URL}/business/goodsTable/delete`,
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
    },

    // todo
    async updateGoodsManageTableLine(token: string, line: any): Promise<Status> {
        if (ajax.TEST) {
            return {
                status: "200"
            };
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            if (n=="cover") {
                fd.append("cover",line[n]);
            } else if (n=="descImg") {
                for (let img of line[n]) {
                    // todo
                }
            } else {
                fd.append(n,line[n]);
            }
        }
        return await fetchWithT(
            `${ajax.SERVER_URL}/business/goodsTable/update`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
    },

    // todo
    async addGoodsManageTableLine(token: string, line: any): Promise<Status & {}> {
        if (ajax.TEST) {
            return {
                status: "200"
            };
        }
        var fd = new FormData();
        fd.append("token",token);
        for (let n in line) {
            fd.append(n,line[n]);
        }
        return await fetchWithT(
            `${ajax.SERVER_URL}/business/goodsTable/add`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
    },*/

    // manager
    async getUserTable(token: string): Promise<{
        data: {
            uid: number,
            account: string,
            name: string,
            permission: "CUSTOMER" | "BUSINESS" | "ROOT",
            avatar: string,
            password: string,
        }[];
        key: {
            uid: string,
            account: string,
            name: string,
            permission: string,
            avatar: string,
            password: string,
        };
    }> {
        if (ajax.TEST) {
            return {
                data: [
                    {
                        uid: 2,
                        account: "22222",
                        name: "haha",
                        permission: "CUSTOMER",
                        avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
                        password: "",
                    }
                ],
                key: {
                    uid: "Uid",
                    account: "Account",
                    name: "Name",
                    permission: "Permission",
                    avatar: "Avatar",
                    password: "Password",
                }
            }
        }
        var retObj = await fetchWithT(`${ajax.SERVER_URL}/manager/users?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            return retObj.data;
        } else throw Error(retObj.message);
    },

    // lines: uid[]
    async deleteUserTableLines(token: string, lines: number[]): Promise<Status> {
        if (ajax.TEST) {
            return {status: "200"};
        }
        return await fetchWithT(
            `${ajax.SERVER_URL}/manage/userTable/delete`,
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
    },

    async addUserTableLine(token: string, line: {
        account: string,
        avatar: string,
        name: string,
        password: string;
        permission: "CUSTOMER" | "BUSINESS" | "ROOT",
    }): Promise<Status> {
        if (ajax.TEST) {
            return {status: "200"};
        }
        var fd = new FormData();
        fd.append("token",token);
        fd.append("account",line["account"]);
        fd.append("avatar",await fetch(line["avatar"]).then(x=>x.blob()));
        fd.append("name",line["name"]);
        fd.append("password",line["password"]);
        fd.append("permission",line["permission"]);
        return await fetchWithT(
            `${ajax.SERVER_URL}/manage/userTable/add`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
    },

    async updateUserTableLine(token: string, line: {
        uid: number,
        account: string,
        avatar: string,
        name: string,
        password: string;
        permission: "CUSTOMER" | "BUSINESS" | "ROOT",
    }): Promise<Status> {
        if (ajax.TEST) {
            return {status: "200"};
        }
        var fd = new FormData();
        fd.append("token",token);
        fd.append("uid",line["uid"]+"");
        fd.append("account",line["account"]);
        fd.append("avatar",await fetch(line["avatar"]).then(x=>x.blob()));
        fd.append("name",line["name"]);
        fd.append("password",line["password"]);
        fd.append("permission",line["permission"]);
        return await fetchWithT(
            `${ajax.SERVER_URL}/manage/userTable/update`,
            {
                method: "post",
                body: fd,
            }
        ).then(x => x.json());
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
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/recommend?num=${cnt}`).then(x => x.json());
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
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/goods?id=${gid}`).then(x => x.json());
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
        const retObj = await fetchWithT(`${ajax.SERVER_URL}/api/search?keyword=${keyword}&limit=${limit}`).then(x => x.json());
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
        return `${ajax.SERVER_URL}/img/cover?id=${gid}`;
    },

    getDescImgSrc(gid: number, index: number): string {
        return `${ajax.SERVER_URL}/img/desc?id=${gid}&index=${index}`;
    }
}

const ajax = {
    SERVER_URL: SERVER_URL,
    TEST,
    ...account,
    ...page,
};

export default ajax;