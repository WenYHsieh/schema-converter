import React from 'react';
import '../components/common/css/converterBlock.scss';
import ObjectUtils from '../utils/objectUtils';

const ClassFunctionConvertBlock = () => {
  const [mapping, setMapping] = React.useState(new Array());
  const [isDisplayResult, setIsDisplayResult] = React.useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    if (!files || files.length === 0) return;
    const dataString = (await getDataString(files[0])) as string;

    const result = getDisplayNameAndCodeMappingFromFile(dataString);
    setMapping(result);
    if (ObjectUtils.isExist(result)) setIsDisplayResult(true);
  };

  const getDataString = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsText(file);
    });
  };

  const getDisplayName = (line: string) => {
    const regex = /description = "((?:[^"])*)"/;
    const [, displayName] = line.match(regex) as Array<string>;
    return displayName;
  };

  /**
   * 配對取出欄位英文名稱
   * @param line
   * @returns
   */
  const getCode = (line: string) => {
    const regex = /private .+ (\w+)/;
    const [, code] = line.match(regex) as Array<string>;
    return code;
  };

  /**
   *
   * @param fileRoute ex:../Documents/PmsMpAddDetailData.java
   * @returns
   */
  const getDisplayNameAndCodeMappingFromFile = (dataText: string) => {
    const textByLine = dataText.split('\n');
    const lines = textByLine.filter(Boolean);

    const displayNameArray = new Array();
    const codeArray = new Array();

    lines.forEach((line) => {
      if (line.includes('@Schema')) {
        const displayName = getDisplayName(line);
        displayNameArray.push(displayName);
      }
      if (line.includes('private')) {
        const code = getCode(line);
        codeArray.push(code);
      }
    });

    const mapping = Object.assign(
      {},
      ...codeArray.map((code, index) => ({ [code]: displayNameArray[index] }))
    );
    const mappingArray = JSON.stringify(mapping).split(',');
    return mappingArray;
  };

  return (
    <>
      <h3>類別 Schema 轉換</h3>
      請選擇 openApi .java 設定檔案（功能類別為單位）：
      <input type="file" onChange={handleUpload} />
      <div>
        轉換結果 (欄位中英文 mapping):
        <button onClick={() => setIsDisplayResult(!isDisplayResult)}>
          {`${isDisplayResult ? '隱藏' : '顯示'}`}
        </button>
      </div>
      <div className={`result__block ${!isDisplayResult ? 'hide' : 'display'}`}>
        {mapping?.map((line) => {
          return <div>{line}</div>;
        })}
      </div>
    </>
  );
};

export default ClassFunctionConvertBlock;
