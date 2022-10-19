import React from 'react';
// import ObjectUtils from '../utils/objectUtils';
import '../components/common/css/converterBlock.scss';
import MarkDown from './common/MarkDown';

const FEColumnConvertBlock = () => {
  const [stateColumnList, setStateColumnList] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    const convertedValue = getColumnListFromInitState(value);
    setStateColumnList(convertedValue);
  };

  const getColumnListFromInitState = (initState: string) => {
    // let columnListString = '';
    // Object.entries(initState).forEach((item) => {
    //   const [key] = item;
    //   columnListString += `${
    //     ObjectUtils.isExist(columnListString) ? ',' : ''
    //   } ${key}`;
    // });
    return initState;
  };
  return (
    <>
      <h3>前端欄位轉換</h3>
      <div>請貼上 initState：</div>
      <textarea rows={5} onChange={handleOnChange}></textarea>
      {/* <div className="result__block"> */}
      {/* <div>轉換結果 (欄位 list):</div> */}
      {/* <div>{stateColumnList}</div> */}
      <MarkDown source={stateColumnList} />
      {/* </div> */}
    </>
  );
};

export default FEColumnConvertBlock;
