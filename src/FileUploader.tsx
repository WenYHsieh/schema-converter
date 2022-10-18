import React from 'react';
import './css/fileUplaoder.scss';

const FileUploader = () => {
  const [mapping, setMapping] = React.useState({});
  const [isDisplayResult, setIsDisplayResult] = React.useState(true);

  const handleUpload = async (e: any) => {
    const dataString = (await getDataString(e.target.files[0])) as string;

    setMapping(getDisplayNameAndCodeMappingFromFile(dataString));
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
    return mapping;
  };

  const convertedToCodeBlock = (data: object | string) => {
    let stringData = data as string;
    if (typeof data !== 'string') stringData = JSON.stringify(data);
    return stringData.split(',');
  };

  return (
    <>
      請選擇 openApi .java config 檔案：
      <input type="file" onChange={handleUpload} />
      <div>
        轉換結果(欄位中英文 mapping):
        <button onClick={() => setIsDisplayResult(!isDisplayResult)}>
          toggle shrink
        </button>
      </div>
      <div className={`result__block ${!isDisplayResult ? 'hide' : 'display'}`}>
        {convertedToCodeBlock(mapping)?.map((line) => {
          return <div>{line}</div>;
        })}
      </div>
    </>
  );
};

export default FileUploader;
