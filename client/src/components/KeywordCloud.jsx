import ReactWordcloud from 'react-wordcloud';

const KeywordWordCloud = ({ words }) => {
  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontSizes: [12, 40],
  };

  // 💡 Filter + log for debugging
  const formattedWords = Array.isArray(words)
    ? words.filter(
        (w) =>
          w &&
          typeof w.text === 'string' &&
          w.text.trim() !== '' &&
          typeof w.value === 'number' &&
          !isNaN(w.value)
      )
    : [];

  console.log("✅ Final valid words for WordCloud:", formattedWords);

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Journal Keywords</h2>
      {formattedWords.length > 0 ? (
        <div style={{ height: 300 }}>
          <ReactWordcloud words={formattedWords} options={options} />
        </div>
      ) : (
        <p className="text-sm text-gray-500">No keywords available</p>
      )}
    </div>
  );
};

export default KeywordWordCloud;
