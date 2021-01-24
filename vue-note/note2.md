---
title: js闭包
date: 2020-01-06
isShowComments: false 
sidebarDepth: 0
categories:
 - Vue-note
tags:
 - js闭包
---


::: tip   什么是闭包？

「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。

:::

[[toc]]

## 一、首先来简述什么是闭包

![An images](/images/001.png)

上面三行代码在一个立即执行函数中。

三行代码中，有一个局部变量 local，有一个函数 foo，foo 里面可以访问到 local 变量。

好了这就是一个闭包：

**「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。**

就这么简单。



1、**函数套函数**

「我听说闭包是需要函数套函数，然后 return 一个函数的呀！」

比如这样：

```text
function foo(){
  var local = 1
  function bar(){
    local++
    return local
  }
  return bar
}

var func = foo()
func()
```

这里面确实有闭包，local 变量和 bar 函数就组成了一个闭包（Closure）。

2、**为什么要函数套函数呢？**

::: details  函数套函数

是因为需要局部变量，所以才把 local 放在一个函数里，如果不把 local 放在一个函数里，local 就是一个全局变量了，达不到使用闭包的目的——隐藏变量（等会会讲）。

这也是为什么我上面要说「运行在一个立即执行函数中」。

有些人看到「闭包」这个名字，就一定觉得要用什么包起来才行。其实这是翻译问题，闭包的原文是 Closure，跟「包」没有任何关系。

所以函数套函数只是为了造出一个局部变量，跟闭包无关。

:::



::: details  为什么要 return bar 呢？

因为如果不 return，你就无法使用这个闭包。把 return bar 改成 window.bar = bar 也是一样的，只要让外面可以访问到这个 bar 函数就行了。

所以 return bar 只是为了 bar 能被使用，也跟闭包无关。

:::

---

## 二、总结

1.函数嵌套函数，内部函数可以引用外部函数的参数和变量

```
function  aaa() {
    var a = 5;
    function bbb() {
        alert(a)
    }

    return bbb

}
var c = aaa();
c();
```

2.参数和变量不会被垃圾回收机制所收回

```
JS中的垃圾回收机制

  function test(){
        var a = 1;
        alert(a)
  }
  test(); // 执行完这个函数，函数里面的a就不存在了，
```

**下面来扯一下闭包的好处：**

1.希望变量长期驻扎在内存当中（一般函数执行完毕，变量和参数会被销毁）

2.避免全局变量的污染

```
function  aaa() {
       var a = 1;
       a++;
       alert(a)
 }

aaa(); // 2
aaa(); // 2
aaa(); // 2


```

**上面的函数不管执行几次，弹出的都是2，如果我们想弹出2/3/4 这样的结果呢？就需要用到闭包**

```
function aaa() {
        var a = 1;
        return function(){
            a++;
            alert(a)
        }
    }

var bbb = aaa();
bbb(); // 2
bbb(); // 3
bbb(); // 4

// 函数表达式的写法
var aaa = (function () {
    var a = 1;
    return function () {
        a++;
        alert(a)
    }
})()

aaa() // 2
aaa() // 3
aaa() // 4
```

