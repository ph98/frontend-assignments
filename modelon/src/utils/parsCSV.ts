// function from chatGPT!
const parseCsvData = (data: string) => {
  const rows = data.split('\n');
  const headers = rows[0].split(',');

  const parsedData = [];
  for (let i = 1; i < rows.length; i += 1) {
    const values = rows[i].split(',');
    if (values.length === headers.length) {
      const row = {} as any;
      for (let j = 0; j < headers.length; j += 1) {
        row[headers[j]] = values[j];
      }
      parsedData.push(row);
    }
  }
  return parsedData;
};

export default parseCsvData;
