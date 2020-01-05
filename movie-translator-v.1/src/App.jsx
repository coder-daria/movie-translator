import React, { useState } from 'react';

import Page from './components/Page/Page.jsx';

import { Container } from './App.styles';

const App = () => {
  const [files, uploadFile] = useState([[], []]);

  const returnCorrespondingLines = (content, lang) => {
    console.log(content);
    if(lang === 'english') {
      uploadFile([content.slice(0,10), files[1]]);
    } else if(files[0].length) {
      // let correspondingLines = [];
      let correspondings = [];

      files[0].forEach((englishLine, index) => {
        const { start, end } = englishLine;
        // let startConcatenation = false;
        let sentencesToConcatenate = 0;

        files[1].forEach((polishLine, secondIndex) => {
          if(index === 0) {
            // złącz wszystko do 'end'
          } else {
            const polishSentence = polishLine.text;
            const polishLineStart = polishLine.start;
            const polishLineEnd = polishLine.end;

            if(polishLineStart >= start && polishLineEnd <= end) {
              if (sentencesToConcatenate) {
                sentencesToConcatenate++;
                // Further sentence to be concatenated.
                const concatenadedSentences = files[1][secondIndex-1].text.concat(polishSentence);
                console.log(concatenadedSentences);
                // startConcatenation = true;
                correspondings[secondIndex-sentencesToConcatenate] = {
                  text: concatenadedSentences,
                }
                // return ({
                //   ...polishLine,
                //   text: concatenadedSentences,
                // })
              } else {
                sentencesToConcatenate++;
                //First sentence to be concatenated.
                correspondings[secondIndex] = { text: polishSentence}
                // return polishLine;
              }
            } else {
              sentencesToConcatenate=0;
              // startConcatenation = false;
            }
          }
        })
      });

      console.log(correspondings);
      uploadFile([files[0], correspondings]);

      
    } else {
      uploadFile([files[0], content.slice(0,10)]);
    }
  }

  return (
    <Container>
      <Page lang='english' title="English" file={files[0]} uploadFile={returnCorrespondingLines}/>
      <Page title="Polish" file={files[1]} uploadFile={returnCorrespondingLines} />
    </Container>
  )
};

export default App;
