var reg = (o, n) => o ? o[n] : '';

var fixCase = (s)=> s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-');

function parseFullName(string){
  var firstName = reg( /^\S+/.exec(string), 0 );
  var lastNameChop = string.replace(/^\S+\s+/, '');
  var lastName = lastNameChop.replace(/\s*[,-]\s*[A-Z\s-,]{3,}/,'');
  return [fixCase(firstName),fixCase(lastName)];
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
  var tempTextElm = document.createElement('textarea');
  tempTextElm.value = tsv_row;
  document.body.appendChild(tempTextElm);
  tempTextElm.select();
  document.execCommand('copy');
  tempTextElm.outerHTML = '';
 }

function copyDetails(){
  var detail_object = getLinkedInBasicDetails();
  copyToClipboard(detail_object);
}

copyDetails()
