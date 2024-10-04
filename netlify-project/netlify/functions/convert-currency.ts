import { Handler, HandlerEvent, HandlerContext} from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { from, to, amount } = event.queryStringParameters || {};

  if (!from || !to || !amount) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please provide 'from', 'to', and 'amount' query parameters." }),
    };
  }

  const API_URL = `https://v6.exchangerate-api.com/v6/f8c72cfad8028d13a4810f99/latest/${from}`;
  
  try {
    const response = await axios.get(API_URL);
    const rate = response.data.conversion_rates[to.toUpperCase()];

    if (!rate) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: `Currency conversion rate from ${from} to ${to} not found.` }),
      };
    }

    const convertedAmount = (parseFloat(amount) * rate).toFixed(2);

    return {
      statusCode: 200,
      body: JSON.stringify({
        from,
        to,
        amount,
        convertedAmount,
        rate,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Currency conversion failed. Please try again later." }),
    };
  }
};

export { handler };
