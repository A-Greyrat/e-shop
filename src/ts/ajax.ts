import fetchWithT from "./fetchWithTimeout";

const account = {
    async login(username: string, password: string): Promise<string> {
        // var retObj = await fetchWithT(ajax.serverUrl+"/api/login",{
        //     method: "post",
        //     body: `username=${username}&password=${password}`//todo: 加密
        // }).then(x=>x.json());
        // if (retObj.statusCode==200) return retObj.data;
        // else throw Error(retObj.errMsg);
        return '123';
    },

    async getUserInfo(token: string): Promise<{username: string, avatar: string}> {
        // var retObj = await fetchWithT(`${ajax.serverUrl}/api/userinfo?token=${encodeURIComponent(token)}`).then(x=>x.json());
        // if (retObj.statusCode==200) return retObj.data;
        // else throw Error(retObj.errMsg);
        return {
            username: "haha",
            avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg"
        }
    },

    async getBusinessInfo(gid: number): Promise<{
        avatar: string,
        name: string,
        goodsRank: number,
        businessRank: number,
    }> {
        // var retObj = await fetchWithT(`${ajax.serverUrl}/api/businessInfo?gid=${gid}`).then(x=>x.json())
        // if (retObj.statusCode==200) return retObj.data;
        // else throw Error(retObj.errMsg);
        return {
            avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg",
            name: "商家A",
            goodsRank: 4.9,
            businessRank: 5.0,
        }
    },
}

const page = {
    async getRecommandList(cnt: number): Promise<any[]> {
        // var retObj = await fetchWithT(`${ajax.serverUrl}/api/recommend?num=${cnt}`).then(x=>x.json());
        // if (retObj.statusCode==200) return retObj.data;
        // else throw Error(retObj.errMsg);
        var arr = [];
        for (let i=0;i<10;i++) {
            arr[i] = {
                goodsId: i,
                iconSrc: '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                title: '普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架',
                price: 100,
            }
        };
        return arr;
    },

    async getGoodsDetail(gid: number): Promise<{
        name: string,
        price: number,
        id: number,
        tags: string[],
        descCount: number
    }> {
        // var retObj = await fetchWithT(`${ajax.serverUrl}/api/goods?id=${gid}`).then(x=>x.json())
        // if (retObj.statusCode==200) return retObj.data;
        // else throw Error(retObj.errMsg);
        return {
            name: "string",
            price: 3,
            id: 1,
            tags: ["string"],
            descCount: 2
        }
    },

    getCoverImgSrc(gid: number): string {
        return `${ajax.serverUrl}/img/cover?id=${gid}`;
    },

    getDescImgSrc(gid: number, index: number): string {
        return `${ajax.serverUrl}/img/desc?id=${gid}&index=${index}`;
    }
}

const ajax = {
    serverUrl: "http://127.0.0.1:8000",
    ...account,
    ...page,
};

export default ajax;