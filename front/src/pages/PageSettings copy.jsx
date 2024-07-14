import React, { useRef, useEffect, useState } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import InputField from "../components/fields/InputField";
//
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { defaultLayout, randomizeKeysDefault, randomizeKeysShift, shiftLayout, isLetter } from "../utils/keyboard"

const PageSettings = (props) => {
  const toast = useRef(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fields, setFields] = useState([]);


/********Keyboard */

// const { input, setInput, setOnEnterClicked } = props;
const [input, setInput] = useState("")
const [enterClicked, setOnEnterClicked] = useState(false)
//
const [layoutName, setLayoutName] = useState("default")
const [visible, setVisible] = useState(false)
const keyboard = useRef();
const [layout, setLayout] = useState({
  default: defaultLayout,
  shift: shiftLayout
})

const onChange = input => {
  setOnEnterClicked(false)
  setInput(input);
};

const onKeyPress = button => {
  if (button === "{shift}" || button === "{lock}") handleShift();

  if (button === "{enter}") onEnter();

  if (isLetter(button)) {
    setLayout({
      default: randomizeKeysDefault(),
      shift: randomizeKeysShift()
    })
  }
};

const handleShift = () => {
  const newLayoutName = layoutName === "default" ? "shift" : "default";
  setLayoutName(newLayoutName);
};

const onChangeInput = event => {
  const inp = event.target.value;
  setInput(inp);
  keyboard.current.setInput(inp);
};

const onEnter = () => {
  setOnEnterClicked(true)
  hideKeyboard()
}

const onReset = () => {
  setInput("")
  setOnEnterClicked(false)
  hideKeyboard()
}

const showKeyboard = () => {
  setVisible(true)
}

const hideKeyboard = () => {
  setVisible(false)
}


/********Keyboard */






  useEffect(() => {
    fetch("https://api.rehome.wsofter.com/api/settings/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFields(result)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const accept = () => {
      // toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
  };

  const reject = () => {
      // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };

  const showTemplate = (event) => {
      confirmPopup({
          target: event.currentTarget,
          group: 'templating',
          header: 'Confirmation',
          message: (
              <div className="flex flex-column align-items-center w-full gap-2 border-bottom-1 surface-border">
                <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto">
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">1</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">2</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">3</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">4</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">5</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">6</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">7</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">8</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">9</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">*</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">0</button>
                    </div>
                    <div className="w-1/3">
                        <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">#</button>
                    </div>
                </div>
              </div>
          ),
          footer: <></>,
          acceptIcon: 'pi pi-check',
          rejectIcon: 'pi pi-times',
          rejectClass: 'p-button-sm hidden',
          acceptClass: 'p-button-outlined p-button-sm hidden',
          accept,
          reject
      });
  };
  const changeInput = (e, i) => {
    console.log({value: e.target.value, name: e.target.name})
    // fields[i].par_value = e.target.value
    const _fields = fields.map(field => {
        if(field.par_name === e.target.name ) {
          field.par_value = e.target.value.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1');
        }
        return field
    })
    setFields(_fields)
  }
  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup group="templating" />
      <PageLayout title="Настройки">
        <Splitter style={{ width: '100%', height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                {/* <thead>
                  <tr>
                    <th>Поле</th>
                    <th>Значение</th>
                  </tr>
                </thead> */}
                <tbody>
                  {fields.filter((input, i) => input.par_name.includes('Output')).map((field, i) =><tr key={`lf-${i}`}>
                    <td>{`${field.par_name} ${i}`} &nbsp;</td>
                    <td>
                      <InputField name={field.par_name} onClick={showTemplate} value={field.par_value} onChange={e => changeInput(e, i)} icon={'pi-arrow-right'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                {/* <thead>
                  <tr>
                    <th>Поле</th>
                    <th>Значение</th>
                  </tr>
                </thead> */}
                <tbody>
                  {fields.filter((input, i) => input.par_name.includes('Input')).map((field, i) =><tr key={`rf-${i}`}>
                    <td>{`${field.par_name} ${i}`} &nbsp;</td>
                    <td>
                      <InputField key={field.par_name} name={field.par_name} onClick={showTemplate} value={field.par_value} onChange={e => changeInput(e, i)} icon={'pi-arrow-right'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
        </Splitter>
      </PageLayout>
      <div className="App">
      <div className="input-container">
        <input
          value={input}
          placeholder={"Tap here to start"}
          onChange={onChangeInput}
          onFocus={showKeyboard}
        />
        <button onClick={onReset} className="reset">Clear</button>
      </div>
      {
        visible && (
          <Keyboard
            keyboardRef={r => (keyboard.current = r)}
            layoutName={layoutName}
            layout={{
              'default': layout.default,
              'shift': layout.shift
            }}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        )
      }
    </div>
    </>
  );
};

export default PageSettings;
