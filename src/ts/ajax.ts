const ajax = {
    serverUrl: "http://127.0.0.1:8000",
    async login(username: string, password: string): Promise<{statusCode: number, token?: string, errMsg?: string}> {
        var retObj = await fetch(this.serverUrl+"/login",{
            method: "post",
            body: `username=${username}&password=${password}`//todo: 加密
        }).then(x=>x.json());
        return retObj;
    }
};

export default ajax;