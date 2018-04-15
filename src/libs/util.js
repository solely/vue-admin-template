let util = {

};
util.title = function (title) {
    title = title ? title + ' - 跳跳电商系统' : '跳跳电商系统';
    window.document.title = title;
};

//获取元素的（绝对）纵坐标
util.getTop = function (obj) {
    let offset = obj.offsetTop;
    if(obj.offsetParent != null) offset += this.getTop(obj.offsetParent);
    return offset;
};

//获取元素的（绝对）横坐标
util.getLeft = function (obj) {
    let offset = obj.offsetLeft;
    if(obj.offsetParent != null) offset = this.getLeft(obj.offsetParent);
    return offset;
};
export default util;