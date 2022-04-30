export interface attachmentToNotifyMail {
    nameWithExtension?:string;
    base64Content?:string;
}
export interface bodyListButtonToNotifyMail {
    name:string;
    link:string;
}
export interface emailToNotifyMail {
    subject?:string;
    imageUrl?:string;
    title?:string;
    subtitle?:string;
    bodyMessage?:string;
    bodyList?:string[];
    attachments?:attachmentToNotifyMail[];
    bodyListButton?:bodyListButtonToNotifyMail[];
    footerMessage?:string;
    accent?:boolean;
    accentColor?:string;
}
export interface dataToNotifyMail {
    email:emailToNotifyMail;
    targets:string[];
}