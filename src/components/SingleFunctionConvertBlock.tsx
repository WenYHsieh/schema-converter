import React from 'react';
import ObjectUtils from '../utils/objectUtils';
import '../components/common/css/converterBlock.scss';
import MarkDown from './common/MarkDown';

const SingleFunctionConvertBlock = () => {
  const [mapping, setMapping] = React.useState('');
  const [requestFormat, setRequestFormat] = React.useState('');
  const [columnList, setColumnList] = React.useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;

    let codeNameMapping = new Object();
    let requestFormatObject = new Object();
    let columns = '';

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

      columns += `${ObjectUtils.isExist(columns) ? ',' : ''} ${convertedCode}`;
    });

    setMapping(getMDFormat(JSON.stringify(codeNameMapping)));
    setRequestFormat(getMDFormat(JSON.stringify(requestFormatObject)));
    setColumnList(columns);
  };

  const getMDFormat = (originalString: string) => {
    const jsString = '```js\n' + originalString + '\n```';
    const mdformat = jsString
      .replace('{', '{\n\t')
      .replace('}', '\n}')
      .replaceAll(',', ',\n\t');

    return mdformat;
  };
  return (
    <>
      <h3>單支 Schema 轉換</h3>
      <div>請貼上 schema 字串 (以單支為單位)：</div>
      <textarea rows={5} onChange={handleOnChange}></textarea>
      <div className="result__block">
        <div>轉換結果 (欄位中英文 mapping):</div>

        <MarkDown source={mapping} />
      </div>
      <div className="result__block">
        <div>轉換結果 (request 格式):</div>
        <MarkDown source={requestFormat} />
      </div>
      <div className="result__block">
        <div>轉換結果 (欄位 list):</div>
        <div>{columnList}</div>
      </div>
    </>
  );
};

export default SingleFunctionConvertBlock;
