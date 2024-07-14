import React from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

// type IKeyboartProps = {
//     children: React.ReactNode;
//     title: String;
// }
const KeyBoard = (props: { keyboard: any; layoutName: any; onChange: any; onKeyPress: any; }) => {
    const { keyboard, layoutName, onChange, onKeyPress } = props;
  return (
    <div className="grid grid-cols-1 gap-4">
        <Keyboard
        keyboardRef={(r: any) => {}} // (keyboard = r)
        layoutName={layoutName}
        onChange={onChange}
        onKeyPress={onKeyPress}
        />
    </div>
  );
};

export default KeyBoard;