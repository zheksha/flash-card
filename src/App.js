import "./App.scss";
import SignIn from "./components/Authorization/auth.component";
import CardItem from "./components/Card/card.component";
import React, { useState } from "react";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="app">
      <div className="content ">
        {!signedIn ? (
          <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
        ) : (
          <CardItem />
        )}
      </div>
    </div>
  );
}

export default App;
