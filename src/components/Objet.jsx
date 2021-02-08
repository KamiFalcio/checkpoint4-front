import React from "react";

function Objet(props) {
  const num = props.indice;
  return (
    <div>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/item/${num}.png`}
      ></img>
    </div>
  );
}

export default Objet;
