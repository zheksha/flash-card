import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "../FireBase/firebase";
import SimpleModal from "../Modal/modal.component";
import "./card.styles.scss";

const CardItem = ({ signedIn, setSignedIn }) => {
  const [card, setCard] = useState({});
  const [cardList, setCardList] = useState([]);
  const [currentBlock, setCurrenBlock] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [fireBaseUpdated, setFireBaseUpdated] = useState(false);
  let [currentCard, setCurrentCard] = useState(0);

  //Functions

  const signOut = () => {
    setSignedIn(false);
  };

  const dataUpdate = () => {
    setFireBaseUpdated(false ? true : false);
  };

  const onFlip = () => {
    setCurrenBlock(!flipped ? answerBlock : questionBlock);
    setFlipped(flipped ? false : true);
  };

  const onInputChange = (e) => {
    const value = e.target.value;
    setCard({ ...card, [e.target.name]: value });
  };

  const onSubmit = () => {
    if (!card.question || !card.answer) return;
    setCardList([...cardList, card]);
  };

  const prevPage = () => {
    if (currentCard < 0) return;
    setCurrentCard((currentCard = currentCard - 1));
    setFlipped(false);
  };

  const nextPage = () => {
    if (currentCard >= cardList.length) return;
    setCurrentCard((currentCard = currentCard + 1));
    setFlipped(false);
  };

  useEffect(() => {
    setCurrenBlock([questionBlock]);
  }, [currentCard]);

  useEffect(() => {
    (async () => {
      const res = await db.collection("cardList").get();
      const response = [];
      res.docs.map((doc) => {
        response.push(doc.data());
        return;
      });
      setCardList([...cardList, ...response]);
    })();
  }, [fireBaseUpdated]);

  const questionBlock = (
    <div className={`question `}>
      {cardList[currentCard]
        ? cardList[currentCard].question
        : "Please Enter Card"}
    </div>
  );

  const answerBlock = (
    <div className={`answer animation`}>
      {cardList[currentCard]
        ? cardList[currentCard].answer
        : "Please Enter Card"}
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={signOut} className="btn btn-signout">
        Sign out <i className="fas fa-sign-out-alt"></i>
      </Button>
      <div className="container " onClick={onFlip}>
        <div className="add-card">
          <SimpleModal
            onInputChange={onInputChange}
            card={card}
            onSubmit={onSubmit}
            dataUpdate={dataUpdate}
          />
        </div>
        <Button size="small" className="flip-card">
          flip card <i className="fas fa-undo-alt"></i>
        </Button>
        <div className="card">{currentBlock}</div>
      </div>
      <div className="buttons">
        <Button onClick={prevPage} className="btn btn-prev">
          <i className="fas fa-angle-left"></i>Prev
        </Button>
        <Button onClick={nextPage} className="btn btn-next">
          Next<i className="fas fa-angle-right"></i>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CardItem;
