import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./modal.styles.scss";
import { Button } from "@material-ui/core";
import { db } from "../FireBase/firebase";

export default function SimpleModal({
  onInputChange,
  card,
  onSubmit,
  dataUpdate,
}) {
  card = { card };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onModalSubmit = () => {
    onSubmit();
    setOpen(false);
    addCardToFirestore();
  };

  const addCardToFirestore = () => {
    if (!card.card.question || !card.card.answer) {
      return;
    }
    console.log(card.card.question);
    const crypto = require("crypto");
    const id = crypto.randomBytes(7).toString("hex");
    db.collection("cardList").doc(id).set(card.card);
    dataUpdate();
  };

  const body = (
    <div className="form">
      <h3 className="title">Add new card</h3>
      <textarea
        name="question"
        className="form-question"
        onChange={onInputChange}
        value={card.question}
        placeholder="Question (i.e 'What is React?')"
      />

      <textarea
        className="form-answer"
        name="answer"
        onChange={onInputChange}
        value={card.answer}
        placeholder="Answer (i.e 'Cool framework')"
      />

      <Button className="button" onClick={onModalSubmit}>
        Submit
      </Button>
    </div>
  );

  return (
    <div>
      <i type="button" onClick={handleOpen} className="fas fa-plus-circle"></i>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
