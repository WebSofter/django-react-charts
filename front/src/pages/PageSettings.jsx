import React, { useRef, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Toast } from 'primereact/toast';
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import InputField from "../components/fields/InputField";
import { Button } from 'primereact/button';
import axios from 'axios';
//
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { defaultLayout, randomizeKeysDefault, randomizeKeysShift, shiftLayout, isLetter } from "../utils/keyboard"

const PageSettings = (props) => {
  const toast = useRef(null);
  const [fields, setFields] = useState([]);
  const [_fields, _setFields] = useState([]);


/********Keyboard */

// const { input, setInput, setOnEnterClicked } = props;
// const [input, setInput] = useState("")
// const [enterClicked, setOnEnterClicked] = useState(false)
const [input, setInput] = useState({name: null, value: null})
//
const [layoutName, setLayoutName] = useState("default")
const [visible, setVisible] = useState(false)
const keyboard = useRef();
const [layout, setLayout] = useState({
  default: defaultLayout,
  shift: shiftLayout
})

const onChangeKeyboard = value => {
  console.log('onChangeKeyboard', {value, name: input.name})
  setFieldValue(input.name, value)
  setInput({name: input.name, value})
};

const onSave = async () => {
  console.log(_fields)
  const body = fields.filter((field, i)=> {
    console.log(_fields[i].par_value, '==', field.par_value)
  return _fields[i].par_value !== field.par_value
  })
  console.log({body})
  axios.post('https://api.rehome.wsofter.com/api/settings/', {
    params: body,
  })
  .then(function (response) {
    toast.current.show({severity:'success', summary: 'Success', detail: `Success saved fields: ${body.map(v => v.par_name).join(',')}`, life: 3000})
  })
  .catch(function (error) {
    console.error(error);
    toast.current.show({severity:'error', summary: 'Error', detail: `Error saved fields: ${body.map(v => v.par_name).join(',')}`, life: 3000});
  });
}

const onKeyPress = value => {
  console.log('onKeyPress', value)
  if (value === "save") onSave();
  if (value === "{enter}") onEnter();
  if (isLetter(value)) {
    setLayout({
      default: randomizeKeysDefault(),
      shift: randomizeKeysShift()
    })
  }
};

const onChangeInput = e => {
  const value = e.target.value;
  const name = e.target.name
  console.log('onChangeInput', {value, name, input})
  // setInput(value);
  setFieldValue(input.name, value)
  keyboard.current.setInput(value);
};

const onEnter = () => {
  keyboard.current.setInput('');
  hideKeyboard()
}
const onReset = () => {
  hideKeyboard()
}
const showKeyboard = e => {
  console.log('showKeyboard->', {name: e.target.name, value: e.target.value})
  setInput({name: e.target.name, value: e.target.value})
  setVisible(true)
  setTimeout(_ => {
    keyboard.current.setInput(e.target.value)
    window.scrollBy(0, window.innerHeight)
  }, 100)
}
const hideKeyboard = () => setVisible(false)


/********Keyboard */
  useEffect(() => {
    fetch("https://api.rehome.wsofter.com/api/settings/")
      .then(res => res.json())
      .then(
        (result) => {
          setFields(result)
          _setFields(_.cloneDeep(result))
        },
        (error) => {

        }
      )
  }, [])
  
  const setFieldValue = (name, value) => {
    const _fields = fields.map(field => {
      if(field.par_name === name ) {
        field.par_value = parseFloat(value.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1'));
      }
      return field
    })
    keyboard.current.setInput(value);
    setFields(_fields)
  }
  // const onChangeInput = e => setFieldValue(e.target.name, e.target.value)
  return (
    <>
      <Toast ref={toast}/>
      <PageLayout title="Настройки">
        <Splitter style={{ width: '100%', height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                <tbody>
                  {fields.filter((input, i) => input.par_permission.includes('RW')).map((field, i) =><tr key={`lf-${i}`}>
                    <td>{`${field.par_name} ${i}`} &nbsp;</td>
                    <td>
                      <InputField key={`lrf-${field.par_name}`} name={field.par_name} value={field.par_value} onFocus={showKeyboard} onChange={e => onChangeInput(e)} icon={'pi-pencil'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                <tbody>
                  {fields.filter((input, i) => input.par_permission.includes('RO')).map((field, i) =><tr key={`rf-${i}`}>
                    <td>{`${field.par_name} ${i}`} &nbsp;</td>
                    <td>
                      <InputField disabled={true} key={`krf-${field.par_name}`} name={field.par_name} value={field.par_value} onFocus={showKeyboard} onChange={e => onChangeInput(e)} icon={'pi-lock'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
        </Splitter>
      </PageLayout>
      <div style={{maxWidth: '500px', margin: '0 auto'}} className='pb-5'>
        <div className="input-container text-center">
          {/* <InputText value={input} placeholder={"Tap here to start"} onChange={onChangeInput} onFocus={showKeyboard}
          /> */}
          {visible && <Button icon="pi pi-times" onClick={onReset} rounded text severity="danger" aria-label="Hide Keyboard" />}
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
              onChange={onChangeKeyboard}
              onKeyPress={onKeyPress}
            />
          )
        }
      </div>
    </>
  );
};

export default PageSettings;
