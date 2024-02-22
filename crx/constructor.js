var username = "[匿名用户]";
var content;
var date;
var y;
var m;
var d;
var H;
var M;

function make_text_from_pattern(pat, user, con) {
    date = new Date();
    y = date.getFullYear();
    m = date.getMonth();
    d = date.getDay();
    H = date.getHours().toString();
    M = date.getMinutes().toString();

    if (H.length == 1){
        H = "0" + H;
    }
    if (M.length == 1){
        M = "0" + M;
    }
    let text = pat;
    text = text.replace("%u","%uc92eaabf8bca");  // 比这更优雅的方式或许存在。
    text = text.replace("%c","%cc92eaabf8bca");
    text = text.replace("%y","%yc92eaabf8bca");
    text = text.replace("%m","%mc92eaabf8bca");
    text = text.replace("%d","%dc92eaabf8bca");
    text = text.replace("%H","%Hc92eaabf8bca");
    text = text.replace("%M","%Mc92eaabf8bca");
    text = text.replace("%uc92eaabf8bca",user);
    text = text.replace("%cc92eaabf8bca",con);
    text = text.replace("%yc92eaabf8bca",y);
    text = text.replace("%mc92eaabf8bca",m);
    text = text.replace("%dc92eaabf8bca",d);
    text = text.replace("%Hc92eaabf8bca",H);
    text = text.replace("%Mc92eaabf8bca",M);
    return text;
}
$(document).ready(() => {
    chrome.storage.sync.get(
        {username: ""},
        (items) => {
            $("#inputUsername").val(items.username);
        }
    );

    chrome.tabs.query({lastFocusedWindow: true, active: true}, (t) => {
        let url = t[0].url;
        if (url.includes("note.ms/")) {
            $("#buttonApply").css("display", "inline-block");
        }
    });
    
});


$("#buttonGenerate").click(() => {
    let pattern;
    let default_pattern = `
%u [%y/%m/%d %H:%M]:
%c
`;
    chrome.storage.sync.get(
        {pattern: default_pattern},
        async (items) => {
            pattern = items.pattern == "" ? default_pattern : items.pattern;
            username = $("#inputUsername").val() == "" ? "[匿名用户]" : $("#inputUsername").val();
            content = $("#inputContent").val();
            text = make_text_from_pattern(pattern, username, content);
            navigator.clipboard.writeText(text);
            $("#h1Hello").text("ChaImpr ✓");
            setTimeout(() => {$("#h1Hello").text("ChaImpr");}, 750)
            chrome.storage.sync.set(
                {username: $("#inputUsername").val()},
                () => {}
            );
            
        }
    );
    
});

$("#buttonApply").click(() => {
    let pattern;
    let default_pattern = `
%u [%y/%m/%d %H:%M]:
%c
`;
    chrome.storage.sync.get(
        {pattern: default_pattern},
        async (items) => {
            pattern = items.pattern == "" ? default_pattern : items.pattern;
            username = $("#inputUsername").val() == "" ? "[匿名用户]" : $("#inputUsername").val();
            content = $("#inputContent").val();
            text = make_text_from_pattern(pattern, username, content);
            chrome.tabs.query({currentWindow: true, active: true}, (t) => {
                let active_tab = t[0];
                chrome.tabs.sendMessage(active_tab.id, {"text": text});
                
            });
            $("#h1Hello").text("ChaImpr ✓");
            setTimeout(() => {$("#h1Hello").text("ChaImpr");}, 750)
            chrome.storage.sync.set(
                {username: $("#inputUsername").val()},
                () => {}
            );
            
        }
    );
    
});