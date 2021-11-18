window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth; //获取 focus的宽度

    //1. 鼠标经过隐藏和显示
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    })

    // 2.动态生成小圆点
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 以focus里面有多少图片 为条件 来循环几张图片,就生成几个小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li'); // 创建一个小li
        li.setAttribute('index', i); //记录当前小圆圈的索引号 通过自定义属性来做
        ol.appendChild(li); // 把小li插入到ol 里面
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''; //清除背景颜色
            }
            this.className = 'current'; // 添加背景颜色
            // 5. 点击小圆圈，移动图片 当然移动的是 ul
            // var focusWidth = focus.offsetWidth; //获取 focus的宽度
            var index = this.getAttribute('index'); // 当我们点击了某个 小圆点(li) 就拿到当前 小圆点(li) 的索引号
            num = index; // 当我们点击了某个小li 就要把这个li 的索引号给 num
            circle = index; // 当我们点击了某个小li 就要把这个li 的索引号给 circle
            animate(ul, -index * focusWidth); //调用动画函数 图片(ul)的移动距离就是 小圆点 乘以 图片的宽度
        })
    };
    ol.children[0].className = 'current'; // 给第一个添加背景颜色

    // 3.右侧按钮  无缝滚动
    var first = ul.children[0].cloneNode(true); // 克隆第一张图片放到ul 最后面
    ul.appendChild(first);
    var num = 0; // 用按钮 乘以 图片的宽度
    var circle = 0; // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
    var flag = true; //节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
                ul.style.left = 0;
                num = 0;
            }
            num++; //每点击一次num加一   相当于小圆点(li)的创建自定义属性
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++; // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    // 3.左侧按钮  无缝滚动

    var num = 0; // 用按钮 乘以 图片的宽度
    var circle = 0; // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
    arrow_l.addEventListener('click', function() {
        if (flag) {

            flag = false; //关闭节流阀
            if (num == 0) {
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
                // ul.style.left = (ul.children.length - 1) * focusWidth + 'px';
                // num = ul.children.length - 1;
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--; //每点击一次num加一   相当于小圆点(li)的创建自定义属性
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--; // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            circleChange();
        }
    });

    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    };
    // 自动播放
    var timer = this.setInterval(function() {
        arrow_r.click();
    }, 2000);
})