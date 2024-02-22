$(document).ready(() => {
    let default_pattern = `
%u [%y/%m/%d %H:%M]:
%c
`;
    chrome.storage.sync.get(
        {pattern: default_pattern},
        (items) => {
            $("#inputPattern").val(items.pattern == "" ? default_pattern : items.pattern);
        }
    );
    
});

$("#buttonSave").click(() => {
    chrome.storage.sync.set(
        {pattern: $("#inputPattern").val()},
        () => {}
    );
});