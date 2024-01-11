import axios from 'axios';
import CryptoJS from 'crypto-js';

export const API_URL = import.meta.env.VITE_APP_API_URL;

class AxiosService {
    constructor(apiUrl) {
        this.axios = axios.create({
            baseURL: apiUrl,
        });
    }

    // async get(url, config, getId = null) {
    //     const response = await this.axios.get(url, config);
    //     if (getId !== null) this.runFirebaseReq(getId);
    //     return response;
    // }

    // async post(url, data, config, getId = null) {
    //     const response = await this.axios.post(url, data, config);
    //     if (getId !== null) this.runFirebaseReq(getId);
    //     return response;
    // }

    // runFirebaseReq(getId) {
    //     const userStore = useUserStore();
    //     const userId = userStore.user.user_id;
    //     update(ref(db, '/requests'), {
    //         id: getId,
    //         sender: userId,
    //         instance: increment(1)
    //     });
    // }
}

const axiosR = new AxiosService(API_URL);

class LocalStore {
    #secretKey; // private property to store secret key

    constructor(secretKey) {
        this.#secretKey = secretKey;
    }

    set(key, value) {
        const encryptedValue = CryptoJS.AES.encrypt(value, this.#secretKey).toString();
        localStorage.setItem(key, encryptedValue);
    }

    get(key) {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, this.#secretKey);
            const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedValue;
        }
        return null;
    }

    setObject(key, value) {
        const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.#secretKey).toString();
        localStorage.setItem(key, encryptedValue);
    }

    getObject(key) {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, this.#secretKey);
            const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedValue);
        }
        return null;
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    setInObject(parentKey, childKey, value) {
        let parentObject = this.getObject(parentKey) || {};
        parentObject[childKey] = value;
        this.setObject(parentKey, parentObject);
    }

    isset(key) {
        if (localStorage.getItem(key) == null) return false;
        return true;
    }

    getInObject(parentKey, childKey) {
        let parentObject = this.getObject(parentKey);
        return parentObject ? parentObject[childKey] : null;
    }

    objectify(stringObj) {
        stringObj = stringObj.replaceAll('&#34;', '"');
        stringObj = JSON.parse(stringObj);
        return stringObj;
    }

    clear() {
        localStorage.clear();
    }
};

const lStore = new LocalStore('secretKey');

function removeFix(object, fix) {
    let newObj = {};

    for (let k in object) {
        let key = k.toLowerCase().replaceAll(fix, '');
        newObj[key] = object[k];
    }

    return newObj;
};

function validateForm(obj, rules) {
    let validated = {
        allValid: true
    };
    
    for (let r in rules) {
        if ((rules[r] == "required" || rules[r].isRequired ) && obj[r] == undefined || obj[r] == '' ) {
            validated[r] = 'empty';
        } else if ((rules[r] != "required" || rules[r].isRequired ) && obj[r] == undefined || obj[r] == '' ) {
                validated[r] = true;  
        } else if (r != 'callback') {
            let emailregex = /[a-z0-9._]+@[a-z]+\.[a-z]{2,3}/i;
            let intregex = /[0-9]+/;
            let floatregex = /[0-9]+.[0-9]+/;

            validated[r] = true;

            if (rules[r].isEmail &&  obj[r].toLowerCase().match(emailregex)) {
                validated[r] = true;
            } else if (rules[r].isEmail ) {
                validated[r] = 'invalid_email';
                // break;
            }

            if (rules[r].isInteger && (typeof obj[r] == 'number' || obj[r].match(intregex)))
                validated[r] = true;
            else if (rules[r].isInteger) {
                validated[r] = 'invalid_number';
                // break;
            }

            if (rules[r].isFloat && (typeof obj[r] == 'number' || (obj[r].match(floatregex) || obj[r].match(intregex))))
                validated[r] = true;
            else if (rules[r].isFloat) {
                validated[r] = 'invalid_number';
                // break;
            }

            if (rules[r].regexMatch != null && obj[r].match(rules[r].regexMatch))
                validated[r] = true;
            else if (rules[r].regexMatch != null) {
                validated[r] = 'value_and_regex_not_match';
                // break;
            }

            if (rules[r].equalTo != null &&  obj[r] == rules[r].equalTo)
                validated[r] = true;
            else if (rules[r].equalTo != null) {
                validated[r] = 'values_not_match';
                // break;
            }

            if (typeof rules[r].maxChars == 'number' && rules[r].maxChars >= obj[r].length)
                validated[r] = true;
            else if (typeof rules[r].maxChars == 'number') {
                validated[r] = 'invalid_length_max';
                // break;
            }

            if (typeof rules[r].minChars == 'number' && rules[r].minChars <= obj[r].length)
                validated[r] = true;
            else if (typeof rules[r].minChars == 'number') {
                validated[r] = 'invalid_length_min';
                // break;
            }
        }
    }

    let someEmpty = false;

    if (rules.callback != null) {
        for (let v in validated) {
            if (validated[v] === 'empty') {
                validated.allValid = false;
                rules.callback();
                someEmpty = true;
                // break;
            }
        }
    }

    if (!someEmpty) {
        for (let v in validated) {
            if (validated[v] != true) {
                validated.allValid = false;
                if (rules[v].callback != null) {
                    rules[v].callback(validated[v], v);
                    // break;
                }
            }
        }
    }

    return validated;
}

const delay = t => new Promise(resolve => setTimeout(resolve, t));

function showToast(alertMessage, alertType = 'alert-info', alertLoader = false, alertStrong = null, alertHeader = null) {
    // Create the alert element
    const alertContainerElement = document.querySelector('#alert');
    alertContainerElement.classList.add('position-fixed', 'top-0', 'end-0', 'me-3');

    // Create the alert element
    const alertElement = document.createElement('div');
    alertElement.classList.add('position-static', 'mt-3', 'alert', alertType, 'd-flex', 'align-items-center', 'animate__animated');
    alertElement.setAttribute('role', 'alert');

    // Create the spinner element
    const spinnerElement = document.createElement('span');
    spinnerElement.classList.add('spinner', 'spinner-border', 'spinner-border-sm');
    spinnerElement.setAttribute('role', 'status');
    spinnerElement.setAttribute('aria-hidden', 'true');

    // Create the info icon element
    const infoElement = document.createElement('span');
    infoElement.classList.add('ri', 'ri-message-fill');
    infoElement.setAttribute('role', 'status');
    infoElement.setAttribute('aria-hidden', 'true');
    infoElement.style.display = 'inline';

    // Create the success icon element
    const successElement = document.createElement('span');
    successElement.classList.add('ri', 'ri-checkbox-circle-fill');
    successElement.setAttribute('role', 'status');
    successElement.setAttribute('aria-hidden', 'true');
    if (alertLoader) successElement.style.display = 'none';
    else successElement.style.display = 'inline';

    // Create the error icon element
    const errorElement = document.createElement('span');
    errorElement.classList.add('ri', 'ri-alert-fill');
    errorElement.setAttribute('role', 'status');
    errorElement.setAttribute('aria-hidden', 'true');
    errorElement.style.display = 'inline';

    // Create the heading element
    const headingElement = document.createElement('h4');
    headingElement.classList.add('alert-heading', 'fs-6', 'fw-bolder', 'm-0', 'mb-1');
    if (alertType == 'alert-info') headingElement.textContent = 'Information';
    if (alertType == 'alert-success') headingElement.textContent = 'Success';
    if (alertType == 'alert-danger') headingElement.textContent = 'Error';
    if (alertHeader !== null) headingElement.textContent = alertHeader;

    // Create the message element
    const messageElement = document.createElement('span');
    
    if (alertStrong == null && /Instruction\s\d+/.test(alertMessage)) {
        messageElement.innerHTML = alertMessage.replace(/(Instruction\s\d+)/g, '<strong>$1</strong>');
    } else if (alertStrong !== null) {
        const messageWithBoldText = alertMessage.replace(alertStrong, `<strong>${alertStrong}</strong>`);
        messageElement.innerHTML = messageWithBoldText;
    } else {
        messageElement.textContent = alertMessage;
    }

    // Create the icon container element
    const icontainerElement = document.createElement('div');
    icontainerElement.classList.add('alert-icon', 'd-flex', 'align-items-center', 'me-3');
    if (alertLoader) icontainerElement.appendChild(spinnerElement);
    if (alertLoader) icontainerElement.appendChild(successElement);
    if (alertType == 'alert-info' && !alertLoader) icontainerElement.appendChild(infoElement);
    if (alertType == 'alert-success') icontainerElement.appendChild(successElement);
    if (alertType == 'alert-danger') icontainerElement.appendChild(errorElement);

    // Create the text container element
    const containerElement = document.createElement('div');
    containerElement.classList.add('alert-container', 'w-100', 'm-0');
    containerElement.appendChild(headingElement);
    containerElement.appendChild(messageElement);

    // Add the spinner, message, and progress bar to the alert element
    alertElement.appendChild(icontainerElement);
    alertElement.appendChild(containerElement);

    // Show the alert on the page
    alertContainerElement.insertBefore(alertElement, alertContainerElement.firstChild);

    // Return an object with hide method to allow manual control
    const alertObject = {
        show: function () {
            if (alertLoader && alertHeader === null) headingElement.textContent = 'Processing';
            alertElement.classList.add('animate__fadeIn');
            return alertObject;
        },
        hide: function () {
            if (!alertLoader) return;
            setTimeout(() => {
                if (alertHeader === null) headingElement.textContent = 'Success';
                spinnerElement.style.display = 'none';
                successElement.style.display = 'inline';
                messageElement.textContent = alertMessage + ' ' + 'complete';
                alertElement.classList.remove('alert-info');
                alertElement.classList.add('alert-success');
            }, 500);
            setTimeout(() => alertElement.classList.add('animate__fadeOut'), 4000);
            setTimeout(() => alertElement.remove(), 4500);
            return alertObject;
        },
        remove: function () {
            alertElement.remove();
            return alertObject;
        }
    };

    // Hide the alert automatically if alertLoader is false
    if (!alertLoader) {
        alertElement.classList.add('animate__fadeIn');
        setTimeout(() => alertElement.classList.add('animate__fadeOut'), 4000);
        setTimeout(() => alertElement.remove(), 4500);
    }

    // Return the alert object
    return alertObject;
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

function cleanText(text) {
    const replacements = {
        '&#039;': "'",
        '&quot;': '"',
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        // add more replacements as needed
    };

    const cleaner = text.replace(/&#?\w+;/g, match => {
        if (replacements.hasOwnProperty(match)) {
            return replacements[match];
        } else {
            return match;
        }
    });

    return cleaner.trim();
};

function formatDate(dateStr) {
    // Create a Date object from the input string
    const date = new Date(dateStr);

    // Get the month name and day of the month from the Date object
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = date.getMonth();
    const day = date.getDate();

    // Get the year from the Date object
    const year = date.getFullYear();

    // Construct the formatted date string
    const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;

    return formattedDate;
};

function tooltipConfig() {
    // Initialize the tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);

        // Hide the tooltip when the element is hidden
        if (tooltipTriggerEl.offsetParent === null) {
            tooltip.hide();
        }

        // Watch for changes in visibility using MutationObserver
        const observer = new MutationObserver(() => {
            if (tooltipTriggerEl.offsetParent === null) {
                tooltip.hide();
                tooltip.disable();
            } else {
                tooltip.enable();
            }
        });

        observer.observe(tooltipTriggerEl, { attributes: true, attributeFilter: ['style'] });

        return tooltip;
    });

    return tooltipList;
};

function limitText(text) {
    let maxLength = 40;

    // Check if the text length is greater than the maximum length
    if (text.length > maxLength) {
        // Truncate the text and add an ellipsis at the end
        text = text.substring(0, maxLength) + "...";
    }

    return text;
};

function isEmpty(value) {
    if (Array.isArray(value) && value !== null) {
        return value.length === 0 || value.every(val => isEmpty(val));
    } else if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0 || Object.values(value).every(val => isEmpty(val));
    } else {
        return value === null || value === undefined || value.trim() === '' || value === '0000-00-00 00:00:00' || (value.startsWith('-') && !/^-(\w+)/.test(value) && !/^-(\w+|\s)/.test(value)) || value.startsWith('=') || value.startsWith('.');
    }
};

function displayValue(value) {
    return value.toString();
};

function formatDateFull() {
    const date = new Date(); // Creates a new Date object with the current date and time
    const year = date.getFullYear(); // Gets the year using local time
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds a leading zero if the month is less than 10
    const day = String(date.getDate()).padStart(2, '0'); // Adds a leading zero if the day is less than 10
    const hours = String(date.getHours()).padStart(2, '0'); // Adds a leading zero if the hours are less than 10
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Adds a leading zero if the minutes are less than 10
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Adds a leading zero if the seconds are less than 10

    // Formats the date in the desired format
    const formatDateFull = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Outputs something like "2023-02-27 18:27:27" (depending on the current date and time)
    return formatDateFull;
};

function formatDateYear() {
    const date = new Date(); // Creates a new Date object with the current date and time
    const hour = date.getHours(); // Gets the hour of the day (0-23)

    // Deducts one day if the current time is between 12:00 AM to 9:00 AM
    if (hour >= 0 && hour <= 9) {
        date.setDate(date.getDate() - 1);
    }

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adds a leading zero if the month is less than 10
    const day = String(date.getDate()).padStart(2, '0'); // Adds a leading zero if the day is less than 10
    const year = String(date.getFullYear()).slice(2); // Gets the last two digits of the year

    // Formats the date in the desired format
    const formatDateYear = `${month} ${day} ${year}`;

    // Outputs something like "03 21 23" (depending on the current date)
    return formatDateYear;
};

function formatDateTime(dateStr, version = 1) {
    let monthNames;
    const date = new Date(dateStr);
    
    if (version === 1) monthNames = [  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    else if (version === 2) monthNames = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12" ];


    const monthIndex = date.getMonth(); // Gets the month as a number (0-11)
    const day = date.getDate(); // Gets the day of the month (1-31)
    const year = date.getFullYear(); // Gets the year (four digits)
    let hours = date.getHours(); // Gets the hour (0-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Gets the minute (0-59) and adds a leading zero if necessary

    let amOrPm = 'am'; // Assumes it's AM

    // Adjusts hours if necessary
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
        amOrPm = 'pm';
    }

    let formatDateTime;

    if (version === 1) formatDateTime = `${monthNames[monthIndex]} ${day}, ${year} ${hours}:${minutes} ${amOrPm}`; // Outputs something like "March 27, 2023 9:50 pm" (depending on the current date and time)
    else if (version === 2) formatDateTime = `${monthNames[monthIndex]}/${day}/${year} ${hours}:${minutes} ${amOrPm}`; // Outputs something like "3/27/2023 9:50 pm" (depending on the current date and time)

    return formatDateTime; // Outputs something like "March 27, 2023 9:50 pm" (depending on the current date and time)
};

function formatTaskName(text) {
    const regex = /(\d{1,2}\s\d{1,2}\s\d{2})(?=\S)/g;
    return text.replace(regex, '$1 ');
};

function formatTime(timeString) {
    if (isEmpty(timeString)) return;
    const [hours, minutes] = timeString.split(":").map(Number);
    if (hours > 0 && minutes > 0) {
        return `${hours} hr. ${minutes} min.`;
    } else if (hours > 0 && minutes === 0) {
        return `${hours} hr.`;
    } else {
        return `${minutes} min.`;
    }
};

function totalStartEndTime(start, end) {
    if (start === end) return '00:01';

    const startParts = start.split(/[:\s]/);
    const endParts = end.split(/[:\s]/);

    let startHour = parseInt(startParts[0]);
    let startMinute = parseInt(startParts[1]);
    let endHour = parseInt(endParts[0]);
    let endMinute = parseInt(endParts[1]);

    // Check if end time is earlier than start time or equal to start time
    if (endHour < startHour || (endHour === startHour && endMinute < startMinute)) {
        endHour += 12;
    }

    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const differenceMinutes = endMinutes - startMinutes;

    const differenceHour = Math.floor(differenceMinutes / 60);
    const differenceMinute = differenceMinutes % 60;

    const formattedHour = differenceHour < 10 ? `0${differenceHour}` : differenceHour;
    const formattedMinute = differenceMinute < 10 ? `0${differenceMinute}` : differenceMinute;

    return `${formattedHour}:${formattedMinute}`;
};

function totalTime(timeArray) {
    const totalMinutes = timeArray.reduce((acc, time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return acc + hours * 60 + minutes;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};

function splitTask(str) {
    if (str.includes('<additional_instrux>')) {
        return str.split('<additional_instrux>');
    } else {
        return [str];
    }
};

function numberOnly(event) {
    const key = event.key;

    if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'ArrowLeft' || key === 'ArrowRight') {
        return true;
    }

    if (isNaN(Number(key))) {
        event.preventDefault();
        return false;
    }

    return true;
};

function todayDate() {
    let currentDate = new Date();
    let hour = currentDate.getHours();

    // Deducts one day if the current time is between 12:00 AM to 9:00 AM
    if (hour >= 0 && hour <= 9) {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    
    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return `${month}/${day}/${year}`;
};


function handleDateChange(method, selectedDate) {
    let date = formatDate(selectedDate);
    if (date === 'January 1, 1970') {
        selectedDate = todayDate();
        method(selectedDate);
    } else {
        method(date);
    }
};

function objectToFormData(obj){
    const formData = new FormData()
    
    for(let o in obj)
        formData.append(o, obj[o])

    return formData
}

const addCss = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

export {
    axiosR,
    lStore,
    removeFix,
    validateForm,
    delay,
    scrollToTop,
    showToast,
    cleanText,
    formatDate,
    tooltipConfig,
    limitText,
    isEmpty,
    displayValue,
    formatDateFull,
    formatDateYear,
    formatDateTime,
    formatTaskName,
    formatTime,
    totalStartEndTime,
    totalTime,
    splitTask,
    numberOnly,
    todayDate,
    handleDateChange,
    addCss,
    objectToFormData
};