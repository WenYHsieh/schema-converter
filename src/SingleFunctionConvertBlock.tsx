import React from 'react';
import './css/converterBlock.scss';

const SingleFunctionConvertBlock = () => {
  const [mapping, setMapping] = React.useState('');
  const [requestFormat, setRequestFormat] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;

    let codeNameMapping = new Object();
    let requestFormatObject = new Object();
    const lineArray = value.split('\n\n');
    lineArray.forEach((line) => {
      const [code, , displayName] = line.split(/[/\t | /\n]/);
      const convertedCode = code.replace('*', '');
      codeNameMapping = Object.assign(codeNameMapping, {
        [convertedCode]: displayName,
      });
      requestFormatObject = Object.assign(requestFormatObject, {
        [convertedCode]: '',
      });
    });

    setMapping(JSON.stringify(codeNameMapping));
    setRequestFormat(JSON.stringify(requestFormatObject));
  };

  return (
    <>
      <h3>單支 Schema 轉換</h3>
      <div>請貼上 schema 字串 (以單支為單位)：</div>
      <textarea rows={5} onChange={handleOnChange}></textarea>
      <div className="result__block">
        <div>轉換結果 (欄位中英文 mapping):</div>
        <div>{mapping}</div>
      </div>
      <div className="result__block">
        <div>轉換結果 (request 格式):</div>
        <div>{requestFormat}</div>
      </div>
    </>
  );
};

export default SingleFunctionConvertBlock;
