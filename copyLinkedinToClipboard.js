/*
    References:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
        https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
*/

function parseFullName(string){
    var fixCase = (s)=> s ? s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-') : s;
    var first_name = /^\S+/.exec(string) ? /^\S+/.exec(string)[0] : '';
    var last_name_chop = string.replace(/^\S+\s+/, '').replace(/\s*[,-]\s*[A-Z\s-,]{3,}/,'');
    return [fixCase(first_name),fixCase(last_name_chop)];
}

function getLinkedInBasicDetails(){
    var name_dom_elm = document.getElementsByClassName('inline t-24 t-black t-normal break-words');
    var full_name = name_dom_elm != undefined && name_dom_elm.length > 0 ? name_dom_elm[0].innerText : null;
    var profile_link = window.location.href;
    var firstlast = parseFullName(full_name);
    return {firstName: firstlast[0], lastName: firstlast[1], url: profile_link};
}

function copyToClipboard(basicInfo){
    var tsv_row = basicInfo.firstName + '\t' +basicInfo.lastName + '\t' + basicInfo.url;
    var temp_text_elm = document.createElement('textarea');
    temp_text_elm.value = tsv_row;
    document.body.appendChild(temp_text_elm);
    temp_text_elm.select();
    document.execCommand('copy');
    temp_text_elm.outerHTML = '';
}

function copyDetails(){
    var detail_object = getLinkedInBasicDetails();
    copyToClipboard(detail_object);
}

copyDetails()
