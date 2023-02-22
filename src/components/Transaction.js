import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionSlice";
import { CATEGORIES } from "../util/data";
import { Box, Input, Select, Option, Button } from "@mui/joy";

export const Transaction = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const handleAddTransaction = () => {
    if (amount != 0) {
      dispatch(
        addTransaction({
          category,
          description,
          amount,
        })
      );
      setAmount(0);
    }
  };

  return (
    <Box className="transaction-form-container">
      <h2 style={{ textAlign: "center" }}>New Transaction</h2>
      <Box className="transaction-form">
        <Select
          value={category}
          sx={{ fontSize: { xs: "0.7rem", sm: "1rem", width: "170px" } }}
          onChange={(e, newValue) => setCategory(newValue)}
        >
          {CATEGORIES.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{
            width: { xs: 100, sm: "auto" },
            fontSize: { xs: "0.7rem", sm: "1rem" },
          }}
        />
        <Input
          type="number"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
          startDecorator={{ dollar: "$" }["dollar"]}
          slotProps={{
            input: {
              min: 0,
              step: 1,
            },
          }}
          sx={{
            width: { xs: 100, sm: 150 },
            fontSize: { xs: "0.7rem", sm: "1rem" },
          }}
        />
      </Box>
      <Button
        variant="soft"
        sx={{ margin: "1rem 0" }}
        onClick={handleAddTransaction}
      >
        Add Transaction
      </Button>
    </Box>
  );
};