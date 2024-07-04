import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Form } from "react-bootstrap";
import api from "../../api/api";

const PaymentForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
      console.log("Payment successful");
    }
  };

  const handleChange = async (event) => {
    const { value } = event.target;

    // convert amount to cents
    const amount = value * 100;

    setClientSecret(value);

    const response = await api.post("/api/payment/create-payment-intent", {
      amount,
      currency: "lkr",
    });

    setClientSecret(response.data.client_secret);
  };

  return (
    <div className="container w-50">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter amount</Form.Label>
          <Form.Control
            type="number"
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Card details</Form.Label>
          <CardElement className="form-control" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!stripe}
          className="mt-3"
        >
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default PaymentForm;
