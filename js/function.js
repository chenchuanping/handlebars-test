function formatPage(cur, total) {
    cur = parseInt(cur);
    total = parseInt(total);
    var arr = [];
    // 处理到首页的逻辑
    var toLeft = {};
    toLeft.index = 1;
    toLeft.text = '&laquo;';
    if (cur != 1) {
        toLeft.clickable = true;
    }
    arr.push(toLeft);
    // 处理到上一页的逻辑
    var pre = {};
    pre.index = cur - 1;
    pre.text = '&lsaquo;';
    if (cur != 1) {
        pre.clickable = true;
    }
    arr.push(pre);
    // 处理到cur页前的逻辑
    if (cur <= 5) {
        for (var i = 1; i < cur; i++) {
            var pag = {};
            pag.index = i;
            pag.text = i;
            pag.clickable = true;
            arr.push(pag);
        }
    } else {
        for (var i = cur - 2; i < cur; i++) {
            var pag = {};
            pag.index = i;
            pag.text = i;
            pag.clickable = true;
            arr.push(pag);
        }
    }
    // 处理到cur页前的逻辑
    var pag = {};
    pag.text = cur;
    pag.index = cur;
    pag.cur = true;
    arr.push(pag);
    // 处理到cur页后的逻辑
    if (cur >= total - 4) {
        for (var i = cur + 1; i <= total; i++) {
            var pag = {};
            pag.text = i;
            pag.index = i;
            pag.clickable = true;
            arr.push(pag);
        }
    } else {
        // 如果cur<total-4,那么cur后的页要显示...
        for (var i = cur + 1; i <= cur + 2; i++) {
            var pag = {};
            pag.text = i;
            pag.index = i;
            pag.clickable = true;
            arr.push(pag);
        }
        var pag = {};
        pag.text = '...';
        arr.push(pag);
        var pag = {};
        pag.text = total;
        pag.index = total;
        pag.clickable = true;
        arr.push(pag);
    }
    // 处理到下一页的逻辑
    var next = {};
    next.index = cur + 1;
    next.text = '&rsaquo;';
    if (cur != total) {
        next.clickable = true;
    }
    arr.push(next);

    // 处理到尾页的逻辑
    var toRight = {};
    toRight.index = total;
    toRight.text = '&raquo;';
    if (cur != total) {
        toRight.clickable = true;
    }
    arr.push(toRight);
    return arr;
}