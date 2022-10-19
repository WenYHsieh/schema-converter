import React from 'react';
import '../components/common/css/converterBlock.scss';
import ObjectUtils from '../utils/objectUtils';

const FEColumnConvertBlock = () => {
  const [stateColumnList, setStateColumnList] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    const convertedValue = getColumnListFromInitState(value);
    setStateColumnList(convertedValue);
  };

  const getColumnListFromInitState = (initState: string) => {
    let columnListString = '';
    const columnPartArray = initState.split('\n').slice(1, -1);

    columnPartArray.forEach((item, index: number) => {
      const trimEndIndex = index === columnPartArray.length - 1 ? -4 : -5;
      columnListString += `${
        ObjectUtils.isExist(columnListString) ? ',' : ''
      } ${item.slice(4, trimEndIndex)}`;
    });

    return columnListString;
  };

  return (
    <>
      <h3>前端欄位轉換</h3>
      <div>請貼上 initState (object 部分)：</div>
      <textarea rows={5} onChange={handleOnChange}></textarea>
      <div className="result__block">
        <div>轉換結果 (欄位 list):</div>
        <div>{stateColumnList}</div>
      </div>
    </>
  );
};

export default FEColumnConvertBlock;
