var urlParams = new URLSearchParams(window.location.search);
var editorType = urlParams.get('editor');
if (editorType == null) {
	editorType = "text";
}
var text = urlParams.get('text');
text = LZString.decompressFromEncodedURIComponent(text);
text = text.replace(/%0A/g, "\n");
var editor = ace.edit("editor");
if (text != null) {
	editor.setValue(text);
	var dropdown = document.querySelector("select");
	dropdown.value = editorType;
}
ace.config.setModuleUrl(
	"ace/theme/github_dark",
	"./js/github_dark.js"
);
editor.setTheme("ace/theme/github_dark");
editor.session.setMode("ace/mode/" + editorType);
editor.setKeyboardHandler("ace/keyboard/vscode");
editor.setOptions({
	showPrintMargin: false,
	fontSize: "20px",
	highlightActiveLine: false,
	wrap: true,
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
});
		
function share_text() {
	var text = editor.getValue();
	text = text.replace(/\n/g, "%0A");
	text = LZString.compressToEncodedURIComponent(text);
	var url = window.location.href;
	var new_url = url.split('?')[0] + "?editor=" + editorType + "&text=" + text;
	window.location.href = new_url;
	navigator.clipboard.writeText(new_url);
}
var dropdown = document.querySelector("select");
dropdown.addEventListener("change", function() {
	var editorType = dropdown.value;
	var url = window.location.href;
	var text = editor.getValue();
	text = text.replace(/\n/g, "%0A");
	text = LZString.compressToEncodedURIComponent(text);
	var new_url = url.split('?')[0] + "?editor=" + editorType + "&text=" + text;
	window.location.href = new_url;
});