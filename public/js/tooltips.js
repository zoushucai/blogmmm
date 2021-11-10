var btns = document.querySelectorAll('.btn');
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener('mouseleave', clearTooltip);
  btns[i].addEventListener('blur', clearTooltip);
}
function clearTooltip(e) {
  e.currentTarget.setAttribute('class', 'btn');
  e.currentTarget.removeAttribute('aria-label');
}
function showTooltip(elem, msg) {
  elem.setAttribute('class', 'btn tooltipped tooltipped-w');
  elem.setAttribute('aria-label', msg);
}
function fallbackMessage(action) {
  var actionMsg = '';
  var actionKey = action === 'cut' ? 'X' : 'C';
  if (/iPhone|iPad/i.test(navigator.userAgent)) {
    actionMsg = 'No support :(';
  } else if (/Mac/i.test(navigator.userAgent)) {
    actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
  } else {
    actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
  }
  return actionMsg;
}

/*增加新的功能*/
function myafter(){
  
}
function flashCopyMessage(el, msg) {
  el.textContent = msg;
  setTimeout(function() {
    el.textContent = "Copy";
  }, 1000);
}

function selectText(node) {
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}

function addCopyButton(containerEl) {
  var copyBtn = document.createElement("button");
  copyBtn.className = "highlight-copy-btn";
  copyBtn.textContent = "Copy";

  var codeEl = containerEl.firstElementChild;
  copyBtn.addEventListener('click', function() {
    try {
      var selection = selectText(codeEl);
      document.execCommand('copy');
      selection.removeAllRanges();

      flashCopyMessage(copyBtn, 'Copied!')
    } catch(e) {
      console && console.log(e);
      flashCopyMessage(copyBtn, 'Failed :\'(')
    }
  });

  containerEl.appendChild(copyBtn);
}



