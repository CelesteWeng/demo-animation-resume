let css1 = `/*
 * 面试官你好，我是翁海莹
 * 我将以动画的形式来介绍我自己
 * 只用文字介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

* { transition: all 1s; }
body { background: #e16a3f; }
.code-wrapper { 
    border: none;
    background-color: #473431;
}

/* 我需要一点代码高亮 */
.token.selector { color: #cc99cd; }
.token.property { color: #f8c555; }
`

let css2 = `
/* 不玩了，我来介绍一下我自己吧 */
/* 我需要一张白纸 */
.code-wrapper {
    width: 46%;
    height: 500px;
    left: 2%; right: auto;
}

#paper {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 50%; height: 100%;
}

#paper > .content {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px 22px white;
}

/* 现在我就可以开始在白纸上写字了，请看右边 */
`

let css3 = `
/* 
 * 接下来使用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

let css4 = `
/* 
 * 这就是我会动的简历
 * 谢谢观看
 */
`

let md = `
# 自我介绍

我叫翁海莹，
1995 年 11 月出生，
浙江理工大学毕业，
希望应聘前端开发岗位。

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. 轮播
2. 简历
3. 画板

# 联系方式

- QQ 673319951
- Email 673319951@qq.com / celesteweng1115@gmail.com
- 手机 18058110102
`

writeCss('', css1, () => {
    createPaper(() => {
        writeCss(css1, css2, () => {
            writeMarkdown(() => {
                writeCss(css1 + css2, css3, () => {
                    convertMarkdownToHtml(() => {
                        writeCss(css1 + css2 + css3, css4, () => { console.log('全部完成') })
                    })
                })
            })
        })
    })
})

// 将 code 添加到 #code 和 #styleTaq 中
function writeCss(prefix, code, cb) {
    let domCode = document.querySelector('#code')
    let domScrollEle = document.querySelector('.line-numbers')

    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        domScrollEle.scrollTop = domScrollEle.scrollHeight

        styleTag.innerHTML = prefix + code.substring(0, n)
        if (n >= code.length) {
            window.clearInterval(id)
            cb && cb.call()
        }
    }, 50)
}

function createPaper(cb) {
    let paper = document.createElement('div')
    paper.id = 'paper'
    let content = document.createElement('pre')
    content.className = 'content'
    document.body.appendChild(paper)
    paper.appendChild(content)
    cb && cb.call()
}

function writeMarkdown(cb) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = md.substring(0, n)
        if (n >= md.length) {
            window.clearInterval(id)
            cb && cb.call()
        }
    }, 35)
}

function convertMarkdownToHtml(cb) {
    let div = document.createElement('div')
    div.className = 'markdown-body content'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    cb && cb.call()
}



