function getLocal(key = 'token') {
    console.log(123);
    return localStorage.getItem(key);
}
// 删除
function removeLocal(key = 'token') {
    window.localStorage.removeItem(key);
}
// 保存
function setLocal(value: any, key = 'token') {
    window.localStorage.setItem(key, value);
}
export {getLocal, removeLocal, setLocal};
