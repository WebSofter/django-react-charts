// export const defaultLayout = [
//     '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
//     'q w e r t y u i o p {tab} [ ] \\',
//     'a s d f g h j k l ; \' {lock} {enter}',
//     'z x c v b n m , . / {shift}',
//     '@ {space}'
//   ]
  

export const defaultLayout = [
  '1 2 3',
  '4 5 6',
  '7 8 9',
  '- 0 .',
  '{bksp} {enter} save',
]

  export const shiftLayout = [
    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
    'Q W E R T Y U I O P {tab} { } |',
    'A S D F G H J K L : " {lock} {enter}',
    'Z X C V B N M < > ? {shift}',
    '.com @ {space}'
  ]
  
  export const randomizeKeysDefault = () => {
    let newLayout = defaultLayout.map((row) => {
      return shuffleArray(row.split(' ')).join(' ')
    })
    return shuffleArray(newLayout)
  }
  
  export const randomizeKeysShift = () => {
    let newLayout = shiftLayout.map((row) => {
      return shuffleArray(row.split(' ')).join(' ')
    })
    return shuffleArray(newLayout)
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      if (isLetter(array[i])) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    return array;
  }
  
  export function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i);
  }