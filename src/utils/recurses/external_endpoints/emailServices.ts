import axios from 'axios'
import { dataToNotifyMail } from "src/utils/mailer/interfaces";
const baseUlr = `${process.env.EMAIL_HOST}`;


const postEmailService = async (data:dataToNotifyMail) => {
    console.log('data to posst-->', data)
      try {
        const res = await axios.post(`${baseUlr}/api/v1/notifications/emails`, data, {
          headers: {
            "authorization": `${process.env.EMAIL_AUTH}`,
          },
        } );
        return res.data
      } catch (error) {
        return error
      }
  };
  
  export { postEmailService };