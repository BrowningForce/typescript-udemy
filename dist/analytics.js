"use strict";
let logged;
sendAnalytics('data');
function sendAnalytics(data) {
    console.log(data);
    logged = true;
}
