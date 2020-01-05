import React from 'react';
import { parse } from 'subtitle';

import { Container } from './Page.styles';

const Page = ({ className, title, lang, file, uploadFile }) => {
  let fileReader;

  const handleFileRead = () => {
    const result = fileReader.result;
    const convertedText = parse(result);

    const content = convertedText.map((line) => {
      const text = line.text.replace(/(\r\n|\n|\r)/gm, "");
  
      return ({
        ...line,
        text,
      })
    });
    uploadFile(content.slice(0,10), lang);
  }

  const handleFileUpload = (event) => {
    let file = event.target.files[0];

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  return (
    <Container className={className}>
      <title>{title}</title>
      <input id="myFile" type="file" onChange={handleFileUpload}/>
      {file.map((line, index) => <p key={index}>{line.text}</p>)}
    </Container>
  )
};

export default Page;
