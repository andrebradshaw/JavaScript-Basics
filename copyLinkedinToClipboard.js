/*
    COPY LINKEDIN NAME AND URL TO CLIPBOARD
        Calls another function to retrieve the data from the web page
        Passes that web text data to another function which copies to the clipboard
*/
function copyLinkedInNameURLtoClipboard(){
    var detail_object = getLinkedInBasicDetails();
    copyToClipboard(detail_object);
}

/*
    GET LINKEDIN BASIC DETAILS
        Gets a persons name text from the HTML class 'inline t-24 t-black t-normal break-words'
        Gets the link/url from the current page
        Calls another function and passes the full name text to that function for processing
        Returns the details 
*/
function getLinkedInBasicDetails(){
    var name_dom_elm = document.getElementsByClassName('inline t-24 t-black t-normal break-words');
    var full_name = name_dom_elm != undefined && name_dom_elm.length > 0 ? name_dom_elm[0].innerText : null;
    var profile_link = window.location.href;
    var firstlast = parseFullName(full_name);
    return {first_name: firstlast[0], last_name: firstlast[1], url: profile_link};
}
/*
    PARSE FULL NAME FROM FULL NAME TEXT
        fixCase is a simple function to normalize the case of a name. A more complex version can be found here: https://github.com/andrebradshaw/utilities/blob/master/data%20cleansing/bestNameCase.js
        processes first and last name out of the fullname using regular expressions
        returns as an array. first item in the array is the first name, second item is the last name.
*/
function parseFullName(string){
    var fixCase = (s)=> s ? s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-') : s;
    var first_name = /^\S+/.exec(string) ? /^\S+/.exec(string)[0] : '';
    var last_name_chop = string.replace(/^\S+\s+/, '').replace(/\s*[,-]\s*[A-Z\s-,]{3,}/,'');
    return [fixCase(first_name),fixCase(last_name_chop)];
}

/*
    COPY TO CLIPBOARD
        creates text with first name    last name    url
        creates a temporary input element so we can use a JS workaround to force the browser to copy the data to our clipboard.
        uses a depricated function "execCommand" to copy the text selection to the user's clipboard.
        deletes temporary HTML element
*/
function copyToClipboard(basic_info){
    var tsv_row = basic_info.first_name + '\t' +basic_info.last_name + '\t' + basic_info.url;
    var temp_text_elm = document.createElement('textarea');
    temp_text_elm.value = tsv_row;
    document.body.appendChild(temp_text_elm);
    temp_text_elm.select();
    document.execCommand('copy');
    temp_text_elm.outerHTML = '';
}

copyLinkedInNameURLtoClipboard()

/*
    References:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
        https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
        https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
*/
