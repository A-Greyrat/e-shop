class Subscription {
    fnList = [];

    subscribe(fn) {
        this.fnList.push(fn);
        return () => this.fnList.splice(this.fnList.indexOf(fn),1);
    }
    unsubscribe(fn) {
        this.fnList.splice(this.fnList.indexOf(fn),1);
    }
    publish(...sth) { this.fnList.forEach(fn => fn(...sth)); }

    bindProperty(obj,propertyName,changeSetvalueToPublish=(value => value)) {
        var privateName = Symbol(propertyName);
        obj[privateName] = obj[propertyName];
        var instance = this;
        Object.defineProperty(obj,propertyName,{
            get: () => obj[privateName],
            set: value => {
                obj[privateName] = value;
                instance.publish(changeSetvalueToPublish(value));
            }
        });
    }
};

export default Subscription;