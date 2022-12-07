import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  string1: yup.string().min(0).max(50).required(),
  string2: yup.string().min(0).max(50).required(),
});

let NO_OF_CHARS = 256;

const arePermutation = (str1, str2) => {
  // Create 2 count arrays and initialize
  // all values as 0
  let count1 = Array(NO_OF_CHARS);
  let count2 = Array(NO_OF_CHARS);
  count1.fill(0);
  count2.fill(0);
  let i;

  // For each character in input strings,
  // increment count in the corresponding
  // count array
  for (i = 0; i < str1.length && i < str2.length; i++) {
    count1[str1[i]]++;
    count2[str2[i]]++;
  }

  // If both strings are of different length.
  // Removing this condition will make the program
  // fail for strings like "aaca" and "aca"
  if (str1.length != str2.length) return false;

  // Compare count arrays
  for (i = 0; i < NO_OF_CHARS; i++) if (count1[i] != count2[i]) return false;

  return true;
};

function App() {
  const [output, setOutput] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    let result = arePermutation(data.string1, data.string2);
    setOutput(result);
    reset();
  };

  console.log("output ", output);

  return (
    <div className="App">
      <Container>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Permutation</h1>
        <p>
          Write a function that takes in two strings and returns true if one is
          a permutation of the other. Optimize for time complexity.
        </p>
        <p>Answer:</p>
        <Container style={{ width: 300, height: 500 }}>
          <Form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ marginBottom: 20 }}
          >
            <Form.Group className="mb-3" controlId="formBasicString1">
              <Form.Label>String 1</Form.Label>
              <Form.Control
                {...register("string1")}
                type="text"
                name="string1"
                placeholder="Enter string 1"
                required
              />
              <p style={{ color: "red" }}>{errors.string1?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicString2">
              <Form.Label>String 2</Form.Label>
              <Form.Control
                {...register("string2")}
                type="text"
                name="string2"
                placeholder="Enter string 2"
                required
              />
              <p style={{ color: "red" }}>{errors.string2?.message}</p>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {output !== null && (
            <Alert
              variant={output ? "success" : "danger"}
              style={{ textAlign: "center" }}
            >
              <h5>{output ? "TRUE" : "FALSE"}</h5>
            </Alert>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default App;
