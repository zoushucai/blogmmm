var snippets = document.querySelectorAll('pre');

[].forEach.call(snippets, function(snippet) {
    snippet.firstChild.insertAdjacentHTML('beforebegin', '<button class="btn" data-clipboard-snippet><img class="clippy" width="13" src="https://clipboardjs.com/assets/images/clippy.svg" alt="Copy to clipboard"></button>');
});

var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});

clipboardSnippets.on('success', function(e) {
    e.clearSelection();

    showTooltip(e.trigger, 'OK!');
});

clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

// 

// jQuery(document).on('copy', function(e){
// var labeltext = $('#titlelable').text();
// if(labeltext == "「转」") return;
// var selected = window.getSelection();
// var selectedText = selected.toString().replace(/\n/g, '<br>'); // Solve the line breaks conversion issue
// if(selectedText.length < 20) return;
// var copyFooter = '<br>---------------------著作权归作者所有。<br>'
// +'商业转载请联系作者获得授权，非商业转载请注明出处。<br>'
// + '作者：水寒 源地址：' + document.location.href
// + '<br>来源：DP2PX.COM © 水寒版权声明：本文为水寒原创文章，转载请附上博文链接！';
// var copyHolder = $('<div>', {id: 'temp', html: selectedText + copyFooter,
// style: {position: 'absolute', left: '-99999px'}});

// $('body').append(copyHolder);
// selected.selectAllChildren( copyHolder[0] );
// window.setTimeout(function() {
// copyHolder.remove();
// },0);
// });