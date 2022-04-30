import fetch from "cross-fetch";
require("dotenv").config({ path: "../src/.env" });

let apiBase =
  "http://190.131.222.108:8088/api/v1/eva-des/get/employees-database/status";

const getUsersHosvital = async () => {
  console.log("this is the data env--->", process.env.HOSVITAL_HEADER);
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(apiBase, {
        headers: {
          "X-Authorization": `${process.env.HOSVITAL_HEADER}`,
        },
      });
      const RandonCuriousFact = await res.json();
      console.log("this is the catFact fetch--->", RandonCuriousFact);
      resolve(RandonCuriousFact.data);
    } catch (error) {
      console.log("error trying to fetch corius fact!", error);
      reject({ msg: error, statusCode: 400 });
    }
  });
};

export { getUsersHosvital };
