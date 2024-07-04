import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Container, Form } from "react-bootstrap";
import { errorMessage, successMessage } from "../../utils/Alert";
import PaymentAPI from "../../api/PaymentAPI";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ course, handleEnroll }) => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  //
  const navigate = useNavigate();
  //
  const stripe = useStripe();
  const elements = useElements();
  // Make payment
  const makePayment = async (clientSecret) => {
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
      errorMessage("Payment failed", error.message);
      setIsPaymentProcessing(false);
    } else {
      handleEnroll();
      successMessage(
        "Payment successful",
        "You have successfully enrolled",
        () => {
          navigate(`/course/${course?._id}`);
        }
      );
      setIsPaymentProcessing(false);
    }
  };
  // Create payment intent mutation
  const { mutate: createPaymentIntent } = useMutation({
    mutationFn: PaymentAPI.createPaymentIntent,
    onSuccess: (res) => {
      makePayment(res.data.client_secret);
    },
    onError: (error) => {
      errorMessage("Payment failed", error.message);
    },
  });
  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPaymentProcessing(true);
    createPaymentIntent({ amount: course?.price * 100, currency: "lkr" });
  };
  //
  return (
    <Container className="mt-5 w-50 border p-4 rounded">
      {/* Show amount in big bold text */}
      <h1 className="mb-4 text-muted">
        {course?.title} by {course?.instructor?.name}
      </h1>
      <h3 className="mb-4">Amount: Rs.{course?.price}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Card details</Form.Label>
          <CardElement className="form-control" />
        </Form.Group>
        {course?.status === "Pending" ? (
          <Button variant="warning" type="submit" disabled className="mt-3">
            Course Pending Approval
          </Button>
        ) : (
          <Button
            variant="primary"
            type="submit"
            disabled={!stripe || isPaymentProcessing}
            className="mt-3"
          >
            {isPaymentProcessing ? "Processing..." : "Pay & Enroll"}
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default PaymentForm;
