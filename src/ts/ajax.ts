import fetchWithT from "./fetchWithTimeout";

const account = {
    async login(username: string, password: string): Promise<{status: string, data: string}> {
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
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/userinfo?token=${encodeURIComponent(token)}`).then(x => x.json());
        if (retObj.status == "200") {
            retObj.data.avatar = ajax.serverUrl + retObj.data.avatar;
            return retObj.data;
        } else throw Error(retObj.message);
        // return {
        //     username: "haha",
        //     avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
        //     addr: "地址",
        //     money: 1
        // }
    },

    async getBusinessInfo(gid: number): Promise<{
        avatar: string,
        name: string,
        goodsRank: number,
        businessRank: number,
    }> {
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/businessInfo?gid=${gid}`).then(x => x.json());
        if (retObj.status == "200") {
            retObj.data.avatar = ajax.serverUrl + retObj.data.avatar;
            return retObj.data;
        } else throw Error(retObj.message);
        // return {
        //     avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
        //     name: "商家A",
        //     goodsRank: 4.9,
        //     businessRank: 5.0,
        // }
    },

    async buy(token: string, gid: number, cnt: number): Promise<"SUCCESS" | "FAILED"> {
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/buy?token=${token}&gid=${gid}&cnt=${cnt}`).then(x => x.json());
        if (retObj.status == "200") return "SUCCESS";
        else return "FAILED";
    },
}

const page = {
    async getRecommendList(cnt: number): Promise<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        cnt: number,
        descCount: number
    }[]> {
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/recommend?num=${cnt}`).then(x => x.json());
        if (retObj.status == '200') return retObj.data;
        else throw Error(retObj.message);
        // var arr = [];
        // for (let i = 0; i < 10; i++) {
        //     arr[i] = {
        //         id: i,
        //         cover: '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
        //         title: '普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架',
        //         price: 100,
        //     }
        // }
        // ;
        // return arr;
    },

    async getGoodsDetail(gid: number): Promise<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        cnt: number,
        descCount: number
    }> {
        const retObj = await fetchWithT(`${ajax.serverUrl}/api/goods?id=${gid}`).then(x => x.json());
        if (retObj.status == '200') {
            retObj.data.tags = retObj.data.tags.split(";");
            return retObj.data;
        } else throw Error(retObj.message);
        // return {
        //     name: "string",
        //     price: 3,
        //     id: 1,
        //     tags: ["string"],
        //     cnt: ,0
        //     descCount: 2
        // }
    },

    getCoverImgSrc(gid: number): string {
        return `${ajax.serverUrl}/img/cover?id=${gid}`;
    },

    getDescImgSrc(gid: number, index: number): string {
        return `${ajax.serverUrl}/img/desc?id=${gid}&index=${index}`;
    }
}

const ajax = {
    serverUrl: "http://10.133.8.118:8082",
    ...account,
    ...page,
};

export default ajax;
