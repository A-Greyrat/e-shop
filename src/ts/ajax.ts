const ajax = {
    serverUrl: "http://127.0.0.1:8000",
    async login(username: string, password: string): Promise<{statusCode: number, token?: string, errMsg?: string}> {
        // var retObj = await fetch(this.serverUrl+"/login",{
        //     method: "post",
        //     body: `username=${username}&password=${password}`//todo: 加密
        // }).then(x=>x.json());
        // return retObj;
        return {
            statusCode: 200,
            token: '123'
        }
    },

    async getUserInfo(token: string): Promise<{statusCode: number, info?: {username: string, avatar: string}, errMsg?: string}> {
        // var retObj = await fetch(this.serverUrl+"/userinfo?token="+encodeURIComponent(token)).then(x=>x.json());
        // return retObj;
        return {
            statusCode: 200,
            info: {
                username: "haha",
                avatar: "//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg"
            }
        }
    },

    async getRecommandList(): Promise<{statusCode: number, list?: any[], errMsg?: string}> {
        var arr = [];
        for (let i=0;i<10;i++) {
            arr[i] = {
                goodsId: i,
                iconSrc: '//gw.alicdn.com/bao/uploaded/i1/3816036879/O1CN01perN2k20gdIQz3BrX_!!3816036879.jpg_300x300q90.jpg',
                title: '普莱斯防蓝光辐射抗疲劳素颜眼镜女款韩版潮近视透明变色眼睛框架',
                price: 100,
            }
        };
        return {statusCode: 200, list: arr};
        // var retObj = await fetch(this.serverUrl+"/recommandList").then(x=>x.json());
        // return retObj;
    }
};

export default ajax;