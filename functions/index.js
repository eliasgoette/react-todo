// const functions = require('firebase-functions');
// const cors = require('cors')({ origin: '*' });

// exports.collectCSPReports = functions.https.onRequest((request, response) => {

//     // Set "key": "Content-Security-Policy", to "...-Report-Only" when using this

//     cors(request, response, () => {
//         let report = request.body;

//         // If the body is a buffer, attempt to parse it as JSON
//         if (Buffer.isBuffer(report)) {
//             try {
//                 report = JSON.parse(report.toString('utf8'));
//             } catch (error) {
//                 console.error("Failed to parse CSP report:", error);
//                 response.status(400).send('Invalid CSP report format');
//                 return;
//             }
//         }

//         // Destructure the desired values
//         const { "violated-directive": violatedDirective, "blocked-uri": blockedUri } = report["csp-report"] || {};

//         console.log('Violated Directive:', violatedDirective);
//         console.log('Blocked URI:', blockedUri);

//         // Respond to the browser
//         response.status(200).send('CSP report collected');
//     });
// });