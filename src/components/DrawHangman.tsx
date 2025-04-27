const HEAD = (
  <div
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "100%",
      border: "8px solid black",
      position: "absolute",
      top: "45px",
      right: "-30px",
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "10px",
      height: "120px",
      background: "black",
      position: "absolute",
      top: "110px",
      right: "0",
      borderRadius: "12px",
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      width: "90px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "-90px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
      borderRadius: "12px",
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      width: "90px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "150px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
      borderRadius: "12px",
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "215px",
      right: "-90px",
      rotate: "60deg",
      transformOrigin: "left bottom",
      borderRadius: "12px",
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "black",
      position: "absolute",
      top: "215px",
      right: 0,
      rotate: "-60deg",
      transformOrigin: "right bottom",
      borderRadius: "12px",
    }}
  />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type DrawHangmanProps = {
  numberOfGuess: number;
};

const DrawHangman = ({ numberOfGuess }: DrawHangmanProps) => {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuess)}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          position: "absolute",
          top: "0",
          right: "0",
          borderRadius: "12px",
        }}
      />

      <div
        style={{
          height: "8px",
          width: "100px",
          background: "black",
          position: "absolute",
          top: "40px",
          left: "109px",
          rotate: "-50deg",
        }}
      />

      <div
        style={{
          height: "10px",
          width: "200px",
          background: "black",
          marginLeft: "120px",
        }}
      />

      <div
        style={{
          height: "350px",
          width: "10px",
          background: "black",
          marginLeft: "120px",
        }}
      />

      <div
        style={{
          height: "8px",
          width: "180px",
          background: "black",
          borderRadius: "12px",
          marginLeft: "30px",
        }}
      />
    </div>
  );
};

export default DrawHangman;
