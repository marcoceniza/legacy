import CryptoJS from 'crypto-js';
import axiosA from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const secretKey = 'secretKey';

export function vueToast(message, type) {
    const $toast = useToast();

    if(type == 'success') $toast.success(message, { position: 'top-right', duration: 5000 });
    else if(type == 'info') $toast.info(message, { position: 'top-right', duration: 5000 });
    else $toast.error(message, { position: 'top-right', duration: 5000 });
}

export function encrypt(value){
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    return encryptedValue
}

export function decrypt(value){
    const bytes = CryptoJS.AES.decrypt(value, secretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue
}

export function validateForm(obj,rules){
    let validated = {
        allValid: true
    };
    for(let r in rules){
        if((rules[r] == "required" || rules[r].isRequired ) &&
            obj[r] == undefined || (typeof obj[r] == 'string' && obj[r].trim() == '') ){
                validated[r] = 'empty';
        }else if((rules[r] != "required" || rules[r].isRequired ) &&
            obj[r] == undefined || (typeof obj[r] == 'string' && obj[r].trim() == '') ){
                validated[r] = true;  
        }else if(r != 'callback'){
            let emailregex = /[a-z0-9._]+@[a-z]+\.[a-z]{2,3}/i;
            let intregex = /[0-9]+/;

            validated[r] = true;

            if(rules[r].isEmail &&  obj[r].toLowerCase().match(emailregex))
                validated[r] = true;
            else if (rules[r].isEmail ){
                validated[r] = 'invalid_email';
                continue;
            }

            if(rules[r].isInteger && obj[r].match(intregex))
                validated[r] = true;
            else if(rules[r].isInteger) {
                validated[r] = 'invalid_number';
                continue;
            }

            if(rules[r].regexMatch != null && obj[r].match(rules[r].regexMatch))
                validated[r] = true;
            else if(rules[r].regexMatch != null) {
                validated[r] = 'value_and_regex_not_match';
                continue;
            }

            if(rules[r].equalTo != null &&  obj[r] == rules[r].equalTo)
                validated[r] = true;
            else if(rules[r].equalTo != null) {
                validated[r] = 'values_not_match';
                continue;
            }

            if(typeof rules[r].maxChars == 'number' && rules[r].maxChars >= obj[r].length)
                validated[r] = true;
            else if(typeof rules[r].maxChars == 'number') {
                validated[r] = 'invalid_length_max';
                continue;
            }

            if(typeof rules[r].minChars == 'number' && rules[r].minChars <= obj[r].length)
                validated[r] = true;
            else if(typeof rules[r].minChars == 'number') {
                validated[r] = 'invalid_length_min';
                continue;
            }

            if(typeof rules[r].min == 'number' && rules[r].min <= obj[r])
                validated[r] = true;
            else if(typeof rules[r].min == 'number') {
                validated[r] = 'invalid_min';
                continue;
            }

            if(typeof rules[r].max == 'number' && rules[r].max >= obj[r])
                validated[r] = true;
            else if(typeof rules[r].max == 'number') {
                validated[r] = 'invalid_max';
                continue;
            }
        }
    }

    let someEmpty = false;
    if(rules.callback != null){
        for(let v in validated){
            if(validated[v] === 'empty'){
                validated.allValid = false;
                rules.callback();
                someEmpty = true;
                break;
            }
        }
    }
    if(!someEmpty){
        for(let v in validated){
            if(validated[v] != true){
                validated.allValid = false;
                if(rules[v].callback != null){
                    rules[v].callback(validated[v],v);
                    break;
                }

            }
        }
    }

    return validated;
}

class Axios{
    constructor(baseUrl,defHeaders) {
        this.baseUrl = baseUrl;
        this.defHeaders = defHeaders;
    }

    get(endpoint) {
        return axiosA({
            method:'get',
            url: endpoint
        });
    }
    

    toFormData(obj){
        var fd = new FormData();
        for(var i in obj){
            fd.append(i,obj[i]);
        }
        return fd;
    }

    async post(endpoint,headers=null,body=null,opts={}) {
        
        let params = {
            method:'post',
            url: this.baseUrl+endpoint
        };

        if (headers == 'default') params["headers"] = this.defHeaders
        else if (headers!=null) params["headers"] = headers;
        
        if (body!=null) params["data"] = this.toFormData(body);
        params = {...params,...opts};
        return axiosA(params);
    }
}

export function elementLoad(selector){
    return new Promise(resolve=>{
        var check = setInterval(function(){
            if(document.querySelector(selector) != null){
                clearInterval(check);
                resolve(document.querySelector(selector));
            }
        }, 100);
    })
}

const apiURLs = {
    localhost: window.location.protocol+'//localhost/UniversalCPR/api/',
    network: window.location.protocol+'//ns.proweaver.host/UniversalCPR/api/',
    launched: window.location.protocol+'//'+window.location.hostname+'/UniversalCPR/api/',
    site: `https://www.legacyhealthus.com/legacy/api/`
}

export const axios = new Axios(apiURLs.site,{pwauth:'TWxBUUJPbUdPM1g5NDJxUm5Ncnp6UnlrZ2xRSlJyeXcvQ0RGNDVVYTRKMUprK0tPZjFrV3IrdHZrbkYvci9saGtQRGF5NnZmWEZveVl3TjNSYjVEUmc9PTo6OPee3c+XRvB5vpYEn0QVbg'});

export function dateFormatV2(format='',dateString=''){
    let date = (dateString != '') ? new Date(dateString) : new Date();
    if(format=='') {
        console.error('%cFunction.js[dateformat()]:%c format parameter is empty','font-weight:700','font-weight:400');
        return;
    }
    let M = date.toLocaleString('en-US',{month:'2-digit'});
    let m = date.toLocaleString('en-US',{month:'numeric'});
    let lm = date.toLocaleString('en-US',{month:'long'});
    let sm = date.toLocaleString('en-US',{month:'long'}).substring(0,3);
    let d = date.toLocaleString('en-US',{day:'numeric'});
    let D = date.toLocaleString('en-US',{day:'2-digit'});
    let y = date.toLocaleString('en-US',{year:'numeric'});
    let h1 = date.toLocaleTimeString('en-US',{hour12:true,hour:'numeric'}).replace(/( AM)|( PM)/g,'');
    let h = date.toLocaleTimeString('en-US',{hour12:true,hour:'2-digit'}).replace(/( AM)|( PM)/g,'');
    let H1 = date.toLocaleTimeString('en-US',{hour12:false,hour:'numeric'});
    let H = date.toLocaleTimeString('en-US',{hour12:false,hour:'2-digit'});
    let i = date.toLocaleTimeString('en-US',{minute:'numeric'});
    let I = date.toLocaleTimeString('en-US',{minute:'2-digit'});
    let s = date.toLocaleTimeString('en-US',{second:'numeric'});
    let S = date.toLocaleTimeString('en-US',{second:'2-digit'});
    let a = date.toLocaleTimeString('en-US',{hour12:true,hour:'numeric'}).replace(/[0-9]+ /g,'');

    format = format.replace(/%M/g,M);
    format = format.replace(/%m/g,m);
    format = format.replace(/%lm/g,lm);
    format = format.replace(/%sm/g,sm);
    format = format.replace(/%d/g,d);
    format = format.replace(/%D/g,D);
    format = format.replace(/%y/g,y);
    format = format.replace(/%h/g,h);
    format = format.replace(/%h1/g,h1);
    format = format.replace(/%H/g,H);
    format = format.replace(/%H1/g,H1);
    format = format.replace(/%i/g,i);
    format = format.replace(/%I/g,I);
    format = format.replace(/%s/g,s);
    format = format.replace(/%S/g,S);
    format = format.replace(/%a/g,a);
    return format;
}