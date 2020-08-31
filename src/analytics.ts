let logged;

sendAnalytics('data');

function sendAnalytics(data: string) {
    console.log(data);
    logged = true;
}