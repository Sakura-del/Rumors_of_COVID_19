//将lda.html引入到谣言聚类_block的iframe中
var iframe = document.createElement("iframe")
iframe.src = "lda.html"
iframe.id = 'lda_iframe'
iframe.name = 'lda_iframe'
document.getElementById('lda_container').appendChild(iframe)

//将lda.html中的英文替换为中文
function standard_lad() {
    var iframe_document = document.getElementById('lda_iframe').contentWindow.document

    iframe_document.querySelector('#ldavis_el2796014679140315603587449340>svg>text').innerHTML = '主题间距离图'
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-top>div>label').innerHTML = '选中主题 '
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-topic-down').innerHTML = '上一主题 '
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-topic-up').innerHTML = '下一主题 '
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-topic-clear').innerHTML = '清除主题 '
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-lambdaZero').innerHTML = '<text x="0" y="0" style="font-size: 14px;">滑动以调整相关性指标</text>'
    iframe_document.querySelector('.bubble-tool').innerHTML = '最突出的30个关键词'
    iframe_document.querySelector('.circleGuideTitle').innerHTML = ''
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-bar-freqs text:nth-child(2)').innerHTML = '总词语频率'
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-bar-freqs text:nth-child(4)').innerHTML = '所选主题内的词语频率'
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-bar-freqs>a').remove()
    iframe_document.querySelector('#ldavis_el2796014679140315603587449340-bar-freqs>a').remove() 
}

//lda.html加载完成后执行英文替换
if (iframe.attachEvent) {
    iframe.attachEvent("onload", function () {
        standard_lad()
    });
} else {
    iframe.onload = function () {
        standard_lad()
    };
}


