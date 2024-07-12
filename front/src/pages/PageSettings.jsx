import React, { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import PageLayout from "../components/common/PageLayout";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import InputField from "../components/fields/InputField";

const lFields = [
  { label: "Parameter", value: 0.1 },
  { label: "Parameter", value: 0.2 },
  { label: "Parameter", value: 0.3 },
  { label: "Parameter", value: 0.4 },
  { label: "Parameter", value: 0.5 },
  { label: "Parameter", value: 0.6 },
  { label: "Parameter", value: 0.7 },
  { label: "Parameter", value: 0.8 },
  { label: "Parameter", value: 0.9 },
]

const rFields = [
  { label: "Parameter", value: 0.1 },
  { label: "Parameter", value: 0.2 },
  { label: "Parameter", value: 0.3 },
  { label: "Parameter", value: 0.4 },
  { label: "Parameter", value: 0.5 },
  { label: "Parameter", value: 0.6 },
  { label: "Parameter", value: 0.7 },
  { label: "Parameter", value: 0.8 },
  { label: "Parameter", value: 0.9 },
]

const PageSettings = ({ data }) => {
  const toast = useRef(null);

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
                <div class="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto">
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">1</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">2</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">3</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">4</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">5</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">6</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">7</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">8</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">9</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">*</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">0</button>
                    </div>
                    <div class="w-1/3">
                        <button class="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">#</button>
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

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup group="templating" />
      <PageLayout title="Настройки">
        <Splitter style={{ width: '100%', height: '100%' }}>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Поле</th>
                    <th>Значение</th>
                  </tr>
                </thead>
                <tbody>
                  {lFields.map((field, i) =><tr key={`lf-${i}`}>
                    <td>{`${field.label} ${i}`} &nbsp;</td>
                    <td>
                      <InputField onClick={showTemplate} value={field.value} icon={'pi-arrow-right'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center p-8 min-w-max">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Поле</th>
                    <th>Значение</th>
                  </tr>
                </thead>
                <tbody>
                  {rFields.map((field, i) =><tr key={`rf-${i}`}>
                    <td>{`${field.label} ${i}`} &nbsp;</td>
                    <td>
                      <InputField onClick={showTemplate} value={field.value} icon={'pi-arrow-right'}/>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </SplitterPanel>
        </Splitter>
      </PageLayout>
    </>
  );
};

export default PageSettings;
