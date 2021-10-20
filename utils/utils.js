export default {
    getDate(obj) {
        let date = `${obj.getFullYear()}-${obj.getMonth() + 1
            }-${obj.getDate()}`;
        return date;
    },
}