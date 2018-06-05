$(function () {
    var GETLCASSES = "http://imoocnote.calfnote.com/inter/getClasses.php";
    var GETCLASSCHAPTER = "http://imoocnote.calfnote.com/inter/getClassChapter.php";
    var GETCLASSNOTE = "http://imoocnote.calfnote.com/inter/getClassNote.php";

    function renderTemplate(templateSelector, data, htmlSelector) {
        var template = $(templateSelector).html();
        var handle = Handlebars.compile(template);
        var response = handle(data);
        $(htmlSelector).html(response);
    }

    // 刷新数据
    function refreshClasses(curPage) {
        $.getJSON(GETLCASSES, {curPage: curPage}, function (data) {
            renderTemplate("#class-template", data.data, "#classes");
            renderTemplate("#page-template", formatPage(data.curPage, data.totalCount), "#page");
        });
    }

    // 隐藏
    $('.overlap').on('click', function () {
        showNote(false);
    });

    // 显示笔记本
    function showNote(show) {
        if (show) {
            $(".overlap").css('display', 'block');
            $(".notedetail").css('display', 'block');
        } else {
            $(".overlap").css('display', 'none');
            $(".notedetail").css('display', 'none');
        }
    }

    // 显示
    function bindClassEvent() {
        $("#classes").delegate('li', 'click', function () {
            $this = $(this);
            var cid = $this.data('id');
            $.when($.getJSON(GETCLASSCHAPTER, {cid: cid}),
                $.getJSON(GETCLASSNOTE, {cid: cid})).done(function (cData, nData) {
                    if (cData[1] == 'success' && nData[1] == 'success') {
                        renderTemplate("#chapter-template", cData[0], "#chapterdiv");
                        renderTemplate("#note-template", nData[0], "#notediv");
                        showNote(true);
                    } else {
                        alert('调用接口错误');
                    }
                }
            );
        })
    }

    bindClassEvent();

    // 事件委托
    function bindPageEvent() {
        $("#page").delegate('li.clickable', 'click', function () {
            $this = $(this);
            var curPage = $this.data('id');
            refreshClasses(curPage);
        });
    }

    bindPageEvent();

    // 初始化数据
    $.ajax({
        url: GETLCASSES,
        async: true,
        cache: false,
        dataType: "json",
        type: "get",
        data: {'curPage': 1},
        success: function (res) {
            renderTemplate("#class-template", res.data, "#classes");
            renderTemplate("#page-template", formatPage(res.curPage, res.totalCount), "#page");
            $('li.clickable').bind("click", function () {
                $this = $(this);
                var curPage = $this.data('id');
                refreshClasses(curPage);
            });
        },
        error: function () {
            alert('调用接口失败');
            return false;
        }
    });

    Handlebars.registerHelper('equal', function (v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('long', function (v, options) {
        if (v.indexOf('小时') != -1) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('page', function (v1, v2) {
        var str = '';
        str += '<ul>';
        return str;
    });

    Handlebars.registerHelper('addone', function (v) {
        return v + 1;
    });

    Handlebars.registerHelper('formatDate', function (value) {
        if (!value) {
            return '';
        }
        var d = new Date(value);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var str = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
        return str;
    });
});

