// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp(functions.config().firebase);
var nodemailer = require('nodemailer');
var FormData = require('form-data');
const { user } = require('firebase-functions/lib/providers/auth');

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  auth: {
    user: 'info@mothersfood.in',
    pass: '6ugG9dTDrNSZ'
  }
});

// exports.sendMailWelcome = functions.database.ref("/CloudKitchen/{pushid}/Email")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const userid = snap.child("UserId").val();

//     const mailOptions = {
//         from: 'Mothers Food <info@mothersfood.in>', // Something like: Jane Doe <janedoe@gmail.com>
//         to: email,
//         subject: 'Cheers! HomeChef Registration is now Successful. ', // email subject
//         html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//          <head> 
//           <meta charset="UTF-8"> 
//           <meta name="x-apple-disable-message-reformatting"> 
//           <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//           <meta content="telephone=no" name="format-detection"> 
//           <title>New email 3</title> 
//           <!--[if (mso 16)]>
//             <style type="text/css">
//             a {text-decoration: none;}
//             </style>
//             <![endif]--> 
//           <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//           <!--[if gte mso 9]>
//         <xml>
//             <o:OfficeDocumentSettings>
//             <o:AllowPNG></o:AllowPNG>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//             </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]--> 
//           <style type="text/css">
//         #outlook a {
//             padding:0;
//         }
//         .ExternalClass {
//             width:100%;
//         }
//         .ExternalClass,
//         .ExternalClass p,
//         .ExternalClass span,
//         .ExternalClass font,
//         .ExternalClass td,
//         .ExternalClass div {
//             line-height:100%;
//         }
//         .es-button {
//             mso-style-priority:100!important;
//             text-decoration:none!important;
//         }
//         a[x-apple-data-detectors] {
//             color:inherit!important;
//             text-decoration:none!important;
//             font-size:inherit!important;
//             font-family:inherit!important;
//             font-weight:inherit!important;
//             line-height:inherit!important;
//         }
//         .es-desk-hidden {
//             display:none;
//             float:left;
//             overflow:hidden;
//             width:0;
//             max-height:0;
//             line-height:0;
//             mso-hide:all;
//         }
//         </style> 
//          </head> 
//          <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//           <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//            <!--[if gte mso 9]>
//                     <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                         <v:fill type="tile" color="#ffffff"></v:fill>
//                     </v:background>
//                 <![endif]--> 
//            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//              <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//               <td style="padding:0;Margin:0"> 
//                <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                  </tr> 
//                </table></td> 
//              </tr> 
//              <tr style="border-collapse:collapse"> 
//               <td valign="top" style="padding:0;Margin:0"> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>We’re glad to extend our hands to make you a family member.<br>Yes, you’re registration to join as a HomeChef with MothersFood is now Successful. Please find your Home-Chef details below:<br><br><strong>HomeChef ID : `+userid+`</strong><br><br>We hope to see you around!<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/58191595014751803.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:5px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                  <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                 </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="left" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table></td> 
//              </tr> 
//            </table> 
//           </div>  
//          </body>
//         </html>`
//     };


//     return transporter.sendMail(mailOptions, (erro, info) => {
//         if(erro){
//             console.log(erro);
//         }
//         else{
//             console.log(info);
//         }
//         return info
//     });

//     });
// });

// exports.sendMailSlotBooking = functions.database.ref("/CloudKitchen/{pushid}/Slot")
// .onCreate((snap,context)=>{
// 
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const userid = snap.child("UserId").val();
//         const time = snap.child("SlotTime").val();
//         const date = snap.child("SlotDate").val();
//         const booked = snap.child("Slot").val();

//         if(booked==="Booked"){

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Yippee! Taste audit slot is confirmed. Prep your skills for the Taste Audit. ', // email subject
//                 html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name+`,</strong><br><br>Greetings from MothersFood!<br><br>You're just a step away to finish your Taste-audit process. Your slot to Taste-audit is now confirmed. You'll receive the delivery address and area manager's contact details, 24 hours before your Taste-audit slot<br><br><strong>HomeChef ID : `+userid+`&nbsp;<br>Taste-audit Date &amp; Time: `+date+`,`+time+`</strong><br><br>Note: In case you need any help delivering your parcel, our team is just a call away.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/7431595016137649.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });

//         }
//         else {

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Sorry to see you go! Taste Audit slot has been cancelled.', // email subject
//                 html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name+`,</strong><br><br>Greetings from MothersFood!<br><br>Your Taste-Audit slot has been cancelled. Visit the MothersFood app to book the next available slot for your Taste-audit based on your feasibility.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/56341595016183126.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });

//         }

//     });

// });

// exports.sendMailSlotAssigned = functions.database.ref("/SlotsReport/{pushid}/Assigned")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/SlotsReport/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const assigned = snap.child("Assigned").val();
//         const aperson = snap.child("APerson").val();
//         const amobile = snap.child("AMobile").val();
//         const aadress = snap.child("AAddress").val();
//         const agps = snap.child("AGps").val();
//         const slot = snap.child("Slot").val();
//         const date = snap.child("Date").val();

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Hurray! Taste Audit specialist has been assigned.', // email subject
//                 html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>Taste Audit Specialist has been assigned to taste your food. Please deliver your food to the below details on the scheduled date & time : `+date+`,`+slot+`<br><br>Address : `+aadress+` <br><br>GPS : `+agps+`<br><br>Area Manager’s name & Contact number : `+aperson+`,`+amobile +`<br><br>Note: Please reach out to our area manager, in case of any doubts.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/13731595006924168.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });


//     });

// });

// exports.sendMailTasteAudit = functions.database.ref("/CloudKitchen/{pushid}/Passed")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const passed = snap.child("Passed").val();
//         const ratings = snap.child("ARatings").val();
//         const userid = snap.child("UserId").val();

//         if(passed==="Yes"){

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Congratulations! You’ve successfully got through the Taste-Audit.', // email subject
//                 html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>Congratulations! Your cooking skills blew our mind, and we can’t wait to have you on board. Yes, you’ve successfully got through your taste-audit test and proven to be worthy of a Home-Chef. Please find the details below:<br><br><strong>HomeChef ID : `+userid+`</strong><br><br>Rating : `+ratings+`<br><br>All you need to do is to open the app and select a suitable package for you. <br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/66961595016425217.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });

//         }
//         else {

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Sorry to send you away! You’ve been rejected in the Taste Audit test', // email subject
//                 html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>Thank you for participating in our taste audit procedure created for Home Chefs enthusiastically. We appreciate your performance, but unfortunately, we had zero-in other Home-chefs with exceptional performance, and you’ve been rejected in the Taste-audit test.<br><br>However, if you ever want to join us back with updated cooking skills, our door is always open.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/42921595016321906.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });

//         }

//     });

// });

// exports.sendMailMFCash = functions.database.ref("/CloudKitchen/{pushid}/Passed")
// .onCreate((snap,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const passed = snap.child("Passed").val();
//         if(passed==="Yes"){
//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: ' Your wallet has been credited with 500 MF Cash. Hurray! ', // email subject
//                 html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>Right talent should be rewarded, and here’s yours. 500 MF Cash has been credited to your account for succeeding in the Taste audit test. <br>Home-Chef details below:<br><br>You can redeem the MF Cash within 15 days from now.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/60971595016277717.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });
//         }
//         else{
//             return 
//         }
//     });
// });

// exports.sendMailPayment = functions.database.ref("/CloudKitchen/{pushid}/Paid")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();
//         const userid = snap.child("UserId").val();
//         const paid = snap.child("Paid").val();

//         if(paid==="Yes"){

//             const mailOptions = {
//                 from: 'Mothers Food <info@mothersfood.in>', 
//                 to: email,
//                 subject: 'Yayiee! We’ve received your Payment.', // email subject
//                 html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//                 <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//                  <head> 
//                   <meta charset="UTF-8"> 
//                   <meta name="x-apple-disable-message-reformatting"> 
//                   <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//                   <meta content="telephone=no" name="format-detection"> 
//                   <title>New email 3</title> 
//                   <!--[if (mso 16)]>
//                     <style type="text/css">
//                     a {text-decoration: none;}
//                     </style>
//                     <![endif]--> 
//                   <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//                   <!--[if gte mso 9]>
//                 <xml>
//                     <o:OfficeDocumentSettings>
//                     <o:AllowPNG></o:AllowPNG>
//                     <o:PixelsPerInch>96</o:PixelsPerInch>
//                     </o:OfficeDocumentSettings>
//                 </xml>
//                 <![endif]--> 
//                   <style type="text/css">
//                 #outlook a {
//                     padding:0;
//                 }
//                 .ExternalClass {
//                     width:100%;
//                 }
//                 .ExternalClass,
//                 .ExternalClass p,
//                 .ExternalClass span,
//                 .ExternalClass font,
//                 .ExternalClass td,
//                 .ExternalClass div {
//                     line-height:100%;
//                 }
//                 .es-button {
//                     mso-style-priority:100!important;
//                     text-decoration:none!important;
//                 }
//                 a[x-apple-data-detectors] {
//                     color:inherit!important;
//                     text-decoration:none!important;
//                     font-size:inherit!important;
//                     font-family:inherit!important;
//                     font-weight:inherit!important;
//                     line-height:inherit!important;
//                 }
//                 .es-desk-hidden {
//                     display:none;
//                     float:left;
//                     overflow:hidden;
//                     width:0;
//                     max-height:0;
//                     line-height:0;
//                     mso-hide:all;
//                 }
//                 </style> 
//                  </head> 
//                  <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//                   <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//                    <!--[if gte mso 9]>
//                             <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                                 <v:fill type="tile" color="#ffffff"></v:fill>
//                             </v:background>
//                         <![endif]--> 
//                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//                      <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//                       <td style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                      <tr style="border-collapse:collapse"> 
//                       <td valign="top" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>We’re glad to inform you that we’ve received your payment against<br> <strong>HomeChef ID : `+userid+`</strong>.<br>Our backend team will process your payment and get in touch with you for required certifications processing. All you need to do is wait for just a while more.<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/42471595016170779.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:5px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                          <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                       <td style="padding:0;Margin:0;width:20px"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                   <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                                    <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                          <tr style="border-collapse:collapse"> 
//                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                          </tr> 
//                                        </table></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="left" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table> 
//                        <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                            <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                      <tr style="border-collapse:collapse"> 
//                                       <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                                      </tr> 
//                                    </table></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table> 
//                   </div>  
//                  </body>
//                 </html>`
//             };
//             return transporter.sendMail(mailOptions, (erro, info) => {
//                 if(erro){
//                     console.log(erro);
//                 }
//                 else{
//                     console.log(info);
//                 }
//                 return info
//             });

//         }
//         else{
//             return 
//         }

//     });

// });

// exports.sendMailPartner = functions.database.ref("/Referrals/Partner/{pushid}/Email")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Referrals/Partner/"+pushid+"/").once('value').then(snap => {
//         const email = snap.child("Email").val();
//         const name = snap.child("Name").val();

//     const mailOptions = {
//         from: 'Mothers Food <info@mothersfood.in>', // Something like: Jane Doe <janedoe@gmail.com>
//         to: email,
//         subject: 'Cheers! HomeChef Registration is now Successful. ', // email subject
//         html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
//          <head> 
//           <meta charset="UTF-8"> 
//           <meta name="x-apple-disable-message-reformatting"> 
//           <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
//           <meta content="telephone=no" name="format-detection"> 
//           <title>New email 3</title> 
//           <!--[if (mso 16)]>
//             <style type="text/css">
//             a {text-decoration: none;}
//             </style>
//             <![endif]--> 
//           <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
//           <!--[if gte mso 9]>
//         <xml>
//             <o:OfficeDocumentSettings>
//             <o:AllowPNG></o:AllowPNG>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//             </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]--> 
//           <style type="text/css">
//         #outlook a {
//             padding:0;
//         }
//         .ExternalClass {
//             width:100%;
//         }
//         .ExternalClass,
//         .ExternalClass p,
//         .ExternalClass span,
//         .ExternalClass font,
//         .ExternalClass td,
//         .ExternalClass div {
//             line-height:100%;
//         }
//         .es-button {
//             mso-style-priority:100!important;
//             text-decoration:none!important;
//         }
//         a[x-apple-data-detectors] {
//             color:inherit!important;
//             text-decoration:none!important;
//             font-size:inherit!important;
//             font-family:inherit!important;
//             font-weight:inherit!important;
//             line-height:inherit!important;
//         }
//         .es-desk-hidden {
//             display:none;
//             float:left;
//             overflow:hidden;
//             width:0;
//             max-height:0;
//             line-height:0;
//             mso-hide:all;
//         }
//         </style> 
//          </head> 
//          <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
//           <div class="es-wrapper-color" style="background-color:#F6F6F6"> 
//            <!--[if gte mso 9]>
//                     <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
//                         <v:fill type="tile" color="#ffffff"></v:fill>
//                     </v:background>
//                 <![endif]--> 
//            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
//              <tr class="gmail-fix" height="0" style="border-collapse:collapse"> 
//               <td style="padding:0;Margin:0"> 
//                <table cellpadding="0" cellspacing="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td cellpadding="0" cellspacing="0" border="0" height="0" style="padding:0;Margin:0;line-height:1px;min-width:600px"><img src="https://esputnik.com/repository/applications/images/blank.gif" width="600" height="1" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt></td> 
//                  </tr> 
//                </table></td> 
//              </tr> 
//              <tr style="border-collapse:collapse"> 
//               <td valign="top" style="padding:0;Margin:0"> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-bottom:5px;background-color:#FFFFFF"> 
//                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
//                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;padding-top:30px;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73171595006289267.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="60"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;padding-left:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333"><strong>Dear `+name +`,</strong><br><br>Greetings from MothersFood!<br><br>We’re glad to extend our hands to make you a family member. Yes, your registration to join as a Home-Chef with MothersFood is now Successful. You can now download the app and book your slot for Taste audit. Follow the process below:<ul><li>Download MothersFood app from Play store.</li><li>Sign In with your registered mobile details and the OTP sent to your mobile number.</li><li>Book your slot for the Taste audit process from the available slots.Our chef onboarding team will get in touch with you to share further details.</li></ul>We hope to see you around!<br><br>Thanks,<br><span style="color:#FF0000"><strong>Team MothersFood</strong></span></p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/42751595016267719.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="380" height="197"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" bgcolor="#e41c39" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF"><strong>DOWNLOAD APP</strong></p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#E41C39" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E41C39;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:5px;padding-bottom:15px;padding-left:20px;padding-right:20px"> 
//                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:278px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="right" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><a target="_blank" href="https://play.google.com/store/apps/details?id=mothers.food.motherfoodpartner" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/72431594827334019.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:5px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:277px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                  <td align="left" style="padding:0;Margin:0;padding-right:5px;font-size:0px"><img class="adapt-img" src="https://huevhm.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/91241594827364926.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="135" height="44"></td>   
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#cccccc" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#CCCCCC"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666">FOLLOW US ON</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td class="esdev-adapt-off" align="left" bgcolor="#ffffff" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td class="es-m-p0r" align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.facebook.com/MothersFoodIndia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/5101595007192182.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;width:53px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.instagram.com/mothersfoodindia/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/73761595007211423.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://twitter.com/MFoodin" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/84991595007223469.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.youtube.com/channel/UCdaLAl8sc_FyLhR-ch40AoA" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2CB543"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/86671595007233816.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="30" height="30"></a></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                               <td style="padding:0;Margin:0;width:20px"></td> 
//                              </tr> 
//                            </table></td> 
//                           <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0"> 
//                            <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="left" style="padding:0;Margin:0;width:52px"> 
//                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                                  <tr style="border-collapse:collapse"> 
//                                   <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/46871595007643490.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="33" height="30"></td> 
//                                  </tr> 
//                                </table></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#ffffff" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#FFFFFF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="left" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">www.mothersfood.in</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" bgcolor="#BFBFBF" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;background-color:#BFBFBF"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">© 2020 MothersFood. All rights reserved.</p></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table> 
//                <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
//                  <tr style="border-collapse:collapse"> 
//                   <td align="center" bgcolor="#efefef" style="padding:0;Margin:0;background-color:#EFEFEF"> 
//                    <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
//                      <tr style="border-collapse:collapse"> 
//                       <td align="left" style="padding:0;Margin:0"> 
//                        <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                          <tr style="border-collapse:collapse"> 
//                           <td align="center" valign="top" style="padding:0;Margin:0;width:600px"> 
//                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
//                              <tr style="border-collapse:collapse"> 
//                               <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ihdbzc.stripocdn.email/content/guids/CABINET_4baa4993e26354e6e6181b3f1562a456/images/64791595010314499.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" height="48"></td> 
//                              </tr> 
//                            </table></td> 
//                          </tr> 
//                        </table></td> 
//                      </tr> 
//                    </table></td> 
//                  </tr> 
//                </table></td> 
//              </tr> 
//            </table> 
//           </div>  
//          </body>
//         </html>`
//     };


//     return transporter.sendMail(mailOptions, (erro, info) => {
//         if(erro){
//             console.log(erro);
//         }
//         else{
//             console.log(info);
//         }
//         return info
//     });

//     });
// });

// exports.sendSMSRegister = functions.database.ref("/CloudKitchen/{pushid}/Name")
// .onCreate((snap,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//       const mobile = snap.child("MobileNumber").val();
//       const name = snap.child("Name").val();
//       const chefid = snap.child("UserId").val();
//       axios.defaults.headers = {
//         'Content-Type': 'application/json',
//     }
//      return axios
//         .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Congratulations `+name+`!%0aYour Registration is Successful. You are now a member of the MothersFood family. %0aYour Chef ID : `+chefid+` %0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//           .then((res) => {
//             console.log(res);
//             return null;
//         }).catch((err) => {
//             console.log(err);
//             return null;
//         });

//     });
// });


// exports.sendSMSSlot = functions.database.ref("/CloudKitchen/{pushid}/Slot")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);
//   return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//       const mobile = snap.child("MobileNumber").val();
//       const chefid = snap.child("UserId").val();
//       const name = snap.child("Name").val();

//       if(booked==="Booked"){

//         axios.defaults.headers = {
//           'Content-Type': 'application/json',
//       }



//         return axios
//             .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Hurray%0aDear `+name+`.!%0aYour video has been uploaded successfully and submitted for the review. Out Audit Specialist team will review and approve within 24Hrs.%0aChef ID : `+chefid+`%0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//               .then((res) => {
//                 console.log(res);
//                 return null;
//             }).catch((err) => {
//                 console.log(err);
//                 return null;
//             });
//       }
//       else{
//         return null;
//       }

//     });
// });

// exports.sendMFCASHPAYMENT = functions.database.ref("/Users/{pushid}/Transactions/{pushid1}/UserId")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   const pushid1=context.params.pushid1;
//   console.log(pushid);
//   return admin.database().ref("/Users/"+pushid+"/").once('value').then(snap => {
//     const mobile = snap.child("Number").val();
//     const name = snap.child("Name").val();

//     return admin.database().ref("/Users/"+pushid+"/Transactions/"+pushid1).once('value').then(snap => {
//       const amount = snap.child("Amount").val();
//       const balance = snap.child("UserBalance").val();
//       const type = snap.child("TransactionType").val();
//         axios.defaults.headers = {
//           'Content-Type': 'application/json',
//       }

//       if(type === "Cr"){
//         return axios
//             .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Dear `+name+`, Your wallet has been credited with `+amount+` MF Cash.%0aYour total available MFCash is  `+balance+`.&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//               .then((res) => {
//                 console.log(res);
//                 return null;
//             }).catch((err) => {
//                 console.log(err);
//                 return null;
//             });
//           }
//           else{
//             return axios
//             .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Dear `+name+`, Your wallet has been debited with `+amount+` MF Cash.%0aYour total available MFCash is  `+balance+`.&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//               .then((res) => {
//                 console.log(res);
//                 return null;
//             }).catch((err) => {
//                 console.log(err);
//                 return null;
//             });
//           }

//       });


//     });
// });

// exports.sendMYCASHPAYMENT = functions.database.ref("/Users/{pushid}/TransactionsInsta/{pushid1}/UserId")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   const pushid1=context.params.pushid1;
//   console.log(pushid);
//   return admin.database().ref("/Users/"+pushid+"/").once('value').then(snap => {
//     const mobile = snap.child("Number").val();
//     const name = snap.child("Name").val();

//     return admin.database().ref("/Users/"+pushid+"/TransactionsInsta/"+pushid1).once('value').then(snap => {
//       const amount = snap.child("Amount").val();
//       const balance = snap.child("UserBalance").val();
//       const type = snap.child("TransactionType").val();
//         axios.defaults.headers = {
//           'Content-Type': 'application/json',
//       }

//       if(type === "Cr"){
//         return axios
//         .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Dear `+name+`, Your wallet has been credited with `+amount+` MY Cash.%0aYour total available MY Cash is  `+balance+`.%0aNote : You can be able to use total available MyCash in any future orders.&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//           .then((res) => {
//             console.log(res);
//             return null;
//         }).catch((err) => {
//             console.log(err);
//             return null;
//         });
//       }
//       else{
//         return axios
//         .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Dear `+name+`, Your wallet has been debited with `+amount+` MY Cash.%0aYour total available MY Cash is  `+balance+`.%0aNote : You can be able to use total available MyCash in any future orders.&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//           .then((res) => {
//             console.log(res);
//             return null;
//         }).catch((err) => {
//             console.log(err);
//             return null;
//         });
//       }

//       });

//     });
// });

// exports.sendSMSPayment = functions.database.ref("/CloudKitchen/{pushid}/Paid")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);
//   return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//     const mobile = snap.child("MobileNumber").val();
//     const chefid = snap.child("UserId").val();
//     const paid = snap.child("Paid").val();
//       if(paid==="Yes"){
//         axios.defaults.headers = {
//           'Content-Type': 'application/json',
//       }
//         return axios
//             .post(`https://apps.vibgyortel.in/client/api/sendmessage?apikey=d90d87f44f635906&mobiles=`+mobile+`&sms=Payment Received!%0aWe are glad to inform you that we have received your payment against %0aChef ID : `+chefid+`%0aOur backend team will get in touch with you soon for further proceedings.%0a- Team MothersFood&senderid=MOTHFD&schedule=no&sending-time=& client-sms-ids=&unicode=no&message- type=`)
//               .then((res) => {
//                 console.log(res);
//                 return null;
//             }).catch((err) => {
//                 console.log(err);
//                 return null;
//             });
//       }
//       else{
//         return null;
//       }

//     });
// });


//Function for CloudKitchen Changes Notification
// exports.SendCreateFoodItemsNotification = functions.database.ref("/CloudKitchen/{pushid}/FoodItems/")
// .onCreate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//     var ref = admin.database().ref("Requests").child(pushid);

//     return ref.set({ "Address":"New Food Item Added","Name":"","Number":"","Reason":"NewItem","RequestID":"","RequestType":"Food Items","Status":"Open","Type":"Chef","UserId":pushid });
// });

// exports.SendUpdateFoodItemsNotification = functions.database.ref("/CloudKitchen/{pushid}/FoodItems/")
// .onUpdate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     var ref = admin.database().ref("Requests").child(pushid);
//         return ref.set({ "Address":"Food Item Changed","Name":"","Number":"","Reason":"Update","RequestID":"","RequestType":"Food Items","Status":"Open","Type":"Chef","UserId":pushid });

// });

//Function for CloudKitchen Changes Notification
// exports.SendCreateSubscriptionItemsNotification = functions.database.ref("/Subscriptions/{pushid}")
// .onCreate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/Subscriptions/"+pushid+"/").once('value').then(snap => {
//       const chef = snap.child("Chef").val();
//       var ref = admin.database().ref("Requests").child(chef);
//         return ref.set({ "Address":"New Subscription Item Added","Name":"","Number":"","Reason":"NewItem","RequestID":"","RequestType":"Subscription","Status":"Open","Type":"Chef","UserId":chef });

//     });
// });

// exports.SendUpdateSubscriptionItemsNotification = functions.database.ref("/Subscriptions/{pushid}/")
// .onUpdate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/Subscriptions/"+pushid+"/").once('value').then(snap => {
//       const chef = snap.child("Chef").val();
//         var ref = admin.database().ref("Requests").child(chef);
//         return ref.set({ "Address":"Subscription Item Changed","Name":"","Number":"","Reason":"NewItem","RequestID":"","RequestType":"Subscription","Status":"Open","Type":"Chef","UserId":chef });

//     });

// });


// exports.ChefProfilePicUpdate = functions.database.ref("/CloudKitchen/{pushid}/PP")
// .onUpdate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     return admin.database().ref("/CloudKitchen/"+pushid+"/").once('value').then(snap => {
//          const chef = snap.child("UserId").val();
//          const approve = snap.child("PPApproval").exists();
//          const pp = snap.child("PP").val();
//          if(pp !== ""){
//           if(!approve){
//               var ref = admin.database().ref("PhotoRequest").child(chef);
//               ref.set({ "PP":pp,"Reason":"Profile Photo Approval","UserId":chef });
//               return admin.database().ref("CloudKitchen").child(chef).child("PP").set("");
//           }
//           else{
//             return null;
//           }
//         }
//         else{
//           return null;
//         }
//     });

// });


// exports.ChefApprovalChanges = functions.database.ref("/CloudKitchen/{pushid}/AStatus")
// .onUpdate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     var ref = admin.database().ref("ApprovalRequests").child(pushid);
//     return ref.set({ "Reason":"Chef Approval Status Changed","UserId":pushid });
// });


exports.ChotabetaRequest = functions.database.ref(`/Orders/{pushid}/Chotabeta`)
  .onCreate((change, context) => {
    const pushid = context.params.pushid;
    console.log(pushid);

    return admin.database().ref("/Orders/" + pushid + "/").once('value').then(snap => {
      const customername = snap.child("CName").val();
      const customernumber = snap.child("Number").val();
      const resturantname = snap.child("ChefName").val();
      var resturantphone = "";
      if (snap.child("ChefNumber").exists())
        resturantphone = snap.child("ChefNumber").val();
      const supportphone = "1234567890";
      const clientorderid = snap.child("Pushid").val();
      const pl = snap.child("ChefLoc").val().split(",");
      const picklat = pl[0];
      const picklng = pl[1];
      const pickaddress = snap.child("ChefAddress").val();
      const dl = snap.child("LocationCoordinates").val().split(",");
      const droplat = dl[0];
      const droplng = dl[1];
      const completePickLocation = picklat + ";" + picklng
      const dropaddress = snap.child("Flat").val() + "," + snap.child("Address").val();
      const toLocation = snap.child("Flat").val()
      const billpayment = "WALLET";
      let ordervalue = 0;
      const pickupotp = snap.child("CName").val();
      const total = snap.child("Total").val();
      const itemName = snap.child("ItemsDetails").val()
      const orderid = snap.child("OrderNo").val()
      var data1 = []
      // data1.items=[];
      snap.child("Cart").forEach(function (data) {
        var val = data.val();
        data1.push({ 'name': val.Name, 'price': parseFloat(String(val.Total)), 'quantity': parseFloat(String(val.Qty)) })
      });

      console.log(data1);
      console.log(customername + "," + customernumber + "," + resturantname + "," + resturantphone + "," + supportphone + "," + clientorderid + "," + picklat + "," + picklng + "," + droplat + "," + droplng + "," + dropaddress + "," + pickupotp)
      return axios({
        method: 'post',
        url: 'https://www.stackroger.com/api/vendor/place-panel-order',
        headers: { "Content-Type": "application/json" },
        data: {
          "from_lat_lng": picklat + ";" + picklng,
          "to_lat_lng": droplat + "," + droplng,
          "from_address": pickaddress,
          "to_address": dropaddress,
          "from_name": resturantname,
          "to_name": customername,
          "to_location": toLocation,
          "from_contact": resturantphone,
          "to_contact": customernumber,
          "item_price": total,
          "api_token": "5ffe956724f25-5ffe956724f2d",
          "fav_store": "hub_name:Mothers Kitchen,location:17.4420496;78.4715458,store_incharge:Srikant Reddy,contact:9100918669",
          "item_name": itemName,
          "vendor_reference_id": orderid,

        }
      }).then(response => {
        console.log(response)
        // if(response.data.message === "Success"){
          //                   console.log(response.data.data["status"]);
          //                   console.log(response.data.data["sfx_order_id"]);
          //                   admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("ShadowFX : Riders Available");
          //                   admin.database().ref("/Orders/"+pushid).child("ShadowFXOrderId").set(response.data.data["sfx_order_id"]);
          //                   // admin.database().ref("/Orders/"+pushid).child("DunzoTrackingUrl").set(response.data.track_url);
          //                }
          //              else{
          //               console.log(err)
          //               admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("ShadowFX  : Outside Shadowfax serviceablity area");
          //              }
        
        
          if (response.data.status === "Success") {
          console.log("Riders Available");
          console.log(response.data.order_id);
          admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Chotabeta : Riders Available");
          admin.database().ref("/Orders/" + pushid).child("ChotabetaOrderId").set(response.data.order_id);
          // admin.database().ref("/Orders/"+pushid).child("PickUpETA").set(response.data.data["pickupETA"]);
          // admin.database().ref("/Orders/"+pushid).child("DropETA").set(response.data.data["dropETA"]);
        }else {
          console.log(response.data.message)
          admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Chotabeta : " + response.data.message);
          // admin.database().ref("/PendingOrders/"+pushid).set(snap.val());
        }
        return null
      })
        .catch((err) => {
          admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Chotabeta : Not Able to Handle the Request");
          return console.log(err);
        });
    });

  });




//Chotabeta Status Update
exports.GetCBStatusUpdate = functions.https.onRequest((request, response) => {

  if (request.method === 'POST') {
    console.log(request.body);
    var clientorderid = request.body.order_id;
    var status = request.body.order_status_string;
    console.log(clientorderid);
    console.log(status)
    var orderpushid = "";
    let query = admin.database().ref("Orders").orderByChild('ChotabetaOrderId').equalTo(clientorderid);
    return query.once('value', (snapshot) => {

      snapshot.forEach((child) => {
        orderpushid = child.val().Pushid;
      })


      console.log(orderpushid)
      var ref = admin.database().ref("Orders").child(orderpushid);

      if (status === "Driver Ongoing") {
        ref.child("ChotabetaOrderId").set(clientorderid);

        ref.child("DeliveryApiRemarks").set("Chotabeta: Started for picking the Order");
        ref.child("DeliveryName").set(request.body.rider_name);
        ref.child("DeliveryNumber").set(request.body.rider_number);
      }
      else if (status === "Driver InQueue") {
        ref.child("DeliveryApiRemarks").set("Chotabeta : Driver in Queue");
      }
      else if (status === "Driver Arrived") {
        ref.child("DeliveryApiRemarks").set("Chotabeta : Reached for Pickup");
      }
      else if (status === "Driver Pickedup") {
        ref.child("Status").set("4");
        ref.child("DeliveryApiRemarks").set("Chotabeta: Pickedup the order");
      }
      else if (status === "Delivered") {
        ref.child("Status").set("5");
        ref.child("DeliveryApiRemarks").set("Chotabeta :  Delivered");
      }
      else if (status === "Order Cancelled") {
        ref.child("DeliveryApiRemarks").set("Chotabeta : Cancelled");
        //       ref.child("PickUpETA").set("");
        //       ref.child("DropETA").set("");
      }
      response.send("Success");
    });
  }
  else {
    response.send("Make a post request");
  }

});

//pickkup integration
exports.GetPickkupStatusUpdate = functions.https.onRequest((request, response) => {

  if (request.method === 'POST') {
    console.log(request.body);
    var clientorderid = request.body.orderId;
    var status = request.body.orderStatusCode;
    console.log(clientorderid);
    console.log(status)
    var orderpushid = "";
    let query = admin.database().ref("Orders").orderByChild('PickkupOrderId').equalTo(clientorderid);
    return query.once('value', (snapshot) => {

      snapshot.forEach((child) => {
        orderpushid = child.val().Pushid;
      })


      console.log(orderpushid)
      var ref = admin.database().ref("Orders").child(orderpushid);

      if (status === 1001) {
        ref.child("PickkupOrderId").set(clientorderid);

        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);

      }
      else if (status === 1002) {
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
        ref.child("DeliveryName").set(request.body.agentName);
        ref.child("DeliveryNumber").set(request.body.agentMobile);


      }
      else if (status === 1003) {
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
        ref.child("DeliveryLat").set(request.body.agentMobile);
        ref.child("DeliveryLng").set(request.body.agentMobile);
        ref.child("DeliveryAddress").set(request.body.agentMobile);
      }
      else if (status === 1004) {
        ref.child("Status").set("4");
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
        ref.child("PickupPhoto").set(request.body.pickupPhoto);

      }
      else if (status === 1005) {
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
      }
      else if (status === 1006) {
        ref.child("Status").set("5");
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
        ref.child("PickupPhoto").set(request.body.dropPhoto);
        ref.child("DropETA").set(request.body.eta);

      }
      else if (status === 1007) {
        ref.child("DeliveryApiRemarks").set(`Pickkup : ${request.body.orderStatus}`);
        //       ref.child("PickUpETA").set("");
        //       ref.child("DropETA").set("");
      }
      response.send("Success");
    });
  }
  else {
    response.send("Make a post request");
  }

});

//Pickup Request
exports.PickkupRequest = functions.database.ref(`/Orders/{pushid}/Pickkup`)
  .onCreate((change, context) => {
    const pushid = context.params.pushid;
    console.log(pushid);

    return admin.database().ref("/Orders/" + pushid + "/").once('value').then(snap => {
      const customername = snap.child("CName").val();
      const customernumber = snap.child("Number").val();
      const resturantname = snap.child("ChefName").val();
      var resturantphone = "";
      if (snap.child("ChefNumber").exists())
        resturantphone = snap.child("ChefNumber").val();
      const supportphone = "1234567890";
      const clientorderid = snap.child("Pushid").val();
      const pl = snap.child("ChefLoc").val().split(",");
      const picklat = pl[0];
      const picklng = pl[1];
      const pickaddress = snap.child("ChefAddress").val();
      const dl = snap.child("LocationCoordinates").val().split(",");
      const droplat = dl[0];
      const droplng = dl[1];
      const completePickLocation = picklat + ";" + picklng
      const dropaddress = snap.child("Flat").val() + "," + snap.child("Address").val();
      const toLocation = snap.child("Flat").val()
      const billpayment = "WALLET";
      let ordervalue = 0;
      const pickupotp = snap.child("CName").val();
      const total = snap.child("Total").val();
      const itemName = snap.child("ItemsDetails").val()
      const orderid = snap.child("OrderNo").val()
      var data1 = []
      // data1.items=[];
      snap.child("Cart").forEach(function (data) {
        var val = data.val();
        data1.push({ 'name': val.Name, 'price': parseFloat(String(val.Total)), 'quantity': parseFloat(String(val.Qty)) })
      });

      console.log(data1);
      console.log(customername + "," + customernumber + "," + resturantname + "," + resturantphone + "," + supportphone + "," + clientorderid + "," + picklat + "," + picklng + "," + droplat + "," + droplng + "," + dropaddress + "," + pickupotp)
      return axios({
        method: 'post',
        url: 'https://ops.pickkup.com/api/create_order?apiKey=nq1fZTkOoKM@CUL2XJV@adSyCxU$cI3nTb2McTonAO',
        headers: { "Content-Type": "application/json", "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJucTFmWlRrT29LTUBDVUwyWEpWQGFkU3lDeFUkY0kzblRiMk1jVG9uQU8iLCJpYXQiOjE2MTQ0MDMwODN9.lcpdM_K6oBkiJFPOsDyoq1Nntvv274xCEI00cIQvBXHS4USKpAWjsCrPSs-ibEZjqLpO8k8z2zWPMY1MkSOQKzI2Ha2pt3C3qv5YRvhLTYBva5bpgSJAvKgOlh3oX7ju9vZHDZdiESVHDvw5WaeRGMCT_uzk0daoHYfHTXXB6WH_4N12TxmDQ7v3XlToBAXE90InmdTCHoTzIyezPIGDUZk6CmCZBRue0Bn25ClwREYgXjFpZaPyt7gYhz4FX6Hoezh_dtBRH4XAigYovlPsorajiDoHX6tSB6jyWXqjFNlDasF99HglchDuFD52vrhtPRXG3d5v2mJaVtuzJpBkRg" },
        data: {
          "items": [
            data1.map(item => {
              return (
                {
                  "itemName": item.name,
                  "quantity": String(item.quantity)
                }
              )
            })
          ],
          "isCOD": false,
          "storeId": "BRC-2005",
          "pickupLocation": {
            "pickupAddress": pickaddress,
            "pickupLat": picklat,
            "pickupLng": picklng,
            "pickupMobile": resturantphone,
            "pickupUserName": resturantname,

          },
          "dropLocation": {
            "dropAddress": dropaddress,
            "dropLat": droplat,
            "dropLng": droplng,
            "dropUserName": customername,
            "dropMobile": customernumber,
          }
        }
      }).then(response => {
        if (response.data.success === "false") {
          console.log(response.data.message);
          admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Pickkup : " + response.data.message);
          // admin.database().ref("/PendingOrders/"+pushid).set(snap.val());
        }
        else {
          console.log("response:"+response.data.message);


          console.log("Riders Available");
          if(response.data.message==="Order Failed!"){
            admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set(response.data.message);

          }else{
            console.log(response.data.orderId);

            admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Pickkup : Riders Available");
  
            admin.database().ref("/Orders/" + pushid).child("PickkupOrderId").set(response.data.orderId);
          }
          
          // admin.database().ref("/Orders/" + pushid).child("PickUpPhoto").set(response.data.pickPhoto)
          // admin.database().ref("/Orders/" + pushid).child("DropPhoto").set(response.data.dropPhoto);
          // admin.database().ref("/Orders/" + pushid).child("DeliveryLat").set(response.data.agentLatitude);
          // admin.database().ref("/Orders/" + pushid).child("DeliveryLng").set(response.data.agentLongitude);
          // admin.database().ref("/Orders/" + pushid).child("DeliveryAddress").set(response.data.address);
          // console.log("Riders not not not Available");


        }
        return null
      })
        .catch((err) => {
          admin.database().ref("/Orders/" + pushid).child("DeliveryApiRemarks").set("Pickkup : Not Able to Handle the Request");
          return console.log(err);
        });
    });

  });

// //ShadowFx Status Update
// exports.GetShadowFXStatusUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){
//     console.log(request.body);
//     var clientorderid=request.body.client_order_id;
//     var status=request.body.order_status;
//     console.log(clientorderid);
//     var ref = admin.database().ref("Orders").child(clientorderid);
//     ref.child("DeliveryName").set(request.body.rider_name);
//     ref.child("DeliveryNumber").set(request.body.rider_contact);


//     if(status === "ALLOTTED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Rider Assigned");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("DunzoTrackingUrl").set(request.body.track_url);
//     }
//     else if(status === "ARRIVED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Reached for Pickup");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("DunzoTrackingUrl").set(request.body.track_url);
//     }
//     else if(status === "DISPATCHED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Dispatched");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("Status").set("4");
//     }
//     else if(status === "ARRIVED_CUSTOMER_DOORSTEP"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Reached for DropOff");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//     }
//     else if(status === "DELIVERED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Delivered");
//       ref.child("Status").set("5");
//     }
//     else if(status === "CANCELLED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Cancelled");
//       ref.child("PickUpETA").set("");
//       ref.child("DropETA").set("");
//     }


//     if(status === "aborted"){
//     //  return  admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//     //        admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//     //        return response.send("Success");
//     //     });
//     }

//     response.send("Success");

//   }
//   else{
//     response.send("Make a post request");
//   }

// });


// exports.RapidoRequest = functions.database.ref("/Orders/{pushid}/Rapido")
// .onCreate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//       const customername = snap.child("CName").val();
//       const customernumber = snap.child("Number").val();
//       const resturantname = snap.child("ChefName").val();
//       var resturantphone = "";
//       if(snap.child("ChefNumber").exists())
//       resturantphone = snap.child("ChefNumber").val();
//       const supportphone = "1234567890";
//       const clientorderid = snap.child("Pushid").val();
//       const pl=snap.child("ChefLoc").val().split(",");
//       const picklat = pl[0];
//       const picklng = pl[1];
//       const pickaddress = snap.child("ChefAddress").val();
//       const dl=snap.child("LocationCoordinates").val().split(",");
//       const droplat = dl[0];
//       const droplng = dl[1];
//       const dropaddress =snap.child("Flat").val()+","+snap.child("Address").val();
//       const billpayment = "WALLET";
//       const ordervalue = 0;
//       const pickupotp = snap.child("CName").val();

//       var data1=[]
//       // data1.items=[];
//       snap.child("Cart").forEach(function(data){
//         var val = data.val(); 
//         data1.push({'name':val.Name,'price':parseFloat(String(val.Total)),'quantity':parseFloat(String(val.Qty))})
//       });

//     console.log(data1);
//     console.log(customername+","+customernumber+","+resturantname+","+resturantphone+","+supportphone+","+clientorderid+","+picklat+","+picklng+","+droplat+","+droplng+","+dropaddress+","+pickupotp)
//       return axios({
//         method:'post',
//         url:'https://clb.rapido.bike/delivery/book',
//         headers:{"Content-Type": "application/json","apikey":"xNupeGn1qBtIFnD7dGJxc8T9gSXDgeMj"},
//         data: {	
//               "customerName": customername,
//               "customerNumber": customernumber,
//               "restaurantName": resturantname,
//               "restaurantPhone": resturantphone,
//               "clientOrderId": clientorderid,
//               "supportNumber": supportphone,
//               "preparationTime": 5,
//               "estimatedDeliveryTime": 40,
//               "pickup": {
//                    "lat": picklat,
//               "lng": picklng,
//                   "address": pickaddress
//               },
//               "drop": {
//                  "lat": droplat,
//                  "lng": droplng,
//                   "address": dropaddress
//               },
//               "billPaymentType": "WALLET",
//               "paymentType":"rapido",	
//               "orderValue": 0,
//               "items": data1,
//               "contactlessDelivery": false,
//               "instructions" : [{
//               "text": "Drop at the gate one",
//               "photoMandatory" : true,
//               "uploadPhoto" : true
//             }]
//           }
//       }).then(response => {
//          if(response.data.info["status"]==="error"){
//            console.log(response.data.info["message"]);
//            admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Rapido : "+response.data.info["message"]);
//           // admin.database().ref("/PendingOrders/"+pushid).set(snap.val());
//            }
//          else{
//           console.log("Riders Available");
//           console.log(response.data.data["orderId"]);
//           admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Rapido : Riders Available");
//           admin.database().ref("/Orders/"+pushid).child("RapidoOrderId").set(response.data.data["orderId"]);
//           // admin.database().ref("/Orders/"+pushid).child("PickUpETA").set(response.data.data["pickupETA"]);
//           // admin.database().ref("/Orders/"+pushid).child("DropETA").set(response.data.data["dropETA"]);
//          }
//          return null
//       })
//       .catch((err) => {
//         admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Rapido : Not Able to Handle the Request");
//         return console.log(err);
//     });
//     });

// });


// exports.DunzoRequest = functions.database.ref("/Orders/{pushid}/Dunzo")
// .onCreate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return axios({
//       method:'get',
//       url:'https://api.dunzo.in/api/v1/token',
//       headers:{"Content-Type": "application/json","client-id":" e1051b4f-6613-4272-84d9-9103db411de1","client-secret":"2151d52c-c71a-49d4-b383-2d1a54be1268"},
//     }).then(response => {
//         var token = response.data.token;

//         return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//           const customername = snap.child("CName").val();
//           const customernumber = snap.child("Number").val();
//           const resturantname = snap.child("ChefName").val();
//           var resturantphone = "";
//           if(snap.child("ChefNumber").exists())
//           resturantphone = snap.child("ChefNumber").val();
//           const supportphone = "1234567890";
//           const clientorderid = snap.child("Pushid").val();
//           const pl=snap.child("ChefLoc").val().split(",");
//           const picklat = parseFloat(pl[0]);
//           const picklng = parseFloat(pl[1]);
//           const pickaddress = snap.child("ChefAddress").val();
//           const dl=snap.child("LocationCoordinates").val().split(",");
//           const droplat = parseFloat(dl[0]);
//           const droplng = parseFloat(dl[1]);
//           const dropaddress =snap.child("Flat").val()+","+snap.child("Address").val();

//           return axios({
//             method:'post',
//             url:'https://api.dunzo.in/api/v1/tasks',
//             headers:{"Content-Type": "application/json","client-id":" e1051b4f-6613-4272-84d9-9103db411de1","Authorization":token},
//             data: {
//                   "request_id": clientorderid,
//                   "pickup_details": {
//                   "lat":picklat,
//                   "lng": picklng,
//                   "address": {
//                       "street_address_1": pickaddress
//                   }
//                  },
//                   "drop_details": {
//                       "lat": droplat,
//                       "lng": droplng,
//                       "address": {
//                           "street_address_1": dropaddress
//                   }
//                 },
//                 "sender_details": {
//                     "name": resturantname,
//                     "phone_number": resturantphone
//                 },
//                 "receiver_details": {
//                     "name": customername,
//                     "phone_number": customernumber
//                 },
//                 "package_content": ["Food | Flowers"]
//                 }
//           }).then(response => {
//              if(response.data.state === "cancelled"){
//                console.log(response.data.cancelled_by);
//                console.log(response.data.cancellation_reason);
//                admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Dunzo  Cancelled :"+response.data.cancellation_reason);
//                   // admin.database().ref("/PendingOrders/"+pushid).set(snap.val());
//                }
//              else{
//               console.log("Riders Available");
//               console.log(response.data.task_id);
//               admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Dunzo : Riders Available");
//               admin.database().ref("/Orders/"+pushid).child("DunzoOrderId").set(response.data.task_id);
//               admin.database().ref("/Orders/"+pushid).child("DunzoPrice").set(response.data.estimated_price);
//               admin.database().ref("/Orders/"+pushid).child("PickUpETA").set(response.data.eta["pickup"]);
//               admin.database().ref("/Orders/"+pushid).child("DropETA").set(response.data.eta["dropoff"]);
//              }
//              return null
//           })
//           .catch((err) => {
//             console.log(err)
//             admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Dunzo  : Locations not serviceable or Rain Error");
//         });
//         });
//     })
//     .catch((err) => {
//       admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("Dunzo  : Locations not serviceable or Rain Error");
//       return console.log(err);
//   });

// });


// exports.WeFastRequest = functions.database.ref("/Orders/{pushid}/WeFast")
// .onCreate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);


//         return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//           const customername = snap.child("CName").val();
//           const customernumber = snap.child("Number").val();
//           const resturantname = snap.child("ChefName").val();
//           var resturantphone = "";
//           if(snap.child("ChefNumber").exists())
//           resturantphone = snap.child("ChefNumber").val();
//           const supportphone = "1234567890";
//           const clientorderid = snap.child("Pushid").val();
//           const pl=snap.child("ChefLoc").val().split(",");
//           const picklat = parseFloat(pl[0]);
//           const picklng = parseFloat(pl[1]);
//           const pickaddress = snap.child("ChefAddress").val();
//           const dl=snap.child("LocationCoordinates").val().split(",");
//           const droplat = parseFloat(dl[0]);
//           const droplng = parseFloat(dl[1]);
//           const dropaddress =snap.child("Flat").val()+","+snap.child("Address").val();

//           return axios({
//             method:'post',
//             url:'https://robot.wefast.in/api/business/1.1/create-order',
//             headers:{"Content-Type": "application/json","X-DV-Auth-Token":"EADE6378AB00423309744F55BCF8EB07079495C2"},
//             data: {
//               "matter":"Home Food",
//               "points":
//               [
//                 {
//                   "client_order_id":clientorderid,
//                   "address":pickaddress,
//                   "latitude": picklat, 
//                  "longitude": picklng, 
//                 "contact_person":
//                   {
//                     "name":resturantname,
//                     "phone":"91"+resturantphone
//                   }
//                 },
//                 {
//                   "client_order_id":clientorderid,
//                   "address":dropaddress,
//                   "latitude": droplat, 
//                   "longitude": droplng, 
//                       "contact_person":
//                         {
//                           "name":customername,
//                           "phone":"91"+customernumber
//                         }
//                 }
//               ]
//             }
//           }).then(response => {
//              if(response.data.is_successful === "true"){
//               console.log(response.data.order);
//               return admin.database().ref("/Orders/"+pushid).child("WeFast").set(response.data.order["order_id"]);
//              }
//              return null
//           })
//           .catch((err) => {
//             console.log(err)
//         });
//         });

// });


// exports.GetShadowFXRequest = functions.database.ref("/Orders/{pushid}/ShadowFx")
// .onCreate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);

//         return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//           const customername = snap.child("CName").val();
//           const customernumber = snap.child("Number").val();
//           const resturantname = snap.child("ChefName").val();
//           const city = snap.child("ChefCity").val();
//           const total = snap.child("Total").val();
//           var resturantphone = "";
//           if(snap.child("ChefNumber").exists())
//             resturantphone = snap.child("ChefNumber").val();
//           const supportphone = "1234567890";
//           const clientorderid = snap.child("Pushid").val();
//           const pl=snap.child("ChefLoc").val().split(",");
//           const picklat = parseFloat(pl[0]);
//           const picklng = parseFloat(pl[1]);
//           const pickaddress = snap.child("ChefAddress").val();
//           const dl=snap.child("LocationCoordinates").val().split(",");
//           const droplat = parseFloat(dl[0]);
//           const droplng = parseFloat(dl[1]);
//           const dropaddress =snap.child("Flat").val()+","+snap.child("Address").val();

//           var data1=[]
//           snap.child("Cart").forEach(function(data){
//             var val = data.val(); 
//             data1.push({'name':val.Name,'price':parseFloat(String(val.Total)),'quantity':parseFloat(String(val.Qty)),'id':val.PushId})
//           });

//           return axios({
//             method:'post',
//             url:' http://api.shadowfax.in/api/v2/orders/',
//             headers:{"Content-Type": "application/json","Authorization" : "Token 7bd276a7c54b24aa4980689822ee3101914dc76f"},
//             data: {              
//                 "order_details":{
//                 "order_value":parseFloat(total),
//                 "paid":"true",
//                 "client_order_id":clientorderid,
//                 "delivery_instruction":{
//                 "drop_instruction_text": "",
//                 "take_drop_off_picture": false,
//                 "drop_off_picture_mandatory": false
//                 }
//                 },
//                 "client_code":"mothers001",
//                 "pickup_details":{
//                   "city": city,
//                   "contact_number": resturantphone,
//                   "name": resturantname,
//                   "longitude":picklng,
//                   "address": pickaddress,
//                   "latitude": picklat
//                   },
//                 "order_items":data1,
//                 "drop_details":{
//                   "name": customername,
//                   "longitude":droplng,
//                   "address": dropaddress,
//                   "latitude":droplat,
//                   "contact_number":customernumber,
//                   "city":city
//                   }
//                 }
//           }).then(response => {
//              if(response.data.message === "Success"){
//                   console.log(response.data.data["status"]);
//                   console.log(response.data.data["sfx_order_id"]);
//                   admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("ShadowFX : Riders Available");
//                   admin.database().ref("/Orders/"+pushid).child("ShadowFXOrderId").set(response.data.data["sfx_order_id"]);
//                   // admin.database().ref("/Orders/"+pushid).child("DunzoTrackingUrl").set(response.data.track_url);
//                }
//              else{
//               console.log(err)
//               admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("ShadowFX  : Outside Shadowfax serviceablity area");
//              }
//              return null
//           })
//           .catch((err) => {
//             console.log(err)
//             admin.database().ref("/Orders/"+pushid).child("DeliveryApiRemarks").set("ShadowFX  : Outside Shadowfax serviceablity area");
//         });
//       });

// });


// //Rapido Status Update
// exports.GetStatusUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){
//     console.log(request.get('content-type'));
//     console.log(request.body);
//     var orderid       = request.body.orderId;
//     var clientorderid = request.body.clientOrderId;
//     var drivername    = request.body.driverName;
//     var drivernumber  = request.body.driverNumber;
//     var status        = request.body.status;
//     var timestramp    = request.body.timestamp;
//     console.log(orderid);
//     console.log(clientorderid);
//     console.log(drivername);
//     console.log(drivernumber);
//     console.log(status);
//     console.log(timestramp);

//     var ref = admin.database().ref("Orders").child(clientorderid);
//     ref.child("DeliveryName").set(drivername);
//     ref.child("TimeStramp").set(timestramp);
//     ref.child("RapidoOrderId").set(orderid);
//     ref.child("DeliveryNumber").set(drivernumber);

//     if(status === "started"){
//       ref.child("Status").set("4");
//     }

//     if(status === "dropped"){
//       ref.child("Status").set("5");
//     }

//     if(status === "expired"){
//       // return admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//       //       admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//       //       return  response.send("Success");
//       //   });
//     }

//     if(status === "aborted"){
//     //  return  admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//     //        admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//     //        return response.send("Success");
//     //     });
//     }

//     response.send("Success");


//   }
//   else{
//     response.send("Make a post request");
//   }

// });


// //Dunzo Status Update
// exports.GetDunzoStatusUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){
//     console.log(request.body);
//     var clientorderid=request.body.task_id;
//     var status=request.body.state;
//     console.log(clientorderid);
//     var orderpushid = "";
//     let query = admin.database().ref("Orders").orderByChild('DunzoOrderId').equalTo(clientorderid);
//       return query.once('value', (snapshot) => {

//         snapshot.forEach((child) => {
//           orderpushid = child.val().Pushid;
//         })


//         console.log(orderpushid)
//         var ref = admin.database().ref("Orders").child(orderpushid);
//         if(status === "queued" || status === "runner_cancelled"){
//           ref.child("DeliveryName").set("");
//           ref.child("DeliveryNumber").set("");
//            response.send("Success");
//         }
//         else if(status === "runner_accepted"){
//           ref.child("DeliveryName").set(request.body.runner["name"]);
//           ref.child("TimeStramp").set(request.body.event_timestamp);
//           ref.child("DeliveryNumber").set(request.body.runner["phone_number"]);
//         }
//         else if(status === "reached_for_pickup"){
//           ref.child("DeliveryApiRemarks").set("Dunzo : Reached for Pickup");
//         }
//         else if(status === "pickup_complete"){
//           ref.child("Status").set("4");
//           ref.child("DunzoTrackingUrl").set(request.body.tracking_url);
//         }
//         else if(status === "started_for_delivery"){
//           ref.child("DeliveryApiRemarks").set("Dunzo : Started for Delivery");
//         }
//         else if(status === "reached_for_delivery"){
//           ref.child("DeliveryApiRemarks").set("Dunzo : Reached for Delivery");
//         }
//         else if(status === "delivered"){
//           ref.child("Status").set("5");
//           ref.child("DunzoDeliveryCost").set(request.query.price);
//         }
//         else if(status === "cancelled"){
//           // return admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//           //   admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//           //   return  response.send("Success");
//           // });
//         }
//         response.send("Success");
//       });
//   }
//   else{
//     response.send("Make a post request");
//   }

// });


// //ShadowFx Status Update
// exports.GetShadowFXStatusUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){
//     console.log(request.body);
//     var clientorderid=request.body.client_order_id;
//     var status=request.body.order_status;
//     console.log(clientorderid);
//     var ref = admin.database().ref("Orders").child(clientorderid);
//     ref.child("DeliveryName").set(request.body.rider_name);
//     ref.child("DeliveryNumber").set(request.body.rider_contact);


//     if(status === "ALLOTTED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Rider Assigned");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("DunzoTrackingUrl").set(request.body.track_url);
//     }
//     else if(status === "ARRIVED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Reached for Pickup");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("DunzoTrackingUrl").set(request.body.track_url);
//     }
//     else if(status === "DISPATCHED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Dispatched");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//       ref.child("Status").set("4");
//     }
//     else if(status === "ARRIVED_CUSTOMER_DOORSTEP"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Reached for DropOff");
//       ref.child("PickUpETA").set(request.body.pickup_eta);
//       ref.child("DropETA").set(request.body.drop_eta);
//     }
//     else if(status === "DELIVERED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Delivered");
//       ref.child("Status").set("5");
//     }
//     else if(status === "CANCELLED"){
//       ref.child("DeliveryApiRemarks").set("ShadowFX : Cancelled");
//       ref.child("PickUpETA").set("");
//       ref.child("DropETA").set("");
//     }


//     if(status === "aborted"){
//     //  return  admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//     //        admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//     //        return response.send("Success");
//     //     });
//     }

//     response.send("Success");

//   }
//   else{
//     response.send("Make a post request");
//   }

// });



// //Dunzo Status Update
// exports.GetWeFastStatusUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){
//    console.log(request.body);
//   }
//   else{
//     response.send("Make a post request");
//   }

// });



// //Rapido Locations Update
// exports.GetLocationUpdate = functions.https.onRequest((request,response)=>{

//   if(request.method === 'POST'){


//     // console.log(request.body);

//     // response.send("Success");

//     // var orderid=request.query.orderId;
//     // var clientorderid=request.query.clientOrderId;
//     // var drivername=request.query.driverName;
//     // var drivernumber=request.query.driverNumber;
//     // var status=request.query.status;
//     // var timestramp=request.query.timestamp;
//     // var eta=request.query.eta;
//     // var dropimage=request.query.dropimage;
//     // console.log(clientorderid);



//     // var ref = admin.database().ref("Orders").child(clientorderid);
//     // ref.child("DriverName").set(drivername);
//     // ref.child("TimeStramp").set(timestramp);
//     // ref.child("RapidoOrderId").set(orderid);
//     // ref.child("ETA").set(eta);
//     // ref.child("DropImage").set(dropimage);
//     // ref.child("DriverNumber").set(drivernumber);
//     // if(status === "started"){
//     //   ref.child("Status").set("4");
//     // }

//     // if(status === "dropped"){
//     //   ref.child("Status").set("5");
//     // }

//     // if(status === "expired"){
//     //   return admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//     //         admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//     //         return  response.send("Success");
//     //     });
//     // }

//     // if(status === "aborted"){
//     //  return  admin.database().ref("/Orders/"+clientorderid+"/").once('value').then(snap => {
//     //        admin.database().ref("/PendingOrders/"+clientorderid).set(snap.val());
//     //        return response.send("Success");
//     //     });
//     // }

//     // response.send("Success");


//   }
//   else{
//     response.send("Make a post request");
//   }

// });


// //App Notifications
// //Function for User Notification
// exports.SendNotificationStatusUser = functions.database.ref("/Orders/{pushid}/Status/")
// .onUpdate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//         const status = snap.child("Status").val();
//         const userid = snap.child("UserId").val();


//         if(status==='2'){
//             return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//                 const token = snap.val();
//                 console.log("token: ", token);

//                                         var payload= {
//                                             data:{
//                                                 title:"Your Order has been Accepted",
//                                                 body:"The Chef has accepted and started preparing your order",
//                                                 sound:"default",
//                                                 badge:"1"
//                                             }
//                                         };


//                                     return admin.messaging().sendToDevice(token,payload)
//                                         .then(function(response){
//                                             console.log("Successfully sent message:",response);
//                                             return
//                                         })
//                                         .catch(function(error){
//                                             console.log("Error Sending message",error);
//                                             return
//                                         });


//                         });
//         }   

//         if(status==='3'){
//             return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//                 const token = snap.val();
//                 console.log("token: ", token);

//                                         var payload= {
//                                             data:{
//                                                 title:"Order is packed and ready to dispatch",
//                                                 body:"Order is packed and delivery boy will be assigned shortly",
//                                                 sound:"default",
//                                                 badge:"1"
//                                             }
//                                         };


//                                     return admin.messaging().sendToDevice(token,payload)
//                                         .then(function(response){
//                                             console.log("Successfully sent message:",response);
//                                             return
//                                         })
//                                         .catch(function(error){
//                                             console.log("Error Sending message",error);
//                                             return
//                                         });


//                         });
//         }

//         if(status==='4'){
//           return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//               const token = snap.val();
//               console.log("token: ", token);

//                                       var payload= {
//                                           data:{
//                                               title:"Order is out for delivery",
//                                               body:"Order is picked by delivery partner and will be delivered shortly",
//                                               sound:"default",
//                                               badge:"1"
//                                           }
//                                       };


//                                   return admin.messaging().sendToDevice(token,payload)
//                                       .then(function(response){
//                                           console.log("Successfully sent message:",response);
//                                           return
//                                       })
//                                       .catch(function(error){
//                                           console.log("Error Sending message",error);
//                                           return
//                                       });


//                       });
//         }

//         if(status==='10'){
//             return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//                 const token = snap.val();
//                 console.log("token: ", token);

//                                         var payload= {
//                                             data:{
//                                                 title:"Order Cancelled ",
//                                                 body:"Sorry we couldn't serve you better this time! Hoping to serve you later.",
//                                                 sound:"default",
//                                                 badge:"1"
//                                             }
//                                         };


//                                     return admin.messaging().sendToDevice(token,payload)
//                                         .then(function(response){
//                                             console.log("Successfully sent message:",response);
//                                             return
//                                         })
//                                         .catch(function(error){
//                                             console.log("Error Sending message",error);
//                                             return
//                                         });


//                         });
//         }

//         if(status==='5'){
//             return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//                 const token = snap.val();
//                 console.log("token: ", token);

//                                         var payload= {
//                                             data:{
//                                                 title:"Order Completed ",
//                                                 body:"Your order has been Successfully Delivered!",
//                                                 sound:"default",
//                                                 badge:"1"
//                                             }
//                                         };


//                                     admin.messaging().sendToDevice(token,payload)
//                                         .then(function(response){
//                                             console.log("Successfully sent message:",response);
//                                             return
//                                         })
//                                         .catch(function(error){
//                                             console.log("Error Sending message",error);
//                                             return
//                                         });

//                                         return admin.database().ref("/Users/"+userid+"/UMessagingToken").once('value').then(snap => {
//                                             const token = snap.val();
//                                             console.log("token: ", token);

//                                                                     var payload= {
//                                                                         data:{
//                                                                             title:"You've earned a scratch card ",
//                                                                             body:"Go to profile and click sratch card to view",
//                                                                             sound:"default",
//                                                                             badge:"1"
//                                                                         }
//                                                                     };


//                                                                 return admin.messaging().sendToDevice(token,payload)
//                                                                     .then(function(response){
//                                                                         console.log("Successfully sent message:",response);
//                                                                         return
//                                                                     })
//                                                                     .catch(function(error){
//                                                                         console.log("Error Sending message",error);
//                                                                         return
//                                                                     });


//                                                     });


//                         });
//         }

//         return
//     });


// });

// //Functions for scratch Card
// exports.SendScratchCard = functions.database.ref("/Orders/{pushid}/Status/")
// .onUpdate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//         const status = snap.child("Status").val();
//         const userid = snap.child("UserId").val();
//         const orderid = snap.child("PushId").val();
//         const orderno = snap.child("OrderNo").val();



//         if(status==='5'){

//           var today1 = new Date();

//           var randomnum =  Math.floor(Math.random() * (40 - 10 + 1) + 10)
//           var today = new Date();
//           var dd = String(today.getDate()).padStart(2, '0');
//           var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//           var yyyy = today.getFullYear();

//           today = yyyy + '-' + mm + '-' + dd;

//           var ref = admin.database().ref("Users").child(userid).child("ScratchCard").push();
//           ref.child("PushId").set(ref.getKey());
//           ref.child("OrderNo").set(orderno);
//           ref.child("OrderId").set(orderid);
//           ref.child("Amount").set(""+randomnum);
//           ref.child("DeliveryDate").set(today);
//           ref.child("Claimed").set("No");     
//           ref.child("Status").set("Active");     

//         }

//         return
//     });


// });

// //Functions for Chef Payouts
// exports.SendTransactionDetails = functions.database.ref("/Orders/{pushid}/Status/")
// .onUpdate((change,context)=>{
//     const pushid=context.params.pushid;
//     console.log(pushid);
//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//         const status = snap.child("Status").val();
//         const subtotal = snap.child("Subtotal").val();
//         const chef = snap.child("Chef").val();
//         var deliverycharges =0;
//         if(snap.child("ChefDeliveryCharges").exists)
//            deliverycharges = snap.child("ChefDeliveryCharges").val();
//         const commision = snap.child("ChefCommision").val();

//         if(status==='4'){


//           return admin.database().ref("/CloudKitchen/"+chef+"/Cash").once('value').then(snap => {

//             const cash = snap.val();

//             var tot = parseFloat(subtotal) * (parseFloat(commision)/100.0);
//             var gtot = parseFloat(subtotal) - parseInt(tot) - deliverycharges;
//             gtot = gtot.toFixed(2);
//             var otot = parseFloat(cash) + parseFloat(gtot);
//             otot = otot.toFixed(2);
//             admin.database().ref("/CloudKitchen/"+chef+"/Cash").set(parseFloat(otot));

//             var today = new Date();
//             var dd = String(today.getDate()).padStart(2, '0');
//             var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//             var yyyy = today.getFullYear();

//             today = yyyy + '-' + mm + '-' + dd;
//             var a = new Date();
//             var timestamp = a.getTime();
//             var ref = admin.database().ref("CloudKitchen").child(chef).child("Transactions").push();
//             ref.child("PushId").set(ref.getKey());
//             ref.child("UserId").set(chef);
//             ref.child("UserBalance").set(""+otot);
//             ref.child("Date").set(""+today);
//             ref.child("Amount").set(""+gtot);
//             ref.child("Generated").set("Online");     
//             ref.child("TransactionType").set("Cr");   
//             ref.child("TransactionName").set("Order Total");   
//             ref.child("Status").set("Pending");   
//             ref.child("TransactionId").set(""+timestamp);   
//             ref.child("OrderPushId").set(pushid);   

//             return;
//           });    
//         }

//         return
//     });


// });

// //Function for Chef Notification
// exports.SendNotificationStatusChef = functions.database.ref("/Orders/{pushid}/Chef/")
// .onCreate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//        const userid = snap.child("Chef").val();

//             return admin.database().ref("/CloudKitchen/"+userid+"/UMessagingToken").once('value').then(snap => {
//                 const token = snap.val();
//                 console.log("token: ", token);

//                                         var payload= {
//                                             data:{
//                                                 title:"New Order",
//                                                 body:"Please Accept the order",
//                                                 sound:"default",
//                                                 badge:"1"
//                                             }
//                                         };


//                                     return admin.messaging().sendToDevice(token,payload)
//                                         .then(function(response){
//                                             console.log("Successfully sent message:",response);
//                                             return
//                                         })
//                                         .catch(function(error){
//                                             console.log("Error Sending message",error);
//                                             return
//                                         });


//                         });
//     });


// });


// //Functions for delivery date time
// exports.SendDeliveryTime = functions.database.ref("/Orders/{pushid}/Status/")
// .onUpdate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//         const status = snap.child("Status").val();

//         if(status==='5'){
//           var today1 = new Date();
//           console.log(today1);
//           return admin.database().ref('Orders').child(pushid).child("DeliveryDateTime").set(""+today1);
//         }
//         else return;

//     });
//  });


// //Function for Admin notifications

// exports.SendNotificationAdmin = functions.database.ref("/Orders/{pushid}")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//     return admin.database().ref("/Orders/"+pushid+"/ChefName").once('value').then(snap => {
//         const type = snap.val();

//             var payload= {
//                 data:{
//                     title:"New Order for : "+type,
//                     body:"Press monitor the order status",    
//                     sound:"default",
//                     badge:"1"
//                 }
//             };

//             return admin.messaging().sendToTopic("Admin",payload)
//                                 .then(function(response){
//                                     console.log("Successfully sent message:",response);
//                                     return
//                                 })
//                                 .catch(function(error){
//                                     console.log("Error Sending message",error);
//                                     return
//                                 });

//                             });

// });


// exports.SendNotificationAdminChar = functions.database.ref("/Support/{pushid}/Chat")
// .onCreate((snap,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);

//             var payload= {
//                 data:{
//                     title:"New Message in Customer Support",
//                     body:"Please review it",    
//                     sound:"default",
//                     badge:"1"
//                 }
//             };

//             return admin.messaging().sendToTopic("Admin",payload)
//                                 .then(function(response){
//                                     console.log("Successfully sent message:",response);
//                                     return
//                                 })
//                                 .catch(function(error){
//                                     console.log("Error Sending message",error);
//                                     return
//                                 });


// });


//Create Customer Razorpay
// exports.createCustomer = functions.database.ref("/Users/{pushid}/UserName")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);
//   return admin.database().ref("/Users/"+pushid+"/").once('value').then(snap => {
//       const mobile = snap.child("Number").val();
//       const name = snap.child("Name").val();
//       const email = snap.child("Email").val();
//       var url="https://api.razorpay.com/v1/customers";
//       var bodyFormData = new FormData();
//       bodyFormData.append('name', name);
//       bodyFormData.append('email', email);
//       bodyFormData.append('contact', mobile);

//       const token = Buffer.from(`rzp_live_hixZG1ClXcmfK5:9fJSDY5cQSh3syiuFOQbYYO6`, 'utf8').toString('base64')
//       return axios.post(url, bodyFormData, 
//         {headers: {'Authorization': `Basic ${token}`}})
//         .then(function (response) {
//           console.log(response);
//           var ref=admin.database().ref("Users/"+pushid+"/CustomerId/");
//           return ref.set(response.body.id);
//       })
//       .catch(function (response) {
//           console.log(response);
//       });

//     });
// });


// exports.SendNotification1 = functions.database.ref("/Masters/{pushid}/")
// .onWrite((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("Data Changed in Masters - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.SendNotification2 = functions.database.ref("/Masters/{pushid}/")
// .onWrite((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("Data Changed in Masters - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification3 = functions.database.ref("/Agency/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Delivery Agency Created - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.SendNotification4 = functions.database.ref("/CloudKitchen/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Vendor Registered - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification5 = functions.database.ref("/CloudKitchen/{pushid}/")
// .onUpdate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("Vendor Data Modified - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification6 = functions.database.ref("/CloudKitchen/{pushid}/")
// .onDelete((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("Vendor Data Deleted - "+pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification6 = functions.database.ref("/CorporateOrders/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Corporate Order Enquiry ");
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.SendNotification7 = functions.database.ref("/DeliveryPartner/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Delivery Partner Created "+ pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification8 = functions.database.ref("/Franchise/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Working Partner Created "+ pushid);
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification9 = functions.database.ref("/MembershipPayment/{pushid}")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;

//          return admin.database().ref("/MembershipPayment/"+pushid+"/").once('value').then(snap => {
//           const status = snap.child("ChefId").val();
//           var ref = admin.database().ref("Notifications").push();
//           ref.child("Name").set("New Vendor Payment Received "+ status);
//           ref.child("PushId").set(ref.getKey());
//           return;
//          });
// });

// exports.SendNotification10 = functions.database.ref("/Orders/{pushid}/")
// .onCreate((change,context)=>{
//          const pushid=context.params.pushid;
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Order has been received ");
//         ref.child("PushId").set(ref.getKey());
//         return;
// });

// exports.SendNotification11 = functions.database.ref("/Orders/{pushid}/Status/")
// .onUpdate((change,context)=>{

//     const pushid=context.params.pushid;
//     console.log(pushid);


//     return admin.database().ref("/Orders/"+pushid+"/").once('value').then(snap => {
//         const status = snap.child("Status").val();
//         const userid = snap.child("UserId").val();
//         const orderid = snap.child("PushId").val();
//         const orderno = snap.child("OrderNo").val();
//         var ref = admin.database().ref("Notifications").push();

//         if(status==='2'){
//           ref.child("Name").set("Order No : "+orderid+" Has Been Accepted");
//           ref.child("PushId").set(ref.getKey());
//         }
//         else if(status==='3'){
//           ref.child("Name").set("Order No : "+orderid+" is ready and waiting for pickup");
//           ref.child("PushId").set(ref.getKey());
//         }
//         else if(status==='4'){
//           ref.child("Name").set("Order No : "+orderid+" is out for delivery");
//           ref.child("PushId").set(ref.getKey());
//         }
//         else if(status==='5'){
//           ref.child("Name").set("Order No : "+orderid+" is delivered");
//           ref.child("PushId").set(ref.getKey());
//         }
//         else if(status==='10'){
//           ref.child("Name").set("Order No : "+orderid+" is cancelled");
//           ref.child("PushId").set(ref.getKey());
//         }
//         else if(status==='100'){
//           ref.child("Name").set("Order No : "+orderid+" is refunded");
//           ref.child("PushId").set(ref.getKey());
//         }


//         return;
//     });


// });


// exports.SendNotification12 = functions.database.ref("/PackageOrders/{pushid}/UserId")
// .onCreate((change,context)=>{

//   const pushid=context.params.pushid;
//   console.log(pushid);

//   return admin.database().ref("/PackageOrders/"+pushid+"/").once('value').then(snap => {
//     const userid = snap.child("UserId").val();
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Orders for Packaging Materials is recieved - "+ userid);
//         ref.child("PushId").set(ref.getKey());
//         return;
//   });
// });


// exports.SendNotification13 = functions.database.ref("/Preorders/{pushid}/Chef")
// .onCreate((change,context)=>{

//   const pushid=context.params.pushid;
//   console.log(pushid);

//   return admin.database().ref("/Preorders/"+pushid+"/").once('value').then(snap => {
//     const userid = snap.child("Chef").val();
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Preorder item added - "+ userid);
//         ref.child("PushId").set(ref.getKey());
//         return;
//   });
// });


// exports.SendNotification14 = functions.database.ref("/Promocode")
// .onCreate((change,context)=>{

//   const pushid=context.params.pushid;
//   console.log(pushid);

//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New Promocode has been added ");
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.SendNotification15 = functions.database.ref("/TodaysOffer")
// .onCreate((change,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New TodaysOffer item has been added ");
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.SendNotification16 = functions.database.ref("/Users")
// .onCreate((change,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);
//         var ref = admin.database().ref("Notifications").push();
//         ref.child("Name").set("New User has registered ");
//         ref.child("PushId").set(ref.getKey());
//         return;
// });


// exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 0 * * *')
//   .timeZone('Asia/Kolkata') // Users can choose timezone - default is America/Los_Angeles
//   .onRun((context) => {

//     return admin.database().ref("/CloudKitchen/").once('value').then(snap => {
//         snap.forEach((child) => {
//           var userid = child.val().UserId;
//           if(child.val().Local === null){
//             admin.database().ref("CloudKitchen").child(userid).child("Status").set("InActive");
//           }
//           else if(child.val.Local === "No"){
//             admin.database().ref("CloudKitchen").child(userid).child("Status").set("InActive");
//           }
//         });
//         return;
//     });

// });


// exports.setCartPrice = functions.database.ref("/Users/{pushid}/Cart/{pushid1}/Total")
// .onUpdate((snap,context)=>{
//   const userid=context.params.pushid;
//   const pushid=context.params.pushid1;
//   console.log(pushid);

//     return admin.database().ref("/Users/"+userid+"/Cart/"+pushid).once('value').then(snap => {
//       const price = snap.child("Price").val();
//       const total = snap.child("Total").val();

//       return admin.database().ref("/Users/"+userid+"/Cart/"+pushid).child("Price").set(total);
//       });
// });

// exports.setCartPrice1 = functions.database.ref("/Users/{pushid}/Cart/{pushid1}/Total")
// .onUpdate((snap,context)=>{
//   const userid=context.params.pushid;
//   const pushid=context.params.pushid1;
//   console.log(pushid);

//     return admin.database().ref("/Users/"+userid+"/Cart/"+pushid).once('value').then(snap => {
//       const price = snap.child("Price").val();
//       const total = snap.child("Total").val();

//       return admin.database().ref("/Users/"+userid+"/Cart/"+pushid).child("Price").set(total);


//       });
// });


// exports.setCartPrice1 = functions.database.ref("/Orders/{pushid}/OrderDate/")
// .onCreate((snap,context)=>{
//   const pushid=context.params.pushid;
//   console.log(pushid);

//     return admin.database().ref("/Orders/"+pushid).once('value').then(snap => {
//       const time = snap.child("DeliveryTime").val();
//       const date1 = snap.child("OrderDate").val();

//       if(time === "Immediately"){
//         return admin.database().ref("/Orders/"+pushid).child("DeliveryDate").set(date1);
//       }
//       else{
//         return;
//       }

//       });
// });