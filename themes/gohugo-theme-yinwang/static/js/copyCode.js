var snippets = document.querySelectorAll('pre');

[].forEach.call(snippets, function(snippet) {
    snippet.firstChild.insertAdjacentHTML('beforebegin', '<button class="btn tooltipped mybtn data-clipboard-snippet" aria-label="This" type="button"><img class="clippy" width="13" src="https://clipboardjs.com/assets/images/clippy.svg" alt="Copy to clipboard"></button>');
});

var clipboardSnippets = new ClipboardJS('.btn', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});

clipboardSnippets.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger,'OK!');
});

clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});


// var clicks = 0; 
// function onClick(event) { 
//     event.className = "button visited";
//     if (clicks >= 2) { 
//      alert("WRONG! YOU LOSE! TRY AGAIN!"); 
//      // window.location.href = 'index.html'; 
//     } 
//      clicks += 1; 
//      // document.getElementById("clicks").innerHTML = clicks;
// };

